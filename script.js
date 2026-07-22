document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll-Reveal Observer
    const revealItems = document.querySelectorAll('.reveal-item');
    
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        revealItems.forEach(item => {
            revealObserver.observe(item);
        });
    } else {
        revealItems.forEach(item => {
            item.classList.add('revealed');
        });
    }

    // 2. Mobile Navigation Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 3. Interactive 360-Degree Radial Complication Dial Switcher
    const dialTabs = document.querySelectorAll('.dial-tab-btn');
    const heroSection = document.querySelector('.hero-radial-section');
    const heroBadge = document.getElementById('heroBadge');
    const heroTitle = document.getElementById('heroTitle');
    const heroDesc = document.getElementById('heroDesc');
    const heroCallouts = document.getElementById('heroCallouts');

    const dialData = {
        tourbillon: {
            bg: "img/hero_tourbillon.jpg",
            badge: "COMPLICATION 01",
            title: "Skeleton Flying Tourbillon Escapement",
            desc: "A hand-finished 60-second rotating cage defying gravitational drag, rendered in 18k rose gold with 28,800 vph high-frequency regulation.",
            callouts: "<span>28,800 vph</span> Frequency &bull; <span>31 Rubies</span> Jewels &bull; <span>72 Hours</span> Reserve"
        },
        calendar: {
            bg: "img/hero_calendar.jpg",
            badge: "COMPLICATION 02",
            title: "Perpetual Calendar Moonphase",
            desc: "Astronomical calendar mechanism tracking month, day, leap year cycles, and photorealistic 122-year moonphase precision without manual adjustment.",
            callouts: "<span>122-Year</span> Moonphase &bull; <span>Leap Year</span> Memory &bull; <span>Rose Gold</span> Case"
        },
        chronograph: {
            bg: "img/hero_chronograph.jpg",
            badge: "COMPLICATION 03",
            title: "Monopusher Flyback Chronograph",
            desc: "Column-wheel chronograph mechanism enabling instantaneous reset and restart with a single tactile rose gold pusher actuation.",
            callouts: "<span>Column Wheel</span> System &bull; <span>Flyback</span> Instant Reset &bull; <span>100m</span> Waterproof"
        },
        sonnerie: {
            bg: "img/hero_sonnerie.jpg",
            badge: "COMPLICATION 04",
            title: "Grand Sonnerie Acoustic Chiming Watch",
            desc: "Chiming acoustic complication featuring dual steel gongs and hand-tuned hammers striking hours, quarters, and minutes upon command.",
            callouts: "<span>Dual Steel</span> Gongs &bull; <span>Acoustic</span> Chime &bull; <span>Hand Engraved</span> Dial"
        }
    };

    if (dialTabs.length > 0 && heroSection) {
        dialTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                dialTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const key = tab.getAttribute('data-dial');
                const data = dialData[key];

                if (data) {
                    heroSection.style.backgroundImage = `url('${data.bg}')`;
                    if (heroBadge) heroBadge.textContent = data.badge;
                    if (heroTitle) heroTitle.textContent = data.title;
                    if (heroDesc) heroDesc.textContent = data.desc;
                    if (heroCallouts) heroCallouts.innerHTML = data.callouts;
                }
            });
        });
    }

    // 4. Interactive Accordion FAQ
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    const isOpen = item.classList.contains('active');
                    
                    faqItems.forEach(otherItem => otherItem.classList.remove('active'));
                    
                    if (!isOpen) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // 5. Cookie Consent Notice (Safeguarded with try-catch)
    const cookieBanner = document.getElementById('cookieConsentBanner');
    const acceptBtn = document.getElementById('acceptCookiesBtn');
    const rejectBtn = document.getElementById('rejectCookiesBtn');

    if (cookieBanner && acceptBtn && rejectBtn) {
        let consent = null;
        try {
            consent = localStorage.getItem('cookieConsent');
        } catch (e) {
            console.warn('localStorage is not accessible in this environment.');
        }
        
        if (consent === null) {
            setTimeout(() => {
                cookieBanner.style.display = 'block';
                cookieBanner.offsetHeight; // force reflow
                cookieBanner.classList.add('show');
            }, 1200);
        }

        acceptBtn.addEventListener('click', () => {
            try {
                localStorage.setItem('cookieConsent', 'accepted');
            } catch (e) {
                console.warn('Unable to write to localStorage.');
            }
            cookieBanner.classList.remove('show');
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 600);
        });

        rejectBtn.addEventListener('click', () => {
            try {
                localStorage.setItem('cookieConsent', 'rejected');
            } catch (e) {
                console.warn('Unable to write to localStorage.');
            }
            cookieBanner.classList.remove('show');
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 600);
        });
    }
});
