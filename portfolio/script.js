// -------------- Marquee
function startMarquee(marqueeElement) {
    const marqueeInner = marqueeElement.querySelector('.marquee-inner');
    const marqueeContent = marqueeElement.querySelectorAll('.marquee-content');
    const contentWidth = marqueeContent[0].offsetWidth;
    let offset = 0;
    const speed = 0.15; // Adjust this value to control the speed

    // Clone the first content block to ensure smooth looping
    const firstClone = marqueeContent[0].cloneNode(true);
    marqueeInner.appendChild(firstClone);

    function animateMarquee() {
        offset -= speed;
        if (Math.abs(offset) >= contentWidth) {
            offset = 0;
        }
        marqueeInner.style.transform = `translateX(${offset}px)`;
        requestAnimationFrame(animateMarquee);
    }

    animateMarquee();
}

// Initialize marquees on window load
window.addEventListener('load', () => {
    const marquees = document.querySelectorAll('.marquee');
    marquees.forEach(marquee => startMarquee(marquee));
});

// Function to handle mobile navigation
function fixNav() {
    const nav = document.querySelector('.my-nav');
    
    function forceNavPosition() {
        if (window.innerWidth <= 520) {
            nav.style.cssText = `
                position: fixed !important;
                bottom: 0 !important;
                left: 0 !important;
                width: 100vw !important;
                z-index: 997 !important;
                transform: none !important;
                -webkit-transform: none !important;
            `;
            
            // Prevent any scroll events from moving the nav
            window.scrollTo(window.scrollX, window.scrollY);
        }
    }

    // Run on scroll
    window.addEventListener('scroll', forceNavPosition, { passive: true });
    
    // Run on touch events
    document.addEventListener('touchmove', forceNavPosition, { passive: true });
    document.addEventListener('touchend', forceNavPosition, { passive: true });
    
    // Initial position
    forceNavPosition();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', fixNav);

// Handle window resize
window.addEventListener('resize', fixNav);

// Handle orientation change
window.addEventListener('orientationchange', fixNav);


// Modal slide out


// Grab and scroll testi
const testimonialContainer = document.querySelector('.testimonial-container');
let isDown = false;
let startX;
let scrollLeft;

// Mouse down event
testimonialContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    testimonialContainer.classList.add('active');
    startX = e.pageX - testimonialContainer.offsetLeft;
    scrollLeft = testimonialContainer.scrollLeft;
});

// Mouse leave event
testimonialContainer.addEventListener('mouseleave', () => {
    isDown = false;
    testimonialContainer.classList.remove('active');
});

// Mouse up event
testimonialContainer.addEventListener('mouseup', () => {
    isDown = false;
    testimonialContainer.classList.remove('active');
});

// Mouse move event
testimonialContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return; // Stop if not clicking
    e.preventDefault();
    const x = e.pageX - testimonialContainer.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    testimonialContainer.scrollLeft = scrollLeft - walk;
});

// Function to update the scroller indicator width based on scroll position
function updateScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroller-indicator');
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollTop / documentHeight) * 100;
    
    // Set the width of the scroller-indicator based on the scroll percentage
    scrollIndicator.style.width = `${scrollPercentage}%`;
}

// Attach the function to the scroll event
window.addEventListener('scroll', updateScrollIndicator);





