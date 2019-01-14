import {html} from 'lit-element';

export const shellStyles = html`
	* {
		box-sizing: border-box;
	}

html {
  min-width: 315px;
  background-color: #1d1b1e; }

body {
  min-height: 100vh;
  position: relative;
  margin: 0;
  padding-top: 40px;
  line-height: 1.25;
  font-size: 87.5%;
  font-family: Arial, sans-serif;
  color: #fcfcfa;
  --box-shadow-2: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  --mobile-nav-bg: $card-background; }

h1,
h2,
h3,
h4 {
  margin: 0.4em 0 0.6em;
  font-size: 1.75em;
  font-weight: 300;
  color: #fcfcfa;
  text-shadow: 0 2px 3px #212121; }

ul {
  list-style-type: none;
  padding: 0; }

a {
  color: #66d9ef;
  text-decoration: none;
  outline: none;
  cursor: pointer; }
  a:hover {
    color: #7ddff1;
    text-shadow: #7ddff1 0 0 6px; }
  a:active {
    color: #4fd3ed; }
  a:focus {
    outline: 0; }

button {
  transition: all 0.35s ease-out;
  cursor: pointer; }

input {
  outline-color: #888; }
  input:focus {
    box-shadow: 2px 2px 16px 2px rgba(0, 0, 0, 0.45); }

iron-icon {
  display: inline-block;
  width: 24px; }

.card {
  display: inline-block;
  background: #2d2a2e;
  box-shadow: var(--box-shadow-2);
  border-radius: 2px;
  padding: 3px 25px 5px; }

.card-light {
  border-radius: 2px;
  box-shadow: var(--box-shadow-2); }

.caption {
  color: #919091; }

.big-btn {
  display: inline-block;
  margin: 10px auto;
  padding: 9px 14px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1.2em;
  background: rgba(107, 107, 107, 0.64);
  box-shadow: 0 3px 0 rgba(54, 54, 54, 0.94);
  opacity: 1;
  transition: all 0.19s;
  color: #ffd866; }
  .big-btn:hover, .big-btn:focus {
    color: #ffd866;
    box-shadow: 0 3px 0 #ffd866;
    text-shadow: none; }
  .big-btn:active {
    box-shadow: none !important;
    transform: translateY(3px); }
  .big-btn span {
    padding-right: 10px;
    vertical-align: -1px; }

.page {
  height: 100%;
  max-width: 1520px;
  margin: 0 auto;
  padding: 0; }

header {
  position: fixed;
  z-index: 99999;
  top: 0;
  width: 100%;
  background: #2d2a2e; }
  header .menu {
    position: absolute;
    display: flex;
    top: 0;
    right: 0;
    padding: 16px 20px 15px 16px;
    width: auto;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none; }
  header nav {
    font-size: 1.57em;
    text-align: left;
    margin-top: 35px;
    padding: 15px 20px;
    min-width: 165px; }
    header nav:first-child {
      margin-top: 0;
      height: 55px; }
      header nav:first-child a {
        display: inline;
        text-align: center;
        line-height: 1.1 !important;
        margin-bottom: 0;
        margin-right: 0; }
    header nav.hdr-nav2 iron-icon {
      font-size: 0.6em;
      margin-left: 15px; }
    header nav ul {
      list-style-type: none;
      font-size: 62%;
      width: 90%;
      margin: 0 auto;
      padding: 0;
      border-radius: 1px; }
      header nav ul a {
        margin-right: 0 !important; }
        header nav ul a:active {
          margin-bottom: 4px; }
    header nav a {
      width: 100%;
      color: #ffd866; }
      header nav a:hover {
        color: #ffd866;
        text-shadow: 0 0 6px #ffd866; }

aside {
  transform: translateX(-100%);
  transition: all 0.3s cubic-bezier(0, 0, 0.3, 1);
  padding-top: 60px;
  height: 100%;
  width: 75%;
  min-width: 200px;
  max-width: 260px;
  position: fixed;
  left: 0;
  top: 0;
  background: #2d2a2e;
  z-index: 999;
  will-change: transform; }
  aside.active {
    transform: translateX(0); }
  aside a {
    display: block;
    font-size: 1.45em;
    padding: 10px 0 10px 20px;
    text-align: left !important;
    color: #ffd866; }
    aside a:hover {
      color: #ffd866;
      text-shadow: 0 0 6px #ffd866; }
  aside iron-icon {
    float: left;
    margin-right: 20px;
    margin-top: 5px; }
  aside .playground-nav {
    margin-left: 25px; }
    aside .playground-nav a {
      font-size: 1.2em; }

header nav a,
aside a,
header nav a:visited,
aside a:visited {
  text-align: right;
  display: block;
  margin-right: 18px;
  line-height: 1.7;
  transition: none; }

header nav a:hover iron-icon,
aside a:hover iron-icon,
.home nav .icon-home,
.games nav .icon-controllernes,
.games aside .icon-controllernes,
.playground nav .icon-beaker,
.playground aside .icon-beaker,
.portfolio nav .icon-briefcase,
.portfolio aside .icon-briefcase,
.about nav .icon-user,
.about aside .icon-user {
  color: #ff6188; }

.hdr-nav2 {
  display: none;
  margin-top: 20px; }
  .hdr-nav2 ul a {
    margin-bottom: 4px;
    text-align: center; }
  .hdr-nav2 .icon-controllernes {
    font-size: 0.72em; }

.nav1 .playground-nav li:nth-child(1) a,
.nav2 .playground-nav li:nth-child(2) a,
.nav3 .playground-nav li:nth-child(3) a {
  color: #ff6188 !important;
  -webkit-text-stroke: 1px #ff6188;
  text-stroke: 1px #ff6188; }

.nav1 .playground-nav li:nth-child(1) a:hover,
.nav2 .playground-nav li:nth-child(2) a:hover,
.nav3 .playground-nav li:nth-child(3) a:hover {
  cursor: default;
  text-shadow: none; }

.hdr-nav2 .playground-nav-wrap {
  height: 0;
  opacity: 0;
  visibility: hidden;
  will-change: height, padding, opacity;
  transition: 0.25s ease; }
  .hdr-nav2 .playground-nav-wrap.visible {
    padding: 10px 0 10px 40px;
    height: 92px;
    visibility: visible;
    opacity: 1; }

main {
  text-align: center;
  padding-left: 0;
  width: 93%;
  height: 100%;
  margin: 40px auto 0;
  transition: opacity 0.3s cubic-bezier(0, 0, 0.3, 1); }
  main::before, main::after {
    content: ' ';
    display: table; }
  main::after {
    clear: both; }
  main.leftbar-active {
    opacity: 0.5; }

.col-left {
  min-width: 121px;
  width: 100%; }
  .col-left ul {
    font-size: 1.15em; }

.col-right {
  margin-top: 25px;
  padding-bottom: 13px; }
  .col-right img {
    max-width: 100%; }
  .col-right > div {
    padding-bottom: 13px !important; }

.carousel-list-page .col-left {
  display: none; }

.carousel-list-page .col-right {
  margin-top: 0; }
  .carousel-list-page .col-right > div {
    opacity: 1;
    visibility: visible;
    transition: 450ms opacity;
    position: static;
    width: 100%;
    margin-bottom: 20px; }
    .carousel-list-page .col-right > div:last-child {
      margin-bottom: 100px; }
    .carousel-list-page .col-right > div.fade-in {
      opacity: 1 !important;
      visibility: visible !important;
      transition: 300ms opacity; }

#div-default {
  display: none; }

  /*
@media (min-width: 801px) {
  ul {
    list-style-type: inherit;
    padding-left: 20px; }
  .page {
    padding: 0 6%; }
  header {
    top: auto;
    width: auto;
    background: none; }
    header nav {
      text-align: center;
      padding: 15px 15px 0 0; }
      header nav:first-child {
        text-indent: 9px;
        padding-bottom: 20px; }
    header .menu {
      display: none !important; }
  .hdr-nav2 {
    display: block; }
  main {
    text-align: left;
    padding-left: 230px;
    width: 100%;
    margin: 0; }
  .col-left {
    float: left;
    width: 37%; }
  .col-right {
    float: right;
    width: 58%;
    margin-top: 0; }
  .carousel-list-page .col-left {
    display: block; }
  .carousel-list-page .col-right > div {
    opacity: 0;
    visibility: hidden;
    width: 44%;
    position: absolute;
    max-width: 728px; }
    .carousel-list-page .col-right > div:last-child {
      margin-bottom: 20px; }
  #div-default {
    display: block; } }

@media (min-width: 801px) and (max-width: 1265px) {
  .col-left {
    width: 100%;
    margin-bottom: 0; }
  .col-right {
    width: 100%;
    margin-top: 25px; }
  .carousel-list-page .col-right {
    margin-top: 25px; }
    .carousel-list-page .col-right > div {
      width: 100%;
      max-width: 490px; } } */
`;