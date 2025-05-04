var navListItems = jQuery('div.setup-panel div a'),
    allWells = jQuery('.setup-content'),
    allNextBtn = jQuery('.nextBtn');

allWells.hide();

if (typeof chack_has_error === 'undefined') {
    var chack_has_error = document.getElementById("has-error");
}

navListItems.click(function (e) {
    e.preventDefault();
    var $target = jQuery(jQuery(this).attr('href')),
        $item = jQuery(this);

    if (!$item.hasClass('disabled')) {
        navListItems.addClass('active');
        $item.parent().addClass('active');
        allWells.hide();
        $target.show();
        $target.find('input:eq(0)').focus();
    }
});

allNextBtn.click(function () {
    var curStep = jQuery(this).closest(".setup-content"),
        curStepBtn = curStep.attr("id"),
        nextStepWizard = jQuery('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
        curInputs = curStep.find("input[type='text'],input[type='email'],input[type='password'],input[type='url'],textarea"),
        isValid = true;

    jQuery(".form-group").removeClass("has-error");
    for (var i = 0; i < curInputs.length; i++) {
        if (!curInputs[i].validity.valid) {
            isValid = false;
            jQuery(curInputs[i]).closest(".form-group").addClass("has-error");
        }
    }

    if (isValid)
        nextStepWizard.removeClass('disabled').trigger('click');
});

jQuery('div.setup-panel div a.active').trigger('click');

/*------------------------------------------------------------------
 Validate vizard On Change Validations 
-------------------------------------------------------------------*/
$('.validate-field').on('input', function () {
    // Check if the field is not empty
    if ($(this).val().trim() !== '') {
        this.parentNode.classList.remove('has-error')
    }
});




/*---------------------------------------------------------------------
   Vertical form wizard
-----------------------------------------------------------------------*/


var current_fs, next_fs, previous_fs; //fieldsets
var opacity;
var current = 1;
var steps = jQuery("fieldset").length;

setProgressBar(current);

$(".next").click(function () {

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();


    jQuery("#top-tabbar-vertical li").eq(jQuery("fieldset").index(next_fs)).addClass("active");


    next_fs.show();
    current_fs.animate({
        opacity: 0
    }, {
        step: function (now) {
            opacity = 1 - now;

            current_fs.css({
                'display': 'none',
                'position': 'relative'
            });
            next_fs.css({
                'opacity': opacity
            });
        },
        duration: 500
    });
    setProgressBar(++current);
});

jQuery(".previous").click(function () {

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    jQuery("#top-tabbar-vertical li").eq(jQuery("fieldset").index(current_fs)).removeClass("active");

    previous_fs.show();

    current_fs.animate({
        opacity: 0
    }, {
        step: function (now) {
            opacity = 1 - now;

            current_fs.css({
                'display': 'none',
                'position': 'relative'
            });
            previous_fs.css({
                'opacity': opacity
            });
        },
        duration: 500
    });
    setProgressBar(--current);
});

function setProgressBar(curStep) {
    var percent = parseFloat(100 / steps) * curStep;
    percent = percent.toFixed();
    jQuery(".progress-bar")
        .css("width", percent + "%")
}

jQuery(".submit").click(function () {
    return false;
})



// 

