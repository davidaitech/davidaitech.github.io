// ===== MAIN APPLICATION =====

/**
 * David AI Tech Portfolio Application
 */
class DavidAITechApp {
  constructor() {
    this.isInitialized = false;
    this.loadingScreen = null;
    this.startTime = Performance.now();
    
    this.init();
  }
  
  async init() {
    try {
      // Show loading screen
      this.showLoadingScreen();
      
      // Wait for DOM to be ready
      await this.waitForDOM();
      
      // Initialize core systems
      await this.initializeSystems();
      
      // Setup event listeners
      this.setupEventListeners();
      
      // Initialize analytics if enabled
      this.initializeAnalytics();
      
      // Hide loading screen
      await this.hideLoadingScreen();
      
      // Mark as initialized
      this.isInitialized = true;
      
      // Log performance metrics
      this.logPerformanceMetrics();
      
      // Trigger ready event
      this.triggerReadyEvent();
      
    } catch (error) {
      console.error('Failed to initialize application:', error);
      this.handleInitializationError(error);
    }
  }
  
  showLoadingScreen() {
    this.loadingScreen = document.getElementById('loading-screen');
    if (this.loadingScreen) {
      this.loadingScreen.classList.remove('hidden');
    }
  }
  
  async hideLoadingScreen() {
    if (!this.loadingScreen) return;
    
    // Ensure minimum loading time for smooth experience
    const minLoadTime = 1000;
    const elapsed = Performance.now() - this.startTime;
    const remainingTime = Math.max(0, minLoadTime - elapsed);
    
    if (remainingTime > 0) {
      await Utils.wait(remainingTime);
    }
    
    // Fade out loading screen
    this.loadingScreen.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
    this.loadingScreen.style.opacity = '0';
    this.loadingScreen.style.visibility = 'hidden';
    
    // Remove from DOM after animation
    setTimeout(() => {
      if (this.loadingScreen && this.loadingScreen.parentNode) {
        this.loadingScreen.parentNode.removeChild(this.loadingScreen);
      }
    }, 500);
  }
  
  async waitForDOM() {
    return new Promise((resolve) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
  }
  
  async initializeSystems() {
    const tasks = [
      this.validateConfiguration(),
      this.setupErrorHandling(),
      this.initializeTheme(),
      this.preloadAssets(),
      this.optimizePerformance()
    ];
    
    await Promise.all(tasks);
    
    // Systems are initialized by their respective modules
    // ComponentManager and AnimationManager auto-initialize
    this.logMessage('info', 'All systems initialized successfully');
  }
  
  validateConfiguration() {
    const config = window.DavidAITech?.config;
    const data = window.DavidAITech?.data;
    
    if (!config) {
      throw new Error('Configuration not loaded');
    }
    
    if (!data) {
      throw new Error('Data not loaded');
    }
    
    this.logMessage('info', 'Configuration validated', {
      features: Object.keys(config.features || {}),
      dataKeys: Object.keys(data || {})
    });
  }
  
  setupErrorHandling() {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.handleError('JavaScript Error', event.error);
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError('Unhandled Promise Rejection', event.reason);
    });
    
    // Network error handler
    window.addEventListener('offline', () => {
      this.showNotification('인터넷 연결이 끊어졌습니다.', 'warning');
    });
    
