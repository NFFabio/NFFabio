let isInstructionsOpen=0;
let instruc = document.getElementById("instructions")

//mit Pfeiltasten Steuerbar
//character auswahl wenn keine ausgewählt alle ausgegraut
//sprüche wenn runde gewonnen ist?

let bodyid=document.getElementById("inner");
let hideHeadline=document.getElementById("headline")
let hideNav=document.getElementById('close');
function closeInstructions(){
isInstructionsOpen++;
if(isInstructionsOpen%2==0){instruc.style="display:block;";
    bodyid.style="backdrop-filter:blur(20px); overflow:hidden;"
    hideHeadline.style="display:none;"
    hideNav.style.display="none"}
else{ instruc.style="display:none;"
bodyid.style="backdrop-filter:none;    overflow: visible;"
hideHeadline.style="display:block;"
hideNav.style.display="block"
}
}

let animalProfiles=['MauriceProfile.png','EliceProfilepicture.png','HenryProfile.png','bruceProfile.png','paulProfilepicture.png','TonyProfilepicture.png']; 
let animalIndex = 0;

let frontAnimal = document.getElementById('borderBox')

function switchLeft(){
   animalIndex--;
   if(animalIndex<0){
    animalIndex=5
   }
    switchAnimals();
}   
function switchRight(){
    animalIndex++;
    if(animalIndex>5){
     animalIndex=0;
    }
    switchAnimals();
}
let characterCard = document.getElementById('useAsInner')
 function switchAnimals(){

    frontAnimal.innerHTML=`<img src="../images/${animalProfiles[animalIndex]}" width="90%">`;

    if(animalIndex==0){
        characterCard.innerHTML=`<div id="discriptionBox0">
        <div id="innerDescriptionBox0">
            <div id="topProfileWrapper0">
                <div id="borderBox"><img src="../images/MauriceProfile.png" width="90%" ></div>
                
                <h1 id="characterName0">Maurice The Sleeping</h1>
            </div>
            <div id="textbox0">"Life is just a series of long naps interrupted by brief periods of wakefulness."</div>
        </div>
    </div>`
    }
    if(animalIndex==1){
        characterCard.innerHTML=`<div id="discriptionBox1">
        <div id="innerDescriptionBox1">
            <div id="topProfileWrapper1">
                <div id="borderBox"><img src="../images/${animalProfiles[animalIndex]}" width="90%" ></div>
                
                <h1 id="characterName1">Elice The Vibing</h1>
            </div>
            <div id="textbox1">"My doctor prescribed me a daily dose of vibing to keep the 'uncool' away."</div>
        </div>
    </div>`
    }
    if(animalIndex==2){
        characterCard.innerHTML=`<div id="discriptionBox2">
        <div id="innerDescriptionBox2">
            <div id="topProfileWrapper2">
                <div id="borderBox"><img src="../images/${animalProfiles[animalIndex]}" width="90%" ></div>
                
                <h1 id="characterName2">Henry The Fastest</h1>
            </div>
            <div id="textbox2">"Running fast is my way of making sure I catch all the ice cream truck stops!"</div>
        </div>
    </div>`
    }
    if(animalIndex==3){
        characterCard.innerHTML=`
        <div id="discriptionBox3">
                    <div id="innerDescriptionBox3">
                        <div id="topProfileWrapper3">
                            <div id="borderBox"><img src="../images/${animalProfiles[animalIndex]}" width="90%" ></div>
                            
                            <h1 id="characterName3">Bruce The Monkey</h1>
                        </div>
                        <div id="textbox3">"Bananas are like nature's portable, pre-peeled snacks – the true fast food!"</div>
                    </div>
                </div>`
    }
    if(animalIndex==4){
        characterCard.innerHTML=`<div id="discriptionBox4">
        <div id="innerDescriptionBox4">
            <div id="topProfileWrapper4">
                <div id="borderBox"><img src="../images/${animalProfiles[animalIndex]}" width="90%" ></div>
                
                <h1 id="characterName4">Paul The Wondering</h1>
            </div>
            <div id="textbox4">"I wonder if my refrigerator light stays on when I close the door just to mess with me."</div>
        </div>
    </div>
</div>  `
    }
    if(animalIndex==5){
        characterCard.innerHTML=`
        <div id="discriptionBox5">
        <div id="innerDescriptionBox5">
            <div id="topProfileWrapper5">
                <div id="borderBox"><img src="../images/${animalProfiles[animalIndex]}" width="90%" ></div>
                
                <h1 id="characterName5">Tony The Bird</h1>
            </div>
            <div id="textbox5">"They say dreams can take you anywhere, but flying is the best way to turn those dreams into reality."</div>
        </div>
    </div>`
    }
 }
 //main
 closeInstructions();
 function openGame(){
    window.open(open("../Starrtseite/game.html"))
 }