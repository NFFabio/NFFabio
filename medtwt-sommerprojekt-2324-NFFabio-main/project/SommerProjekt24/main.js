

/*other effects */
const letters="今日は良い天気ですね。日本の文化と食べ物は美味しいです。"

document.querySelectorAll('.element')[2].onmouseover= event =>{
    let interations=0;
    const interval= setInterval(()=>{

        event.target.innerText= event.target.innerText.split("")
    .map((letter,index)=>{
        if(index<interations){
           return  event.target.dataset.value[index]
        }
       return letters[Math.floor(Math.random()*26)] 
    })
    .join("")
    interations+=1/5;
    if(interations>=9)clearInterval(interval)
    },30)
    
}
document.querySelectorAll('.element')[1].onmouseover= event =>{
    let interations=0;
    const interval= setInterval(()=>{

        event.target.innerText= event.target.innerText.split("")
    .map((letter,index)=>{
        if(index<interations){
            console.log(event.target.dataset.value[index])
           return  event.target.dataset.value[index] 
        }
       return letters[Math.floor(Math.random()*26)] 
    })
    .join("")
    interations+=1/2;
    if(interations>=10)clearInterval(interval)
    },30)


    
}
document.querySelectorAll('.element')[0].onmouseover= event =>{
    let interations=0;
    const interval= setInterval(()=>{

        event.target.innerText= event.target.innerText.split("")
    .map((letter,index)=>{
        if(index<interations){
           return  event.target.dataset.value[index]
        }
       return letters[Math.floor(Math.random()*26)] 
    })
    .join("")
    interations+=1/2;
    if(interations>=9)clearInterval(interval)
    },30)
    
}


document.getElementById('headline').addEventListener('load',event=>{
    let interations=0;
    const interval= setInterval(()=>{
            event.target.innerText= event.target.innerText.split("")
        .map((letter,index)=>{
            if(index<interations){
            return  event.target.dataset.value[index]
            }
        return letters[Math.floor(Math.random()*26)] 
        })
        .join("")
        interations+=1/2;
        if(interations>=9)clearInterval(interval)
    },30)

})

let TitleArray=["🎐_______","a🎐______","ab🎐_____","abi🎐____","abio🎐___","abio_🎐__","abio__🎐_","abio___🎐"]

let i =0;

        let Interval= setInterval(function(){
            i++;
            if(i>TitleArray.length-1)i=0;
            document.title=TitleArray[i]
        },300)