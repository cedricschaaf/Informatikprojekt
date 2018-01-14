/* global don */

$(document).ready(function () {

    $(document).on("click", "#logout", function () {
        $.post("../anfrage", {
            typ: "logout"
        }, function (data) {
            if (data.typ == "logout") {
                $("body").html("Name: <input type='text' id='anmeldename'/><br>")
                        .append("Passwort: <input type='password' id='passwort'/><br>\n")
                        .append("<input type='button' value='OK' id='anmeldeknopf'/><br>\n")
                        .append("Benutzername: <input type='text' id='rname'/><br>\n")
                        .append("Passwort: <input type='password' id='rpasswort'/><br>\n")
                        .append("Geburtstag: <input type='geburt1' id='geburt1'/><br>\n")
                        .append("Geburtsmonat: <input type='geburt2' id='geburt2'/><br>\n")
                        .append("<input type='button' value='Registrieren' id='oksignup12'/>")
            }
        })
    });

    $(document).on("click", "#anmeldeknopf", function () {
        $.post("../anfrage", {
            typ: "anmeldedaten",
            anmeldename: $("#anmeldename").val(),
            passwort: $("#passwort").val()
        }, function (data) {
            if (data.typ == "überprüfung") {
                if (data.text == "ok") {
                    $("body").html("Sie sind angemeldet. Wählen Sie aus, was die Zukunft in den folgenden Bereichen für Sie bereit hält.")
                            .append("<br><input type='button' value='Liebe' id='love'/>")
                            .append("<br><input type='button' value='Beruf' id='job'/>")
                            .append("<br><input type='button' value='logout' id='logout'/>");
                } else {
                    $("body").append("<br>Die Anmeldedaten sind leider falsch.");
                }
            }
        });
    });



    $.post("../anfrage",
            {
                typ: "angemeldet"
            },
            function (data) {
                if (data.typ == "angemeldet") {
                    if (data.text == "nein") {
                        $("body").html("Name: <input type='text' id='anmeldename'/><br>")
                                .append("Passwort: <input type='password' id='passwort'/><br>\n")
                                .append("<input type='button' value='OK' id='anmeldeknopf'<br><br>")
                                .append("Benutzername: <input type='text' id='rname'/><br>\n")
                                .append("Passwort: <input type='password' id='rpasswort'/><br>\n")
                                .append("Geburtstag: <input type='geburt1' id='geburt1'/><br>\n")
                                .append("Geburtsmonat: <input type='geburt2' id='geburt2'/><br>\n")
                                .append("<input type='button' value='Registrieren' id='oksignup'/>")

                    }
                }
            }
    );
    $(document).on("click", "#signup", function () {
        $("body").html("Sie können sich hier nun kostenlos registrieren. <br><br>")
                .append("Benutzername: <input type='text' id='rname'/><br>\n")
                .append("Passwort: <input type='password' id='rpasswort'/><br>\n")
                .append("Geburtstag: <input type='geburt1' id='geburt1'/><br>\n")
                .append("Geburtsmonat: <input type='geburt2' id='geburt2'/><br>\n")
                .append("<input type='button' value='Registrieren5' id='oksignup1'/>")
                .append("<input type='button' value='Zurück' id='back'/>");
    });
    $(document).on("click", "#back", function () {
        $("body").html("Name: <input type='text' id='anmeldename'/><br>")
                .append("Passwort: <input type='password' id='passwort'/><br>\n")
                .append("<input type='button' value='OK' id='anmeldeknopf'/>")
                .append("<input type='button' value='Registrieren' id='signup'/>");


    });

    $(document).on("click", "#oksignup", function () {
        $.post("../anfrage", {
            typ: "registrierdaten",
            anmeldename: $("#rname").val(),
            passwort: $("#rpasswort").val(),
            tag: $("#geburt1").val(),
            monat: $("#geburt2").val()
        },
                function (data) {
                    if (data.text == "Registration") {
                        if (data.Regis == "ja") {
                            // erfolgreich
                        } else if (data.Regis == "existiert") {
                            // user existiert
                        } else {
                            //Fehlermeldung
                        }
                    }
                });

    });




    $(document).on("click", "#love", function () {


        $("body").html("Sie haben die Liebe gewählt. Möchten Sie für ihr Sternzeichen  das Horoskop erfahren? <br><br>") // Sternzeichen einfügen
                .append("<input type='button' value='BAUM' id='horoskop'/>")
                .append("<input type='button' value='Zurück' id='back1'/>");
    });

    $(document).on("click", "#job", function () {
        $("body").html("Sie haben den Beruf gewählt. Möchten Sie für ihr Sternzeichen  das Horoskop erfahren? <br><br>") // Sternzeichen einfügen
                .append("<input type='button' value='OK' id='horoskop1'/>")
                .append("<input type='button' value='Zurück' id='back1'/>");
    });

    $(document).on("click", "#back1", function () {
        $("body").html("<br><input type='button' value='Liebe' id='love'/>")
                .append("<br><input type='button' value='Beruf' id='job'/>")
                .append("<br><input type='button' value='logout' id='logout'/>");

    });
    
        $(document).on("click", "#horoskop", function () {
        $.post("../anfrage", {
            typ: "love"

        },
                function (data) {
               
                 
                    if (data.typ == "WASSERMANN") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop fur ihr Sternzeichen  lautet wie folgt:Wassermann <br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "FISCHE") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop fur ihr Sternzeichen  lautet wie folgt:Fische <br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "WIDDER") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop fur ihr Sternzeichen  lautet wie folgt:Widder <br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "STIER") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop fur ihr Sternzeichen  lautet wie folgt:Stier <br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "ZWILLINGE") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop fur ihr Sternzeichen  lautet wie folgt:Zwillinge <br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")

                        }
                    }
                    else if (data.typ == "KREBS") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop fur ihr Sternzeichen  lautet wie folgt:Krebs <br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "LÖWE") {
                        if (data.text == "ok") {
  $("body").html("Ihr Horoskop fur ihr Sternzeichen  lautet wie folgt:Löwe <br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "JUNGFRAU") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop fur ihr Sternzeichen  lautet wie folgt:Jungfrau <br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "WAAGE") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop fur ihr Sternzeichen  lautet wie folgt:Waage <br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "SKORPION") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop fur ihr Sternzeichen  lautet wie folgt:Skorpion <br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "SCHÜTZE") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop fur ihr Sternzeichen  lautet wie folgt:Schütze <br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "STEINBOCK") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop fur ihr Sternzeichen  lautet wie folgt:Steinbock <br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    
                    
                    
                });


    
    });

    $(document).on("click", "#horoskop1", function () {
        $.post("../anfrage", {
            typ: "job"

        },
                function (data) {
               
                 
                    if (data.typ == "WASSERMANN") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop fur ihr Sternzeichen  lautet wie folgt:Wassermann <br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "FISCHE") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop fur ihr Sternzeichen  lautet wie folgt:Fische <br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "WIDDER") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop fur ihr Sternzeichen  lautet wie folgt:Widder <br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "STIER") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop fur ihr Sternzeichen  lautet wie folgt:Stier <br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "ZWILLINGE") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop fur ihr Sternzeichen  lautet wie folgt:Zwillinge <br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")

                        }
                    }
                    else if (data.typ == "KREBS") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop fur ihr Sternzeichen  lautet wie folgt:Krebs <br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "LÖWE") {
                        if (data.text == "ok") {
  $("body").html("Ihr Horoskop fur ihr Sternzeichen  lautet wie folgt:Löwe <br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "JUNGFRAU") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop fur ihr Sternzeichen  lautet wie folgt:Jungfrau <br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "WAAGE") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop fur ihr Sternzeichen  lautet wie folgt:Waage <br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "SKORPION") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop fur ihr Sternzeichen  lautet wie folgt:Skorpion <br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "SCHÜTZE") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop fur ihr Sternzeichen  lautet wie folgt:Schütze <br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "STEINBOCK") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop fur ihr Sternzeichen  lautet wie folgt:Steinbock <br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    
                    
                    
                });


    
    });

 

    $(document).on("click", "#weiter", function () {
        $("body").html("Für die Verbesserung dieser Website können Sie uns mit 1€ unterstützen. <br><br>") // Sternzeichen einfügen
                .append("<input type='button' value='Spenden (-1€)' id='spenden'/>")
                .append("<input type='button' value='Nein, danke' id='nö'/>");

    });

    $(document).on("click", "#spenden", function () {
    });
    $("body").html("Name: <input type='text' id='anmeldename'/><br>")
            .append("<br><input type='button' value='Liebe' id='love'/>")
            .append("<br><input type='button' value='Beruf' id='job'/>")
            .append("<br><input type='button' value='logout' id='logout'/>")
            .append("<br><input type='button' value='Abzocke' id='geld'/>");

    $(document).on("click", "#nö", function () {
      $("body") .html("<br><input type='button' value='Liebe' id='love'/>")
                .append("<br><input type='button' value='Beruf' id='job'/>")
                .append("<br><input type='button' value='logout' id='logout'/>");


    });

    $(document).on("click", "#geld", function () {

        $("body").html("So viel Geld haben diese Trottel bisher bei uns liegen lassen: " + don + " <br><br>")  // Spendenzähler muss verbessert werden
                .append("<input type='button' value='Zurück' id='back1'/>");
    });
});
