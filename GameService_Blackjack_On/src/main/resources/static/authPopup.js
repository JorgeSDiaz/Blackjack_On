const myMSALObj = new msal.PublicClientApplication(msalConfig);

let username = "";

function selectAccount() {
    const currentAccounts = myMSALObj.getAllAccounts();
    if (currentAccounts.length === 1) {
        username = currentAccounts[0].username;
    }
}

function handleResponse(response) {
    if (response !== null) {
        username = response.account.username;
        seeRole()
            .then(() => {
                window.location.href = "/menu.html";
            })
            .catch(err => {
                alert(err);
            });
    } else {
        selectAccount();
    }
}

function getTokenPopup(request) {
    request.account = myMSALObj.getAccountByUsername(username);

    return myMSALObj.acquireTokenSilent(request)
        .catch(error => {
            console.warn("silent token acquisition fails. acquiring token using popup");
            if (error instanceof msal.InteractionRequiredAuthError) {
                return myMSALObj.acquireTokenPopup(request)
                    .then(tokenResponse => {
                        console.log(tokenResponse);
                        return tokenResponse;
                    })
                    .catch(error => {
                        console.error(error);
                        throw error;
                    });
            } else {
                console.warn(error);
                throw error;
            }
        });
}

function signIn() {
    myMSALObj.loginPopup(loginRequest)
        .then(handleResponse)
        .catch(error => {
            console.error(error);
        });
}

function signOut() {
    const logoutRequest = {
        account: myMSALObj.getAccountByUsername(username),
        postLogoutRedirectUri: msalConfig.auth.redirectUri,
        mainWindowRedirectUri: msalConfig.auth.redirectUri
    };

    myMSALObj.logoutPopup(logoutRequest).then(()=>{
        window.location.href = "/login.html";
    })
}

function saveInSessionStorage(response) {
    return new Promise((resolve, reject) => {
        try {
            let objectUser = {
                "name":response.displayName,
                "rol":response.jobTitle
            };
            sessionStorage.setItem('userInSession', (JSON.stringify(objectUser)));
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

function seeRole() {
    return getTokenPopup(loginRequest)
        .then(response => {
            return callMSGraph(graphConfig.graphMeEndpoint, response.accessToken);
        })
        .then(graphResponse => {
            return saveInSessionStorage(graphResponse);
        })
        .catch(error => {
            console.error(error);
            throw error;
        });
}

selectAccount();