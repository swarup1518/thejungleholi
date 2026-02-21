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
    
    // ===========================
    // FAQ ACCORDION FUNCTIONALITY
    // ===========================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Optional: Allow clicking outside to close all
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.faq-item')) {
            faqItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
});

// ============================================
// BOOKING SYSTEM WITH RAZORPAY INTEGRATION
// ============================================

let selectedTicketData = {
    ticketType: '',
    price: 0,
    category: ''
};

// Modal elements
const bookingModal = document.getElementById('bookingModal');
const successModal = document.getElementById('successModal');
const closeModalBtn = document.querySelector('.close-modal');
const closeSuccessBtn = document.querySelector('.close-success-btn');
const bookingForm = document.getElementById('bookingForm');

// Initialize booking buttons
document.addEventListener('DOMContentLoaded', () => {
    const ticketButtons = document.querySelectorAll('.ticket-button');
    
    ticketButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const ticketType = e.target.getAttribute('data-ticket-type');
            const price = e.target.getAttribute('data-price');
            const category = e.target.getAttribute('data-category');
            
            openBookingModal(ticketType, price, category);
        });
    });
});

// Open booking modal
function openBookingModal(ticketType, price, category) {
    selectedTicketData = { ticketType, price: parseInt(price), category };
    
    document.getElementById('selectedTicketType').textContent = ticketType;
    document.getElementById('selectedTicketPrice').textContent = `₹${price}`;
    
    // Initialize quantity field and total price
    const quantityInput = document.getElementById('quantity');
    const totalPriceSpan = document.getElementById('totalPrice');
    
    quantityInput.value = 1;
    totalPriceSpan.textContent = `₹${price}`;
    
    // Add event listener for quantity changes
    quantityInput.addEventListener('input', updateTotalPrice);
    
    // Show additional people field for group tickets
    const additionalPeopleGroup = document.getElementById('additionalPeopleGroup');
    if (ticketType.toLowerCase().includes('group') || ticketType.toLowerCase().includes('couple')) {
        additionalPeopleGroup.style.display = 'block';
        document.getElementById('additionalPeople').required = true;
    } else {
        additionalPeopleGroup.style.display = 'none';
        document.getElementById('additionalPeople').required = false;
    }
    
    bookingModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Update total price based on quantity
function updateTotalPrice() {
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const basePrice = selectedTicketData.price;
    const totalPrice = basePrice * quantity;
    
    document.getElementById('totalPrice').textContent = `₹${totalPrice}`;
}

// Close modal functions
closeModalBtn.addEventListener('click', () => {
    bookingModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    bookingForm.reset();
});

closeSuccessBtn.addEventListener('click', () => {
    successModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
        bookingModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        bookingForm.reset();
    }
    if (e.target === successModal) {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Handle form submission
bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const totalAmount = selectedTicketData.price * quantity;
    
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        age: document.getElementById('age').value,
        additionalPeople: document.getElementById('additionalPeople').value,
        ticketType: selectedTicketData.ticketType,
        category: selectedTicketData.category,
        price: selectedTicketData.price,
        quantity: quantity,
        totalAmount: totalAmount
    };
    
    // Proceed to Razorpay payment
    initiateRazorpayPayment(formData);
});

