// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js


const myMSALObj = new msal.PublicClientApplication(msalConfig);

let username = "";

window.appLogin = (()=>{
    
    const selectAccount = ()=> {

        /**
         * See here for more info on account retrieval: 
         * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
         */

        const currentAccounts = myMSALObj.getAllAccounts();
        if (currentAccounts.length === 0) {
            return;
        } else if (currentAccounts.length > 1) {
            // Add choose account code here
            console.warn("Multiple accounts detected.");
        } else if (currentAccounts.length === 1) {
            username = currentAccounts[0].username;
            console.log(username);
        }
    }

    const handleResponse = () => {

        /**
         * To see the full list of response object properties, visit:
         * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#response
         */

        if (response !== null) {
            username = response.account.username;
            console.log(response);
        } else {
            selectAccount();
        }
    }

    const signIn = ()=> {

        /**
         * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
         * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
         */

        myMSALObj.loginPopup(loginRequest)
            .then(handleResponse)
            .catch(error => {
                console.error(error);
            });
    }

    const  signOut = () => {

        /**
         * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
         * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
         */

        const logoutRequest = {
            account: myMSALObj.getAccountByUsername(username),
            postLogoutRedirectUri: msalConfig.auth.redirectUri,
            mainWindowRedirectUri: msalConfig.auth.redirectUri
        };

        myMSALObj.logoutPopup(logoutRequest);
    }


    return{
        selectAccount : ()=>{
            selectAccount();
        },
        signIn : ()=>{
            signIn();
        },
        signOut : ()=>{
            signOut();
        }
    }

})();


appLogin.selectAccount();

