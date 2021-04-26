/* global page */
const PORT = 8082;

describe('page home', () => {
	beforeAll(async() => {
		await page.goto(`http://localhost:${PORT}`);
	});

	it('should be titled "Jon Wiedmann"', async() => {
		await new Promise((r) => setTimeout(r, 100));

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
		await new Promise((r) => setTimeout(r, 500));

		const h1El = await page.evaluateHandle('document.querySelector("page-home").shadowRoot.querySelector("h1")');
		const h1 = await page.evaluate(h => h.innerHTML, h1El);
		expect(h1).toBe('Fullstack Web Engineer');
	});
});