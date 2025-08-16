// Conversion Optimization & Mobile Enhancements
class ConversionOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.setupStickyCallButton();
    this.setupClickToCall();
    this.setupExitIntent();
    this.setupScrollTracking();
    this.setupFormOptimization();
    this.setupTrustSignals();
    this.setupLocalSEO();
  }

  // Sticky Call Button for Mobile
  setupStickyCallButton() {
    if (window.innerWidth <= 768) {
      const stickyButton = document.createElement('div');
      stickyButton.className = 'sticky-cta';
      stickyButton.innerHTML = `
        <a href="tel:3216527465" class="btn" onclick="gtag('event', 'phone_call', {'event_category': 'engagement', 'event_label': 'sticky_mobile_button'});">
          📞 Call Now - (321) 652-7465
        </a>
      `;
      document.body.appendChild(stickyButton);

      // Show after 3 seconds of scrolling
      let scrollTimer;
      window.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          if (window.scrollY > 500) {
            stickyButton.classList.add('show');
          }
        }, 100);
      });
    }
  }

  // Enhanced Click-to-Call Tracking
  setupClickToCall() {
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
      link.addEventListener('click', (e) => {
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
          gtag('event', 'phone_call', {
            'event_category': 'engagement',
            'event_label': 'phone_click',
            'value': 1
          });
        }

        // Add visual feedback
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
          link.style.transform = 'scale(1)';
        }, 150);
      });
    });
  }

  // Exit Intent Popup
  setupExitIntent() {
    let exitIntentShown = false;
    
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY <= 0 && !exitIntentShown && window.innerWidth > 768) {
        this.showExitIntentModal();
        exitIntentShown = true;
      }
    });

    // Mobile exit intent (back button)
    if (window.innerWidth <= 768) {
      window.addEventListener('beforeunload', (e) => {
        if (!exitIntentShown) {
          e.preventDefault();
          e.returnValue = 'Wait! Get your FREE spray foam quote before you leave!';
          exitIntentShown = true;
        }
      });
    }
  }

  showExitIntentModal() {
    const modal = document.createElement('div');
    modal.className = 'exit-intent-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>🛑 Wait! Don't Miss Out!</h3>
          <button class="close-btn" onclick="this.closest('.exit-intent-modal').remove()">&times;</button>
        </div>
        <div class="modal-body">
          <h4>Get Your FREE Spray Foam Quote</h4>
          <p>Save 30-50% on your energy bills with professional spray foam insulation!</p>
          <div class="urgency-timer">
            <p><strong>⏰ Limited Time:</strong> Free consultation expires in <span id="countdown">10:00</span></p>
          </div>
          <a href="tel:3216527465" class="btn btn-primary btn-lg" onclick="gtag('event', 'phone_call', {'event_category': 'engagement', 'event_label': 'exit_intent_modal'});">
            📞 Call Now - (321) 652-7465
          </a>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    this.startCountdown();
  }

  startCountdown() {
    let timeLeft = 600; // 10 minutes
    const countdownElement = document.getElementById('countdown');
    
    const timer = setInterval(() => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      countdownElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      
      if (timeLeft <= 0) {
        clearInterval(timer);
        countdownElement.textContent = 'EXPIRED';
      }
      timeLeft--;
    }, 1000);
  }

  // Scroll Tracking for Analytics
  setupScrollTracking() {
    let scrollDepths = [25, 50, 75, 90];
    let trackedDepths = [];

    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      
      scrollDepths.forEach(depth => {
        if (scrollPercent >= depth && !trackedDepths.includes(depth)) {
          trackedDepths.push(depth);
          if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll_depth', {
              'event_category': 'engagement',
              'event_label': `${depth}%`,
              'value': depth
            });
          }
        }
      });
    });
  }

  // Form Optimization
  setupFormOptimization() {
    document.querySelectorAll('form').forEach(form => {
      // Add form validation
      form.addEventListener('submit', (e) => {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
          } else {
            field.classList.remove('is-invalid');
          }
        });

        if (!isValid) {
          e.preventDefault();
          this.showFormError('Please fill in all required fields');
        } else {
          // Track form submission
          if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
              'event_category': 'engagement',
              'event_label': 'contact_form'
            });
          }
        }
      });

      // Real-time validation
      form.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('blur', () => {
          if (field.hasAttribute('required') && !field.value.trim()) {
            field.classList.add('is-invalid');
          } else {
            field.classList.remove('is-invalid');
          }
        });
      });
    });
  }

  showFormError(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger';
    alert.textContent = message;
    alert.style.position = 'fixed';
    alert.style.top = '20px';
    alert.style.right = '20px';
    alert.style.zIndex = '9999';
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
      alert.remove();
    }, 5000);
  }

  // Trust Signals
  setupTrustSignals() {
    // Add trust badges to key pages
    const trustBadges = `
      <div class="trust-badges">
        <div class="trust-badge">✅ Licensed & Insured</div>
        <div class="trust-badge">🏆 Florida Certified</div>
        <div class="trust-badge">⭐ 5-Star Rated</div>
        <div class="trust-badge">🛡️ Quality Guaranteed</div>
      </div>
    `;

    // Add to hero sections
    document.querySelectorAll('.hero .container').forEach(container => {
      if (!container.querySelector('.trust-badges')) {
        container.insertAdjacentHTML('beforeend', trustBadges);
      }
    });
  }

  // Local SEO Enhancements
  setupLocalSEO() {
    // Add local business schema
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Coastline Spray Foam",
      "image": "https://coastlinesprayfoam.com/assets/images/20240815_121229.jpg",
      "telephone": "+1-321-652-7465",
      "email": "info@coastlinesprayfoam.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Palm Bay",
        "addressRegion": "FL",
        "postalCode": "32905",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.0345,
        "longitude": -80.5887
      },
      "url": "https://coastlinesprayfoam.com",
      "priceRange": "Contact for Quote",
      "serviceArea": [
        "Orlando, FL",
        "Melbourne, FL", 
        "Palm Bay, FL",
        "Cocoa, FL",
        "Titusville, FL"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Spray Foam Insulation Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Residential Spray Foam Insulation"
            }
          },
          {
            "@type": "Offer", 
            "itemOffered": {
              "@type": "Service",
              "name": "Commercial Spray Foam Insulation"
            }
          }
        ]
      }
    };

    // Add schema to page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(localBusinessSchema);
    document.head.appendChild(script);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ConversionOptimizer();
});

// Export for use in other scripts
window.ConversionOptimizer = ConversionOptimizer;
