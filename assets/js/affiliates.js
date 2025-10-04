// ===================================
// Affiliates Page JavaScript
// ===================================

class AffiliatesManager {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.activeFilters = new Set();
        this.searchTerm = '';
        this.allTags = new Set();
        
        this.init();
    }

    async init() {
        try {
            await this.loadProducts();
            this.setupEventListeners();
            this.renderFilterTags();
            this.renderProducts();
            this.hideLoading();
        } catch (error) {
            console.error('Failed to initialize affiliates page:', error);
            this.showError('Failed to load affiliate products');
            this.hideLoading();
        }
    }

    async loadProducts() {
        try {
            const response = await fetch('./data/affiliates.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.products = data.products || [];
            this.filteredProducts = [...this.products];
            
            // Extract all unique tags
            this.products.forEach(product => {
                if (product.tags) {
                    product.tags.forEach(tag => this.allTags.add(tag.toLowerCase()));
                }
            });
            
        } catch (error) {
            console.error('Error loading affiliates data:', error);
            // Fallback data
            this.products = [];
            this.filteredProducts = [];
        }
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                this.searchTerm = e.target.value.toLowerCase().trim();
                this.filterProducts();
            }, 300));
        }

        // Clear search on escape
        if (searchInput) {
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    searchInput.value = '';
                    this.searchTerm = '';
                    this.filterProducts();
                }
            });
        }
    }

    renderFilterTags() {
        const filterTagsContainer = document.getElementById('filterTags');
        if (!filterTagsContainer) return;

        const tagsArray = Array.from(this.allTags).sort();
        
        if (tagsArray.length === 0) {
            filterTagsContainer.innerHTML = '<p class="no-tags">No filter tags available</p>';
            return;
        }

        filterTagsContainer.innerHTML = `
            <button 
                class="filter-tag ${this.activeFilters.size === 0 ? 'active' : ''}" 
                data-tag="all"
                aria-pressed="${this.activeFilters.size === 0}"
            >
                All Products
            </button>
            ${tagsArray.map(tag => `
                <button 
                    class="filter-tag ${this.activeFilters.has(tag) ? 'active' : ''}" 
                    data-tag="${tag}"
                    aria-pressed="${this.activeFilters.has(tag)}"
                >
                    ${this.capitalizeFirst(tag)}
                </button>
            `).join('')}
        `;

        // Add click handlers to filter tags
        filterTagsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-tag')) {
                this.handleFilterClick(e.target);
            }
        });
    }

    handleFilterClick(button) {
        const tag = button.dataset.tag;
        
        if (tag === 'all') {
            this.activeFilters.clear();
        } else {
            if (this.activeFilters.has(tag)) {
                this.activeFilters.delete(tag);
            } else {
                this.activeFilters.add(tag);
            }
        }
        
        this.updateFilterButtons();
        this.filterProducts();
        
        // Track filter usage
        PersonalSite.trackEvent('filter_used', { filter: tag });
    }

    updateFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-tag');
        filterButtons.forEach(button => {
            const tag = button.dataset.tag;
            const isActive = tag === 'all' ? this.activeFilters.size === 0 : this.activeFilters.has(tag);
            
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', isActive);
        });
    }

    filterProducts() {
        this.filteredProducts = this.products.filter(product => {
            // Search filter
            const matchesSearch = !this.searchTerm || 
                product.title.toLowerCase().includes(this.searchTerm) ||
                product.description.toLowerCase().includes(this.searchTerm) ||
                (product.tags && product.tags.some(tag => 
                    tag.toLowerCase().includes(this.searchTerm)
                ));

            // Tag filter
            const matchesFilter = this.activeFilters.size === 0 || 
                (product.tags && product.tags.some(tag => 
                    this.activeFilters.has(tag.toLowerCase())
                ));

            return matchesSearch && matchesFilter;
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

        if (noResults) noResults.style.display = 'none';
        productsGrid.style.display = 'grid';

        productsGrid.innerHTML = this.filteredProducts.map(product => 
            this.createProductCard(product)
        ).join('');

        // Setup lazy loading for product images
        this.setupProductImageLazyLoading();
    }

    createProductCard(product) {
        const attachmentsHtml = product.attachments ? 
            product.attachments.map(attachment => `
                <a 
                    href="${attachment.url}" 
                    class="attachment-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Download ${attachment.name}"
                    onclick="PersonalSite.trackEvent('attachment_download', { product: '${product.id}', attachment: '${attachment.name}' })"
                >
                    <i class="fas fa-${attachment.type === 'pdf' ? 'file-pdf' : 'download'}" aria-hidden="true"></i>
                    ${attachment.name}
                </a>
            `).join('') : '';

        const tagsHtml = product.tags ? 
            product.tags.map(tag => `
                <span class="product-tag">${tag}</span>
            `).join('') : '';

        const priceHtml = product.price ? 
            `<span class="product-price">${product.price}</span>` : '';

        return `
            <article class="product-card" data-product-id="${product.id}">
                <div class="product-image-container">
                    <img 
                        src="${product.image}" 
                        alt="${product.title}"
                        class="product-image"
                        loading="lazy"
                        onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+'"
                    >
                </div>
                <div class="product-content">
                    <div class="product-header">
                        <h3 class="product-title">${product.title}</h3>
                        ${priceHtml}
                    </div>
                    <p class="product-description">${product.description}</p>
                    ${product.tags ? `<div class="product-tags">${tagsHtml}</div>` : ''}
                    ${product.attachments ? `<div class="product-attachments">${attachmentsHtml}</div>` : ''}
                    <div class="product-actions">
                        <a 
                            href="${product.affiliateLink}" 
                            class="btn btn-primary product-cta"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="${product.ctaText || 'View Product'} (opens in new tab)"
                            onclick="PersonalSite.trackEvent('affiliate_click', { product: '${product.id}', title: '${product.title}' })"
                        >
                            ${product.ctaText || 'View Product'}
                            <i class="fas fa-external-link-alt" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            </article>
        `;
    }

    setupProductImageLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        // Image is already loaded due to loading="lazy", just add fade-in effect
                        img.style.opacity = '0';
                        img.style.transition = 'opacity 0.3s ease';
                        
                        img.onload = () => {
                            img.style.opacity = '1';
                        };
                        
                        if (img.complete) {
                            img.style.opacity = '1';
                        }
                        
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px'
            });

            document.querySelectorAll('.product-image').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.display = 'none';
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

    // Public method to add a product (for future admin functionality)
    addProduct(product) {
        this.products.push(product);
        this.filterProducts();
        PersonalSite.trackEvent('product_added', { product: product.id });
    }

    // Public method to remove a product (for future admin functionality)
    removeProduct(productId) {
        this.products = this.products.filter(p => p.id !== productId);
        this.filterProducts();
        PersonalSite.trackEvent('product_removed', { product: productId });
    }
}

