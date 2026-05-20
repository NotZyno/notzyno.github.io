(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


     // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            // 1. Naprawa szarpnięcia Home: zabezpieczenie przed wartością ujemną
            var targetScroll = $(this.hash).offset().top - 60;
            if (targetScroll < 0) {
                targetScroll = 0;
            }
            
            // 2. Naprawa laga na wszystkich przyciskach: 
            // Opóźniamy animację o 1 milisekundę za pomocą setTimeout.
            // Dzięki temu przeglądarka najpierw zamknie menu mobilne i obsłuży kliknięcie, 
            // a dopiero potem zacznie liczyć animację, co likwiduje lag startowy.
            setTimeout(function() {
                $('html, body').stop().animate({
                    scrollTop: targetScroll
                }, 600, 'swing');
            }, 1);
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });

    let a = 4;
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').stop().animate({scrollTop: 0}, 600, 'swing');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            992:{
                items:2
            }
        }
    });
    
})(jQuery);

