import {clientUser} from './clientUser.js';


window.appUser = (() => {
    let apiUser = clientUser;
    let stompClient = null;

    const showTableBox = () =>{
        
    }

    const addPlayers = () => {
        let promess = apiUser.addPlayers();
        promess.then((players) =>{
            console.log(players);

        }).catch((err) =>{
            alert(err);

        })

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

            stompClient.subscribe("/topic/players", (eventBody) => {
                let players = JSON.parse(eventBody.body);
                let id = 1;
                for(let i = 0; i < players.length;i++){
                    if(players[i].rol === "admin"){
                        let seatCrupier = document.getElementById('crupier');
                        seatCrupier.style.border = "2px solid green";
                        
                    }
                    else{
                        let nameSeat = "seat" + id;
                        let seatPlayer = document.getElementById(nameSeat);
                        seatPlayer.style.border = "2px solid green";
                        let nameCoins = "#coins" +  id;
                        let coinsPlayer = document.querySelector(nameCoins);
                        coinsPlayer.textContent = players[i].coins;
                        seatPlayer.textContent = players[i].username;
                        id += 1;
                    }
                }

                
            });
            addPlayers();

            stompClient.subscribe("/topic/startgame", (eventBody) => {
                //CODE FOR START GAME


            });

        });

    }

    return {
        init: () => {
            connect();
            
        },
        chooseBet : (number) =>{
            setTextNumber(number);
        },




    };
})();