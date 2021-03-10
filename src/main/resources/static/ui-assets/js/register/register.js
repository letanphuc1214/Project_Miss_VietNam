// var candidateRegister = {} || candidateRegister;
//
// //Trang chủ: Đăng ký
// candidateRegister.register = function (){
//     if ($('#formDemo').valid()){
//         var candidate = {};
//         candidate.fullName = $('#fullname').val();
//
//         var age =candidateRegister.getAge($('#dateofbirth').val());
//         candidate.dateOfBirth = age;
//
//         candidate.residentialAddress = $('#residentialaddress').val();
//         candidate.contactAddress = $('#contactaddress').val();
//         candidate.phone = $('#phone').val();
//         candidate.email = $('#email').val();
//         candidate.idCard = $('#idcard').val();
//         candidate.job = $('#job').val();
//         candidate.education = educations.findById(parseInt($('#educationlv').val()));
//         candidate.ethnicity = ethnicities.findById(parseInt($('#ethnicity').val()));
//         candidate.workUnit = $('#workunit').val();
//         candidate.height = $('#height').val();
//         candidate.weight = $('#weight').val();
//         candidate.gifted = $('#gifted').val();
//         candidate.avatar = $('#base64').val();
//         candidate.province = provinces.findById(parseInt($('#province').val()));
//         console.log(candidate);
//         $.ajax({
//             url: 'http://localhost:8080/api/candidate/',
//             method: 'POST',
//             dataType: 'json',
//             contentType: 'application/json',
//             data: JSON.stringify(candidate),
//             success: function (data){
//                 if (data.code === 2){
//                     toastr.info('Đăng ký thành công');
//                     setTimeout(function (){
//                         location.reload();
//                     }, 2000);
//                     // candidateRegister.registeredList().reload();
//                     // $('#formDemo').validate().resetForm();
//                     // candidateRegister.resetForm();
//                     $('#imageHtml').html(
//                         `<img id="output" height="150px" width="100px">`
//                     );
//                 }else {
//                     data.stringListMessage.map(e => toastr.error(e));
//                 }
//             },
//             error: function (){
//                 toastr.error('Lỗi đăng ký không thành công');
//             },
//
//         });
//
//     }
//     return false;
// }
//
// //list danh sách tỉnh thành ở form đăng ký
// var provinces = provinces || {};
// var provinceData = [];
// provinces.initProvince = function () {
//     $.ajax({
//         url: 'http://localhost:8080/api/provinces/',
//         method: 'GET',
//         dataType: 'json',
//         success: function (data) {
//             provinceData = data;
//             $("#province").empty();
//             $.each(data, function (i, v) {
//                 $("#province").append(
//                     `<option  value='${v.id}'>${v.provinceName}</option>`
//                 );
//             });
//         }
//     })
// }
//
// provinces.findById = function (id) {
//     return provinceData.filter(e => {
//         return e.id === id
//     })[0]
// }
//
// //list danh sách dân tộc ở form đăng ký
// var ethnicities = ethnicities || {};
// var ethnicityData = [];
// ethnicities.initEthnicity = function () {
//     $.ajax({
//         url: 'http://localhost:8080/api/ethnicities/',
//         method: 'GET',
//         dataType: 'json',
//         success: function (data) {
//             ethnicityData = data;
//             $("#ethnicity").empty();
//             $.each(data, function (i, v) {
//                 $("#ethnicity").append(
//                     `<option  value='${v.id}'>${v.ethnicityName}</option>`
//                 );
//             });
//         }
//     });
// }
// ethnicities.findById = function (id) {
//     return ethnicityData.filter(e => {
//         return e.id === id
//     })[0]
// }
//
// //list danh sách trình độ học vấn ở form đăng ký
// var educations = educations || {};
// var educationData = [];
// educations.initEducation = function () {
//     $.ajax({
//         url: 'http://localhost:8080/api/educations/',
//         method: 'GET',
//         dataType: 'json',
//         success: function (data) {
//             educationData = data;
//             $("#educationlv").empty();
//             $.each(data, function (i, v) {
//                 $("#educationlv").append(
//                     `<option  value='${v.id}'>${v.educationName}</option>`
//                 );
//             });
//         }
//     })
// }
// educations.findById = function (id) {
//     return educationData.filter(e => {
//         return e.id === id
//     })[0]
// }
//
// //Tính tuổi
// candidateRegister.getAge = function (data) {
//     var today = new Date();
//     var birthDate = new Date(data);
//     var age = today.getFullYear() - birthDate.getFullYear();
//     var m = today.getMonth() - birthDate.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//         age--;
//     }
//     if (age < 18 || age > 27) {
//         return null
//     }
//     return data;
// }
//
// candidateRegister.resetForm = function (){
//     $('#formDemo')[0].reset();
//     $('#id').val(0);
//     $('#fullname').val('');
//     $('#dateofbirth').val('');
//     $('#residentialaddress').val('');
//     $('#contactaddress').val('');
//     $('#phone').val('');
//     $('#email').val('');
//     $('#idcard').val('');
//     $('#job').val('');
//     $('#educationlv').val($('#educationlv option:first').val());
//     $('#ethnicity').val($('#ethnicity option:first').val());
//     $('#workunit').val('');
//     $('#height').val('');
//     $('#weight').val('');
//     $('#gifted').val('');
//     $('#image').val(null);
//     $('#output').remove();
//     $('#province').val($('#province option:first').val());
// }
//
// candidateRegister.validation = function (){
//     $('#formDemo').validate({
//         rules: {
//             fullname: {
//                 required: true,
//                 minlength: 4,
//                 maxlength: 50,
//                 validateFullName: true,
//             },
//             dateofbirth: {
//                 required: true,
//                 // validateDateOfBirth: true,
//             },
//             residentialaddress: {
//                 required: true,
//                 minlength: 1,
//                 maxlength: 200,
//                 // validateResidentialAddress: true,
//             },
//             contactaddress: {
//                 required: true,
//                 minlength: 1,
//                 maxlength: 200,
//                 // validateContactAddress: true,
//             },
//             phone: {
//                 required: true,
//                 minlength: 10,
//                 validatePhone: true,
//             },
//             email: {
//                 required: true,
//                 validateEmail: true,
//             },
//             idcard: {
//                 required: true,
//                 minlength: 9,
//                 maxlength: 10,
//                 validateIdCard: true,
//             },
//             job: {
//                 required: true,
//                 minlength: 2,
//                 maxlength: 45,
//                 validateJob: true,
//             },
//             educationlv: {
//                 required: true,
//             },
//             ethnicity: {
//                 required: true,
//             },
//             workunit: {
//                 required: true,
//                 minlength: 1,
//                 maxlength: 200,
//                 validateWorkUnit: true,
//             },
//             height: {
//                 required: true,
//                 min: 163,
//                 max: 250,
//             },
//             weight: {
//                 required: true,
//                 min: 30,
//                 max: 70,
//             },
//             gifted: {
//                 required: true,
//                 minlength: 3,
//                 maxlength: 100,
//                 validateGifted: true,
//             },
//             avatar: {
//                 required: true,
//             },
//             province: {
//                 required: true,
//             },
//         },
//         messages: {
//             fullname: {
//                 required: 'Họ và tên không được để trống',
//                 minlength: 'Họ và tên không được ít hơn 4 kí tự',
//                 maxlength: 'Họ và tên không được dài hơn 50 kí tự',
//             },
//             dateofbirth: {
//                 required: 'Tuổi phải từ 18 đến 27',
//             },
//             residentialaddress: {
//                 required: 'Địa chỉ cư trú không được để trống',
//                 minlength: 'Địa chỉ cư trú không được ít hơn 1 kí tự',
//                 maxlength: 'Địa chỉ cư trú không được dài hơn 200 kí tự',
//             },
//             contactaddress: {
//                 required: 'Địa chỉ liên lạc không được để trống',
//                 minlength: 'Địa chỉ liên lạc không được ít hơn 1 kí tự',
//                 maxlength: 'Địa chỉ liên lạc không được dài hơn 200 kí tự',
//             },
//             phone: {
//                 required: 'Số điện thoại không được để trống',
//                 minlength: 'Số điện thoại không được ít hơn 10 số',
//             },
//             email: {
//                 required: 'Email không được để trống',
//             },
//             idcard: {
//                 required: 'Chứng minh thư không được để trống',
//                 minlength: 'Chứng minh thư không được ít hơn 9 số',
//                 maxlength: 'Chứng minh thư không được dài hơn 10 số',
//             },
//             job: {
//                 required: 'Nghề nghiệp không được để trống',
//                 minlength: 'Địa chỉ liên lạc không được ít hơn 2 kí tự',
//                 maxlength: 'Địa chỉ liên lạc không được dài hơn 45 kí tự',
//             },
//             educationlv: {
//                 required: 'Trình độ văn hóa không được để trống',
//             },
//             ethnicity: {
//                 required: 'Dân tộc không được để trống',
//             },
//             workunit: {
//                 required: 'Đơn vị công tác không được để trống',
//                 minlength: 'Đơn vị công tác không được ít hơn 1 kí tự',
//                 maxlength: 'Đơn vị công tác không được dài hơn 200 kí tự',
//             },
//             height: {
//                 required: 'Chiều cao không được để trống',
//                 min: 'Chiều cao không được thấp hơn 1m63',
//                 max: 'Chiều cao không được cao hơn 2m50',
//             },
//             weight: {
//                 required: 'Cân nặng không được để trống',
//                 min: 'Cân nặng không được dưới 30kg',
//                 max: 'Cân nặng không được quá 70kg',
//             },
//             gifted: {
//                 required: 'Năng khiếu không được để trống',
//                 minlength: 'Năng khiếu không được ít hơn 3 kí tự',
//                 maxlength: 'Năng khiếu không được dài hơn 100 kí tự',
//             },
//             avatar: {
//                 required: 'Ảnh cá nhân không được để trống',
//             },
//             province: {
//                 required: 'Tỉnh thành không được để trống',
//             },
//         }
//     });
// }
//
// $.validator.addMethod('validateFullName', function (value, element){
//     return this.optional(element) || /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/i.test(value);
// }, 'Họ và tên không đúng định dạng');
//
// $.validator.addMethod('validateDateOfBirth', function (value, element){
//     return this.optional(element) || i.test(value);
// }, 'Tuổi phải từ 18 đến 27 tuổi');
//
// // $.validator.addMethod('validateResidentialAddress', function (value, element){
// //     return this.optional(element) || /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/i.test(value);
// // }, 'Địa chỉ cư trú không đúng định dạng');
// //
// // $.validator.addMethod('validateContactAddress', function (value, element){
// //     return this.optional(element) || /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/i.test(value);
// // }, 'Địa chỉ liên lạc không đúng định dạng');
//
// $.validator.addMethod('validatePhone', function (value, element){
//     return this.optional(element) || /^(08|09|03|07|)([0-9]{8})$/i.test(value);
// }, 'Số điện thoại không đúng định dạng');
//
// $.validator.addMethod('validateEmail', function (value, element){
//     return this.optional(element) || /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/i.test(value);
// }, 'Email không đúng định dạng');
//
// $.validator.addMethod('validateIdCard', function (value, element){
//     return this.optional(element) || /^([0-9]{9,10})$/i.test(value);
// }, 'Chứng minh thư không đúng định dạng');
//
// $.validator.addMethod('validateJob', function (value, element){
//     return this.optional(element) || /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/i.test(value);
// }, 'tên ngghề nghiệp không đúng định dạng');
//
// $.validator.addMethod('validateWorkUnit', function (value, element){
//     return this.optional(element) || /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/i.test(value);
// }, 'tên đơn vị công tác không đúng định dạng');
//
// $.validator.addMethod('validateGifted', function (value, element){
//     return this.optional(element) || /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/i.test(value);
// }, 'Tên năng khiếu không đúng định dạng');
//
// $(document).ready(function (){
//     candidateRegister.validation();
//     provinces.initProvince();
//     ethnicities.initEthnicity();
//     educations.initEducation();
// })