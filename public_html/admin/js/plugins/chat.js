jQuery(document).on('click', '#chat-start', function () {
    jQuery('.chat-data-left').toggleClass('show');
});
jQuery(document).on('click', '.close-btn-res', function () {
    jQuery('.chat-data-left').removeClass('show');
});
jQuery(document).on('click', '.iq-chat-ui li', function () {
    jQuery('.chat-data-left').removeClass('show');
});
jQuery(document).on('click', '.sidebar-toggle', function () {
    jQuery('.chat-data-left').addClass('show');
});
