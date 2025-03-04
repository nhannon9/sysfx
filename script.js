document.addEventListener("DOMContentLoaded", () => {
    // Email Configuration
    const emailConfig = {
        user: "nick",
        domain: "sysfx.net",
        getEmail: function () { return `${this.user}@${this.domain}`; }
    };

    // Utility: Set Email Links
    const setEmailLink = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.href = `mailto:${emailConfig.getEmail()}`;
            element.textContent = emailConfig.getEmail();
            element.addEventListener("click", () => playSound("click"));
        }
    };
    setEmailLink("email-link");
    setEmailLink("sidebar-email-link");
    const emailSpan = document.getElementById("email");
    if (emailSpan) {
        emailSpan.innerHTML = `<a href="mailto:${emailConfig.getEmail()}">${emailConfig.getEmail()}</a>`;
    }

    // Typing Effect with Typed.js
    const typingElement = document.getElementById("typing-effect");
    if (typingElement && typeof Typed !== "undefined") {
        typingElement.style.minHeight = "30px"; // Prevent layout shift
        new Typed("#typing-effect", {
            strings: [
                "Next-gen tech solutions.",
                "Empowering your future.",
                "Precision expertise."
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("darkModeToggle");
    if (darkModeToggle) {
        const toggleDarkMode = () => {
            document.body.classList.toggle("dark-mode");
            const icon = darkModeToggle.querySelector("i");
            icon?.classList.toggle("fa-moon");
            icon?.classList.toggle("fa-sun");
            localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
            playSound("click");
        };
        darkModeToggle.addEventListener("click", toggleDarkMode);
        if (localStorage.getItem("darkMode") === "enabled") toggleDarkMode();
    }

    // Mobile Navigation Toggle
    const navToggle = document.querySelector(".nav-toggle");
    const navUl = document.querySelector("nav ul");
    if (navToggle && navUl) {
        navToggle.addEventListener("click", () => {
            navUl.classList.toggle("show");
            navToggle.setAttribute("aria-expanded", navUl.classList.contains("show"));
            playSound("click");
        });
    }

    // Smooth Scrolling for Nav Links
    document.querySelectorAll(".nav-link").forEach(anchor => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute("href").substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                playSound("click");
                if (navUl?.classList.contains("show")) navUl.classList.remove("show"); // Close mobile nav
            }
        });
    });

    // Real-Time Clock
    const updateClock = () => {
        const clock = document.getElementById("current-time");
        if (clock) clock.innerHTML = `<i class="fas fa-clock" aria-hidden="true"></i> ${new Date().toLocaleTimeString()}`;
    };
    updateClock();
    setInterval(updateClock, 1000);

    // Weather Widget
    const weatherText = document.getElementById("weather-text");
    const localWeatherBtn = document.getElementById("local-weather-btn");
    const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your key
    const fetchWeather = (lat = 41.2788, lon = -72.5276) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                weatherText.innerHTML = `<i class="fas fa-cloud-sun" aria-hidden="true"></i> ${Math.round(data.main.temp)}°F in ${data.name}`;
            })
            .catch(() => {
                weatherText.innerHTML = "Weather unavailable";
            });
    };
    if (weatherText) fetchWeather();
    if (localWeatherBtn) {
        localWeatherBtn.addEventListener("click", () => {
            navigator.geolocation?.getCurrentPosition(
                pos => fetchWeather(pos.coords.latitude, pos.coords.longitude),
                () => { weatherText.innerHTML = "Location denied"; },
                { timeout: 5000 }
            );
            playSound("click");
        });
    }

    // Particles.js
    if (document.getElementById("particles-js") && typeof particlesJS !== "undefined") {
        particlesJS("particles-js", {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "star" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 120, color: "#ffffff", opacity: 0.3, width: 1 },
                move: { speed: 4, direction: "none", random: true, out_mode: "out" }
            },
            interactivity: {
                events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true }
            },
            retina_detect: true
        });
    }

    // Leaflet Map
    const mapElement = document.getElementById("map");
    if (mapElement && typeof L !== "undefined") {
        const map = L.map("map").setView([41.2788, -72.5276], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        L.marker([41.2788, -72.5276])
            .addTo(map)
            .bindPopup("sysfx HQ - <a href='#contact'>Contact Us</a>")
            .on("click", () => playSound("click"));
    }

    // Gallery Lightbox
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.querySelector(".lightbox");
    const lightboxImg = lightbox?.querySelector("img");
    const lightboxClose = lightbox?.querySelector(".lightbox-close");

    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            lightboxImg.src = item.getAttribute("data-src");
            lightbox.style.display = "flex";
            playSound("click");
        });
    });
    lightboxClose?.addEventListener("click", () => {
        lightbox.style.display = "none";
        playSound("click");
    });
    lightbox?.addEventListener("click", e => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
            playSound("click");
        }
    });

    // Custom Cursor
    const cursor = document.querySelector(".cursor");
    if (cursor && window.innerWidth > 768) {
        document.addEventListener("mousemove", e => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            cursor.classList.add("trail");
            setTimeout(() => cursor.classList.remove("trail"), 100);
        });
    } else if (cursor) {
        cursor.style.display = "none";
    }

    // Scroll Progress
    const scrollProgress = document.querySelector(".scroll-progress");
    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };
    window.addEventListener("scroll", debounce(() => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
        scrollProgress.style.width = `${scrollPercent}%`;
    }, 10));

    // GSAP Animations
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
        document.querySelectorAll(".parallax").forEach(section => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        });

        // Stats Animation
        document.querySelectorAll(".stat-number").forEach(stat => {
            const target = parseInt(stat.getAttribute("data-count"));
            gsap.fromTo(stat, { textContent: 0 }, {
                textContent: target,
                duration: 2,
                snap: { textContent: 1 },
                ease: "power1.out",
                scrollTrigger: {
                    trigger: stat,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        });
    }

    // Contact Form Validation
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", e => {
            e.preventDefault();
            const name = contactForm.querySelector("#name").value.trim();
            const email = contactForm.querySelector("#email").value.trim();
            const message = contactForm.querySelector("#message").value.trim();

            if (!name || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || !message) {
                alert("Please fill out all fields correctly.");
                playSound("error");
                return;
            }

            window.location.href = `mailto:${emailConfig.getEmail()}?subject=Contact from ${name}&body=${encodeURIComponent(message)}`;
            contactForm.reset();
            playSound("click");
        });
    }

    // FAQ Accordion Accessibility
    document.querySelectorAll(".faq-grid details").forEach(detail => {
        detail.addEventListener("toggle", () => {
            detail.setAttribute("aria-expanded", detail.open);
            playSound("click");
        });
    });

    // Audio Feedback
    let audioContext;
    const playSound = (type, volume = 0.5) => {
        if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.type = "sine";
        oscillator.frequency.value = type === "click" ? 440 : type === "hover" ? 330 : 200;
        gainNode.gain.value = volume;
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.start();
        setTimeout(() => oscillator.stop(), 100);
    };
});
