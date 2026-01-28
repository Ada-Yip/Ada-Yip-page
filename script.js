// Ada Yip Portfolio - JavaScript Functions

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close menu when a link is clicked
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Smooth scroll behavior for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('nav');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.classList.add('shadow-lg');
        navbar.classList.add('bg-opacity-98');
    } else {
        navbar.classList.remove('shadow-lg');
        navbar.classList.remove('bg-opacity-98');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Add animation to elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all skill cards
document.querySelectorAll('.bg-slate-800').forEach(card => {
    observer.observe(card);
});

// Update active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollTop >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active', 'text-cyan-400');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('text-cyan-400');
        }
    });
});

// Back to top button functionality
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.className = 'fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-bold text-xl hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300 z-40 back-to-top';
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add scroll spy for better UX
const scrollSpy = () => {
    let scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('text-cyan-400', 'border-b-2', 'border-cyan-400');
            });
            
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('text-cyan-400');
            }
        }
    });
};

window.addEventListener('scroll', scrollSpy);

// Parallax effect for hero section (subtle)
const heroSection = document.querySelector('#home');

if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const parallaxElements = heroSection.querySelectorAll('img, h1, p');
        
        parallaxElements.forEach((element, index) => {
            const parallaxSpeed = 0.1 + (index * 0.05);
            element.style.transform = `translateY(${scrollPosition * parallaxSpeed}px)`;
        });
    });
}

// Form submission (if contact form is added later)
function handleFormSubmit(e) {
    if (e.target.tagName === 'FORM') {
        e.preventDefault();
        console.log('Form submitted:', e.target);
        // Add your form handling logic here
        alert('Thank you for your message! I will get back to you soon.');
        e.target.reset();
    }
}

document.addEventListener('submit', handleFormSubmit);

// Add active state to current nav item
function updateActiveNavItem() {
    const currentScroll = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('text-cyan-400'));
            const activeLink = document.querySelector(`a[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.classList.add('text-cyan-400');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavItem);

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavItem();
    
    // Add fade-in animation to elements
    document.querySelectorAll('section').forEach((section, index) => {
        section.style.opacity = '1';
        section.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s both`;
    });
});

// Performance optimization - throttle scroll events
let ticking = false;

function throttle(callback) {
    if (!ticking) {
        window.requestAnimationFrame(callback);
        ticking = true;
        setTimeout(() => {
            ticking = false;
        }, 100);
    }
}

window.addEventListener('scroll', () => {
    throttle(() => {
        scrollSpy();
        updateActiveNavItem();
    });
}, { passive: true });

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'H' to go to home
    if (e.key === 'h' || e.key === 'H') {
        document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'S' to go to skills
    if (e.key === 's' || e.key === 'S') {
        document.querySelector('#skills').scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'C' to go to contact
    if (e.key === 'c' || e.key === 'C') {
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }
});

// Log portfolio load time
console.log('Ada Yip Portfolio loaded successfully!');
console.log('Press H for Home, S for Skills, C for Contact');
