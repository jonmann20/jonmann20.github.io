import {html, LitElement} from 'lit-element';
import {shellStyles} from './styles/shell';

class PageHome extends LitElement {
	constructor() {
		super();

		document.title = 'Jon Wiedmann';
		document.body.classList.add('home'); // TODO: move to redux

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
				width: 520,
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
				${shellStyles}

				:host {
					display: block;
				}

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

				@media (min-width: 1061px) {
					.col-left {
						float: left;
						width: 48%;
						margin-right: 2%;
					}

					.col-right {
						float: right;
						width: 48%;
						margin-top: 0;
					}
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
        `;
	}
}

customElements.define('page-home', PageHome);