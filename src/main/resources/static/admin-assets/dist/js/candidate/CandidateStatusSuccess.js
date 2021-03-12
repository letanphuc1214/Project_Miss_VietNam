var candidates = {} || candidates;

candidates.intTable = function () {
    var id;
    $("#candidates-datatables").DataTable({
        ajax: {
            url: 'http://localhost:8080/api/candidateSuccess/',
            method: 'GET',
            dataType: 'json',
            dataSrc: '',
        },
        columns: [
            {
                data: "id", name: "ID", title: "ID", orderable: true, "render": function (data) {
                    id = data;
                    return id;
                },
            },
            {
                data: "fullName",
                name: "fullname",
                title: "Họ và tên",
                orderable: false,
                sortable: true,
                "render": function (data) {
                    // var str = "<div><a href='javascript:' onclick='candidates.get(this.title," + id + ")' title='Xem thông tin'>" + data + "</a></div>"
                    var str = `<div>
                                        <a href="javascript:" onclick="candidates.get(this.title, ${id})" title="Xem thông tin">
                                            ${data}
                                        </a>
                                  </div>`;
                    return str;
                },
            },
            {
                data: "province",
                name: "provinceName",
                title: "Tỉnh thành",
                orderable: false,
                sortable: true,
                "render": function (data) {
                    var str = data.provinceName;
                    return str;
                },
            },
            {
                data: "ethnicity",
                name: "ethnicityName",
                title: "Dân tộc",
                orderable: false,
                sortable: true,
                "render": function (data) {
                    var str = data.ethnicityName;
                    return str;
                },
            },
            {
                data: "status",
                name: "status",
                title: "Trạng thái",
                sortable: true,
                "render": function (data) {
                    return `<span class=\"status text-success">&bull;</span>
                            <a href='javascript:' title='Thay đổi trạng thái' onclick='candidates.status(${id})'>${data}</a>`;
                }
            },
            {
                data: "id",
                name: "action",
                title: "Thao tác",
                sortable: false,
                orderable: false,
                "render": function (data) {
                    var str = "<div>" +
                        "<a href='javascript:' onclick='candidates.get(this.title," + data + ")'  title='Chỉnh sửa' data-toggle=\"modal\" data-target=\"#modalAddEdit\"><i class=\"fa fa-cogs\" aria-hidden=\"true\"></i></a>" +
                        "<a href='javascript:' onclick='candidates.delete(" + data + ")' title='Xóa'><i class=\"fa fa-trash\"></i></a>" +
                        "</div>"
                    return str;
                }
            },
        ]
    });
}

candidates.save = function () {
    if ($("#formAddEdit").valid()) {
            var candidateObj = {};
            candidateObj.fullName = $("#fullname").val().trim();
            candidateObj.dateOfBirth = $("#dateofbirth").val();
            candidateObj.residentialAddress = $("#residentialaddress").val();
            candidateObj.contactAddress = $("#contactaddress").val();
            candidateObj.phone = $("#phone").val();
            candidateObj.email = $("#email").val();
            candidateObj.idCard = $("#idcard").val();
            candidateObj.job = $("#job").val();
            candidateObj.education = educations.findById(parseInt($("#educationlv").val()));
            candidateObj.ethnicity = ethnicities.findById(parseInt($("#ethnicity").val()));
            candidateObj.workUnit = $("#workunit").val();
            candidateObj.height = $("#height").val();
            candidateObj.weight = $("#weight").val();
            candidateObj.gifted = $("#gifted").val();
            candidateObj.avatar = $("#base64").val();
            candidateObj.province = provinces.findById(parseInt($("#province").val()));
            candidateObj.status = $("#status").val();
            candidateObj.id = $("#id").val();
            console.log(candidateObj);
            $.ajax({
                url: 'http://localhost:8080/api/candidate/',
                method: 'PUT',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(candidateObj),
                success: function (data) {
                    if (data.code === 2) {
                        $("#modalAddEdit").modal('hide');
                        $("#candidates-datatables").DataTable().ajax.reload();
                        toastr.info('Chỉnh sửa thí sinh thành công');
                    } else {
                        data.stringListMessage.map(e => toastr.error(e));
                    }
                }
            });
        }
        $("#formAddEdit").validate().resetForm();
}

