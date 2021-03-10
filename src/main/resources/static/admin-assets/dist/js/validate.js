$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();

  //Khi bàn phím được nhấn và thả ra thì sẽ chạy phương thức này
  $("#formDemo").validate({
    rules: {
      ten: {
        required: true,
        minlength:5,
        maxlength:150
      },
      ngaySinh: "required",
      diaChiCuTru: {
        required: true,
        minlength: 1,
        maxlength:200
      },
      sdt:{
        required: true,
        minlength:10,
        maxlength: 12
      },
      email:{
        required: true,
        minlength:10,
        maxlength:50
      },
      cmt:{
        required: true,
        minlength: 9,
        maxlength:12
      },
      ngheNghiep:{
        required: true,
        minlength: 2,
        maxlength:45
      },
      donViCongTac:{
        required: true,
        minlength:10,
        maxlength:45,
      },
      chieuCao:{
        required: true,
        min: 150,
        max: 250,
        number: true,
      },
      canNang:{
        required: true,
        min: 35,
        max: 70,
        number: true,
      },
      nangKhieu:{
        required: true,
        minlength: 2,
        maxlength: 45
      },
      anhCaNhan:{
        required: true,
        minlength: 20,
        maxlength:400
      },
      tenTinh:{
        required: true,
        minlength: 10,
        maxlength: 100
      },
      tenDanToc:{
        required: true,
        minlength: 5,
        maxlength: 80
      },
      tenTrinhDoVH:{
        required: true,
        minlength: 5,
        maxlength: 100
      },
      tieuDe:{
        required: true,
        minlength: 5,
        maxlength: 300
      },
      noiDungTomTat: "required",
      noiDung:"required"
    },
    messages: {
      ten: "Vui lòng nhập Họ tên",
      ngaySinh: "Vui lòng nhập Ngày Sinh",
      diaChiCuTru: {
        required: "Vui lòng nhập Địa chỉ",
        minlength: "Địa chỉ quá ngắn",
        maxlength:"Đia chỉ quá dài"
      },
      sdt:{
        required: "Vui lòng nhập Số điện thoại",
        minlength: "Số điện thoại quá ngắn",
        maxlength:"Số điện thoại quá dài"
      },
      email: {
        required: "Vui lòng nhập Email",
        minlength: "Email quá ngắn",
        maxlength:"Email quá dài"
      },
      cmt:{
        required: "Vui lòng nhập Chứng minh thư",
        minlength: "Chứng minh thư quá ngắn",
        maxlength:"Chứng minh thư quá dài"
      },
      ngheNghiep: {
        required: "Vui lòng nhập Nghề nghiệp",
        minlength: "Nghề nghiệp quá ngắn",
        maxlength:"Nghề nghiệp quá dài"
      },
      donViCongTac: {
        required: "Vui lòng nhập Đơn vị công tác",
        minlength: "Đơn vị công tác quá ngắn",
        maxlength:"Đơn vị công tác quá dài"
      },
      chieuCao: {
        required: "Vui lòng nhập Chiều cao",
        minlength: "Chiều cao quá thấp",
        maxlength:"Chiều cao quá dài"
      },
      canNang: {
        required: "Vui lòng nhập Cân nặng",
        minlength: "Cân nặng quá nhẹ",
        maxlength:"Cân nặng quá nặng"
      },
      nangKhieu: {
        required: "Vui lòng nhập Năng khiếu",
        minlength: "Năng khiếu quá ngắn",
        maxlength:"Năng khiếu quá dài"
      },
      anhCaNhan: {
        required: "Vui lòng nhập URL ảnh",
        minlength: "URL ảnh quá ngắn",
        maxlength:"URL ảnh quá dài"
      },
      tenTinh:{
        required: "Vui lòng nhập Tên Tỉnh",
        minlength: "Tên Tỉnh quá ngắn",
        maxlength: "Tên Tỉnh quá dài",
      },
      tenDanToc:{
        required: "Vui lòng nhập Tên Dân Tộc",
        minlength: "Tên Dân tộc quá ngắn",
        maxlength: "Tên Dân tộc quá dài"
      },
      tenTrinhDoVH:{
        required: "Vui lòng nhập Tên Trình dộ văn hóa",
        minlength: "Tên Trình dộ văn hóa quá ngắn",
        maxlength: "Tên Trình dộ văn hóa quá dài"
      },
      tieuDe:{
        required: "Vui lòng nhập Tiêu đề bài viết",
        minlength: "Tiêu đề bài viết quá ngắn",
        maxlength: "Tiêu đề bài viết quá dài"
      },
      noiDungTomTat: "Vui lòng nhập Nội dung tóm tắt",
      noiDung:"Vui lòng nhập Nội dung bài viết"
    }
  });
});
