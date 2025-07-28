// Unified Navigation Component for Coastline Spray Foam
// Professional, consistent navigation across all pages

function createUnifiedNavigation(currentPage = '') {
  return `
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="index.html">
          <strong>Coastline Spray Foam</strong>
        </a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-label="Toggle navigation menu">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link ${currentPage === 'home' ? 'active' : ''}" href="index.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${currentPage === 'about' ? 'active' : ''}" href="about.html">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${currentPage === 'services' ? 'active' : ''}" href="services.html">Services</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${currentPage === 'areas' ? 'active' : ''}" href="service-areas.html">Areas</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${currentPage === 'gallery' ? 'active' : ''}" href="gallery.html">Gallery</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${currentPage === 'blog' ? 'active' : ''}" href="blog.html">Blog</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${currentPage === 'contact' ? 'active' : ''}" href="contact.html">Contact</a>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="btn btn-cta" href="tel:3216527465" aria-label="Call Coastline Spray Foam">
                📞 (321) 652-7465
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;
}

// Initialize navigation on page load
document.addEventListener('DOMContentLoaded', function() {
  // Detect current page from URL
  const path = window.location.pathname;
  let currentPage = '';
  
  if (path.includes('index.html') || path === '/' || path === '') {
    currentPage = 'home';
  } else if (path.includes('about.html')) {
    currentPage = 'about';
  } else if (path.includes('services.html')) {
    currentPage = 'services';
  } else if (path.includes('service-areas.html')) {
    currentPage = 'areas';
  } else if (path.includes('gallery.html')) {
    currentPage = 'gallery';
  } else if (path.includes('blog')) {
    currentPage = 'blog';
  } else if (path.includes('contact.html')) {
    currentPage = 'contact';
  }
  
  // Replace navigation if container exists
  const navContainer = document.getElementById('unified-nav');
  if (navContainer) {
    navContainer.innerHTML = createUnifiedNavigation(currentPage);
  }
  
  // Add scroll effect
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createUnifiedNavigation };
}
