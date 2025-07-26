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
      { src: 'assets/images/20240815_121229.jpg', category: 'residential', type: 'attic', title: 'Residential Attic Insulation - Orlando', description: 'Complete attic spray foam insulation in Orlando home, achieving 40% energy savings', date: '2024-08-15' },
      { src: 'assets/images/20240815_121234.jpg', category: 'residential', type: 'attic', title: 'Attic Spray Foam Application', description: 'Professional spray foam installation process showing complete coverage', date: '2024-08-15' },
      { src: 'assets/images/20240815_121238.jpg', category: 'residential', type: 'attic', title: 'Finished Attic Insulation Project', description: 'Completed residential attic insulation with R-6.5 per inch coverage', date: '2024-08-15' },
      { src: 'assets/images/20240815_121249.jpg', category: 'residential', type: 'attic', title: 'Attic Insulation Detail Work', description: 'Detailed spray foam application ensuring complete air sealing', date: '2024-08-15' },
      { src: 'assets/images/20240815_121312.jpg', category: 'residential', type: 'attic', title: 'Residential Energy Upgrade', description: 'Home energy efficiency improvement with professional insulation', date: '2024-08-15' },

      { src: 'assets/images/20240830_081517.jpg', category: 'residential', type: 'crawlspace', title: 'Crawl Space Sealing - Melbourne', description: 'Crawl space spray foam insulation and moisture control in Melbourne', date: '2024-08-30' },
      { src: 'assets/images/20240830_081519.jpg', category: 'residential', type: 'crawlspace', title: 'Crawl Space Transformation', description: 'Before and after crawl space insulation showing moisture barrier', date: '2024-08-30' },
      { src: 'assets/images/20240830_081526.jpg', category: 'residential', type: 'crawlspace', title: 'Crawl Space Encapsulation', description: 'Complete crawl space encapsulation with spray foam insulation', date: '2024-08-30' },
      { src: 'assets/images/20240830_124715.jpg', category: 'residential', type: 'attic', title: 'Residential Attic Project', description: 'Professional attic insulation installation in progress', date: '2024-08-30' },
      { src: 'assets/images/20240830_124717.jpg', category: 'residential', type: 'attic', title: 'Attic Spray Foam Coverage', description: 'Complete attic coverage with closed-cell spray foam', date: '2024-08-30' },

      // September 2024 Projects
      { src: 'assets/images/20240905_091406.jpg', category: 'residential', type: 'attic', title: 'Melbourne Home Attic Project', description: 'Energy-efficient attic insulation in Melbourne residential home', date: '2024-09-05' },
      { src: 'assets/images/20240905_091428.jpg', category: 'residential', type: 'attic', title: 'Professional Spray Foam Coverage', description: 'Complete coverage spray foam insulation application', date: '2024-09-05' },
      { src: 'assets/images/20240905_091454.jpg', category: 'residential', type: 'attic', title: 'Attic Insulation Installation', description: 'Professional installation of spray foam insulation in attic space', date: '2024-09-05' },
      { src: 'assets/images/20240905_091501.jpg', category: 'residential', type: 'attic', title: 'Residential Energy Efficiency', description: 'Home energy efficiency improvement with spray foam', date: '2024-09-05' },
      { src: 'assets/images/20240905_091512.jpg', category: 'residential', type: 'attic', title: 'Attic Spray Foam Project', description: 'Detailed attic spray foam insulation work', date: '2024-09-05' },

      { src: 'assets/images/20240910_143434.jpg', category: 'commercial', type: 'warehouse', title: 'Commercial Warehouse - Cocoa', description: 'Large-scale commercial spray foam project in Cocoa warehouse', date: '2024-09-10' },
      { src: 'assets/images/20240910_143537.jpg', category: 'commercial', type: 'warehouse', title: 'Industrial Insulation Project', description: 'Industrial building spray foam application for energy savings', date: '2024-09-10' },
      { src: 'assets/images/20240910_153843.jpg', category: 'commercial', type: 'building', title: 'Commercial Building Insulation', description: 'Professional commercial spray foam insulation installation', date: '2024-09-10' },
      { src: 'assets/images/20240910_153845.jpg', category: 'commercial', type: 'building', title: 'Commercial Spray Foam Application', description: 'Large-scale spray foam application for commercial property', date: '2024-09-10' },
      { src: 'assets/images/20240910_153854.jpg', category: 'commercial', type: 'building', title: 'Commercial Energy Upgrade', description: 'Commercial building energy efficiency improvement project', date: '2024-09-10' },

      // October 2024 Projects
      { src: 'assets/images/20241017_104040.jpg', category: 'residential', type: 'attic', title: 'Cocoa Home Attic Insulation', description: 'Residential attic spray foam insulation in Cocoa home', date: '2024-10-17' },
      { src: 'assets/images/20241017_104049.jpg', category: 'residential', type: 'attic', title: 'Attic Energy Efficiency Project', description: 'Energy-saving attic insulation installation project', date: '2024-10-17' },
      { src: 'assets/images/20241017_104111.jpg', category: 'residential', type: 'attic', title: 'Professional Attic Insulation', description: 'Professional spray foam insulation in residential attic', date: '2024-10-17' },
      { src: 'assets/images/20241017_104120.jpg', category: 'residential', type: 'attic', title: 'Residential Spray Foam Work', description: 'Detailed residential spray foam insulation work', date: '2024-10-17' },

      // November 2024 Projects
      { src: 'assets/images/20241104_082819.jpg', category: 'residential', type: 'crawlspace', title: 'Crawl Space Encapsulation - Titusville', description: 'Complete crawl space sealing and insulation in Titusville', date: '2024-11-04' },
      { src: 'assets/images/20241104_104204.jpg', category: 'residential', type: 'attic', title: 'Residential Spray Foam Service', description: 'Professional residential insulation service installation', date: '2024-11-04' },
      { src: 'assets/images/20241104_104206.jpg', category: 'residential', type: 'attic', title: 'Home Insulation Upgrade', description: 'Home insulation upgrade with spray foam technology', date: '2024-11-04' },

      { src: 'assets/images/20241112_171534.jpg', category: 'commercial', type: 'building', title: 'Commercial Building Project', description: 'Commercial spray foam insulation project completion', date: '2024-11-12' },
      { src: 'assets/images/20241112_171551.jpg', category: 'commercial', type: 'building', title: 'Commercial Insulation Work', description: 'Professional commercial insulation installation', date: '2024-11-12' },

      { src: 'assets/images/20241118_104157.jpg', category: 'residential', type: 'attic', title: 'Attic Insulation Work - Orlando', description: 'Detailed attic spray foam application in Orlando home', date: '2024-11-18' },
      { src: 'assets/images/20241118_104208.jpg', category: 'residential', type: 'attic', title: 'Professional Attic Service', description: 'Professional attic insulation service completion', date: '2024-11-18' },

      { src: 'assets/images/20241119_141629.jpg', category: 'residential', type: 'attic', title: 'Titusville Home Insulation', description: 'Residential attic insulation project in Titusville', date: '2024-11-19' },
      { src: 'assets/images/20241119_141635.jpg', category: 'residential', type: 'attic', title: 'Home Energy Improvement', description: 'Home energy improvement with spray foam insulation', date: '2024-11-19' },

      { src: 'assets/images/20241120_080422.jpg', category: 'residential', type: 'crawlspace', title: 'Crawl Space Project - Melbourne', description: 'Moisture control and insulation in Melbourne crawl space', date: '2024-11-20' },
      { src: 'assets/images/20241120_080424.jpg', category: 'residential', type: 'crawlspace', title: 'Crawl Space Moisture Control', description: 'Professional crawl space moisture control and sealing', date: '2024-11-20' },

      { src: 'assets/images/20241122_162500.jpg', category: 'residential', type: 'attic', title: 'Attic Spray Foam Installation', description: 'Complete attic insulation coverage with spray foam', date: '2024-11-22' },
      { src: 'assets/images/20241122_162502.jpg', category: 'residential', type: 'attic', title: 'Residential Attic Upgrade', description: 'Residential attic energy efficiency upgrade', date: '2024-11-22' },

      // December 2024 Projects
      { src: 'assets/images/20241202_091324.jpg', category: 'commercial', type: 'warehouse', title: 'Large Warehouse Project', description: 'Large commercial warehouse spray foam insulation project', date: '2024-12-02' },
      { src: 'assets/images/20241202_091334.jpg', category: 'commercial', type: 'warehouse', title: 'Industrial Facility Insulation', description: 'Industrial facility spray foam insulation installation', date: '2024-12-02' },

      { src: 'assets/images/20241203_120401.jpg', category: 'residential', type: 'attic', title: 'December Attic Project', description: 'Professional attic insulation project completion', date: '2024-12-03' },
      { src: 'assets/images/20241203_120416.jpg', category: 'residential', type: 'attic', title: 'Winter Insulation Project', description: 'Winter season insulation improvement project', date: '2024-12-03' },

      // 2025 Projects
      { src: 'assets/images/20250207_133556.jpg', category: 'residential', type: 'attic', title: 'February 2025 Attic Project', description: 'Latest residential attic insulation project', date: '2025-02-07' },
      { src: 'assets/images/20250207_133602.jpg', category: 'residential', type: 'attic', title: 'Recent Home Upgrade', description: 'Recent home energy efficiency upgrade', date: '2025-02-07' },

      { src: 'assets/images/20250215_130453.jpg', category: 'residential', type: 'attic', title: 'Valentine\'s Day Project', description: 'Home energy upgrade project for Valentine\'s Day', date: '2025-02-15' },
      { src: 'assets/images/20250215_130505.jpg', category: 'residential', type: 'attic', title: 'February Home Improvement', description: 'February home energy improvement project', date: '2025-02-15' },

      { src: 'assets/images/20250222_100359.jpg', category: 'residential', type: 'crawlspace', title: 'February Crawl Space Project', description: 'Professional crawl space encapsulation project', date: '2025-02-22' },
      { src: 'assets/images/20250222_100402.jpg', category: 'residential', type: 'crawlspace', title: 'Crawl Space Sealing Work', description: 'Detailed crawl space sealing and insulation work', date: '2025-02-22' },

      { src: 'assets/images/20250228_150402.jpg', category: 'residential', type: 'attic', title: 'February Attic Service', description: 'Quality attic spray foam installation service', date: '2025-02-28' },
      { src: 'assets/images/20250228_150409.jpg', category: 'residential', type: 'attic', title: 'Month-End Attic Project', description: 'Month-end residential attic insulation project', date: '2025-02-28' },

      { src: 'assets/images/20250307_090153.jpg', category: 'commercial', type: 'building', title: 'March Commercial Project', description: 'Professional commercial insulation project', date: '2025-03-07' },
      { src: 'assets/images/20250307_090219.jpg', category: 'commercial', type: 'building', title: 'Spring Commercial Work', description: 'Spring season commercial insulation work', date: '2025-03-07' },

      { src: 'assets/images/20250318_155724.jpg', category: 'residential', type: 'attic', title: 'March Residential Upgrade', description: 'Home insulation improvement project in March', date: '2025-03-18' },
      { src: 'assets/images/20250318_155800.jpg', category: 'residential', type: 'attic', title: 'Spring Home Project', description: 'Spring season home energy upgrade project', date: '2025-03-18' },

      { src: 'assets/images/20250327_103016.jpg', category: 'residential', type: 'attic', title: 'Late March Attic Project', description: 'Recent residential attic insulation work', date: '2025-03-27' },
      { src: 'assets/images/20250327_103021.jpg', category: 'residential', type: 'attic', title: 'Spring Insulation Work', description: 'Spring season insulation installation work', date: '2025-03-27' },

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

  // Setup lazy loading for images
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      this.lazyLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            this.lazyLoadObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });
    }
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

  // Render gallery based on current filter
  renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    // Filter images
    const filteredImages = this.currentFilter === 'all' 
      ? this.images 
      : this.images.filter(img => 
          img.category === this.currentFilter || 
          img.type === this.currentFilter
        );

    // Clear existing content
    galleryGrid.innerHTML = '';

    // Render filtered images
    filteredImages.forEach((image, index) => {
      const galleryItem = this.createGalleryItem(image, index);
      galleryGrid.appendChild(galleryItem);
    });

    // Setup lazy loading for new images
    if (this.lazyLoadObserver) {
      const lazyImages = galleryGrid.querySelectorAll('img.lazy');
      lazyImages.forEach(img => this.lazyLoadObserver.observe(img));
    }
  }

  // Create individual gallery item
  createGalleryItem(image, index) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 filter-item';
    
    col.innerHTML = `
      <div class="gallery-item position-relative" 
           data-bs-toggle="modal" 
           data-bs-target="#lightboxModal" 
           onclick="gallery.openLightbox('${image.src}', '${image.title}', '${image.description}', '${image.date}')">
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8'%3ELoading...%3C/text%3E%3C/svg%3E"
             data-src="${image.src}" 
             alt="${image.title}" 
             class="lazy"
             loading="lazy">
        <div class="gallery-overlay">
          <h5>${image.title}</h5>
          <p class="small">${image.description}</p>
          <div class="d-flex gap-2 justify-content-center">
            <span class="badge bg-secondary">${image.category.charAt(0).toUpperCase() + image.category.slice(1)}</span>
            <span class="badge bg-primary">${image.type.charAt(0).toUpperCase() + image.type.slice(1)}</span>
          </div>
          <small class="mt-2 opacity-75">${new Date(image.date).toLocaleDateString()}</small>
        </div>
      </div>
    `;
    
    return col;
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