candidates.delete = function (id) {
    bootbox.confirm({
        message: "Bạn muốn xóa thí sinh này?",
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
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: 'http://localhost:8080/api/candidate/' + id,
                    method: 'DELETE',
                    dataType: 'json',
                    success: function () {
                        $("#candidates-datatables").DataTable().ajax.reload();
                        toastr.info("Xóa thí sinh thành công");
                    },
                    error: function (jqXHR, exception) {
                        toastr.error("Lỗi!! Xóa không thành công");
                    }
                });
            }
        }
    })
}

candidates.get = function (title, id) {
    $.ajax({
        url: 'http://localhost:8080/api/candidate/' + id,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $("#formAddEdit")[0].reset();
            $(".form-control").removeAttr('disabled');
            if (title === "Chỉnh sửa") {
                $("#modalTitle").html('Chỉnh sửa thông tin thí sinh');
                $("#save").show();
                $("#base64").val(data.avatar);
                $('#imageHtml').html(
                    `<img id='output' class="form-control" style="height: 65vh; width: 50vh"  src="${data.avatar}">
                            <input class="form-control" type='file' accept='image/*' onchange='openFile(event)' name="fileUpdate" ><br>`
                );
            }
            if (title === "Xem thông tin") {
                $("#modalTitle").html('Thông tin chi tiết thí sinh');
                $('#imageHtml').html(
                    `<img class="form-control" src="${data.avatar}"
                           name="image" id="image" style="height: 65vh; width: 50vh">`
                );
                $("#save").hide();
                // $('.form-control').attr('disabled', 'disabled');
            }
            $("#id").val(data.id);
            $("#fullname").val(data.fullName);
            // console.log(data.dateOfBirth);
            $("#dateofbirth").val(data.dateOfBirth);
            $("#residentialaddress").val(data.residentialAddress);
            $("#contactaddress").val(data.contactAddress);
            $("#phone").val(data.phone);
            $("#email").val(data.email);
            $("#idcard").val(data.idCard);
            $("#job").val(data.job);
            $("#educationlv").val(data.education.id);
            $("#ethnicity").val(data.ethnicity.id);
            $("#workunit").val(data.workUnit);
            $("#height").val(data.height);
            $("#weight").val(data.weight);
            $("#gifted").val(data.gifted);
            $("#status").val(data.status);
            $("#province").val(data.province.id);
            $("#formAddEdit").validate().resetForm();
            $("#modalAddEdit").modal('show');
        }
    });
};

var provinces = provinces || {};
var provinceData = [];
provinces.initProvince = function () {
    $.ajax({
        url: 'http://localhost:8080/api/provinces/',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            provinceData = data;
            $("#province").empty();
            $.each(data, function (i, v) {
                $("#province").append(
                    `<option class="form-control noDisable" value='${v.id}'>${v.provinceName}</option>`
                );
            });
        }
    })
}

provinces.findById = function (id) {
    return provinceData.filter(e => {
        return e.id === id
    })[0]
}

var ethnicities = ethnicities || {};
var ethnicityData = [];
ethnicities.initEthnicity = function () {
    $.ajax({
        url: 'http://localhost:8080/api/ethnicities/',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            ethnicityData = data;
            $("#ethnicity").empty();
            $.each(data, function (i, v) {
                $("#ethnicity").append(
                    `<option class="form-control noDisable" value='${v.id}'>${v.ethnicityName}</option>`
                );
            });
        }
    })
}
ethnicities.findById = function (id) {
    return ethnicityData.filter(e => {
        return e.id === id
    })[0]
}

