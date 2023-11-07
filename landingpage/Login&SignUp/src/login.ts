const email_input_el = document.querySelector(".email") as HTMLInputElement;
const password_input_el = document.querySelector(".password") as HTMLInputElement;
const sign_in_btn = document.querySelector(".sign-in-btn") as HTMLInputElement;
console.log(sign_in_btn);
const signin_form = document.querySelector(".sign-in-form") as HTMLFormElement;
const email_error_msg = document.querySelector(".email-error-msg") as HTMLInputElement;
const password_error_msg = document.querySelector(".password-error-msg") as HTMLInputElement;

sign_in_btn.addEventListener("click", async (event) => {
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
            const loginResponse = await fetch('http://localhost:3000/user/login', {
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
                const data = await loginResponse.json();
                console.log("I have this data", data);
                localStorage.setItem('data', data.token);
                await redirectToDashboard();
            } else {
                console.log("Login failed:", loginResponse.statusText);
            }
        } catch (error) {
            console.log(error);
        }
    }
});

async function redirectToDashboard() {
    const token = localStorage.getItem('data') as string;

    try {
        const userResponse = await fetch(`http://localhost:3000/user/checkuserdetails`, {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'token': token
            },
            method: "GET"
        });

        if (userResponse.ok) {
            const data = await userResponse.json();
            console.log(data['info']);

            if (data.info.role === 'employee') {
                localStorage.setItem('userEmail', data.info.email);
                location.href = './user.html';
            } else if (data.info.role ==='admin') {
                localStorage.setItem('userEmail', data.info.email);
                location.href = './admin-dashboard.html';
            }
        } else {
            console.log("Failed to fetch user details:", userResponse.statusText);
        }
    } catch (error) {
        console.log(error);
    }
}
