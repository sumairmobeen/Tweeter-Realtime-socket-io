
  const url = 'https://azharregisterform.herokuapp.com';
// const url = "http://localhost:3000";
var posts = document.getElementById("posts")
var userPost = document.getElementById("userPost");
let currentUser;

var socket = io("http://localhost:3000/")

socket.on("connection",()=>{
    console.log("connected");
})

if (currentUser === undefined || currentUser === null) {
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
}


const signup = () => {

    var userEmail = document.getElementById("email").value.toLowerCase();
    var userPassword = document.getElementById("password").value
    var userName = document.getElementById("name").value
    let obj = {
        userEmail: userEmail,
        userPassword: userPassword,
        userName: userName,
        userPosts: [],
    };




    const Http = new XMLHttpRequest();
    Http.open("POST", url + "/signup");
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.stringify(obj));

    Http.onreadystatechange = (e) => {

        if (Http.readyState === 4) {


            // console.log(Http.responseText)
            let jsonRes = JSON.parse(Http.responseText)

            if (jsonRes.status === 200) {
                alert(jsonRes.message);
                window.location.href = "login.html";
            }
            else {
                alert(jsonRes.message);
            }
        }
    }
    return false;
}

const check = () => {

    var email = document.getElementById("email").value.toLowerCase();
    var password = document.getElementById("password").value

    obj = {
        email: email,
        password: password,
    }
    // console.log(obj);

    const Http = new XMLHttpRequest();

    Http.open("POST", url + "/login");
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.stringify(obj));

    Http.onreadystatechange = (e) => {

        if (Http.readyState === 4) {


            // console.log(Http.responseText);
            let jsonRes = JSON.parse(Http.responseText);

            if (jsonRes.status === 200) {
                alert(jsonRes.message);
                localStorage.setItem("currentUser", jsonRes.currentUser);
                // console.log(currentUser);
                window.location.href = "dashboard.html";
            }
            else {
                alert(jsonRes.message);
            }
        }
    }
    return false;

}

const signupSuccesfully = () => {

    var welcomeUser = document.getElementById("welcomeUser");
    var lgBtn = document.getElementById("lgBtn");
    if (currentUser === null || currentUser === undefined)
    {
        welcomeUser.innerHTML = "Signup and tweet your thoughts away";
        lgBtn.innerText = "Signup Now";
    }

   
    const Http = new XMLHttpRequest();
    Http.open("GET", url + "/successfullSignup");
    Http.send();
    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4) {
            let data = JSON.parse((Http.responseText));

            for (let i = 0; i < data.length; i++) {
                // console.log(data[i].userName)
                for (let j = 0; j < data[i].userPosts.length; j++) {

                    var postContent = document.createElement("li");
                    postContent.innerHTML = `<h4 class="userName">${data[i].userName}</h4> <p class="userPost">${data[i].userPosts[j]}</p>`;
                    // console.log(`User: ${data[i]} ${data[i].userPosts[j]}`)
                    posts.appendChild(postContent)
                }
            }
                welcomeUser.innerHTML = `Welcome, ${data[currentUser].userName}`
        }
    }
}





const post = () => {

    userPost = document.getElementById("userPost").value;
    var postContent = document.createElement("li");

    const Http = new XMLHttpRequest();
    Http.open("POST", url + "/userPost");
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.stringify({ userPost: userPost ,
                                currentUser : currentUser,
    }));

    Http.onreadystatechange = (e) => {

        jsonRes = JSON.parse((Http.responseText));
        // console.log(jsonRes[currentUser].userPosts);
        postContent.innerHTML = `<h4 class="userName">${jsonRes[currentUser].userName}</h4> <p class="userPost">${userPost}</p>`;

    }
    posts.appendChild(postContent);
    document.getElementById("userPost").value = " ";
}




let  logout = ()=> {
    if (currentUser === null || currentUser === undefined)
    {
        window.location.href = "index.html";
    }
    else{
        currentUser = null;
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
    }
  
}
// DONE WITH IT