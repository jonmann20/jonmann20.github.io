(window.webpackJsonp=window.webpackJsonp||[]).push([[11,4,6,7],{11:function(t,e,n){"use strict";n.r(e);var o=n(23);e.default=o.b`
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
		color: var(--white);
		text-shadow: 0 2px 3px #212121;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	a {
		color: var(--blue);
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

	a[selected] {
		color: var(--red) !important;
	}

	input {
		outline-color: #888;
	}

	input:focus {
		box-shadow: 2px 2px 16px 2px rgba(0, 0, 0, 0.45);
	}

	/* utils */

	.card {
		display: inline-block;
		background: var(--black);
		box-shadow: var(--box-shadow-2);
		border-radius: 2px;
		padding: 3px 25px 5px;
	}

	.card-light {
		border-radius: 2px;
		box-shadow: var(--box-shadow-2);
	}
`},12:function(t,e,n){"use strict";n.r(e);var o=n(23);e.default=o.b`
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
`},13:function(t,e,n){"use strict";n.r(e),n.d(e,"BLACK",function(){return i}),n.d(e,"BLUE",function(){return r}),n.d(e,"RED",function(){return a}),n.d(e,"WHITE",function(){return d}),n.d(e,"YELLOW",function(){return c});const o=getComputedStyle(document.body),i=o.getPropertyValue("--black"),r=o.getPropertyValue("--blue"),a=o.getPropertyValue("--red"),d=o.getPropertyValue("--white"),c=o.getPropertyValue("--yellow")},18:function(t,e,n){"use strict";n.r(e);var o=n(23),i=n(11),r=n(12),a=n(24),d=n(13);customElements.define("page-home",class extends o.a{static get styles(){return[i.default,r.default,o.b`
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

				ul a:hover i-con {
					color: var(--red);
				}

				i-con {
					margin-right: 7px;
					vertical-align: -6px;
				}

				.twitter-timeline {
					opacity: 0;
				}

				.twitter-timline-custom-styled {
					opacity: 1;
					box-shadow: var(--box-shadow-2);
					border-radius: 2px;
				}
			`]}constructor(){super(),document.title="Jon Wiedmann",a.a.addMeta("description","Jon Wiedmann's personal website.  A site with information on Jon's work experience and hobbies."),a.a.addMeta("keywords","Jon Wiedmann, Web Developer, HTML5, CSS, Javascript","Polymer"),a.a.addLink("preconnect","https://platform.twitter.com"),a.a.addLink("preconnect","https://cdn.syndication.twimg.com"),a.a.addLink("preconnect","https://syndication.twitter.com"),a.a.addLink("dns-prefetch","https://abs.twimg.com"),a.a.addLink("dns-prefetch","https://pbs.twimg.com"),a.a.addLink("dns-prefetch","https://ton.twimg.com")}firstUpdated(){a.a.require("https://platform.twitter.com/widgets.js").then(()=>{let t=document.createElement("style");t.type="text/css",t.innerHTML=`\n\t\t\t\tbody {\n\t\t\t\t\tcolor: ${d.WHITE};\n\t\t\t\t}\n\n\t\t\t\t.timeline-Widget {\n\t\t\t\t\tbackground: ${d.BLACK};\n\t\t\t\t}\n\n\t\t\t\t.customisable-highlight {\n\t\t\t\t\tcolor: ${d.BLUE} !important;\n\t\t\t\t}\n\n\t\t\t\t.timeline-Body {\n\t\t\t\t\tborder-top: none;\n\t\t\t\t\tborder-bottom: 2px solid ${d.BLACK};\n\t\t\t\t\tborder-radius: 3px;\n\t\t\t\t}\n\t\t\t`,twttr.widgets.createTimeline({sourceType:"profile",screenName:"jonwiedmann"},this.shadowRoot.querySelector(".col-right"),{width:620,height:520,theme:"dark",linkColor:d.BLUE,chrome:"nofooter"}).then(e=>{let n=e.contentDocument;n&&(n.head.appendChild(t),e.classList.add("twitter-timline-custom-styled"))})})}render(){return o.c`
            <div class="col-left card">
                <h1>Fullstack Web Engineer</h1>
                <img src="/img/jon-icon.png" width="190" height="175" alt="Jon Wiedmann" class="jon-icon">

                <ul>
                    <li>
                        <a href="mailto:jonwiedmann@gmail.com" title="jonwiedmann@gmail.com" target="_blank" rel="noopener">
							<i-con name="mail" color="${d.BLUE}"></i-con>
                            Email
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/jonmann20" target="_blank" rel="noopener">
							<i-con name="code" color="${d.BLUE}"></i-con>
                            GitHub
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/pub/jon-wiedmann/67/42b/b64" target="_blank" rel="noopener">
							<i-con name="assignmentInd" color="${d.BLUE}"></i-con>
                            LinkedIn
                        </a>
                    </li>
                </ul>
            </div>
            <div class="col-right"></div>
        `}})},24:function(t,e,n){"use strict";class o{static require(t){return new Promise((e,n)=>{if(o.constructor._jsSrc.includes(t))e();else{let i=document.createElement("script");i.src=t,i.async=1,document.head.appendChild(i),i.onload=(()=>{o.constructor._jsSrc.push(t),e()}),i.onerror=(()=>n())}})}static addMeta(t,e){let n=document.createElement("meta");n.setAttribute("name",t),n.setAttribute("content",e),document.head.appendChild(n)}static addLink(t,e,n=!0){let o=document.createElement("link");o.setAttribute("rel",t),o.setAttribute("href",e),n&&o.setAttribute("crossorigin",""),document.head.appendChild(o)}static get getMainWidth(){const t=document.querySelector("main"),e=window.getComputedStyle(t,null),n=parseFloat(e.getPropertyValue("padding-left"));return t.getBoundingClientRect().width-n}}o.constructor._jsSrc=[],e.a=o}}]);