# Personal GitHub Pages Site

A lightweight, mobile-first static site for showcasing personal brand and affiliate products.

## 🚀 Quick Start

1. **Fork this repository**
2. **Enable GitHub Pages**: Go to Settings → Pages → Source: GitHub Actions
3. **Customize your content**:
   - Edit `data/profile.json` for your bio and social links
   - Edit `data/affiliates.json` to add affiliate products
   - Replace `assets/images/profile.jpg` with your photo

## 📁 Project Structure

```
├── index.html          # Home page with bio and social links
├── affiliates.html     # Affiliate products page
├── assets/
│   ├── css/
│   │   └── style.css   # Main stylesheet
│   ├── js/
│   │   └── main.js     # JavaScript functionality
│   └── images/         # Profile and product images
├── data/
│   ├── profile.json    # Your bio and social links
│   └── affiliates.json # Affiliate products data
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions deployment
```

## 🛠️ How to Add/Edit Affiliate Items

1. **Open `data/affiliates.json`**
2. **Add a new item** to the array:

```json
{
  "id": "unique-item-id",
  "title": "Product Name",
  "description": "Brief one-line description",
  "image": "assets/images/product-image.jpg",
  "price": "$49.99",
  "affiliateLink": "https://your-affiliate-link.com",
  "ctaText": "Buy Now",
  "tags": ["electronics", "gadgets"],
  "attachments": [
    {
      "name": "Product Guide",
      "url": "assets/files/product-guide.pdf",
      "type": "pdf"
    }
  ]
}
```

3. **Add product image** to `assets/images/`
4. **Commit and push** - site will auto-deploy!

## 🎨 Customization

### Profile Information
Edit `data/profile.json`:
- Update bio, tagline, email
- Add/remove social links
- Change profile image path

### Styling
- Primary accent color: CSS variable `--accent-color` in `style.css`
- Mobile-first responsive design
- Minimal animations and transitions

### Adding New Pages
1. Create HTML file in root
2. Follow existing template structure
3. Update navigation if needed

## 📱 Features

- **Mobile-first responsive design**
- **Lazy-loaded images** for performance
- **Accessible** - keyboard navigation and alt text
- **Fast loading** - optimized assets
- **Easy updates** - JSON data files
- **Affiliate disclosure** in footer

## 🔮 Future Portfolio Conversion

This site is designed to easily expand into a full portfolio:
1. Add `projects.html` page
2. Create `data/projects.json` 
3. Add resume download functionality
4. Expand navigation menu

## 📜 Legal

Affiliate disclosure is included in the site footer as required by FTC guidelines.

## 🚀 Deploy to GitHub Pages

The site auto-deploys via GitHub Actions when you push to the main branch. No build step required!

### Manual Deployment (if needed)
1. Go to repository Settings
2. Navigate to Pages section
3. Source: Deploy from branch → main → / (root)

## 🛠️ Development

To run locally:
```bash
# Simple HTTP server (Python)
python3 -m http.server 8000

# Or Node.js
npx serve .

# Or PHP
php -S localhost:8000
```

Visit `http://localhost:8000`

---

Built with ❤️ for GitHub Pages