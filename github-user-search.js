const input = document.querySelector('input');
const ul = document.querySelector('ul');
const divCount = document.getElementById('count');

let allItems = [];
let count = 0;

let PAGE_SIZE = 5;
let numPages = 0;

let oldPage = 0;
let page = 1;
let start = 0;
let end = 0;

function renderItems() {
	if(page === oldPage) {
		return;
	}

	// Reset
	ul.innerHTML = '';

	// Update pagination
	start = (page - 1) * PAGE_SIZE;
	end = page * PAGE_SIZE;

	if(end >= count) {
		end = count;
	}

	oldPage = page;
	divCount.textContent = `Showing ${start}-${end} of ${count}`;

	// Update list
	allItems.slice(start, end).forEach(async item => {
		let userResponse = await fetch(item.url);
		let user = {};

		if(!userResponse.ok) {
			user.name = 'Name: GitHub API limit exceeded';
			user.bio = 'Description: GitHub API limit exceeded';
			user.followers = ' GitHub API limit exceeded';
		}
		else {
			user = await userResponse.json();
		}

		let li = document.createElement('li');

		let img = document.createElement('img');
		img.src = item.avatar_url;
		img.width = 80;
		img.height = 80;
		li.appendChild(img);

		let div = document.createElement('div');
		div.textContent = user.name;

		let a = document.createElement('a');
		a.style = 'display: block;';
		a.href = item.html_url;
		a.textContent = item.login;
		div.appendChild(a);

		let p = document.createElement('p');
		p.textContent = user.bio;
		div.appendChild(p);

		let p2 = document.createElement('p');
		p2.textContent = `Followers: ${user.followers}`;
		div.appendChild(p2);

		li.appendChild(div);
		ul.appendChild(li)
	});
}

function previous() {
	if(numPages === 0) {
		return emptySearch();
	}

	--page;

	if(--page <= 1) {
		page = 1;
	}

	renderItems();
}

function next() {
	if(numPages === 0) {
		return emptySearch();
	}

	if(++page >= numPages) {
		page = numPages;
	}

	renderItems();
}

function emptySearch() {
	return alert('Please enter a search query');
}

async function search() {
	const query = input.value;

	if(!query) {
		return emptySearch();
	}

	// Reset
	oldPage = 0;
	ul.innerHTML = '';
	divCount.textContent = ''

	const queryResponse = await fetch(`https://api.github.com/search/users?q=${query}`);

	if(queryResponse.ok) {
		const searchResults = await queryResponse.json();

		allItems = searchResults.items;
		count = allItems.length;
		numPages = Math.ceil(count / PAGE_SIZE);

		renderItems();
	}
}

input.addEventListener('keypress', e => {
	if(e.key === 'Enter') {
		search();
	}
});