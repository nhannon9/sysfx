document.addEventListener("DOMContentLoaded", function () {
    // Original typing effect
    const text = "Providing next-gen tech solutions.";
    let index = 0;
    const typingEffectElement = document.getElementById("typing-effect");

    function typeEffect() {
        if (index < text.length) {
            typingEffectElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeEffect, 50);
        }
    }

    typeEffect();

    // Enhanced dark mode toggle with icon
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    darkModeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        
        // Update icon
        const icon = darkModeToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
        }

        // Store dark mode preference
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", null);
        }
    });

    // Check dark mode preference on load
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        const icon = darkModeToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    // Smooth scrolling (preserved from original)
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

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

    // New feature: Real-time clock
    function updateClock() {
        const clockElement = document.getElementById('current-time');
        if (clockElement) {
            const now = new Date();
            clockElement.innerHTML = `<i class="fas fa-clock"></i> ${now.toLocaleTimeString()}`;
        }
    }

    updateClock();
    setInterval(updateClock, 1000);

    // New feature: Weather widget
    function updateWeather() {
        const weatherElement = document.getElementById('weather-widget');
        if (weatherElement) {
            // This is a placeholder. Replace with actual API call
            const mockWeather = {
                temp: Math.round(65 + Math.random() * 15),
                condition: 'Partly Cloudy'
            };
            weatherElement.innerHTML = `<i class="fas fa-cloud-sun"></i> ${mockWeather.temp}°F in Clinton, CT`;
        }
    }

    updateWeather();
    // Update weather every 5 minutes
    setInterval(updateWeather, 300000);

    // Initialize particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: false
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    // Simple map placeholder
    const mapElement = document.getElementById('map');
    if (mapElement) {
        mapElement.innerHTML = `
            <div style="background: #eee; height: 100%; display: flex; align-items: center; justify-content: center;">
                <p>Map of Clinton, CT</p>
            </div>
        `;
    }
});
