/**
 * Coastline Spray Foam - Gallery Implementation
 * Professional image gallery with lazy loading and filtering
 * @version 1.0.0
 * @author Coastline Spray Foam
 */

/**
 * SprayFoamGallery class for managing project gallery
 * @class
 */
class SprayFoamGallery {
  /**
   * Create a SprayFoamGallery instance
   * @constructor
   */
  constructor() {
    this.images = [];
    this.currentFilter = 'all';
    this.lazyLoadObserver = null;
    this.isInitialized = false;
    this.imageCache = new Map();
    this.preloadQueue = [];
    this.init();
  }

  /**
   * Initialize gallery components
   * @method
   */
  init() {
    try {
      this.loadImageData();
      this.setupLazyLoading();
      this.setupFilterButtons();
      this.setupLightbox();
      this.renderGallery();
      this.setupProgressiveLoading();
      this.isInitialized = true;
      console.log('SprayFoamGallery initialized successfully');
    } catch (error) {
      console.error('Failed to initialize gallery:', error);
    }
  }

  // Load all image data from the images folder
  loadImageData() {
    this.images = [
      // August 2024 Projects
      { src: 'assets/images/20240815_121229.jpg', category: 'residential', type: 'attic', title: 'Orlando Home Attic Project', description: 'Spray foam insulation application in residential attic space', date: '2024-08-15' },
      { src: 'assets/images/20240815_121234.jpg', category: 'residential', type: 'attic', title: 'Attic Insulation Work', description: 'Professional spray foam installation in progress', date: '2024-08-15' },
      { src: 'assets/images/20240815_121238.jpg', category: 'residential', type: 'attic', title: 'Completed Attic Installation', description: 'Finished spray foam insulation providing complete coverage', date: '2024-08-15' },
      { src: 'assets/images/20240815_121249.jpg', category: 'residential', type: 'attic', title: 'Detailed Attic Work', description: 'Close-up view of professional spray foam application', date: '2024-08-15' },
      { src: 'assets/images/20240815_121312.jpg', category: 'residential', type: 'attic', title: 'Attic Insulation Service', description: 'Quality spray foam installation for improved energy efficiency', date: '2024-08-15' },

      { src: 'assets/images/20240830_081517.jpg', category: 'residential', type: 'crawlspace', title: 'Melbourne Crawl Space Work', description: 'Crawl space preparation and spray foam application', date: '2024-08-30' },
      { src: 'assets/images/20240830_081519.jpg', category: 'residential', type: 'crawlspace', title: 'Crawl Space Insulation', description: 'Professional crawl space spray foam installation', date: '2024-08-30' },
      { src: 'assets/images/20240830_081526.jpg', category: 'residential', type: 'crawlspace', title: 'Crawl Space Treatment', description: 'Complete crawl space insulation and sealing work', date: '2024-08-30' },
      { src: 'assets/images/20240830_124715.jpg', category: 'residential', type: 'attic', title: 'Residential Attic Service', description: 'Spray foam insulation installation in home attic', date: '2024-08-30' },
      { src: 'assets/images/20240830_124717.jpg', category: 'residential', type: 'attic', title: 'Attic Foam Application', description: 'Professional spray foam coverage in attic area', date: '2024-08-30' },

      // September 2024 Projects
      { src: 'assets/images/20240905_091406.jpg', category: 'residential', type: 'attic', title: 'Melbourne Attic Installation', description: 'Spray foam insulation work in Melbourne home attic', date: '2024-09-05' },
      { src: 'assets/images/20240905_091428.jpg', category: 'residential', type: 'attic', title: 'Attic Foam Coverage', description: 'Professional spray foam application in attic space', date: '2024-09-05' },
      { src: 'assets/images/20240905_091454.jpg', category: 'residential', type: 'attic', title: 'Attic Insulation Process', description: 'Spray foam installation work in residential attic', date: '2024-09-05' },
      { src: 'assets/images/20240905_091501.jpg', category: 'residential', type: 'attic', title: 'Home Attic Project', description: 'Professional attic insulation installation service', date: '2024-09-05' },
      { src: 'assets/images/20240905_091512.jpg', category: 'residential', type: 'attic', title: 'Attic Spray Foam Work', description: 'Detailed spray foam application in attic area', date: '2024-09-05' },

      { src: 'assets/images/20240910_143434.jpg', category: 'commercial', type: 'warehouse', title: 'Cocoa Warehouse Project', description: 'Commercial spray foam insulation in warehouse facility', date: '2024-09-10' },
      { src: 'assets/images/20240910_143537.jpg', category: 'commercial', type: 'warehouse', title: 'Warehouse Insulation Work', description: 'Large-scale spray foam application in industrial building', date: '2024-09-10' },
      { src: 'assets/images/20240910_153843.jpg', category: 'commercial', type: 'building', title: 'Commercial Building Project', description: 'Professional spray foam installation in commercial space', date: '2024-09-10' },
      { src: 'assets/images/20240910_153845.jpg', category: 'commercial', type: 'building', title: 'Commercial Foam Application', description: 'Spray foam insulation work in commercial building', date: '2024-09-10' },
      { src: 'assets/images/20240910_153854.jpg', category: 'commercial', type: 'building', title: 'Commercial Insulation Service', description: 'Professional insulation installation in commercial property', date: '2024-09-10' },

      // October 2024 Projects
      { src: 'assets/images/20241017_104040.jpg', category: 'residential', type: 'attic', title: 'Cocoa Attic Project', description: 'Spray foam insulation installation in Cocoa home attic', date: '2024-10-17' },
      { src: 'assets/images/20241017_104049.jpg', category: 'residential', type: 'attic', title: 'Attic Insulation Work', description: 'Professional attic spray foam application', date: '2024-10-17' },
      { src: 'assets/images/20241017_104111.jpg', category: 'residential', type: 'attic', title: 'Residential Attic Service', description: 'Quality spray foam installation in home attic', date: '2024-10-17' },
      { src: 'assets/images/20241017_104120.jpg', category: 'residential', type: 'attic', title: 'Attic Foam Installation', description: 'Detailed spray foam work in residential attic space', date: '2024-10-17' },

      // November 2024 Projects
      { src: 'assets/images/20241104_082819.jpg', category: 'residential', type: 'crawlspace', title: 'Titusville Crawl Space Work', description: 'Crawl space spray foam insulation and sealing', date: '2024-11-04' },
      { src: 'assets/images/20241104_104204.jpg', category: 'residential', type: 'attic', title: 'Home Attic Installation', description: 'Professional spray foam application in residential attic', date: '2024-11-04' },
      { src: 'assets/images/20241104_104206.jpg', category: 'residential', type: 'attic', title: 'Attic Insulation Service', description: 'Quality attic insulation work with spray foam', date: '2024-11-04' },

      { src: 'assets/images/20241112_171534.jpg', category: 'commercial', type: 'building', title: 'Commercial Building Work', description: 'Spray foam insulation in commercial building space', date: '2024-11-12' },
      { src: 'assets/images/20241112_171551.jpg', category: 'commercial', type: 'building', title: 'Commercial Insulation Project', description: 'Professional commercial spray foam installation', date: '2024-11-12' },

      { src: 'assets/images/20241118_104157.jpg', category: 'residential', type: 'attic', title: 'Orlando Attic Project', description: 'Spray foam insulation work in Orlando home attic', date: '2024-11-18' },
      { src: 'assets/images/20241118_104208.jpg', category: 'residential', type: 'attic', title: 'Attic Installation Service', description: 'Professional attic spray foam installation work', date: '2024-11-18' },

      { src: 'assets/images/20241119_141629.jpg', category: 'residential', type: 'attic', title: 'Titusville Attic Work', description: 'Spray foam insulation installation in Titusville home', date: '2024-11-19' },
      { src: 'assets/images/20241119_141635.jpg', category: 'residential', type: 'attic', title: 'Home Attic Insulation', description: 'Quality attic insulation work with spray foam', date: '2024-11-19' },

      { src: 'assets/images/20241120_080422.jpg', category: 'residential', type: 'crawlspace', title: 'Melbourne Crawl Space Project', description: 'Crawl space spray foam insulation work in Melbourne', date: '2024-11-20' },
      { src: 'assets/images/20241120_080424.jpg', category: 'residential', type: 'crawlspace', title: 'Crawl Space Insulation', description: 'Professional crawl space spray foam application', date: '2024-11-20' },

      { src: 'assets/images/20241122_162500.jpg', category: 'residential', type: 'attic', title: 'Attic Foam Installation', description: 'Spray foam insulation coverage in attic space', date: '2024-11-22' },
      { src: 'assets/images/20241122_162502.jpg', category: 'residential', type: 'attic', title: 'Residential Attic Project', description: 'Professional attic insulation installation service', date: '2024-11-22' },

      // December 2024 Projects
      { src: 'assets/images/20241202_091324.jpg', category: 'commercial', type: 'warehouse', title: 'Warehouse Insulation Project', description: 'Commercial warehouse spray foam installation work', date: '2024-12-02' },
      { src: 'assets/images/20241202_091334.jpg', category: 'commercial', type: 'warehouse', title: 'Industrial Facility Work', description: 'Spray foam insulation in industrial warehouse space', date: '2024-12-02' },

      { src: 'assets/images/20241203_120401.jpg', category: 'residential', type: 'attic', title: 'December Attic Work', description: 'Residential attic spray foam installation project', date: '2024-12-03' },
      { src: 'assets/images/20241203_120416.jpg', category: 'residential', type: 'attic', title: 'Home Attic Project', description: 'Professional attic insulation installation service', date: '2024-12-03' },

      // 2025 Projects
      { src: 'assets/images/20250207_133556.jpg', category: 'residential', type: 'attic', title: 'February Attic Project', description: 'Residential attic spray foam installation work', date: '2025-02-07' },
      { src: 'assets/images/20250207_133602.jpg', category: 'residential', type: 'attic', title: 'Home Insulation Work', description: 'Professional home attic insulation service', date: '2025-02-07' },

      { src: 'assets/images/20250215_130453.jpg', category: 'residential', type: 'attic', title: 'Mid-February Attic Work', description: 'Spray foam insulation installation in home attic', date: '2025-02-15' },
      { src: 'assets/images/20250215_130505.jpg', category: 'residential', type: 'attic', title: 'Residential Attic Service', description: 'Quality attic insulation work with spray foam', date: '2025-02-15' },

      { src: 'assets/images/20250222_100359.jpg', category: 'residential', type: 'crawlspace', title: 'February Crawl Space Work', description: 'Crawl space spray foam insulation installation', date: '2025-02-22' },
      { src: 'assets/images/20250222_100402.jpg', category: 'residential', type: 'crawlspace', title: 'Crawl Space Insulation', description: 'Professional crawl space spray foam work', date: '2025-02-22' },

      { src: 'assets/images/20250228_150402.jpg', category: 'residential', type: 'attic', title: 'February Attic Work', description: 'Residential attic spray foam installation', date: '2025-02-28' },
      { src: 'assets/images/20250228_150409.jpg', category: 'residential', type: 'attic', title: 'Month-End Attic Project', description: 'Professional attic insulation installation work', date: '2025-02-28' },

      { src: 'assets/images/20250307_090153.jpg', category: 'commercial', type: 'building', title: 'March Commercial Work', description: 'Commercial building spray foam installation', date: '2025-03-07' },
      { src: 'assets/images/20250307_090219.jpg', category: 'commercial', type: 'building', title: 'Commercial Building Project', description: 'Professional commercial spray foam work', date: '2025-03-07' },

      { src: 'assets/images/20250318_155724.jpg', category: 'residential', type: 'attic', title: 'March Home Attic Work', description: 'Spray foam insulation work in home attic', date: '2025-03-18' },
      { src: 'assets/images/20250318_155800.jpg', category: 'residential', type: 'attic', title: 'Residential Attic Project', description: 'Professional residential attic insulation service', date: '2025-03-18' },

      { src: 'assets/images/20250327_103016.jpg', category: 'residential', type: 'attic', title: 'Late March Attic Work', description: 'Residential attic spray foam installation', date: '2025-03-27' },
      { src: 'assets/images/20250327_103021.jpg', category: 'residential', type: 'attic', title: 'Attic Insulation Service', description: 'Quality attic insulation work with spray foam', date: '2025-03-27' },

      { src: 'assets/images/20250331_095845.jpg', category: 'residential', type: 'crawlspace', title: 'March Crawl Space Work', description: 'Professional crawl space treatment and sealing', date: '2025-03-31' },
      { src: 'assets/images/20250331_095847.jpg', category: 'residential', type: 'crawlspace', title: 'End of March Project', description: 'End of March crawl space insulation project', date: '2025-03-31' },

      { src: 'assets/images/20250429_182156.jpg', category: 'residential', type: 'attic', title: 'April Home Attic Project', description: 'Residential attic spray foam service in April', date: '2025-04-29' },
      { src: 'assets/images/20250429_182211.jpg', category: 'residential', type: 'attic', title: 'Spring Attic Upgrade', description: 'Spring season attic energy upgrade', date: '2025-04-29' },

      { src: 'assets/images/20250430_102147.jpg', category: 'residential', type: 'attic', title: 'April Month-End Project', description: 'Finished residential attic insulation project', date: '2025-04-30' },
      { src: 'assets/images/20250430_102153.jpg', category: 'residential', type: 'attic', title: 'Completed Attic Work', description: 'Completed residential attic insulation work', date: '2025-04-30' },

      { src: 'assets/images/20250514_105326.jpg', category: 'commercial', type: 'warehouse', title: 'May Industrial Facility', description: 'Large-scale industrial insulation project', date: '2025-05-14' },
      { src: 'assets/images/20250514_105329.jpg', category: 'commercial', type: 'warehouse', title: 'Industrial Spray Foam Work', description: 'Industrial facility spray foam insulation', date: '2025-05-14' },

      { src: 'assets/images/20250515_160701.jpg', category: 'residential', type: 'attic', title: 'Mid-May Home Project', description: 'Latest residential insulation work in May', date: '2025-05-15' },
      { src: 'assets/images/20250515_160706.jpg', category: 'residential', type: 'attic', title: 'Recent Attic Installation', description: 'Recent professional attic insulation installation', date: '2025-05-15' },

      { src: 'assets/images/20250611_124053.jpg', category: 'residential', type: 'attic', title: 'June Summer Project', description: 'Beat the heat with proper attic insulation', date: '2025-06-11' },
      { src: 'assets/images/20250611_124101.jpg', category: 'residential', type: 'attic', title: 'Summer Insulation Project', description: 'Summer season energy efficiency project', date: '2025-06-11' },

      { src: 'assets/images/20250612_083008.jpg', category: 'residential', type: 'crawlspace', title: 'June Crawl Space Solution', description: 'Complete crawl space insulation and moisture control', date: '2025-06-12' },
      { src: 'assets/images/20250612_083011.jpg', category: 'residential', type: 'crawlspace', title: 'Summer Crawl Space Work', description: 'Summer season crawl space improvement project', date: '2025-06-12' },

      // Special Projects
      { src: 'assets/images/IMG_20240903_085940.jpg', category: 'residential', type: 'attic', title: 'Special Residential Project', description: 'Special residential attic insulation project', date: '2024-09-03' },
      { src: 'assets/images/IMG_20240903_085943.jpg', category: 'residential', type: 'attic', title: 'Custom Home Insulation', description: 'Custom home insulation solution', date: '2024-09-03' },
      { src: 'assets/images/IMG_20250517_200504.jpg', category: 'residential', type: 'attic', title: 'Evening Project Completion', description: 'Evening completion of residential project', date: '2025-05-17' },
      { src: 'assets/images/IMG_20250517_200508.jpg', category: 'residential', type: 'attic', title: 'Late Day Installation', description: 'Late day professional installation work', date: '2025-05-17' }
    ];
  }

