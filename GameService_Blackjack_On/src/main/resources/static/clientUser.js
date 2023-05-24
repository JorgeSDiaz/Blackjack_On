export const clientUser = (() => {
    // Private
    const resource = "http://localhost:8080/v1/game";
    const registerBet = (betBox,owner) => {
        return new Promise( (resolve, reject) => {
            $.ajax(
                {
                    url: resource + "/betBox/" + owner,
                    type: "POST",
                    data: JSON.stringify(betBox),
                    contentType: "application/json",
                    success: (data) => {
                        resolve(data);
                    },
                    error: (err) => {
                        reject(err);
                    }
                }
            )
            }
        );
    };


    const addPlayers = () => {
        return new Promise( (resolve, reject) => {
            $.ajax(
                {
                    url: resource + "/player",
                    type: "GET",
                    contentType: "application/json",
                    success: (data) => {
                        resolve(data);
                    },
                    error: (err) => {
                        reject(err);
                    }
                }
            )
            }
        );
    };

    const card = () =>{
        return new Promise( (resolve, reject) => {
            $.ajax(
                {
                    url: resource + "/card",
                    type: "POST",
                    contentType: "application/json",
                    success: (data) => {
                        resolve(data);
                    },
                    error: (err) => {
                        reject(err);
                    }
                }
            )
            }
        );

    }


    // Public
    return {
        registerBet: (betBox,owner) => {
            return registerBet(betBox, owner);
        },
        addPlayers : () =>{
            return addPlayers();

        },
        card : () =>{
            return card();
        }
    };
})();