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

// === Animation Configuration ===
const ANIMATION_CONFIG = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
    slower: 800
  },
  delay: {
    stagger: 100,
    section: 200
  },
  easing: {
    ease: 'ease',
    easeInOut: 'ease-in-out',
    easeOut: 'ease-out',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  }
};

// === Particle System Configuration ===
const PARTICLE_CONFIG = {
  count: 50,
  speed: {
    min: 2,
    max: 5
  },
  size: {
    min: 1,
    max: 3
  },
  opacity: {
    min: 0.3,
    max: 0.8
  },
  colors: [
    'rgba(0, 255, 136, 0.6)',
    'rgba(0, 102, 255, 0.4)',
    'rgba(255, 255, 255, 0.3)'
  ]
};

// === Skills Data ===
const SKILLS_DATA = [
  {
    id: 'cloud',
    name: 'Cloud Architecture',
    icon: '☁️',
    description: 'AWS, Azure, GCP 클라우드 인프라 설계 및 운영',
    category: 'infrastructure',
    level: 85,
    keywords: ['AWS', 'Azure', 'GCP', 'Infrastructure']
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    icon: '🐳',
    description: '컨테이너 오케스트레이션 및 클러스터 관리',
    category: 'devops',
    level: 90,
    keywords: ['K8s', 'Docker', 'Container', 'Orchestration']
  },
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    description: 'AI/ML 모델 개발 및 데이터 분석',
    category: 'programming',
    level: 80,
    keywords: ['Python', 'AI', 'ML', 'Data Science']
  },
  {
    id: 'golang',
    name: 'Golang',
    icon: '🔷',
    description: '고성능 백엔드 시스템 및 마이크로서비스 개발',
    category: 'programming',
    level: 75,
    keywords: ['Go', 'Backend', 'Microservices', 'Performance']
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    icon: '🧠',
    description: 'TensorFlow, PyTorch를 활용한 딥러닝 모델',
    category: 'ai',
    level: 85,
    keywords: ['TensorFlow', 'PyTorch', 'Deep Learning', 'Neural Networks']
  },
  {
    id: 'unix-linux',
    name: 'UNIX/Linux',
    icon: '🖥️',
    description: '시스템 관리 및 서버 운영 전문성',
    category: 'system',
    level: 95,
    keywords: ['Linux', 'UNIX', 'System Admin', 'Shell Scripting']
  }
];

// === Projects Data ===
const PROJECTS_DATA = [
  {
    id: 'ai-monitoring',
    title: 'AI 기반 시스템 모니터링',
    description: 'Kubernetes 클러스터의 실시간 모니터링과 예측 분석을 위한 AI 시스템. 이상 징후 탐지와 자동 스케일링을 통해 시스템 안정성 향상.',
    image: '🤖',
    category: 'ai',
    technologies: ['Python', 'Kubernetes', 'TensorFlow', 'Prometheus'],
    features: [
      '실시간 클러스터 모니터링',
      '머신러닝 기반 이상 탐지',
      '자동 스케일링 알고리즘',
      'Grafana 대시보드 통합'
    ],
    links: {
      github: '#',
      demo: '#',
      docs: '#'
    },
    status: 'completed',
    year: '2024'
  },
  {
    id: 'cloud-optimizer',
    title: '클라우드 비용 최적화 도구',
    description: 'Golang으로 개발된 클라우드 리소스 사용량 분석 및 비용 최적화 도구. 다중 클라우드 환경에서의 효율적인 리소스 관리 솔루션.',
    image: '📊',
    category: 'cloud',
    technologies: ['Golang', 'AWS', 'Docker', 'Grafana'],
    features: [
      '다중 클라우드 지원',
      '비용 분석 및 예측',
      '리소스 사용량 최적화',
      '자동화된 권장사항'
    ],
    links: {
      github: '#',
      demo: '#'
    },
    status: 'completed',
    year: '2024'
  },
  {
    id: 'ci-cd-pipeline',
    title: '자동화 배포 파이프라인',
    description: 'Kubernetes 환경에서 AI 모델의 CI/CD 파이프라인 구축. GitOps 기반의 자동화된 배포 및 롤백 시스템.',
    image: '🔧',
    category: 'devops',
    technologies: ['Kubernetes', 'GitOps', 'Jenkins', 'Helm'],
    features: [
      'GitOps 워크플로우',
      '자동화된 테스팅',
      '무중단 배포',
      '롤백 시스템'
    ],
    links: {
      github: '#',
      demo: '#'
    },
    status: 'in-progress',
    year: '2024'
  }
];

// === Experience Timeline Data ===
const EXPERIENCE_DATA = [
  {
    id: 'unix-engineer',
    title: 'UNIX 시스템 엔지니어',
    description: '시스템 관리 및 인프라 운영 전문성 구축',
    period: '2019-2021',
    skills: ['Linux', 'Shell Scripting', 'System Administration']
  },
  {
    id: 'cloud-engineer',
    title: '클라우드 엔지니어',
    description: '클라우드 인프라 설계 및 컨테이너 오케스트레이션',
    period: '2021-2023',
    skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform']
  },
  {
    id: 'ai-developer',
    title: 'AI 개발자',
    description: '인공지능과 머신러닝 솔루션 개발',
    period: '2023-Present',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'MLOps']
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
    link: 'mailto:contact@davidaitech.dev',
    description: '프로젝트 문의 및 협업 제안'
  },
  {
    id: 'linkedin',
    icon: '💼',
    title: 'LinkedIn',
    value: 'linkedin.com/in/davidaitech',
    link: 'https://linkedin.com/in/davidaitech',
    description: '전문적인 네트워킹'
  },
  {
    id: 'github',
    icon: '🐙',
    title: 'GitHub',
    value: 'github.com/davidaitech',
    link: 'https://github.com/davidaitech',
    description: '코드 포트폴리오 및 오픈소스'
  }
];

// === Form Configuration ===
const FORM_CONFIG = {
  endpoint: '#', // Replace with actual form endpoint
  fields: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 50
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    subject: {
      required: true,
      minLength: 5,
      maxLength: 100
    },
    message: {
      required: true,
      minLength: 10,
      maxLength: 1000
    }
  },
  messages: {
    success: '메시지가 성공적으로 전송되었습니다!',
    error: '메시지 전송 중 오류가 발생했습니다.',
    validation: {
      required: '이 필드는 필수입니다.',
      email: '올바른 이메일 주소를 입력해주세요.',
      minLength: '최소 {min}자 이상 입력해주세요.',
      maxLength: '최대 {max}자까지 입력 가능합니다.'
    }
  }
};

// === Navigation Configuration ===
const NAV_CONFIG = {
  sections: [
    { id: 'hero', label: 'Home', offset: 0 },
    { id: 'about', label: 'About', offset: -80 },
    { id: 'skills', label: 'Skills', offset: -80 },
    { id: 'projects', label: 'Projects', offset: -80 },
    { i
