// ===== COMPONENT SYSTEM =====

/**
 * Skill Card Component
 */
class SkillCard {
  constructor(skillData) {
    this.data = skillData;
    this.element = null;
  }
  
  render() {
    this.element = Utils.createElement('div', {
      className: 'skill-card fade-in-scroll',
      dataset: { stagger: Math.random() * 5 }
    });
    
    this.element.innerHTML = `
      <div class="skill-icon">${this.data.icon}</div>
      <div class="skill-name">${this.data.name}</div>
      <div class="skill-description">${this.data.description}</div>
      ${this.data.level ? this.renderProgressBar() : ''}
    `;
    
    this.addEventListeners();
    return this.element;
  }
  
  renderProgressBar() {
    return `
      <div class="skill-level">
        <div class="skill-progress">
          <div class="skill-progress-bar" data-width="${this.data.level}"></div>
        </div>
        <span class="skill-percentage">${this.data.level}%</span>
      </div>
    `;
  }
  
  addEventListeners() {
    this.element.addEventListener('click', () => {
      this.handleClick();
    });
    
    this.element.addEventListener('mouseenter', () => {
      this.handleHover();
    });
  }
  
  handleClick() {
    // Analytics tracking if enabled
    if (window.DavidAITech?.config?.api?.analytics?.enabled) {
      // Track skill click event
      console.log('Skill clicked:', this.data.name);
    }
    
    // Show skill details (could open a modal or expand)
    this.showDetails();
  }
  
  handleHover() {
    // Add subtle animation or effect
    if (!Utils.prefersReducedMotion()) {
      this.element.style.transform = 'translateY(-8px) scale(1.02)';
    }
  }
  
  showDetails() {
    // Create a simple tooltip or modal with more skill information
    const details = Utils.createElement('div', {
      className: 'skill-details-tooltip',
      style: 'position: absolute; background: var(--bg-card); padding: 1rem; border-radius: 8px; box-shadow: var(--shadow-lg); z-index: 1000;'
    });
    
    details.innerHTML = `
      <h4>${this.data.name}</h4>
      <p>${this.data.description}</p>
      ${this.data.keywords ? `<div class="skill-keywords">${this.data.keywords.map(k => `<span class="tag">${k}</span>`).join('')}</div>` : ''}
    `;
    
    document.body.appendChild(details);
    
    // Position tooltip
    const rect = this.element.getBoundingClientRect();
    details.style.left = `${rect.left}px`;
    details.style.top = `${rect.bottom + 10}px`;
    
    // Remove tooltip after delay
    setTimeout(() => {
      if (details.parentNode) {
        details.parentNode.removeChild(details);
      }
    }, 3000);
  }
}

/**
 * Project Card Component
 */
class ProjectCard {
  constructor(projectData) {
    this.data = projectData;
    this.element = null;
  }
  
  render() {
    this.element = Utils.createElement('div', {
      className: `project-card fade-in-scroll ${this.data.category}`,
      dataset: { 
        category: this.data.category,
        stagger: Math.random() * 5 
      }
    });
    
    this.element.innerHTML = `
      <div class="project-image">${this.data.image}</div>
      <div class="project-content">
        <h3 class="project-title">${this.data.title}</h3>
        <p class="project-description">${this.data.description}</p>
        <div class="project-tech">
          ${this.data.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        ${this.data.features ? this.renderFeatures() : ''}
        <div class="project-links">
          ${this.renderLinks()}
        </div>
        ${this.data.status ? `<div class="project-status status-${this.data.status}">${this.getStatusText()}</div>` : ''}
      </div>
    `;
    
    this.addEventListeners();
    return this.element;
  }
  
