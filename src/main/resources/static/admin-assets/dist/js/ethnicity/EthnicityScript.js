var ethnicitys = {}|| ethnicity;
ethnicitys.intTable = function (){
    $('#ethnicities-datatables').DataTable({
        ajax:{
            url: 'https://missvietnam.herokuapp.com/api/ethnicities/',
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
                    var str = "<div><a href='javascript:' onclick='ethnicitys.get("+data+")' title='Chỉnh sửa', data-toggle=\"modal\" data-target=\"#modalAddEdit\"><i class=\"fa fa-cogs\" aria-hidden=\"true\"></i></a> " +
                        "<a href='javascript:' onclick='ethnicitys.delete("+data+")' title='Xóa'><i class=\"fa fa-trash\"></i></a>" +
                        "</div>"
                    return str;
                }
            }
        ],
    })
}

ethnicitys.addNew = function (){
    $("#modalTitle").html("Thêm dân tộc");
    $(".hideHtml").hide();
    $(".form-control").removeAttr("disabled");
    $("#save").show();
    ethnicitys.validation();
    ethnicitys.resetForm();
    $("#formAddEdit").validate().resetForm();
    $("#modalAddEdit").modal("show");
}

ethnicitys.save = function (){
    if ($("#formAddEdit").valid()){
        if ($("#id").val() == 0){
            var ethnicityObj = {};
            ethnicityObj.ethnicityName = $("#ethnicityName").val();
            $.ajax({
                url: 'https://missvietnam.herokuapp.com/api/ethnicity/',
                method: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(ethnicityObj),
                done: function (){
                    $('#modalAddEdit').modal('hide');
                    $('#ethnicities-datatables').DataTable().ajax.reload();
                },
                success: function (data){
                    if (data.code === 2){
                        $('#modalAddEdit').modal('hide');
                        $('#ethnicities-datatables').DataTable().ajax.reload();
                        toastr.info("Thêm mới dân tộc thành công");
                    }else {
                        data.stringListMessage.map(e => toastr.error(e));
                    }
                }
            });
        }else {
            var ethnicityObj = {};
            ethnicityObj.ethnicityName = $("#ethnicityName").val();
            ethnicityObj.id = $("#id").val();
            $.ajax({
                url: 'https://missvietnam.herokuapp.com/api/ethnicity/',
                method: 'PUT',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(ethnicityObj),
                success: function (data){
                    if (data.code === 2){
                        $('#modalAddEdit').modal('hide');
                        $('#ethnicities-datatables').DataTable().ajax.reload();
                        toastr.info("Chỉnh sửa dân tộc thành công");
                    }else {
                        data.stringListMessage.map(e => toastr.error(e));
                    }
                }
            });
        }
        $("#formAddEdit").validate().resetForm();
    }
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
                    url: 'https://missvietnam.herokuapp.com/api/ethnicity/' + id,
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

ethnicitys.get = function (id){
    $.ajax({
        url: 'https://missvietnam.herokuapp.com/api/ethnicity/' + id,
        method: 'GET',
        dataType: 'json',
        success: function (data){
            $('#formAddEdit')[0].reset();
            $('.form-control').removeAttr('disabled');
            $('#modalTitle').html('Chỉnh sửa dân tộc');
            $('.hideHtml').hide();
            $('#save').show();
            $('#id').val(data.id);
            $('#ethnicityName').val(data.ethnicityName);
            $('#formAddEdit').validate().resetForm();
            $('#modalAddEdit').modal('show');
        }
    });
};

ethnicitys.resetForm = function (){
    $('#formAddEdit')[0].reset();
    $('#id').val(0);
    $('#ethnicityName').val("");
}

ethnicitys.validation = function (){
    $('#formAddEdit').validate({
        rules: {
            ethnicityName: {
                required: true,
                minlength: 2,
                maxlength: 20,
                // validateEthnicityName: true,
            },
        },
        messages: {
            ethnicityName: {
                required: "Hãy nhập tên dân tộc",
                minlength: "Tên dân tộc không được dưới 2 kí tự",
                maxlength: "Tên dân tộc không được quá 20 kí tự",
            },
        },
    });
}

$.validator.addMethod('validateEthnicityName', function (value, element){
    return this.optional(element) || /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/i.test(value);
}, 'Tên dân tộc không đúng định dạng');

$(document).ready(function (){
    ethnicitys.intTable();
    ethnicitys.validation();
})