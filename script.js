document.addEventListener("DOMContentLoaded", function () { const text = "Providing next-gen tech solutions."; let index = 0; const typingEffectElement = document.getElementById("typing-effect");

function typeEffect() {
    if (index < text.length) {
        typingEffectElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeEffect, 50); // Adjust speed here (lower = faster)
    }
}

typeEffect();

const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Store dark mode preference in localStorage
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", null);
    }
});

// Check localStorage for dark mode preference on page load
if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
}

// ... (previous JavaScript code) ...

// Smooth scrolling for navigation links document.querySelectorAll('nav a').forEach(anchor => { anchor.addEventListener('click', function (e) { e.preventDefault();

const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    }
});

});