  // Setup optimized lazy loading for images
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      this.lazyLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            this.loadImageOptimized(img);
            this.lazyLoadObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '100px 0px', // Increased for better preloading
        threshold: 0.01
      });
    }
  }

  // Optimized image loading with error handling and fade-in effect
  loadImageOptimized(img) {
    const src = img.dataset.src;
    if (!src) return;

    // Create a new image to preload
    const newImg = new Image();

    newImg.onload = () => {
      // Image loaded successfully
      img.src = src;
      img.classList.remove('lazy');
      img.classList.add('loaded');

      // Add fade-in effect
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease-in-out';

      // Trigger fade-in
      requestAnimationFrame(() => {
        img.style.opacity = '1';
      });
    };

    newImg.onerror = () => {
      // Handle image load error
      img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23f1f5f9"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8"%3EImage not available%3C/text%3E%3C/svg%3E';
      img.classList.remove('lazy');
      img.classList.add('error');
    };

    // Start loading
    newImg.src = src;
  }

  // Setup filter buttons
  setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Update active button
        filterButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        // Update filter and re-render
        this.currentFilter = e.target.getAttribute('data-filter');
        this.renderGallery();
      });
    });
  }

  // Setup lightbox functionality
  setupLightbox() {
    // Lightbox will be handled by Bootstrap modal
  }

  // Enhanced gallery rendering with SEO optimization
  renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    // Check if we have static content (for SEO)
    const hasStaticContent = galleryGrid.querySelector('.gallery-item img[src*="assets/images"]');

    if (hasStaticContent && this.currentFilter === 'all') {
      // Keep static content visible for SEO, just add dynamic content
      this.enhanceStaticGallery();
      return;
    }

    // Filter images for dynamic rendering
    const filteredImages = this.currentFilter === 'all'
      ? this.images
      : this.images.filter(img =>
          img.category === this.currentFilter ||
          img.type === this.currentFilter
        );

    // Show loading indicator
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator) {
      loadingIndicator.style.display = 'block';
    }

    // Use DocumentFragment for better performance
    const fragment = document.createDocumentFragment();

    // Render filtered images in optimized batches
    const batchSize = 8; // Reduced for better performance
    let currentBatch = 0;

    const renderBatch = () => {
      const start = currentBatch * batchSize;
      const end = Math.min(start + batchSize, filteredImages.length);

      for (let i = start; i < end; i++) {
        const galleryItem = this.createGalleryItem(filteredImages[i], i);
        fragment.appendChild(galleryItem);
      }

      currentBatch++;

      if (end < filteredImages.length) {
        // Schedule next batch with delay for better UX
        setTimeout(() => requestAnimationFrame(renderBatch), 50);
      } else {
        // All items rendered, update DOM
        if (this.currentFilter !== 'all') {
          galleryGrid.innerHTML = '';
        }
        galleryGrid.appendChild(fragment);

        // Hide loading indicator
        if (loadingIndicator) {
          loadingIndicator.style.display = 'none';
        }

        // Setup lazy loading for new images
        if (this.lazyLoadObserver) {
          const lazyImages = galleryGrid.querySelectorAll('img.lazy');
          lazyImages.forEach(img => this.lazyLoadObserver.observe(img));
        }

        // Trigger fade-in animation
        this.animateGalleryItems();
      }
    };

    // Start rendering
    requestAnimationFrame(renderBatch);
  }

  // Enhance static gallery with dynamic features
  enhanceStaticGallery() {
    const staticImages = document.querySelectorAll('.gallery-item img[src*="assets/images"]');

    // Add lazy loading to static images if needed
    staticImages.forEach(img => {
      if (!img.classList.contains('enhanced')) {
        img.classList.add('enhanced');

        // Add intersection observer for analytics
        if (this.lazyLoadObserver) {
          this.lazyLoadObserver.observe(img);
        }
      }
    });

    // Add remaining dynamic images
    const staticImageSrcs = Array.from(staticImages).map(img => img.src);
    const remainingImages = this.images.filter(image =>
      !staticImageSrcs.some(src => src.includes(image.src.split('/').pop()))
    );

    if (remainingImages.length > 0) {
      this.renderAdditionalImages(remainingImages);
    }
  }

  // Render additional images beyond static content
  renderAdditionalImages(images) {
    const galleryGrid = document.getElementById('galleryGrid');
    const loadingIndicator = document.getElementById('loadingIndicator');

    if (loadingIndicator) {
      loadingIndicator.style.display = 'block';
    }

    const fragment = document.createDocumentFragment();

    // Render in smaller batches for better performance
    images.slice(0, 12).forEach((image, index) => {
      const galleryItem = this.createGalleryItem(image, index + 6);
      fragment.appendChild(galleryItem);
    });

    // Insert before loading indicator
    if (loadingIndicator) {
      galleryGrid.insertBefore(fragment, loadingIndicator);
      loadingIndicator.style.display = 'none';
    } else {
      galleryGrid.appendChild(fragment);
    }

    // Setup lazy loading
    if (this.lazyLoadObserver) {
      const newImages = galleryGrid.querySelectorAll('img.lazy:not(.observed)');
      newImages.forEach(img => {
        img.classList.add('observed');
        this.lazyLoadObserver.observe(img);
      });
    }
  }

  // Add animation to gallery items
  animateGalleryItems() {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';

      setTimeout(() => {
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  // Create individual gallery item with optimized loading
  createGalleryItem(image, index) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 filter-item';

    // Generate optimized placeholder with proper aspect ratio
    const placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23f8fafc"/%3E%3Ctext x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-size="14"%3ELoading...%3C/text%3E%3Ctext x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" fill="%23cbd5e1" font-size="12"%3E' + image.title.substring(0, 20) + '...%3C/text%3E%3C/svg%3E';

    col.innerHTML = `
      <div class="gallery-item position-relative"
           data-bs-toggle="modal"
           data-bs-target="#lightboxModal"
           onclick="gallery.openLightbox('${image.src}', '${this.escapeHtml(image.title)}', '${this.escapeHtml(image.description)}', '${image.date}')">
        <img src="${placeholder}"
             data-src="${image.src}"
             alt="${this.escapeHtml(image.title)}"
             class="lazy gallery-image"
             loading="lazy"
             decoding="async"
             width="400"
             height="300"
             style="aspect-ratio: 4/3; object-fit: cover;">
        <div class="gallery-overlay">
          <h5>${this.escapeHtml(image.title)}</h5>
          <p class="small">${this.escapeHtml(image.description)}</p>
          <small class="mt-2 opacity-75">${new Date(image.date).toLocaleDateString()}</small>
        </div>
      </div>
    `;

    return col;
  }

  // Escape HTML to prevent XSS
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Preload critical images for better performance
  preloadCriticalImages() {
    // Preload first 6 images (above the fold)
    const criticalImages = this.images.slice(0, 6);

    criticalImages.forEach(image => {
      if (!this.imageCache.has(image.src)) {
        const img = new Image();
        img.onload = () => {
          this.imageCache.set(image.src, true);
        };
        img.src = image.src;
      }
    });
  }

  // Progressive image loading for better perceived performance
  setupProgressiveLoading() {
    // Start preloading after initial render
    setTimeout(() => {
      this.preloadCriticalImages();
    }, 100);

    // Preload more images on scroll
    let preloadTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(preloadTimeout);
      preloadTimeout = setTimeout(() => {
        this.preloadNextBatch();
      }, 150);
    });
  }

  // Preload next batch of images
  preloadNextBatch() {
    const visibleImages = document.querySelectorAll('.gallery-item img.loaded');
    const nextStartIndex = visibleImages.length;
    const nextBatch = this.images.slice(nextStartIndex, nextStartIndex + 6);

    nextBatch.forEach(image => {
      if (!this.imageCache.has(image.src)) {
        const img = new Image();
        img.onload = () => {
          this.imageCache.set(image.src, true);
        };
        img.src = image.src;
      }
    });
  }

  // Open lightbox with image details
  openLightbox(src, title, description, date) {
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    
    if (lightboxImage) lightboxImage.src = src;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxDescription) {
      lightboxDescription.innerHTML = `
        <p>${description}</p>
        <small class="text-muted">Project Date: ${new Date(date).toLocaleDateString()}</small>
      `;
    }
  }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  window.gallery = new SprayFoamGallery();
});
