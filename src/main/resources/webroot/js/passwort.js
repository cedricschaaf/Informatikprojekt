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
    $(document).on("click", "#signup", function () {
        $("body").html("Name: <input type='text' id='rname'/><br>")
                .append("Passwort: <input type='password' id='rpasswort'/><br>\n")
                .append("<input type='button' value='Ok' id='signup2'/>")


    });
    $(document).on("click", "#signup2", function () {
        $.post("../anfrage", {
            typ: "registrierdaten",
            anmeldename: $("#rname").val(),
            passwort: $("#rpasswort").val()

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
                        $("body").html("Gratulation, du bist angemeldet!")
                                .append("<br><input type='button' value='Liebe' id='love'/>")
                                .append("<br><input type='button' value='Beruf' id='job'/>")
                                .append("<br><input type='button' value='logout' id='logout'/>");
                    }
                }
            }
    );
 $(document).on("click", "#signup", function () {
       $("body").html("Sie können sich hier nun kostenlos registrieren. <br>")
               .append("Benutzername: <input type='text' id='regname'/><br>\n")
               .append("Passwort    : <input type='passwort' id='regpasswort1'/><br>\n")
               .append("Geburtstag  : <input type='geburt' id='geburtst'/><br>\n")
                .append("<input type='button' value='Registrieren' id='oksignup'/>");
    });  
    });
