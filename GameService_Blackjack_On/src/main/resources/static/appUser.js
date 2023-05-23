
import {clientUser} from './clientUser.js';


window.appUser = (() => {
    let apiUser = clientUser;
    let stompClient = null;
    let objectString = null;
    let numberForBetInitial = 0;
    let mountForBetInitial = 0;
    let objectStringJSON = null;
    let playersInRoom = [];


    document.addEventListener('DOMContentLoaded', function() {
        objectString = sessionStorage.getItem('userInSession');
        if(objectString === null){
            window.location.href =  "/401.html";
        }
        addPlayers();
        objectStringJSON = JSON.parse(objectString);
        console.log(objectStringJSON);
        
    });


    const autoIncrement = (cuant)=>{
        console.log(cuant);
        mountForBetInitial += parseInt(cuant);
        console.log(mountForBetInitial);
        const element = document.querySelector('.text-bet-initial-bet');
        element.innerHTML = "YOUR BET IS: " + mountForBetInitial;



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
        numberForBetInitial = parseInt(number);
        const element = document.querySelector('.text-bet-initial');
        element.innerHTML = "YOUR BET IS FOR: " + numberForBetInitial;
            
    }

    const done = ()=>{
        let betBox = {
            "id":numberForBetInitial.toString(),
            "amount": mountForBetInitial.toString(),
            "owner": objectStringJSON.name,
            "tokens" : {}
        };
        let promess = apiUser.registerBet(betBox,objectStringJSON.name);
        promess.then((response)=>{
            console.log(response)
        }).catch((err)=>{
            alert(err);

        });



    }

    const bet = ()=>{
        let promess = apiUser.bet();
        promess.then(()=>{
            return request(apiUser.card());
        }).then((response)=>{
            console.log(response)

        }).catch((err) =>{
            alert(err)
        })
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
                    const element = document.getElementById(player.betBox.id);
                    element.classList.replace('btn-outline-warning', 'btn-outline-danger');
                    element.style.pointerEvents = "none";
                    element.style.cursor = "none";
                })
                
            });


            addPlayers();
            stompClient.subscribe("/topic/players", (eventBody) => {
                requestAnimationFrame(()=>{
                    let nameSeat = "";
                    let nameCoins = "";
                    let players = JSON.parse(eventBody.body);
                    let id = 1;
                    for(let i = 0; i < players.length;i++){
                        if(players[i].rol === "admin"){
                            let seatCrupier = document.getElementById('crupier');
                            seatCrupier.style.border = "2px solid green";
                            
                        }
                        else{
                            if(playersInRoom.includes(players[i].username)){
                                nameSeat = "seat" + playersInRoom.indexOf(players[i].username) + 1;
                                nameCoins = "#coins" + playersInRoom.indexOf(players[i].username) + 1;


                            }else{
                                nameSeat = "seat" + id;
                                nameCoins = "#coins" +  id;
                                playersInRoom.push(players[i].username);

                            }
                            let seatPlayer = document.getElementById(nameSeat);
                            seatPlayer.style.border = "2px solid green";
                            let coinsPlayer = document.querySelector(nameCoins);
                            coinsPlayer.textContent = players[i].coins;
                            seatPlayer.textContent = players[i].username;
                            id += 1;
                        }
                    }
                })

                
            });
            

            stompClient.subscribe("/topic/startgame", (eventBody) => {
                requestAnimationFrame(()=>{
                    showTableBox();
                })


            });


            stompClient.subscribe("/topic/endinitialbet", (eventBody) => {
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
        autoIncrement : (cuant)=>{
            autoIncrement(cuant);
        },
        done : () =>{
            done();
        },
        bet : () =>{
            bet();
        },
        plant : () =>{
            plant();
        },
        fold : () =>{
            fold();
        },
        card : ()=>{
            card();
        },
        exit : () =>{
            exit();
        }





    };
})();