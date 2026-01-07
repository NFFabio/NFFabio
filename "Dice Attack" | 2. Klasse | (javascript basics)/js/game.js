let whichCharacter =0;

let characterHover= document.getElementById('player1');

let baseStructure=document.getElementById('p1');

let currenIndex=0;

let isLocked=false;

let characterGIFS=['BruceTheMonkey.gif','EliceTheVibing.gif','HenryThefastChicken.gif','MauriceTheSleeping.gif','PaulTheWondering.gif','TonyTheBird.gif']

 //Bruce---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
const BASE_HEALTH_BRUCE=8;
const BASE_DAMAGE_BRUCE=2;



function onclickBruce(){
    if(!isLocked){
    currenIndex=0;
    characterHover.innerHTML='<h1>You</h1> <img src="../images/BruceTheMonkey.gif" ><div id="lockInButton" onclick="lockedIn()">Lock in</div>'
    
        
baseStructure.innerHTML=
`
<h2 id="characterName">Bruce The Monkey</h2>
<h5 id="healthTag">Health</h5>
<div id="outerhealthbar">
    
</div>
<h5 id="damageTag">Damage</h5>
<div id="outerdamagebar">

</div>
<p id="description">Regains health when he finds a banana</p>`


        let fillHealthbar_Bruce =document.getElementById('outerhealthbar');
        let fillDamagebar_Bruce =document.getElementById('outerdamagebar');

        document.getElementById('Bru').style.filter="none";
        document.getElementById('Eli').style.filter="grayscale(100%)";
        document.getElementById('Hen').style.filter="grayscale(100%)";
        document.getElementById('Mau').style.filter="grayscale(100%)";
        document.getElementById('Pau').style.filter="grayscale(100%)";
        document.getElementById('Ton').style.filter="grayscale(100%)";



        fillHealthbar_Bruce.innerHTML+='<div class="healthIndex0"></div>';
        fillDamagebar_Bruce.innerHTML+='<div class="damageIndex0"></div>';

        

    }
}
 //Elice---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 const BASE_HEALTH_Elice=10;
 const BASE_DAMAGE_ELICE=2;
 
 
 
 function onclickElice(){
    if(!isLocked){

 currenIndex=1;

     characterHover.innerHTML='<h1>You</h1> <img src="../images/EliceTheVibing.gif" ><div id="lockInButton" onclick="lockedIn()">Lock in</div>'
     
         
 baseStructure.innerHTML=
 `
 <h2 id="characterName">Elice The Vibing</h2>
 <h5 id="healthTag">Health</h5>
 <div id="outerhealthbar">
     
 </div>
 <h5 id="damageTag">Damage</h5>
 <div id="outerdamagebar">
 
 </div>
 <p id="description">Always wins against uncool numbers</p>`
 
 
         let fillHealthbar_Bruce =document.getElementById('outerhealthbar');
         let fillDamagebar_Bruce =document.getElementById('outerdamagebar');
 
         document.getElementById('Eli').style.filter="none";
         document.getElementById('Bru').style.filter="grayscale(100%)";
        document.getElementById('Hen').style.filter="grayscale(100%)";
        document.getElementById('Mau').style.filter="grayscale(100%)";
        document.getElementById('Pau').style.filter="grayscale(100%)";
        document.getElementById('Ton').style.filter="grayscale(100%)";

 
         fillHealthbar_Bruce.innerHTML+='<div class="healthIndex1"></div>';
         fillDamagebar_Bruce.innerHTML+='<div class="damageIndex1"></div>';
 
         
 
    }
 }
 //Henry---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 const BASE_HEALTH_HENRY=7;
 const BASE_DAMAGE_HEnry=2;
 
 
 
 
 function onclickHenry(){
    if(!isLocked){

    currenIndex=2;
     characterHover.innerHTML='<h1>You</h1> <img src="../images/HenryThefastChicken.gif" ><div id="lockInButton" onclick="lockedIn()">Lock in</div>'
     
         
 baseStructure.innerHTML=
 `
 <h2 id="characterName">Henry The Fastest</h2>
 <h5 id="healthTag">Health</h5>
 <div id="outerhealthbar">
     
 </div>
 <h5 id="damageTag">Damage</h5>
 <div id="outerdamagebar">
 
 </div>
 <p id="description">Sometimes even twice as fast as yor opponend</p>`
 
 
         let fillHealthbar_Bruce =document.getElementById('outerhealthbar');
         let fillDamagebar_Bruce =document.getElementById('outerdamagebar');
 
         document.getElementById('Hen').style.filter="none";
         document.getElementById('Eli').style.filter="grayscale(100%)";
         document.getElementById('Bru').style.filter="grayscale(100%)";
        document.getElementById('Mau').style.filter="grayscale(100%)";
        document.getElementById('Pau').style.filter="grayscale(100%)";
        document.getElementById('Ton').style.filter="grayscale(100%)";
 
         fillHealthbar_Bruce.innerHTML+='<div class="healthIndex2"></div>';
         fillDamagebar_Bruce.innerHTML+='<div class="damageIndex2"></div>';
 
        
 
    }
 }
 //Tony---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 const BASE_HEALTH_TONY=7;
 const BASE_DAMAGE_TONY=3;
 
 
 
 function onclickTony(){
    if(!isLocked){

    currenIndex=5
     characterHover.innerHTML='<h1>You</h1> <img src="../images/TonyTheBird.gif" ><div id="lockInButton" onclick="lockedIn()">Lock in</div>'
     
         
 baseStructure.innerHTML=
 `
 <h2 id="characterName">Tony The Bird</h2>
 <h5 id="healthTag">Health</h5>
 <div id="outerhealthbar">
     
 </div>
 <h5 id="damageTag">Damage</h5>
 <div id="outerdamagebar">
 
 </div>
 <p id="description">Might be winning on draw</p>`
 
 
         let fillHealthbar_Bruce =document.getElementById('outerhealthbar');
         let fillDamagebar_Bruce =document.getElementById('outerdamagebar');
 
         document.getElementById('Ton').style.filter="none";
         document.getElementById('Hen').style.filter="grayscale(100%)";
         document.getElementById('Eli').style.filter="grayscale(100%)";
         document.getElementById('Bru').style.filter="grayscale(100%)";
        document.getElementById('Mau').style.filter="grayscale(100%)";
        document.getElementById('Pau').style.filter="grayscale(100%)";
 
         fillHealthbar_Bruce.innerHTML+='<div class="healthIndex2"></div>';
         fillDamagebar_Bruce.innerHTML+='<div class="damageIndex2"></div>';
 
    }
 
 }
 //Maurice---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 const BASE_HEALTH_Maurice=5;
 const BASE_DAMAGE_Maurice=1;
 
 
 
 function onclickMaurice(){
    if(!isLocked){

    currenIndex=3
     characterHover.innerHTML='<h1>You</h1> <img src="../images/MauriceTheSleeping.gif" ><div id="lockInButton" onclick="lockedIn()">Lock in</div>'
     
         
 baseStructure.innerHTML=
 `
 <h2 id="characterName">Maurice The Sleeping</h2>
 <h5 id="healthTag">Health</h5>
 <div id="outerhealthbar">
     
 </div>
 <h5 id="damageTag">Damage</h5>
 <div id="outerdamagebar">
 
 </div>
 <p id="description">Easy Win?</p>`
 
 
         let fillHealthbar_Bruce =document.getElementById('outerhealthbar');
         let fillDamagebar_Bruce =document.getElementById('outerdamagebar');
 
         document.getElementById('Mau').style.filter="none";
         document.getElementById('Ton').style.filter="grayscale(100%)";
         document.getElementById('Hen').style.filter="grayscale(100%)";
         document.getElementById('Eli').style.filter="grayscale(100%)";
         document.getElementById('Bru').style.filter="grayscale(100%)";
        document.getElementById('Pau').style.filter="grayscale(100%)";
 
         fillHealthbar_Bruce.innerHTML+='<div class="healthIndex3"></div>';
         fillDamagebar_Bruce.innerHTML+='<div class="damageIndex3"></div>';
 
        
    }
 }
 //Maurice---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 const BASE_HEALTH_PAUL=10;
 const BASE_DAMAGE_PAUL=2;
 
 
 
 function onclickPaul(){
    if(!isLocked){

    currenIndex=4
     characterHover.innerHTML='<h1>You</h1> <img src="../images/PaulTheWondering.gif" ><div id="lockInButton" onclick="lockedIn()">Lock in</div>'
     
         
 baseStructure.innerHTML=
 `
 <h2 id="characterName">Paul The Wondering</h2>
 <h5 id="healthTag">Health</h5>
 <div id="outerhealthbar">
     
 </div>
 <h5 id="damageTag">Damage</h5>
 <div id="outerdamagebar">
 
 </div>
 <p id="description">?</p>`
 
 
         let fillHealthbar_Bruce =document.getElementById('outerhealthbar');
         let fillDamagebar_Bruce =document.getElementById('outerdamagebar');
 
         document.getElementById('Pau').style.filter="none";
         document.getElementById('Mau').style.filter="greyscale(100%)";
         document.getElementById('Ton').style.filter="grayscale(100%)";
         document.getElementById('Hen').style.filter="grayscale(100%)";
         document.getElementById('Eli').style.filter="grayscale(100%)";
         document.getElementById('Bru').style.filter="grayscale(100%)";
 
         fillHealthbar_Bruce.innerHTML+='<div class="healthIndex4"></div>';
         fillDamagebar_Bruce.innerHTML+='<div class="damageIndex4"></div>';
 
    }
 
 }

