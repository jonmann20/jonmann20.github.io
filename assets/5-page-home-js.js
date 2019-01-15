(window.webpackJsonp=window.webpackJsonp||[]).push([[8,4,12],{37:function(t,e,i){"use strict";i.r(e),i.d(e,"baseStyles",function(){return o});var n=i(47);const o=n["b"]`
	:host {
		display: block;
	}

	* {
		box-sizing: border-box;
	}

	h1,
	h2,
	h3 {
		margin: 0.4em 0 0.6em;
		font-size: 1.75em;
		font-weight: 300;
		color: #fcfcfa;
		text-shadow: 0 2px 3px #212121;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	a {
		color: #66d9ef;
		text-decoration: none;
		outline: none;
		cursor: pointer;
	}

	a:hover {
		color: #7ddff1;
		text-shadow: #7ddff1 0 0 6px;
	}

	a:active {
		color: #4fd3ed;
	}

	a:focus {
		outline: 0;
	}

	input {
		outline-color: #888;
	}

	input:focus {
		box-shadow: 2px 2px 16px 2px rgba(0, 0, 0, 0.45);
	}

	iron-icon {
		display: inline-block;
		width: 24px;
	}

	/* utils */

	.card {
		display: inline-block;
		background: #2d2a2e;
		box-shadow: var(--box-shadow-2);
		border-radius: 2px;
		padding: 3px 25px 5px;
	}

	.card-light {
		border-radius: 2px;
		box-shadow: var(--box-shadow-2);
	}
`},38:function(t,e,i){"use strict";i.r(e),i.d(e,"pageStyles",function(){return o});var n=i(47);const o=n["b"]`
	.col-left {
		min-width: 121px;
		width: 100%;
	}

	.col-left ul {
		font-size: 1.15em;
	}

	.col-right {
		margin-top: 25px;
		padding-bottom: 13px;
	}

	.col-right img {
		max-width: 100%;
	}

	.col-right > div {
		padding-bottom: 13px !important;
	}

	/* > mobile */
	@media (min-width: 801px) {
		.col-left {
			float: left;
			width: 46%;
			margin-right: 2%;
		}

		.col-right {
			float: right;
			width: 50%;
			margin-top: 0;
		}
	}

	/* tablet */
	@media (min-width: 801px) and (max-width: 1265px) {
		.col-left {
			width: 100%;
			margin-bottom: 0;
		}

		.col-right {
			width: 100%;
			margin-top: 25px;
		}
	}
`},42:function(t,e,i){"use strict";i.r(e);var n=i(47),o=i(37),r=i(38),a=i(48);customElements.define("page-home",class extends n.a{constructor(){super(),document.title="Jon Wiedmann",a.a.addMeta("description","Jon Wiedmann's personal website.  A site with information on Jon's work experience and hobbies."),a.a.addMeta("keywords","Jon Wiedmann, Web Developer, HTML5, CSS, Javascript","Polymer")}firstUpdated(){a.a.require("https://platform.twitter.com/widgets.js").then(()=>{let t=document.createElement("style");t.type="text/css",t.innerHTML="\n\t\t\t\tbody {\n\t\t\t\t\tcolor: #fcfcfa;\n\t\t\t\t}\n\n\t\t\t\t.timeline-Widget {\n\t\t\t\t\tbackground: #2d2a2e;\n\t\t\t\t}\n\n\t\t\t\t.customisable-highlight {\n\t\t\t\t\tcolor: #66d9ef !important;\n\t\t\t\t}\n\n\t\t\t\t.timeline-Body {\n\t\t\t\t\tborder-top: none;\n\t\t\t\t\tborder-bottom: 2px solid #2d2a2e;\n\t\t\t\t\tborder-radius: 3px;\n\t\t\t\t}\n\t\t\t",twttr.widgets.createTimeline({sourceType:"profile",screenName:"jonwiedmann"},this.shadowRoot.querySelector(".col-right"),{width:620,height:520,theme:"dark",linkColor:"#66d9ef",chrome:"nofooter"}).then(e=>{e.contentDocument.head.appendChild(t),e.classList.add("twitter-timline-custom-styled")})})}render(){return n["b"]`
			<style>
				${o.baseStyles}
				${r.pageStyles}

				.col-left {
					min-width: 337px;
					max-width: 520px;
				}

				img {
					float: left;
					padding-right: 15px;
					margin-bottom: -5px;
				}

				ul {
					margin-top: 55px;
					list-style-type: none;
					padding: 0;
					line-height: 2;
				}

				ul a:hover iron-icon {
					color: #ff6188;
				}

				iron-icon {
					margin-right: 7px;
					vertical-align: -6px;
				}

				.twitter-timeline {
					opacity: 0;
					transition: opacity 0.15s cubic-bezier(0, 0, 0.3, 1);
				}

				.twitter-timline-custom-styled {
					opacity: 1;
					box-shadow: var(--box-shadow-2);
					border-radius: 2px;
				}
			</style>

            <div class="col-left card">
                <h1>Fullstack Web Engineer</h1>
                <img src="/img/jon-icon.png" alt="Jon Wiedmann" class="jon-icon">

                <ul>
                    <li>
                        <a href="mailto:jonwiedmann@gmail.com" title="jonwiedmann@gmail.com" target="_blank" rel="noopener">
                            <iron-icon icon="i:mail"></iron-icon>
                            Email
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/jonmann20" target="_blank" rel="noopener">
                            <iron-icon icon="i:code"></iron-icon>
                            GitHub
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/pub/jon-wiedmann/67/42b/b64" target="_blank" rel="noopener">
                            <iron-icon icon="i:assignment-ind"></iron-icon>
                            LinkedIn
                        </a>
                    </li>
                </ul>
            </div>
            <div class="col-right"></div>
        `}})},48:function(t,e,i){"use strict";class n{static require(t){return new Promise((e,i)=>{if(n.constructor._jsSrc.includes(t))e();else{let o=document.createElement("script");o.src=t,o.async=1,document.head.appendChild(o),o.onload=(()=>{n.constructor._jsSrc.push(t),e()}),o.onerror=(()=>i())}})}static addMeta(t,e){let i=document.createElement("meta");i.setAttribute("name",t),i.setAttribute("content",e),document.head.appendChild(i)}static get getMainWidth(){const t=document.querySelector("main"),e=window.getComputedStyle(t,null),i=parseFloat(e.getPropertyValue("padding-left"));return t.getBoundingClientRect().width-i}}n.constructor._jsSrc=[],e.a=n}}]);