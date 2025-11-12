document.addEventListener('DOMContentLoaded', function() {
	const collapseBtn = document.getElementById('collapseBtn');
	const device = document.querySelector('.device');
	const sidebar = document.querySelector('.sidebar');
	const tabs = Array.from(document.querySelectorAll('.tab'));
	const searchInput = document.getElementById('searchInput');
	const searchBtn = document.getElementById('searchBtn');
	const searchResultContainer = document.getElementById('searchResult');

	const booksCatalog = [
		{
			title: "I'm Glad My Mom Died",
			author: 'Jennette McCurdy',
			cover: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1649228846i/59366244.jpg'
		},
		{
			title: 'Atomic Habits',
			author: 'James Clear',
			cover: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg'
		},
		{
			title: 'The Alchemist',
			author: 'Paulo Coelho',
			cover: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg'
		},
		{
			title: 'The Great Gatsby',
			author: 'F. Scott Fitzgerald',
			cover: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1650033243i/41733839.jpg'
		},
		{
			title: 'Twilight',
			author: 'Stephenie Meyer',
			cover: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1700522826i/41865.jpg'
		},
		{
			title: 'An Academic Affair',
			author: 'Jodi McAlister',
			cover: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1743882229i/224003821.jpg'
		},
		{
			title: 'Fallen City',
			author: 'Adrienne Young',
			cover: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1734476251i/222376635.jpg'
		},
		{
			title: 'Gemini: Stepping Stone to the Moon',
			author: 'Jeffrey Kluger',
			cover: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1745876622i/222376666.jpg'
		},
		{
			title: 'Her One Regret',
			author: 'Donna Freitas',
			cover: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1749072149i/223363564.jpg'
		},
		{
			title: 'Cursed Daughters',
			author: 'Oyinkan Braithwaite',
			cover: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1744489197i/227429747.jpg'
		}
	];

	
	function normalizeSearchValue(value) {
		return value.toLowerCase().replace(/\s+/g, ' ').trim();
	}
	function renderSearchResult(book) {
		if (!searchResultContainer) {
			console.error('Search result container not found!');
			return;
		}

		if (book) {
			searchResultContainer.innerHTML = `
				<img src="${book.cover}" alt="${book.title} cover">
				<div class="result-info">
					<div class="result-title">${book.title}</div>
					<div class="result-message">by ${book.author}</div>
				</div>
			`;
			searchResultContainer.classList.add('visible');
			searchResultContainer.classList.remove('empty');
		} else {
			searchResultContainer.innerHTML = `<div class="result-message">Not found</div>`;
			searchResultContainer.classList.add('visible', 'empty');
		}
	}
	
	function handleSearch() {
		console.log('handleSezrch called');
		if (!searchInput) {
			console.error('Search input not found!');
			return;
		}
		if (!searchResultContainer) {
			console.error('Search result container not found!');
			return;
		}

		const query = searchInput.value.trim();
        console.log('search querry :', query);
		
		if (!query) {
			searchResultContainer.classList.remove('visible', 'empty');
			searchResultContainer.innerHTML = '';
			return;
		}
				
		const normalizedQuery = normalizeSearchValue(query);
		console.log('normalized querry :', normalizedQuery);

		
		const matchingBooks = booksCatalog.filter(function(book) {
			const normalizedTitle = normalizeSearchValue(book.title);
			const normalizedAuthor = normalizeSearchValue(book.author);
			return normalizedTitle.includes(normalizedQuery) || normalizedAuthor.includes(normalizedQuery);
		});

		console.log('matching books:', matchingBooks);

		
		if (matchingBooks.length > 0) {
			renderSearchResult(matchingBooks[0]);
		} else {
			renderSearchResult(null);
		}
	}

	
	if (collapseBtn && device && sidebar) {
		collapseBtn.addEventListener('click', function () {
			const isCollapsed = device.classList.toggle('sidebar-collapsed');
			if (isCollapsed) {
				sidebar.classList.add('collapsed');
			} else {
				sidebar.classList.remove('collapsed');
			}
		});
	}

	
	tabs.forEach(function (t) {
		t.addEventListener('click', function () {
			tabs.forEach(function (x) { x.classList.remove('active'); });
			t.classList.add('active');
		});
	});
	
	if (searchInput) {
		searchInput.addEventListener('focus', function () {
			const searchContainer = document.querySelector('.search');
			if (searchContainer) {
				searchContainer.style.boxShadow = '0 0 0 1px rgba(245,217,124,.35), inset 0 0 0 1px rgba(245,217,124,.15)';
			}
		});

		searchInput.addEventListener('blur', function () {
			const searchContainer = document.querySelector('.search');
			if (searchContainer) {
				searchContainer.style.boxShadow = 'inset 0 0 0 1px rgba(245,217,124,.06)';
			}
		});
	}
	
	if (searchBtn) {
		console.log('Search button found, adding event listener');
		searchBtn.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			console.log('Search button clicked!');
			handleSearch();
		});
	} else {
		console.error('Search button not found!');
	}

	
	if (searchInput) {
		console.log('Search input found, adding event listener');
		searchInput.addEventListener('keydown', function (event) {
			if (event.key === 'Enter') {
				event.preventDefault();
				event.stopPropagation();
				console.log('Enter key pressed!');
				handleSearch();
			}
		});
	} else {
		console.error('Search input not found!');
	}

	
	function toggleDropdown(btn) {
		const dropdown = btn.nextElementSibling;
		const isOpen = dropdown.classList.contains('show');
		
		
		document.querySelectorAll('.status-dropdown').forEach(function(d) {
			d.classList.remove('show');
		});
		document.querySelectorAll('.status-btn').forEach(function(b) {
			b.classList.remove('active');
		});
		
		
		if (!isOpen) {
			dropdown.classList.add('show');
			btn.classList.add('active');
		}
	}

	function selectStatus(option, statusText) {
		const dropdown = option.closest('.status-dropdown');
		const btn = dropdown.previousElementSibling;
		const span = btn.querySelector('span');
		
		span.textContent = statusText;
		dropdown.classList.remove('show');
		btn.classList.remove('active');
	}

	
	document.addEventListener('click', function(e) {
		if (!e.target.closest('.read-status')) {
			document.querySelectorAll('.status-dropdown').forEach(function(d) {
				d.classList.remove('show');
			});
			document.querySelectorAll('.status-btn').forEach(function(b) {
				b.classList.remove('active');
			});
		}
	});

	
	window.toggleDropdown = toggleDropdown;
	window.selectStatus = selectStatus;
});
