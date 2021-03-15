var blogs = {} || blogs;

//Trang chủ: Hiển thị danh sách 8 bài viết

blogs.blogCarousel = function (){
    $.ajax({
        url: 'https://missvietnam.herokuapp.com/api/lastestBlogs/',
        method: 'GET',
        dataType: 'json',
        success: function (data){
            $('#blogCarousel').innerHTML="";
            $.each(data, function (i, v){
                // var title = v.title;
                let html=
                    `<div>
                            <div class="card" style="width: 100%; height: 26rem">
                                <a href="/news/${v.id}">
                                    <img src="${v.image}" class="card-img-top" alt="Card image cap" style="height:15em">
                                </a>
                                <div class="card-body" style="overflow: hidden; text-overflow: ellipsis; ">
                                <a href="/news/${v.id}">
                                    <h6 class="card-title">${v.title}</h6>
                                </a>
                                <p class="card-text">${v.contentShort}</p>
                                </div>
                            </div>
                        </div>`

                $('#blogCarousel').owlCarousel().trigger('add.owl.carousel',
                    [jQuery('<div class="owl-item">' + html +
                        '</div>')]).trigger('refresh.owl.carousel');
            });
        }
    });
}

//Trang chủ: Xem bài viết chi tiết
// blogs.viewBlog = function (id){
//     // var id = $("#id").val();
//     $.ajax({
//         url: 'http://localhost:8080/api/blogView/' + id,
//         method: 'GET',
//         dataType: 'json',
//         success: function (data) {
//             $("#viewBlogs").append(
//                 `<div class="entry-header">
//
//                  </div>`
//             );
//         }
//     });
// }

//Trang chủ: Hiển thị tất cả bài viết

blogs.listBlog=function(data){
    $('#listBlog').html("");
    $.each(data, function (i, v) {
        $('#listBlog').append(
            `<div class="row">
                          <div class="col-md-5">
                                <a href="/news/${v.id}">
                                    <img src="${v.image}" alt="ảnh tiêu đề" style="object-fit: cover;
                                    width: 100%; margin-bottom: 0.5rem">
                                </a>
                            </div>
                            <div class="col-md-7">
                                <a href="/news/${v.id}"><h6>${v.title}</h6></a>
                                <p>${v.contentShort}</p>
                            </div>
                        </div>`
        )
    });
}

$(document).ready(function (){
    blogs.blogCarousel();
})