// Generate unique ticket number
function generateTicketNumber() {
    const prefix = 'JH2026';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}${random}`;
}

// Initialize Razorpay payment
function initiateRazorpayPayment(customerData) {
    const options = {
        key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your actual Razorpay Key ID
        amount: customerData.totalAmount * 100, // Amount in paise (using total amount now)
        currency: 'INR',
        name: 'The Jungle Holi',
        description: `${customerData.ticketType} - ${customerData.category} (Qty: ${customerData.quantity})`,
        image: 'images/hero.png', // Your logo
        handler: function (response) {
            // Payment successful
            handlePaymentSuccess(response, customerData);
        },
        prefill: {
            name: customerData.fullName,
            email: customerData.email,
            contact: customerData.phone
        },
        notes: {
            ticket_type: customerData.ticketType,
            category: customerData.category,
            additional_people: customerData.additionalPeople,
            quantity: customerData.quantity,
            price_per_ticket: customerData.price
        },
        theme: {
            color: '#d4af37'
        },
        modal: {
            ondismiss: function() {
                alert('Payment cancelled. Please try again.');
            }
        }
    };
    
    const rzp = new Razorpay(options);
    rzp.open();
}

// Handle successful payment
async function handlePaymentSuccess(paymentResponse, customerData) {
    const ticketNumber = generateTicketNumber();
    
    const bookingData = {
        ticketNumber: ticketNumber,
        paymentId: paymentResponse.razorpay_payment_id,
        ...customerData,
        bookingDate: new Date().toISOString(),
        eventDate: '2026-03-04',
        eventName: 'The Jungle Holi',
        venue: 'Boulder Hills, Gachibowli - Hyderabad'
    };
    
    // Close booking modal
    bookingModal.style.display = 'none';
    
    // Send confirmation email and save booking
    try {
        await sendConfirmationEmail(bookingData);
        showSuccessModal(ticketNumber, customerData.email);
    } catch (error) {
        console.error('Error sending confirmation:', error);
        // Still show success modal as payment was successful
        showSuccessModal(ticketNumber, customerData.email);
    }
}

// Send confirmation email (requires backend API)
async function sendConfirmationEmail(bookingData) {
    try {
        const response = await fetch('/api/send-ticket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to send confirmation email');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Email send error:', error);
        // For demo purposes, log the booking data
        console.log('Booking Data:', bookingData);
        throw error;
    }
}

// Show success modal
function showSuccessModal(ticketNumber, email) {
    document.getElementById('ticketNumber').textContent = ticketNumber;
    document.getElementById('confirmEmail').textContent = email;
    
    successModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Reset form
    bookingForm.reset();
}

// Smooth scroll for navigation
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

// ============================================
// GALLERY IMAGE POPUP WITH NAVIGATION
// ============================================

let currentImageIndex = 0;
let galleryImages = [];

// Initialize gallery popup functionality
document.addEventListener('DOMContentLoaded', () => {
    const imagePopup = document.getElementById('imagePopup');
    const popupImage = document.getElementById('popupImage');
    const popupClose = document.querySelector('.popup-close');
    const popupPrev = document.querySelector('.popup-prev');
    const popupNext = document.querySelector('.popup-next');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Collect all gallery images
    galleryImages = Array.from(galleryItems).map(item => item.getAttribute('data-image'));
    
    // Open popup when clicking on gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            openImagePopup(galleryImages[currentImageIndex]);
        });
    });
    
    // Close popup
    popupClose.addEventListener('click', closeImagePopup);
    
    // Previous image
    popupPrev.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        popupImage.src = galleryImages[currentImageIndex];
    });
    
    // Next image
    popupNext.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        popupImage.src = galleryImages[currentImageIndex];
    });
    
    // Close when clicking outside the image
    imagePopup.addEventListener('click', (e) => {
        if (e.target === imagePopup) {
            closeImagePopup();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (imagePopup.style.display === 'block') {
            if (e.key === 'Escape') {
                closeImagePopup();
            } else if (e.key === 'ArrowLeft') {
                popupPrev.click();
            } else if (e.key === 'ArrowRight') {
                popupNext.click();
            }
        }
    });
    
    function openImagePopup(imageSrc) {
        popupImage.src = imageSrc;
        imagePopup.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeImagePopup() {
        imagePopup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// ============================================
// ARTIST INFO MODAL
// ============================================

const artistData = {
    sazi: {
        name: 'DJ Sazi',
        bio: 'Known for his eclectic mixes and powerful stage presence, DJ Sazi brings an unmatched energy to every performance. With years of experience spinning at top festivals, he\'ll take you on a musical journey you won\'t forget.',
        instagram: 'https://www.instagram.com/djsazi/'
    },
    paroma: {
        name: 'DJ Paroma',
        bio: 'A rising star in the electronic music scene, DJ Paroma creates mesmerizing soundscapes that blend traditional beats with modern bass. Her unique style has captivated audiences across the country.',
        instagram: 'https://www.instagram.com/djparoma/'
    },
    piyush: {
        name: 'DJ Piyush',
        bio: 'Master of crowd control and high-energy sets, DJ Piyush knows how to keep the dance floor packed. His dynamic mixing style and track selection have made him a festival favorite.',
        instagram: 'https://www.instagram.com/djpiyush/'
    },
    sachin: {
        name: 'DJ Sachin',
        bio: 'Specializing in progressive and melodic techno, DJ Sachin creates immersive sonic experiences. His deep understanding of music theory and production shines through in every performance.',
        instagram: 'https://www.instagram.com/djsachin/'
    },
    novlik: {
        name: 'DJ Novlik',
        bio: 'An innovative producer and DJ, Novlik pushes the boundaries of electronic music. His experimental approach and creative mixing techniques create unforgettable moments on the dance floor.',
        instagram: 'https://www.instagram.com/djnovlik/'
    }
};

// Initialize artist cards
document.addEventListener('DOMContentLoaded', () => {
    const artistCards = document.querySelectorAll('.artist-card');
    const artistModal = document.getElementById('artistModal');
    const closeArtistModal = document.querySelector('.close-artist-modal');
    
    artistCards.forEach(card => {
        card.addEventListener('click', () => {
            const artistId = card.getAttribute('data-artist');
            const artist = artistData[artistId];
            
            if (artist) {
                // Populate modal with artist data
                document.getElementById('artistName').textContent = artist.name;
                document.getElementById('artistBio').textContent = artist.bio;
                document.getElementById('artistInstagram').href = artist.instagram;
                
                // Show modal
                artistModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close artist modal
    closeArtistModal.addEventListener('click', () => {
        artistModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close when clicking outside
    artistModal.addEventListener('click', (e) => {
        if (e.target === artistModal) {
            artistModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});
