// Social Links
export const SOCIAL_LINKS = {
  GITHUB: "https://github.com/PiyushKBhattacharyya",
  LINKEDIN: "https://www.linkedin.com/in/piyush-bhattacharyya-0b8a03131/"
};

// Skills for the about section
export const SKILLS = [
  {
    title: "Web Development",
    description: "Building responsive and performant web applications using modern frameworks and technologies."
  },
  {
    title: "Responsive Design",
    description: "Crafting interfaces that work seamlessly across all devices and screen sizes."
  },
  {
    title: "Backend Systems",
    description: "Developing robust and scalable server-side applications and APIs."
  },
  {
    title: "Machine Learning",
    description: "Designing and deploying intelligent models for data-driven decision-making, automation, and predictive analytics."
  }
];

// Projects to showcase
export const PROJECTS = [
  {
    title: "Krishi-Sahayogi",
    badge: "Incubated By NIELIT",
    description: "Built on-device crop disease detection using MobileNetV2 (98.3% accuracy on 2,000+ field images), enabling offline inference in low-connectivity rural environments. Designed scalable backend APIs for model updates and disease metadata retrieval.",
    tags: ["React", "node.js", "FastAPI", "Gemini-API", "Machine Learning", "Supabase", "Kubernetes", "Docker"],
    liveUrl: "https://krishisahayogi.com/"
  },
  {
    title: "Sys_Logger",
    badge: "Used by NIELIT",
    description: "Built containerized full-stack monitoring system (Flask + Next.js) for real-time CPU, RAM, GPU, and network telemetry across institutional lab infrastructure. Implemented health-check endpoints and configurable polling for fleet-level observability.",
    tags: ["Flask", "Next.js", "Monitoring", "Telemetry", "Docker"],
    liveUrl: "https://lab-monitoring.nielitbhubaneswar.in/"
  },
  {
    title: "Skynet",
    description: "Engineered a hierarchical 3-level meta-learning system combining PPO-based meta-policy optimization, evolutionary population search, and LoRA-adapted transformer modules. Parameterized training dynamics into a differentiable 22-dimensional control vector, enabling continuous NAS.",
    tags: ["PyTorch", "PPO", "LoRA", "Meta-Learning", "NAS"]
  },
  {
    title: "Apex OS",
    description: "Developing a Rust-based experimental OS with reinforcement learning-driven CPU scheduling for adaptive resource allocation. Implementing capability-based security, TPM 2.0 integration, and verified boot for kernel-level guarantees.",
    tags: ["Rust", "Systems Programming", "Kernel", "RL", "Security"]
  },
];

// Publications
export const publications = [
  {
    title: "End-to-End Real-Time Drone-Based Person Detection Framework Using Deep Learning",
    authors: ["P. K. Bhattacharyya", "et al."],
    conference: "ICRAS-2026 (Preprint / arXiv)",
    year: "2026",
    doi: "arXiv:2607.10605",
    abstract: "Presents an end-to-end real-time drone-based person detection framework leveraging deep learning, optimized for high precision and low-latency inference in aerial monitoring scenarios.",
    link: "https://arxiv.org/abs/2607.10605"
  },
  {
    title: "AutoNorm: Understanding Adaptive Normalization in Transformers through Differentiable Gating",
    authors: ["P. K. Bhattacharyya", "et al."],
    conference: "arXiv",
    year: "2026",
    doi: "arXiv:2607.10593",
    abstract: "Analyzes adaptive normalization dynamics in transformer architectures using differentiable gating to improve training stability and representation learning across deep models.",
    link: "https://arxiv.org/abs/2607.10593"
  },
  {
    title: "ECG Arrhythmia Detection Using Lightweight 1DCNN-Bi-LSTM Technique for Cardiovascular Disease",
    authors: ["Payel Sarmah", "P. K. Bhattacharyya", "et al."],
    conference: "Springer (SN Computer Science)",
    year: "2026",
    doi: "10.1007/978-981-96-9932-2_27",
    abstract: "This paper introduces a lightweight 1DCNN-Bi-LSTM architecture for real-time arrhythmia detection on 12-lead ECG signals, achieving high accuracy with minimal computational overhead.",
    link: "https://link.springer.com/chapter/10.1007/978-981-96-9932-2_27"
  },
  {
    title: "Continual Learning for Food Category Classification Dataset: Enhancing Model Adaptability and Performance",
    authors: ["P. K. Bhattacharyya", "et al."],
    conference: "IEEE (ICAIET)",
    year: "2025",
    doi: "10.1109/ICAIET65052.2025.11211231",
    abstract: "This paper presents a continual learning framework for food classification, enabling incremental learning without catastrophic forgetting.",
    link: "https://ieeexplore.ieee.org/document/11211231"
  },
];

// Awards and achievements
export const AWARDS = [
  {
    year: "2025",
    title: "Best Paper Award at NIELIT's NICEDT-2025",
    description: "Awarded for the paper titled 'Development of Lightweight 1D-CNN-BiLSTM Arrhythmia Detection Technique for Real-Time ECG Monitoring' at NIELIT's International Conference on Communication, Electronics & Digital Technologies.",
    image: "/certificate.jpg",
    colorClass: "primary"
  }
];

// Tech stack using SVG icons
export const TECH_STACK = [
  { name: "React" },
  { name: "Node.js" },
  { name: "JavaScript" },
  { name: "Python" },
  { name: "TensorFlow" },
  { name: "PyTorch" },
  { name: "MongoDB" },
  { name: "Docker" },
  { name: "Git" }
];

// Work Experience
export const EXPERIENCE = [
  {
    title: "Advanced App Engineering Analyst",
    company: "Accenture · Full-time",
    period: "Jul 2026 - Present",
    description: "Engineering and developing scalable enterprise applications, architecting modern application components, and implementing high-throughput software solutions with robust deployment practices.",
    skills: ["Enterprise Systems", "Application Engineering", "Cloud Systems", "Full Stack"],
    colorClass: "primary"
  },
  {
    title: "Project Intern",
    company: "Indian Oil Corporation Ltd. (IOCL)",
    period: "May 2025 - Jun 2025",
    description: "Led the design, development, and training of a Computer Vision model to detect Personal Protective Equipment (PPE) compliance (helmets, safety vests, gloves) for refinery workers.",
    skills: ["Machine Learning", "Image Processing", "Project Management"],
    colorClass: "secondary"
  },
  {
    title: "AIoT Intern",
    company: "National Institute of Electronics and Information Technology (NIELIT)",
    period: "May 2024 - Jun 2024",
    description: "Developed a deep learning architecture for arrhythmia detection, significantly reducing reliance on manual ECG analysis and streamlining cardiac risk assessment workflows.",
    skills: ["Python", "TensorFlow", "ECG Analysis"],
    colorClass: "secondary"
  },
  {
    title: "App Developer Apprenticeship",
    company: "National Informatics Centre (NIC)",
    period: "June 2023 - July 2023",
    description: "Engineered an AI-powered Face Recognition System, cutting authentication errors by 30%. Developed a Student Information System with PHP, MySQL, and REST APIs, optimizing data retrieval and UI performance. Additionally, designed secure and scalable backend architectures for Android applications, ensuring efficiency and reliability.",
    skills: ["Flutter", "Dart", "REST API", "Docker"],
    colorClass: "secondary"
  }
];
