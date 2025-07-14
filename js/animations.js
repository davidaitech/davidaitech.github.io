// ===== ANIMATION SYSTEM =====

/**
 * Scroll Animation Controller
 */
class ScrollAnimationController {
  constructor() {
    this.observers = new Map();
    this.animatedElements = new Set();
    this.config = window.DavidAITech?.config?.performance || {};
    
    this.init();
  }
  
  init() {
    // Create intersection observer for scroll animations
    this.createScrollObserver();
    
    // Initialize existing elements
    this.initializeElements();
    
    // Setup scroll event listeners
    this.setupScrollListeners();
  }
  
  createScrollObserver() {
    const options = {
      rootMargin: this.config.intersection?.rootMargin || '-10% 0px -10% 0px',
      threshold: this.config.intersection?.threshold || 0.1
    };
    
    this.scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, options);
  }
  
  initializeElements() {
    // Find all elements with animation classes
    const animationClasses = [
      '.fade-in-scroll',
      '.slide-in-left',
      '.slide-in-right',
      '.zoom-in-scroll'
    ];
    
    animationClasses.forEach(className => {
      document.querySelectorAll(className).forEach(element => {
        this.observeElement(element);
      });
    });
  }
  
  observeElement(element) {
    if (!this.animatedElements.has(element)) {
      this.scrollObserver.observe(element);
      this.animatedElements.add(element);
    }
  }
  
  animateElement(element) {
    element.classList.add('visible');
    
    // Add stagger delay if element has data-stagger attribute
    const stagger = element.dataset.stagger;
    if (stagger) {
      element.style.animationDelay = `${stagger * 100}ms`;
    }
    
    // Unobserve after animation
    this.scrollObserver.unobserve(element);
  }
  
  setupScrollListeners() {
    const scrollHandler = Utils.throttle(() => {
      this.updateScrollProgress();
      this.updateParallax();
    }, 16); // 60fps
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
  }
  
  updateScrollProgress() {
    const progress = Utils.getScrollProgress();
    document.documentElement.style.setProperty('--scroll-progress', progress);
    
    // Update any progress bars
    document.querySelectorAll('[data-scroll-progress]').forEach(element => {
      element.style.transform = `scaleX(${progress})`;
    });
  }
  
  updateParallax() {
    const scrollY = window.pageYOffset;
    
    // Parallax elements
    document.querySelectorAll('[data-parallax]').forEach(element => {
      const speed = parseFloat(element.dataset.parallax) || 0.5;
      const yPos = -(scrollY * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }
}

/**
 * Particle System
 */
class ParticleSystem {
  constructor(container) {
    this.container = container;
    this.particles = [];
    this.config = window.DavidAITech?.config?.particle || {};
    this.isRunning = false;
    this.animationId = null;
    
    this.init();
  }
  
  init() {
    if (!this.container || Utils.prefersReducedMotion()) return;
    
    this.createParticles();
    this.start();
  }
  
  createParticles() {
    const count = this.config.count || 50;
    
    for (let i = 0; i < count; i++) {
      this.createParticle();
    }
  }
  
  createParticle() {
    const particle = {
      element: this.createParticleElement(),
      x: Utils.random(0, this.container.offsetWidth),
      y: Utils.random(this.container.offsetHeight, this.container.offsetHeight + 100),
      speedX: Utils.random(-0.5, 0.5),
      speedY: Utils.random(this.config.speed?.min || 1, this.config.speed?.max || 3),
      size: Utils.random(this.config.size?.min || 1, this.config.size?.max || 3),
      opacity: Utils.random(this.config.opacity?.min || 0.3, this.config.opacity?.max || 0.8),
      life: 1
    };
    
    this.container.appendChild(particle.element);
    this.particles.push(particle);
    
    return particle;
  }
  
  createParticleElement() {
    const element = document.createElement('div');
    element.className = 'particle';
    element.style.position = 'absolute';
    element.style.borderRadius = '50%';
    element.style.pointerEvents = 'none';
    element.style.zIndex = '1';
    
    return element;
  }
  
  updateParticle(particle) {
    // Update position
    particle.x += particle.speedX;
    particle.y -= particle.speedY;
    
    // Update life
    particle.life = 1 - (particle.y / this.container.offsetHeight);
    
    // Reset particle if it goes off screen
    if (particle.y < -10) {
      particle.x = Utils.random(0, this.container.offsetWidth);
      particle.y = this.container.offsetHeight + 10;
      particle.life = 1;
    }
    
    // Update element styles
    particle.element.style.left = `${particle.x}px`;
    particle.element.style.top = `${particle.y}px`;
    particle.element.style.width = `${particle.size}px`;
    particle.element.style.height = `${particle.size}px`;
    particle.element.style.opacity = particle.opacity * particle.life;
    particle.element.style.background = this.getParticleColor();
  }
  
  getParticleColor() {
    const colors = this.config.colors || ['rgba(0, 255, 136, 0.6)'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  animate() {
    if (!this.isRunning) return;
    
    this.particles.forEach(particle => {
      this.updateParticle(particle);
    });
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();
  }
  
  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
  
  destroy() {
    this.stop();
    this.particles.forEach(particle => {
      if (particle.element.parentNode) {
        particle.element.parentNode.removeChild(particle.element);
      }
    });
    this.particles = [];
  }
}

/**
 * Counter Animation
 */
class CounterAnimation {
  constructor(element, options = {}) {
    this.element = element;
    this.startValue = options.start || 0;
    this.endValue = options.end || parseInt(element.dataset.target) || 0;
    this.duration = options.duration || 2000;
    this.suffix = options.suffix || element.dataset.suffix || '';
    this.prefix = options.prefix || element.dataset.prefix || '';
    
    this.currentValue = this.startValue;
    this.startTime = null;
    this.isAnimating = false;
  }
  
  start() {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    this.startTime = performance.now();
    this.animate();
  }
  
  animate() {
    if (!this.isAnimating) return;
    
    const currentTime = performance.now();
    const elapsed = currentTime - this.startTime;
    const progress = Math.min(elapsed / this.duration, 1);
    
    // Easing function (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    
    this.currentValue = Math.round(Utils.lerp(this.startValue, this.endValue, easeOut));
    this.updateDisplay();
    
    if (progress < 1) {
      requestAnimationFrame(() => this.animate());
    } else {
      this.isAnimating = false;
    }
  }
  
  updateDisplay() {
    this.element.textContent = `${this.prefix}${this.currentValue}${this.suffix}`;
  }
}

/**
 * Progress Bar Animation
 */
class ProgressBarAnimation {
  constructor(element, options = {}) {
    this.element = element;
    this.targetWidth = options.width || parseInt(element.dataset.width) || 0;
    this.duration = options.duration || 1500;
    this.delay = options.delay || 0;
    
    this.init();
  }
  
  init() {
    this.element.style.width = '0%';
  }
  
  start() {
    setTimeout(() => {
      this.element.style.transition = `width ${this.duration}ms ease-out`;
      this.element.style.width = `${this.targetWidth}%`;
    }, this.delay);
  }
}

/**
 * Typing Animation
 */
class TypingAnimation {
  constructor(element, options = {}) {
    this.element = element;
    this.text = options.text || element.textContent;
    this.speed = options.speed || 50;
    this.delay = options.delay || 0;
    this.cursor = options.cursor || '|';
    this.showCursor = options.showCursor !== false;
    
    this.currentIndex = 0;
    this.isTyping = false;
    
    this.init();
  }
  
  init() {
    this.element.textContent = '';
  }
  
  start() {
    setTimeout(() => {
      this.type();
    }, this.delay);
  }
  
  type() {
    if (this.isTyping) return;
    
    this.isTyping = true;
    
    const typeInterval = setInterval(() => {
      if (this.currentIndex < this.text.length) {
        this.element.textContent = this.text.slice(0, this.currentIndex + 1);
        
        if (this.showCursor) {
          this.element.textContent += this.cursor;
        }
        
        this.currentIndex++;
      } else {
        clearInterval(typeInterval);
        this.isTyping = false;
        
        if (this.showCursor) {
          this.startCursorBlink();
        }
      }
    }, this.speed);
  }
  
  startCursorBlink() {
    setInterval(() => {
      if (this.element.textContent.endsWith(this.cursor)) {
        this.element.textContent = this.element.textContent.slice(0, -1);
      } else {
        this.element.textContent += this.cursor;
      }
    }, 500);
  }
}

/**
 * Magnetic Effect
 */
class MagneticEffect {
  constructor(element, options = {}) {
    this.element = element;
    this.strength = options.strength || 0.3;
    this.enabled = !Utils.prefersReducedMotion();
    
    if (this.enabled) {
      this.init();
    }
  }
  
  init() {
    this.element.addEventListener('mouseenter', () => this.onMouseEnter());
    this.element.addEventListener('mouseleave', () => this.onMouseLeave());
    this.element.addEventListener('mousemove', (e) => this.onMouseMove(e));
  }
  
  onMouseEnter() {
    this.element.style.transition = 'transform 0.3s ease';
  }
  
  onMouseLeave() {
    this.element.style.transition = 'transform 0.5s ease';
    this.element.style.transform = 'translate(0, 0)';
  }
  
  onMouseMove(e) {
    const rect = this.element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * this.strength;
    const deltaY = (e.clientY - centerY) * this.strength;
    
    this.element.style.transition = 'transform 0.1s ease';
    this.element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  }
}

/**
 * Animation Manager
 */
class AnimationManager {
  constructor() {
    this.animations = new Map();
    this.scrollController = null;
    this.particleSystem = null;
    
    this.init();
  }
  
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }
  
  setup() {
    // Initialize scroll animations
    this.scrollController = new ScrollAnimationController();
    
    // Initialize particle system
    this.initParticleSystem();
    
    // Initialize counter animations
    this.initCounterAnimations();
    
    // Initialize progress bars
    this.initProgressBars();
    
    // Initialize magnetic effects
    this.initMagneticEffects();
    
    // Initialize typing animations
    this.initTypingAnimations();
  }
  
  initParticleSystem() {
    const container = document.getElementById('particle-container');
    if (container && window.DavidAITech?.config?.features?.particles) {
      this.particleSystem = new ParticleSystem(container);
    }
  }
  
  initCounterAnimations() {
    document.querySelectorAll('[data-target]').forEach(element => {
      const counter = new CounterAnimation(element);
      this.animations.set(element, counter);
      
      // Start counter when element becomes visible
      this.scrollController.scrollObserver.observe(element);
      element.addEventListener('visible', () => counter.start(), { once: true });
    });
  }
  
  initProgressBars() {
    document.querySelectorAll('.skill-progress-bar').forEach((element, index) => {
      const progressBar = new ProgressBarAnimation(element, {
        delay: index * 100
      });
      this.animations.set(element, progressBar);
      
      // Start progress bar when parent becomes visible
      const skillCard = element.closest('.skill-card');
      if (skillCard) {
        this.scrollController.scrollObserver.observe(skillCard);
        skillCard.addEventListener('visible', () => progressBar.start(), { once: true });
      }
    });
  }
  
  initMagneticEffects() {
    document.querySelectorAll('.magnetic, .btn, .card').forEach(element => {
      const magnetic = new MagneticEffect(element);
      this.animations.set(element, magnetic);
    });
  }
  
  initTypingAnimations() {
    document.querySelectorAll('[data-typing]').forEach(element => {
      const typing = new TypingAnimation(element, {
        text: element.dataset.typing,
        speed: parseInt(element.dataset.speed) || 50,
        delay: parseInt(element.dataset.delay) || 0
      });
      this.animations.set(element, typing);
      
      // Start typing when element becomes visible
      this.scrollController.scrollObserver.observe(element);
      element.addEventListener('visible', () => typing.start(), { once: true });
    });
  }
  
  pauseAll() {
    if (this.particleSystem) {
      this.particleSystem.stop();
    }
  }
  
  resumeAll() {
    if (this.particleSystem) {
      this.particleSystem.start();
    }
  }
  
  destroy() {
    if (this.particleSystem) {
      this.particleSystem.destroy();
    }
    
    this.animations.clear();
  }
}

// Initialize animation system
const animationManager = new AnimationManager();

// Export to global scope
window.AnimationManager = animationManager;

// Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    animationManager.pauseAll();
  } else {
    animationManager.resumeAll();
  }
});
