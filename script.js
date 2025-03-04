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
            playSound('click');
        });
    }

    // Typing effect with GSAP (replacing Typed.js for stability)
    const typingElement = document.getElementById("typing-effect");
    if (typingElement) {
        const phrases = [
            "Providing next-gen tech solutions.",
            "Empowering your digital future.",
            "Precision tech expertise."
        ];
        let currentPhrase = 0;

        function typePhrase() {
            const text = phrases[currentPhrase];
            gsap.to(typingElement, {
                text: { value: text, delimiter: "" },
                duration: text.length * 0.05,
                ease: "none",
                onComplete: () => {
                    setTimeout(() => {
                        gsap.to(typingElement, {
                            text: { value: "", delimiter: "" },
                            duration: text.length * 0.03,
                            ease: "none",
                            onComplete: () => {
                                currentPhrase = (currentPhrase + 1) % phrases.length;
                                setTimeout(typePhrase, 2000);
                            }
                        });
                    }, 2000);
                }
            });
        }
        typePhrase(); // Start the animation
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
            playSound('click');
            updateParticles();
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
                    top: targetElement.offsetTop - 80,
                    behavior: "smooth"
                });
            }
            playSound('click');
        });
    });

    // Real-time clock
    function updateClock() {
        const clockElement = document.getElementById("current-time");
        if (clockElement) {
            const now = new Date();
            clockElement.innerHTML = `<i class="fas fa-clock" aria-hidden="true"></i> ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
        }
    }
    updateClock();
    setInterval(updateClock, 1000);

    // Weather widget with OpenWeatherMap API
    const weatherText = document.getElementById("weather-text");
    const localWeatherBtn = document.getElementById("local-weather-btn");
    const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your OpenWeatherMap API key

    function updateWeather(lat = 41.2788, lon = -72.5276) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
            .then(response => response.ok ? response.json() : Promise.reject())
            .then(data => {
                weatherText.innerHTML = `<i class="fas fa-cloud-sun" aria-hidden="true"></i> ${Math.round(data.main.temp)}°F in ${data.name}`;
            })
            .catch(() => {
                weatherText.innerHTML = "Weather unavailable";
            });
    }
    updateWeather();

    if (localWeatherBtn) {
        localWeatherBtn.addEventListener("click", () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        updateWeather(latitude, longitude);
                    },
                    () => {
                        weatherText.innerHTML = "Location access denied";
                    }
                );
            } else {
                weatherText.innerHTML = "Geolocation not supported";
            }
            playSound('click');
        });
    }

    // Particles.js with dynamic dark mode update
    function updateParticles() {
        const isDarkMode = body.classList.contains("dark-mode");
        particlesJS("particles-js", {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: isDarkMode ? "#ffffff" : "#00a000" },
                shape: { type: "polygon", polygon: { nb_sides: 6 } }, // Hexagons for uniqueness
                opacity: { value: isDarkMode ? 0.8 : 0.3, random: true },
                size: { value: 4, random: true },
                line_linked: { 
                    enable: true, 
                    distance: 120, 
                    color: isDarkMode ? "#ffffff" : "#00a000",
                    opacity: 0.4, 
                    width: 1 
                },
                move: { 
                    enable: true, 
                    speed: 4, 
                    direction: "none", 
                    random: true, 
                    straight: false, 
                    out_mode: "out", 
                    bounce: false,
                    attract: { enable: true, rotateX: 600, rotateY: 1200 }
                }
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
    updateParticles();

    // Interactive Leaflet map
    const mapElement = document.getElementById("map");
    if (mapElement && typeof L !== "undefined") {
        const map = L.map("map", { 
            scrollWheelZoom: false, 
            dragging: !L.Browser.mobile, // Disable drag on mobile
            touchZoom: false 
        }).setView([41.2788, -72.5276], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const markers = [
            { lat: 41.2788, lon: -72.5276, popup: "sysfx HQ - Click for Contact", url: "#contact" },
            { lat: 41.2800, lon: -72.5300, popup: "Service Center - Learn About Repairs", url: "#services" },
            { lat: 41.2776, lon: -72.5250, popup: "Support Office - Get IT Help", url: "#support" }
        ];

        markers.forEach(markerData => {
            L.marker([markerData.lat, markerData.lon]).addTo(map)
                .bindPopup(markerData.popup)
                .on('click', () => {
                    window.location.href = markerData.url;
                    playSound('click');
                });
        });
    }

    // Testimonial carousel
    const testimonials = document.querySelectorAll(".testimonial");
    let currentTestimonial = 0;
    function showTestimonial() {
        testimonials.forEach((t, i) => {
            t.style.opacity = i === currentTestimonial ? "1" : "0";
            t.style.transform = i === currentTestimonial ? "scale(1)" : "scale(0.95)";
            t.style.position = i === currentTestimonial ? "relative" : "absolute";
        });
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    }
    showTestimonial();
    setInterval(showTestimonial, 5000);

    // Animated stats counters with parallax
    const statNumbers = document.querySelectorAll(".stat-number");
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute("data-count"));
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                gsap.to(stat, {
                    textContent: target,
                    duration: 2,
                    roundProps: "textContent",
                    ease: "power1.out",
                    onComplete: () => stat.textContent = target
                });
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        observer.observe(stat);

        gsap.to(stat.closest(".stat-item"), {
            y: -20,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: stat.closest(".stat-item"),
                start: "top 80%",
                end: "bottom 20%",
                scrub: true
            }
        });
    });

    // Custom cursor effect with trail
    const cursor = document.querySelector(".cursor");
    if (cursor) {
        let lastX = 0, lastY = 0;
        let trailTimeout;
        function updateCursor(e) {
            const x = e.clientX;
            const y = e.clientY;
            cursor.style.left = `${x}px`;
            cursor.style.top = `${y}px`;
            cursor.classList.add("trail");
            clearTimeout(trailTimeout);
            trailTimeout = setTimeout(() => cursor.classList.remove("trail"), 100);
            lastX = x;
            lastY = y;
        }
        document.addEventListener("mousemove", (e) => requestAnimationFrame(() => updateCursor(e)));
        if (window.innerWidth <= 768) cursor.style.display = "none";
    }

    // Service modals without hover sound
    const services = document.querySelectorAll(".service");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".modal-close");

    services.forEach(service => {
        service.addEventListener("click", () => {
            const modalId = service.getAttribute("data-modal") + "-modal";
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = "flex";
                playSound('click');
            }
        });

        service.addEventListener("mousemove", (e) => {
            const rect = service.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const tiltX = (y - centerY) / 20;
            const tiltY = -(x - centerX) / 20;
            service.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
        });

        service.addEventListener("mouseleave", () => {
            service.style.transform = "perspective(1000px) scale(1)";
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".modal").style.display = "none";
            playSound('click');
        });
    });

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal")) {
            e.target.style.display = "none";
            playSound('click');
        }
    });

    // Scroll animations with GSAP
    gsap.registerPlugin(ScrollTrigger);
    const sections = document.querySelectorAll(".parallax, .section-animation");
    sections.forEach(section => {
        gsap.fromTo(section, 
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // Parallax effect for testimonials
    const testimonialItems = document.querySelectorAll(".testimonial");
    testimonialItems.forEach(testimonial => {
        gsap.to(testimonial, {
            y: -20,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: testimonial,
                start: "top 80%",
                end: "bottom 20%",
                scrub: true
            }
        });
    });

    // Video background fallback
    const heroVideo = document.querySelector(".hero-video");
    if (heroVideo) {
        heroVideo.addEventListener("error", () => {
            heroVideo.style.display = "none";
            playSound('error');
        });
    }

    // Gallery lightbox with sound
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.querySelector(".lightbox");
    const lightboxImg = lightbox && lightbox.querySelector("img");
    const lightboxClose = lightbox && lightbox.querySelector(".lightbox-close");

    if (galleryItems.length && lightbox && lightboxImg && lightboxClose) {
        galleryItems.forEach(item => {
            item.addEventListener("click", () => {
                lightboxImg.src = item.getAttribute("data-src");
                lightbox.style.display = "flex";
                playSound('click');
            });

            item.addEventListener("mouseover", () => {
                item.style.transform = "scale(1.1)";
                playSound('hover', 0.3);
            });

            item.addEventListener("mouseout", () => {
                item.style.transform = "scale(1)";
            });
        });

        lightboxClose.addEventListener("click", () => {
            lightbox.style.display = "none";
            playSound('click');
        });

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = "none";
                playSound('click');
            }
        });
    }

    // Scroll progress bar
    const scrollProgress = document.querySelector(".scroll-progress");
    if (scrollProgress) {
        window.addEventListener("scroll", () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = `${scrollPercent}%`;
        });
    }

    // Audio feedback
    let audioContext;
    function playSound(type, volume = 0.5) {
        if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.value = type === 'click' ? 440 : type === 'hover' ? 330 : type === 'error' ? 200 : 350;
        gainNode.gain.value = volume;
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        setTimeout(() => {
            oscillator.stop();
            oscillator.disconnect();
            gainNode.disconnect();
        }, 100);
    }

    document.addEventListener("click", () => {
        if (audioContext && audioContext.state === "suspended") audioContext.resume();
    }, { once: true });

    // Unique sticky note effect
    const stickyNote = document.createElement("div");
    stickyNote.className = "sticky-note";
    stickyNote.innerHTML = "Tech Tip: Regular updates keep your systems secure!";
    document.body.appendChild(stickyNote);
    gsap.fromTo(".sticky-note", 
        { opacity: 0, y: -50, rotation: -5 },
        { opacity: 1, y: 10, rotation: 0, duration: 1, delay: 2, ease: "elastic.out(1, 0.5)" }
    );
});

// Sticky note styles (injected via JS for uniqueness)
const style = document.createElement("style");
style.textContent = `
    .sticky-note {
        position: fixed;
        top: 10px;
        right: 10px;
        background: #ffeb3b;
        padding: 10px 15px;
        border-radius: 5px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        font-size: 14px;
        color: #333;
        z-index: 1000;
        transform: rotate(-5deg);
    }
    @media (max-width: 768px) {
        .sticky-note {
            font-size: 12px;
            padding: 8px 12px;
            right: 5px;
        }
    }
`;
document.head.appendChild(style);
