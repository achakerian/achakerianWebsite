const themeToggleBtn = document.getElementById('themeToggle');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    updateButtonText();
});

function updateButtonText() {
    if (body.classList.contains('dark-theme')) {
        themeToggleBtn.textContent = 'Switch to Light Mode';
    } else {
        themeToggleBtn.textContent = 'Switch to Dark Mode';
    }
}

// Optionally, save theme preference to localStorage
window.addEventListener('load', () => {
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
    }
    updateButtonText();
});

themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});
