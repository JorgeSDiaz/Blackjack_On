import {clientUser} from './clientUser.js';


window.appUser = (() => {
    let apiUser = clientUser;
    let stompClient = null;
    let objectString = null;
    let numberForBetInitial = 0;
    let mountForBetInitial = 0;


    document.addEventListener('DOMContentLoaded', function() {
        objectString = sessionStorage.getItem('userInSession');
        if(objectString === null){
            window.location.href =  "/401.html";
        }
        addPlayers();
        
    });


    const autoIncrement = (cuant)=>{
        mountForBetInitial += parseInt(cuant);
        const element = document.querySelector('.text-bet-initial-bet');
        element.innerHTML = "YOUR BET IS: " + number;



    }


    

    const showTableBox = () =>{
        let element = document.querySelector("#box-section");
        element.style.display = "block";

        
    }

    const hideTableBox = () =>{
        let element = document.querySelector("#box-section");
        element.style.display = "none";
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
        numberForBetInitial = number;
        const element = document.querySelector('.text-bet-initial');
        element.innerHTML = "YOUR BET IS FOR: " + number;
            
    }

    const done = ()=>{
        
    }

 

    const connect = () => {
        console.info('Connect to Ws...');
        let socket = new SockJS('/blackjack-game');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame) => {
            console.log('Connected:' + frame);
            stompClient.subscribe("/topic/playerBetBox", (eventBody) => {
                requestAnimationFrame(()=>{
                    let player = JSON.parse(eventBody.body);
                    const element = document.getElementById(player.id);
                    element.classList.replace('btn-outline-warning', 'btn-outline-alert');
                    button.style.pointerEvents = "none";
                    button.style.cursor = "none";
                })
                
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
                requestAnimationFrame(()=>{
                    showTableBox();
                })


            });


            stompClient.subscribe("/topic/startgame", (eventBody) => {
                requestAnimationFrame(()=>{
                    hideTableBox();
                })


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
        registryBet : ()=>{
            registryBet();
        },
        autoIncrement : ()=>{
            autoIncrement();
        }




    };
})();