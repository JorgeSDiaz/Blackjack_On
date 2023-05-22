import {clientAdmin} from './clientAdmin.js';


window.appAdmin = (() => {
    let apiAdmin = clientAdmin;
    let stompClient = null;

    document.addEventListener('DOMContentLoaded', function() {
        let objectString = sessionStorage.getItem('userInSession');
        if(objectString === null){
            window.location.href =  "/401.html";
        }
        
    });


    const startGame = () =>{
        //debe a ver un codigo que me consuma el recurso de back




    }


    const getPlayers = () =>{
        let promess = apiAdmin.addPlayers();
        promess.then((players)=>{
            console.log(players)
        }).catch((err)=>{
            console.log(err);
        })
        
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

            getPlayers();

            stompClient.subscribe("/topic/players", (eventBody) => {
                let players = JSON.parse(eventBody.body);
                let id = 1;
                for(let i = 0; i < players.length;i++){
                    if(players[i].rol === "admin"){
                        let seatCrupier = document.getElementById('crupier');
                        seatCrupier.style.border = "2px solid green";
                        
                    }
                    else{
                        let nameSeat = "#seat" + id;
                        let seatPlayer = document.querySelector(nameSeat);
                        seatPlayer.style.border = "2px solid green";
                        let nameCoins = "#coins" +  id;
                        let coinsPlayer = document.querySelector(nameCoins);
                        coinsPlayer.textContent = players[i].coins;
                        seatPlayer.textContent = players[i].username;
                        id += 1;
                    }
                }
                
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
        },
        start: () => {
            startGame();
        }
        



    };
})();