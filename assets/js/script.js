$(function() {

    $(window).scroll(function() {
        if ($(document).scrollTop() > 30) {
            $('nav').addClass('shrink');
        } else {
            $('nav').removeClass('shrink');
        }
    });

    $(".nav li").on("click", function() {
        $(".nav li").removeClass("active");
        $(this).addClass("active");
    });
});