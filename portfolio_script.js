// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
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

// Service box hover effect
const serviceBoxes = document.querySelectorAll('.service-box');
serviceBoxes.forEach(box => {
    box.addEventListener('mouseenter', () => {
        box.style.transform = 'translateY(-10px)';
    });
    
    box.addEventListener('mouseleave', () => {
        box.style.transform = 'translateY(0)';
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
    bars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.transform = 'scale(1)';
            bar.style.opacity = '1';
        }, index * 200);
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