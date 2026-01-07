

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from 'split-type'
import MotionPathPlugin from "gsap/MotionPathPlugin";
import TextPlugin from "gsap/TextPlugin";
let value = window.scrollY;


gsap.registerPlugin(ScrollTrigger);
       
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', function(event) {
    mouseX = event.pageX; 
    mouseY = event.pageY; 

    gsap.to("#circle", {
        duration: 0.5,
        attr: {
            cx: mouseX,
            cy: mouseY
        }
    });
});

let path = document.querySelector('path')
let pathLength = path.getTotalLength()

path.style.strokeDasharray=pathLength+ ' ' +pathLength;
path.style.strokeDashoffset= pathLength

let fc = document.getElementById("fc")
let sc = document.getElementById("sc")
let tc = document.getElementById("tc")
window.addEventListener('scroll', ()=>{
     value = window.scrollY;
   
    const constValue= 90;
        var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    
                let drawLength = pathLength * scrollPercentage * 1 +constValue;
               
                path.style.strokeDashoffset = pathLength - drawLength;
})    

let fadeIn= gsap.timeline({
    scrollTrigger:{
        trigger:'#sector2',
        start:'top 80',
        end:'center center',
        scrub:true,
    }
})
let fadeOut= gsap.timeline({
    scrollTrigger:{
        trigger:'#sector2',
        start:'center 80',
        end:'bottom center',
        scrub:true,
    }
})
let fadeIn3= gsap.timeline({
    scrollTrigger:{
        trigger:'#sector3',
        start:'top 80',
        end:'center center',
        scrub:true,
    }
})
let fadeOut3= gsap.timeline({
    scrollTrigger:{
        trigger:'#sector3',
        start:'center 80',
        end:'bottom center',
        scrub:true,
    }
})
let fadeIn4= gsap.timeline({
    scrollTrigger:{
        trigger:'#sector4',
        start:'top 80',
        end:'center center',
        scrub:true,
    }
})
let fadeOut4= gsap.timeline({
    scrollTrigger:{
        trigger:'#sector4',
        start:'center 80',
        end:'bottom center',
        scrub:true,
    }
})
let tls2=gsap.timeline({
    scrollTrigger:{
        trigger:'#sector2',
        start:'top center',
        end:'bottom center',
        scrub:true,
    }
})
    
fadeIn.to("#sideNav",{
    opacity:1
})
fadeIn.to('#fc',{
    backgroundColor:"#6472BB",
    borderColor:'#6472BB',
    scale:.8
})
fadeIn.to('#sc',{
    scale:.6
})
fadeIn.to('#tc',{
    scale:.6
})
fadeOut.to('#fc',{
    backgroundColor:"black",
    borderColor:"black",
    scale:.6
})

fadeIn3.to('#sc',{
    backgroundColor:"#6472BB",
    borderColor:'#6472BB',
    scale:.8
})
fadeOut3.to('#sc',{
    backgroundColor:"black",
    borderColor:"black",
    scale:.6
})
fadeIn4.to("#tc",{
    backgroundColor:"#6472BB",
    borderColor:'#6472BB',
    scale:.8
})
fadeOut4.to('#tc',{
    backgroundColor:"black",
    borderColor:"black",
    scale:.6
})


tls2.from('#mileStone1',{
    x:48,
    y:35
},'#mileStone1VerticalText',{
    textShadow:"5px 7px 8px rgba(0,0,0,0.66)"
})
tls2.to('#mileStone1VerticalText',{
    textShadow:"5px 7px 8px rgba(0,0,0,0.66)"
})
let tls3=gsap.timeline({
    scrollTrigger:{
        trigger:'#sector3',
        start:'top center',
        end:'center center',
        scrub:true,
    }


    
})



tls3.to('#s3HL',{
    backgroundColor:'rgba(174, 174, 174,0)',
    border:'15px  dashed #E8C032',

})

// VanillaTilt.init(document.querySelectorAll(".more")[0])

const lenis = new Lenis()

lenis.on('scroll', (e) => {
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

let TitleArray=["🎐_______","a🎐______","ab🎐_____","abi🎐____","abio🎐___","abio_🎐__","abio__🎐_","abio___🎐"]

let i =0;
let isScrolled=false;
let Interval ;
document.addEventListener('scroll',function(event) {
    if(!isScrolled){
        isScrolled=true
        let Interval= setInterval(function(){
            i++;
            if(i>TitleArray.length-1)i=0;
            document.title=TitleArray[i]
        },300)
    }
})
gsap.registerPlugin(MotionPathPlugin, TextPlugin);

const splitTitle = document.querySelectorAll('#headline h1');

splitTitle.forEach((char, i) => {
  const splitTitle = new SplitType(char, { types: 'chars' });
  gsap.from(splitTitle.chars, {
    y: 100,
    opacity: 0,
    stagger: 0.05,
    duration: 0.5
  });
});

gsap.to(window, {
    scrollTrigger: {
        start: "top top", // Startet die Aktion, wenn das Scrollen die oberste Position erreicht
        end: "bottom top", // Endet die Aktion, wenn das Scrollen die oberste Position erreicht
        onToggle: function(trigger) {
            if (trigger.isActive) {
                this.clearInterval(Interval)
            } else {
                scrollEnd(); // Starte die Funktion, wenn das Scrollen endet
            }
        }
    }
})

 