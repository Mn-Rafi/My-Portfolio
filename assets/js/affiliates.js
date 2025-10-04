// Simplified Affiliates Page JavaScript

class AffiliatesManager {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.searchTerm = '';
        this.isLoading = false;
        this.init();
    }

    async init() {
        try {
            this.showLoading();
            await this.loadProducts();
            this.setupEventListeners();
            this.setupThemeToggle();
            this.renderProducts();
            this.updateFooter();
        } catch (error) {
            console.error('Failed to initialize affiliates page:', error);
            this.showError('Failed to load affiliate products');
        } finally {
            this.hideLoading();
        }
    }

    async loadProducts() {
        try {
            const response = await fetch('./data/affiliates.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            this.products = data.products || [];
            this.filteredProducts = [...this.products];
        } catch (error) {
            console.error('Error loading products:', error);
            this.products = this.getSampleProducts();
            this.filteredProducts = [...this.products];
        }
    }

    getSampleProducts() {
        return [
            {
                id: 1,
                title: "Premium Laptop Stand",
                description: "Ergonomic aluminum laptop stand that improves posture and reduces neck strain. Perfect for long coding sessions.",
                image: "assets/images/logo.png",
                price: "$89.99",
                features: ["Adjustable height and angle", "Premium aluminum construction", "Compatible with all laptop sizes", "Improves ergonomics and airflow"],
                affiliate_url: "https://example.com/laptop-stand",
                badge: "Popular"
            },
            {
                id: 2,
                title: "Resistance Band Set",
                description: "Professional grade resistance bands for effective home workouts. Includes multiple resistance levels.",
                image: "assets/images/logo.png",
                price: "$24.99",
                features: ["5 different resistance levels", "Premium latex material", "Includes door anchor and handles", "Perfect for home workouts"],
                affiliate_url: "https://example.com/resistance-bands"
            },
            {
                id: 3,
                title: "Meditation & Sleep App",
                description: "Premium subscription to a meditation app that has transformed my daily routine and sleep quality.",
                image: "assets/images/logo.png",
                price: "$5.99/month",
                features: ["Guided meditation sessions", "Sleep stories and soundscapes", "Progress tracking", "Offline downloads available"],
                affiliate_url: "https://example.com/meditation-app",
                badge: "Editor's Choice"
            }
        ];
    }

    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        const clearSearch = document.getElementById('clearSearch');

        if (searchInput) {
            searchInput.addEventListener('input', this.debounce((e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.filterAndRenderProducts();
                this.toggleClearSearch();
            }, 300));
        }

        if (clearSearch) {
            clearSearch.addEventListener('click', () => {
                this.clearSearch();
            });
        }
    }

    clearSearch() {
        this.searchTerm = '';
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.value = '';
        this.filterAndRenderProducts();
        this.toggleClearSearch();
    }

    filterAndRenderProducts() {
        this.filteredProducts = this.products.filter(product => {
            if (this.searchTerm === '') return true;
            
            return product.title.toLowerCase().includes(this.searchTerm) ||
                   product.description.toLowerCase().includes(this.searchTerm);
        });
        this.renderProducts();
    }

    renderProducts() {
        const productsGrid = document.getElementById('productsGrid');
        const noResults = document.getElementById('noResults');
        
        if (!productsGrid) return;
        
        if (this.filteredProducts.length === 0) {
            productsGrid.style.display = 'none';
            if (noResults) noResults.style.display = 'block';
            return;
        }

        productsGrid.style.display = 'grid';
        if (noResults) noResults.style.display = 'none';
        
        productsGrid.innerHTML = this.filteredProducts.map(product => this.createProductCard(product)).join('');
    }

    createProductCard(product) {
        const badgeHtml = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';
        const featuresHtml = product.features ? 
            product.features.slice(0, 3).map(feature => `<li>${feature}</li>`).join('') : '';
        
        return `
            <div class="product-card" data-product-id="${product.id}">
                ${badgeHtml}
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy">
                </div>
                <div class="product-content">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">${product.price}</div>
                    <p class="product-description">${product.description}</p>
                    ${featuresHtml ? `<ul class="product-features">${featuresHtml}</ul>` : ''}
                    <div class="product-footer">
                        <a href="${product.affiliate_url || '#'}" 
                           class="btn btn-primary btn-full-width" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           onclick="window.affiliatesManager.trackClick('${product.title}')">
                            Get It Now
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        const updateThemeIcons = (isDark) => {
            const lightIcon = document.getElementById('lightIcon');
            const darkIcon = document.getElementById('darkIcon');
            
            if (lightIcon && darkIcon) {
                lightIcon.style.opacity = isDark ? '0' : '1';
                darkIcon.style.opacity = isDark ? '1' : '0';
            }
        };

        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcons(savedTheme === 'dark');

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcons(newTheme === 'dark');
        });
    }

    toggleClearSearch() {
        const clearSearch = document.getElementById('clearSearch');
        const searchInput = document.getElementById('searchInput');
        if (!clearSearch || !searchInput) return;
        clearSearch.style.display = searchInput.value.length > 0 ? 'block' : 'none';
    }

    updateFooter() {
        const currentYearElement = document.getElementById('currentYear');
        if (currentYearElement) currentYearElement.textContent = new Date().getFullYear();
        
        const contactEmail = document.getElementById('contactEmail');
        if (contactEmail) {
            fetch('./data/profile.json')
                .then(response => response.json())
                .then(data => {
                    if (data.email) {
                        contactEmail.href = `mailto:${data.email}`;
                        contactEmail.textContent = data.email;
                    }
                })
                .catch(() => {
                    contactEmail.href = 'mailto:admin@euphorolink.com';
                    contactEmail.textContent = 'admin@euphorolink.com';
                });
        }
    }

    showLoading() {
        const loading = document.getElementById('loading');
        if (loading) loading.style.display = 'flex';
        this.isLoading = true;
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) loading.style.display = 'none';
        this.isLoading = false;
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; background-color: #e74c3c; color: white; padding: 16px; border-radius: 8px; z-index: 1000; max-width: 300px;';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 5000);
    }

    trackClick(productTitle) {
        console.log('Product clicked:', productTitle);
        if (typeof gtag !== 'undefined') {
            gtag('event', 'affiliate_click', { product_title: productTitle });
        }
    }

    debounce(func, wait) {
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.affiliatesManager = new AffiliatesManager();
});

// Global function for opening modal (if needed in the future)
function openProductModal(productId) {
    if (window.affiliatesManager) {
        console.log('Modal functionality will be added later for product:', productId);
    }
}
