// ===== Mobile Menu Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const subject = this.querySelectorAll('input[type="text"]')[1].value;
    const message = this.querySelector('textarea').value;

    // Validation
    if (name.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
        showNotification('Please fill all fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email', 'error');
        return;
    }

    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Simulate API call
    setTimeout(() => {
        showNotification('Message sent successfully! Thank you for reaching out.', 'success');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }, 1500);
});

// ===== Notification Function =====
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 2000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

    if (type === 'success') {
        notification.style.backgroundColor = '#10b981';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#ef4444';
        notification.style.color = 'white';
    }

    document.body.appendChild(notification);

    // Auto remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and other elements for scroll animation
document.querySelectorAll('.experience-card, .education-card, .skill-category, .achievement-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===== Active Navigation Link Highlighting =====
window.addEventListener('scroll', () => {
    let current = '';

    // Get all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });

    // Remove active class from all nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to current nav link
    const activeLink = document.querySelector(`.nav-menu a[href="#${current}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
});

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--accent-color) !important;
    }
`;
document.head.appendChild(style);

// ===== Counter Animation for Stats =====
function animateValue(element, start, end, duration) {
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
}

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }

    // Navigate to next section with Tab
    if (e.key === 'Tab') {
        const currentSection = document.querySelector('section:target');
        if (currentSection) {
            const nextSection = currentSection.nextElementSibling;
            if (nextSection && nextSection.tagName === 'SECTION') {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

// ===== Print Friendly Feature =====
window.addEventListener('beforeprint', () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
});

// ===== Prevent form submission on Enter in text fields =====
document.querySelectorAll('.form-group input').forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.type !== 'submit') {
            e.preventDefault();
            const nextInput = input.parentElement.nextElementSibling?.querySelector('input, textarea');
            if (nextInput) {
                nextInput.focus();
            }
        }
    });
});

// ===== Add Loading Animation to Buttons =====
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function () {
        if (!this.disabled) {
            this.style.transform = 'scale(1.05)';
        }
    });

    btn.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
    });
});

// ===== Initialize Page =====
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to page
    document.body.style.animation = 'fadeIn 0.5s ease';

    // Log welcome message
    console.log('%cWelcome to My Portfolio! 👋', 'color: #2563eb; font-size: 16px; font-weight: bold;');
    console.log('%cBuilt with HTML, CSS, and JavaScript', 'color: #666; font-size: 14px;');

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        document.querySelectorAll('*').forEach(el => {
            el.style.animationDuration = '0.01ms !important';
            el.style.transitionDuration = '0.01ms !important';
        });
    }
});

// ===== Handle Page Visibility =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===== Add Fade Out Animation =====
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(fadeOutStyle);

// ===== Touch Event Handling for Mobile =====
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50 && navMenu.classList.contains('active')) {
        // Swiped left - close menu
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    } else if (touchEndX > touchStartX + 50 && !navMenu.classList.contains('active')) {
        // Swiped right on left side of screen
        const touchStartPercentage = (touchStartX / window.innerWidth) * 100;
        if (touchStartPercentage < 20) {
            navMenu.classList.add('active');
            hamburger.classList.add('active');
        }
    }
}

// ===== Export Functions for External Use =====
window.PortfolioApp = {
    toggleMenu: () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    },
    closeMenu: () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    },
    scrollToSection: (sectionId) => {
        const section = document.querySelector(`#${sectionId}`);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    },
    showNotification: showNotification
};
       