    window.addEventListener('online', () => {
      this.showNotification('인터넷 연결이 복구되었습니다.', 'success');
    });
  }
  
  initializeTheme() {
    const preferredTheme = Utils.getThemePreference();
    this.setTheme(preferredTheme);
    
    // Listen for theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!Storage.get('theme-preference')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
  
  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    Storage.set('theme-preference', theme);
    
    this.logMessage('info', `Theme set to: ${theme}`);
  }
  
  async preloadAssets() {
    // Preload critical assets
    const criticalAssets = [
      // Add any critical images or fonts here
    ];
    
    const preloadPromises = criticalAssets.map(asset => {
      return new Promise((resolve) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = asset.url;
        link.as = asset.type;
        link.onload = resolve;
        link.onerror = resolve; // Don't fail if asset doesn't load
        document.head.appendChild(link);
      });
    });
    
    await Promise.all(preloadPromises);
    this.logMessage('info', 'Critical assets preloaded');
  }
  
  optimizePerformance() {
    // Enable performance monitoring if configured
    if (window.DavidAITech?.config?.dev?.performance?.measure) {
      Performance.mark('app-init-start');
    }
    
    // Setup intersection observers for lazy loading
    this.setupLazyLoading();
    
    // Setup resource hints
    this.setupResourceHints();
    
    // Optimize scroll performance
    this.optimizeScrollPerformance();
  }
  
  setupLazyLoading() {
    if (!('IntersectionObserver' in window)) return;
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }
  
  setupResourceHints() {
    // Add resource hints for external domains
    const domains = [
      'fonts.googleapis.com',
      'fonts.gstatic.com'
    ];
    
    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = `//${domain}`;
      document.head.appendChild(link);
    });
  }
  
  optimizeScrollPerformance() {
    // Use passive listeners for scroll events
    const scrollableElements = document.querySelectorAll('[data-scroll-optimize]');
    
    scrollableElements.forEach(element => {
      element.addEventListener('scroll', () => {
        // Scroll handler
      }, { passive: true });
    });
  }
  
  setupEventListeners() {
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      this.handleKeyboardNavigation(e);
    });
    
    // Focus management
    document.addEventListener('focusin', (e) => {
      this.handleFocusChange(e);
    });
    
    // Visibility change (tab switching)
    document.addEventListener('visibilitychange', () => {
      this.handleVisibilityChange();
    });
    
    // Resize handler
    const resizeHandler = Utils.debounce(() => {
      this.handleResize();
    }, 250);
    
    window.addEventListener('resize', resizeHandler);
    
    // Print handler
    window.addEventListener('beforeprint', () => {
      this.handlePrint();
    });
  }
  
  handleKeyboardNavigation(event) {
    // ESC key handling
    if (event.key === 'Escape') {
      this.closeAllModals();
    }
    
    // Tab navigation enhancement
    if (event.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  }
  
  handleFocusChange(event) {
    // Remove keyboard navigation class on mouse focus
    if (event.detail === 0) {
      document.body.classList.remove('keyboard-navigation');
    }
  }
  
  handleVisibilityChange() {
    if (document.hidden) {
      // Page is hidden - pause animations, stop timers
      if (window.AnimationManager) {
        window.AnimationManager.pauseAll();
      }
      this.logMessage('info', 'Page hidden - pausing animations');
    } else {
      // Page is visible - resume animations
      if (window.AnimationManager) {
        window.AnimationManager.resumeAll();
      }
      this.logMessage('info', 'Page visible - resuming animations');
    }
  }
  
  handleResize() {
    // Update viewport units for mobile browsers
    this.updateViewportUnits();
    
    // Trigger resize event for components
    window.dispatchEvent(new CustomEvent('app:resize', {
      detail: {
        width: window.innerWidth,
        height: window.innerHeight,
        breakpoint: Utils.getBreakpoint()
      }
    }));
  }
  
  updateViewportUnits() {
    // Fix for mobile viewport height issues
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  handlePrint() {
    // Optimize page for printing
    document.body.classList.add('printing');
    
    setTimeout(() => {
      document.body.classList.remove('printing');
    }, 1000);
  }
  
  closeAllModals() {
    document.querySelectorAll('.modal, .project-modal').forEach(modal => {
      modal.remove();
    });
    
    // Close mobile menu
    if (window.ComponentManager) {
      const nav = window.ComponentManager.getComponent('navigation');
      if (nav && nav.closeMobileMenu) {
        nav.closeMobileMenu();
      }
    }
  }
  
  initializeAnalytics() {
    const analyticsConfig = window.DavidAITech?.config?.api?.analytics;
    
    if (!analyticsConfig?.enabled) {
      this.logMessage('info', 'Analytics disabled');
      return;
    }
    
    // Initialize Google Analytics or other analytics service
    this.logMessage('info', 'Analytics initialized');
    
    // Track page view
    this.trackEvent('page_view', {
      page_title: document.title,
      page_location: window.location.href
    });
  }
  
  trackEvent(eventName, parameters = {}) {
    const analyticsConfig = window.DavidAITech?.config?.api?.analytics;
    
    if (!analyticsConfig?.enabled) return;
    
    // Implementation depends on analytics service
    this.logMessage('info', `Event tracked: ${eventName}`, parameters);
  }
  
  showNotification(message, type = 'info', duration = 5000) {
    const notification = Utils.createElement('div', {
      className: `notification notification-${type}`,
      style: `
        position: fixed; top: 20px; right: 20px; z-index: 10000;
        background: var(--bg-card); color: var(--text-primary);
        padding: 1rem; border-radius: 0.5rem; box-shadow: var(--shadow-lg);
        border-left: 4px solid var(--${type === 'success' ? 'success' : type === 'warning' ? 'warning' : type === 'error' ? 'error' : 'primary'}-color);
        animation: slideInRight 0.3s ease;
      `
    }, message);
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease forwards';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, duration);
  }
  
  handleError(type, error) {
    const errorMessage = error?.message || error || 'Unknown error';
    
    this.logMessage('error', `${type}: ${errorMessage}`, error);
    
    // Show user-friendly error message
    if (type !== 'Network Error') {
      this.showNotification('일시적인 오류가 발생했습니다.', 'error');
    }
  }
  
  handleInitializationError(error) {
    // Fallback initialization for critical errors
    this.hideLoadingScreen();
    
    const errorElement = Utils.createElement('div', {
      style: `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: var(--bg-card); padding: 2rem; border-radius: 1rem;
        text-align: center; max-width: 400px; z-index: 10000;
      `
    });
    
    errorElement.innerHTML = `
      <h3>초기화 오류</h3>
      <p>웹사이트를 로드하는 중 오류가 발생했습니다.</p>
      <button class="btn btn-primary" onclick="window.location.reload()">
        페이지 새로고침
      </button>
    `;
    
    document.body.appendChild(errorElement);
  }
  
  logPerformanceMetrics() {
    if (!window.DavidAITech?.config?.dev?.performance?.measure) return;
    
    Performance.mark('app-init-end');
    Performance.measure('app-initialization', 'app-init-start', 'app-init-end');
    
    const measurements = Performance.getEntries('measure');
    const initTime = measurements.find(m => m.name === 'app-initialization');
    
    if (initTime) {
      this.logMessage('info', `App initialized in ${initTime.duration.toFixed(2)}ms`);
    }
  }
  
  triggerReadyEvent() {
    // Dispatch custom ready event
    window.dispatchEvent(new CustomEvent('app:ready', {
      detail: {
        timestamp: Date.now(),
        performance: {
          initTime: Performance.now() - this.startTime
        }
      }
    }));
    
    this.logMessage('info', 'Application ready');
  }
  
  logMessage(level, message, data = null) {
    if (window.DavidAITech?.utils?.log) {
      window.DavidAITech.utils.log(level, message, data);
    }
  }
  
  // Public API methods
  getConfig() {
    return window.DavidAITech?.config;
  }
  
  getData() {
    return window.DavidAITech?.data;
  }
  
  isReady() {
    return this.isInitialized;
  }
  
  showModal(content, options = {}) {
    const modal = Utils.createElement('div', {
      className: 'app-modal',
      style: `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.8); display: flex; align-items: center;
        justify-content: center; z-index: 10000; padding: 2rem;
      `
    });
    
    const modalContent = Utils.createElement('div', {
      className: 'modal-content',
      style: `
        background: var(--bg-card); padding: 2rem; border-radius: 1rem;
        max-width: ${options.maxWidth || '600px'}; width: 100%;
        max-height: 80vh; overflow-y: auto; position: relative;
      `
    });
    
    // Add close button
    const closeButton = Utils.createElement('button', {
      className: 'modal-close',
      style: `
        position: absolute; top: 1rem; right: 1rem;
        background: none; border: none; font-size: 1.5rem;
        color: var(--text-secondary); cursor: pointer;
      `
    }, '×');
    
    closeButton.addEventListener('click', () => modal.remove());
    
    modalContent.appendChild(closeButton);
    
    if (typeof content === 'string') {
      modalContent.innerHTML += content;
    } else if (content instanceof Element) {
      modalContent.appendChild(content);
    }
    
    modal.appendChild(modalContent);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
    
    // Close on escape key
    const escapeHandler = (e) => {
      if (e.key === 'Escape') {
        modal.remove();
        document.removeEventListener('keydown', escapeHandler);
      }
    };
    document.addEventListener('keydown', escapeHandler);
    
    document.body.appendChild(modal);
    
    return modal;
  }
  
  async updateContent(sectionId, newData) {
    // Update specific section content dynamically
    switch (sectionId) {
      case 'skills':
        await this.updateSkills(newData);
        break;
      case 'projects':
        await this.updateProjects(newData);
        break;
      case 'stats':
        await this.updateStats(newData);
        break;
      default:
        this.logMessage('warn', `Unknown section: ${sectionId}`);
    }
  }
  
  async updateSkills(skillsData) {
    const container = document.getElementById('skills-container');
    if (!container) return;
    
    // Clear existing skills
    container.innerHTML = '';
    
    // Update data
    if (window.DavidAITech?.data) {
      window.DavidAITech.data.skills = skillsData;
    }
    
    // Re-render skills
    if (window.ComponentManager) {
      window.ComponentManager.renderSkills();
    }
  }
  
  async updateProjects(projectsData) {
    const container = document.getElementById('projects-grid');
    if (!container) return;
    
    // Clear existing projects
    container.innerHTML = '';
    
    // Update data
    if (window.DavidAITech?.data) {
      window.DavidAITech.data.projects = projectsData;
    }
    
    // Re-render projects
    if (window.ComponentManager) {
      window.ComponentManager.renderProjects();
    }
  }
  
  async updateStats(statsData) {
    const container = document.querySelector('.about-stats');
    if (!container) return;
    
    // Clear existing stats
    container.innerHTML = '';
    
    // Update data
    if (window.DavidAITech?.data) {
      window.DavidAITech.data.stats = statsData;
    }
    
    // Re-render stats
    if (window.ComponentManager) {
      window.ComponentManager.renderStats();
    }
  }
  
  // Developer utilities
  debug() {
    return {
      config: this.getConfig(),
      data: this.getData(),
      isReady: this.isReady(),
      performance: Performance.getEntries(),
      components: window.ComponentManager,
      animations: window.AnimationManager,
      utils: window.Utils
    };
  }
}

/**
 * Service Worker Registration (Progressive Web App)
 */
class ServiceWorkerManager {
  constructor() {
    this.registration = null;
    this.init();
  }
  
  async init() {
    if (!('serviceWorker' in navigator)) {
      console.log('Service Worker not supported');
      return;
    }
    
    if (!window.DavidAITech?.config?.features?.pwa) {
      console.log('PWA features disabled');
      return;
    }
    
    try {
      this.registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered successfully');
      
      this.setupUpdateHandler();
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
  
  setupUpdateHandler() {
    if (!this.registration) return;
    
    this.registration.addEventListener('updatefound', () => {
      const newWorker = this.registration.installing;
      
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // Show update available notification
          this.showUpdateNotification();
        }
      });
    });
  }
  
  showUpdateNotification() {
    const notification = Utils.createElement('div', {
      className: 'update-notification',
      style: `
        position: fixed; bottom: 20px; left: 20px; right: 20px;
        background: var(--bg-card); padding: 1rem; border-radius: 0.5rem;
        box-shadow: var(--shadow-lg); z-index: 10000;
        border: 1px solid var(--primary-color);
      `
    });
    
    notification.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>새로운 업데이트가 있습니다.</span>
        <div>
          <button class="btn btn-sm btn-secondary" onclick="this.closest('.update-notification').remove()">
            나중에
          </button>
          <button class="btn btn-sm btn-primary" onclick="window.location.reload()">
            업데이트
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
  }
}