  renderFeatures() {
    return `
      <div class="project-features">
        <h4>주요 기능:</h4>
        <ul>
          ${this.data.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  renderLinks() {
    const links = [];
    
    if (this.data.links.github) {
      links.push(`<a href="${this.data.links.github}" class="project-link" target="_blank" rel="noopener">GitHub →</a>`);
    }
    
    if (this.data.links.demo) {
      links.push(`<a href="${this.data.links.demo}" class="project-link" target="_blank" rel="noopener">Demo →</a>`);
    }
    
    if (this.data.links.docs) {
      links.push(`<a href="${this.data.links.docs}" class="project-link" target="_blank" rel="noopener">Docs →</a>`);
    }
    
    return links.join('');
  }
  
  getStatusText() {
    const statusMap = {
      'completed': '완료',
      'in-progress': '진행 중',
      'planned': '계획됨'
    };
    return statusMap[this.data.status] || this.data.status;
  }
  
  addEventListeners() {
    this.element.addEventListener('click', (e) => {
      if (!e.target.closest('.project-link')) {
        this.handleClick();
      }
    });
    
    // Add hover effect for project image
    const projectImage = this.element.querySelector('.project-image');
    if (projectImage) {
      projectImage.addEventListener('mouseenter', () => {
        if (!Utils.prefersReducedMotion()) {
          projectImage.style.transform = 'scale(1.1)';
        }
      });
      
      projectImage.addEventListener('mouseleave', () => {
        projectImage.style.transform = 'scale(1)';
      });
    }
  }
  
  handleClick() {
    // Analytics tracking
    if (window.DavidAITech?.config?.api?.analytics?.enabled) {
      console.log('Project viewed:', this.data.title);
    }
    
    // Could open project details modal
    this.showProjectModal();
  }
  
  showProjectModal() {
    // Simple implementation - could be expanded
    const modal = Utils.createElement('div', {
      className: 'project-modal',
      style: `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.8); display: flex; align-items: center;
        justify-content: center; z-index: 10000; padding: 2rem;
      `
    });
    
    modal.innerHTML = `
      <div class="modal-content" style="
        background: var(--bg-card); padding: 2rem; border-radius: 1rem;
        max-width: 600px; width: 100%; max-height: 80vh; overflow-y: auto;
      ">
        <h2>${this.data.title}</h2>
        <p>${this.data.description}</p>
        ${this.data.features ? `<h3>주요 기능:</h3><ul>${this.data.features.map(f => `<li>${f}</li>`).join('')}</ul>` : ''}
        <div class="modal-tech">
          ${this.data.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <div style="margin-top: 2rem;">
          ${this.renderLinks()}
          <button class="btn btn-secondary" onclick="this.closest('.project-modal').remove()">닫기</button>
        </div>
      </div>
    `;
    
    // Close modal on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
    
    document.body.appendChild(modal);
  }
}

/**
 * Contact Item Component
 */
class ContactItem {
  constructor(contactData) {
    this.data = contactData;
    this.element = null;
  }
  
  render() {
    this.element = Utils.createElement('div', {
      className: 'contact-item fade-in-scroll'
    });
    
    this.element.innerHTML = `
      <div class="contact-icon">${this.data.icon}</div>
      <div class="contact-details">
        <h3 class="contact-title">${this.data.title}</h3>
        <a href="${this.data.link}" class="contact-link" target="_blank" rel="noopener">
          ${this.data.value}
        </a>
        ${this.data.description ? `<p class="contact-description">${this.data.description}</p>` : ''}
      </div>
    `;
    
    this.addEventListeners();
    return this.element;
  }
  
  addEventListeners() {
    const link = this.element.querySelector('.contact-link');
    link.addEventListener('click', () => {
      // Analytics tracking
      if (window.DavidAITech?.config?.api?.analytics?.enabled) {
        console.log('Contact link clicked:', this.data.title);
      }
      
      // Show success message for email
      if (this.data.id === 'email') {
        this.showEmailCopied();
      }
    });
  }
  
  showEmailCopied() {
    // Copy email to clipboard
    Utils.copyToClipboard(this.data.value.replace('mailto:', ''));
    
    // Show temporary message
    const message = Utils.createElement('div', {
      className: 'copy-message',
      style: `
        position: absolute; top: -40px; left: 50%; transform: translateX(-50%);
        background: var(--primary-color); color: var(--bg-primary);
        padding: 0.5rem 1rem; border-radius: 4px; font-size: 0.8rem;
        z-index: 1000; animation: fadeInUp 0.3s ease;
      `
    }, '이메일이 복사되었습니다!');
    
    this.element.style.position = 'relative';
    this.element.appendChild(message);
    
    setTimeout(() => {
      if (message.parentNode) {
        message.remove();
      }
    }, 2000);
  }
}

/**
 * Statistic Counter Component
 */
class StatCard {
  constructor(statData) {
    this.data = statData;
    this.element = null;
  }
  
  render() {
    this.element = Utils.createElement('div', {
      className: 'stat-card fade-in-scroll'
    });
    
    this.element.innerHTML = `
      <div class="stat-icon">${this.data.icon}</div>
      <div class="stat-number" data-target="${this.data.number}">${this.data.suffix || ''}</div>
      <div class="stat-label">${this.data.label}</div>
    `;
    
    return this.element;
  }
}

/**
 * Project Filter Component
 */
class ProjectFilter {
  constructor(container, projects) {
    this.container = container;
    this.projects = projects;
    this.activeFilter = 'all';
    this.element = null;
  }
  
  render() {
    const categories = ['all', ...new Set(this.projects.map(p => p.category))];
    
    this.element = Utils.createElement('div', {
      className: 'projects-filter'
    });
    
    categories.forEach(category => {
      const button = Utils.createElement('button', {
        className: `filter-btn ${category === 'all' ? 'active' : ''}`,
        dataset: { filter: category }
      }, this.getCategoryLabel(category));
      
      button.addEventListener('click', () => this.handleFilterClick(category));
      
      this.element.appendChild(button);
    });
    
    return this.element;
  }
  
  getCategoryLabel(category) {
    const labels = {
      'all': 'All',
      'ai': 'AI/ML',
      'cloud': 'Cloud',
      'devops': 'DevOps'
    };
    return labels[category] || category;
  }
  
  handleFilterClick(category) {
    this.activeFilter = category;
    
    // Update button states
    this.element.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === category);
    });
    
    // Filter projects
    this.filterProjects(category);
  }
  
  filterProjects(category) {
    const projectCards = this.container.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      const shouldShow = category === 'all' || card.dataset.category === category;
      
      if (shouldShow) {
        card.style.display = 'block';
        card.classList.add('fade-in-scroll');
      } else {
        card.style.display = 'none';
      }
    });
    
    // Re-trigger animations for visible cards
    setTimeout(() => {
      projectCards.forEach(card => {
        if (card.style.display !== 'none') {
          card.classList.add('visible');
        }
      });
    }, 100);
  }
}

/**
 * Navigation Component
 */
class Navigation {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.mobileToggle = document.getElementById('mobile-menu-toggle');
    this.navLinks = document.querySelector('.nav-links');
    this.activeSection = 'hero';
    
    this.init();
  }
  
  init() {
    this.setupScrollHandler();
    this.setupMobileMenu();
    this.setupSmoothScroll();
    this.setupActiveSection();
  }
  
  setupScrollHandler() {
    const scrollHandler = Utils.throttle(() => {
      this.updateNavbarStyle();
      this.updateActiveSection();
    }, 16);
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
  }
  
  updateNavbarStyle() {
    const scrolled = window.pageYOffset > 50;
    this.navbar.classList.toggle('scrolled', scrolled);
  }
  
  setupMobileMenu() {
    if (!this.mobileToggle || !this.navLinks) return;
    
    this.mobileToggle.addEventListener('click', () => {
      this.toggleMobileMenu();
    });
    
    // Close menu when clicking on a link
    this.navLinks.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav-link')) {
        this.closeMobileMenu();
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.navbar.contains(e.target)) {
        this.closeMobileMenu();
      }
    });
  }
  
  toggleMobileMenu() {
    this.mobileToggle.classList.toggle('active');
    this.navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  }
  
  closeMobileMenu() {
    this.mobileToggle.classList.remove('active');
    this.navLinks.classList.remove('active');
    document.body.classList.remove('menu-open');
  }
  
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const offset = -80; // Account for fixed navbar
          Utils.smoothScrollTo(targetElement, offset);
        }
      });
    });
  }
  
  setupActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
  }
  
  setActiveSection(sectionId) {
    if (this.activeSection === sectionId) return;
    
    this.activeSection = sectionId;
    
    document.querySelectorAll('.nav-link').forEach(link => {
      const isActive = link.getAttribute('href') === `#${sectionId}`;
      link.classList.toggle('active', isActive);
    });
  }
}

