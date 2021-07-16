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
                    case 5:
                        error_message.register("Weak Password");
                        break;
                }
            });
        }).catch((error) => {
            error_message.register(error);
        });
    }

    return {form_login, form_register}
})();

const password_checker = (() => {
    const password_field = document.querySelector('#register-password');
    const register_btn = document.querySelector('#register');
    const span = {
        'min-15': document.querySelector('[min-15-req]'),
        'min-8': document.querySelector('[min-8-req]'),
        'number': document.querySelector('[num-req]'),
        'lowercase': document.querySelector('[lowercase-req]')
    }

    function check15char()
    {
        if (password_field.value.length >= 15)
        {
            span['min-15'].classList.add('text-success');
            return true;
        }
        else
        {
            span['min-15'].classList.remove('text-success');
            return false;
        }
    }

    function check8char()
    {
        if (password_field.value.length >= 8)
        {
            span['min-8'].classList.add('text-success');
            span['min-8'].classList.remove('text-danger');
            return true;
        }
        else
        {
            span['min-8'].classList.add('text-danger');
            span['min-8'].classList.remove('text-success');
            return false;
        }
    }

    function checknumber()
    {
        if (/[0-9]/.test(password_field.value))
        {
            span['number'].classList.add('text-success');
            span['number'].classList.remove('text-danger');
            return true;
        }
        else
        {
            span['number'].classList.add('text-danger');
            span['number'].classList.remove('text-success');
            return false;
        }
    }

    function checklowercase()
    {
        if (/[a-z]/.test(password_field.value))
        {
            span['lowercase'].classList.add('text-success');
            span['lowercase'].classList.remove('text-danger');
            return true;
        }
        else
        {
            span['lowercase'].classList.add('text-danger');
            span['lowercase'].classList.remove('text-success');
            return false;
        }
    }

    password_field.addEventListener('keyup', () => {
        let c1 = check8char();
        let c2 = checknumber();
        let c3 = checklowercase();
        if ((c1 && c2 && c3) || check15char())
        {
            register_btn.disabled = false;
        }
        else
        {
            register_btn.disabled = true;
        }
    });
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
