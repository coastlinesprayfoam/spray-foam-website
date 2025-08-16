// Local SEO Schema Markup for Coastline Spray Foam
class LocalSEOSchema {
  constructor() {
    this.businessData = {
      name: "Coastline Spray Foam",
      legalName: "Coastline Spray Foam Solutions LLC",
      telephone: "+1-321-652-7465",
      email: "info@coastlinesprayfoam.com",
      url: "https://coastlinesprayfoam.com",
      logo: "https://coastlinesprayfoam.com/assets/images/20240815_121229.jpg",
      image: "https://coastlinesprayfoam.com/assets/images/20240815_121229.jpg",
      foundingDate: "2024-04-01",
      address: {
        streetAddress: "Palm Bay",
        addressLocality: "Palm Bay",
        addressRegion: "FL",
        postalCode: "32905",
        addressCountry: "US"
      },
      geo: {
        latitude: 28.0345,
        longitude: -80.5887
      },
      serviceAreas: [
        "Orlando, FL",
        "Melbourne, FL",
        "Palm Bay, FL",
        "Cocoa, FL",
        "Titusville, FL",
        "Rockledge, FL",
        "Merritt Island, FL",
        "Satellite Beach, FL",
        "Indialantic, FL",
        "Winter Park, FL",
        "Altamonte Springs, FL",
        "Apopka, FL",
        "Ocoee, FL",
        "Winter Garden, FL",
        "Maitland, FL",
        "Casselberry, FL"
      ]
    };
    
    this.init();
  }

  init() {
    this.addLocalBusinessSchema();
    this.addServiceSchema();
    this.addReviewSchema();
    this.addFAQSchema();
    this.addBreadcrumbSchema();
    this.addOrganizationSchema();
  }

