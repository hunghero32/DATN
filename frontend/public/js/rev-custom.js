
var tpj = jQuery;
if (window.RS_MODULES === undefined) window.RS_MODULES = {};
if (RS_MODULES.modules === undefined) RS_MODULES.modules = {};
RS_MODULES.modules["revslider31"] = {
    once: RS_MODULES.modules["revslider31"] !== undefined ? RS_MODULES.modules["revslider31"].once : undefined, init: function () {
        window.revapi3 = window.revapi3 === undefined || window.revapi3 === null || window.revapi3.length === 0 ? document.getElementById("rev_slider_3_1") : window.revapi3;
        if (window.revapi3 === null || window.revapi3 === undefined || window.revapi3.length == 0) { window.revapi3initTry = window.revapi3initTry === undefined ? 0 : window.revapi3initTry + 1; if (window.revapi3initTry < 20) requestAnimationFrame(function () { RS_MODULES.modules["revslider31"].init() }); return; }
        window.revapi3 = jQuery(window.revapi3);
        if (window.revapi3.revolution == undefined) { revslider_showDoubleJqueryError("rev_slider_3_1"); return; }
        revapi3.revolutionInit({
            revapi: "revapi3",
            DPR: "dpr",
            sliderLayout: "fullwidth",
            visibilityLevels: "1240,1024,778,480",
            gridwidth: "1400,1024,778,480",
            gridheight: "1050,700,600,600",
            perspective: 600,
            perspectiveType: "global",
            editorheight: "1050,700,600,600",
            responsiveLevels: "1240,1024,778,480",
            progressBar: { disableProgressBar: true },
            navigation: {
                wheelCallDelay: 1000,
                onHoverStop: false,
                arrows: {
                    enable: true,
                    tmp: "<div class=\"tp-title-wrap\">  	<div class=\"tp-arr-imgholder\"></div> </div>",
                    style: "zeus",
                    hide_onmobile: true,
                    hide_under: "1399px",
                    left: {
                        h_offset: 30,
                        v_offset: 50
                    },
                    right: {
                        h_offset: 30,
                        v_offset: 50
                    }
                },
                bullets: {
                    enable: true,
                    tmp: "",
                    style: "hesperiden",
                    hide_over: "1399px",
                    space: 10
                }
            },
            viewPort: {
                global: false,
                globalDist: "-200px",
                enable: false
            },
            fallbacks: {
                allowHTML5AutoPlayOnAndroid: true
            },
        });

    }
} // End of RevInitScript
if (window.RS_MODULES.checkMinimal !== undefined) { window.RS_MODULES.checkMinimal(); };

// Home -2 

var tpj = jQuery;
if (window.RS_MODULES === undefined) window.RS_MODULES = {};
if (RS_MODULES.modules === undefined) RS_MODULES.modules = {};
RS_MODULES.modules["revslider11"] = {
    once: RS_MODULES.modules["revslider11"] !== undefined ? RS_MODULES.modules["revslider11"].once : undefined, init: function () {
        window.revapi1 = window.revapi1 === undefined || window.revapi1 === null || window.revapi1.length === 0 ? document.getElementById("rev_slider_1_1") : window.revapi1;
        if (window.revapi1 === null || window.revapi1 === undefined || window.revapi1.length == 0) { window.revapi1initTry = window.revapi1initTry === undefined ? 0 : window.revapi1initTry + 1; if (window.revapi1initTry < 20) requestAnimationFrame(function () { RS_MODULES.modules["revslider11"].init() }); return; }
        window.revapi1 = jQuery(window.revapi1);
        if (window.revapi1.revolution == undefined) { revslider_showDoubleJqueryError("rev_slider_1_1"); return; }
        revapi1.revolutionInit({
            revapi: "revapi1",
            DPR: "dpr",
            sliderLayout: "fullwidth",
            visibilityLevels: "1240,1024,778,480",
            gridwidth: "1400,1024,778,480",
            gridheight: "1000,600,500,400",
            perspective: 600,
            perspectiveType: "global",
            editorheight: "1000,600,500,400",
            responsiveLevels: "1240,1024,778,480",
            progressBar: { disableProgressBar: true },
            navigation: {
                wheelCallDelay: 1000,
                onHoverStop: false,
                arrows: {
                    enable: true,
                    tmp: "<div class=\"tp-title-wrap\">  	<div class=\"tp-arr-imgholder\"></div> </div>",
                    style: "zeus",
                    hide_onmobile: true,
                    hide_under: "1399px",
                    left: {
                        h_offset: 30,
                        v_offset: 10
                    },
                    right: {
                        h_offset: 30,
                        v_offset: 10
                    }
                },
                bullets: {
                    enable: true,
                    tmp: "",
                    style: "hesperiden",
                    hide_over: "1399px",
                    space: 10
                }
            },
            viewPort: {
                global: false,
                globalDist: "-200px",
                enable: false
            },
            fallbacks: {
                allowHTML5AutoPlayOnAndroid: true
            },
        });

    }
} // End of RevInitScript
if (window.RS_MODULES.checkMinimal !== undefined) { window.RS_MODULES.checkMinimal(); };
