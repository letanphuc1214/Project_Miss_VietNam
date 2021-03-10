var openFile = function (event){
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function (){
        var dataUrl = reader.result;
        var output = document.getElementById('output');
        output.src = dataUrl;
        document.getElementById('base64').value = dataUrl;
    }
    reader.readAsDataURL(input.files[0]);
};