var educations = educations || {};
var educationData = [];
educations.initEducation = function () {
    $.ajax({
        url: 'http://localhost:8080/api/educations/',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            educationData = data;
            $("#educationlv").empty();
            $.each(data, function (i, v) {
                $("#educationlv").append(
                    `<option class="form-control noDisable" value='${v.id}'>${v.educationName}</option>`
                );
            });
        }
    })
}
educations.findById = function (id) {
    return educationData.filter(e => {
        return e.id === id
    })[0]
}

candidates.resetForm = function () {
    $("#formAddEdit")[0].reset();
    $("#id").val(0);
    $("#fullname").val("");
    $("#dateofbirth").val("");
    $("#residentialaddress").val("");
    $("#contactaddress").val("");
    $("#phone").val("");
    $("#email").val("");
    $("#idcard").val("");
    $("#job").val("");
    $("#educationlv").val($("#educationlv option:first").val());
    $("#ethnicicty").val($("#ethnicicty option:first").val());
    $("#workunit").val("");
    $("#height").val("");
    $("#weight").val("");
    $("#gifted").val("");
    $("#imageHtml").val("");
    $("#province").val($("#province option:first").val());
}


candidates.getAge = function (data) {
    var today = new Date();
    var birthDate = new Date(data);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (age < 18 || age > 27) {
        return null
    }
    return data;
}

candidates.status = function (id) {
    $.ajax({
        url: 'http://localhost:8080/api/status/' + id,
        method: 'GET',
        dataType: 'json',
        success: function (data) {

            if (data.status === "Đã duyệt") {
                $(".status").removeClass("text-warning");
                $(".status").addClass("text-success");
                $("#candidates-datatables").DataTable().ajax.reload();
                toastr.info("Đổi sang trạng thái đã duyệt thành công");
            } else if (data.status === "Bị loại") {
                $(".status").removeClass("text-success");
                $(".status").addClass("text-danger");
                $("#candidates-datatables").DataTable().ajax.reload();
                toastr.info("Đổi sang trạng thái bị loại thành công")
            }
        },
        error: function (jqXHR, exception) {
            toastr.error("Lỗi!! Không thể thay đổi trạng thái");
        }
    });
}

