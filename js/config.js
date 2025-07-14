// ===== CONFIGURATION & DATA =====

// === Site Configuration === 
const SITE_CONFIG = {
  name: 'David AI Tech',
  title: '클라우드 엔지니어 & AI 개발자',
  description: 'UNIX 엔지니어에서 시작하여 클라우드 인프라와 AI 솔루션을 개발하는 전문가',
  url: 'https://davidaitech.github.io',
  email: 'contact@davidaitech.dev',
  social: {
    github: 'https://github.com/davidaitech',
    linkedin: 'https://linkedin.com/in/davidaitech',
    email: 'mailto:contact@davidaitech.dev'
  }
};

// === Skills Data ===
const SKILLS_DATA = [
  {
    id: 'cloud',
    name: 'Cloud Architecture',
    icon: '☁️',
    description: 'AWS, Azure, GCP 클라우드 인프라 설계 및 운영',
    level: 85
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    icon: '🐳',
    description: '컨테이너 오케스트레이션 및 클러스터 관리',
    level: 90
  },
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    description: 'AI/ML 모델 개발 및 데이터 분석',
    level: 80
  },
  {
    id: 'golang',
    name: 'Golang',
    icon: '🔷',
    description: '고성능 백엔드 시스템 및 마이크로서비스 개발',
    level: 75
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    icon: '🧠',
    description: 'TensorFlow, PyTorch를 활용한 딥러닝 모델',
    level: 85
  },
  {
    id: 'unix-linux',
    name: 'UNIX/Linux',
    icon: '🖥️',
    description: '시스템 관리 및 서버 운영 전문성',
    level: 95
  }
];

// === Projects Data ===
const PROJECTS_DATA = [
  {
    id: 'ai-monitoring',
    title: 'AI 기반 시스템 모니터링',
    description: 'Kubernetes 클러스터의 실시간 모니터링과 예측 분석을 위한 AI 시스템.',
    image: '🤖',
    category: 'ai',
    technologies: ['Python', 'Kubernetes', 'TensorFlow', 'Prometheus'],
    links: {
      github: '#',
      demo: '#'
    }
  },
  {
    id: 'cloud-optimizer',
    title: '클라우드 비용 최적화 도구',
    description: 'Golang으로 개발된 클라우드 리소스 사용량 분석 및 비용 최적화 도구.',
    image: '📊',
    category: 'cloud',
    technologies: ['Golang', 'AWS', 'Docker', 'Grafana'],
    links: {
      github: '#',
      demo: '#'
    }
  },
  {
    id: 'ci-cd-pipeline',
    title: '자동화 배포 파이프라인',
    description: 'Kubernetes 환경에서 AI 모델의 CI/CD 파이프라인 구축.',
    image: '🔧',
    category: 'devops',
    technologies: ['Kubernetes', 'GitOps', 'Jenkins', 'Helm'],
    links: {
      github: '#',
      demo: '#'
    }
  }
];

// === Statistics Data ===
const STATS_DATA = [
  {
    id: 'experience',
    icon: '🖥️',
    number: 5,
    label: 'Years Experience',
    suffix: '+'
  },
  {
    id: 'projects',
    icon: '🚀',
    number: 20,
    label: 'Projects Completed',
    suffix: '+'
  },
  {
    id: 'technologies',
    icon: '⚙️',
    number: 15,
    label: 'Technologies',
    suffix: '+'
  }
];

// === Contact Information ===
const CONTACT_DATA = [
  {
    id: 'email',
    icon: '📧',
    title: 'Email',
    value: 'contact@davidaitech.dev',
    link: 'mailto:contact@davidaitech.dev'
  },
  {
    id: 'linkedin',
    icon: '💼',
    title: 'LinkedIn',
    value: 'linkedin.com/in/davidaitech',
    link: 'https://linkedin.com/in/davidaitech'
  },
  {
    id: 'github',
    icon: '🐙',
    title: 'GitHub',
    value: 'github.com/davidaitech',
    link: 'https://github.com/davidaitech'
  }
];

// === Configuration ===
const CONFIG = {
  features: {
    animations: true,
    particles: true,
    analytics: false
  },
  dev: {
    debug: false
  }
};

// === Export to global scope ===
window.DavidAITech = {
  config: {
    site: SITE_CONFIG,
    features: CONFIG.features,
    dev: CONFIG.dev
  },
  data: {
    skills: SKILLS_DATA,
    projects: PROJECTS_DATA,
    stats: STATS_DATA,
    contact: CONTACT_DATA
  }
};

console.log('✅ Configuration loaded successfully');
