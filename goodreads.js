const collapseBtn = document.getElementById('collapseBtn');
const device = document.querySelector('.device');
const sidebar = document.querySelector('.sidebar');
const tabs = Array.from(document.querySelectorAll('.tab'));
const searchInput = document.getElementById('searchInput');

collapseBtn.addEventListener('click', function () {
	const isCollapsed = device.classList.toggle('sidebar-collapsed');
	if (isCollapsed) {
		sidebar.classList.add('collapsed');
	} else {
		sidebar.classList.remove('collapsed');
	}
});

tabs.forEach(function (t) {
	t.addEventListener('click', function () {
		tabs.forEach(function (x) { x.classList.remove('active'); });
		t.classList.add('active');
	});
});

searchInput.addEventListener('focus', function () {
	document.querySelector('.search').style.boxShadow = '0 0 0 1px rgba(245,217,124,.35), inset 0 0 0 1px rgba(245,217,124,.15)';
});
searchInput.addEventListener('blur', function () {
	document.querySelector('.search').style.boxShadow = 'inset 0 0 0 1px rgba(245,217,124,.06)';
});

// Dropdown functionality for reading status
function toggleDropdown(btn) {
	const dropdown = btn.nextElementSibling;
	const isOpen = dropdown.classList.contains('show');
	
	// Close all other dropdowns
	document.querySelectorAll('.status-dropdown').forEach(function(d) {
		d.classList.remove('show');
	});
	document.querySelectorAll('.status-btn').forEach(function(b) {
		b.classList.remove('active');
	});
	
	// Toggle current dropdown
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

// Close dropdowns when clicking outside
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