/**
 * Back to Top Component
 */
class BackToTop {
  constructor() {
    this.button = document.getElementById('back-to-top');
    this.visible = false;
    
    this.init();
  }
  
  init() {
    if (!this.button) return;
    
    this.setupScrollHandler();
    this.setupClickHandler();
  }
  
  setupScrollHandler() {
    const scrollHandler = Utils.throttle(() => {
      const shouldShow = window.pageYOffset > 300;
      
      if (shouldShow !== this.visible) {
        this.visible = shouldShow;
        this.button.classList.toggle('visible', shouldShow);
      }
    }, 100);
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
  }
  
  setupClickHandler() {
    this.button.addEventListener('click', () => {
      Utils.smoothScrollTo(document.body, 0, 800);
    });
  }
}

/**
 * Contact Form Component
 */
class ContactForm {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.isSubmitting = false;
    
    this.init();
  }
  
  init() {
    if (!this.form) return;
    
    this.setupFormValidation();
    this.setupSubmitHandler();
  }
  
  setupFormValidation() {
    const inputs = this.form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearErrors(input));
    });
  }
  
  validateField(field) {
    const config = window.DavidAITech?.config?.form?.fields?.[field.name];
    if (!config) return true;
    
    let isValid = true;
    let errorMessage = '';
    
    // Required validation
    if (config.required && !field.value.trim()) {
      isValid = false;
      errorMessage = '이 필드는 필수입니다.';
    }
    
    // Email validation
    if (field.type === 'email' && field.value && !Utils.validateEmail(field.value)) {
      isValid = false;
      errorMessage = '올바른 이메일 주소를 입력해주세요.';
    }
    
    // Length validation
    if (config.minLength && field.value.length < config.minLength) {
      isValid = false;
      errorMessage = `최소 ${config.minLength}자 이상 입력해주세요.`;
    }
    
    if (config.maxLength && field.value.length > config.maxLength) {
      isValid = false;
      errorMessage = `최대 ${config.maxLength}자까지 입력 가능합니다.`;
    }
    
    this.showFieldError(field, isValid ? '' : errorMessage);
    return isValid;
  }
  
  showFieldError(field, message) {
    // Remove existing error
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
    
    if (message) {
      const errorElement = Utils.createElement('div', {
        className: 'field-error',
        style: 'color: var(--error-color); font-size: 0.8rem; margin-top: 0.25rem;'
      }, message);
      
      field.parentNode.appendChild(errorElement);
      field.classList.add('error');
    } else {
      field.classList.remove('error');
    }
  }
  
  clearErrors(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
    field.classList.remove('error');
  }
  
  setupSubmitHandler() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }
  
  async handleSubmit() {
    if (this.isSubmitting) return;
    
    // Validate all fields
    const inputs = this.form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    if (!isValid) return;
    
    this.isSubmitting = true;
    this.showSubmitState(true);
    
    try {
      // Simulate form submission (replace with actual endpoint)
      await this.submitForm();
      this.showSuccess();
      this.form.reset();
    } catch (error) {
      this.showError(error.message);
    } finally {
      this.isSubmitting = false;
      this.showSubmitState(false);
    }
  }
  
  async submitForm() {
    // Mock submission - replace with actual implementation
    await Utils.wait(2000);
    
    // For now, just log the form data
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());
    console.log('Form submitted:', data);
    
    // Simulate success/error
    if (Math.random() > 0.8) {
      throw new Error('네트워크 오류가 발생했습니다.');
    }
  }
  
  showSubmitState(isSubmitting) {
    const submitBtn = this.form.querySelector('.form-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    if (isSubmitting) {
      submitBtn.disabled = true;
      btnText.style.display = 'none';
      btnLoader.style.display = 'block';
    } else {
      submitBtn.disabled = false;
      btnText.style.display = 'block';
      btnLoader.style.display = 'none';
    }
  }
  
  showSuccess() {
    this.showMessage('메시지가 성공적으로 전송되었습니다!', 'success');
  }
  
  showError(message) {
    this.showMessage(message || '오류가 발생했습니다. 다시 시도해주세요.', 'error');
  }
  
  showMessage(text, type) {
    const message = Utils.createElement('div', {
      className: `form-message ${type}`,
      style: `
        padding: 1rem; margin-top: 1rem; border-radius: 0.5rem;
        background: ${type === 'success' ? 'var(--success-color)' : 'var(--error-color)'};
        color: white; text-align: center;
      `
    }, text);
    
    this.form.appendChild(message);
    
    setTimeout(() => {
      if (message.parentNode) {
        message.remove();
      }
    }, 5000);
  }
}

