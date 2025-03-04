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

    // Typing effect with GSAP
    const typingElement = document.getElementById("typing-effect");
    if (typingElement) {
        const phrases = [
            "Providing next-gen tech solutions.",
            "Empowering your digital future.",
            "Precision tech expertise.",
            "Your IT partner in Clinton, CT.",
            "Innovating for business success.",
            "Securing your tech, 24/7.",
            "Building the web of tomorrow."
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
                                setTimeout(typePhrase, 1500);
                            }
                        });
                    }, 1500);
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
                shape: { type: "polygon", polygon: { nb_sides: 6 } },
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
            dragging: !L.Browser.mobile,
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
    setInterval(showTestimonial, 4000);

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
            y: -15,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: stat.closest(".stat-item"),
                start: "top 85%",
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
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // Parallax effect for testimonials
    const testimonialItems = document.querySelectorAll(".testimonial");
    testimonialItems.forEach(testimonial => {
        gsap.to(testimonial, {
            y: -15,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: testimonial,
                start: "top 85%",
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

    // Audio feedback with mute control
    let audioContext;
    let isMuted = false; // Global mute state

    function playSound(type, volume = 0.5) {
        if (isMuted) return;
        if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.value = type === 'click' ? 440 : type === 'hover' ? 330 : type === 'error' ? 200 : type === 'beep' ? 880 : 350; // Added 'beep'
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
        if (audioContext && audioContext.state === "suspended" && !isMuted) audioContext.resume();
    }, { once: true });

    // Music toggle with mute control
    const musicToggle = document.getElementById("music-toggle");
    const welcomeMusic = document.getElementById("welcome-music");
    if (musicToggle && welcomeMusic) {
        welcomeMusic.volume = 0.5;
        let isPlaying = false;

        musicToggle.addEventListener("click", () => {
            if (isPlaying) {
                welcomeMusic.pause();
                isMuted = true;
                musicToggle.classList.add("muted");
            } else {
                welcomeMusic.play().catch(() => console.log("Music playback blocked until user interaction"));
                isMuted = false;
                musicToggle.classList.remove("muted");
            }
            isPlaying = !isPlaying;
            playSound('click');
        });

        document.addEventListener("click", () => {
            if (!isPlaying && !isMuted) {
                welcomeMusic.play().catch(() => {});
                isPlaying = true;
                musicToggle.classList.remove("muted");
            }
        }, { once: true });
    }

    // Tech tip with close button
    const techTips = [
        "Tech Tip: Regular updates keep your systems secure!",
        "Tech Tip: Back up your data weekly to avoid loss.",
        "Tech Tip: Use strong passwords for better protection.",
        "Tech Tip: Restarting can fix many tech glitches.",
        "Tech Tip: Clear cache to boost browser speed.",
        "Tech Tip: Keep software patched against vulnerabilities.",
        "Tech Tip: Monitor your network for unusual activity."
    ];
    let tipIndex = 0;
    const techTipText = document.getElementById("tech-tip-text");
    const closeTechTip = document.getElementById("close-tech-tip");
    const stickyNote = document.querySelector(".sticky-note");

    if (techTipText && stickyNote) {
        techTipText.textContent = techTips[tipIndex];
        gsap.fromTo(".sticky-note", 
            { opacity: 0, y: -50, rotation: -5 },
            { opacity: 1, y: 0, rotation: 0, duration: 1, delay: 2, ease: "elastic.out(1, 0.5)" }
        );

        setInterval(() => {
            if (stickyNote.style.display !== "none") {
                tipIndex = (tipIndex + 1) % techTips.length;
                gsap.to(".sticky-note", {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        techTipText.textContent = techTips[tipIndex];
                        gsap.to(".sticky-note", { opacity: 1, duration: 0.5 });
                    }
                });
            }
        }, 5000);

        if (closeTechTip) {
            closeTechTip.addEventListener("click", () => {
                gsap.to(".sticky-note", {
                    opacity: 0,
                    y: -50,
                    duration: 0.5,
                    onComplete: () => stickyNote.style.display = "none"
                });
                playSound('click');
            });
        }
    }

    // New Feature 1: Chat Bubble Toggle
    const chatBubble = document.getElementById("chat-bubble");
    if (chatBubble) {
        setTimeout(() => chatBubble.classList.add("visible"), 3000); // Show after 3s
        chatBubble.addEventListener("click", () => {
            alert("Chat feature coming soon! Contact us at nick@sysfx.net for now.");
            playSound('beep');
        });
    }

    // New Feature 2: Scroll-to-Top Button
    const scrollTopBtn = document.querySelector(".scroll-top-btn");
    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add("visible");
            } else {
                scrollTopBtn.classList.remove("visible");
            }
        });

        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            playSound('click');
        });
    }

    // New Feature 3: Random Service Highlight
    const serviceGrid = document.querySelector(".service-grid");
    if (serviceGrid) {
        const services = serviceGrid.querySelectorAll(".service");
        setInterval(() => {
            const randomIndex = Math.floor(Math.random() * services.length);
            services.forEach((s, i) => {
                s.style.border = i === randomIndex ? "2px solid var(--highlight-color)" : "none";
            });
        }, 10000); // Highlight a random service every 10s
    }

    // New Feature 4: Floating Service Icon
    const floatingIcon = document.createElement("div");
    floatingIcon.className = "floating-icon";
    floatingIcon.innerHTML = '<i class="fas fa-cogs"></i>';
    document.body.appendChild(floatingIcon);
    gsap.to(".floating-icon", {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // New Feature 5: Dynamic Background Tint
    const tintOverlay = document.createElement("div");
    tintOverlay.className = "tint-overlay";
    document.body.appendChild(tintOverlay);
    setInterval(() => {
        const hue = Math.random() * 360;
        tintOverlay.style.background = `hsl(${hue}, 20%, 50%, 0.1)`;
    }, 15000); // Change tint every 15s
});

// Inject styles for new features
const style = document.createElement("style");
style.textContent = `
    .floating-icon {
        position: fixed;
        bottom: 140px;
        left: 20px;
        color: var(--primary-color);
        font-size: 2em;
        z-index: 998;
        opacity: 0.7;
    }
    .tint-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        transition: background 2s ease;
    }
    @media (max-width: 768px) {
        .floating-icon {
            bottom: 130px;
            left: 10px;
            font-size: 1.5em;
        }
    }
`;
document.head.appendChild(style);
