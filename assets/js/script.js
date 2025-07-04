// Text Hover Effect Class - Mengikuti referensi Aceternity
class TextHoverEffect {
    constructor() {
        this.svg = document.getElementById('textHover');
        this.revealMask = document.getElementById('revealMask');
        this.cursor = { x: 0, y: 0 };
        this.isHovered = false;

        // Only initialize if elements exist (for index.html)
        if (this.svg && this.revealMask) {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        this.svg.addEventListener('mouseenter', () => {
            this.isHovered = true;
        });

        this.svg.addEventListener('mouseleave', () => {
            this.isHovered = false;
            // Reset mask position to center
            this.revealMask.setAttribute('cx', '50%');
            this.revealMask.setAttribute('cy', '50%');
        });

        this.svg.addEventListener('mousemove', (e) => {
            if (this.isHovered) {
                const rect = this.svg.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;

                this.revealMask.setAttribute('cx', `${x}%`);
                this.revealMask.setAttribute('cy', `${y}%`);
            }
        });
    }
}


// Enhanced scroll animations
// Parallax effect for pattern layer
class ParallaxEffect {
    constructor() {
        this.patternLayer = document.querySelector('.pattern-layer');
        if (this.patternLayer) {
            this.setupParallax();
        }
    }

    setupParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            this.patternLayer.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }
}

// Enhanced mouse cursor effect
class CursorEffect {
    constructor() {
        this.cursor = this.createCursor();
        this.setupCursor();
    }

    createCursor() {
        const cursor = document.createElement('div');
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(96, 165, 250, 0.8), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: screen;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);
        return cursor;
    } setupCursor() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX - 10 + 'px';
            this.cursor.style.top = e.clientY - 10 + 'px';
        });

        document.querySelectorAll('.text-hover-effect, .letter').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(2)';
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
            });
        });
    }
}

// Culture Cards Interaction
class CultureCards {
    constructor() {
        this.cards = document.querySelectorAll('.culture-card');
        if (this.cards.length > 0) {
            this.init();
        }
    }

    init() {
        this.setupClickHandlers();
        this.setupHoverEffects();
        this.setupScrollAnimation();
    }

    setupClickHandlers() {
        this.cards.forEach(card => {
            card.addEventListener('click', (e) => {
                const category = card.dataset.category;
                this.handleCardClick(category, card);
            });
        });
    }

    handleCardClick(category, card) {
        // Add click animation
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);

