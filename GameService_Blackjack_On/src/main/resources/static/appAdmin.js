const appAdmin = (() => {
    let apiAdmin = clientAdmin;
    let stompClient = null;


    const startGame = () =>{
        //codigo que consume la api de game por parte del admin
        let element = document.querySelector("#box-section");
        element.style.display = "block";


    }


    
 

    const connect = () => {
        console.info('Connect to Ws...');
        let socket = new SockJS('/blackjack-game');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame) => {
            console.log('Connected:' + frame);
            stompClient.subscribe("/topic/registerbet", (eventBody) => {
                //CODE FOR CHANGE BOTTON
            });

            stompClient.subscribe("/topic/addplayer", (eventBody) => {
                //CODE FOR ADD PLAYER
            });

            stompClient.subscribe("/topic/startgame", (eventBody) => {
                //CODE FOR START GAME


            });

        });

    }

    return {
        init: () => {
            player = new URLSearchParams(window.location.search).get('user');
            connect();
            console.log(player);
        },
        start: () => {
            startGame();
        }
        



    };
})();