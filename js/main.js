(function ($) {
    "use strict";

    // Zmienna blokująca zbędne przeliczenia scrolla, bez dotykania klas CSS
    var isScrollingToSection = false;

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    // Initiate the wowjs zoptymalizowane pod kątem wydajności skoku
    new WOW({
        live: false
    }).init();


    // Sticky Navbar
    $(window).scroll(function () {
        // Jeśli właśnie przewijamy animacją JS, ignorujemy pętlę scrolla, aby odciążyć CPU
        if (isScrollingToSection) return; 
        
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
            
            var targetScroll = $(this.hash).offset().top - 60;
            if (targetScroll < 0) {
                targetScroll = 0;
            }
            
            // Włączamy blokadę obciążenia procesora
            isScrollingToSection = true;
            
            $('html, body').stop().animate({
                scrollTop: targetScroll
            }, 600, 'swing', function() {
                // Po ukończeniu ruchu, przywracamy naturalny nasłuch scrolla
                isScrollingToSection = false;
                
                // Upewniamy się, że pasek po zakończeniu ruchu ma właściwą klasę na samej górze
                if ($(window).scrollTop() <= 45) {
                    $('.navbar').removeClass('sticky-top shadow-sm');
                } else {
                    $('.navbar').addClass('sticky-top shadow-sm');
                }
            });
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if (isScrollingToSection) return;
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        isScrollingToSection = true;
        
        $('html, body').stop().animate({scrollTop: 0}, 600, 'swing', function() {
            isScrollingToSection = false;
            $('.navbar').removeClass('sticky-top shadow-sm');
        });
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
