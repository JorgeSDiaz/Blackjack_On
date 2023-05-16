import {clientAdmin} from './clientAdmin.js';


window.appAdmin = (() => {
    let apiAdmin = clientAdmin;
    let stompClient = null;


    const startGame = () =>{
        


    }


    const getPlayers = () =>{


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

            stompClient.subscribe("/topic/players", (eventBody) => {
                let answer = JSON.parse(eventBody.body);
                alert(answer.name + "IN AT GAME");
            });

            stompClient.subscribe("/topic/startgame", (eventBody) => {
                let element = document.querySelector("#box-section");
                element.style.display = "block";


            });

        });

    }

    return {
        init: () => {
            connect();
            getPlayers();
        },
        start: () => {
            startGame();
        }
        



    };
})();