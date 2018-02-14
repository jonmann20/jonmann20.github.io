"use strict";class Util{static require(e){return new Promise((t,a)=>{if(Util.constructor._jsSrc.includes(e))t();else{let o=document.createElement("script");o.src=e,o.async=1,document.head.appendChild(o),o.onload=(()=>{Util.constructor._jsSrc.push(e),t()}),o.onerror=(()=>a())}})}static addMeta(e,t){let a=document.createElement("meta");a.setAttribute("name",e),a.setAttribute("content",t),document.head.appendChild(a)}static get getMainWidth(){const e=document.querySelector("main"),t=window.getComputedStyle(e,null),a=parseFloat(t.getPropertyValue("padding-left"));return e.getBoundingClientRect().width-a}}Util.constructor._jsSrc=[];class GamesController{static index(){Promise.all([Router.load("/games/index.html"),Util.require("/assets/listCarousel.js")]).then(()=>new ListCarousel(document.querySelector(".col-left ul"))),document.title="Games",document.body.classList.add("games","carousel-list-page")}}class HomeController{static index(){Promise.all([Router.load("/home.html"),Util.require("https://platform.twitter.com/widgets.js")]).then(()=>twttr.widgets.load()),document.title="Jon Wiedmann",Util.addMeta("description","Jon Wiedmann's personal website.  A site with information on Jon's work experience and hobbies."),Util.addMeta("keywords","Jon Wiedmann, Web Developer, HTML5, CSS, Javascript","Polymer"),document.body.classList.add("home")}}class PlaygroundController{static openNav(){let e=document.querySelector(".hdr-nav2 .playground-nav-wrap");e.classList.contains("visible")||e.classList.add("visible")}static index(){PlaygroundController.openNav(),Router.load("/playground/index.html"),document.title="Playground",Util.addMeta("description","An playground area for web tech demos."),Util.addMeta("keywords","canvas, html5"),document.body.classList.add("playground","playInner")}static ballPit(){PlaygroundController.openNav(),Promise.all([Router.load("/playground/ball-pit.html"),Util.require("/assets/ballPit.js")]).then(()=>{window.ballPit=new BallPit}),document.title="Ball Pit | Playground",Util.addMeta("description","A canvas example showcasing a ball pit."),Util.addMeta("keywords","canvas, html5"),document.body.classList.add("playground","playInner","nav3")}static starryBackground(){PlaygroundController.openNav(),Promise.all([Router.load("/playground/stars.html"),Util.require("/assets/stars.js")]).then(()=>{window.starryBg=new StarryBg}),document.title="Starry Background | Playground",Util.addMeta("description","A canvas example showcasing a starry background."),Util.addMeta("keywords","canvas, html5"),document.body.classList.add("playground","playInner","nav2")}static breakdancingCube(){PlaygroundController.openNav(),Router.load("/playground/breakdancing-cube.html"),document.title="Breakdancing Cube | Playground",Util.addMeta("description","Pure CSS3 animation demo."),Util.addMeta("keywords","CSS3, HTML5"),document.body.classList.add("playground","playInner","nav1")}}class PortfolioController{static index(){Promise.all([Router.load("/portfolio/index.html"),Util.require("/assets/listCarousel.js")]).then(()=>new ListCarousel(document.querySelector(".col-left ul"))),document.title="Portfolio",document.body.classList.add("portfolio","carousel-list-page")}}class Router{static route(e){switch(Router.resetController(e),e){case"#games":GamesController.index();break;case"#portfolio":PortfolioController.index();break;case"#playground":PlaygroundController.index();break;case"#playground/ball-pit":PlaygroundController.ballPit();break;case"#playground/breakdancing-cube":PlaygroundController.breakdancingCube();break;case"#playground/starry-background":PlaygroundController.starryBackground();break;case"#home":default:HomeController.index()}}static async load(e){const t=await fetch(e);t.ok&&(document.querySelector("main").innerHTML=await t.text())}static run(){Router.route(location.hash)}static rmMeta(e){const t=document.head.querySelector(e);t&&document.head.removeChild(t)}static resetController(e){scrollTo(0,0),document.querySelector("main").innerHTML="",document.body.className="",document.title="",Router.rmMeta("meta[name=description]"),Router.rmMeta("meta[name=keywords]"),dispatchEvent(new CustomEvent("route",{detail:e}))}}window.onhashchange=(()=>Router.route(location.hash)),(()=>{Router.run();let e=!1;function t(){document.querySelector("aside").classList.remove("active"),e=!1,document.body.removeEventListener("click",t,{passive:!0}),document.body.removeEventListener("touchend",t,{passive:!0})}window.onresize=(()=>{window.innerWidth>800&&t()}),document.querySelector(".menu").addEventListener("click",a=>{a.preventDefault(),e?t():(document.querySelector("aside").classList.add("active"),e=!0,requestAnimationFrame(()=>{document.body.addEventListener("click",t,{passive:!0}),document.body.addEventListener("touchend",t,{passive:!0})}))}),addEventListener("route",()=>{const e=window.location.hash;if(void 0===e||0!==e.startsWith("#playground")){let e=document.querySelector(".hdr-nav2 .playground-nav-wrap");e.classList.contains("visible")&&e.classList.remove("visible")}},{passive:!0})})();