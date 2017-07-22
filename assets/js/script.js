$(function() {

    $(window).scroll(function() {
        if ($(document).scrollTop() > 30) {
            $('nav').addClass('shrink');
        } else {
            $('nav').removeClass('shrink');
        }
    });

});