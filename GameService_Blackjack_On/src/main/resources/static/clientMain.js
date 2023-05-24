export const mainApi = (() => {

    // Private
    const resource = "http://localhost:8080/v1/game";
    const addPlayer = (player,status) => {
        return new Promise( (resolve, reject) => {
            $.ajax(
                {
                    url: resource + "/player",
                    type: "POST",
                    data: JSON.stringify(player),
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

    

    // Public
    return {
        joinMatch: (player,status) => {
            return addPlayer(player,status);
        }
    };
})();