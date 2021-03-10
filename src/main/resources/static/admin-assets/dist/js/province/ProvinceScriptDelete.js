var provinces = {}|| provinces;
provinces.intTable = function (){
    $("#provinces-datatables").dataTable({
        ajax:{
            url: 'http://localhost:8080/api/provincesDeleted/',
            method: 'GET',
            dataType: 'json',
            dataSrc: '',
        },
        columns:[
            {
                data: "id", name: "Id", title:"Id", orderable: true
            },
            {
                data: "provinceName", name: "ProvinceName", title: "Tên tỉnh thành", orderable: true
            },
            {
                data: "id", name: "action", title: "Thao tác", orderable: true, sortable: false, "render": function (data){
                    var str="<div><a href='javascript:' onclick='provinces.undo("+data+")' title='Chỉnh sửa'><i class=\"fa fa-undo\" aria-hidden=\"true\"></i></a>"+
                        "<a href='javascript:' onclick='provinces.delete("+data+")'><i class=\"fa fa-trash\" title=\"Delete\"></a>" +
                        "</div>"
                    return str;
                }
            }
        ]
    });
};

provinces.delete = function (id){
    bootbox.confirm({
        message: "Bạn muốn xóa tỉnh thành này?",
        button:{
            confirm:{
                label: "Có",
                className: "btn-success",
            },
            cancel: {
                label: "Không",
                className: "btn-danger",
            }
        },
        callback: function (result){
            if (result){
                $.ajax({
                    url: 'http://localhost:8080/api/provinceDeleted/' + id,
                    method: 'DELETE',
                    dataType: 'json',
                    success: function (){
                        $("#provinces-datatables").DataTable().ajax.reload();
                        toastr.info("Bạn đã xóa tỉnh thành thành công.");
                    },
                    error: function (jqXHR, exception){
                        toastr.info("Lỗi!! Xóa không thành công.")
                    }
                });
            }
        }
    });
}
provinces.undo = function (id){
    bootbox.confirm({
        message: "Bạn muốn khôi phục tỉnh thành này?",
        button:{
            confirm:{
                label: "Có",
                className: "btn-success",
            },
            cancel: {
                label: "Không",
                className: "btn-danger",
            }
        },
        callback: function (result){
            if (result){
                $.ajax({
                    url: 'http://localhost:8080/api/provinceUndo/' + id,
                    method: 'PUT',
                    dataType: 'json',
                    success: function (){
                        $("#provinces-datatables").DataTable().ajax.reload();
                        toastr.info("Khôi phục thành công");
                    },
                    error: function (jsqXHR, exception){
                        toastr.info("Lỗi!! Xóa không thành công.")
                    }
                });
            }
        }
    });
}

provinces.resetForm = function (){
    $("#formAddEdit")[0].reset();
    $("#provinceName").val("");
    $("#id").val(0);
}

$(document).ready(function (){
    provinces.intTable();
});