/**
 * Component Manager
 */
class ComponentManager {
  constructor() {
    this.components = new Map();
    this.init();
  }
  
  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }
  
  setup() {
    this.renderSkills();
    this.renderProjects();
    this.renderStats();
    this.renderContactItems();
    this.initNavigation();
    this.initBackToTop();
    this.initContactForm();
  }
  
  renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;
    
    const skillsData = window.DavidAITech?.data?.skills || [];
    
    skillsData.forEach(skillData => {
      const skillCard = new SkillCard(skillData);
      container.appendChild(skillCard.render());
    });
  }
  
  renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    
    const projectsData = window.DavidAITech?.data?.projects || [];
    
    // Render filter
    const filterContainer = grid.parentNode.querySelector('.projects-filter');
    if (filterContainer) {
      const filter = new ProjectFilter(grid, projectsData);
      filterContainer.replaceWith(filter.render());
    }
    
    // Render project cards
    projectsData.forEach(projectData => {
      const projectCard = new ProjectCard(projectData);
      grid.appendChild(projectCard.render());
    });
  }
  
  renderStats() {
    const statsContainer = document.querySelector('.about-stats');
    if (!statsContainer) return;
    
    const statsData = window.DavidAITech?.data?.stats || [];
    
    statsData.forEach(statData => {
      const statCard = new StatCard(statData);
      statsContainer.appendChild(statCard.render());
    });
  }
  
  renderContactItems() {
    const container = document.querySelector('.contact-info');
    if (!container) return;
    
    const contactData = window.DavidAITech?.data?.contact || [];
    
    // Clear existing items
    container.innerHTML = '';
    
    contactData.forEach(itemData => {
      const contactItem = new ContactItem(itemData);
      container.appendChild(contactItem.render());
    });
  }
  
  initNavigation() {
    const navigation = new Navigation();
    this.components.set('navigation', navigation);
  }
  
  initBackToTop() {
    const backToTop = new BackToTop();
    this.components.set('backToTop', backToTop);
  }
  
  initContactForm() {
    const contactForm = new ContactForm();
    this.components.set('contactForm', contactForm);
  }
  
  getComponent(name) {
    return this.components.get(name);
  }
}

// Initialize component manager
const componentManager = new ComponentManager();

// Export to global scope
window.ComponentManager = componentManager;
