import {html, LitElement} from 'lit-element';
import {shellStyles} from './styles/shell';
import {homeStyles} from './styles/home';

class PageHome extends LitElement {
	firstUpdated() {
		//console.log('hi2', Util);
		// Util.require('https://platform.twitter.com/widgets.js').then(() => {
		// 	twttr.widgets.load();

		// 	// Keep in sync with vars.scss
		// 	let styles = document.createElement('style');
		// 	styles.type = 'text/css';
		// 	styles.innerHTML = `
		// 		body {
		// 			color: #fcfcfa;
		// 		}
		// 		.timeline-Widget {
		// 			background: #2d2a2e;
		// 		}
		// 		.customisable-highlight {
		// 			color: #66d9ef;
		// 		}
		// 	`;

		// 	twttr.events.bind('loaded', e => {
		// 		let widget = e.widgets[0];
		// 		console.log('loaded', widget, e);

		// 		if(widget) {
		// 			let iframeDoc = widget.contentDocument;
		// 			iframeDoc.head.appendChild(styles);

		// 			widget.classList.add('twitter-timline-custom-styled');
		// 		}
		// 	});
		// });
	}

	render() {
		return html`
			<style>
				${shellStyles}
				${homeStyles}
			</style>
<!-- 
            <link rel="preconnect" href="https://platform.twitter.com" crossorigin>
            <link rel="preconnect" href="https://cdn.syndication.twimg.com" crossorigin>
            <link rel="preconnect" href="https://syndication.twitter.com" crossorigin>
            <link rel="dns-prefetch" href="https://abs.twimg.com" crossorigin>
            <link rel="dns-prefetch" href="https://pbs.twimg.com" crossorigin>
            <link rel="dns-prefetch" href="https://ton.twimg.com" crossorigin> -->

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
            <div class="col-right">
				<!-- <a class="twitter-timeline" data-height="500" data-theme="dark" data-link-color="#66d9ef" href="https://twitter.com/jonwiedmann?ref_src=twsrc%5Etfw"></a> -->
				<!-- <a class="twitter-timeline" data-height="500" data-theme="dark" data-link-color="#66d9ef" href="https://twitter.com/jonwiedmann?ref_src=twsrc%5Etfw"></a> -->
            </div>
        `;
	}
}

customElements.define('page-home', PageHome);