//let playersCharacter="Bruce";
let opponentsindex=1;
let opponentsCharacter=" ";

let playerhealthbar = ' ';
let bothealthbar = ' ';

let card_P=' ';
let card_B=' ';

 function lockedIn(){
        isLocked=true;
        document.getElementById("lockInButton").style.opacity="0%";
        if(currenIndex==0)playersCharacter="Bruce";
        if(currenIndex==1)playersCharacter="Elice";
        if(currenIndex==2)playersCharacter="Henry";
        if(currenIndex==3)playersCharacter="Maurice";
        if(currenIndex==4)playersCharacter="Paul";
        if(currenIndex==5)playersCharacter="Tony";

        do{opponentsindex=generateRandomNumber();}while(opponentsindex==currenIndex);
        

        if(opponentsindex-1==0)opponentsCharacter="Bruce";
        if(opponentsindex-1==1)opponentsCharacter="Elice";
        if(opponentsindex-1==2)opponentsCharacter="Henry";
        if(opponentsindex-1==3)opponentsCharacter="Maurice";
        if(opponentsindex-1==4)opponentsCharacter="Paul";
        if(opponentsindex-1==5)opponentsCharacter="Tony";

          

        document.getElementById('flexCharaxterChooseWrapper').innerHTML=
        `<div id="p1side">
        <div id="characterAndFlexWrapper">
            <div id="pr">
                <img src="../images/TonyProfilepicture.png" >
            </div>
            <div id="te">
            <div id="HealthBox">
                <div id="healthp"></div>
            </div>
            </div>
        </div>
    </div>
    <div id="dicecenter">
        <h1 id="vs">VS</h1>
        <div id="cardP" onclick="onclickCardPlayer()">?</div>
        <dov id="cardB" onclick="onclickCardComputer()">?</dov>
    </div>
    <div id="p2side">
        <div id="BotAndFlexwrapper">
            <div id="bpr">
                <img src="../images/EliceProfilepicture.png">
            </div>
            <div id="bte">
            <div id="HealthBoxBot"><div id="healthb"></div></div>
            </div>
        </div>
    </div>`;

    checkStats(); 

     playerhealthbar = document.getElementById('healthp')
     bothealthbar = document.getElementById('healthb')

     card_P=document.getElementById('cardP');
     card_B=document.getElementById('cardB');

     throwDices();

    
        
 }




