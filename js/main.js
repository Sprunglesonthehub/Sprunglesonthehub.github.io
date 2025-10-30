document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Switcher ---
    const themeSwitcher = document.querySelector('.theme-switcher');
    const body = document.querySelector('body');
    const themeButtons = themeSwitcher.querySelectorAll('button');

    const setTheme = (theme) => {
        body.className = theme;
        localStorage.setItem('theme', theme);
        themeButtons.forEach(button => {
            if (button.dataset.theme === theme) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    };

    themeSwitcher.addEventListener('click', (e) => {
        const theme = e.target.dataset.theme;
        if (theme) {
            setTheme(theme);
        }
    });

    const savedTheme = localStorage.getItem('theme') || 'dark-mode';

    // --- Accomplishments pane behavior (left slide-in) ---
    document.addEventListener('DOMContentLoaded', () => {
        const accBtn = document.getElementById('accomplishments-btn');
        const accPane = document.getElementById('accomplishments-pane');
        if (accBtn && accPane) {
            const accClose = accPane.querySelector('.close-pane-btn');
            accBtn.addEventListener('click', (e) => {
                e.preventDefault();
                accPane.classList.add('open');
            });

            accClose.addEventListener('click', () => {
                accPane.classList.remove('open');
            });

            document.addEventListener('click', (e) => {
                if (!accPane.contains(e.target) && !accBtn.contains(e.target) && accPane.classList.contains('open')) {
                    accPane.classList.remove('open');
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && accPane.classList.contains('open')) {
                    accPane.classList.remove('open');
                }
            });
        }
    });
    setTheme(savedTheme);

    // --- Typewriter Effect ---
    const subtitleEl = document.getElementById('hero-subtitle');
    if (subtitleEl) {
        const text = "Digital Artisan & FOSS Advocate";
        let i = 0;
        subtitleEl.innerHTML = '';
        function type() {
            if (i < text.length) {
                subtitleEl.innerHTML += text.charAt(i++);
                setTimeout(type, 120);
            }
        }
        type();
    }

    // --- Bouncy Scroll Animations ---
    const scrollElements = document.querySelectorAll(".animate-on-scroll");
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };
    const displayScrollElement = (element) => { element.classList.add("is-visible"); };
    const handleScrollAnimation = () => {
        let delay = 0;
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.1)) {
                if (!el.style.animationDelay && !el.classList.contains('is-visible')) {
                   el.style.animationDelay = `${delay}s`;
                   delay += 0.05;
                }
                displayScrollElement(el);
            }
        });
    }
    handleScrollAnimation();
    window.addEventListener("scroll", handleScrollAnimation);

    // --- Side Pane Functionality ---
    const moreAboutMeBtn = document.getElementById('more-about-me-btn');
    const sidePane = document.getElementById('more-about-me-pane');
    const closePaneBtn = sidePane.querySelector('.close-pane-btn');

    if (moreAboutMeBtn && sidePane && closePaneBtn) {
        moreAboutMeBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            sidePane.classList.add('open');
        });

        closePaneBtn.addEventListener('click', () => {
            sidePane.classList.remove('open');
        });

        // Close pane when clicking outside of it
        document.addEventListener('click', (e) => {
            if (!sidePane.contains(e.target) && !moreAboutMeBtn.contains(e.target) && sidePane.classList.contains('open')) {
                sidePane.classList.remove('open');
            }
        });

        // Close pane on escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidePane.classList.contains('open')) {
                sidePane.classList.remove('open');
            }
        });
    }
});

// Open pane if there's a hash in the URL (so links like index.html#accomplishments work from other pages)
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash;
    if (!hash) return;
    if (hash === '#accomplishments') {
        const p = document.getElementById('accomplishments-pane');
        if (p) p.classList.add('open');
    }
    if (hash === '#more-about-me') {
        const p = document.getElementById('more-about-me-pane');
        if (p) p.classList.add('open');
    }
});

// --- Background music autoplay handling ---
document.addEventListener('DOMContentLoaded', () => {
    const bg = document.getElementById('background-music');
    if (!bg) return;

    // Ensure playsinline when possible (helps mobile playback)
    try { bg.setAttribute('playsinline', ''); } catch (e) {}

    const tryPlay = () => {
        const playPromise = bg.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay was blocked. Show an unobtrusive enable button.
                if (!document.getElementById('enable-audio-btn')) {
                    const btn = document.createElement('button');
                    btn.id = 'enable-audio-btn';
                    btn.className = 'btn';
                    btn.textContent = 'Enable audio';
                    Object.assign(btn.style, {
                        position: 'fixed',
                        right: '20px',
                        bottom: '20px',
                        zIndex: 9999,
                        opacity: 0.95
                    });
                    btn.addEventListener('click', async () => {
                        try {
                            await bg.play();
                            btn.remove();
                        } catch (err) {
                            // still blocked or failed — keep the button
                            console.warn('Audio play failed after user gesture', err);
                        }
                    });
                    document.body.appendChild(btn);
                }
            });
        }
    };

    // Try immediately and also on first user interaction
    tryPlay();
    ['click', 'keydown', 'touchstart'].forEach(evt => {
        window.addEventListener(evt, tryPlay, { once: true, passive: true });
    });
});