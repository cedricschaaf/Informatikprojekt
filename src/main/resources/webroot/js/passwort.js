/* global don */

$(document).ready(function () {

    $(document).on("click", "#logout", function () {
        $.post("../anfrage", {
            typ: "logout"
        }, function (data) {
            if (data.typ == "logout") {
                $("body").html("Name: <input type='text' id='anmeldename'/><br>")
                        .append("Passwort: <input type='password' id='passwort'/><br>\n")
                        .append("<input type='button' value='OK' id='anmeldeknopf'/>")
                        .append("<input type='button' value='Registrieren' id='signup'/>")
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
                    $("body").html("Gratulation, du bist angemeldet!")
                            .append("<br><input type='button' value='Liebe' id='love'/>")
                            .append("<br><input type='button' value='Beruf' id='job'/>")
                            .append("<br><input type='button' value='logout' id='logout'/>");
                } else {
                    $("body").append("<br>Die Anmeldedaten waren leider falsch!");
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
                                .append("<input type='button' value='OK' id='anmeldeknopf'/>")
                                .append("<input type='button' value='Registrieren' id='signup'/>")

                    } else {
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
                .append("Benutzername: <input type='text' id='regname'/><br>\n")
                .append("Passwort    : <input type='password' id='regpasswort1'/><br>\n")
                .append("Geburtstag  : <input type='geburt1' id='geburt1'/><br>\n")
                .append("Geburtsmonat  : <input type='geburt2' id='geburt2'/><br>\n")
                .append("<input type='button' value='Registrieren' id='oksignup'/>")
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
            passwort: $("#rpasswort").val()
        });
        $("body").html("Sie wurden erfolgreich registriert!")
                .append("<br><input type='button' value='Liebe' id='love'/>")
                .append("<br><input type='button' value='Beruf' id='job'/>")
                .append("<br><input type='button' value='logout' id='logout'/>");

    });


});

$(document).on("click", "#love", function () {
    $("body").html("Sie haben die Liebe gewählt. Möchten Sie für ihr Sternzeichen  das Horoskop erfahren? <br><br>") // Sternzeichen einfügen
            .append("<input type='button' value='OK' id='horoskop'/>")
            .append("<input type='button' value='Zurück' id='back1'/>");
});

$(document).on("click", "#job", function () {
    $("body").html("Sie haben den Beruf gewählt. Möchten Sie für ihr Sternzeichen  das Horoskop erfahren? <br><br>") // Sternzeichen einfügen
            .append("<input type='button' value='OK' id='horoskop1'/>")
            .append("<input type='button' value='Zurück' id='back1'/>");
});

$(document).on("click", "#back1", function () {
    $("body").html("Name: <input type='text' id='anmeldename'/><br>")
            .append("<br><input type='button' value='Liebe' id='love'/>")
            .append("<br><input type='button' value='Beruf' id='job'/>")
            .append("<br><input type='button' value='logout' id='logout'/>");

});

$(document).on("click", "#horoskop", function () {
    $("body").html("Ihr Horoskop fur ihr Sternzeichen  lautet wie folgt:  <br><br>") // Sternzeichen einfügen
            .append("<input type='button' value='Weiter' id='weiter'/>")
});

$(document).on("click", "#horoskop1", function () {
    $("body").html("Ihr Horoskop fur ihr Sternzeichen  lautet wie folgt:  <br><br>") // Sternzeichen einfügen
            .append("<input type='button' value='Weiter' id='weiter'/>")
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
    $("body").html("Name: <input type='text' id='anmeldename'/><br>")
            .append("<br><input type='button' value='Liebe' id='love'/>")
            .append("<br><input type='button' value='Beruf' id='job'/>")
            .append("<br><input type='button' value='logout' id='logout'/>");


});

$(document).on("click", "#geld", function () {

    $("body").html("So viel Geld haben diese Trottel bisher bei uns liegen lassen: " + don + " <br><br>")  // Spendenzähler muss verbessert werden
            .append("<input type='button' value='Zurück' id='back1'/>");
});
