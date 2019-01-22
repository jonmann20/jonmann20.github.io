import {html, LitElement} from 'lit-element';
import {baseStyles} from './styles/base';
import {pageStyles} from './styles/page';
import Util from '../js/util';

class PageHome extends LitElement {
	constructor() {
		super();

		document.title = 'Jon Wiedmann';
		Util.addMeta('description', "Jon Wiedmann's personal website.  A site with information on Jon's work experience and hobbies.");
		Util.addMeta('keywords', 'Jon Wiedmann, Web Developer, HTML5, CSS, Javascript', 'Polymer');

		// <link rel="preconnect" href="https://platform.twitter.com" crossorigin>
		// <link rel="preconnect" href="https://cdn.syndication.twimg.com" crossorigin>
		// <link rel="preconnect" href="https://syndication.twitter.com" crossorigin>
		// <link rel="dns-prefetch" href="https://abs.twimg.com" crossorigin>
		// <link rel="dns-prefetch" href="https://pbs.twimg.com" crossorigin>
		// <link rel="dns-prefetch" href="https://ton.twimg.com" crossorigin>
	}

	firstUpdated() {
		Util.require('https://platform.twitter.com/widgets.js').then(() => {
			// Keep in sync with vars.scss
			let styles = document.createElement('style');
			styles.type = 'text/css';
			styles.innerHTML = `
				body {
					color: #fcfcfa;
				}

				.timeline-Widget {
					background: #2d2a2e;
				}

				.customisable-highlight {
					color: #66d9ef !important;
				}

				.timeline-Body {
					border-top: none;
					border-bottom: 2px solid #2d2a2e;
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
				linkColor: '#66d9ef',
				chrome: 'nofooter'
			}).then(widget => {
				let iframeDoc = widget.contentDocument;
				iframeDoc.head.appendChild(styles);
				widget.classList.add('twitter-timline-custom-styled');
			});
		});
	}

	render() {
		return html`
			<style>
				${baseStyles}
				${pageStyles}

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

				ul a:hover mwc-icon {
					color: #ff6188;
				}

				mwc-icon {
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
							<mwc-icon>mail</mwc-icon>
                            Email
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/jonmann20" target="_blank" rel="noopener">
							<mwc-icon>code</mwc-icon>
                            GitHub
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/pub/jon-wiedmann/67/42b/b64" target="_blank" rel="noopener">
							<mwc-icon>assignment_ind</mwc-icon>
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