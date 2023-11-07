"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const email_input_el = document.querySelector(".email");
const password_input_el = document.querySelector(".password");
const sign_in_btn = document.querySelector(".sign-in-btn");
console.log(sign_in_btn);
const signin_form = document.querySelector(".sign-in-form");
const email_error_msg = document.querySelector(".email-error-msg");
const password_error_msg = document.querySelector(".password-error-msg");
sign_in_btn.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    console.log("I am clicked");
    let email = email_input_el.value;
    let password = password_input_el.value;
    if (!email) {
        email_error_msg.textContent = 'Email address is required';
        email_error_msg.style.opacity = "1";
        setTimeout(() => {
            email_error_msg.textContent = '';
        }, 3000);
    }
    if (!password) {
        password_error_msg.textContent = 'Password is required';
        password_error_msg.style.opacity = "1";
        setTimeout(() => {
            password_error_msg.textContent = '';
        }, 3000);
    }
    let status = email && password;
    if (status) {
        try {
            const loginResponse = yield fetch('http://localhost:3000/user/login', {
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    'email': email,
                    'password': password
                })
            });
            if (loginResponse.ok) {
                const data = yield loginResponse.json();
                console.log("I have this data", data);
                localStorage.setItem('data', data.token);
                yield redirectToDashboard();
            }
            else {
                console.log("Login failed:", loginResponse.statusText);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}));
function redirectToDashboard() {
    return __awaiter(this, void 0, void 0, function* () {
        const token = localStorage.getItem('data');
        try {
            const userResponse = yield fetch(`http://localhost:3000/user/checkuserdetails`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'token': token
                },
                method: "GET"
            });
            if (userResponse.ok) {
                const data = yield userResponse.json();
                console.log(data['info']);
                if (data.info.role === 'employees') {
                    localStorage.setItem('userEmail', data.info.email);
                    location.href = 'user-dashboard.html';
                }
                else if (data.info.role === 'admin') {
                    localStorage.setItem('userEmail', data.info.email);
                    location.href = './admin-dashboard.html';
                }
            }
            else {
                console.log("Failed to fetch user details:", userResponse.statusText);
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
