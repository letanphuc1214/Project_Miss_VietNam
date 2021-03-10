 $(document).ready(function () {
    $(".owl-carousel").owlCarousel();
});

$('.owl-carousel').owlCarousel({
    loop: false,
    margin: 30,
    nav: true,
    responsive: {
        0: {
            items: 1
        },
        525: {
            items: 2
        },
        768: {
            items: 3
        },
        992: {
            items:4
        }
    }
})