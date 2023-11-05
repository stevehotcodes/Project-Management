"use strict";
// let errorMsg_el:NodeList<HTMLParagraphElement>=document.querySelectorAll(".error");
const errorMsg_el = document.querySelectorAll(".error");
// const input_el=document.querySelector("input")as HTMLInputElement;
const fullname_el = document.querySelector(".fullname");
const email_el = document.querySelector(".email");
const password_el = document.querySelector(".password");
const confirmPassword_el = document.querySelector(".forgotPassword");
const sign_up_btn = document.getElementById("#sign-btn-up");
const form_el = document.querySelector(".form");
form_el.addEventListener('submit', (event) => {
    event.preventDefault();
    let fullname = fullname_el.value;
    let email = email_el.value;
    let password = password_el.value;
    let confirmPassword = confirmPassword_el.value;
    let status = fullname.trim() != '' && email.trim() != '' && password.trim() != '' && confirmPassword.trim() != '';
    if (status) {
        if (password === confirmPassword) {
            const promise = new Promise((resolve, reject) => {
                fetch('http://localhostlocalhost', ());
            });
        }
    }
});
