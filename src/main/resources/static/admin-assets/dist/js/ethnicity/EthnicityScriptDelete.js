var ethnicitys = {}|| ethnicity;
ethnicitys.intTable = function (){
    $('#ethnicities-datatables').DataTable({
        ajax:{
            url: 'http://localhost:8080/api/ethnicitiesDeleted/',
            method: 'GET',
            dataType: 'json',
            dataSrc: '',
        },
        columns:[
            {
                data: "id", name: "id", title: "Id", orderable: true
            },
            {
                data: "ethnicityName", name: "ethnicityName", title: "Tên dân tộc", orderable: "true"
            },
            {
                data: "id", name: "action", title: "Thao tác", "render": function (data){
                    var str = "<div><a href='javascript:' onclick='ethnicitys.undo("+data+")' title='Khôi phục'><i class=\"fa fa-undo\" aria-hidden=\"true\"></i></a> " +
                        "<a href='javascript:' onclick='ethnicitys.delete("+data+")' title='Xóa'><i class=\"fa fa-trash\"></i></a>" +
                        "</div>"
                    return str;
                }
            }
        ],
    })
}

ethnicitys.delete = function (id){
    bootbox.confirm({
        message: "Bạn muốn xóa dân tộc này? ",
        button:{
            confirm: {
                label: 'Có',
                className: 'btn-success',
            },
            cancel:{
                label: 'Không',
                className: 'btn-danger',
            }
        },
        callback: function (result){
            if (result){
                $.ajax({
                    url: 'http://localhost:8080/api/ethnicityDeleted/' + id,
                    method: 'DELETE',
                    dataType: 'json',
                    success: function (){
                        $('#ethnicities-datatables').DataTable().ajax.reload();
                        toastr.info("Xóa thành công");
                    },
                    error: function (jsqXHR, exception){
                        toastr.info("Lỗi!! Xóa không thành công");
                    }
                });
            }
        }
    });
}

ethnicitys.undo = function (id){
    bootbox.confirm({
        message: "Bạn muốn khôi phục dân tộc này?",
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
                    url: 'http://localhost:8080/api/ethnicityUndo/' + id,
                    method: 'PUT',
                    dataType: 'json',
                    success: function (){
                        $('#ethnicities-datatables').DataTable().ajax.reload();
                        toastr.info('Khôi phục thành công');
                    },
                    error: function (jqXHR, exception){
                        toastr.error('Lỗi!! Xóa không thành công')
                    }
                })
            }
        }
    })
}

ethnicitys.resetForm = function (){
    $('#formAddEdit')[0].reset();
    $('#id').val(0);
    $('#ethnicityName').val("");
}
$(document).ready(function (){
    ethnicitys.intTable();
})