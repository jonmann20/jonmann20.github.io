const bodyStyles = getComputedStyle(document.body);

// Monakai theme
const BLACK = bodyStyles.getPropertyValue('--black');
const BLUE = bodyStyles.getPropertyValue('--blue');
const RED = bodyStyles.getPropertyValue('--red');
const WHITE = bodyStyles.getPropertyValue('--white');
const YELLOW = bodyStyles.getPropertyValue('--yellow');

export {
	BLACK,
	BLUE,
	RED,
	WHITE,
	YELLOW
};