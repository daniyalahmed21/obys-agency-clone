const heroBefore = CSSRulePlugin.getRule("#hero::before");
let footerTopBefore = CSSRulePlugin.getRule("#footer-top h1::before");

function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

locomotive()

function disableScroll() {
  document.body.classList.add("no-scroll");
}

disableScroll()

function enableScroll() {
  document.body.classList.remove("no-scroll");
}

function spanText() {
  document.querySelectorAll(".reveal").forEach((elem) => {
    let spanChild = document.createElement("span");
    let spanParent = document.createElement("span");

    spanParent.classList.add("parent");
    spanChild.classList.add("child");

    spanChild.innerHTML = elem.innerHTML;
    spanParent.appendChild(spanChild);

    elem.innerHTML = "";
    elem.appendChild(spanParent);
  });
}
Shery.makeMagnet("#nav #nav-left h4" /* Element to target.*/, {
  //Parameters are optional.
  // ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  // duration: 1,
});
spanText();


function animateTextLines() {
  gsap.from(".parent .child", {
    opacity: 0,
    y: 100,
    stagger: 0.1,
    duration: 0.6,
    delay: 0.2,
    ease: "expoScale(0.5,7,none)",
  });
}

animateTextLines();

function animateCounter() {
  var counter = 0;
  

  if (window.innerWidth > 600) {
    var counterh4 = document.querySelector(
      "#loader h1:nth-child(1) .counterSpan .counter"
    );
  }
  else{
    var counterh4 = document.querySelector(
      "#loader h1:nth-child(2) .counterSpan .counter"
    );
  }

  

  var interval = setInterval(() => {
    if (counter < 100) {
      counter++;
      counterh4.innerHTML = counter;
    } else {
      clearInterval(interval);
      loaderFadeOut();
    }
  }, 33);
}

animateCounter();

function loaderFadeOut() {
  let tl = gsap.timeline();

  tl.to("#loader h1", {
    opacity: 0,
    stagger: 0.3,
    duration: 0.6,
    delay: 0.4,
  });

  tl.to("#loader", {
    height: 0,
    duration: 1,
    padding: 0,
    ease: Circ.easeInOut,
    onEnd: valueSetters(),
  });
  tl.to("#cover", {
    height: "100%",
    top: "0%",
    duration: 1,
    delay: -1,
    ease: Circ.easeInOut,
  });
  tl.to("#cover", {
    height: "0%",
    duration: 0.5,
    ease: Circ.easeInOut,
    onStart: homepageAnimation,
  });
}

function valueSetters() {
  gsap.set("#nav svg,#nav ul li", {
    opacity: 0,
  });
  gsap.set("#hero .hero-text .parent .child", {
    opacity: 0,
    y: "100%",
  });
}

function homepageAnimation() {
   
  let tl = gsap.timeline();

  tl.to("#hero .hero-text .parent .child", {
    opacity: 1,
    y: 0,
    stagger: 0.1,
    duration: 0.6,
    delay: 0.1,
    ease: "sine.out",
  });

  tl.to("#nav svg, #nav ul li", {
    duration: 1,
    opacity: 1,
    ease: "power2.inOut",
  });

  tl.to(
    heroBefore,
    {
      duration: 1,
      cssRule: {
        opacity: 1,
      },
      ease: "power2.inOut",
    },
    // "-=0.5"
  ); // "-=0.5" overlaps the animation by 0.5 seconds

enableScroll()
  
}
Shery.hoverWithMediaCircle(
  ".hero-line .parent .child span " /* Element to target.*/,
  {
    images: ["assets/Flag.jpg"] /*OR*/,
    //videos: ["video1.mp4", "video2.mp4"],
  }
);

Shery.mouseFollower({
  // Parameters are optional.
  // skew: true,
  //   ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  //   duration: 1,
});



var video_cursor = document.querySelector("#video-cursor");
var video_container = document.querySelector("#video-container");
var video = document.querySelector("#video-container video");

const videoContainer = document.getElementById("video-container");
const videoCursor = document.getElementById("video-cursor");

