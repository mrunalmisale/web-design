// Set initial styles
gsap.to("#arrow",{
  delay:1,
  x:"17px",
  yoyo:true,
  repeat:-1,
  duration:1,
})

gsap.from(".social-media img, .menu .lines",{
  delay:1,
  opacity:0,
  y:-2,
  x:5,
  stagger:0.2
})

gsap.from(".more, .bars, .right-side img",{
  delay:1,
  opacity:0,
  x:-5,
  duration:1
})

gsap.set('.images', { width: '0%' });
gsap.set('.white-screen', { width: '0%' });
gsap.set('.text-box', { opacity: 0 });

// Recursive function to play animations
function playAnimation(index) {
  const duration = 1;
  const imagesDiv = document.querySelectorAll('.images')[index];
  const whiteScreenDiv = document.querySelectorAll('.white-screen')[index];
  const box = document.querySelectorAll('.text-box')[index];
  const bars = document.querySelectorAll('.bars')[index];

  // Create a timeline for the current set of elements
  const tl = gsap.timeline({
    onComplete: () => {
      // After animations complete, reset styles and play animations for the next set
      gsap.set(imagesDiv, { width: '0%' });
      gsap.set(whiteScreenDiv, { width: '0%' });
      gsap.set(box, { opacity: 0 });
      gsap.set(bars,{backgroundColor:"rgba(0, 0, 0, 0.285)"})
      
      // Move to the next set or restart if it's the last set
      if (index < 2) {
        playAnimation(index + 1);
      } else {
        playAnimation(0); // Restart from the beginning
      }
    }
  });

  tl.fromTo(imagesDiv,{
    width:"0%"
  },{
    delay:1,
    onStart:()=>{
      gsap.to(bars,{
        backgroundColor:"#000",
        duration:1
      })

      gsap.fromTo(box,{
        opacity:0,
        y:260
      },{
        opacity:1,
        y:0,
        duration:duration

      })
    },
    width:"100%",
    duration:duration,
  }).fromTo(whiteScreenDiv,{
    width:0
  },{
    delay:4,
    width:"100%",
    duration:0.7,
    onStart:()=>{
      gsap.fromTo(box,{
        y:0
      },{
        y:-10,
        opacity:0
      })
    }
  })
}

playAnimation(0);

