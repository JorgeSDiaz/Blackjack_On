import {mainApi} from './clientMain.js';




window.appMenu = (() => {

    var apiMain = mainApi;


    function user(name,coins,betBox,role){
        let _name = name;
        let _coins = coins;
        let _betBox = betBox;
        let _role = role;


       this.getName = function(){
            return _name;
       }
       
       this.getCoins = function(){
            return _coins;
       }

       this.getbetBox = function(){
            return _betBox;
       }

       this.getRole = function(){
            return _role;
       }

       this.getInfo = function(){
            let info = {
                'username':this.getName(),
                'coins' : this.getCoins(),
                'betBox' : this.getbetBox(),
                'rol' : this.getRole()
            }
            return info;
       }
    }

    
    
    const joinGame = () => {
        let text = document.getElementById("name-user").value;
        if(text === 'julian' || text === 'camilo' || text === 'jorge'){
           var player = new user(text,1000,{},'user');
        }
        else{
            var player = new user(text,100000000,{},'admin');
        }
        const infoPlayer = player.getInfo();
        const promess = apiMain.joinMatch(infoPlayer);
        promess.then(() =>{
            if(player.getRole() === 'user'){
                window.location.href = '/gameUser.html';
            }
            else{
                window.location.href = '/gameAdmin.html';
            }
        }).catch((err) =>{
            alert('ERROR' + err);
        })
    }

    





    return{
       join : () => {
            joinGame();
       } 

    }

})();


appMenu;