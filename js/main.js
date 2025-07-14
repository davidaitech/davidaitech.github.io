// ===== SIMPLE MAIN APPLICATION =====

/**
 * Initialize the application
 */
function initApp() {
  console.log('🚀 Initializing David AI Tech Portfolio...');
  
  // Hide loading screen
  hideLoadingScreen();
  
  // Initialize navigation
  initNavigation();
  
  // Initialize smooth scrolling
  initSmoothScrolling();
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize back to top button
  initBackToTop();
  
  console.log('✅ Application initialized successfully');
}

/**
 * Hide loading screen
 */
function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.display = 'none';
  }
}

/**
 * Initialize navigation
 */
function initNavigation() {
  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', Utils.debounce(() => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, 10));
  }
}

/**
 * Initialize smooth scrolling
 */
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        Utils.smoothScrollTo(target, -80);
      }
    });
  });
}

/**
 * Initialize mobile menu
 */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking on links
    navLinks.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav-link')) {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', Utils.debounce(() => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, 100));
    
    // Click handler
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/**
 * Initialize when DOM is ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Export to global scope
window.app = { initApp };
