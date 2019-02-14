(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{15:function(e,t,i){"use strict";i.r(t);var o=i(26);function l(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}class n extends o.a{constructor(){super(),this.expanded=!1}render(){return o.c`
			<style>
				:host {
					overflow-y: ${this.expanded?"hidden":"overlay"};
				}
			</style>
			<slot></slot>
		`}}l(n,"properties",{expanded:{type:Boolean}}),l(n,"styles",o.b`
		:host {
			--offset-top: var(--gel-offset-top, 0px);
			--offset-left: var(--gel-offset-left, 0px);

			--gel-item-margin: 25px;
			--gel-item-padding: 15px;
			--gel-item-width: 250px;
			--gel-item-height: 200px;

			--gel-width: calc(100% - var(--offset-left));
			--gel-height: calc(100% - var(--offset-top));

			width: var(--gel-width);
			height: var(--gel-height);

			position: fixed;

			display: flex;
			flex-direction: row;
			flex-flow: wrap;
			justify-content: center;
			align-content: baseline;
			background: #ccc;
		}
	`),customElements.define("gel-grid",n)}}]);