  // Local Business Schema
  addLocalBusinessSchema() {
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://coastlinesprayfoam.com/#localbusiness",
      "name": this.businessData.name,
      "legalName": this.businessData.legalName,
      "image": this.businessData.image,
      "logo": this.businessData.logo,
      "telephone": this.businessData.telephone,
      "email": this.businessData.email,
      "url": this.businessData.url,
      "foundingDate": this.businessData.foundingDate,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": this.businessData.address.streetAddress,
        "addressLocality": this.businessData.address.addressLocality,
        "addressRegion": this.businessData.address.addressRegion,
        "postalCode": this.businessData.address.postalCode,
        "addressCountry": this.businessData.address.addressCountry
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": this.businessData.geo.latitude,
        "longitude": this.businessData.geo.longitude
      },
      "areaServed": this.businessData.serviceAreas.map(area => ({
        "@type": "City",
        "name": area
      })),
      "priceRange": "Contact for Quote",
      "paymentAccepted": ["Cash", "Check", "Credit Card", "Financing Available"],
      "currenciesAccepted": "USD",
      "openingHours": [
        "Mo-Fr 07:00-18:00",
        "Sa 08:00-16:00"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Spray Foam Insulation Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Residential Spray Foam Insulation",
              "description": "Professional spray foam insulation for homes in Central Florida"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "Commercial Spray Foam Insulation",
              "description": "Commercial and industrial spray foam insulation services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Attic Insulation",
              "description": "Attic spray foam insulation for maximum energy efficiency"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Crawl Space Insulation",
              "description": "Crawl space spray foam insulation and moisture control"
            }
          }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "47",
        "bestRating": "5",
        "worstRating": "1"
      },
      "sameAs": [
        "https://www.facebook.com/coastlinesprayfoam",
        "https://www.instagram.com/coastlinesprayfoam",
        "https://www.linkedin.com/company/coastlinesprayfoam"
      ]
    };

    this.addSchemaToPage(localBusinessSchema);
  }

  // Service Schema
  addServiceSchema() {
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://coastlinesprayfoam.com/#service",
      "name": "Spray Foam Insulation Services",
      "description": "Professional spray foam insulation services for residential and commercial properties in Central Florida",
      "provider": {
        "@type": "LocalBusiness",
        "@id": "https://coastlinesprayfoam.com/#localbusiness"
      },
      "areaServed": this.businessData.serviceAreas.map(area => ({
        "@type": "City",
        "name": area
      })),
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Insulation Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Open Cell Spray Foam",
              "description": "Cost-effective open cell spray foam insulation"
            },
            "priceSpecification": {
              "@type": "PriceSpecification",
              "priceCurrency": "USD",
              "price": "Contact for Quote"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Closed Cell Spray Foam",
              "description": "High-performance closed cell spray foam insulation"
            },
            "priceSpecification": {
              "@type": "PriceSpecification",
              "priceCurrency": "USD",
              "price": "Contact for Quote"
            }
          }
        ]
      }
    };

    this.addSchemaToPage(serviceSchema);
  }

  // Review Schema
  addReviewSchema() {
    const reviewSchema = {
      "@context": "https://schema.org",
      "@type": "Review",
      "itemReviewed": {
        "@type": "LocalBusiness",
        "@id": "https://coastlinesprayfoam.com/#localbusiness"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "name": "Excellent spray foam insulation service",
      "author": {
        "@type": "Person",
        "name": "Sarah M."
      },
      "reviewBody": "Coastline Spray Foam did an amazing job insulating our home. Professional, clean, and our energy bills have dropped significantly!",
      "datePublished": "2024-11-15"
    };

    this.addSchemaToPage(reviewSchema);
  }

  // FAQ Schema
  addFAQSchema() {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does spray foam insulation cost in Florida?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Spray foam insulation costs vary based on the size of your home and type of foam used. Contact us for a free quote tailored to your specific needs."
          }
        },
        {
          "@type": "Question",
          "name": "What areas do you serve in Central Florida?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We serve Orlando, Melbourne, Palm Bay, Cocoa, Titusville, and surrounding Central Florida communities."
          }
        },
        {
          "@type": "Question",
          "name": "How long does spray foam insulation installation take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most residential installations take 1-2 days depending on the size of your home and areas being insulated."
          }
        },
        {
          "@type": "Question",
          "name": "Is spray foam insulation worth it in Florida?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Spray foam insulation can reduce energy bills by 30-50% in Florida's hot, humid climate while improving comfort and air quality."
          }
        }
      ]
    };

    this.addSchemaToPage(faqSchema);
  }

  // Breadcrumb Schema
  addBreadcrumbSchema() {
    const path = window.location.pathname;
    const breadcrumbItems = this.generateBreadcrumbs(path);
    
    if (breadcrumbItems.length > 1) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems
      };

      this.addSchemaToPage(breadcrumbSchema);
    }
  }

  generateBreadcrumbs(path) {
    const pathSegments = path.split('/').filter(segment => segment);
    const breadcrumbs = [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://coastlinesprayfoam.com/"
    }];

    pathSegments.forEach((segment, index) => {
      const name = this.formatBreadcrumbName(segment);
      const url = `https://coastlinesprayfoam.com/${pathSegments.slice(0, index + 1).join('/')}/`;
      
      breadcrumbs.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": name,
        "item": url
      });
    });

    return breadcrumbs;
  }

  formatBreadcrumbName(segment) {
    const nameMap = {
      'services': 'Services',
      'about': 'About Us',
      'contact': 'Contact',
      'gallery': 'Gallery',
      'blog': 'Blog',
      'service-areas': 'Service Areas',
      'warranty': 'Warranty'
    };

    return nameMap[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  // Organization Schema
  addOrganizationSchema() {
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://coastlinesprayfoam.com/#organization",
      "name": this.businessData.name,
      "legalName": this.businessData.legalName,
      "url": this.businessData.url,
      "logo": this.businessData.logo,
      "foundingDate": this.businessData.foundingDate,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": this.businessData.telephone,
        "contactType": "customer service",
        "areaServed": "US",
        "availableLanguage": "English"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": this.businessData.address.addressLocality,
        "addressRegion": this.businessData.address.addressRegion,
        "addressCountry": this.businessData.address.addressCountry
      }
    };

    this.addSchemaToPage(organizationSchema);
  }

  // Add schema to page
  addSchemaToPage(schema) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new LocalSEOSchema();
});

// Export for external use
window.LocalSEOSchema = LocalSEOSchema;
