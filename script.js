// ========================================
// JUNGLE HOLI - Interactive Enhancements
// Smooth Scrolling & Animations
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for fade-in
    const sections = document.querySelectorAll('.section-container, .ticket-card, .feature-item');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // Parallax effect for hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Add glow effect on hover for buttons
    const buttons = document.querySelectorAll('.ticket-button, .cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Countdown animation for color powder smoke
    const colorSmoke = document.querySelector('.color-powder-smoke');
    
    if (colorSmoke) {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            colorSmoke.style.filter = `blur(40px) hue-rotate(${hue}deg)`;
        }, 100);
    }
    
    // Track ticket clicks for analytics (optional)
    const ticketButtons = document.querySelectorAll('.ticket-button');
    
    ticketButtons.forEach(button => {
        button.addEventListener('click', function() {
            const ticketType = this.closest('.ticket-option').querySelector('.ticket-type').textContent;
            const ticketPrice = this.closest('.ticket-option').querySelector('.ticket-price').textContent;
            
            console.log(`Ticket Selected: ${ticketType} - ${ticketPrice}`);
            
            // You can add analytics tracking here
            // Example: gtag('event', 'ticket_click', { ticket_type: ticketType });
        });
    });
    
});
