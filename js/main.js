(function ($) {
    "use strict";

    // Zmienna pomocnicza blokująca sprawdzanie scrolla podczas animacji menu
    var isAnimatingScroll = false;

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
    new WOW({
        live: false
    }).init();


    // Sticky Navbar - Zmodyfikowane: reaguje tylko wtedy, gdy NIE trwa animacja skoku
    $(window).scroll(function () {
        if (isAnimatingScroll) return; // Jeśli animujemy, ignoruj przeliczanie klas menu!
        
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    // Smooth scrolling on the navbar links - Naprawa laga startowego i blokada scroll listenera
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            var targetScroll = $(this.hash).offset().top - 60;
            if (targetScroll < 0) {
                targetScroll = 0;
            }
            
            // 1. Włączamy blokadę dla skryptu Sticky Navbar
            isAnimatingScroll = true;

            // 2. Jeśli wracamy na samą górę (Home), od razu przygotowujemy stan paska nawigacji
            if (targetScroll === 0) {
                $('.navbar').removeClass('sticky-top shadow-sm');
            } else {
                $('.navbar').addClass('sticky-top shadow-sm');
            }
            
            // 3. Wykonujemy animację bez ingerencji zdarzenia scroll window
            $('html, body').stop().animate({
                scrollTop: targetScroll
            }, 600, 'swing', function() {
                // 4. Funkcja callback: po zakończeniu animacji zdejmujemy blokadę
                isAnimatingScroll = false;
            });
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if (isAnimatingScroll) return; // Ignoruj podczas animacji
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        isAnimatingScroll = true;
        $('.navbar').removeClass('sticky-top shadow-sm'); // Przygotuj navbar na powrót na górę
        
        $('html, body').stop().animate({scrollTop: 0}, 600, 'swing', function() {
            isAnimatingScroll = false;
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