// ===================================
// Wishlist functionality (localStorage)
// ===================================

class WishlistManager {
    constructor() {
        this.wishlistKey = 'affiliate-wishlist';
        this.wishlist = this.loadWishlist();
    }

    loadWishlist() {
        try {
            const saved = localStorage.getItem(this.wishlistKey);
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading wishlist:', error);
            return [];
        }
    }

    saveWishlist() {
        try {
            localStorage.setItem(this.wishlistKey, JSON.stringify(this.wishlist));
        } catch (error) {
            console.error('Error saving wishlist:', error);
        }
    }

    addToWishlist(productId) {
        if (!this.wishlist.includes(productId)) {
            this.wishlist.push(productId);
            this.saveWishlist();
            PersonalSite.trackEvent('wishlist_add', { product: productId });
            return true;
        }
        return false;
    }

    removeFromWishlist(productId) {
        const index = this.wishlist.indexOf(productId);
        if (index > -1) {
            this.wishlist.splice(index, 1);
            this.saveWishlist();
            PersonalSite.trackEvent('wishlist_remove', { product: productId });
            return true;
        }
        return false;
    }

    isInWishlist(productId) {
        return this.wishlist.includes(productId);
    }

    getWishlist() {
        return [...this.wishlist];
    }

    clearWishlist() {
        this.wishlist = [];
        this.saveWishlist();
        PersonalSite.trackEvent('wishlist_clear');
    }
}

// ===================================
// Initialize Affiliates Page
// ===================================

// Global instances
let affiliatesManager;
let wishlistManager;

document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on affiliates page
    if (document.getElementById('productsGrid')) {
        affiliatesManager = new AffiliatesManager();
        wishlistManager = new WishlistManager();
    }
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AffiliatesManager, WishlistManager };
}