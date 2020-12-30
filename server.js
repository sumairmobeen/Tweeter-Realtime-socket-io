let usersData = [
    {
        userEmail: "azhar40@live.co.uk",
        userPassword: "azharkhan",
        userName: "Azhar khan",
        userPosts : [],
    },
]


var currentUser;
var http = require ("http");
var path = require("path");
let socketIo = require("socket.io");
var express = require("express");
var bodyParser = require('body-parser');
var cors = require("cors");
var morgan = require("morgan");

var app = express();

var server = http.createServer(app);
var io = socketIo(server);



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use(morgan('dev'));

app.use("/",express.static(path.resolve(path.join(__dirname,"public"))));

const PORT = process.env.PORT || 3000;


app.post("/signup", (req, res, next) => {

    var currEmail = req.body.userEmail;
    var found = false;

    for (var i = 0; i < usersData.length; i++) {
        if (usersData[i].userEmail === currEmail) {
            found = true;
            break;
        }
    }
    if (found) {
        res.send(
            {
                message: "Email already exsist",
                status: 400,
            })
    }
    else {
        usersData.push(req.body);
        res.send(
            res.send({
                message: "Signed up succesfully",
                status: 200,
            })
        );
    }


});

app.post("/login", function (req, res, next) {


    let obj = req.body;
    let found = false;

    for (var i = 0; i < usersData.length; i++) {
        if (usersData[i].userEmail === obj.email) {
            found = i;
            currentUser = found;
            break;
        }
    }
    if (found === false) {
        res.send({
            message: "Email or password is wrong",
            status: 400,
        })
    }
    else if (usersData[found].userPassword === obj.password) {
        currentUser = found;
        res.send({
            message: "Signed in succesfully",
            status: 200,
            currentUser: found,
        });

    }
    else {
        res.send(
            {
                message: "Email or password is wrong",
                status: 400,
            }
        );
    }
})

app.get("/successfullSignup", (req, res, next) => {

    res.send(usersData);


});

app.post("/userPost", (req,res,next)=>{
    

    let reqBody = req.body;
    console.log(usersData);
    usersData[reqBody.currentUser].userPosts.push(reqBody.userPost);
    res.send(usersData);


})


server.listen(PORT, () => {
    console.log("server is runnin on port " + PORT);

})
