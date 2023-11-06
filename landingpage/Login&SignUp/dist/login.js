"use strict";
const email_input_el = document.querySelector(".email");
const password_input_el = document.querySelector(".password");
const signin_form = document.querySelector(".signin-form");
const email_error_msg = document.querySelector(".email-error-msg");
const password_error_msg = document.querySelector(".password-error-msg");
signin_form.addEventListener("submit", (event) => {
    event.preventDefault();
    let email = email_input_el.value;
    let password = password_input_el.value;
    if (!email) {
        email_error_msg.textContent = 'Email address is required';
        setTimeout(() => {
            email_error_msg.textContent = '';
        }, 3000);
    }
    if (!password) {
        password_error_msg.textContent = 'Password is required';
        setTimeout(() => {
            password_error_msg.textContent = '';
        }, 3000);
    }
    let status = email && password;
    if (status) {
        const loginPromise = new Promise((resolve, reject) => {
            fetch('http:localhost:3000/user/login', {
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                method: 'PATCH',
                body: JSON.stringify({
                    'email': email,
                    'password': password
                })
            }).then(res => res.json()).then(data => {
                console.log(data);
                localStorage.setItem('data', data.token);
                redirectToDashboard();
                resolve(data);
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
        function redirectToDashboard() {
            const token = localStorage.getItem('token');
            new Promise((resolve, reject) => {
                fetch(`http://localhost:3000/user/`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                        'token': token
                    },
                    method: "GET"
                }).then(res => {
                    // console.log(res);
                    resolve(res.json());
                }).catch(error => {
                    reject(error);
                });
            }).then(data => {
                console.log(data['info']);
                if (data['info'].role === 'employee') {
                    localStorage.setItem('user_email', data['info'].email);
                    location.href = 'employee.html';
                }
                else if (data['info'].role === 'admin') {
                    localStorage.setItem('user_email', data['info'].email);
                    location.href = 'admin.html';
                }
            });
        }
    }
});
