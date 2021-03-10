var provinces = {}|| provinces;
provinces.intTable = function (){
    $("#provinces-datatables").dataTable({
        ajax:{
            url: 'http://localhost:8080/api/provinces/',
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
                    var str="<div><a href='javascript:' onclick='provinces.get("+data+")' title='Chỉnh sửa' data-toggle=\"modal\" data-target=\"#modalAddEdit\"><i class=\"fa fa-cogs\" aria-hidden=\"true\"></i></a>"+
                        "<a href='javascript:' onclick='provinces.delete("+data+")'><i class=\"fa fa-trash\" title=\"Delete\"></a>" +
                        "</div>"
                    return str;
                }
            }
        ]
    });
};

provinces.addNew = function (){
    $('#modalTitle').html("Thêm tỉnh thành");
    $('.hideHtml').hide();
    $('.form-control').removeAttr('disabled');
    $('#save').show();
    $('#formAddEdit').validate().resetForm();
    provinces.resetForm();
    $('#modalAddEdit').modal('show');
};

provinces.save = function (){
    if ($("#formAddEdit").valid()) {
        if ($('#id').val() == 0) {
            var provinceObj = {};
            provinceObj.provinceName = $('#provinceName').val();
            $.ajax({
                url: 'http://localhost:8080/api/province/',
                method: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(provinceObj),
                done: function () {
                    $("#modalAddEdit").modal('hide');
                    $("#provinces-datatables").DataTable().ajax.reload();
                },
                success: function (data) {
                    if (data.code === 2) {
                        $('#modalAddEdit').modal('hide');
                        $('#provinces-datatables').DataTable().ajax.reload();
                        toastr.info("Thêm tỉnh thành thành công");
                    } else {
                        data.stringListMessage.map(e => toastr.error(e));
                    }
                }
            });
        } else {
            var provinceObj = {};
            provinceObj.provinceName = $('#provinceName').val();
            provinceObj.id = $('#id').val();
            $.ajax({
                url: 'http://localhost:8080/api/province/',
                method: 'PUT',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(provinceObj),
                success: function (data) {
                    if (data.code === 2) {
                        $('#modalAddEdit').modal('hide');
                        $('#provinces-datatables').DataTable().ajax.reload();
                        toastr.info("Chỉnh sửa tỉnh thành thành công");
                    } else {
                        data.stringListMessage.map(e => toastr.error(e));
                    }
                }

            });
        }
        $("#formAddEdit").validate().resetForm();
    }
}

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
                    url: 'http://localhost:8080/api/province/' + id,
                    method: 'DELETE',
                    dataType: 'json',
                    success: function (){
                        $("#provinces-datatables").DataTable().ajax.reload();
                        toastr.info("Bạn đã xóa tỉnh thành thành công.");
                    },
                    error: function (jsqXHR, exception){
                        toastr.info("Lỗi!! Xóa không thành công.")
                    }
                });
            }
        }
    });
    provinces.validate().resetForm();
}
provinces.get = function (id){
    $.ajax({
        url: 'http://localhost:8080/api/province/' + id,
        method: 'GET',
        dataType: 'json',
        success: function (data){
            $('#formAddEdit')[0].reset();
            $('.form-control').removeAttr('disabled');
            $('#modalTitle').html('Chỉnh sửa tỉnh thành');
            $('.hideHtml').hide();
            $('#save').show();
            $('#id').val(data.id);
            $('#provinceName').val(data.provinceName);
            $('#formAddEdit').validate().resetForm();
            $('#modalAddEdit').modal('show');
        }
    });
};

provinces.resetForm = function (){
    $("#formAddEdit")[0].reset();
    $("#provinceName").val("");
    $("#id").val(0);
}

provinces.validation = function (){
    $("#formAddEdit").validate({
        rules: {
            provinceName: {
                required: true,
                maxlength: 20,
                minlength: 4,
                validateProvinceName: true,
            },
        },
        messages: {
            provinceName: {
                required: 'Hãy nhập tên tỉnh thành',
                maxlength: 'Tên tỉnh thành không được quá 20 kí tự',
                minlength: 'Tên tỉnh thành không được ngắn dưới 4 kí tự'
            }
        }
    });
}

$.validator.addMethod('validateProvinceName', function (value, element){
    return this.optional(element) || /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/i.test(value);
}, 'Tên tỉnh thành không đúng định dạng');

$(document).ready(function (){
    provinces.intTable();
    provinces.validation();
});
