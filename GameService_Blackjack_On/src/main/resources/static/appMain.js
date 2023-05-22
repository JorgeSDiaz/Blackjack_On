
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
        let objectString = sessionStorage.getItem('userInSession');
        if(objectString !== null){
            let userObject = JSON.parse(objectString);
            let player = new user(userObject.name,1000,{},userObject.rol);
            let promess = apiMain.joinMatch(player.getInfo());
            promess.then(()=>{
                if(player.getRole() === "user"){
                    window.location.href = "/gameUser.html";
                }
                else{
                    window.location.href = "/gameAdmin.html";
                }
            }).catch((err)=>{
                console.log(err);
            })

        }
        console.log(objectString);
       
        
        
        
    }

    


    return{

        init : () =>{
            init();
        },
        join : () => {
            joinGame();
       }
       
       

    }

})();


appMenu;

