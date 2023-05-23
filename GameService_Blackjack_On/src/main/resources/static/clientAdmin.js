export const clientAdmin = (() => {
    // Private
    const resource = "http://localhost:8080/v1/game";
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


    const start = () => {
        return new Promise( (resolve, reject) => {
            $.ajax(
                {
                    url: resource ,
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


    const endInitialBet = () => {
        return new Promise( (resolve, reject) => {
            $.ajax(
                {
                    url: resource + "/endinitialbet",
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


    // Public
    return {
        addPlayers: () => {
            return addPlayers();
        },
        start : ()=>{
            return start();

        },
        endInitialBet : ()=>{
            return endInitialBet();
        }
    
    };
})();