function generateRandomNumber(){
const min = 1; 
const max = 6; 
let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
return randomNum;

console.log(randomNum);
}

let playerLifePoints=0;
let playerDamagePoints=0;

let opponendLifePoints=0;
let opponendDamagePoints=0;




function checkStats(){
   if(playersCharacter=="Bruce")
   {
    playerDamagePoints=BASE_DAMAGE_BRUCE;
    playerLifePoints=BASE_HEALTH_BRUCE;

    document.getElementById('pr').innerHTML='<img src="../images/bruceProfile.png" >'
    document.getElementById('te').innerHTML=`
    <h3>Bruce The Monkey</h3>
    <div id="HealthBox">
    <div id="healthp"></div>
    </div>
`
    playerhealthbar.style='width:'+playerLifePoints*10+'%'+';';

    }
   if(playersCharacter=="Elice")
   {
    playerDamagePoints=BASE_DAMAGE_ELICE;
    playerLifePoints=BASE_HEALTH_Elice;
    document.getElementById('pr').innerHTML='<img src="../images/EliceProfilepicture.png" >'
    document.getElementById('te').innerHTML=`
    <h3>Elice The Sleeping</h3>
    <div id="HealthBox">
    <div id="healthp"></div>
    </div>
`
    playerhealthbar.style='width:'+playerLifePoints*10+'%'+';';


    }
   if(playersCharacter=="Henry")
   {
    playerDamagePoints=BASE_DAMAGE_HEnry;
    playerLifePoints=BASE_HEALTH_HENRY;
    document.getElementById('pr').innerHTML='<img src="../images/HenryProfile.png" >'
    document.getElementById('te').innerHTML=`
    <h3>Henry The Fastest</h3>
    <div id="HealthBox">
    <div id="healthp"></div>
    </div>
`

    playerhealthbar.style='width:'+playerLifePoints*10+'%'+';';


    }
   if(playersCharacter=="Maurice")
   {
    playerDamagePoints=BASE_DAMAGE_Maurice;
    playerLifePoints=BASE_HEALTH_Maurice;
    document.getElementById('pr').innerHTML='<img src="../images/MauriceProfile.png" >'
    document.getElementById('te').innerHTML=`
    <h3>Maurice The Sleeping</h3>
    <div id="HealthBox">
    <div id="healthp"></div>
    </div>
`

    playerhealthbar.style='width:'+playerLifePoints*10+'%'+';';


    }
   if(playersCharacter=="Paul")
   {
    playerDamagePoints=BASE_DAMAGE_PAUL;
    playerLifePoints=BASE_HEALTH_PAUL;
    document.getElementById('pr').innerHTML='<img src="../images/paulProfilepicture.png" >'
    document.getElementById('te').innerHTML=`
    <h3>Paul The Wondering</h3>
    <div id="HealthBox">
    <div id="healthp"></div>
    </div>
`

    playerhealthbar.style='width:'+10*10+'%'+';';

    }
   if(playersCharacter=="Tony")
   {
    playerDamagePoints=BASE_DAMAGE_TONY;
    playerLifePoints=BASE_HEALTH_TONY;
    document.getElementById('pr').innerHTML='<img src="../images/TonyProfilepicture.png" >'
    document.getElementById('te').innerHTML=`
    <h3>Tony The Bird</h3>
    <div id="HealthBox">
    <div id="healthp"></div>
    </div>
`    

    playerhealthbar.style='width:'+playerLifePoints*10+'%'+';';


    }
    if(opponentsCharacter=="Bruce")
   {
    opponendDamagePoints=BASE_DAMAGE_BRUCE;
    opponendLifePoints=BASE_HEALTH_BRUCE;
    document.getElementById('bpr').innerHTML='<img src="../images/bruceProfile.png" >'
    document.getElementById('bte').innerHTML=`
    <h3>Bruce The Monkey</h3>
    <div id="HealthBoxBot">
    <div id="healthb"></div>
    </div>
`
    bothealthbar.style='width:'+opponendLifePoints*10+'%'+';';



    }
   if(opponentsCharacter=="Elice")
   {
    opponendDamagePoints=BASE_DAMAGE_ELICE;
    opponendLifePoints=BASE_HEALTH_Elice;
    document.getElementById('bpr').innerHTML='<img src="../images/EliceProfilepicture.png" >'
    document.getElementById('bte').innerHTML=`
    <h3>Elice The Vibing</h3>
    <div id="HealthBoxBot">
    <div id="healthb"></div>
    </div>
`

    bothealthbar.style='width:'+opponendLifePoints*10+'%'+';';


    }
   if(opponentsCharacter=="Henry")
   {
    opponendDamagePoints=BASE_DAMAGE_HEnry;
    opponendLifePoints=BASE_HEALTH_HENRY;

    document.getElementById('bpr').innerHTML='<img src="../images/HenryProfile.png" >'
    document.getElementById('bte').innerHTML=`
    <h3>Henry The Fastest</h3>
    <div id="HealthBoxBot">
    <div id="healthb"></div>
    </div>
`

    bothealthbar.style='width:'+opponendLifePoints*10+'%'+';';


    }
   if(opponentsCharacter=="Maurice")
   {
    opponendDamagePoints=BASE_DAMAGE_Maurice;
    opponendLifePoints=BASE_HEALTH_Maurice;

    document.getElementById('bpr').innerHTML='<img src="../images/MauriceProfile.png" >'
    document.getElementById('bte').innerHTML=`
    <h3>Maurice The Sleeping</h3>
    <div id="HealthBoxBot">
    <div id="healthb"></div>
    </div>
`

    bothealthbar.style='width:'+opponendLifePoints*10+'%'+';';


    }
   if(opponentsCharacter=="Paul")
   {
    opponendDamagePoints=BASE_DAMAGE_PAUL;
    opponendLifePoints=BASE_HEALTH_PAUL;

    document.getElementById('bpr').innerHTML='<img src="../images/paulProfilepicture.png" >'
    document.getElementById('bte').innerHTML=`
    <h3>Paul The Wondering</h3>
    <div id="HealthBoxBot">
    <div id="healthb"></div>
    </div>
`
    bothealthbar.style='width:'+opponendLifePoints*10+'%'+';';


    }
   if(opponentsCharacter=="Tony")
   {
    opponendDamagePoints=BASE_DAMAGE_TONY;
    opponendLifePoints=BASE_HEALTH_TONY;

    document.getElementById('bpr').innerHTML='<img src="../images/TonyProfilepicture.png" >'
    document.getElementById('bte').innerHTML=`
    <h3>Tony The Bird</h3>
    <div id="HealthBoxBot">
    <div id="healthb"></div>
    </div>
`

    bothealthbar.style='width:'+opponendLifePoints*10+'%'+';';


    }



}



