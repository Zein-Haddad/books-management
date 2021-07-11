const error_message = (() => {
    let login_alert = document.querySelector("#login-alert");
    let register_alert = document.querySelector("#register-alert");

    const login = (message) => {
        login_alert.style.display = 'block';
        login_alert.innerHTML = message;
    }

    const register = (message) => {
        register_alert.style.display = 'block';
        register_alert.innerHTML = message;
    }

    return {login, register}
})();

const request = (() => {
    const form_login = (username, password) => {
        fetch('/login', {
            cache: 'no-cache',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'username': username,
                'password': password
            })
        }).then((response) => {
            if (response.status != 200)
            {
                error_message.login(response.statusText);
                return;
            }
            response.json().then((data) => {
                switch(data.result)
                {
                    case 0:
                        location.reload();
                        break;
                    case 1:
                        error_message.login('Wrong username or password');
                        break;
                    case 2:
                        error_message.login('Please, fill the form');
                        break;
                }
            })
        }).catch((error) => {
            error_message.login(error);
        });
    }

    const form_register = (username, email, password, confirmation) => {
        fetch('/register', {
            cache: 'no-cache',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'username': username,
                'email': email,
                'password': password,
                'confirmation': confirmation
            })
        }).then((response) => {
            if (response.status != 200)
            {
                error_message.register(response.statusText);
                return;
            }
            response.json().then((data) => {
                switch(data.result)
                {
                    case 0:
                        form_login(username, password);
                        break;
                    case 1:
                        error_message.register("Inputs cannot be empty");
                        break;
                    case 2:
                        error_message.register("Username already exists");
                        break;
                    case 3:
                        error_message.register("Username cannot contains spaces");
                        break;
                    case 4:
                        error_message.register("Passwords do not match");
                        break;
                }
            });
        }).catch((error) => {
            error_message.register(error);
        });
    }

    return {form_login, form_register}
})();

let login_btn = document.querySelector("#login");
login_btn.addEventListener('click', () => {
    // Disable the button
    login_btn.disabled = true;

    // Get data from form
    let username = document.querySelector("#login-username").value;
    let password = document.querySelector("#login-password").value;

    // Make request
    request.form_login(username, password);

    // Enable the button
    login_btn.disabled = false;
});

let register_btn = document.querySelector("#register");
register_btn.addEventListener('click', (evt) => {
    register_btn.disabled = true;

    let username = document.querySelector("#register-username").value;
    let email = document.querySelector("#register-email").value;
    let password = document.querySelector("#register-password").value;
    let confirmation = document.querySelector("#register-confirmation").value;

    request.form_register(username, email, password, confirmation);

    register_btn.disabled = false;
});

document.querySelectorAll(".alert").forEach((elem) => {
    elem.addEventListener('click', (evt) => {
        evt.target.style.display = 'none';
    })
});

// Enter = 13
document.onkeyup = (e) => {
    if (e.keyCode === 13)
    {
        if (document.activeElement.name === 'login')
        {
            login_btn.click();
        }
        else if (document.activeElement.name === 'register')
        {
            register_btn.click();
        }
    }
}
