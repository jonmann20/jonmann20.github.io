import {css, html, LitElement} from 'lit-element';
import baseStyles from './styles/base';
import pageStyles from './styles/page';
import Util from '../js/util';
import {BLACK, BLUE, WHITE, RED} from './styles/vars';

class PageHome extends LitElement {
	static get styles() {
		return [
			baseStyles,
			pageStyles,
			css`
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
					color: ${RED};
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
			`
		];
	}

	constructor() {
		super();

		document.title = 'Jon Wiedmann';
		Util.addMeta('description', "Jon Wiedmann's personal website.  A site with information on Jon's work experience and hobbies.");
		Util.addMeta('keywords', 'Jon Wiedmann, Web Developer, HTML5, CSS, Javascript', 'Polymer');

		// NOTE: these will not be removed when changing routes
		Util.addLink('preconnect', 'https://platform.twitter.com');
		Util.addLink('preconnect', 'https://cdn.syndication.twimg.com');
		Util.addLink('preconnect', 'https://syndication.twitter.com');
		Util.addLink('dns-prefetch', 'https://abs.twimg.com');
		Util.addLink('dns-prefetch', 'https://pbs.twimg.com');
		Util.addLink('dns-prefetch', 'https://ton.twimg.com');
	}

	firstUpdated() {
		Util.require('https://platform.twitter.com/widgets.js').then(() => {
			// Keep in sync with vars.scss
			let styles = document.createElement('style');
			styles.type = 'text/css';
			styles.innerHTML = `
				body {
					color: ${WHITE.cssText};
				}

				.timeline-Widget {
					background: ${BLACK.cssText};
				}

				.customisable-highlight {
					color: ${BLUE.cssText} !important;
				}

				.timeline-Body {
					border-top: none;
					border-bottom: 2px solid ${BLACK.cssText};
					border-radius: 3px;
				}
			`;

			twttr.widgets.createTimeline({
				sourceType: 'profile',
				screenName: 'jonwiedmann'
			}, this.shadowRoot.querySelector('.col-right'), {
				width: 620,
				height: 520,
				theme: 'dark',
				linkColor: BLUE.cssText,
				chrome: 'nofooter'
			}).then(widget => {
				let iframeDoc = widget.contentDocument;
				if(iframeDoc) {
					iframeDoc.head.appendChild(styles);
					widget.classList.add('twitter-timline-custom-styled');
				}
			});
		});
	}

	render() {
		return html`
            <div class="col-left card">
                <h1>Fullstack Web Engineer</h1>
                <img src="/img/jon-icon.png" width="190" height="175" alt="Jon Wiedmann" class="jon-icon">

                <ul>
                    <li>
                        <a href="mailto:jonwiedmann@gmail.com" title="jonwiedmann@gmail.com" target="_blank" rel="noopener">
							<i-con name="mail" color="${BLUE.cssText}"></i-con>
                            Email
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/jonmann20" target="_blank" rel="noopener">
							<i-con name="code" color="${BLUE.cssText}"></i-con>
                            GitHub
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/pub/jon-wiedmann/67/42b/b64" target="_blank" rel="noopener">
							<i-con name="assignmentInd" color="${BLUE.cssText}"></i-con>
                            LinkedIn
                        </a>
                    </li>
                </ul>
            </div>
            <div class="col-right"></div>
        `;
	}
}

customElements.define('page-home', PageHome);