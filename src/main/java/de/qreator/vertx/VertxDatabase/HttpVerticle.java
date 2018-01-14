/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package de.qreator.vertx.VertxDatabase;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.eventbus.DeliveryOptions;
import io.vertx.core.http.HttpServer;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.Session;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.CookieHandler;
import io.vertx.ext.web.handler.SessionHandler;
import io.vertx.ext.web.handler.StaticHandler;
import io.vertx.ext.web.sstore.LocalSessionStore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author menze
 */
public class HttpVerticle extends AbstractVerticle {

    private int port = 8080;
    private static final Logger LOGGER = LoggerFactory.getLogger("de.qreator.vertx.VertxDatabase.HttpServer");
    private static final String EB_ADRESSE = "vertxdatabase.eventbus";

    public void start(Future<Void> startFuture) throws Exception {

        HttpServer server = vertx.createHttpServer();

        LocalSessionStore store = LocalSessionStore.create(vertx);
        SessionHandler sessionHandler = SessionHandler.create(store);

        Router router = Router.router(vertx);

        router.route().handler(CookieHandler.create());
        router.route().handler(sessionHandler);
        router.post().handler(BodyHandler.create());
        router.post("/anfrage").handler(this::anfragenHandler);
        router.route("/static/geheim/*").handler(this::geheimeSeiten);
        router.route("/static/*").handler(StaticHandler.create().setDefaultContentEncoding("UTF-8").setCachingEnabled(false));

        server.requestHandler(router::accept).listen(port, "0.0.0.0", listener -> {
            if (listener.succeeded()) {
                LOGGER.info("Http-Server auf Port " + port + " gestartet");
                startFuture.complete();
            } else {
                startFuture.fail(listener.cause());
            }
        });
    }

    private void geheimeSeiten(RoutingContext routingContext) {
        LOGGER.info("Router für geheime Seiten");
        Session session = routingContext.session();
        if (session.get("angemeldet") == null) { // wenn nicht angemeldet, dann Passwort verlangen
            routingContext.response().setStatusCode(303);
            routingContext.response().putHeader("Location", "/static/admin.html");
            routingContext.response().end();
        } else {
            LOGGER.info("Weiterleitung zum nächsten Router");
            routingContext.next(); // sonst weiter zum nächsten Router
        }
    }

