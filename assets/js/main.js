// ===================================
// Main JavaScript - Core Functionality with Theme Support
// ===================================

class PersonalSite {
    constructor() {
        this.profileData = null;
        this.init();
    }

    async init() {
        try {
            await this.loadProfileData();
            this.populateProfile();
            this.populateSocialLinks();
            this.setupLazyLoading();
            this.setupAccessibility();
            this.updateFooter();
            this.setupThemeToggle();
        } catch (error) {
            console.error('Failed to initialize site:', error);
            this.showError('Failed to load profile data');
        }
    }

    async loadProfileData() {
        try {
            const response = await fetch('./data/profile.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.profileData = await response.json();
        } catch (error) {
            console.error('Error loading profile data:', error);
            // Fallback data
            this.profileData = {
                name: "Your Name",
                tagline: "Update your profile.json file",
                bio: "Edit the data/profile.json file to customize your profile information.",
                email: "your.email@example.com",
                profileImage: "assets/images/profile.jpg",
                socialLinks: []
            };
        }
    }

    populateProfile() {
        const elements = {
            heroTitle: document.getElementById('heroTitle'),
            heroTagline: document.getElementById('heroTagline'),
            heroBio: document.getElementById('heroBio'),
            profileImage: document.getElementById('profileImage'),
            contactEmail: document.getElementById('contactEmail')
        };

        if (elements.heroTitle) {
            elements.heroTitle.textContent = this.profileData.name;
            // Update page title
            document.title = `${this.profileData.name} | Personal Brand`;
        }

        if (elements.heroTagline) {
            elements.heroTagline.textContent = this.profileData.tagline;
        }

        if (elements.heroBio) {
            elements.heroBio.textContent = this.profileData.bio;
        }

        if (elements.profileImage) {
            elements.profileImage.src = this.profileData.profileImage;
            elements.profileImage.alt = `${this.profileData.name} profile photo`;
        }

        if (elements.contactEmail) {
            elements.contactEmail.href = `mailto:${this.profileData.email}`;
            elements.contactEmail.textContent = this.profileData.email;
        }
    }

    populateSocialLinks() {
        const socialLinksContainer = document.getElementById('socialLinks');
        if (!socialLinksContainer || !this.profileData.socialLinks) return;

        const socialIconMap = {
            linkedin: 'fab fa-linkedin-in',
            instagram: 'fab fa-instagram',
            twitter: 'fab fa-twitter',
            x: 'fab fa-x-twitter',
            youtube: 'fab fa-youtube',
            github: 'fab fa-github',
            facebook: 'fab fa-facebook-f',
            tiktok: 'fab fa-tiktok',
            website: 'fas fa-globe',
            email: 'fas fa-envelope'
        };

        socialLinksContainer.innerHTML = this.profileData.socialLinks
            .map(link => {
                const iconClass = socialIconMap[link.platform.toLowerCase()] || 'fas fa-link';
                const platform = link.platform.toLowerCase();
                return `
                    <a 
                        href="${link.url}" 
                        class="social-link" 
                        data-platform="${platform}"
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="${link.platform} profile"
                        title="Visit my ${link.platform} profile"
                    >
                        <i class="${iconClass}" aria-hidden="true"></i>
                    </a>
                `;
            })
            .join('');
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            this.setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });

        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addListener((e) => {
                if (!localStorage.getItem('theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f1419' : '#ffffff');
        }
        
        // Animate theme transition
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    setupLazyLoading() {
        // Intersection Observer for lazy loading images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    setupAccessibility() {
        // Keyboard navigation for buttons and links
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const target = e.target;
                if (target.classList.contains('btn') || target.classList.contains('social-link')) {
                    e.preventDefault();
                    target.click();
                }
            }
        });

        // Skip to main content link
        this.addSkipLink();
    }

    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--accent-color);
            color: white;
            padding: 8px;
            z-index: 1000;
            text-decoration: none;
            border-radius: 4px;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    updateFooter() {
        const currentYearElement = document.getElementById('currentYear');
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear();
        }

        // Update contact email in footer
        const footerEmail = document.querySelector('.footer #contactEmail');
        if (footerEmail && this.profileData) {
            footerEmail.href = `mailto:${this.profileData.email}`;
            footerEmail.textContent = this.profileData.email;
        }
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #e74c3c;
            color: white;
            padding: 16px;
            border-radius: 8px;
            z-index: 1000;
            max-width: 300px;
        `;
        errorDiv.textContent = message;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // Utility method for smooth scrolling
    static smoothScrollTo(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Utility method for analytics tracking (for future use)
    static trackEvent(eventName, eventData = {}) {
        // Placeholder for analytics tracking
        console.log('Event tracked:', eventName, eventData);
        
        // Example: Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
    }
}

// ===================================
// Performance and Optimization
// ===================================

// Debounce function for search and resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===================================
// Initialize Application
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the personal site
    new PersonalSite();
    
    // Hide loading spinner if it exists
    const loading = document.getElementById('loading');
    if (loading) {
        setTimeout(() => {
            loading.style.display = 'none';
        }, 1000);
    }
});

// Handle page visibility changes (for performance)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden - pause non-essential operations
        console.log('Page hidden - pausing operations');
    } else {
        // Page is visible - resume operations
        console.log('Page visible - resuming operations');
    }
});

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // You could send this to an error reporting service
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PersonalSite, debounce, throttle };
}