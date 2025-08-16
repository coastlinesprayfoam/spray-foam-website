// Navigation Component for Coastline Spray Foam
// This creates a reusable navigation that can be included on all pages

function createNavigation(currentPage = '') {
  return `
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="index.html">
          <strong>Coastline Spray Foam</strong>
        </a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" title="Toggle navigation menu">
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
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle ${currentPage === 'resources' ? 'active' : ''}" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" title="Resources and Tools">
                Resources
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item ${currentPage === 'faq' ? 'active' : ''}" href="faq.html">❓ FAQ</a></li>
                <li><a class="dropdown-item ${currentPage === 'calculator' ? 'active' : ''}" href="cost-calculator.html">💰 Cost Calculator</a></li>
                <li><a class="dropdown-item ${currentPage === 'hurricane' ? 'active' : ''}" href="hurricane-preparation.html">🌪️ Hurricane Prep</a></li>
                <li><a class="dropdown-item ${currentPage === 'florida-guide' ? 'active' : ''}" href="new-to-florida-guide.html">🌴 New to Florida</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="contact.html">📞 Contact Us</a></li>
              </ul>
            </li>
            <li class="nav-item ms-2">
              <a href="tel:3216527465" class="btn btn-cta" title="Call Coastline Spray Foam">📞 (321) 652-7465</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;
}

// Function to load navigation on page load
function loadNavigation(currentPage = '') {
  document.addEventListener('DOMContentLoaded', function() {
    const navContainer = document.getElementById('navigation-container');
    if (navContainer) {
      navContainer.innerHTML = createNavigation(currentPage);
    }
  });
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createNavigation, loadNavigation };
}