let dice1=0;
let dice2=0;



function throwDices(){
 dice1=generateRandomNumber();
 dice2=generateRandomNumber();
//d1 is p1
card_P.innerHTML="?";
card_B.innerHTML="?";

}

let isPlayerCardClicked=false;
let isComputerCardclicked= false;

function onclickCardPlayer(){

    card_P.innerHTML=`${dice1}`;

    isPlayerCardClicked=true;
    if(isComputerCardclicked&&isComputerCardclicked){
        calculatehealth();

        setTimeout(function(){
            smallReset();
        },3000)
        isComputerCardclicked=false;
        isPlayerCardClicked=false;
    }
} 
function onclickCardComputer(){
    card_B.innerHTML=`${dice2}`;
    isComputerCardclicked=true;
    if(isComputerCardclicked&&isComputerCardclicked){
        
        calculatehealth(); 

        setTimeout(function(){
            smallReset();
        },3000)

        isComputerCardclicked=false;
        isPlayerCardClicked=false;
    }
}




function calculatehealth (){
    console.log(dice1)
    console.log(dice2)
    console.log(currenIndex)

    if(currenIndex==0)monkeyheal_player();
    if(currenIndex==1)vibing_player();
    if(currenIndex==2)fasterThanYou_player();
    if(currenIndex==3)sleepy_player();

    if(opponentsindex-1==0)monkeyheal_bot();
    if(opponentsindex-1==1)vibing_bot();
    if(opponentsindex-1==2)fasterThanYou_bot();
    if(opponentsindex-1==3)sleepy_bot();

    if(dice1==dice2&&currenIndex-1==5){
        highFlight_player();
    }
    if(dice1==dice2&&opponentsindex-1==5){
        highFlight_bot();
    }

        let winnerCharacter=characterGIFS[currenIndex];
    if(dice1>dice2){
        opponendLifePoints=opponendLifePoints-playerDamagePoints;
        if(opponendLifePoints<=0){document.getElementById('flexCharaxterChooseWrapper').innerHTML=` <div id="winnerscreen">
        <h1>You won!</h1>
        <img src="../images/${winnerCharacter}" width="15%">
        <div id="playAgain" onclick="openGame()"><p>Play Again</p></div>
        <div id="home" onclick="openHome()"><p>Home</p></div>
    </div>` }
        if(currenIndex-1==5){opponendLifePoints=iwonder_bot()}
        
        bothealthbar.style='width:'+opponendLifePoints*10+'%'+';';

    }
    let winChar=characterGIFS[opponentsindex-1];
    if(dice2>dice1){
        
        playerLifePoints=playerLifePoints-opponendDamagePoints;

        if(currenIndex-1==5){playerLifePoints=iwonder_player()}
        if(playerLifePoints<=0){document.getElementById('flexCharaxterChooseWrapper').innerHTML=` <div id="winnerscreen">
        <h1>You lost!</h1>
        <img src="../images/${winChar}" width="15%">
        <div id="playAgain" onclick="openGame()"><p>Play Again</p></div>
        <div id="home" onclick="openHome()"><p>Home</p></div>
    </div>`}

        playerhealthbar.style='width:'+playerLifePoints*10+'%'+';';
    }


}
//ABilitis -> Player
function monkeyheal_player(){
    

    if (generateRandomNumber()%2==0){console.log('heal')
        playerLifePoints++;
    }
}

