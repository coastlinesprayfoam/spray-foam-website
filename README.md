# Coastline Spray Foam Website

A professional, modern website for Coastline Spray Foam - Florida's premier spray foam insulation contractor.

## 🌟 Features

### Modern Design & Performance
- **Responsive Design**: Perfect on all devices (mobile, tablet, desktop)
- **Fast Loading**: Optimized images with smart lazy loading and service worker caching
- **Modern Framework**: Bootstrap 5 with custom CSS and advanced performance optimizations
- **Professional Styling**: Clean, conversion-focused design with light/dark mode support
- **Accessibility**: WCAG compliant with skip navigation and ARIA labels

### Comprehensive Content
- **Homepage**: Hero section with energy savings focus and authentic Google reviews
- **Services**: Detailed residential, commercial, and emergency services
- **Gallery**: 60+ real project photos with filtering system and lazy loading
- **About**: Company story and team information
- **Contact**: Professional contact forms and business information
- **Blog**: Expert articles and energy-saving tips
- **Service Areas**: Detailed coverage across Central Florida
- **Legal Pages**: Privacy policy, terms of service, and warranty information

### SEO & Marketing Optimized
- **Local SEO**: Optimized for Florida spray foam searches with geo meta tags
- **Meta Tags**: Comprehensive SEO optimization with enhanced robots directives
- **Structured Data**: Schema.org markup for search engines
- **Open Graph**: Social media sharing optimization
- **AI Search Ready**: Optimized for modern search algorithms
- **Performance**: Service worker caching and resource optimization

### Business Features
- **Real Project Gallery**: Actual photos from completed projects with metadata
- **Authentic Reviews**: Real Google Reviews from verified customers
- **Professional Contact Forms**: Lead generation optimized with validation
- **Emergency Service**: 24/7 availability emphasis
- **Warranty Information**: Comprehensive lifetime warranty details
- **Service Area Coverage**: Orlando, Melbourne, Cocoa, Titusville, and more

## 📁 File Structure

```
├── index.html              # Homepage
├── about.html              # About page
├── services.html           # Services page
├── gallery.html            # Project gallery
├── contact.html            # Contact page
├── blog.html               # Blog and resources
├── service-areas.html      # Service coverage areas
├── privacy-policy.html     # Privacy policy
├── terms-of-service.html   # Terms of service
├── warranty.html           # Warranty information
├── assets/
│   ├── css/
│   │   └── style.css       # Custom CSS framework
│   ├── js/
│   │   └── gallery.js      # Gallery functionality
│   └── images/             # Project photos (60+ images)
└── README.md               # This file
```

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/eric4479/spray-foam-website.git
   cd spray-foam-website
   ```

2. **Serve locally**
    For a stable, exact match of the live site we recommend serving the repository root static files.

    See `SERVE.md` for one-click PowerShell helper and alternative commands.

    Quick examples:
    ```pwsh
    # Using included helper (PowerShell)
    ./serve-local.ps1

    # Or manually with Python
    python -m http.server 4322

    # Or with Node (if you prefer)
    npx serve . -l 4322
    ```

 3. **Open in browser**
    ```
    http://localhost:4322
    ```

## 🎨 Design System

### Color Palette
- **Primary**: Deep Navy (#0f172a)
- **Secondary**: Professional Orange (#f97316)
- **Accent**: Success Green (#059669)
- **Neutral**: Gray scale (#f8fafc to #0f172a)

### Typography
- **Font**: Inter (Google Fonts)
- **Responsive**: Clamp-based sizing
- **Hierarchy**: Clear heading structure

### Components
- **Service Cards**: Hover effects and animations
- **Gallery**: Filtering and lightbox functionality
- **Forms**: Professional styling with validation
- **Navigation**: Fixed navbar with scroll effects

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+
- **Large**: 1200px+

## 🔧 Technical Features

### Performance Optimizations
- **Service Worker**: Offline caching and performance improvements
- **Resource Hints**: DNS prefetch, preload, and preconnect optimizations
- **Lazy Loading**: Images load only when needed with Intersection Observer
- **Optimized Assets**: Compressed images and efficient CSS
- **Async Loading**: Non-blocking font and script loading
- **Critical CSS**: Above-the-fold optimization

### SEO Enhancements
- **Enhanced Meta Tags**: Comprehensive SEO with geo-targeting
- **Structured Data**: Local business schema with service areas
- **Canonical URLs**: Proper URL structure and duplicate prevention
- **Open Graph**: Social media optimization
- **Robots Directives**: Advanced crawling instructions
- **Local SEO**: Geographic targeting for Florida markets

### Accessibility Compliance
- **WCAG 2.1**: Level AA compliance
- **Skip Navigation**: Keyboard accessibility
- **ARIA Labels**: Comprehensive screen reader support
- **Semantic HTML**: Proper document structure
- **Color Contrast**: High contrast ratios
- **Focus Management**: Keyboard navigation support

## 📞 Business Information

- **Phone**: (321) 652-7465
- **Email**: info@coastlinesprayfoam.com
- **Service Areas**: Orlando, Melbourne, Cocoa, Titusville, Central Florida
- **Hours**: Mon-Fri 7AM-7PM, Sat 8AM-6PM, Emergency 24/7

## 🛡️ Legal Pages

- **Privacy Policy**: Comprehensive privacy protection
- **Terms of Service**: Professional service terms
- **Warranty Information**: Lifetime warranty details

## 📈 Analytics Ready

The website is prepared for:
- Google Analytics 4
- Google Search Console
- Facebook Pixel
- Local business tracking

## 🚀 Deployment

### GitHub Pages
1. Enable GitHub Pages in repository settings
2. Select source branch (main)
3. Website will be available at: `https://eric4479.github.io/spray-foam-website/`

### Custom Domain
1. Add CNAME file with your domain
2. Configure DNS settings
3. Enable HTTPS in GitHub Pages settings

## � Deploy & redirects (recommended)

This repository prefers canonical, folder-style URLs (for example `/service-areas/` and `/blog/`) because they are cleaner and play nicely with modern static-site generators and CDNs.

Compatibility approach used here:
- Server-side redirects: We add platform `_redirects` rules in `astro-website/public/_redirects` so Cloudflare Pages / Netlify will issue 301 redirects from legacy flat `.html` links to the canonical folder routes.
- Static fallback pages: For maximum compatibility (older links, crawlers, or edge cases), lightweight static redirect pages like `astro-website/public/blog.html` and `astro-website/public/service-areas.html` are also included. These are copied into `dist/` and served directly if the platform doesn't use `_redirects`.

Publish steps (stable static pages):
```pwsh
cd astro-website
npm ci
npm run build
# Upload contents of astro-website/dist to your static host (Netlify, Cloudflare Pages, S3+CloudFront, etc.)
```

If you prefer to rely only on server redirects, remove the corresponding `public/*.html` redirect pages and keep `_redirects` updated. I recommend keeping both for safety unless you control all inbound links and redirects at the CDN level.


## �📝 License

This website is proprietary to Coastline Spray Foam. All rights reserved.

## 🤝 Contributing

This is a business website. For updates or modifications, please contact the development team.

---

**Built with ❤️ for Coastline Spray Foam - Florida's Premier Spray Foam Insulation Experts**

New Codebase” section pointing at https://github.com/eric4479/coastline-astro