    private void anfragenHandler(RoutingContext routingContext) {
        LOGGER.info("Router für Anfragen");
        String typ = routingContext.request().getParam("typ");
        HttpServerResponse response = routingContext.response();
        response.putHeader("content-type", "application/json");
        JsonObject jo = new JsonObject();
        Session session = routingContext.session();

        if (typ.equals("registrierdaten")) {
            LOGGER.info("tut");
            String name = routingContext.request().getParam("anmeldename");
            String passwort = routingContext.request().getParam("passwort");
            String tag2 = routingContext.request().getParam("tag");
            int tag = Integer.parseInt(tag2);
            String monat2 = routingContext.request().getParam("monat");
            int monat = Integer.parseInt(monat2);
            LOGGER.info("Registrierungsanfrage von User " + name + " mit dem Passwort " + passwort + " und mit dem Geburtstag" + tag + "." + monat + ".");
            JsonObject request = new JsonObject().put("name", name).put("passwort", passwort).put("tag", tag).put("monat", monat);

            DeliveryOptions options = new DeliveryOptions().addHeader("action", "erstelleUser");
            LOGGER.info("BAum");
            vertx.eventBus().send(EB_ADRESSE, request, options, reply -> {
                if (reply.succeeded()) {
                    JsonObject result = (JsonObject) reply.result().body();
                    String antwort = result.getString("Reg");
                    if (antwort.equals("ja")) {
                        jo.put("text", "Registration").put("Regis", "success");
                        response.end(Json.encodePrettily(jo));

                    } else if (antwort.equals("existiert")) {
                        jo.put("text", "Registration").put("Regis", "existiert");
                        response.end(Json.encodePrettily(jo));
                    } else {
                        jo.put("text", "Registration").put("Regis", "fehler");

                    }

                }
            });
        } else if (typ.equals("angemeldet")) {
            LOGGER.info("Anfrage, ob User angemeldet ist.");
            String angemeldet = session.get("angemeldet");
            jo.put("typ", "angemeldet");
            if (angemeldet != null && angemeldet.equals("ja")) {
                LOGGER.info("User ist angemeldet.");
                jo.put("text", "ja");
            } else {
                LOGGER.info("User ist NICHT angemeldet. Somit Passworteingabe erforderlich");
                jo.put("text", "nein");
            }
            response.end(Json.encodePrettily(jo));
        } else if (typ.equals("anmeldedaten")) {
            String name = routingContext.request().getParam("anmeldename");
            String passwort = routingContext.request().getParam("passwort");
            LOGGER.info("Anmeldeanfrage von User " + name + " mit dem Passwort " + passwort);

            JsonObject request = new JsonObject().put("name", name).put("passwort", passwort);

            DeliveryOptions options = new DeliveryOptions().addHeader("action", "ueberpruefe-passwort");
            vertx.eventBus().send(EB_ADRESSE, request, options, reply -> {
                if (reply.succeeded()) {
                    JsonObject body = (JsonObject) reply.result().body();
                    if (body.getBoolean("passwortStimmt") == true) {
                        session.put("angemeldet", "ja").put("name", name);
                        jo.put("typ", "überprüfung").put("text", "ok");
                    } else {
                        jo.put("typ", "überprüfung").put("text", "nein");
                    }
                    response.end(Json.encodePrettily(jo));
                } else {
                    jo.put("typ", "überprüfung").put("text", "nein");
                    response.end(Json.encodePrettily(jo));
                }
            });
        } else if (typ.equals("registrierdaten")) {
            String name = routingContext.request().getParam("anmeldename");
            String passwort = routingContext.request().getParam("passwort");
            String tag = routingContext.request().getParam("tag");
            String monat = routingContext.request().getParam("monat");
            LOGGER.info("Registrierungsanfrage von User " + name + " mit dem Passwort " + passwort + " und mit dem Geburtstag" + tag + "." + monat + ".");
            JsonObject request = new JsonObject().put("name", name).put("passwort", passwort);

            DeliveryOptions options = new DeliveryOptions().addHeader("action", "erstelleUser");
            vertx.eventBus().send(EB_ADRESSE, request, options, reply -> {
                if (reply.succeeded()) {
                    JsonObject body = (JsonObject) reply.result().body();
                    if (body.getString("Reg").equals("ja")) {
                        session.put("angemeldet", "ja");
                        jo.put("typ", "registrierung").put("text", "ok");
                    } else {
                        jo.put("typ", "registrierung").put("text", "nein");
                    }
                    response.end(Json.encodePrettily(jo));
                } else {
                    jo.put("typ", "registrierung").put("text", "nein");
                    response.end(Json.encodePrettily(jo));
                }

            });
        } else if (typ.equals("logout")) {
            LOGGER.info("Logout-Anfrage");
            session.put("angemeldet", null);
            jo.put("typ", "logout");
            response.end(Json.encodePrettily(jo));
        } else if (typ.equals("love")) {

            String name = session.get("name");
            JsonObject request = new JsonObject().put("name", name);
            DeliveryOptions options = new DeliveryOptions().addHeader("action", "Horoskoplove");
            vertx.eventBus().send(EB_ADRESSE, request, options, reply -> {
                if (reply.succeeded()) {
                    JsonObject test = (JsonObject) reply.result().body();
                    int tag = test.getInteger("tag");
                    int monat = test.getInteger("monat");
                    LOGGER.info(tag + "." + monat);
                    if (21 <= tag && tag <= 31 && 1 == monat || 1 <= tag && tag <= 21 && 2==monat) {
                        LOGGER.info(tag + "." + monat);

                        jo.put("typ", "WASSERMANN").put("text", "ok");
                        response.end(Json.encodePrettily(jo));
                    }
                    else if (20 <= tag && tag <= 31 && 2 == monat || 1 <= tag && tag <= 20 && 3==monat) {
                        LOGGER.info(tag + "." + monat);

                        jo.put("typ", "FISCHE").put("text", "ok");
                        response.end(Json.encodePrettily(jo));
                    }
                    else if (21 <= tag && tag <= 31 && 3 == monat || 1 <= tag && tag <= 20 && 4==monat) {
                        LOGGER.info(tag + "." + monat);

                        jo.put("typ", "WIDDER").put("text", "ok");
                        response.end(Json.encodePrettily(jo));
                    }
                    else if (21 <= tag && tag <= 31 && 4 == monat || 1 <= tag && tag <= 20 && 5==monat) {
                        LOGGER.info(tag + "." + monat);

                        jo.put("typ", "STIER").put("text", "ok");
                        response.end(Json.encodePrettily(jo));
                    }
                    else if (21 <= tag && tag <= 31 && 5 == monat || 1 <= tag && tag <= 21 && 6==monat) {
                        LOGGER.info(tag + "." + monat);

                        jo.put("typ", "ZWILLINGE").put("text", "ok");
                        response.end(Json.encodePrettily(jo));
                    }
                    else if (22 <= tag && tag <= 31 && 6 == monat || 1 <= tag && tag <= 22 && 7==monat) {
                        LOGGER.info(tag + "." + monat);

                        jo.put("typ", "KREBS").put("text", "ok");
                        response.end(Json.encodePrettily(jo));
                    }
                    else if (23 <= tag && tag <= 31 && 7 == monat || 1 <= tag && tag <= 23 && 8==monat) {
                        LOGGER.info(tag + "." + monat);

                        jo.put("typ", "LÖWE").put("text", "ok");
                        response.end(Json.encodePrettily(jo));
                    }
                    else if (24 <= tag && tag <= 31 && 8 == monat || 1 <= tag && tag <= 23 && 9==monat) {
                        LOGGER.info(tag + "." + monat);

                        jo.put("typ", "JUNGFRAU").put("text", "ok");
                        response.end(Json.encodePrettily(jo));
                    }
                    else if (20 <= tag && tag <= 24 && 9 == monat || 1 <= tag && tag <= 23 && 10==monat) {
                        LOGGER.info(tag + "." + monat);

                        jo.put("typ", "WAAGE").put("text", "ok");
                        response.end(Json.encodePrettily(jo));
                    }
                    else if (24 <= tag && tag <= 31 && 10 == monat || 1 <= tag && tag <= 22 && 11==monat) {
                        LOGGER.info(tag + "." + monat);

                        jo.put("typ", "SKORPION").put("text", "ok");
                        response.end(Json.encodePrettily(jo));
                    }
                    else if (23 <= tag && tag <= 31 && 11 == monat || 1 <= tag && tag <= 21 && 12==monat) {
                        LOGGER.info(tag + "." + monat);

                        jo.put("typ", "SCHÜTZE").put("text", "ok");
                        response.end(Json.encodePrettily(jo));
                    }
                    else if (22 <= tag && tag <= 31 && 12 == monat || 1 <= tag && tag <= 20 && 1==monat) {
                        LOGGER.info(tag + "." + monat);

                        jo.put("typ", "STEINBOCK").put("text", "ok");
                        response.end(Json.encodePrettily(jo));
                    }
                
                    
                    

                }

            });
        }
        else if (typ.equals("job")) {

            String name = session.get("name");
            JsonObject request = new JsonObject().put("name", name);
            DeliveryOptions options = new DeliveryOptions().addHeader("action", "Horoskopjob");
            vertx.eventBus().send(EB_ADRESSE, request, options, reply -> {
                if (reply.succeeded()) {
                    JsonObject test = (JsonObject) reply.result().body();
                    int tag = test.getInteger("tag");
                    int monat = test.getInteger("monat");
                    LOGGER.info(tag + "." + monat);
                    if (21 <= tag && tag <= 31 && 1 == monat || 1 <= tag && tag <= 21 && 2==monat) {
                        LOGGER.info(tag + "." + monat);

                        jo.put("typ", "WASSERMANN").put("text", "ok");
                        response.end(Json.encodePrettily(jo));
                    }
                    else if (20 <= tag && tag <= 31 && 2 == monat || 1 <= tag && tag <= 20 && 3==monat) {
                        LOGGER.info(tag + "." + monat);

                        jo.put("typ", "FISCHE").put("text", "ok");
                        response.end(Json.encodePrettily(jo));
                    }
                    else if (21 <= tag && tag <= 31 && 3 == monat || 1 <= tag && tag <= 20 && 4==monat) {
                        LOGGER.info(tag + "." + monat);

                        jo.put("typ", "WIDDER").put("text", "ok");
                        response.end(Json.encodePrettily(jo));
                    }
                    else if (21 <= tag && tag <= 31 && 4 == monat || 1 <= tag && tag <= 20 && 5==monat) {
                        LOGGER.info(tag + "." + monat);

                        jo.put("typ", "STIER").put("text", "ok");
                        response.end(Json.encodePrettily(jo));
                    }
                    else if (21 <= tag && tag <= 31 && 5 == monat || 1 <= tag && tag <= 21 && 6==monat) {
                        LOGGER.info(tag + "." + monat);

                        jo.put("typ", "ZWILLINGE").put("text", "ok");
                        response.end(Json.encodePrettily(jo));
                    }
                    else if (22 <= tag && tag <= 31 && 6 == monat || 1 <= tag && tag <= 22 && 7==monat) {
                        LOGGER.info(tag + "." + monat);

                        jo.put("typ", "KREBS").put("text", "ok");
                        response.end(Json.encodePrettily(jo));
                    }
                    else if (23 <= tag && tag <= 31 && 7 == monat || 1 <= tag && tag <= 23 && 8==monat) {
                        LOGGER.info(tag + "." + monat);

                        jo.put("typ", "LÖWE").put("text", "ok");
                        response.end(Json.encodePrettily(jo));
                    }
                    else if (24 <= tag && tag <= 31 && 8 == monat || 1 <= tag && tag <= 23 && 9==monat) {
                        LOGGER.info(tag + "." + monat);

                        jo.put("typ", "JUNGFRAU").put("text", "ok");
                        response.end(Json.encodePrettily(jo));
                    }
                    else if (20 <= tag && tag <= 24 && 9 == monat || 1 <= tag && tag <= 23 && 10==monat) {
                        LOGGER.info(tag + "." + monat);

                        jo.put("typ", "WAAGE").put("text", "ok");
                        response.end(Json.encodePrettily(jo));
                    }
                    else if (24 <= tag && tag <= 31 && 10 == monat || 1 <= tag && tag <= 22 && 11==monat) {
                        LOGGER.info(tag + "." + monat);

                        jo.put("typ", "SKORPION").put("text", "ok");
                        response.end(Json.encodePrettily(jo));
                    }
                    else if (23 <= tag && tag <= 31 && 11 == monat || 1 <= tag && tag <= 21 && 12==monat) {
                        LOGGER.info(tag + "." + monat);

                        jo.put("typ", "SCHÜTZE").put("text", "ok");
                        response.end(Json.encodePrettily(jo));
                    }
                    else if (22 <= tag && tag <= 31 && 12 == monat || 1 <= tag && tag <= 20 && 1==monat) {
                        LOGGER.info(tag + "." + monat);

                        jo.put("typ", "STEINBOCK").put("text", "ok");
                        response.end(Json.encodePrettily(jo));
                    }
                
                    
                    

                }

            });
        }
    }}