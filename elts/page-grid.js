import {css, html, LitElement} from 'lit-element';
import baseStyles from './styles/base';
import pageStyles from './styles/page';
import './gel-grid';
import './gel-item';

class PageGrid extends LitElement {
	static styles = [
		baseStyles,
		pageStyles,
		css`
			:host {
				--gel-offset-top: 40px;
				--gel-offset-left: 284px;

				position: absolute;
				top: 0;
				left: 0;
			}

			div {
				position: absolute;
			}
		`
	];

	render() {
		return html`
			<div class="card">
				<h1>Games</h1>
				<p>As a hobbyist Game Developer, I have created several game prototypes using technologies like Unity with C# and custom game engines in HTML5 Canvas with Javascript or Dart. Unless otherwise noted, all audio, graphics, and develepment was handmade.</p>
			</div>

			<gel-grid>
				<gel-item>
					<header>Blood Cell Brigade</header>
					<img src="img/blood-cell-brigade-title.jpg">
					<div>
						Created for the Intel Code for Good Game Jam in 40 hours.
					</div>
				</gel-item>
				<gel-item>
					<header>Defend Thy Kingdom</header>
					<img src="img/defend-thy-kingdom.jpg">
					<div>
						A third person wave survival game about wizards. This game was created as part of a four person team as a final project for EECS 494 - Computer Game Design at the University of Michigan - College of Engineering.
					</div>
				</gel-item>
			</gel-grid>
        `;
	}
}

customElements.define('page-grid', PageGrid);