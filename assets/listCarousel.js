"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var ListCarousel=function e(t){_classCallCheck(this,e);var n=void 0,i="default",a=document.createElement("iron-icon"),c=Array.from(t.querySelectorAll("a"));a.setAttribute("icon","icons:open-in-new"),a.style.marginLeft="3px",a.style.verticalAlign="-4px",a.style.width="20px",a.style.height="20px",c.forEach(function(e){e.addEventListener("click",function(t){n=t.target.id,n&&i!==n&&(t.preventDefault(),e.appendChild(a),document.querySelector("#div-"+i).classList.remove("fade-in"),document.querySelector("#div-"+n).classList.add("fade-in"),i=n)})})};