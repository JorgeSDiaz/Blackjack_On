const api = (() => {
    // Private
    const resource = "http://localhost:8080/v1/user";

    // Public
    const register = (username, email, password) => {
        return new Promise((resolve, reject) => {
            let user = {
                username: username,
                email: email,
                password: password
            }

            $.ajax({
                url: resource + "/",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(user),
                success: (res) => resolve(res),
                error: (err) => reject(err)
            })
        });
    };

    const login = (username, password) => {
        return new Promise((resolve, reject) => {
            let user = {
                username: username,
                password: password
            }

            $.ajax({
                url: resource + "/login",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(user),
                success: (res) => resolve(res),
                error: (err) => reject(err)
            })
        });
    };

    return {
        register: (username, email, password) => {
            return register(username, email, password);
        },
        login: (username, password) => {
            return login(username, password);
        }
    };
})();