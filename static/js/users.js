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

document.querySelector("#login").addEventListener('click', (evt) => {
    // Disable the button
    let btn = evt.target;
    btn.disabled = true;

    // Get data from form
    let username = document.querySelector("#login-username");
    let password = document.querySelector("#login-password");

    // Make request
    fetch('/login', {
        cache: 'no-cache',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'username': username.value,
            'password': password.value
        })
    }).then((response) => {
        if (response.status != 200)
        {
            error_message.login(response.statusText);
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
        });
        btn.disabled = false;
    }).catch((error) => {
        error_message.login(error)
        btn.disabled = false;
    });
});

document.querySelectorAll(".alert").forEach((elem) => {
    elem.addEventListener('click', (evt) => {
        evt.target.style.display = 'none';
    })
});
