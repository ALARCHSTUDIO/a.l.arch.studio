// Wait for the document to be ready
document.addEventListener('DOMContentLoaded', function () {
    // Loader
    setTimeout(function () {
        const loader = document.querySelector('.loader-container');
        loader.style.opacity = '0';
        setTimeout(function () {
            loader.style.display = 'none';
        }, 500);
    }, 1500);

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', function (e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        setTimeout(function () {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    document.addEventListener('mousedown', function () {
        cursor.style.width = '25px';
        cursor.style.height = '25px';
        cursorFollower.style.width = '6px';
        cursorFollower.style.height = '6px';
    });

    document.addEventListener('mouseup', function () {
        cursor.style.width = '30px';
        cursor.style.height = '30px';
        cursorFollower.style.width = '8px';
        cursorFollower.style.height = '8px';
    });

    // Hovering effect on links and buttons
    const hoverElements = document.querySelectorAll('a, button, .nav-dot, .service-card');

    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function () {
            cursor.style.width = '50px';
            cursor.style.height = '50px';
            cursor.style.borderColor = '#c8a45d';
            cursorFollower.style.width = '1px';
            cursorFollower.style.height = '1px';
            cursorFollower.style.opacity = '0';
        });

        element.addEventListener('mouseleave', function () {
            cursor.style.width = '30px';
            cursor.style.height = '30px';
            cursor.style.borderColor = '#c8a45d';
            cursorFollower.style.width = '8px';
            cursorFollower.style.height = '8px';
            cursorFollower.style.opacity = '1';
        });
    });

    // Scroll reveal animations
    function revealOnScroll() {
        const elements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .about-text, .about-img, .service-card, .contact-info, .contact-form-container');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Carousel for about section
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % totalSlides;
        slides[currentSlide].classList.add('active');
    }

    // Change slide every 4 seconds
    setInterval(nextSlide, 4000);

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navigation dots functionality
    const sections = document.querySelectorAll('section');
    const navDots = document.querySelectorAll('.nav-dot');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === current) {
                dot.classList.add('active');
            }
        });
    });

    navDots.forEach(dot => {
        dot.addEventListener('click', function () {
            const targetSection = this.getAttribute('data-section');
            document.querySelector(`#${targetSection}`).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Particles.js for hero section
    if (typeof particlesJS !== 'undefined') {
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
                    value: '#c8a45d'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#c8a45d',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {

            // Show success animation (for demonstration)
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'MESSAGGIO INVIATO!';
            submitBtn.style.backgroundColor = '#28a745';

            setTimeout(function () {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '#c8a45d';
                contactForm.reset();
            }, 3000);
        });
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;
        const heroContent = document.querySelector('.hero-content');
        const heroBg = document.querySelector('.hero-bg');

        if (heroBg) {
            heroBg.style.transform = `scale(1) translateY(${scrollPosition * 0.2}px)`;
        }

        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.4}px)`;
            heroContent.style.opacity = 1 - (scrollPosition * 0.003);
        }
    });

    // Service card animation on hover
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            const icon = this.querySelector('.service-icon');
            icon.classList.add('animate__animated', 'animate__heartBeat');

            setTimeout(function () {
                icon.classList.remove('animate__animated', 'animate__heartBeat');
            }, 1000);
        });
    });

    // Light text effect animation
    function lightTextEffect() {
        const titles = document.querySelectorAll('.section-title');

        titles.forEach(title => {
            if (isElementInViewport(title)) {
                title.style.textShadow = '0 0 15px rgba(200, 164, 93, 0.6)';

                setTimeout(function () {
                    title.style.textShadow = 'none';
                }, 1500);
            }
        });
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    window.addEventListener('scroll', lightTextEffect);

    // Rotate 3D effect on service cards
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;

            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const rotateY = (mouseX - cardCenterX) / 15;
            const rotateX = (cardCenterY - mouseY) / 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = 'translateY(0)';
        });
    });


    const logoElement = document.querySelector('.fixed-logo');

    if (logoElement) {
        // Aggiungi effetti hover del cursore personalizzato
        logoElement.addEventListener('mouseenter', function () {
            const cursor = document.querySelector('.cursor');
            const cursorFollower = document.querySelector('.cursor-follower');

            if (cursor && cursorFollower) {
                cursor.style.width = '100px';
                cursor.style.height = '100px';
                cursor.style.borderColor = '#c8a45d';
                cursorFollower.style.width = '1px';
                cursorFollower.style.height = '1px';
                cursorFollower.style.opacity = '0';
            }
        });

        logoElement.addEventListener('mouseleave', function () {
            const cursor = document.querySelector('.cursor');
            const cursorFollower = document.querySelector('.cursor-follower');

            if (cursor && cursorFollower) {
                cursor.style.width = '100px';
                cursor.style.height = '100px';
                cursor.style.borderColor = '#c8a45d';
                cursorFollower.style.width = '8px';
                cursorFollower.style.height = '8px';
                cursorFollower.style.opacity = '1';
            }
        });
    }


});