candidates.validation = function (){
    $('#formAddEdit').validate({
        rules: {
            fullname: {
                required: true,
                minlength: 4,
                maxlength: 50,
                validateFullName: true,
            },
            dateofbirth: {
                required: true,
                // validateDateOfBirth: true,
            },
            residentialaddress: {
                required: true,
                minlength: 3,
                maxlength: 200,
                // validateResidentialAddress: true,
            },
            contactaddress: {
                required: true,
                minlength: 3,
                maxlength: 200,
                // validateContactAddress: true,
            },
            phone: {
                required: true,
                minlength: 10,
                validatePhone: true,
            },
            email: {
                required: true,
                validateEmail: true,
            },
            idcard: {
                required: true,
                minlength: 9,
                maxlength: 10,
                validateIdCard: true,
            },
            job: {
                required: true,
                minlength: 3,
                maxlength: 45,
                validateJob: true,
            },
            educationlv: {
                required: true,
            },
            ethnicity: {
                required: true,
            },
            workunit: {
                required: true,
                minlength: 3,
                maxlength: 200,
                validateWorkUnit: true,
            },
            height: {
                required: true,
                min: 163,
                max: 250,
            },
            weight: {
                required: true,
                min: 30,
                max: 70,
            },
            gifted: {
                required: true,
                minlength: 3,
                maxlength: 100,
                validateGifted: true,
            },
            avatar: {
                required: true,
            },
            province: {
                required: true,
            },
        },
        messages: {
            fullname: {
                required: 'Họ và tên không được để trống',
                minlength: 'Họ và tên không được ít hơn 4 kí tự',
                maxlength: 'Họ và tên không được dài hơn 50 kí tự',
            },
            dateofbirth: {
                required: 'Tuổi phải từ 18 đến 27',
            },
            residentialaddress: {
                required: 'Địa chỉ cư trú không được để trống',
                minlength: 'Địa chỉ cư trú không được ít hơn 3 kí tự',
                maxlength: 'Địa chỉ cư trú không được dài hơn 200 kí tự',
            },
            contactaddress: {
                required: 'Địa chỉ liên lạc không được để trống',
                minlength: 'Địa chỉ liên lạc không được ít hơn 3 kí tự',
                maxlength: 'Địa chỉ liên lạc không được dài hơn 200 kí tự',
            },
            phone: {
                required: 'Số điện thoại không được để trống',
                minlength: 'Số điện thoại không được ít hơn 10 số',
            },
            email: {
                required: 'Email không được để trống',
            },
            idcard: {
                required: 'Chứng minh thư không được để trống',
                minlength: 'Chứng minh thư không được ít hơn 9 số',
                maxlength: 'Chứng minh thư không được dài hơn 10 số',
            },
            job: {
                required: 'Nghề nghiệp không được để trống',
                minlength: 'Địa chỉ liên lạc không được ít hơn 3 kí tự',
                maxlength: 'Địa chỉ liên lạc không được dài hơn 45 kí tự',
            },
            educationlv: {
                required: 'Trình độ văn hóa không được để trống',
            },
            ethnicity: {
                required: 'Dân tộc không được để trống',
            },
            workunit: {
                required: 'Đơn vị công tác không được để trống',
                minlength: 'Đơn vị công tác không được ít hơn 3 kí tự',
                maxlength: 'Đơn vị công tác không được dài hơn 200 kí tự',
            },
            height: {
                required: 'Chiều cao không được để trống',
                min: 'Chiều cao không được thấp hơn 1m63',
                max: 'Chiều cao không được cao hơn 2m50',
            },
            weight: {
                required: 'Cân nặng không được để trống',
                min: 'Cân nặng không được dưới 30kg',
                max: 'Cân nặng không được quá 70kg',
            },
            gifted: {
                required: 'Năng khiếu không được để trống',
                minlength: 'Năng khiếu không được ít hơn 3 kí tự',
                maxlength: 'Năng khiếu không được dài hơn 100 kí tự',
            },
            avatar: {
                required: 'Ảnh cá nhân không được để trống',
            },
            province: {
                required: 'Tỉnh thành không được để trống',
            },
        }
    });
}

$.validator.addMethod('validateFullName', function (value, element){
    return this.optional(element) || /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/i.test(value);
}, 'Họ và tên không đúng định dạng');

$.validator.addMethod('validateDateOfBirth', function (value, element){
    return this.optional(element) || i.test(value);
}, 'Tuổi phải từ 18 đến 27 tuổi');

// $.validator.addMethod('validateResidentialAddress', function (value, element){
//     return this.optional(element) || /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/i.test(value);
// }, 'Địa chỉ cư trú không đúng định dạng');
//
// $.validator.addMethod('validateContactAddress', function (value, element){
//     return this.optional(element) || /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/i.test(value);
// }, 'Địa chỉ liên lạc không đúng định dạng');

$.validator.addMethod('validatePhone', function (value, element){
    return this.optional(element) || /^(08|09|03|07|)([0-9]{8})$/i.test(value);
}, 'Số điện thoại không đúng định dạng');

$.validator.addMethod('validateEmail', function (value, element){
    return this.optional(element) || /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/i.test(value);
}, 'Email không đúng định dạng');

$.validator.addMethod('validateIdCard', function (value, element){
    return this.optional(element) || /^([0-9]{9,10})$/i.test(value);
}, 'Chứng minh thư không đúng định dạng');

$.validator.addMethod('validateJob', function (value, element){
    return this.optional(element) || /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/i.test(value);
}, 'tên ngghề nghiệp không đúng định dạng');

$.validator.addMethod('validateWorkUnit', function (value, element){
    return this.optional(element) || /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/i.test(value);
}, 'tên đơn vị công tác không đúng định dạng');

$.validator.addMethod('validateGifted', function (value, element){
    return this.optional(element) || /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/i.test(value);
}, 'Tên năng khiếu không đúng định dạng');

$(document).ready(function () {
    candidates.intTable();
    provinces.initProvince();
    educations.initEducation();
    ethnicities.initEthnicity();
    candidates.validation();
});