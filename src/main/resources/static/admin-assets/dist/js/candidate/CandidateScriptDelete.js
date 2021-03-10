var candidates = {} || candidates;

candidates.intTable = function () {
    var id;
    $("#candidates-datatables").DataTable({
        ajax: {
            url: 'http://localhost:8080/api/candidatesDeleted/',
            method: 'GET',
            dataType: 'json',
            dataSrc: '',
        },
        columns: [
            {
                data: "id",
                name: "id",
                title: "Id",
                orderable: true,
                sortable: false,
                "render": function (data){
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
                    var str = "<div><a href='javascript:' onclick='candidates.getCandidateDelete("+id+")' title='Xem thông tin'>" + data + "</a></div>";
                    return str;
                },
            },
            {
                data: 'province',
                name: 'provinceName',
                title: 'Tỉnh thành',
                orderable: false,
                sortable: true,
                "render": function (data){
                    return data.provinceName;
                },
            },
            {
                data: 'ethnicity',
                name: 'ethnicityName',
                title: 'Dân tộc',
                orderable: false,
                sortable: true,
                "render": function (data){
                    return data.ethnicityName;
                },
            },
            {
                data: 'status',
                name: 'status',
                title: 'Trạng thái',
                orderable: false,
                sortable: true,
                "render": function (data){
                    return `<span class=\"status 
                        ${(data === 'Chờ duyệt'? 'text-warning'
                        : (data ==='Đã duyệt' ? 'text-success' : 'text-danger'))} \">&bull;</span>
                            <a href='javascript:' title='Thay đổi trạng thái' onclick='candidates.status(${id})'>${data}</a>`
                },
            },
            {
                data: 'id',
                name: 'action',
                title: 'Thao tác',
                orderable: false,
                sortable: false,
                "render": function (data){
                    return `<div>
                                <a href="javscript:" onclick="candidates.undo(${data})" title="Khôi phục"><i class=\"fa fa-undo\" aria-hidden=\"true\"></i></a>
                                <a href="javscript:" onclick="candidates.delete(${data})" title="Xóa"><i class=\"fa fa-trash\"></i></a>
                            </div>`
                }
            },
        ]
    });
}

candidates.delete = function (id){
    bootbox.confirm({
        message: 'Bạn muốn xóa hồ sơ thí sinh này?',
        buttons: {
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
                    url: 'http://localhost:8080/api/candidateDeleted/' + id,
                    method: 'DELETE',
                    dataType: 'json',
                    success: function (){
                        $("#candidates-datatables").DataTable().ajax.reload();
                        toastr.info('Xóa thành công');
                    },
                    error: function (jqXHR, exception){
                        toastr.error('Lỗi!! Xóa không thành công');
                    }
                });
            }
        },
    });
}

candidates.undo = function (id){
    bootbox.confirm({
        message: 'Bạn muốn khôi phục hồ sơ thí sinh này?',
        buttons: {
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
                    url: 'http://localhost:8080/api/candidateUndo/' + id,
                    method: 'PUT',
                    dataType: 'json',
                    success: function (){
                        $('#candidates-datatables').DataTable().ajax.reload();
                        toastr.info('Khôi phục thành công');
                    },
                    error: function (jqXHR, exception){
                        toastr.info('Lỗi!! Khôi phục không thành công');
                    }
                });
            }
        }
    });
}

candidates.getCandidateDelete = function (id){
    $.ajax({
        url: 'http://localhost:8080/api/candidateDeleted/' + id,
        method: 'GET',
        dataType: 'json',
        success: function (data){
            $('#formAddEdit')[0].reset();
            $('#modalTitle').html('Thông tin thí sinh');
            $('#id').val(data.id);
            $('#fullname').val(data.fullName);
            $('#dateofbirth').val(data.dateOfBirth);
            $('#residentialaddress').val(data.residentialAddress);
            $('#contactaddress').val(data.contactAddress);
            $('#phone').val(data.phone);
            $('#email').val(data.email);
            $('#idcard').val(data.idCard);
            $('#educationlv').val(data.education.id);
            $('#ethnicity').val(data.ethnicity.id);
            $('#job').val(data.job);
            $('#height').val(data.height);
            $('#weight').val(data.weight);
            $('#workunit').val(data.workUnit);
            $('#gifted').val(data.gifted);
            $('#province').val(data.province.id);
            $('#imageHtml').html(
                `<img class="form-control" src="${data.avatar}"
                           name="image" id="image" style="width: 210px;height: 260px">`
            );
            $('.form-control').attr('disabled', 'disabled');
            $('#modalAddEdit').modal('show');
        }
    });
}

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

$(document).ready(function (){
    candidates.intTable();
    provinces.initProvince();
    ethnicities.initEthnicity();
    educations.initEducation();

});