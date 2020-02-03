/* global page */

describe('page home', () => {
	beforeAll(async() => {
		await page.goto('http://localhost:8080');
	});

	it('should be titled "Jon Wiedmann"', async() => {
		await expect(page.title()).resolves.toMatch('Jon Wiedmann');
	});

	// Leftbar
	// it('should have a leftbar with links', async() => {
	// 	const headEr = await page.$('head-er');
	// 	const html = await page.evaluate(headEr => headEr.shadowRoot.innerHTML, headEr);

	// 	expect(html).toBe('');
	// });

	// Left Col
	it('should have a header', async() => {
		const h1El = await page.evaluateHandle('document.querySelector("page-home").shadowRoot.querySelector("h1")');
		const h1 = await page.evaluate(h => h.innerHTML, h1El);
		expect(h1).toBe('Fullstack Web Engineer');
	});
});