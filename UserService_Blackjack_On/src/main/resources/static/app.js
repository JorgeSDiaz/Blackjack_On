const app = (() => {
    // Private
    const client = api;

    // Public
    const login = () => {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        api.login(username, password).then((res) => {
            window.open("https://youtu.be/DEhNSqEw184");
        }).catch((err) => {
            console.log(err);
        });
    }

    const register = () => {
        let username = document.getElementById("re-username").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("re-password").value;
        let re_password = document.getElementById("re-npassword").value;

        if (password === re_password) {
            api.register(username, email, password).then((res) => {
                window.location.href = "login.html";
            }).catch((err) => {
                console.log(err);
            });
        } else {
            alert("Password doesn't match, please try again.")
        }
    }

    return {
        login: login,
        register: register
    };
})();