/**
 * Development Tools
 */
class DevTools {
  constructor() {
    this.enabled = window.DavidAITech?.config?.dev?.debug || false;
    
    if (this.enabled) {
      this.init();
    }
  }
  
  init() {
    // Add dev tools to global scope
    window.devTools = this;
    
    // Add keyboard shortcuts
    this.setupKeyboardShortcuts();
    
    // Add performance monitoring
    this.setupPerformanceMonitoring();
    
    console.log('🛠️ Dev Tools enabled');
    console.log('Available commands:');
    console.log('- devTools.toggleDebug()');
    console.log('- devTools.getPerformance()');
    console.log('- devTools.exportData()');
    console.log('- app.debug()');
  }
  
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl+Shift+D for debug toggle
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        this.toggleDebug();
        e.preventDefault();
      }
      
      // Ctrl+Shift+P for performance report
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        console.table(this.getPerformance());
        e.preventDefault();
      }
    });
  }
  
  setupPerformanceMonitoring() {
    // Monitor large layout shifts
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.value > 0.1) {
            console.warn('Large layout shift detected:', entry.value);
          }
        }
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
    }
  }
  
  toggleDebug() {
    const debugMode = !window.DavidAITech.config.dev.debug;
    window.DavidAITech.config.dev.debug = debugMode;
    
    document.body.classList.toggle('debug-mode', debugMode);
    
    console.log(`Debug mode: ${debugMode ? 'ON' : 'OFF'}`);
  }
  
  getPerformance() {
    return {
      navigation: performance.getEntriesByType('navigation')[0],
      resources: performance.getEntriesByType('resource').length,
      measures: performance.getEntriesByType('measure'),
      memory: performance.memory
    };
  }
  
  exportData() {
    const data = {
      config: window.DavidAITech.config,
      data: window.DavidAITech.data,
      performance: this.getPerformance(),
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'davidaitech-debug-data.json';
    a.click();
    
    URL.revokeObjectURL(url);
  }
}

