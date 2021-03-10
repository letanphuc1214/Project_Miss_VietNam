var educations = {} || educations

educations.intTable = function (){
    $('#educations-datatables').DataTable({
        ajax: {
            url: 'http://localhost:8080/api/educations/',
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
                    var str = "<div><a href='javascript:' onclick='educations.get("+data+")' title='Chỉnh sửa', data-toggle=\"modal\" data-target=\"#modalAddEdit\"><i class=\"fa fa-cogs\" aria-hidden=\"true\"></i></a>" +
                        "<a href='javascript:' onclick='educations.delete("+data+")' title='Xóa'><i class=\"fa fa-trash\"></i></a>"
                        "</div>"
                    return str;
                }
            },
        ],
    })
}

educations.addNew = function (){
    $("#modalTitle").html("Thêm trình độ văn hóa");
    $(".hideHtml").hide();
    $(".form-control").removeAttr('disabled');
    $("#save").show();
    $("#formAddEdit").validate().resetForm();
    educations.resetForm();
    $("#modalAddEdit").modal('show');
}

educations.save = function (){
    if ($("#formAddEdit").valid()){
        if ($("#id").val() == 0){
            var educationObj = {};
            educationObj.educationName = $("#educationName").val();
            $.ajax({
                url: "http://localhost:8080/api/education/",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(educationObj),
                done: function (){
                        $("#modalAddEdit").modal('hide');
                        $("#educations-datatables").DataTable().ajax.reload();
                },
                success: function (data){
                    if (data.code === 2){
                        $("#modalAddEdit").modal('hide');
                        $("#educations-datatables").DataTable().ajax.reload();
                        toastr.info("Thêm trình độ văn hóa thành công");
                    }else {
                        data.stringListMessage.map(e => toastr.error(e));
                    }
                },
            });
        }else {
            var educationObj = {};
            educationObj.educationName = $("#educationName").val();
            educationObj.id = $("#id").val();
            $.ajax({
                url: "http://localhost:8080/api/education/",
                method: 'PUT',
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(educationObj),
                success: function (data){
                    if (data.code === 2){
                        $("#modalAddEdit").modal('hide');
                        $("#educations-datatables").DataTable().ajax.reload();
                        toastr.info("Chỉnh sửa trình độ văn hóa thành công");
                    }else {
                        data.stringListMessage.map(e => toastr.error(e));
                    }
                }
            });
        }
        $("#formAddEdit").validate().resetForm();
    }
}

educations.delete = function (id){
    bootbox.confirm({
        message: "Bạn muốn xóa trình độ văn hóa này? ",
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
                    url: 'http://localhost:8080/api/education/' + id,
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

educations.get = function (id){
    $.ajax({
        url: 'http://localhost:8080/api/education/' + id,
        method: 'GET',
        dataType: 'json',
        success: function (data){
            $("#formAddEdit")[0].reset();
            $(".form-control").removeAttr('disabled');
            $("#modalTitle").html('Chỉnh sửa trình độ văn hóa');
            $(".hideHtml").hide();
            $("#save").show();
            $("#id").val(data.id);
            $("#educationName").val(data.educationName);
            $("#formAddEdit").validate().resetForm();
            $("#modalAddEdit").modal('show');
        }
    });
}

educations.resetForm = function (){
    $("#formAddEdit")[0].reset();
    $("#id").val(0);
    $("#educationName").val("");
}

educations.validation = function (){
    $("#formAddEdit").validate({
        rules: {
            educationName: {
                required: true,
                minlength: 4,
                maxlength: 50,
                validateEducationName: true,
            }
        },
        messages: {
            educationName: {
                required: "Hãy nhập trình độ văn hóa",
                minlength: "Trình độ văn hóa không được dưới 4 kí tự",
                maxlength: "Trình độ văn hóa không được quá 50 kí tự",
            }
        }
    });
}

$.validator.addMethod('validateEducationName', function (value, element){
    return this.optional(element) || /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/i.test(value);
}, 'Tên trình độ học vấn không đúng định dạng');

$(document).ready(function (){
    educations.intTable();
    educations.validation();
})