function vibing_player(){
    

    if(dice2==5||dice2==1){console.log('vibe')
        dice1=999;
    }
}
let wasHefaster=false;
function fasterThanYou_player(){
    

    if(generateRandomNumber()%3==0){console.log('fast')
        playerDamagePoints*=2;
        wasHefaster=true;
    }
}
function sleepy_player(){
    

    if(generateRandomNumber()%3==0){console.log('sleep')
        playerDamagePoints=999;
    }
}
function iwonder_player(){
   
    if(generateRandomNumber()%3==0){ console.log('wonder')

        return playerLifePoints;
    }
}
function highFlight_player(){
    

    if(generateRandomNumber()%2==0){console.log('fly')
        dice1=999;
    }
}
//----------------------------------------------
function monkeyheal_bot(){
    if (generateRandomNumber()%2==0){console.log('botheal')
        opponendLifePoints++;
    }
}

function vibing_bot(){
    

    if(dice2==5||dice2==1){console.log('vibebot')
        dice2=999;
    }
}
function fasterThanYou_bot(){
    
    if(generateRandomNumber()%3==0){console.log('fastbot')
        opponendDamagePoints*=2;
        wasHefaster=true;
    }
}
function sleepy_bot(){
    

    if(generateRandomNumber()%3==0){console.log('sleepbot')
        opponendDamagePoints=999;
    }
}
function iwonder_bot(){
    
    if(generateRandomNumber()%3==0){console.log('wonderbot')
        return opponendLifePoints;
    }
}
function highFlight_bot(){
    

    if(generateRandomNumber()%2==0){console.log('highfliebot')
        dice2=999;
    }
}