// Initialize the application
const app = new DavidAITechApp();
const serviceWorkerManager = new ServiceWorkerManager();
const devTools = new DevTools();

// Export to global scope
window.app = app;

// Add CSS for animations that aren't in the CSS files
const additionalStyles = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  
  .debug-mode {
    position: relative;
  }
  
  .debug-mode::before {
    content: 'DEBUG MODE';
    position: fixed;
    top: 10px;
    left: 10px;
    background: var(--error-color);
    color: white;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    border-radius: 0.25rem;
    z-index: 10001;
  }
  
  .keyboard-navigation :focus {
    outline: 2px solid var(--primary-color) !important;
    outline-offset: 2px !important;
  }
  
  .field-error {
    animation: shake 0.5s ease-in-out;
  }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Handle app events
window.addEventListener('app:ready', (event) => {
  console.log('🚀 David AI Tech Portfolio Ready!');
  console.log('Performance:', event.detail.performance);
});

window.addEventListener('app:resize', (event) => {
  console.log('📱 Viewport changed:', event.detail);
});

// Expose debug information in development
if (window.DavidAITech?.config?.dev?.debug) {
  console.log('🔧 Development mode enabled');
  console.log('Use app.debug() for debugging information');
}

// Clean up on page unload
window.addEventListener('beforeunload', () => {
  if (window.AnimationManager) {
    window.AnimationManager.destroy();
  }
});