videoContainer.addEventListener("mouseenter", function () {
  videoContainer.addEventListener("mousemove", function (dets) {
    const rect = videoContainer.getBoundingClientRect(); // Get the bounding rectangle of the video container
    const cursorX = dets.clientX - rect.left; // Calculate X position relative to the video container
    const cursorY = dets.clientY - rect.top;  // Calculate Y position relative to the video container

    gsap.set(".mousefollower", {
      opacity: 0,
    });

    if (window.innerWidth < 600) {
      // For mobile devices
      gsap.to(videoCursor, {
        left: cursorX - videoCursor.clientWidth / 2, // Center the cursor horizontally
        top: cursorY - videoCursor.clientHeight / 2, // Center the cursor vertically
      });
    } else {
      // For desktop devices
      gsap.to(videoCursor, {
        left: cursorX - videoCursor.clientWidth / 2, // Adjust X position for desktop
        top: cursorY - videoCursor.clientHeight / 2, // Adjust Y position for desktop
      });
    }
  });
});


// video_container.addEventListener("mouseenter", function () {
//   video_container.addEventListener("mousemove", function (dets) {
//     if (window.innerWidth < 600) {
//       gsap.set(".mousefollower", {
//         opacity: 0,
//       });
//       gsap.to("#video-cursor", {
//         left: dets.x,
//         top: dets.y - 200,
//       });
//     }else{
//       gsap.set(".mousefollower", {
//         opacity: 0,
//       });
//       gsap.to("#video-cursor", {
//         left: dets.x - 570,
//         top: dets.y - 300,
//       });
//     }    
//   });
// });

video_container.addEventListener("mouseleave", function () {
  if (window.innerWidth < 600) { 
    gsap.to(video_cursor, {
      top: "50%",
      left: "50%",
    });
    gsap.set(".mousefollower", {
      opacity: 1,
    });
  }else{
    gsap.to(video_cursor, {
      top: "-15%",
      left: "70%",
    });
    gsap.set(".mousefollower", {
      opacity: 1,
    });
  }

});

var flag = 0;

video_container.addEventListener("click", function () {
  if (flag === 0) {
    video.play();
    video.style.opacity = 1;
    document.querySelector("#video-cursor").innerHTML =
      '<i class="ri-pause-line"></i>';
    gsap.to("#video-cursor", {
      scale: 0.5,
    });

    flag = 1;
  } else {
    video.pause();
    video.style.opacity = 0;
    document.querySelector("#video-cursor").innerHTML =
      '<i class="ri-play-mini-fill"></i>';
    gsap.to("#video-cursor", {
      scale: 1,
    });
    flag = 0;
  }
});

function footerAnimation() {
  gsap.to("#footer #footer-content #footer-top h1::before", {
    width: "100%",
    duration: 0.5,
    backgroundColor: "#151515",
    opacity: 1,
    ease: "power3.out",
    stagger: 0.1,
    overwrite: true,
    transform: "translateX(0) scale(1)",
  });

  gsap.fromTo(
    "#footer #footer-content #footer-top h1::before",
    { opacity: 0, scale: 1.2, x: -50 },
    { opacity: 1, scale: 1, x: 0, duration: 0.5, ease: "power3.out" }
  );
}

footerAnimation();

Shery.imageEffect(".images", {
  style: 5,
  // debug: true,
  gooey: true,
  config: {
    a: { value: 2, range: [0, 30] },
    b: { value: -0.89, range: [-1, 1] },
    zindex: { value: -9996999, range: [-9999999, 9999999] },
    aspect: { value: 0.8214264578720128 },
    ignoreShapeAspect: { value: true },
    shapePosition: { value: { x: 0, y: 0 } },
    shapeScale: { value: { x: 0.5, y: 0.5 } },
    shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
    shapeRadius: { value: 0, range: [0, 2] },
    currentScroll: { value: 0 },
    scrollLerp: { value: 0.07 },
    gooey: { value: true },
    infiniteGooey: { value: true },
    growSize: { value: 4, range: [1, 15] },
    durationOut: { value: 1, range: [0.1, 5] },
    durationIn: { value: 1.5, range: [0.1, 5] },
    displaceAmount: { value: 0.5 },
    masker: { value: true },
    maskVal: { value: 1.18, range: [1, 5] },
    scrollType: { value: 0 },
    geoVertex: { range: [1, 64], value: 1 },
    noEffectGooey: { value: true },
    onMouse: { value: 1 },
    noise_speed: { value: 1.3, range: [0, 10] },
    metaball: { value: 0.4, range: [0, 2] },
    discard_threshold: { value: 0.5, range: [0, 1] },
    antialias_threshold: { value: 0.01, range: [0, 0.1] },
    noise_height: { value: 0.5, range: [0, 2] },
    noise_scale: { value: 5.16, range: [0, 100] },
  },
});
