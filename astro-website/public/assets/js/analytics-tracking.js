// Analytics & Conversion Tracking for Coastline Spray Foam
class AnalyticsTracker {
  constructor() {
    this.init();
  }

  init() {
    this.setupGoogleAnalytics();
    this.setupConversionTracking();
    this.setupCallTracking();
    this.setupFormTracking();
    this.setupScrollTracking();
    this.setupPageViewTracking();
    this.setupLocalBusinessTracking();
  }

  // Google Analytics 4 Setup
  setupGoogleAnalytics() {
    // Google Analytics 4 Configuration
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    
    // Replace with your actual GA4 Measurement ID
    gtag('config', 'G-XXXXXXXXXX', {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: {
        'custom_parameter_1': 'service_area',
        'custom_parameter_2': 'lead_source'
      }
    });

    // Enhanced ecommerce for service quotes
    gtag('config', 'G-XXXXXXXXXX', {
      custom_map: {'custom_parameter_1': 'service_type'}
    });
  }

  // Conversion Tracking
  setupConversionTracking() {
    // Track phone calls as conversions
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
      link.addEventListener('click', () => {
        gtag('event', 'conversion', {
          'send_to': 'AW-XXXXXXXXX/XXXXXXXXX', // Replace with your conversion ID
          'event_category': 'phone_call',
          'event_label': 'phone_click',
          'value': 100, // Estimated value of a phone call lead
          'currency': 'USD'
        });

        // Facebook Pixel tracking
        if (typeof fbq !== 'undefined') {
          fbq('track', 'Lead', {
            content_name: 'Phone Call',
            content_category: 'Contact',
            value: 100,
            currency: 'USD'
          });
        }
      });
    });

    // Track email clicks
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
      link.addEventListener('click', () => {
        gtag('event', 'email_click', {
          'event_category': 'engagement',
          'event_label': 'email_contact',
          'value': 50
        });
      });
    });
  }

  // Call Tracking with Dynamic Numbers
  setupCallTracking() {
    // Detect traffic source and assign tracking numbers
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');

    // Store traffic source for attribution
    if (utmSource || utmMedium || utmCampaign) {
      sessionStorage.setItem('traffic_source', JSON.stringify({
        source: utmSource,
        medium: utmMedium,
        campaign: utmCampaign,
        timestamp: Date.now()
      }));
    }

    // Track call duration (if using call tracking service)
    this.trackCallMetrics();
  }

  trackCallMetrics() {
    // Integration with call tracking services like CallRail, CallTrackingMetrics
    window.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'call_completed') {
        gtag('event', 'call_completed', {
          'event_category': 'phone_call',
          'event_label': 'call_duration',
          'value': event.data.duration,
          'custom_parameter_1': event.data.caller_location
        });
      }
    });
  }

  // Form Tracking
  setupFormTracking() {
    document.querySelectorAll('form').forEach((form, index) => {
      // Track form starts
      form.addEventListener('focusin', () => {
        if (!form.dataset.started) {
          form.dataset.started = 'true';
          gtag('event', 'form_start', {
            'event_category': 'engagement',
            'event_label': `form_${index}`,
            'form_id': form.id || `form_${index}`
          });
        }
      });

      // Track form submissions
      form.addEventListener('submit', (e) => {
        const formData = new FormData(form);
        const serviceType = formData.get('service') || 'general_inquiry';
        
        gtag('event', 'form_submit', {
          'event_category': 'conversion',
          'event_label': serviceType,
          'value': 200, // Estimated value of a form lead
          'currency': 'USD'
        });

        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
          fbq('track', 'Lead', {
            content_name: 'Contact Form',
            content_category: serviceType,
            value: 200,
            currency: 'USD'
          });
        }

        // Store lead information
        this.storeLeadData(formData);
      });
    });
  }

  storeLeadData(formData) {
    const leadData = {
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      referrer: document.referrer,
      traffic_source: JSON.parse(sessionStorage.getItem('traffic_source') || '{}'),
      form_data: Object.fromEntries(formData)
    };

    // Store in localStorage for later analysis
    const leads = JSON.parse(localStorage.getItem('leads') || '[]');
    leads.push(leadData);
    localStorage.setItem('leads', JSON.stringify(leads.slice(-50))); // Keep last 50 leads
  }

  // Scroll Tracking
  setupScrollTracking() {
    let scrollDepths = [25, 50, 75, 90];
    let trackedDepths = [];

    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      
      scrollDepths.forEach(depth => {
        if (scrollPercent >= depth && !trackedDepths.includes(depth)) {
          trackedDepths.push(depth);
          gtag('event', 'scroll_depth', {
            'event_category': 'engagement',
            'event_label': `${depth}%`,
            'value': depth,
            'page_title': document.title
          });
        }
      });
    });
  }

  // Page View Tracking with Enhanced Data
  setupPageViewTracking() {
    // Track page views with additional context
    gtag('event', 'page_view', {
      'page_title': document.title,
      'page_location': window.location.href,
      'page_referrer': document.referrer,
      'user_agent': navigator.userAgent,
      'screen_resolution': `${screen.width}x${screen.height}`,
      'viewport_size': `${window.innerWidth}x${window.innerHeight}`,
      'device_type': this.getDeviceType(),
      'connection_type': this.getConnectionType()
    });

    // Track time on page
    this.trackTimeOnPage();
  }

  getDeviceType() {
    if (window.innerWidth <= 768) return 'mobile';
    if (window.innerWidth <= 1024) return 'tablet';
    return 'desktop';
  }

  getConnectionType() {
    if (navigator.connection) {
      return navigator.connection.effectiveType || 'unknown';
    }
    return 'unknown';
  }

  trackTimeOnPage() {
    const startTime = Date.now();
    
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      
      gtag('event', 'time_on_page', {
        'event_category': 'engagement',
        'event_label': document.title,
        'value': timeOnPage,
        'page_location': window.location.href
      });
    });
  }

  // Local Business Tracking
  setupLocalBusinessTracking() {
    // Track local business interactions
    document.querySelectorAll('[data-service-area]').forEach(element => {
      element.addEventListener('click', () => {
        const serviceArea = element.dataset.serviceArea;
        gtag('event', 'service_area_click', {
          'event_category': 'local_seo',
          'event_label': serviceArea,
          'custom_parameter_1': serviceArea
        });
      });
    });

    // Track directions clicks
    document.querySelectorAll('a[href*="maps.google.com"], a[href*="goo.gl/maps"]').forEach(link => {
      link.addEventListener('click', () => {
        gtag('event', 'directions_click', {
          'event_category': 'local_business',
          'event_label': 'get_directions',
          'value': 25
        });
      });
    });
  }

  // Lead Scoring
  calculateLeadScore() {
    const score = {
      page_views: (JSON.parse(localStorage.getItem('page_views') || '[]')).length * 5,
      time_on_site: parseInt(localStorage.getItem('total_time_on_site') || '0') / 60 * 2,
      form_interactions: (JSON.parse(localStorage.getItem('form_interactions') || '[]')).length * 20,
      phone_clicks: (JSON.parse(localStorage.getItem('phone_clicks') || '[]')).length * 30,
      return_visitor: localStorage.getItem('return_visitor') === 'true' ? 15 : 0
    };

    const totalScore = Object.values(score).reduce((a, b) => a + b, 0);
    localStorage.setItem('lead_score', totalScore.toString());
    
    return totalScore;
  }

  // Export analytics data
  exportAnalyticsData() {
    const data = {
      leads: JSON.parse(localStorage.getItem('leads') || '[]'),
      page_views: JSON.parse(localStorage.getItem('page_views') || '[]'),
      lead_score: localStorage.getItem('lead_score'),
      traffic_source: JSON.parse(sessionStorage.getItem('traffic_source') || '{}')
    };

    return data;
  }
}

// Initialize analytics when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.analyticsTracker = new AnalyticsTracker();
});

// Export for external use
window.AnalyticsTracker = AnalyticsTracker;
