// Social Links
export const SOCIAL_LINKS = {
  GITHUB: "https://github.com/PiyushKBhattacharyya",
  LINKEDIN: "https://www.linkedin.com/in/piyush-bhattacharyya-0b8a03131/",
  EMAIL: "piyushbhattacharyya@gmail.com"
};

// Navigation links for the navbar
export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#awards", label: "Awards" },
  { href: "#techstack", label: "Tech Stack" },
  { href: "#contact", label: "Contact" }
];

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
    title: "LLM Chatbot",
    description: "A Full Stack LLM ChatBot built with the help of Gemini API and React",
    tags: ["React", "node.js", "Express", "Gemini-API", "Clerk", "MongoDB Atlas"],
    githubUrl: "https://github.com/PiyushKBhattacharyya/LLM-ChatBot"
  },
  {
    title: "Featureless Point Cloud Registration",
    description: "A geometric alignment approach using Iterative Closest Point (ICP) to register point clouds without relying on explicit features.",
    tags: ["Open3D", "NumPy", "SciPy", "Python"],
    githubUrl: "https://github.com/PiyushKBhattacharyya/Featureless-Point-Cloud-Registration"
  },
  {
    title: "Multiclass Arrythmia Detection",
    description: "Developing a 1D-CNN-BiLSTM model for arrhythmia classification",
    tags: ["TensorFlow", "NumPy", "Pandas", "Python"],
    githubUrl: "https://github.com/PiyushKBhattacharyya/arrthymia-study"
  },
];

// Awards and achievements
export const AWARDS = [
  {
    year: "2025",
    title: "Best Paper Award at NIELIT's NICEDT-2025",
    description: "Awarded for the paper titled 'Development of Lightweight 1D-CNN-BiLSTM Arrhythmia Detection Technique for Real-Time ECG Monitoring' at NIELIT's International Conference on Communication, Electronics & Digital Technologies.",
    image: "/images/certificate.jpg",
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
    title: "AIoT Intern",
    company: "National Institute of Electronics and Information Technology (NIELIT)",
    period: "May 2024 - Jun 2024",
    description: "Leveraging deep learning for medical diagnostics, I developed a Heart Disease Prediction Model using MLP, enhancing diagnostic efficiency by 15%. Additionally, I also built a 1D-CNN-BiLSTM Arrhythmia Detection Model, achieving an impressive 99.4% accuracy in ECG classification, contributing to more reliable and automated healthcare solutions",
    skills: ["Python", "TensorFlow", "ECG Analysis"],
    colorClass: "primary"
  },
  {
    title: "App Developer Apprenticeship",
    company: "National Informatics Centre (NIC)",
    period: "June 2023 - July 2023",
    description: "Engineered an AI-powered Face Recognition System, cutting authentication errors by 30%. Developed a Student Information System with PHP, MySQL, and REST APIs, optimizing data retrieval and UI performance. Additionally, designed secure and scalable backend architectures for Android applications, ensuring efficiency and reliability.",
    skills: ["Flutter", "Dart", "REST API", "Docker"],
    colorClass: "secondary"
  },
];
