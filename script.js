// Initialize Lenis for smooth scrolling
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

// Register GSAP ScrollTrigger
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
        document.querySelector(".hero-title").classList.add("glitch-effect");
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

// Failsafe: Ensure cards are visible after 2s if ScrollTrigger doesn't fire
setTimeout(() => {
    document.querySelectorAll('.product-card').forEach(card => {
        if (getComputedStyle(card).opacity === '0') {
            gsap.to(card, { opacity: 1, scale: 1, y: 0, duration: 0.8 });
        }
    });
}, 2000);

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

    container.classList.remove("hidden");

    // Confetti
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
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

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
    touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Register GSAP ScrollTrigger
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
            document.querySelector(".hero-title").classList.add("glitch-effect");
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

    // Failsafe: Ensure cards are visible after 2s if ScrollTrigger doesn't fire
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach(card => {
            if (getComputedStyle(card).opacity === '0') {
                gsap.to(card, { opacity: 1, scale: 1, y: 0, duration: 0.8 });
            }
        });
    }, 2000);

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

        container.classList.remove("hidden");

        // Confetti
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
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);

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

    // Testimonial Slider
    let currentTestimonial = 0;
    let testimonialTrack;
    let testimonialDots;
    const totalTestimonials = 3;

    // Make function global so onclick handlers can access it
    window.goToTestimonial = function (index) {
        currentTestimonial = index;
        if (testimonialTrack) {
            testimonialTrack.style.transform = `translateX(-${index * 100}%)`;

            // Update dots
            testimonialDots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.remove('bg-white/20');
                    dot.classList.add('bg-tochi-orange');
                } else {
                    dot.classList.remove('bg-tochi-orange');
                    dot.classList.add('bg-white/20');
                }
            });
        }
    }

    // Initialize after DOM is loaded
    document.addEventListener('DOMContentLoaded', function () {
        testimonialTrack = document.getElementById('testimonial-track');
        testimonialDots = document.querySelectorAll('.testimonial-dot');

        // Auto-rotate every 5 seconds
        if (testimonialTrack) {
            setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
                window.goToTestimonial(currentTestimonial);
            }, 5000);
        }
    });
