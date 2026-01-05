// Social Links
export const SOCIAL_LINKS = {
  GITHUB: "https://github.com/PiyushKBhattacharyya",
  LINKEDIN: "https://www.linkedin.com/in/piyush-bhattacharyya-0b8a03131/",
  EMAIL: "piyushbhattacharyya@gmail.com"
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
    title: "Krishi Sahayogi",
    description: "A platform revolutionizing farming through advanced drone technologies and AI, providing intelligent solutions for sustainable growth and a prosperous future.",
    tags: ["React", "node.js", "FastAPI", "Gemini-API", "Machine Learning", "Supabase", "Kubernetes", "Docker"],
    liveUrl: "https://www.krishisahayogi.com/"
  },
  {
    title: "Featureless Point Cloud Registration",
    description: "A geometric alignment approach using Iterative Closest Point (ICP) to register point clouds without relying on explicit features.",
    tags: ["Open3D", "NumPy", "SciPy", "Python"],
    githubUrl: "https://github.com/PiyushKBhattacharyya/Featureless-Point-Cloud-Registration"
  },
  {
    title: "AutoML",
    description: "An interactive web application that simplifies the machine learning workflow.",
    tags: ["Streamlit", "PyCaret", "Pandas Profiling", "Plotly"],
    githubUrl: "https://github.com/PiyushKBhattacharyya/AutoML",
    liveUrl: "https://automl.streamlit.app/"
  },
];

// Publications
export const publications = [
  {
    title: "ECG Arrhythmia Detection Using Lightweight 1DCNN-Bi-LSTM Technique for Cardiovascular Disease",
    authors: ["Payel Sarmah", "Piyush Kaushik Bhattacharyya", "et al."],
    conference: "NICEDT-2025",
    year: "4/01/2026",
    doi: "10.1007/978-981-96-9932-2_27",
    abstract: "This paper introduces a lightweight 1DCNN-Bi-LSTM architecture for real-time arrhythmia detection on 12-lead ECG signals. By implementing model pruning on a dataset of 45,152 patients, the proposed framework achieves 99.4% accuracy while significantly reducing computational overhead, making it highly effective for on-device cardiovascular monitoring.",
    link: "https://link.springer.com/chapter/10.1007/978-981-96-9932-2_27"
  },
  {
    title: "Continual Learning for Food Category Classification Dataset: Enhancing Model Adaptability and Performance",
    authors: ["Piyush Kaushik Bhattacharyya et al."],
    conference: "2025 International Conference on Artificial intelligence and Emerging Technologies (ICAIET)",
    year: "30/10/2025",
    doi: "10.1109/ICAIET65052.2025.11211231",
    abstract: "This paper presents a continual text-guided food classification framework that overcomes the limitations of conventional ML pipelines by enabling incremental learning of new categories without forgetting, making it adaptable for real-world dietary monitoring and personalized nutrition.",
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
    title: "Summer Intern",
    company: "Indian Oil Corporation Ltd. (IOCL)",
    period: "May 2025 - Jun 2025",
    description: "Led the design, development, and training of a Computer Vision model to detect Personal Protective Equipment (PPE) compliance (helmets, safety vests, gloves) for refinery workers.",
    skills: ["Machine Learning", "Image Processing", "Project Management"],
    colorClass: "primary"
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
