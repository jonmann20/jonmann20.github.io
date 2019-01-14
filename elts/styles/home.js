import {html} from 'lit-element';

export const homeStyles = html`
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

	/*.twitter-timeline {
		opacity: 0;
		transition: opacity 0.15s cubic-bezier(0, 0, 0.3, 1);
	}

	.twitter-timline-custom-styled {
		opacity: 1;
		box-shadow: var(--box-shadow-2);
		border-radius: 2px;
	}*/
`;