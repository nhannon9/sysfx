document.addEventListener("DOMContentLoaded", function () {
    // Email configuration
    const emailConfig = {
        user: "nick",
        domain: "sysfx.net",
        getEmail: function() { return `${this.user}@${this.domain}`; }
    };

    // Set email in welcome section
    const emailElement = document.getElementById("email");
    if (emailElement) {
        emailElement.innerHTML = `<a href="mailto:${emailConfig.getEmail()}">${emailConfig.getEmail()}</a>`;
    }

    // Set email link in contact section
    const emailLink = document.getElementById("email-link");
    if (emailLink) {
        emailLink.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = `mailto:${emailConfig.getEmail()}`;
        });
    }

    // Typing effect
    const text = "Providing next-gen tech solutions.";
    let index = 0;
    const typingEffectElement = document.getElementById("typing-effect");
    if (typingEffectElement) {
        function typeEffect() {
            if (index < text.length) {
                typingEffectElement.innerHTML += text.charAt(index);
                index++;
                setTimeout(typeEffect, 50);
            }
        }
        typeEffect();
    }

    // Enhanced dark mode toggle with icon and localStorage
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            const icon = darkModeToggle.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-moon");
                icon.classList.toggle("fa-sun");
            }
            localStorage.setItem("darkMode", body.classList.contains("dark-mode") ? "enabled" : null);
        });

        // Check dark mode preference on load
        if (localStorage.getItem("darkMode") === "enabled") {
            body.classList.add("dark-mode");
            const icon = darkModeToggle.querySelector("i");
            if (icon) {
                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");
            }
        }
    }

    // Smooth scrolling
    document.querySelectorAll("nav a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });

    // Real-time clock
    function updateClock() {
        const clockElement = document.getElementById("current-time");
        if (clockElement) {
            const now = new Date();
            clockElement.innerHTML = `<i class="fas fa-clock" aria-hidden="true"></i> ${now.toLocaleTimeString()}`;
        }
    }
    updateClock();
    setInterval(updateClock, 1000);

    // Weather widget (placeholder with option for real API)
    function updateWeather() {
        const weatherElement = document.getElementById("weather-widget");
        if (weatherElement) {
            // Uncomment and configure for real weather data using OpenWeatherMap
            /*
            const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=Clinton,CT,US&units=imperial&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    weatherElement.innerHTML = `<i class="fas fa-cloud-sun" aria-hidden="true"></i> ${data.main.temp}°F in Clinton, CT`;
                })
                .catch(() => {
                    weatherElement.innerHTML = "Weather unavailable";
                });
            */
            // Current mock weather
            const mockWeather = {
                temp: Math.round(65 + Math.random() * 15),
                condition: "Partly Cloudy"
            };
            weatherElement.innerHTML = `<i class="fas fa-cloud-sun" aria-hidden="true"></i> ${mockWeather.temp}°F in Clinton, CT`;
        }
    }
    updateWeather();
    setInterval(updateWeather, 300000); // Update every 5 minutes

    // Initialize particles.js
    if (document.getElementById("particles-js")) {
        particlesJS("particles-js", {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    // Simple map placeholder
    const mapElement = document.getElementById("map");
    if (mapElement) {
        mapElement.innerHTML = `
            <div style="background: #eee; height: 100%; display: flex; align-items: center; justify-content: center;">
                <p>Map of Clinton, CT (Replace with real map)</p>
            </div>
        `;
    }
});
