var educations = {} || educations

educations.intTable = function (){
    $('#educations-datatables').DataTable({
        ajax: {
            url: 'http://localhost:8080/api/educationsDeleted/',
            method: 'GET',
            dataType: 'json',
            dataSrc: '',
        },
        columns: [
            {
                data: "id", name: "id", title: "id", orderable: true
            },
            {
                data: "educationName", name: "educationName", title: "Trình độ văn hóa", orderable: true
            },
            {
                data: "id", name: "action", title: "Thao tác", "render": function (data){
                    var str = "<div><a href='javascript:' onclick='educations.undo("+data+")' title='Khôi phục'><i class=\"fa fa-undo\"></i></a>" +
                        "<a href='javascript:' onclick='educations.delete("+data+")' title='Xóa'><i class=\"fa fa-trash\"></i></a>"
                    "</div>"
                    return str;
                }
            },
        ],
    })
}

educations.delete = function (id){
    bootbox.confirm({
        message: "Bạn muốn xóa trình độ văn hóa này?",
        button: {
            confirm: {
                label: "Có",
                className: "btn-success",
            },
            cancel: {
                label: "Không",
                className: "btn-danger",
            },
        },
        callback: function (result){
            if (result){
                $.ajax({
                    url: 'http://localhost:8080/api/educationDeleted/' + id,
                    method: 'DELETE',
                    dataType: 'json',
                    success: function (){
                        $("#educations-datatables").DataTable().ajax.reload();
                        toastr.info("Xóa thành công");
                    },
                    err: function (jsqXHR, exception){
                        toastr.info("Lỗi! Xóa không thành công");
                    }
                });
            }
        }
    });
}

educations.undo = function (id){
    bootbox.confirm({
        message: 'Bạn muốn khôi phục trình độ văn hóa này',
        button: {
            confirm: {
                label: 'Có',
                className: 'btn-success',
            },
            cancel: {
                label: 'Không',
                className: 'btn-danger',
            },
        },
        callback: function (result){
            if (result){
                $.ajax({
                    url: 'http://localhost:8080/api/educationUndo/' + id,
                    method: 'PUT',
                    dataType: 'json',
                    success: function (){
                        $('#educations-datatables').DataTable().ajax.reload();
                        toastr.info('Khôi phục thành công');
                    },
                    error: function (jqXHR, exception){
                        toastr.error('Lỗi!! Khôi phục không thành công');
                    }
                });
            }
        }
    });
}


educations.resetForm = function (){
    $("#formAddEdit")[0].reset();
    $("#id").val(0);
    $("#educationName").val("");
}


$(document).ready(function (){
    educations.intTable();
})

