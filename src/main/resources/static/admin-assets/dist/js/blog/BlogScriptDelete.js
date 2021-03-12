blogs = {} || blogs;
blogs.intTable = function (){
    $("#blogs-datatables").DataTable({
        ajax: {
            url: 'https://missvietnam.herokuapp.com/api/blogsDeleted/',
            method: 'GET',
            dataType: 'json',
            dataSrc: '',
        },
        columns: [
            {
                data: "id", name: "Id", title: "Id", orderable: true
            },
            {
                data: "title", name: "Title", title: "Tiêu đề", orderable: true
            },
            {
                data: "contentShort", name: "ContentShort", title: "Nội dung tóm tắt", orderable: true, "render": function (data){
                    var str = data.substring(0, 50) + "...";
                    return str;
                }
            },
            {
                data: "id", name: "Action", title: "Thao tác", "render": function (data){
                    var str = "<a href='javascript:' onclick='blogs.undo("+data+")' class='btn btn-warning fa fa-undo' title='undo'></a>" +
                        "<a href='javascript:' onclick='blogs.delete("+data+")' class='btn btn-danger fa fa-trash'></a>"
                    return str;
                }
            },
        ],
    });
}

blogs.delete = function (id){
    bootbox.confirm({
            message: "Bạn muốn xóa bài viết này ?",
            button:{
                confirm: {
                    label: "Yes",
                    className: "btn-success",
                },
                cancel: {
                    label: "No",
                    className: "btn-danger",
                }
            },
        callback: function (result){
            if (result){
                $.ajax({
                    url: 'https://missvietnam.herokuapp.com/api/blogDeleted/' + id,
                    method: 'DELETE',
                    dataType: 'json',
                    success: function (){
                        $("#blogs-datatables").DataTable().ajax.reload();
                        toastr.info("Bài viết đã xóa thành công!");
                    },
                    error: function (jqXHR, exception){
                        toastr.info("Lỗi! Bài viết chưa được xóa");
                    }
                });
            }
        }
    });
};

blogs.undo = function (id){
    bootbox.confirm({
        message: "Bạn muốn khôi phục bài viết này ?",
        button: {
            confirm: {
                label: "Yes",
                className: "btn-success",
            },
            cancel: {
                label: "No",
                className: "btn-danger",
            }
        },
        callback: function (result){
            if (result){
                $.ajax({
                    url: 'https://missvietnam.herokuapp.com/api/blogUndo/' + id,
                    method: 'PUT',
                    dataType: 'json',
                    dataSrc: '',
                    success: function (){
                        $("#blogs-datatables").DataTable().ajax.reload();
                        toastr.info("Bài viết được khôi phục thành công!");
                    },
                    error: function (jqXHR, exception){
                        toastr.info("Lỗi! Bài viết khôi phục không thành công!");
                    }
                });
            }
        }
    });
};

$(document).ready(function (){
    blogs.intTable();
})