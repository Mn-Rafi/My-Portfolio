# Personal GitHub Pages Site

[![Deploy to GitHub Pages](https://github.com/yourusername/yourrepo/actions/workflows/deploy.yml/badge.svg)](https://github.com/yourusername/yourrepo/actions/workflows/deploy.yml)

> A lightweight, mobile-first static site for showcasing personal brand and affiliate products.

## 🎯 Overview

This project creates a professional personal website with:
- Clean, modern design optimized for mobile devices
- Personal bio and social media integration
- Curated affiliate product showcase
- Easy content management through JSON files
- Automated deployment to GitHub Pages

## 📱 Live Demo

Visit the live site: [https://yourusername.github.io/yourrepo](https://yourusername.github.io/yourrepo)

## ✨ Features

### Core Functionality
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Fast Performance**: Optimized assets and lazy-loaded images
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **SEO Ready**: Proper meta tags and structured data

### Content Management
- **JSON-Based**: Easy updates through simple JSON files
- **No Build Step**: Pure HTML/CSS/JS - deploys instantly
- **Image Optimization**: Automatic fallbacks and lazy loading
- **Search & Filter**: Real-time product filtering and search

### Affiliate Features
- **Product Showcase**: Beautiful grid layout for affiliate items
- **Rich Attachments**: Support for PDFs, images, and downloads
- **Analytics Ready**: Built-in event tracking for performance monitoring
- **Legal Compliance**: Proper affiliate disclosure footer

## 🚀 Quick Setup

### 1. Get Started
```bash
# Fork this repository on GitHub
# Clone to your local machine
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

### 2. Customize Content
Edit these key files:
- `data/profile.json` - Your personal information
- `data/affiliates.json` - Your affiliate products
- Replace `assets/images/profile.jpg` with your photo

### 3. Deploy
```bash
# Push to GitHub
git add .
git commit -m "Initial customization"
git push origin main

# Enable GitHub Pages in repository settings
# Go to Settings → Pages → Source: GitHub Actions
```

## 📝 Content Management

### Personal Profile (`data/profile.json`)
```json
{
  "name": "Your Name",
  "tagline": "Your Professional Tagline",
  "bio": "Your bio text...",
  "email": "your.email@example.com",
  "profileImage": "assets/images/profile.jpg",
  "socialLinks": [
    {
      "platform": "LinkedIn",
      "url": "https://linkedin.com/in/yourprofile"
    }
  ]
}
```

### Affiliate Products (`data/affiliates.json`)
```json
{
  "products": [
    {
      "id": "unique-product-id",
      "title": "Product Name",
      "description": "Brief description",
      "image": "assets/images/product.jpg",
      "price": "$49.99",
      "affiliateLink": "https://your-affiliate-link.com",
      "ctaText": "Buy Now",
      "tags": ["category1", "category2"],
      "attachments": [
        {
          "name": "User Guide",
          "url": "assets/files/guide.pdf",
          "type": "pdf"
        }
      ]
    }
  ]
}
```

## 🎨 Customization

### Styling
The site uses CSS custom properties for easy theming:
```css
:root {
  --accent-color: #3498db;    /* Primary brand color */
  --text-primary: #2c3e50;   /* Main text color */
  --background-primary: #fff; /* Background color */
}
```

### Adding New Pages
1. Create HTML file in root directory
2. Follow existing template structure
3. Update navigation in both `index.html` and `affiliates.html`

### Custom Functionality
- JavaScript modules in `assets/js/`
- Event tracking ready for Google Analytics
- Extensible class-based architecture

## 📊 Analytics & Tracking

The site includes built-in event tracking for:
- Affiliate link clicks
- Product page views
- Search queries
- Filter usage
- File downloads

Connect your Google Analytics:
```html
<!-- Add to <head> section -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔮 Future Portfolio Conversion

This site is designed to easily expand into a full portfolio:

### Planned Features
- Projects showcase page
- Resume download functionality
- Blog/articles section
- Contact form with backend
- Advanced filtering and search

### Implementation Guide
1. Add `projects.html` page
2. Create `data/projects.json` file
3. Extend CSS and JavaScript modules
4. Update navigation menu

## 🛠️ Development

### Local Development
```bash
# Simple HTTP server
python3 -m http.server 8000
# or
npx serve .
# or
php -S localhost:8000

# Visit http://localhost:8000
```

### Project Structure
```
├── index.html              # Home page
├── affiliates.html         # Products page
├── assets/
│   ├── css/style.css      # Main stylesheet
│   ├── js/
│   │   ├── main.js        # Core functionality
│   │   └── affiliates.js  # Product page logic
│   ├── images/            # Profile and product images
│   └── files/             # Downloadable attachments
├── data/
│   ├── profile.json       # Personal information
│   └── affiliates.json    # Product data
├── .github/workflows/
│   └── deploy.yml         # GitHub Actions deployment
└── README.md
```

### Code Quality
- ES6+ JavaScript with modern browser support
- Mobile-first responsive CSS
- Semantic HTML5 structure
- Accessible design patterns
- Performance optimized

## 📜 Legal & Compliance

### Affiliate Disclosure
The site includes compliant affiliate disclosure in the footer:
> "This site contains affiliate links. I may earn a commission from purchases made through these links at no additional cost to you."

### Privacy
- No cookies or tracking without consent
- No personal data collection
- Client-side only functionality
- GDPR considerations for future expansion

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💡 Inspiration

Built for content creators, influencers, and professionals who want:
- A professional web presence
- Monetization through affiliate marketing
- Easy content management
- Fast, reliable hosting via GitHub Pages

---

**Ready to launch your personal brand?** [Fork this repository](https://github.com/yourusername/portfolio/fork) and start customizing!

---

*Built with ❤️ and modern web standards*