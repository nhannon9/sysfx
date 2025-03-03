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

    // Enhanced typing effect with Typed.js
    if (document.getElementById("typing-effect")) {
        new Typed("#typing-effect", {
            strings: [
                "Providing next-gen tech solutions.",
                "Empowering your digital future.",
                "Precision tech expertise."
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }

    // Dark mode toggle with localStorage
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

    // Weather widget
    function updateWeather() {
        const weatherElement = document.getElementById("weather-widget");
        if (weatherElement) {
            const mockWeather = {
                temp: Math.round(65 + Math.random() * 15),
                condition: "Partly Cloudy"
            };
            weatherElement.innerHTML = `<i class="fas fa-cloud-sun" aria-hidden="true"></i> ${mockWeather.temp}°F in Clinton, CT`;
        }
    }
    updateWeather();
    setInterval(updateWeather, 300000);

    // Particles.js
    if (document.getElementById("particles-js")) {
        particlesJS("particles-js", {
            particles: {
                number: { value: 100, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 4, random: true },
                line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 8, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
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

    // Testimonial carousel
    const testimonials = document.querySelectorAll(".testimonial");
    let currentTestimonial = 0;
    function showTestimonial() {
        testimonials.forEach((t, i) => {
            t.style.opacity = i === currentTestimonial ? "1" : "0";
            t.style.position = i === currentTestimonial ? "relative" : "absolute";
        });
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    }
    showTestimonial();
    setInterval(showTestimonial, 5000);

    // Animated stats counters
    const statNumbers = document.querySelectorAll(".stat-number");
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute("data-count"));
        let count = 0;
        const increment = target / 100;
        const updateCount = () => {
            if (count < target) {
                count += increment;
                stat.textContent = Math.round(count);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        observer.observe(stat);
    });

    // Custom cursor effect
    const cursor = document.querySelector(".cursor");
    let trailTimeout;
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        cursor.classList.add("trail");

        clearTimeout(trailTimeout);
        trailTimeout = setTimeout(() => {
            cursor.classList.remove("trail");
        }, 100);
    });

    // Hide cursor on mobile
    if (window.innerWidth <= 768) {
        cursor.style.display = "none";
    }
});
