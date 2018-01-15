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
                    if (data.text == "ja"){
                             $("body").html("Sie sind angemeldet. Wählen Sie aus, was die Zukunft in den folgenden Bereichen für Sie bereit hält.")
                            .append("<br><input type='button' value='Liebe' id='love'/>")
                            .append("<br><input type='button' value='Beruf' id='job'/>")
                            .append("<br><input type='button' value='logout' id='logout'/>");
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
                        if (data.Regis == "success") {
                                                            $("body").html("Registration Erfolgreich. <br><br>")
                        .append("Name: <input type='text' id='anmeldename'/><br>")
                                .append("Passwort: <input type='password' id='passwort'/><br>\n")
                                .append("<input type='button' value='OK' id='anmeldeknopf'<br><br>")
                                .append("Benutzername: <input type='text' id='rname'/><br>\n")
                                .append("Passwort: <input type='password' id='rpasswort'/><br>\n")
                                .append("Geburtstag: <input type='geburt1' id='geburt1'/><br>\n")
                                .append("Geburtsmonat: <input type='geburt2' id='geburt2'/><br>\n")
                                .append("<input type='button' value='Registrieren' id='oksignup'/>")
                            // erfolgreich
                        } else if (data.Regis == "existiert") {
                                   $("body").html("Falsche Anmeldedaten. <br><br>")
                        .append("Name: <input type='text' id='anmeldename'/><br>")
                                .append("Passwort: <input type='password' id='passwort'/><br>\n")
                                .append("<input type='button' value='OK' id='anmeldeknopf'<br><br>")
                                .append("Benutzername: <input type='text' id='rname'/><br>\n")
                                .append("Passwort: <input type='password' id='rpasswort'/><br>\n")
                                .append("Geburtstag: <input type='geburt1' id='geburt1'/><br>\n")
                                .append("Geburtsmonat: <input type='geburt2' id='geburt2'/><br>\n")
                                .append("<input type='button' value='Registrieren' id='oksignup'/>");
                        }
                        else if (data.Regis == "fehler") {
                                                               $("body").html("Falsche Anmeldedaten. <br><br>")
                        .append("Name: <input type='text' id='anmeldename'/><br>")
                                .append("Passwort: <input type='password' id='passwort'/><br>\n")
                                .append("<input type='button' value='OK' id='anmeldeknopf'<br><br>")
                                .append("Benutzername: <input type='text' id='rname'/><br>\n")
                                .append("Passwort: <input type='password' id='rpasswort'/><br>\n")
                                .append("Geburtstag: <input type='geburt1' id='geburt1'/><br>\n")
                                .append("Geburtsmonat: <input type='geburt2' id='geburt2'/><br>\n")
                                .append("<input type='button' value='Registrieren' id='oksignup'/>");
                        }
                        else {
                                  $("body").html("Falsche Anmeldedaten. <br><br>")
                .append("Benutzername: <input type='text' id='rname'/><br>\n")
                .append("Passwort: <input type='password' id='rpasswort'/><br>\n")
                .append("Geburtstag: <input type='geburt1' id='geburt1'/><br>\n")
                .append("Geburtsmonat: <input type='geburt2' id='geburt2'/><br>\n")
                .append("<input type='button' value='Registrieren5' id='oksignup1'/>")
                .append("<input type='button' value='Zurück' id='back'/>");
                        }
                    }
                });

    });




    $(document).on("click", "#love", function () {


        $("body").html("Sie haben die Liebe gewählt. Möchten Sie für ihr Sternzeichen  das Horoskop erfahren? <br><br>") // Sternzeichen einfügen
                .append("<input type='button' value='ok' id='horoskop'/>")
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
 $("body").html("Ihr Horoskop für ihr Sternzeichen Wassermann lautet wie folgt: Sie haben schon Sehnsucht nacheinander, wenn Sie mal ein paar Stunden nichts voneinander hören. So romantisch.<br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "FISCHE") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop für ihr Sternzeichen Fische lautet wie folgt: Er/sie ist Ihnen nahe wie selten. Sie spüren seine/ihre tiefe Verbundenheit zu ihm/ihr. Wunderbar!<br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "WIDDER") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop für ihr Sternzeichen Widder lautet wie folgt: Sein/Ihr Engagement ist ansteckend und gemeinsam erreichen Sie in dieser Woche sehr viel.<br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "STIER") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop für ihr Sternzeichen Stier lautet wie folgt: Er/sie ist so unentschlossen und macht Sie mit seinem/ihrem Hin und Her völlig verrückt.<br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "ZWILLINGE") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop für ihr Sternzeichen Zwillinge lautet wie folgt: Erstens: lässt er/sie Sie nicht ausreden. Zweitens: hört er/sie Ihnen nicht richtig zu. So nervig!<br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")

                        }
                    }
                    else if (data.typ == "KREBS") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop für ihr Sternzeichen Krebs lautet wie folgt: Ein kooperativer und ausdauernder Kollege!<br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "LÖWE") {
                        if (data.text == "ok") {
  $("body").html("Ihr Horoskop für ihr Sternzeichen Löwe lautet wie folgt: Sein/Ihr hauptsächliches Interesse in dieser Woche: Sie!<br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "JUNGFRAU") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop für ihr Sternzeichen Jungfrau lautet wie folgt: Er/sie kann nicht „Nein“ sagen, wenn Sie ihn/sie um etwas bitten.<br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "WAAGE") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop für ihr Sternzeichen Waage lautet wie folgt: Von ihm/ihr geht negative Energie aus. Er/sie zieht Sie runter.<br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "SKORPION") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop für ihr Sternzeichen Skorpion lautet wie folgt: Vergesslich, unzuverlässig und völlig zerstreut. Anstrengend.<br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "SCHÜTZE") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop für ihr Sternzeichen Schütze lautet wie folgt: Er/sie überrascht Sie diese Woche mit einer schönen Neuigkeit.<br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "STEINBOCK") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop für ihr Sternzeichen Steinbock lautet wie folgt: Seine/Ihre wenige Zeit verbringt er intensiv mit Ihnen und voll auf Sie konzentriert.<br>\n")
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
 $("body").html("Ihr Horoskop für ihr Sternzeichen Wassermann lautet wie folgt: Es öffnen sich so viele Türen, dass Sie gar nicht wissen, durch welche Sie zuerst spazieren sollen. Wie auch immer Sie sich entscheiden, Ihr Weg wird von Erfolg gekrönt.<br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "FISCHE") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop für ihr Sternzeichen Fische lautet wie folgt: Vor allem im März agieren sie mit messerscharfem Verstand und können deswegen auf die nächste Gehaltserhöhung hoffen.<br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "WIDDER") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop für ihr Sternzeichen Widder lautet wie folgt:  Sie sollten sich im Job auf das Wesentliche besinnen und nichts riskieren.<br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "STIER") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop für ihr Sternzeichen Stier lautet wie folgt: Legen Sie sich am besten gleich richtig ins Zeug, das wird sich das ganze Jahr über auszahlen.<br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "ZWILLINGE") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop für ihr Sternzeichen Zwillinge lautet wie folgt: Bis Mitte Oktober haben die Zwillinge in 2017 alles erdenkliche Glück auf Ihrer Seite.<br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")

                        }
                    }
                    else if (data.typ == "KREBS") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop für ihr Sternzeichen Krebs lautet wie folgt: Erst Ende Februar verbessert sich die berufliche Situation.<br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "LÖWE") {
                        if (data.text == "ok") {
  $("body").html("Ihr Horoskop für ihr Sternzeichen Löwe lautet wie folgt: Wenn Sie die nötige Wertschätzung Ihrer Arbeit vermissen, nicht verzweifeln, es kommen auch wieder bessere Zeiten.<br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "JUNGFRAU") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop für ihr Sternzeichen Jungfrau lautet wie folgt: Ihre Vorgesetzten sind ganz überrascht, mit welchem Tatendrang Sie in das neue Jahr starten.<br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "WAAGE") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop für ihr Sternzeichen Waage lautet wie folgt: Im Sommer geht es beruflich bergauf, auch wenn es bis dahin vielleicht die ein oder andere unerwartete Veränderung gegeben hat.<br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "SKORPION") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop für ihr Sternzeichen Skorpion lautet wie folgt: Die Zeit des Skorpions kommt im Sommer, dann sprühen Sie nur so vor Energie und Überzeugungskraft.<br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "SCHÜTZE") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop für ihr Sternzeichen Schütze lautet wie folgt: Bis Juli bleibt es ein regelrechtes Auf und Ab.<br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    else if (data.typ == "STEINBOCK") {
                        if (data.text == "ok") {
 $("body").html("Ihr Horoskop für ihr Sternzeichen Steinbock lautet wie folgt: Die Bedingungen im Job sind zu Jahresbeginn geradezu optimal.<br>\n")
              .append("<input type='button' value='Weiter' id='weiter'/>")
                        }
                    }
                    
                    
                    
                });


    
    });
        $(document).on("click", "#weiter", function () {


                             $("body").html("Sie sind angemeldet. Wählen Sie aus, was die Zukunft in den folgenden Bereichen für Sie bereit hält.")
                            .append("<br><input type='button' value='Liebe' id='love'/>")
                            .append("<br><input type='button' value='Beruf' id='job'/>")
                            .append("<br><input type='button' value='logout' id='logout'/>");
    });
    });
