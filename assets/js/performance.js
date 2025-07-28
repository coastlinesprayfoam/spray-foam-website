// Performance Monitoring and Optimization for Coastline Spray Foam
// Tracks Core Web Vitals and implements performance improvements

class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.init();
  }

  init() {
    // Monitor Core Web Vitals
    this.observeLCP();
    this.observeFID();
    this.observeCLS();
    this.observeFCP();
    this.observeTTFB();
    
    // Implement performance optimizations
    this.lazyLoadImages();
    this.preloadCriticalResources();
    this.optimizeScrolling();
  }

  // Largest Contentful Paint
  observeLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;
        console.log('LCP:', lastEntry.startTime);
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }

  // First Input Delay
  observeFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.metrics.fid = entry.processingStart - entry.startTime;
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      });
      observer.observe({ entryTypes: ['first-input'] });
    }
  }

  // Cumulative Layout Shift
  observeCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.metrics.cls = clsValue;
        console.log('CLS:', clsValue);
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    }
  }

  // First Contentful Paint
  observeFCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = entry.startTime;
            console.log('FCP:', entry.startTime);
          }
        });
      });
      observer.observe({ entryTypes: ['paint'] });
    }
  }

  // Time to First Byte
  observeTTFB() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            this.metrics.ttfb = entry.responseStart - entry.requestStart;
            console.log('TTFB:', entry.responseStart - entry.requestStart);
          }
        });
      });
      observer.observe({ entryTypes: ['navigation'] });
    }
  }

  // Lazy load images for better performance
  lazyLoadImages() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Handle WebP with fallback
            if (img.dataset.webp && this.supportsWebP()) {
              img.src = img.dataset.webp;
            } else if (img.dataset.src) {
              img.src = img.dataset.src;
            }
            
            img.classList.remove('lazy');
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      // Observe all lazy images
      document.querySelectorAll('img[data-src], img[data-webp]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // Check WebP support
  supportsWebP() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  // Preload critical resources
  preloadCriticalResources() {
    const criticalImages = [
      '/assets/images/20240815_121229.jpg'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  // Optimize scrolling performance
  optimizeScrolling() {
    let ticking = false;

    function updateScrollPosition() {
      // Passive scroll optimizations
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  // Get performance metrics
  getMetrics() {
    return this.metrics;
  }

  // Send metrics to analytics (if needed)
  sendMetrics() {
    // Implementation for sending metrics to analytics service
    console.log('Performance Metrics:', this.metrics);
  }
}

// Initialize performance monitoring
document.addEventListener('DOMContentLoaded', () => {
  const monitor = new PerformanceMonitor();
  
  // Send metrics after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      monitor.sendMetrics();
    }, 1000);
  });
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PerformanceMonitor;
}
