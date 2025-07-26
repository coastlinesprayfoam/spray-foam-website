# 🚀 Deploy Coastline Spray Foam Website to GitHub Pages

## Quick Setup Instructions

### Step 1: Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and sign in
2. Click **"+"** → **"New repository"**
3. Repository name: `spray-foam-website`
4. Description: `Professional spray foam insulation website for Coastline Spray Foam`
5. Set to **Public**
6. **DO NOT** initialize with README
7. Click **"Create repository"**

### Step 2: Push Code to GitHub
Run this command in your terminal:
```bash
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select **"GitHub Actions"**
5. The workflow will automatically deploy your site

### Step 4: Access Your Live Website
After deployment (2-3 minutes), your website will be available at:
```
https://eric4479.github.io/spray-foam-website/
```

## 🎯 What's Included

### ✅ Complete Website Files
- **9 HTML Pages**: Homepage, About, Services, Gallery, Contact, Blog, Service Areas, Legal Pages
- **Modern CSS Framework**: Custom Bootstrap 5 implementation
- **60+ Project Images**: Real spray foam installation photos
- **JavaScript Functionality**: Gallery filtering, lazy loading, form handling
- **SEO Optimization**: Meta tags, structured data, Open Graph

### ✅ GitHub Pages Ready
- **GitHub Actions Workflow**: Automatic deployment on push
- **Custom Domain Ready**: Easy to configure custom domain
- **SSL Certificate**: Automatic HTTPS
- **CDN**: Fast global delivery

### ✅ Professional Features
- **Mobile Responsive**: Perfect on all devices
- **Fast Loading**: Optimized images and lazy loading
- **Contact Forms**: Professional lead generation
- **Legal Pages**: Privacy policy, terms, warranty
- **Local SEO**: Florida-focused optimization

## 🔧 Advanced Configuration

### Custom Domain Setup
1. Add a `CNAME` file to the repository root:
   ```
   coastlinesprayfoam.com
   ```
2. Configure DNS with your domain provider:
   ```
   CNAME record: www → eric4479.github.io
   A records: @ → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   ```

### Analytics Setup
Add to `<head>` section of all pages:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Contact Form Integration
Consider integrating with:
- **Netlify Forms** (if moving to Netlify)
- **Formspree** for GitHub Pages
- **EmailJS** for client-side form handling

## 📊 Performance Features

### Already Optimized
- ✅ **Image Optimization**: Lazy loading and proper sizing
- ✅ **CSS Optimization**: Minified and efficient
- ✅ **JavaScript**: Minimal and optimized
- ✅ **SEO**: Comprehensive meta tags and structured data

### Lighthouse Scores Expected
- **Performance**: 90-95
- **Accessibility**: 95-100
- **Best Practices**: 95-100
- **SEO**: 95-100

## 🎨 Customization

### Colors
Edit `assets/css/style.css` CSS variables:
```css
:root {
  --primary-color: #0f172a;
  --secondary-color: #f97316;
  --accent-color: #059669;
}
```

### Content
- **Business Info**: Update phone numbers, addresses, service areas
- **Images**: Replace with actual business photos
- **Services**: Modify service descriptions and pricing
- **Testimonials**: Add real customer reviews

## 🔍 SEO Checklist

### ✅ Already Implemented
- Meta titles and descriptions
- Open Graph tags
- Structured data (Schema.org)
- Canonical URLs
- Image alt tags
- Local business optimization

### Next Steps
- Submit to Google Search Console
- Create Google My Business listing
- Build local citations
- Generate customer reviews

## 📞 Support

For technical issues or customization:
- Check GitHub Issues
- Review deployment logs in Actions tab
- Test locally before pushing changes

---

**🎉 Your professional spray foam website is ready to go live!**
