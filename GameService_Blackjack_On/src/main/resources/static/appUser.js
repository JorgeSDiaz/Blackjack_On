const appUser = (() => {
    let apiUser = clientUser;
    let stompClient = null;

    const showTableBox = () =>{
        
    }


    const setTextNumber = (number) =>{
        const element = document.querySelector('.text-bet-initial');
        element.innerHTML = "YOUR BET IS FOR: " + number;
            
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
        chooseBet : (number) =>{
            setTextNumber(number);
        }
        



    };
})();