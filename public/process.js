
$(document).ready(function () {
    var socket = io("http://localhost:1337")
    $("#Dashboard").hide(0);
    $("#loginForm").show(1000);
    $("#btnLogin").click(function () {
        socket.emit("Client-Login", $("#txtUsername").val(), $("#password").val());
    })
    $("#btnLogout").click(function () {
        $("#Dashboard").hide(0);
        $("#loginForm").show(1000);
    });
    socket.on("Failed-login", function () {
        alert("Sai Username hoặc mật khẩu");
    });
    socket.on("Success-login", function (item) {
        $("#Dashboard").show(2000);
        $("#loginForm").hide(1000);
    });
    socket.on("InfDevices", function (item) {
        $(".boxDevices").append("<div class='ms'>" + item + "<br></div>");
    });
    $("#btnAdd").click(function () {
        socket.emit("New-device", $("#textDevice").val());
    });
    socket.on("Server-send-data", function(data){
        $(".boxDevices").append("<div class='ms'>"+data+"<br></div>");
    });
    socket.on("Failed-to-add", function () {
        alert("Thiết bị đã tồn tại, vui lòng đổi tên khác!");
    });
    



});
