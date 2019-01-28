(window.webpackJsonp=window.webpackJsonp||[]).push([[10,4,6],{10:function(t,n,e){"use strict";e.r(n);var o=e(16),i=e(5),a=e(6),r=e(15);customElements.define("page-home",class extends o.a{constructor(){super(),document.title="Jon Wiedmann",r.a.addMeta("description","Jon Wiedmann's personal website.  A site with information on Jon's work experience and hobbies."),r.a.addMeta("keywords","Jon Wiedmann, Web Developer, HTML5, CSS, Javascript","Polymer"),r.a.addLink("preconnect","https://platform.twitter.com"),r.a.addLink("preconnect","https://cdn.syndication.twimg.com"),r.a.addLink("preconnect","https://syndication.twitter.com"),r.a.addLink("dns-prefetch","https://abs.twimg.com"),r.a.addLink("dns-prefetch","https://pbs.twimg.com"),r.a.addLink("dns-prefetch","https://ton.twimg.com")}firstUpdated(){r.a.require("https://platform.twitter.com/widgets.js").then(()=>{let t=document.createElement("style");t.type="text/css",t.innerHTML="\n\t\t\t\tbody {\n\t\t\t\t\tcolor: #fcfcfa;\n\t\t\t\t}\n\n\t\t\t\t.timeline-Widget {\n\t\t\t\t\tbackground: #2d2a2e;\n\t\t\t\t}\n\n\t\t\t\t.customisable-highlight {\n\t\t\t\t\tcolor: #66d9ef !important;\n\t\t\t\t}\n\n\t\t\t\t.timeline-Body {\n\t\t\t\t\tborder-top: none;\n\t\t\t\t\tborder-bottom: 2px solid #2d2a2e;\n\t\t\t\t\tborder-radius: 3px;\n\t\t\t\t}\n\t\t\t",twttr.widgets.createTimeline({sourceType:"profile",screenName:"jonwiedmann"},this.shadowRoot.querySelector(".col-right"),{width:620,height:520,theme:"dark",linkColor:"#66d9ef",chrome:"nofooter"}).then(n=>{let e=n.contentDocument;e&&(e.head.appendChild(t),n.classList.add("twitter-timline-custom-styled"))})})}render(){return o.b`
			<style>
				${i.default}
				${a.default}

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
					color: #ff6188;
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
			</style>

            <div class="col-left card">
                <h1>Fullstack Web Engineer</h1>
                <img src="/img/jon-icon.png" width="190" height="175" alt="Jon Wiedmann" class="jon-icon">

                <ul>
                    <li>
                        <a href="mailto:jonwiedmann@gmail.com" title="jonwiedmann@gmail.com" target="_blank" rel="noopener">
							<i-con name="mail" color="#66d9ef"></i-con>
                            Email
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/jonmann20" target="_blank" rel="noopener">
							<i-con name="code" color="#66d9ef"></i-con>
                            GitHub
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/pub/jon-wiedmann/67/42b/b64" target="_blank" rel="noopener">
							<i-con name="assignmentInd" color="#66d9ef"></i-con>
                            LinkedIn
                        </a>
                    </li>
                </ul>
            </div>
            <div class="col-right"></div>
        `}})},15:function(t,n,e){"use strict";class o{static require(t){return new Promise((n,e)=>{if(o.constructor._jsSrc.includes(t))n();else{let i=document.createElement("script");i.src=t,i.async=1,document.head.appendChild(i),i.onload=(()=>{o.constructor._jsSrc.push(t),n()}),i.onerror=(()=>e())}})}static addMeta(t,n){let e=document.createElement("meta");e.setAttribute("name",t),e.setAttribute("content",n),document.head.appendChild(e)}static addLink(t,n,e=!0){let o=document.createElement("link");o.setAttribute("rel",t),o.setAttribute("href",n),e&&o.setAttribute("crossorigin",""),document.head.appendChild(o)}static get getMainWidth(){const t=document.querySelector("main"),n=window.getComputedStyle(t,null),e=parseFloat(n.getPropertyValue("padding-left"));return t.getBoundingClientRect().width-e}}o.constructor._jsSrc=[],n.a=o},5:function(t,n,e){"use strict";e.r(n);n.default="\n\t:host {\n\t\tdisplay: block;\n\t}\n\n\t* {\n\t\tbox-sizing: border-box;\n\t}\n\n\th1,\n\th2,\n\th3 {\n\t\tmargin: 0.4em 0 0.6em;\n\t\tfont-size: 1.75em;\n\t\tfont-weight: 300;\n\t\tcolor: #fcfcfa;\n\t\ttext-shadow: 0 2px 3px #212121;\n\t}\n\n\tul {\n\t\tlist-style-type: none;\n\t\tpadding: 0;\n\t}\n\n\ta {\n\t\tcolor: #66d9ef;\n\t\ttext-decoration: none;\n\t\toutline: none;\n\t\tcursor: pointer;\n\t}\n\n\ta:hover {\n\t\tcolor: #7ddff1;\n\t\ttext-shadow: #7ddff1 0 0 6px;\n\t}\n\n\ta:active {\n\t\tcolor: #4fd3ed;\n\t}\n\n\ta:focus {\n\t\toutline: 0;\n\t}\n\n\tinput {\n\t\toutline-color: #888;\n\t}\n\n\tinput:focus {\n\t\tbox-shadow: 2px 2px 16px 2px rgba(0, 0, 0, 0.45);\n\t}\n\n\t/* utils */\n\n\t.card {\n\t\tdisplay: inline-block;\n\t\tbackground: #2d2a2e;\n\t\tbox-shadow: var(--box-shadow-2);\n\t\tborder-radius: 2px;\n\t\tpadding: 3px 25px 5px;\n\t}\n\n\t.card-light {\n\t\tborder-radius: 2px;\n\t\tbox-shadow: var(--box-shadow-2);\n\t}\n"},6:function(t,n,e){"use strict";e.r(n);n.default="\n\t.col-left {\n\t\tmin-width: 121px;\n\t\twidth: 100%;\n\t}\n\n\t.col-left ul {\n\t\tfont-size: 1.15em;\n\t}\n\n\t.col-right {\n\t\tmargin-top: 25px;\n\t\tpadding-bottom: 13px;\n\t}\n\n\t.col-right img {\n\t\tmax-width: 100%;\n\t}\n\n\t.col-right > div {\n\t\tpadding-bottom: 13px !important;\n\t}\n\n\t/* > mobile */\n\t@media (min-width: 801px) {\n\t\t.col-left {\n\t\t\tfloat: left;\n\t\t\twidth: 46%;\n\t\t\tmargin-right: 2%;\n\t\t}\n\n\t\t.col-right {\n\t\t\tfloat: right;\n\t\t\twidth: 50%;\n\t\t\tmargin-top: 0;\n\t\t}\n\t}\n\n\t/* tablet */\n\t@media (min-width: 801px) and (max-width: 1265px) {\n\t\t.col-left {\n\t\t\twidth: 100%;\n\t\t\tmargin-bottom: 0;\n\t\t}\n\n\t\t.col-right {\n\t\t\twidth: 100%;\n\t\t\tmargin-top: 25px;\n\t\t}\n\t}\n"}}]);