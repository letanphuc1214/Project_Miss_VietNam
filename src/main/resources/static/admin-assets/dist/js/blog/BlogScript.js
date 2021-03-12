var blogs = {} || blogs;
blogs.intTable = function () {
    $("#blogs-datatables").DataTable({
        ajax: {
            url: "https://missvietnam.herokuapp.com/api/blogs/",
            method: "GET",
            dataType: "json",
            dataSrc: "",
        },
        columns: [
            {
                data: "id", name: "Id", title: "Id", orderable: true, "render": function (data){
                    id = data;
                    return id;
                }
            },
            {
                data: "title", name: "Title", title: "Tiêu đề", orderable: true, "render": function (data){
                    // var str ="<div><a href='javascript:' onclick='blogs.view(this.title, "+ id +")' title='View'>"+data+"</a></div>"
                    var str ="<a href='/blogview/"+ id + "' title='View'>"+ data +"</a>"
                    return str;
                }
            },
            {
                data: "contentShort", name: "Contentshort", title: "Nội dung tóm tắt", orderable: true, "render": function (data){
                    var str = data.substring(0, 50) + "...";
                    return str;
                }
            },
            {
                data: "dateAdd", name: "Date Add", title: "Ngày thêm", sortable: false
            },
            {
                data: "dateEdit", name: "Date Edit", title: "Ngày sửa", sortable: false
            },
            {
                data: "id", name: "Action", title: "Thao tác", "render": function (data) {
                    var str =
                        "<a href='/blogedit/" + data + "' title='Edit'  class='btn btn-warning fa fa-cogs' ></a>" +
                        "<a href='javascript:' class='btn btn-danger fa fa-trash' onclick='blogs.delete(" + data + ")'></a></div>"
                    return str;
                }
            }
        ],
    });
};

blogs.save = function () {
    if ($("#formAddEdit").valid()) {
        var blogObj = {};
        blogObj.image = $('#base64').val();
        blogObj.title = $('#title').val();
        blogObj.contentShort = $('#contentShort').val();
        blogObj.content = $('#content').val();
        $.ajax({
            url: 'https://missvietnam.herokuapp.com/api/blog/',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(blogObj),
            done: function () {
                $('#blogs-datatables').DataTable().ajax.reload();
            },
            success: function (data) {
                if (data.code === 2) {
                    $('#blogs-datatables').DataTable().ajax.reload();
                    toastr.info('Bài viết được thêm mới thành công')
                    $('#formAddEdit').validate().resetForm();
                    blogs.resetForm();
                    $('#imageHtml').html(
                        `<img id="output" height="150px" width="100px">`
                    );
                } else {
                    data.stringListMessage.map(e => toastr.error(e));
                }
            }
        });
        $('#formAddEdit').validate().resetForm();
    }
}

blogs.update = function () {
    if ($('#formAddEdit').valid()) {
        var blogObj = {};

        if ( $('#base64').val() === '') {
            blogObj.image = $('#base64-1').val();

        } else {
            blogObj.image = $('#base64').val();

        }
        blogObj.title = $('#title').val();
        blogObj.content = $('#content').val();
        blogObj.contentShort = $('#contentShort').val();
        blogObj.id = $('#id').val();
        blogObj.dateAdd = $('#dateAdd').val();
        console.log(blogObj);
        $.ajax({
            url: 'https://missvietnam.herokuapp.com/api/blog/',
            method: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(blogObj),
            success: function (data) {
                if (data.code === 2) {
                    $('#blogs-datatables').DataTable().ajax.reload();
                    toastr.info("Bài viết đã được chỉnh sửa thành công")
                } else {
                    data.stringListMessage.map(e => toastr.error(e));
                }
            }
        });
        $("#formAddEdit").validate().resetForm();
    }
}

// blogs.get = function () {
//     var id = $("#id").val();
//     $.ajax({
//         url: 'http://localhost:8080/api/blog' + id,
//         method: 'GET',
//         dataType: 'json',
//         success: function (data) {
//             $("#title").val(data.title);
//         }
//     });
// };

// blogs.view = function (id){
//     $.ajax({
//         url: 'http://localhost:8080/api/blog/' + id,
//         method: 'GET',
//         dataType: 'json',
//         success: function (data){
//             $('#formAddEdit')[0].reset();
//             $('#title').val(data.title);
//             $('#contentShort').val(data.contentShort);
//             $('#content').html(data.content);
//             // $('#blogs-datatables').DataTable().reload();
//         }
//     });
// };

blogs.delete = function () {
    bootbox.confirm({
        message: 'Bạn có muốn xóa bài viết này không ?',
        button: {
            confirm: {
                label: "Có",
                className: "btn-success"
            },
            cancel: {
                label: "Không",
                className: "btn-danger"
            },
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: 'http://localhost:8080/api/blog/' + id,
                    method: 'DELETE',
                    dataType: 'json',
                    success: function () {
                        $("#blogs-datatables").DataTable().ajax.reload();
                        toastr.info("Bài viết đã xóa thành công")
                    },
                    error: function (jqXHR, exception) {
                        toastr.info("Lỗi: Bài viết xóa không thành công")
                    }
                });
            }
        }
    });
    // validator.resetForm();
};

blogs.resetForm = function (){
    $('#formAddEdit')[0].reset();
    $('#id').val(0);
    // $('#base64').val("");
    $('#image').val(null);
    $('#output').remove();
    $('#title').val("");
    $('#contentShort').val("");
    $('#content').val("");
    document.getElementsByClassName("note-editable")[0].innerHTML = "";
}

blogs.validation = function (){
    $('#formAddEdit').validate({
        rules: {
            image: {
                required: true,
            },
            title: {
                required: true,
                minlength: 10,
                maxlength: 200,
            },
            contentShort: {
                required: true,
                minlength: 20,
                maxlength: 500,
            },
            content: {
                required: true,
                minlength: 500,
                maxlength: 10000,
            },
        },
        messages: {
            image: {
              required: "Hãy chọn ảnh cho tiêu đề bài viết"
            },
            title: {
                required:"Xin hãy nhập tiêu đề bài viết",
                minlength: "Tiêu đề bài viết không được dưới 20 kí tự",
                maxlength: "Tiêu đề bài viết không được quá 00 kí tự",
            },
            contentShort: {
                required: "Xin hãy nhập nội dung tóm tắt của bài viết",
                minlength: "Nội dung tóm tắt không được dưới 20 kí tự",
                maxlength: "Nội dung tóm tắt không được quá 500 kí tự",
            },
            content: {
                required: "Xin hãy nhập nội dung bài viết",
                minlength: "Nội dung bài viết không được dưới 500 kí tự",
            },
        }
    });
}

$(document).ready(function (){
    blogs.intTable();
    blogs.validation();
    // blogs.get();
})