        // Handle navigation based on category
        switch (category) {
            case 'batik':
                console.log('Navigating to Batik page...');
                // window.location.href = '/batik';
                break;
            case 'dance':
                console.log('Navigating to Dance page...');
                // window.location.href = '/dance';
                break;
            case 'culinary':
                console.log('Navigating to Culinary page...');
                // window.location.href = '/culinary';
                break;
            case 'heritage':
                console.log('Navigating to Heritage page...');
                // window.location.href = '/heritage';
                break;
        }
    }

    setupHoverEffects() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e, card);
            });
        });
    }

    createRippleEffect(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            transform: translate(-50%, -50%);
            animation: rippleExpand 0.6s ease-out forwards;
            pointer-events: none;
            z-index: 10;
        `;

        card.style.position = 'relative';
        card.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupScrollAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, {
            threshold: 0.1
        });

        this.cards.forEach(card => {
            observer.observe(card);
        });
    }
}

// Timeline Animation Class
class TimelineAnimation {
    constructor() {
        this.timelineItems = document.querySelectorAll('.timeline-item');
        this.timelineLine = document.querySelector('.timeline-line');
        this.observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        if (this.timelineItems.length > 0) {
            this.setupIntersectionObserver();
            this.animateTimelineLine();
        }
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add staggered delay based on item index
                    const index = Array.from(this.timelineItems).indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 200);
                }
            });
        }, this.observerOptions);

        this.timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    animateTimelineLine() {
        // Start timeline line animation when section comes into view
        const timelineSection = document.querySelector('.timeline-section');
        const lineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.timelineLine.style.animationPlayState = 'running';
                }
            });
        }, { threshold: 0.1 });

        lineObserver.observe(timelineSection);
    }
}

// Enhanced scroll effects for timeline
class ScrollEffects {
    constructor() {
        this.timelineDots = document.querySelectorAll('.timeline-dot');
        if (this.timelineDots.length > 0) {
            this.setupScrollListener();
        }
    }

    setupScrollListener() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateTimelineDots();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    updateTimelineDots() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        this.timelineDots.forEach((dot, index) => {
            const rect = dot.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            const elementCenter = elementTop + (rect.height / 2);

            // Calculate if dot is in the "active" zone (center of viewport)
            const viewportCenter = scrollY + (windowHeight / 2);
            const distance = Math.abs(elementCenter - viewportCenter);
            const maxDistance = windowHeight * 0.3;

            if (distance < maxDistance) {
                const intensity = 1 - (distance / maxDistance);
                dot.style.transform = `translate(-50%, -50%) scale(${1 + intensity * 0.5})`;
                dot.style.boxShadow = `0 0 ${20 + intensity * 30}px rgba(96, 165, 250, ${0.4 + intensity * 0.6})`;
            } else {
                dot.style.transform = 'translate(-50%, -50%) scale(1)';
                dot.style.boxShadow = '0 0 20px rgba(96, 165, 250, 0.4)';
            }
        });
    }
}

// Gallery Lightbox Class
class GalleryLightbox {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightbox-image');
        this.lightboxCaption = document.querySelector('.lightbox-caption');
        this.lightboxClose = document.querySelector('.lightbox-close');
        this.lightboxOverlay = document.querySelector('.lightbox-overlay');
        this.lightboxPrev = document.querySelector('.lightbox-prev');
        this.lightboxNext = document.querySelector('.lightbox-next');
        this.lightboxCurrent = document.querySelector('.lightbox-current');
        this.lightboxTotal = document.querySelector('.lightbox-total');

        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.currentIndex = 0;
        this.isOpen = false;

        if (this.lightbox && this.galleryItems.length > 0) {
            this.initializeLightbox();
        }
    }

    initializeLightbox() {
        // Set total count
        this.lightboxTotal.textContent = this.galleryItems.length;

        // Add click listeners to gallery items
        this.galleryItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.openLightbox(index);
            });
        });

        // Close button
        this.lightboxClose.addEventListener('click', () => {
            this.closeLightbox();
        });

        // Overlay click to close
        this.lightboxOverlay.addEventListener('click', () => {
            this.closeLightbox();
        });

        // Navigation buttons
        this.lightboxPrev.addEventListener('click', () => {
            this.previousImage();
        });

        this.lightboxNext.addEventListener('click', () => {
            this.nextImage();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;

            switch (e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.previousImage();
                    break;
                case 'ArrowRight':
                    this.nextImage();
                    break;
            }
        });

        // Prevent body scroll when lightbox is open
        this.lightbox.addEventListener('wheel', (e) => {
            if (this.isOpen) {
                e.preventDefault();
            }
        });
    }

    openLightbox(index) {
        this.currentIndex = index;
        this.isOpen = true;

        // Update image and caption
        this.updateLightboxContent();

        // Show lightbox
        this.lightbox.classList.add('active');
        this.lightbox.setAttribute('aria-hidden', 'false');

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Focus management for accessibility
        this.lightboxClose.focus();
    }

    closeLightbox() {
        this.isOpen = false;

        // Hide lightbox
        this.lightbox.classList.remove('active');
        this.lightbox.setAttribute('aria-hidden', 'true');

        // Restore body scroll
        document.body.style.overflow = '';

        // Return focus to the gallery item that was clicked
        if (this.galleryItems[this.currentIndex]) {
            this.galleryItems[this.currentIndex].focus();
        }
    }

    previousImage() {
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.galleryItems.length - 1;
        this.updateLightboxContent();
    }

    nextImage() {
        this.currentIndex = this.currentIndex < this.galleryItems.length - 1 ? this.currentIndex + 1 : 0;
        this.updateLightboxContent();
    }

    updateLightboxContent() {
        const currentItem = this.galleryItems[this.currentIndex];
        const img = currentItem.querySelector('.gallery-image');
        const title = currentItem.querySelector('.gallery-title');
        const description = currentItem.querySelector('.gallery-description');

        // Update image source and alt text
        this.lightboxImage.src = img.src;
        this.lightboxImage.alt = img.alt;

        // Update caption with title and description
        let captionText = img.alt;
        if (title && description) {
            captionText = `${title.textContent} - ${description.textContent}`;
        }
        this.lightboxCaption.textContent = captionText;

        // Update counter
        this.lightboxCurrent.textContent = this.currentIndex + 1;
        this.lightboxTotal.textContent = this.galleryItems.length;

        // Add loading animation
        this.lightboxImage.style.opacity = '0';

        // Handle image load
        this.lightboxImage.onload = () => {
            setTimeout(() => {
                this.lightboxImage.style.opacity = '1';
            }, 100);
        };
    }
}

// Gallery Filter Class
class GalleryFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.galleryItems = document.querySelectorAll('.gallery-item');

        this.init();
    }

    init() {
        if (this.filterButtons.length === 0) return;

        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.handleFilterClick(button);
            });
        });
    }

    handleFilterClick(clickedButton) {
        // Remove active class from all buttons
        this.filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        clickedButton.classList.add('active');

        // Get filter value
        const filterValue = clickedButton.getAttribute('data-filter');

        // Filter gallery items
        this.filterItems(filterValue);

        // Re-initialize lightbox after filtering
        this.reinitializeLightbox();
    }

    filterItems(filter) {
        this.galleryItems.forEach((item, index) => {
            const category = item.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                item.classList.remove('hidden');
                // Add staggered animation
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 50);
            } else {
                item.classList.add('hidden');
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
            }
        });
    }

    reinitializeLightbox() {
        // Get visible items only
        const visibleItems = Array.from(this.galleryItems).filter(item => !item.classList.contains('hidden'));

        // Update lightbox total counter
        const lightboxTotal = document.querySelector('.lightbox-total');
        if (lightboxTotal) {
            lightboxTotal.textContent = visibleItems.length;
        }
    }
}

// Enhanced Gallery Lightbox for Gallery Page
class EnhancedGalleryLightbox extends GalleryLightbox {
    constructor() {
        super();
        this.isGalleryPage = window.location.pathname.includes('gallery.html');
    }

    initializeLightbox() {
        super.initializeLightbox();

        // If this is the gallery page, use different selectors
        if (this.isGalleryPage) {
            this.galleryItems = document.querySelectorAll('.gallery-item:not(.hidden)');
            this.updateGalleryItems();
        }
    }

    updateGalleryItems() {
        // Re-bind click events for gallery items
        this.galleryItems = document.querySelectorAll('.gallery-item:not(.hidden)');

        if (this.lightboxTotal) {
            this.lightboxTotal.textContent = this.galleryItems.length;
        }

        // Remove existing listeners and add new ones
        this.galleryItems.forEach((item, index) => {
            const newItem = item.cloneNode(true);
            item.parentNode.replaceChild(newItem, item);

            newItem.addEventListener('click', (e) => {
                e.preventDefault();
                this.openLightbox(index);
            });
        });

        // Update the galleryItems reference
        this.galleryItems = document.querySelectorAll('.gallery-item:not(.hidden)');
    }

    openLightbox(index) {
        // Update gallery items list to only include visible items
        this.galleryItems = document.querySelectorAll('.gallery-item:not(.hidden)');
        super.openLightbox(index);
    }

    updateLightboxContent() {
        // Update gallery items list to only include visible items
        this.galleryItems = document.querySelectorAll('.gallery-item:not(.hidden)');

        const currentItem = this.galleryItems[this.currentIndex];
        if (!currentItem) return;

        const img = currentItem.querySelector('.gallery-image');
        const title = currentItem.querySelector('.gallery-title');
        const description = currentItem.querySelector('.gallery-description');

        // Update image source and alt text
        this.lightboxImage.src = img.src;
        this.lightboxImage.alt = img.alt;

        // Update caption with title and description
        let captionText = img.alt;
        if (title && description) {
            captionText = `${title.textContent} - ${description.textContent}`;
        }
        this.lightboxCaption.textContent = captionText;

        // Update counter
        this.lightboxCurrent.textContent = this.currentIndex + 1;
        this.lightboxTotal.textContent = this.galleryItems.length;

        // Add loading animation
        this.lightboxImage.style.opacity = '0';

        // Handle image load
        this.lightboxImage.onload = () => {
            setTimeout(() => {
                this.lightboxImage.style.opacity = '1';
            }, 100);
        };
    }
}

// Gallery Item Animations Class
class GalleryAnimations {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.gallerySection = document.querySelector('.gallery-section');

        if (this.galleryItems.length > 0) {
            this.setupIntersectionObserver();
            this.setupScrollEffects();
        }
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Staggered animation for gallery items
                    const items = entry.target.querySelectorAll('.gallery-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        if (this.gallerySection) {
            observer.observe(this.gallerySection);
        }
    }

    setupScrollEffects() {
        // Initial state for gallery items
        this.galleryItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });

        // Parallax effect for gallery section
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateParallaxEffect();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    updateParallaxEffect() {
        if (!this.gallerySection) return;

        const rect = this.gallerySection.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        // Apply subtle parallax to pattern background
        const pattern = this.gallerySection.querySelector('::before');
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            this.gallerySection.style.setProperty('--parallax-offset', `${rate}px`);
        }
    }
}

// Enhanced scroll effects for smooth transitions
class SmoothScrollEffects {
    constructor() {
        this.sections = document.querySelectorAll('section');
        this.setupSectionTransitions();
    }

    setupSectionTransitions() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '-10% 0px -10% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                } else {
                    entry.target.classList.remove('section-visible');
                }
            });
        }, observerOptions);

        this.sections.forEach(section => {
            observer.observe(section);
        });
    }
}

// Navigation Mobile Menu Handler
class NavigationHandler {
    constructor() {
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');

        this.init();
    }

    init() {
        if (this.navToggle && this.navMenu) {
            this.navToggle.addEventListener('click', () => this.toggleMenu());

            // Close menu when clicking on nav links
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.navToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
                    this.closeMenu();
                }
            });
        }
    }

    toggleMenu() {
        this.navMenu.classList.toggle('active');
        this.animateToggleIcon();
    }

    closeMenu() {
        this.navMenu.classList.remove('active');
        this.resetToggleIcon();
    }

    animateToggleIcon() {
        const lines = this.navToggle.querySelectorAll('.toggle-line');
        if (this.navMenu.classList.contains('active')) {
            lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            this.resetToggleIcon();
        }
    }

    resetToggleIcon() {
        const lines = this.navToggle.querySelectorAll('.toggle-line');
        lines.forEach(line => {
            line.style.transform = '';
            line.style.opacity = '';
        });
    }
}

// About Page Animations
class AboutPageAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupCounterAnimations();
    }

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.mission-card, .vision-card, .philosophy-card, .team-member, .history-era');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                    entry.target.style.opacity = '1';
                }
            });
        }, this.observerOptions);

        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.animationDelay = `${index * 0.1}s`;
            observer.observe(element);
        });
    }

    setupCounterAnimations() {
        // Add any counter animations if needed in the future
        const counters = document.querySelectorAll('[data-counter]');

        if (counters.length > 0) {
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, this.observerOptions);

            counters.forEach(counter => {
                counterObserver.observe(counter);
            });
        }
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-counter'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
}

// Smooth scroll for anchor links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.offsetTop - 80; // Account for fixed nav
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

// Enhanced image loading with lazy loading effect
class ImageLazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[src*="assets/img"]');
        if (this.images.length > 0) {
            this.init();
        }
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.lazyLoadImages();
        } else {
            // Fallback for older browsers
            this.images.forEach(img => this.loadImage(img));
        }
    }

    lazyLoadImages() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    imageObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });

        this.images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    loadImage(img) {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';

        const tempImg = new Image();
        tempImg.onload = () => {
            img.style.opacity = '1';
        };
        tempImg.src = img.src;
    }
}

// Add ripple animation CSS
const rippleCSS = `
@keyframes rippleExpand {
    to {
        width: 300px;
        height: 300px;
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TextHoverEffect();
    new ParallaxEffect();
    new CursorEffect();
    new CultureCards();
    new TimelineAnimation();
    new ScrollEffects();

    // Use enhanced lightbox for gallery page
    if (window.location.pathname.includes('gallery.html')) {
        new EnhancedGalleryLightbox();
        new GalleryFilter();
    } else {
        new GalleryLightbox();
    }

    new GalleryAnimations();
    new SmoothScrollEffects();
    new NavigationHandler();
    new AboutPageAnimations();
    new ImageLazyLoader();

    // Contact page specific functionality
    new ContactFormHandler();
    new FAQAccordion();
    new ContactPageAnimations();

    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Contact Form Handler
class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));

        // Add real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = document.getElementById(fieldName + 'Error');

        let errorMessage = '';

        switch (fieldName) {
            case 'fullName':
                if (!value) {
                    errorMessage = 'Nama lengkap harus diisi';
                } else if (value.length < 2) {
                    errorMessage = 'Nama minimal 2 karakter';
                }
                break;

            case 'email':
                if (!value) {
                    errorMessage = 'Email harus diisi';
                } else if (!this.isValidEmail(value)) {
                    errorMessage = 'Format email tidak valid';
                }
                break;

            case 'subject':
                if (!value) {
                    errorMessage = 'Subjek harus diisi';
                } else if (value.length < 5) {
                    errorMessage = 'Subjek minimal 5 karakter';
                }
                break;

            case 'message':
                if (!value) {
                    errorMessage = 'Pesan harus diisi';
                } else if (value.length < 10) {
                    errorMessage = 'Pesan minimal 10 karakter';
                }
                break;
        }

        if (errorMessage) {
            errorElement.textContent = errorMessage;
            field.style.borderColor = '#e74c3c';
            return false;
        } else {
            errorElement.textContent = '';
            field.style.borderColor = '#27ae60';
            return true;
        }
    }

    clearError(field) {
        const errorElement = document.getElementById(field.name + 'Error');
        if (errorElement.textContent) {
            errorElement.textContent = '';
            field.style.borderColor = '#e9ecef';
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    handleSubmit(e) {
        e.preventDefault();

        // Validate all fields
        const inputs = this.form.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            this.submitForm();
        } else {
            // Scroll to first error
            const firstError = this.form.querySelector('.form-error:not(:empty)');
            if (firstError) {
                firstError.closest('.form-group').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    }

    submitForm() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Create mailto link
        const subject = encodeURIComponent(data.subject);
        const body = encodeURIComponent(
            `Nama: ${data.fullName}\n` +
            `Email: ${data.email}\n\n` +
            `Pesan:\n${data.message}`
        );

        const mailtoLink = `mailto:info@kacirebonan.com?subject=${subject}&body=${body}`;

        // Show loading state
        const submitButton = this.form.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<span class="button-text">Membuka Email...</span>';
        submitButton.disabled = true;

        // Open mail client
        window.location.href = mailtoLink;

        // Reset button after delay
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;

            // Show success message
            this.showSuccessMessage();
        }, 2000);
    }

    showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            background: #d4edda;
            color: #155724;
            padding: 1rem;
            border-radius: 8px;
            margin-top: 1rem;
            border: 1px solid #c3e6cb;
            text-align: center;
        `;
        successDiv.innerHTML = `
            <strong>✓ Email client telah dibuka!</strong><br>
            Silakan kirim email melalui aplikasi email Anda atau hubungi kami langsung.
        `;

        this.form.appendChild(successDiv);

        // Remove success message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
}

// FAQ Accordion Handler
class FAQAccordion {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        if (this.faqItems.length > 0) {
            this.init();
        }
    }

    init() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');

            question.addEventListener('click', () => {
                this.toggleFAQ(item, question, answer);
            });
        });
    }

    toggleFAQ(item, question, answer) {
        const isExpanded = question.getAttribute('aria-expanded') === 'true';

        // Close all other FAQs
        this.faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                const otherQuestion = otherItem.querySelector('.faq-question');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                otherQuestion.setAttribute('aria-expanded', 'false');
                otherAnswer.classList.remove('active');
            }
        });

        // Toggle current FAQ
        if (isExpanded) {
            question.setAttribute('aria-expanded', 'false');
            answer.classList.remove('active');
        } else {
            question.setAttribute('aria-expanded', 'true');
            answer.classList.add('active');

            // Scroll to FAQ item
            setTimeout(() => {
                item.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }, 300);
        }
    }
}

// Contact Page Animations
class ContactPageAnimations {
    constructor() {
        if (window.location.pathname.includes('contact.html')) {
            this.init();
        }
    }

    init() {
        this.animateOnScroll();
        this.addHoverEffects();
    }

    animateOnScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const elementsToAnimate = document.querySelectorAll(`
            .contact-hero-container,
            .contact-intro-container,
            .contact-form,
            .contact-card,
            .social-card,
            .map-container,
            .faq-item
        `);

        elementsToAnimate.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.animationDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    }

    addHoverEffects() {
        // Add ripple effect to contact cards
        const contactCards = document.querySelectorAll('.contact-card, .social-card');
        contactCards.forEach(card => {
            card.addEventListener('click', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(52, 152, 219, 0.3);
                    width: 10px;
                    height: 10px;
                    left: ${x - 5}px;
                    top: ${y - 5}px;
                    animation: rippleExpand 0.6s ease-out;
                    pointer-events: none;
                `;

                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });
    }
}
