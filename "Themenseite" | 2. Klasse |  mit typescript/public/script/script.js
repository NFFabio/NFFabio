fetch(`/muesum`)
    .then((response) => {
        return response.json();
    })
    .then((answer) => {
      console.log(answer)
      for (let index = 0; index < answer.artMuseum.length; index++) {
        document.getElementsByClassName('panel')[index].innerHTML=
        `
        <h2>${answer.artMuseum[index].name}</h2>
        <h3>by ${answer.artMuseum[index].artist}</h3>
        <img src="${answer.artMuseum[index].img}"  class="img" width="40%">
        <section class="text">This painting was painted ${answer.artMuseum[index].age}  years ago and is currently locatet in ${answer.artMuseum[index].currentLocation}<section>
        <br>
        `   
        calcpos(document.getElementsByClassName("img")[index],document.getElementsByClassName("text")[index])
      }
    })
    .catch((error) => {
        throw error;
    });

    gsap.registerPlugin(ScrollTrigger);


let sections = gsap.utils.toArray(".panel");

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () => "+=" + document.querySelector(".container").offsetWidth
  }
});

const splitTitle = document.querySelectorAll('.firstContainer h1');

splitTitle.forEach((char, i) => {
  const splitTitle = new SplitType(char, { types: 'chars' });
  gsap.from(splitTitle.chars, {
    y: -1000,
    opacity:0,
    opacity: 1,
    stagger: 0.05,
    duration: 1,
    rotate:360,
  });
});

  setTimeout(function(){
    splitTitle.forEach((char, i) => {
    const splitTitle = new SplitType(char, { types: 'chars' });
    gsap.from(splitTitle.chars, {
    scale:2,
    duration:.9
    });
  });
  },1200)
  setTimeout(function(){
    splitTitle.forEach((char, i) => {
    const splitTitle = new SplitType(char, { types: 'chars' });
    gsap.from(splitTitle.chars, {
    scale:2,
    duration:0.9

    });
  });
  },1650)
  const lenis = new Lenis()

  lenis.on('scroll', (e) => {
  })
  
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  
  requestAnimationFrame(raf)
  
  



    document.getElementById('ip').addEventListener("keyup",function(event){
      if (event.key === "Enter") {
        console.log("log")

        fetch(`/muesum/:${document.getElementById('ip').value-1}`)
        .then((response) => {
        return response.json();
        })
    .then((answer) => {
      console.log(answer)

    })
    .catch((error) => {
        throw error;
    });
      }
    })

    function calcpos(img,text){
      text.style=`margin-left:${img.offsetWidth+30}px;`
    }