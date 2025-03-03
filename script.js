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

    // Set email link in sidebar
    const sidebarEmailLink = document.getElementById("sidebar-email-link");
    if (sidebarEmailLink) {
        sidebarEmailLink.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = `mailto:${emailConfig.getEmail()}`;
            playSound('click');
        });
    }

    // Enhanced typing effect with Typed.js (stabilized for navbar)
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
            loop: true,
            onComplete: (self) => {
                // Ensure header height remains stable
                const header = document.querySelector("header");
                if (header) {
                    header.style.minHeight = "120px"; // Match styles.css for consistency
                }
            }
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
            playSound('click');
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
                    top: targetElement.offsetTop - 80, // Adjust for smaller header
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
            clockElement.innerHTML = `<i class="fas fa-clock" aria-hidden="true"></i> ${now.toLocaleTimeString()}`;
        }
    }
    updateClock();
    setInterval(updateClock, 1000);

    // Weather widget with OpenWeatherMap API
    const weatherText = document.getElementById("weather-text");
    const localWeatherBtn = document.getElementById("local-weather-btn");
    const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your OpenWeatherMap API key

    function updateWeather(lat = 41.2788, lon = -72.5276) { // Default to Clinton, CT
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                weatherText.innerHTML = `<i class="fas fa-cloud-sun" aria-hidden="true"></i> ${Math.round(data.main.temp)}°F in ${data.name}`;
            })
            .catch(() => {
                weatherText.innerHTML = "Weather unavailable";
            });
    }
    updateWeather(); // Initial load with Clinton, CT

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

    // Particles.js with star-like effects and trails
    if (document.getElementById("particles-js")) {
        particlesJS("particles-js", {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "star" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { 
                    enable: true, 
                    distance: 150, 
                    color: "#ffffff", 
                    opacity: 0.4, 
                    width: 1 
                },
                move: { 
                    enable: true, 
                    speed: 6, 
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
                    onhover: { enable: true, mode: "grab", parallax: { enable: true, force: 60 } },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    // Interactive Leaflet map
    const mapElement = document.getElementById("map");
    if (mapElement && typeof L !== "undefined") {
        const map = L.map("map").setView([41.2788, -72.5276], 13); // Clinton, CT
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        L.marker([41.2788, -72.5276]).addTo(map)
            .bindPopup("sysfx - 123 Main Street, Clinton, CT")
            .openPopup();
    }

    // Testimonial carousel
    const testimonials = document.querySelectorAll(".testimonial");
    let currentTestimonial = 0;
    function showTestimonial() {
        testimonials.forEach((t, i) => {
            t.style.opacity = i === currentTestimonial ? "1" : "0";
            t.style.transform = i === currentTestimonial ? "rotateY(0deg)" : "rotateY(-180deg)";
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

    // Custom cursor effect with trail
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

    // Service modals with sound
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
    const sections = document.querySelectorAll(".section-animation");
    sections.forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Parallax effect for sections
    const parallaxSections = document.querySelectorAll(".parallax");
    parallaxSections.forEach(section => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
                    entry.target.classList.remove("visible");
                }
            });
        }, { threshold: 0.1 });
        observer.observe(section);
    });

    // 3D rotation effect on service cards
    services.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const tiltX = (y - centerY) / 20;
            const tiltY = -(x - centerX) / 20;
            card.style.transform = `perspective(1000px) rotateY(${tiltY}deg) rotateX(${tiltX}deg) translateZ(20px)`;
            playSound('hover');
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
        });
    });

    // Chatbot toggle and basic functionality with sound
    const chatbotBtn = document.querySelector(".chatbot-btn");
    const chatbotWindow = document.querySelector(".chatbot-window");
    const chatbotInput = document.querySelector(".chatbot-input");
    const chatbotMessages = document.querySelector(".chatbot-messages");

    if (chatbotBtn && chatbotWindow) {
        chatbotBtn.addEventListener("click", () => {
            chatbotWindow.style.display = chatbotWindow.style.display === "block" ? "none" : "block";
            playSound('click');
        });

        chatbotInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter" && chatbotInput.value.trim()) {
                const userMessage = document.createElement("p");
                userMessage.textContent = `You: ${chatbotInput.value}`;
                chatbotMessages.appendChild(userMessage);
                playSound('type');

                // Simple bot response
                const botMessage = document.createElement("p");
                botMessage.textContent = "Bot: Thanks for your message! How can I assist you further?";
                setTimeout(() => {
                    chatbotMessages.appendChild(botMessage);
                    playSound('response');
                }, 500);

                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
                chatbotInput.value = "";
            }
        });
    }

    // Video background fallback
    const heroVideo = document.querySelector(".hero-video");
    if (heroVideo) {
        heroVideo.addEventListener("error", () => {
            heroVideo.style.display = "none"; // Fallback to gradient if video fails
            playSound('error');
        });
    }

    // Gallery lightbox with sound and hover effects
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.querySelector(".lightbox");
    const lightboxImg = lightbox.querySelector("img");
    const lightboxClose = lightbox.querySelector(".lightbox-close");

    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            const src = item.getAttribute("data-src");
            lightboxImg.src = src;
            lightbox.style.display = "flex";
            playSound('click');
        });

        item.addEventListener("mouseover", () => {
            item.style.transform = "scale(1.1) rotate(5deg)";
            playSound('hover', 0.3);
        });

        item.addEventListener("mouseout", () => {
            item.style.transform = "scale(1)";
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener("click", () => {
            lightbox.style.display = "none";
            playSound('click');
        });
    }

    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = "none";
                playSound('click');
            }
        });
    }

    // Scroll progress bar (no sound)
    const scrollProgress = document.querySelector(".scroll-progress");
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = `${scrollPercent}%`;
    });

    // Skill bar animations
    const skillBars = document.querySelectorAll(".skill-bar-fill");
    skillBars.forEach(bar => {
        const percent = bar.getAttribute("data-percent");
        bar.style.setProperty('--percent', `${percent}%`);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });
        observer.observe(bar);
    });

    // Audio feedback (excluding scroll)
    function playSound(type, volume = 0.5) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.value = type === 'click' ? 440 : type === 'hover' ? 330 : type === 'type' ? 250 : type === 'response' ? 350 : 200;
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

    // Prevent audio context suspension on mobile
    document.addEventListener("click", () => {
        if (typeof AudioContext !== "undefined" && !audioContext) {
            audioContext.resume();
        }
    }, { once: true });
});
