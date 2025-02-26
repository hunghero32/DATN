(function () {
    "use strict";
    /*---------------------------------------------------------------------
        Fieldset
    -----------------------------------------------------------------------*/

    let currentTab = 0;
    const ActiveTab = (n) => {
        if (n == 0) {
            document.getElementById("account").classList.add("active");
            document.getElementById("account").classList.remove("done");
            document.getElementById("personal").classList.remove("done");
            document.getElementById("personal").classList.remove("active");
        }
        if (n == 1) {
            document.getElementById("account").classList.add("done");
            document.getElementById("personal").classList.add("active");
            document.getElementById("personal").classList.remove("done");
            document.getElementById("payment").classList.remove("active");
            document.getElementById("payment").classList.remove("done");
            document.getElementById("confirm").classList.remove("done");
            document.getElementById("confirm").classList.remove("active");

        }
        if (n == 2) {
            document.getElementById("account").classList.add("done");
            document.getElementById("personal").classList.add("done");
            document.getElementById("payment").classList.add("active");
            document.getElementById("payment").classList.remove("done");
            document.getElementById("confirm").classList.remove("done");
            document.getElementById("confirm").classList.remove("active");
        }
        if (n == 3) {
            document.getElementById("account").classList.add("done");
            document.getElementById("personal").classList.add("done");
            document.getElementById("payment").classList.add("done");
            document.getElementById("confirm").classList.add("active");
            document.getElementById("confirm").classList.remove("done");
        }
    }
    const showTab = (n) => {
        var x = document.getElementsByTagName("fieldset");
        x[n].style.display = "block";
        ActiveTab(n);

    }
    const nextBtnFunction = (n) => {
        var x = document.getElementsByTagName("fieldset");
        x[currentTab].style.display = "none";
        currentTab = currentTab + n;
        showTab(currentTab);
    }

    const nextbtn = document.querySelectorAll('.next')
    Array.from(nextbtn, (nbtn) => {
        nbtn.addEventListener('click', function () {
            nextBtnFunction(1);
        })
    });

    // previousbutton

    const prebtn = document.querySelectorAll('.previous')
    Array.from(prebtn, (pbtn) => {
        pbtn.addEventListener('click', function () {
            nextBtnFunction(-1);
        })
    });

    // ------------------------------ Vertical Form Wizard -------------------------------- //
    $(document).ready(function () {
        var e,
            t,
            a,
            n,
            o = 1,
            r = $("fieldset").length;

        function i(e) {
            var t = parseFloat(100 / r) * e;
            (t = t.toFixed()), $(".progress-bar").css("width", t + "%");
        }
        i(o),
            $(".next").click(function () {
                (e = $(this).parent()),
                    (t = $(this).parent().next()),
                    $("#top-tabbar-vertical li")
                        .eq($("fieldset").index(t))
                        .addClass("active"),
                    t.show(),
                    e.animate(
                        {
                            opacity: 0,
                        },
                        {
                            step: function (a) {
                                (n = 1 - a),
                                    e.css({
                                        display: "none",
                                        position: "relative",
                                    }),
                                    t.css({
                                        opacity: n,
                                    });
                            },
                            duration: 500,
                        }
                    ),
                    i(++o);
            }),
            $(".previous").click(function () {
                (e = $(this).parent()),
                    (a = $(this).parent().prev()),
                    $("#top-tabbar-vertical li")
                        .eq($("fieldset").index(e))
                        .removeClass("active"),
                    a.show(),
                    e.animate(
                        {
                            opacity: 0,
                        },
                        {
                            step: function (t) {
                                (n = 1 - t),
                                    e.css({
                                        display: "none",
                                        position: "relative",
                                    }),
                                    a.css({
                                        opacity: n,
                                    });
                            },
                            duration: 500,
                        }
                    ),
                    i(--o);
            }),
            $(".submit").click(function () {
                return !1;
            });
    });

    // ----------------------------Form-Wizard Validate----------------------------- //

    $(document).ready(function () {
        var registrationForm = $("#registration");
        if (registrationForm.length) {
            const wizard = new Enchanter(
                "registration",
                {},
                {
                    onNext: () => { },
                }
            );
        }
    })

})()

