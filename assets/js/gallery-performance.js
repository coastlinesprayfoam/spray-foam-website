// Gallery Performance Optimization Script
class GalleryPerformanceMonitor {
  constructor() {
    this.metrics = {
      loadTimes: [],
      imageLoadTimes: [],
      renderTimes: [],
      interactionTimes: []
    };
    this.init();
  }

  init() {
    // Monitor Core Web Vitals
    this.observeWebVitals();
    
    // Monitor image loading performance
    this.observeImageLoading();
    
    // Monitor user interactions
    this.observeInteractions();
    
    // Report performance data
    this.setupReporting();
  }

  // Observe Core Web Vitals
  observeWebVitals() {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
        this.metrics.lcp = lastEntry.startTime;
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          console.log('FID:', entry.processingStart - entry.startTime);
          this.metrics.fid = entry.processingStart - entry.startTime;
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        console.log('CLS:', clsValue);
        this.metrics.cls = clsValue;
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  }

  // Monitor image loading performance
  observeImageLoading() {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const startTime = performance.now();
          
          img.addEventListener('load', () => {
            const loadTime = performance.now() - startTime;
            this.metrics.imageLoadTimes.push(loadTime);
            console.log(`Image loaded in ${loadTime.toFixed(2)}ms:`, img.src);
          });
          
          imageObserver.unobserve(img);
        }
      });
    });

    // Observe all gallery images
    document.addEventListener('DOMContentLoaded', () => {
      const images = document.querySelectorAll('.gallery-image');
      images.forEach(img => imageObserver.observe(img));
    });
  }

  // Monitor user interactions
  observeInteractions() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.gallery-item')) {
        const startTime = performance.now();
        
        // Monitor modal opening time
        const modal = document.getElementById('lightboxModal');
        if (modal) {
          modal.addEventListener('shown.bs.modal', () => {
            const interactionTime = performance.now() - startTime;
            this.metrics.interactionTimes.push(interactionTime);
            console.log(`Modal opened in ${interactionTime.toFixed(2)}ms`);
          }, { once: true });
        }
      }
    });
  }

  // Setup performance reporting
  setupReporting() {
    // Report metrics after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.reportMetrics();
      }, 5000); // Wait 5 seconds for all content to load
    });
  }

  // Report performance metrics
  reportMetrics() {
    const report = {
      lcp: this.metrics.lcp,
      fid: this.metrics.fid,
      cls: this.metrics.cls,
      avgImageLoadTime: this.calculateAverage(this.metrics.imageLoadTimes),
      avgInteractionTime: this.calculateAverage(this.metrics.interactionTimes),
      totalImages: this.metrics.imageLoadTimes.length,
      timestamp: new Date().toISOString()
    };

    console.log('Gallery Performance Report:', report);
    
    // Send to analytics (if configured)
    if (window.gtag) {
      window.gtag('event', 'gallery_performance', {
        custom_parameter_lcp: report.lcp,
        custom_parameter_fid: report.fid,
        custom_parameter_cls: report.cls
      });
    }
  }

  // Calculate average from array
  calculateAverage(arr) {
    return arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
  }
}

// Image Optimization Utilities
class ImageOptimizer {
  static supportsWebP() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  static generateResponsiveSrc(baseSrc, sizes = [400, 800, 1200]) {
    const extension = baseSrc.split('.').pop();
    const baseName = baseSrc.replace(`.${extension}`, '');
    
    return sizes.map(size => `${baseName}_${size}w.${extension} ${size}w`).join(', ');
  }

  static createOptimizedImage(src, alt, className = '') {
    const img = document.createElement('img');
    
    // Add WebP support if available
    if (this.supportsWebP()) {
      const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      img.setAttribute('data-webp-src', webpSrc);
    }
    
    img.src = src;
    img.alt = alt;
    img.className = className;
    img.loading = 'lazy';
    img.decoding = 'async';
    
    return img;
  }
}

// Lazy Loading Enhancement
class LazyLoadEnhancer {
  constructor() {
    this.observer = null;
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        {
          rootMargin: '50px 0px',
          threshold: 0.1
        }
      );
      
      this.observeImages();
    }
  }

  observeImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => this.observer.observe(img));
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        this.loadImage(img);
        this.observer.unobserve(img);
      }
    });
  }

  loadImage(img) {
    const startTime = performance.now();
    
    // Load WebP if supported and available
    const webpSrc = img.getAttribute('data-webp-src');
    const fallbackSrc = img.getAttribute('data-src');
    
    if (webpSrc && ImageOptimizer.supportsWebP()) {
      img.src = webpSrc;
    } else {
      img.src = fallbackSrc;
    }
    
    img.addEventListener('load', () => {
      const loadTime = performance.now() - startTime;
      img.classList.add('loaded');
      console.log(`Lazy image loaded in ${loadTime.toFixed(2)}ms`);
    });
    
    img.addEventListener('error', () => {
      // Fallback to original format if WebP fails
      if (img.src === webpSrc) {
        img.src = fallbackSrc;
      }
    });
  }
}

// Initialize performance monitoring
document.addEventListener('DOMContentLoaded', () => {
  new GalleryPerformanceMonitor();
  new LazyLoadEnhancer();
});

// Export for use in other scripts
window.GalleryPerformanceMonitor = GalleryPerformanceMonitor;
window.ImageOptimizer = ImageOptimizer;
window.LazyLoadEnhancer = LazyLoadEnhancer;
