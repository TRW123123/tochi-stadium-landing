// Make function globally accessible immediately
window.goToTestimonial = function (index) {
    // Will be overwritten or handled inside DOMContentLoaded
    console.log("Testimonial function called before load");
};

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");

    // Initialize Lenis for smooth scrolling
    try {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    } catch (e) {
        console.warn("Lenis init failed:", e);
    }

    // Register GSAP ScrollTrigger
    try {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Animation
        const heroTimeline = gsap.timeline();

        heroTimeline.to("#hero-bg", {
            scrollTrigger: {
                trigger: "header",
                start: "top top",
                end: "bottom top",
                scrub: true
            },
            y: "30%", // Parallax effect
            scale: 1.15, // Slow zoom
            ease: "none"
        });

        heroTimeline.to(".hero-title", {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            onStart: () => {
                const title = document.querySelector(".hero-title");
                if (title) title.classList.add("glitch-effect");
            }
        }, 0.2);

        heroTimeline.to(".hero-subtitle", {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out"
        }, 0.5);

        // Section Headings Animation
        document.querySelectorAll(".section-title").forEach(title => {
            gsap.fromTo(title,
                { opacity: 0, scale: 0.94 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: title,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                        onEnter: () => {
                            title.classList.add("glitch-effect");
                            setTimeout(() => title.classList.remove("glitch-effect"), 500);
                        }
                    }
                }
            );
        });

        // Product Cards Animation
        gsap.utils.toArray(".product-card").forEach((card, i) => {
            gsap.fromTo(card,
                { opacity: 0, scale: 0.96, y: 50 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.8,
                    delay: i * 0.1, // Stagger
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Benefits Animation
        gsap.utils.toArray(".benefit-item").forEach((item, i) => {
            gsap.fromTo(item,
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Case Studies Parallax
        document.querySelectorAll(".case-study").forEach(study => {
            gsap.from(study, {
                opacity: 0,
                y: 100,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: study,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // CTA Button Pulse
        gsap.to("#cta-btn", {
            scale: 1.05,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Animated Statistics Counter
        document.querySelectorAll('[data-countup]').forEach(element => {
            const target = parseInt(element.getAttribute('data-countup'));
            let hasAnimated = false;

            ScrollTrigger.create({
                trigger: element,
                start: 'top 80%',
                onEnter: () => {
                    if (!hasAnimated) {
                        hasAnimated = true;

                        // Animate the number counting up
                        gsap.to(element, {
                            innerHTML: target,
                            duration: 2,
                            ease: 'power1.out',
                            snap: { innerHTML: 1 },
                            onUpdate: function () {
                                element.innerHTML = Math.ceil(element.innerHTML) + '+';
                            },
                            onComplete: function () {
                                element.innerHTML = target + '+';
                            }
                        });
                    }
                }
            });
        });

    } catch (e) {
        console.error("GSAP init failed:", e);
        // Fallback: Make everything visible
        document.querySelectorAll('.product-card, .section-title, .benefit-item, .case-study').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

    // Failsafe: Ensure cards are visible after 2s if ScrollTrigger doesn't fire
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach(card => {
            if (getComputedStyle(card).opacity === '0') {
                card.style.opacity = '1';
                card.style.transform = 'none';
            }
        });
    }, 2000);

    // Testimonial Slider
    const testimonialTrack = document.getElementById('testimonial-track');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const totalTestimonials = 3;
    let currentTestimonial = 0;

    window.goToTestimonial = function (index) {
        currentTestimonial = index;
        if (testimonialTrack) {
            testimonialTrack.style.transform = `translateX(-${index * 100}%)`;

            // Update dots
            testimonialDots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.remove('bg-white/20');
                    dot.classList.add('bg-erpa-red');
                } else {
                    dot.classList.remove('bg-erpa-red');
                    dot.classList.add('bg-white/20');
                }
            });
        }
    };

    // Auto-rotate every 5 seconds
    if (testimonialTrack) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
            window.goToTestimonial(currentTestimonial);
        }, 5000);
    }

    // World Map Initialization
    try {
        if (document.getElementById('world-map') && typeof L !== 'undefined') {
            const map = L.map('world-map', {
                center: [35, 25], // Centered on Mediterranean
                zoom: 3,
                scrollWheelZoom: false,
                zoomControl: false,
                attributionControl: false
            });

            // Dark theme tiles (CartoDB Dark Matter)
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 19
            }).addTo(map);

            // Custom Icon
            const erpaIcon = L.divIcon({
                className: 'custom-div-icon',
                html: "<div style='background-color: #E31E24; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px #E31E24;'></div>",
                iconSize: [12, 12],
                iconAnchor: [6, 6]
            });

            // Locations
            const locations = [
                { name: "Istanbul HQ", coords: [41.0082, 28.9784] },
                { name: "Benghazi Stadium", coords: [32.1166, 20.0667] },
                { name: "Berlin Office", coords: [52.5200, 13.4050] },
                { name: "Dubai Partner", coords: [25.2048, 55.2708] },
                { name: "London Hub", coords: [51.5074, -0.1278] }
            ];

            locations.forEach(loc => {
                L.marker(loc.coords, { icon: erpaIcon })
                    .addTo(map)
                    .bindPopup(`<b style="color: #0A1930">${loc.name}</b>`);
            });
        }
    } catch (e) {
        console.warn("Leaflet map init failed:", e);
    }

    // Easter Egg: "stadyum"
    let keySequence = [];
    const secretCode = "stadyum";

    document.addEventListener("keydown", (e) => {
        keySequence.push(e.key.toLowerCase());
        if (keySequence.length > secretCode.length) {
            keySequence.shift();
        }

        if (keySequence.join("") === secretCode) {
            triggerEasterEgg();
        }
    });

    function triggerEasterEgg() {
        const container = document.getElementById("easter-egg-container");
        const text = document.getElementById("easter-egg-text");

        if (!container || !text) return;

        container.classList.remove("hidden");

        // Confetti
        if (typeof confetti !== 'undefined') {
            var duration = 10 * 1000;
            var animationEnd = Date.now() + duration;
            var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            var interval = setInterval(function () {
                var timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                var particleCount = 50 * (timeLeft / duration);
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);
        }

        // Text Animation
        gsap.to(text, {
            opacity: 1,
            scale: 1.5,
            duration: 0.5,
            yoyo: true,
            repeat: 5,
            onComplete: () => {
                gsap.to(text, { opacity: 0, duration: 0.5 });
                setTimeout(() => {
                    container.classList.add("hidden");
                }, 1000);
            }
        });
    }
});
