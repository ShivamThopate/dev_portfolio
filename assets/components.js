// Component Loader for Navbar and Footer
class ComponentLoader {
  constructor() {
    this.components = {};
  }

  // Load a component from an HTML file
  async loadComponent(name, selector) {
    try {
      const response = await fetch(`${name}.html`);
      if (!response.ok) {
        throw new Error(`Failed to load ${name}.html`);
      }
      const html = await response.text();
      this.components[name] = html;
      
      // Insert the component into the specified selector
      const targetElement = document.querySelector(selector);
      if (targetElement) {
        targetElement.innerHTML = html;
        
        // Re-initialize any scripts that need to run after component insertion
        this.initializeComponentScripts(name);
      }
    } catch (error) {
      console.error(`Error loading component ${name}:`, error);
    }
  }

  // Initialize scripts for specific components
  initializeComponentScripts(componentName) {
    if (componentName === 'navbar') {
      this.initializeNavbarScripts();
    } else if (componentName === 'footer') {
      this.initializeFooterScripts();
    }
  }

  // Initialize navbar-specific scripts
  initializeNavbarScripts() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
      });

      // Close mobile menu when clicking a link
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          menuToggle.classList.remove('active');
        });
      });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    });

    // Set active navigation link based on current page
    this.setActiveNavLink();
  }

  // Initialize footer-specific scripts
  initializeFooterScripts() {
    // Scroll to top button functionality
    const scrollToTopButton = document.getElementById('scroll-to-top');
    if (scrollToTopButton) {
      // Show/hide button based on scroll position
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          scrollToTopButton.classList.add('visible');
        } else {
          scrollToTopButton.classList.remove('visible');
        }
      });

      // Scroll to top when button is clicked
      scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // Update copyright year in footer
    const copyrightYearElement = document.getElementById('copyright-year');
    if (copyrightYearElement) {
      copyrightYearElement.textContent = new Date().getFullYear();
    }
  }

  // Set active navigation link based on current page
  setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });
  }

  // Load all components
  async loadAllComponents() {
    await Promise.all([
      this.loadComponent('navbar', '#navbar-placeholder'),
      this.loadComponent('footer', '#footer-placeholder')
    ]);
  }
}

// Initialize component loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const loader = new ComponentLoader();
  loader.loadAllComponents();
}); 