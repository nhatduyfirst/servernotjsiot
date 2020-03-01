const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.static("public"));
app.set('views', './views');
app.set('view engine', 'ejs');

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(1337);


//user và pass ??nh tr??c
var user = "admin", pass = 123;
//Devices
var Devices = [];
var nameDevicesjson;
var table = [];


io.on("connection", function (socket) {
    console.log("co nguoi ket noi " + socket.id);

    socket.on("disconnect", function () {
        console.log(socket.id + " disconnected");
    });
    socket.on("Client-Login", function (usr, pwd) {     
        console.log(usr + " vua dang nhap voi pass: " + pwd);
        if (usr == user && pwd == pass) {
            socket.emit("Success-login");
            fs.readFile('public/Control.json', function (err, infDevice) {
                if (err) {
                    throw err;
                }
                else {
                    socket.emit("InfDevices", JSON.parse(infDevice));
                }
            })
        }
        else {
            socket.emit("Failed-login");
        };
    });
    socket.on("New-device", function (nameDevice) {
        nameDevicesjson = JSON.stringify(nameDevice);
        //nameDevicesjson = nameDevicesjson + ": "+0;
        if (Devices.indexOf(nameDevicesjson) >= 0) {
            socket.emit("Failed-to-add");
        }
        else {
            Devices.push(nameDevicesjson);
            socket.emit("Server-send-data", nameDevicesjson);
            console.log(Devices)
            //nameDevicesjson = JSON.parse(nameDevicesjson);
            fs.writeFile('./public/Control.json', Devices, function () { });
                
            //console.log("json: " + nameDevicesjson);
            
            
        };
        
    });
   
});



app.get('/', function (req, res) {
    res.render('demo');
});