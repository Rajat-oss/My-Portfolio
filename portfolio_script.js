// Smooth scrolling for navigation links (only for same-page links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');
let isMenuOpen = false;

menuIcon.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    navbar.classList.toggle('active');
    menuIcon.classList = isMenuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }

    if (currentScroll > 50) {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.7)';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('skills')) {
                animateSkills();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
    section.classList.add('fade-in');
});

// Dynamic typing effect
const roles = ['Web Developer', 'Software Developer', 'UI/UX Designer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;

function type() {
    const currentRole = roles[roleIndex];
    const typingText = document.querySelector('.typing-text span');

    if (!typingText) return;

    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? erasingDelay : typingDelay;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = newTextDelay;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(type, typeSpeed);
}

// Start typing effect
type();

// Form submission with validation
const contactForm = document.querySelector('.contact form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Simple validation
    let isValid = true;
    for (let [key, value] of Object.entries(data)) {
        if (!value) {
            isValid = false;
            const input = contactForm.querySelector(`[name="${key}"]`);
            input.classList.add('error');
            setTimeout(() => input.classList.remove('error'), 3000);
        }
    }

    if (isValid) {
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.btn');
        submitBtn.textContent = 'Sending...';
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            contactForm.reset();
            setTimeout(() => {
                submitBtn.textContent = 'Send Message';
            }, 2000);
        }, 1500);
    }
});

// Service box animations
const serviceBoxes = document.querySelectorAll('.service-box');
const serviceIcons = document.querySelectorAll('.service-icon');

// Add initial animation when services section comes into view
const servicesSection = document.querySelector('.services');
if (servicesSection) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            serviceBoxes.forEach((box, index) => {
                setTimeout(() => {
                    box.style.opacity = '1';
                    box.style.transform = 'translateY(0)';
                }, index * 200);
            });
            observer.unobserve(servicesSection);
        }
    }, { threshold: 0.3 });

    observer.observe(servicesSection);

    // Set initial state for animation
    serviceBoxes.forEach(box => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(30px)';
        box.style.transition = 'all 0.5s ease';
    });
}

// Add animation for projects section
const projectsSection = document.querySelector('.projects');
const projectBoxes = document.querySelectorAll('.project-box');

if (projectsSection) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            projectBoxes.forEach((box, index) => {
                setTimeout(() => {
                    box.style.opacity = '1';
                    box.style.transform = 'translateY(0)';
                }, index * 300);
            });
            observer.unobserve(projectsSection);
        }
    }, { threshold: 0.2 });

    observer.observe(projectsSection);

    // Set initial state for animation
    projectBoxes.forEach(box => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(50px)';
        box.style.transition = 'all 0.6s ease';
    });
}

// Service box hover effects
serviceBoxes.forEach(box => {
    box.addEventListener('mouseenter', () => {
        box.style.transform = 'translateY(-15px)';
        const icon = box.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1.2)';
            icon.style.color = '#fff';
        }
        const btn = box.querySelector('.service-btn');
        if (btn) {
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }
    });

    box.addEventListener('mouseleave', () => {
        box.style.transform = 'translateY(0)';
        const icon = box.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1)';
            icon.style.color = '';
        }
        const btn = box.querySelector('.service-btn');
        if (btn) {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(20px)';
        }
    });
});

// Parallax effect for home section
const homeSection = document.querySelector('.home');
window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    if (homeSection) {
        homeSection.style.backgroundPositionY = `${scroll * 0.5}px`;
    }
});

// Skills animation
function animateSkills() {
    const bars = document.querySelectorAll('.bar');
    const skillPercents = document.querySelectorAll('.skill-percent');

    bars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.transform = 'scale(1)';
            bar.style.opacity = '1';
        }, index * 200);
    });

    // Animate skill percentage bars
    skillPercents.forEach((skillPercent) => {
        const width = skillPercent.style.width;
        skillPercent.style.width = '0';
        setTimeout(() => {
            skillPercent.style.width = width;
        }, 300);
    });
}

// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
    // Add active class to current section in navbar
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});