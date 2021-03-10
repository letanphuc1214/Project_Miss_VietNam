// Hiệu ứng cuộn 
function animateScroll(id) {
    var getId = "#";
    var href = id.href;
    var index = 100;
    for (let i = 0; i < id.href.length; i++) {
        if (href[i] === '#') {
            index = i;
        }
        if (i > index) {
            getId += href[i];
        }
    }

    $('html, body').animate({ scrollTop: $(getId).offset().top - 12 }, 'slow');
    return false;
}

(function ($) {
    "use strict"; // Bắt đầu sử dụng strict

    // Đóng menu responsive khi cuộn
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Kích hoạt scrollspy để thêm lớp hoạt động vào các mục trên thanh điều hướng khi cuộn
    $("body").scrollspy({
        target: "#mainNav",
        offset: 74,
    });

    // Thu gọn thanh điều hướng
    var navbarCollapse = function () {
        var nav=$("#mainNav");
        if (nav.length) {
            var contentNav = nav.offset().top;
            if (contentNav > 100) {
                nav.addClass("navbar-shrink");
            } else {
                nav.removeClass("navbar-shrink");
            }
        }
    };
    // Thu gọn ngay nếu trang không ở trên cùng
    navbarCollapse();
    // Thu gọn thanh điều hướng khi trang được cuộn
    $(window).scroll(navbarCollapse);


})(jQuery); // Kết thúc strict

