# 🚀 Cloudflare Pages Deployment Guide

## 📋 Dashboard Configuration

### **Build Settings (Configure in Cloudflare Dashboard)**

**Framework Preset**: `Astro` (auto-detected)

**Build Command**:
```bash
cd astro-website && npm install && npm run build
```

**Build Output Directory**:
```
astro-website/dist
```

**Root Directory**:
```
/
```

**Node.js Version**: `18` or `20` (latest LTS)

---

## 🔧 **Alternative Manual Configuration**

If auto-detection fails, use these manual settings:

### **Build Settings**
- **Framework**: None (manual configuration)
- **Build Command**: `cd astro-website && npm ci && npm run build`
- **Build Output Directory**: `astro-website/dist`
- **Root Directory**: `/` (repository root)

### **Environment Variables** (if needed)
- `NODE_VERSION`: `20`
- `NPM_FLAGS`: `--production=false`

---

## 📁 **File Structure Expected**

```
repository-root/
├── astro-website/
│   ├── package.json          # Astro dependencies
│   ├── astro.config.mjs      # Astro configuration
│   ├── src/                  # Astro source files
│   ├── public/               # Static assets
│   │   ├── _redirects        # Cloudflare redirects
│   │   └── _headers          # Security headers
│   └── dist/                 # Build output (generated)
├── wrangler.toml             # Simplified configuration
└── README.md
```

---

## 🎯 **Deployment Process**

### **Automatic Deployment**
1. **Push to GitHub**: Changes trigger automatic build
2. **Cloudflare Detects**: Framework and runs build command
3. **Build Process**: 
   - `cd astro-website`
   - `npm install`
   - `npm run build`
4. **Deploy**: Static files from `astro-website/dist`

### **Manual Deployment** (if needed)
```bash
# From repository root
cd astro-website
npm install
npm run build
# Upload dist/ folder to Cloudflare Pages
```

---

## 🔍 **Troubleshooting**

### **Common Issues & Solutions**

**Issue**: "Build command failed"
**Solution**: Ensure Node.js version is 18+ in Cloudflare settings

**Issue**: "Assets not found"
**Solution**: Verify build output directory is `astro-website/dist`

**Issue**: "Redirects not working"
**Solution**: Check `_redirects` file in `astro-website/public/`

**Issue**: "Headers not applied"
**Solution**: Verify `_headers` file in `astro-website/public/`

### **Build Command Variations**
```bash
# Standard build
cd astro-website && npm install && npm run build

# With clean install
cd astro-website && npm ci && npm run build

# With specific Node version
cd astro-website && npm install --production=false && npm run build
```

---

## 📊 **Performance Optimizations**

### **Enabled Features**
- ✅ **Automatic Minification**: HTML, CSS, JS
- ✅ **Brotli Compression**: Smaller file sizes
- ✅ **Global CDN**: Fast worldwide delivery
- ✅ **HTTP/3**: Latest protocol support
- ✅ **Smart Caching**: Optimized cache headers

### **Security Features**
- ✅ **SSL/TLS**: Automatic HTTPS
- ✅ **Security Headers**: XSS, CSRF protection
- ✅ **DDoS Protection**: Cloudflare's network
- ✅ **Bot Management**: Automated threat detection

---

## 🌐 **Domain Configuration**

### **Custom Domain Setup**
1. **Add Domain**: coastlinesprayfoam.com in Cloudflare Pages
2. **DNS Records**: Point to Cloudflare Pages
3. **SSL Certificate**: Automatic provisioning
4. **Redirects**: www → non-www (configured in _redirects)

### **DNS Records Needed**
```
Type: CNAME
Name: coastlinesprayfoam.com
Value: [cloudflare-pages-url]

Type: CNAME  
Name: www
Value: coastlinesprayfoam.com
```

---

## 📈 **Monitoring & Analytics**

### **Available Metrics**
- **Page Views**: Real-time traffic data
- **Performance**: Core Web Vitals
- **Errors**: Build and runtime errors
- **Bandwidth**: Data transfer usage

### **Integration Options**
- **Google Analytics**: Add GA4 tracking code
- **Search Console**: Submit sitemap
- **Uptime Monitoring**: Third-party services

---

## 🚀 **Success Indicators**

### **Deployment Success**
- ✅ Build completes without errors
- ✅ Site loads at coastlinesprayfoam.com
- ✅ All pages accessible
- ✅ Assets loading correctly
- ✅ Redirects working (www → non-www)

### **Performance Targets**
- **Page Load Speed**: < 3 seconds
- **Core Web Vitals**: All green
- **Lighthouse Score**: 90+ overall
- **Mobile Performance**: Optimized

---

## 📞 **Support Resources**

### **If Issues Persist**
1. **Check Build Logs**: Cloudflare Pages dashboard
2. **Verify Configuration**: Compare with this guide
3. **Test Locally**: Run build command locally first
4. **Contact Support**: Cloudflare Pages support

### **Useful Links**
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/cloudflare/)
- [Build Configuration](https://developers.cloudflare.com/pages/platform/build-configuration/)

---

**🎉 Following this guide should resolve the deployment issues and get your Astro website live on Cloudflare Pages! 🎉**
