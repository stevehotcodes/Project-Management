let signupBtn = doccument.getElementById("signupBtn");
let signinBtn = doccument.getElementById("signinBtn");
let nameField = doccument.getElementById("nameField");
let title = doccument.getElementById("title");


signinBtn.onclick = function(){
    nameField.style.maxHeight = "0";
    title.innerHTML = "Sign In";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");
}

signupBtn.onclick = function(){
    nameField.style.maxHeight = "60px";
    title.innerHTML = "Sign Up";
    signupBtn.classList.remove("disable");
    signinBtn.classList.add("disable");
}