function smallReset(){
    if(playersCharacter=="Bruce")
   {
    playerDamagePoints=BASE_DAMAGE_BRUCE;
    }
   if(playersCharacter=="Elice")
   {
    playerDamagePoints=BASE_DAMAGE_ELICE;

    //vibing();
    }
   if(playersCharacter=="Henry")
   {
    playerDamagePoints=BASE_DAMAGE_HEnry;

    //fasterThanYou();
    }
   if(playersCharacter=="Maurice")
   {
    playerDamagePoints=BASE_DAMAGE_Maurice;

   // sleepy();
    }
   if(playersCharacter=="Paul")
   {
    playerDamagePoints=BASE_DAMAGE_PAUL;
   // iwonder();
    }
   if(playersCharacter=="Tony")
   {
    playerDamagePoints=BASE_DAMAGE_TONY;

    //flying();
    }
/*------------------------------------------* */
    if(opponentsCharacter=="Bruce")
   {
    opponendDamagePoints=BASE_DAMAGE_BRUCE;
    }
   if(opponentsCharacter=="Elice")
   {
    opponendDamagePoints=BASE_DAMAGE_ELICE;
    }
   if(opponentsCharacter=="Henry")
   {
    opponendDamagePoints=BASE_DAMAGE_HEnry;
    }
   if(opponentsCharacter=="Maurice")
   {
    opponendDamagePoints=BASE_DAMAGE_Maurice;
    }
   if(opponentsCharacter=="Paul")
   {
    opponendDamagePoints=BASE_DAMAGE_PAUL;

    }
   if(opponentsCharacter=="Tony")
   {
    opponendDamagePoints=BASE_DAMAGE_TONY;
    }
    throwDices();
}
function openGame(){
    window.open(open("../Starrtseite/game.html"))
 }
 function openHome(){
    window.open(open("../Starrtseite/Startseite.html"))
 }

