package de.qreator.vertx.VertxDatabase;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.jdbc.JDBCClient;
import io.vertx.ext.sql.SQLConnection;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DatenbankVerticle extends AbstractVerticle {

    private static final String SQL_NEUE_TABELLE = "create table if not exists user(id int auto_increment,name varchar(20) not null,tag int not null,monat int not null, passwort varchar(70) not null,primary key(name))";
    private static final String SQL_ÜBERPRÜFE_PASSWORT = "select passwort from user where name=?";
    private static final String SQL_ÜBERPRÜFE_EXISTENZ_USER = "select name from user where name=?";
    private static final String USER_EXISTIERT = "USER_EXISITIERT";
    private static final String SQL_ÜBERPRÜFE_LOVE_USER = "select tag,monat from user where name=?";
    private static final String EB_ADRESSE = "vertxdatabase.eventbus";

    private enum ErrorCodes {
        KEINE_AKTION,
        SCHLECHTE_AKTION,
        DATENBANK_FEHLER
    }

    // Logger erzeugen, wobei gilt: TRACE < DEBUG < INFO <  WARN < ERROR
    private static final Logger LOGGER = LoggerFactory.getLogger("de.qreator.vertx.VertxDatabase.Datenbank");

    private JDBCClient dbClient;

    public void start(Future<Void> startFuture) throws Exception {
        JsonObject config = new JsonObject()
                .put("url", "jdbc:h2:~/datenbank")
                .put("driver_class", "org.h2.Driver");

        dbClient = JDBCClient.createShared(vertx, config);
       // vertx.eventBus().consumer(EB_ADRESSE, this::onMessage);
      //  startFuture.complete();

              Future<Void> datenbankFuture = erstelleDatenbank();

datenbankFuture.setHandler(db -> {
            if (db.succeeded()) {
                LOGGER.info("Datenbank initialisiert");
                vertx.eventBus().consumer(EB_ADRESSE, this::onMessage);

                startFuture.complete();
            } else {
                LOGGER.info("Probleme beim Initialisieren der Datenbank");
                startFuture.fail(db.cause());
            }
        });
        
    }

    public void onMessage(Message<JsonObject> message) {

        if (!message.headers().contains("action")) {
            LOGGER.error("Kein action-Header übergeben!",
                    message.headers(), message.body().encodePrettily());
            message.fail(ErrorCodes.KEINE_AKTION.ordinal(), "Keine Aktion im Header übergeben");
            return;
        }
        String action = message.headers().get("action");

        switch (action) {
            case "ueberpruefe-passwort":
                überprüfeUser(message);
                break;
            case "erstelleUser":
                erstelleNeuenUser(message);
                break;
            case "Horoskoplove":
                Horoskoplove(message);
                break;
            case "Horoskopjob":
                Horoskoplove(message);
                break;
            default:
                message.fail(ErrorCodes.SCHLECHTE_AKTION.ordinal(), "Schlechte Aktion: " + action);
        }
    }

    private Future<Void> erstelleDatenbank() {
        Future<Void> erstellenFuture = Future.future();
        LOGGER.info("Datenbank neu anlegen, falls nicht vorhanden.");
        dbClient.getConnection(res -> {
            if (res.succeeded()) {

                SQLConnection connection = res.result();
                connection.execute(SQL_NEUE_TABELLE, erstellen -> {
                    if (erstellen.succeeded()) {
                        erstellenFuture.complete();
                    } else {
                        LOGGER.error(erstellen.cause().toString());
                        erstellenFuture.fail(erstellen.cause());
                    }
                });
            } else {
                LOGGER.error("Problem bei der Verbindung zur Datenbank");
            }
        });
        return erstellenFuture;
    }

    private Future<Void> erstelleUser(String name, String passwort, int tag, int monat) {
        Future<Void> erstellenFuture = Future.future();

        dbClient.getConnection(res -> {
            if (res.succeeded()) {

                SQLConnection connection = res.result();

                connection.queryWithParams(SQL_ÜBERPRÜFE_EXISTENZ_USER, new JsonArray().add(name), abfrage -> {
                    if (abfrage.succeeded()) {
                        List<JsonArray> zeilen = abfrage.result().getResults();
                        if (zeilen.isEmpty()) { // User existiert noch nicht
                            LOGGER.info("Prüfe Geburtsdatum");

                            if (1 <= tag && tag <= 31 && 1 == monat || 1 <= tag && tag <= 31 && 3 == monat || 1 <= tag && tag <= 31 && 5 == monat || 1 <= tag && tag <= 31 && 7 == monat || 1 <= tag && tag <= 31 && 8 == monat || 1 <= tag && tag <= 31 && 10 == monat || 1 <= tag && tag <= 31 && 12 == monat) {
                                connection.execute("insert into user(name,passwort,tag,monat) values('" + name + "','" + passwort + "','" + tag + "','" + monat + "')", erstellen -> {
                                    LOGGER.info("User " + name + " erfolgreich erstellt");
                                    erstellenFuture.complete();

                                });
                            } else if (1 <= tag && tag <= 30 && 4 == monat || 1 <= tag && tag <= 30 && 4 == monat || 1 <= tag && tag <= 30 && 6 == monat || 1 <= tag && tag <= 30 && 9 == monat || 1 <= tag && tag <= 30 && 11 == monat) {
                                connection.execute("insert into user(name,passwort,tag,monat) values('" + name + "','" + passwort + "','" + tag + "','" + monat + "')", erstellen -> {
                                    LOGGER.info("User " + name + " erfolgreich erstellt");
                                    erstellenFuture.complete();
                                });
                            } else if (1 <= tag && tag <= 29 && 2 == monat) {
                                connection.execute("insert into user(name,passwort,tag,monat) values('" + name + "','" + passwort + "','" + tag + "','" + monat + "')", erstellen -> {
                                    LOGGER.info("User " + name + " erfolgreich erstellt");
                                    erstellenFuture.complete();
                                });

                            } else {
                                LOGGER.info("User mit dem Namen " + name + " hat falsche Geburtsdaten");
                                erstellenFuture.fail("WrongData");
                            }

                        } else {
                            LOGGER.info("User mit dem Namen " + name + " existiert bereits.");
                            erstellenFuture.fail(USER_EXISTIERT);
                            //erstellenFuture.complete();
                        }
                    } else {
                        erstellenFuture.fail(abfrage.cause());
                    }

                });
            } else {
                LOGGER.error("Problem bei der Verbindung zur Datenbank");
                erstellenFuture.fail(res.cause());
            }
        });
        return erstellenFuture;
    }

    private void Horoskopjob(Message<JsonObject> message) {
        String name = message.body().getString("name");

        dbClient.getConnection(res -> {
            if (res.succeeded()) {

                SQLConnection connection = res.result();

                connection.queryWithParams(SQL_ÜBERPRÜFE_LOVE_USER, new JsonArray().add(name), abfrage -> {
                    if (abfrage.succeeded()) {
                        List<JsonArray> liste = abfrage.result().getResults();
                        int tag = liste.get(0).getInteger(0);
                        int monat = liste.get(0).getInteger(1);

                        message.reply(new JsonObject().put("tag", tag).put("monat", monat));

                    } else {
                        LOGGER.error(abfrage.cause().toString());
                    }
                });
            };

        });
    }

    private void Horoskoplove(Message<JsonObject> message) {
        String name = message.body().getString("name");

        dbClient.getConnection(res -> {
            if (res.succeeded()) {

                SQLConnection connection = res.result();

                connection.queryWithParams(SQL_ÜBERPRÜFE_LOVE_USER, new JsonArray().add(name), abfrage -> {
                    if (abfrage.succeeded()) {
                        List<JsonArray> liste = abfrage.result().getResults();
                        int tag = liste.get(0).getInteger(0);
                        int monat = liste.get(0).getInteger(1);

                        message.reply(new JsonObject().put("tag", tag).put("monat", monat));

                    } else {
                        LOGGER.error(abfrage.cause().toString());
                    }
                });
            };

        });
    }

    private void erstelleNeuenUser(Message<JsonObject> message) {
        String name = message.body().getString("name");
        String passwort = message.body().getString("passwort");
        String salt = ""+(int)(Math.random()*10000);
        InputStream stream = new ByteArrayInputStream(passwort
        .getBytes(StandardCharsets.UTF_8));
// oder, um einen Hash für eine Datei zu bestimmen:
// InputStream stream = new FileInputStream("D:\\test.png");
try {
    // SHA-1, MD5 oder SHA-256
    passwort = Hash.checksum(stream, "SHA-256");
} catch (Exception e) {
    e.printStackTrace();
   
}
LOGGER.info("Schaue ob "+ name +" und "+ passwort +" tun und ob "+salt+" erstellt wird.");

        int tag = message.body().getInteger("tag");
        int monat = message.body().getInteger("monat");
        Future<Void> userErstelltFuture = erstelleUser(name, passwort, tag, monat);
        userErstelltFuture.setHandler(anfrage -> {
            
            if (anfrage.succeeded()) {
                message.reply(new JsonObject().put("Reg", "ja"));
                LOGGER.info("Erstellen erfolgreich");

            } else {
                String grund = anfrage.cause().toString();
                if (grund.equals("io.vertx.core.impl.NoStackTraceThrowable: USER_EXISITIERT")) {
                    message.reply(new JsonObject().put("Reg", "existiert"));
                    
                } 
                else if (grund.equals("WrongData")) {
                    message.reply(new JsonObject().put("Reg", "Fehler"));
                    LOGGER.error(anfrage.cause().toString());
                    
                }
                    else {
                    message.reply(new JsonObject().put("Reg", "Fehler"));
                    LOGGER.error(anfrage.cause().toString());
                }
            }
        });

    }

    private void überprüfeUser(Message<JsonObject> message) {

        String name = message.body().getString("name");
        String passwortEingabe = message.body().getString("passwort");
        InputStream stream = new ByteArrayInputStream(passwortEingabe
        .getBytes(StandardCharsets.UTF_8));
        String passwort="";
// oder, um einen Hash für eine Datei zu bestimmen:
// InputStream stream = new FileInputStream("D:\\test.png");
try {
    // SHA-1, MD5 oder SHA-256
    passwort = Hash.checksum(stream, "SHA-256");
} catch (Exception e) {
    e.printStackTrace();
}

        final String pw=passwort;
        LOGGER.info("Überprüfe, ob der Nutzer " + name + " mit dem Passwort " + passwort + " sich anmelden kann.");

        dbClient.queryWithParams(SQL_ÜBERPRÜFE_PASSWORT, new JsonArray().add(name), abfrage -> {
            if (abfrage.succeeded()) {
                List<JsonArray> zeilen = abfrage.result().getResults();
                if (zeilen.size() == 1) {
                    String passwortDB = zeilen.get(0).getString(0);
                    LOGGER.info("Schaue ob tut.");
                    if (passwortDB.equals(pw)) {
                        message.reply(new JsonObject().put("passwortStimmt", Boolean.TRUE));
                        LOGGER.info("Anmeldename und Passwort stimmen überein");
                    } else {
                        message.reply(new JsonObject().put("passwortStimmt", Boolean.FALSE));
                    }
                } else {
                    LOGGER.info("Anmeldename und Passwort stimmen NICHT überein");
                    message.reply(new JsonObject().put("passwortStimmt", Boolean.FALSE));
                }
            } else {
                message.reply(new JsonObject().put("passwortStimmt", Boolean.FALSE));
            }
        });
    }
}
