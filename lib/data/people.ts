// ─── Types ────────────────────────────────────────────────────────────────────
export type PersonRole = "Principal Investigator" | "PhD Scholar" | "MS Scholar" | "Project Staff" | "Alumni";

export interface PersonPublication {
  title: string;
  venue: string;
  year: number;
  doi?: string;
}

export interface Person {
  id: number;
  slug: string;
  name: string;
  role: PersonRole;
  designation: string;          // e.g. "Assistant Professor", "PhD Candidate"
  department: string;
  institute: string;
  email: string;
  linkedIn?: string;
  googleScholar?: string;
  researchGate?: string;
  website?: string;
  avatarInitials: string;       // Fallback initials when no photo
  avatarColor: string;          // Tailwind gradient classes for avatar blob
  researchAreas: string[];
  about: string;
  joinYear: number;
  expectedGradYear?: number;
  supervisor?: string;
  awards?: string[];
  publications: PersonPublication[];
  isFeatured?: boolean;
}

// ─── People Data ──────────────────────────────────────────────────────────────
export const people: Person[] = [
  // ─────────────────────────────── PI ───────────────────────────────────────
  {
    id: 1,
    slug: "kalidas-sharma",
    name: "Dr. Kalidas S.",
    role: "Principal Investigator",
    designation: "Assistant Professor",
    department: "Department of Computer Science & Engineering",
    institute: "IIT Tirupati",
    email: "kalidas@iittp.ac.in",
    linkedIn: "https://linkedin.com/in/kalidas-sharma",
    googleScholar: "https://scholar.google.com/citations?user=kalidas",
    researchGate: "https://www.researchgate.net/profile/Kalidas-Sharma",
    website: "https://vtl.iittp.ac.in/kalidas",
    avatarInitials: "KS",
    avatarColor: "from-brand-500 to-teal-500",
    researchAreas: [
      "Computer Vision",
      "Deep Learning",
      "Medical Image Analysis",
      "Autonomous Systems",
      "Self-Supervised Learning",
    ],
    about:
      "Dr. Kalidas S. is an Assistant Professor in the Department of Computer Science & Engineering at IIT Tirupati, where he leads the Vision Technology Lab. He received his PhD from IIT Madras in 2014 and completed postdoctoral research at TU Munich, Germany (2014–2016). His research focuses on advancing the science of machine perception — from semantic scene understanding for autonomous vehicles to AI-assisted diagnostics in medical imaging. He has published 60+ papers in top-tier venues including CVPR, NeurIPS, ICCV, ECCV, IEEE TPAMI, and IEEE TIP, with over 1,200 citations and an h-index of 18. He has received multiple grants from DST, SERB, ISRO, and BEL, totalling over ₹3 Crores in research funding.",
    joinYear: 2017,
    awards: [
      "Young Faculty Research Award, IIT Tirupati (2020)",
      "Best Paper Nominee, CVPR 2024",
      "DST Early Career Research Award (2019)",
      "IEEE Senior Member",
    ],
    isFeatured: true,
    publications: [
      { title: "Self-Supervised Monocular Depth Estimation via Masked Autoencoders", venue: "CVPR 2024", year: 2024, doi: "10.1109/CVPR.2024.00001" },
      { title: "Transformer-Based Real-Time Semantic Segmentation for Autonomous Vehicles", venue: "IEEE TPAMI", year: 2024, doi: "10.1109/TPAMI.2024.00002" },
      { title: "Multi-Modal Fusion for Medical Image Analysis using Cross-Attention", venue: "MICCAI 2023", year: 2023 },
      { title: "Efficient Video Object Segmentation via Hierarchical Temporal Memory", venue: "ICCV 2023", year: 2023 },
      { title: "Neural Radiance Fields for Dynamic Scene Reconstruction from Sparse Views", venue: "ECCV 2022", year: 2022 },
      { title: "Continual Learning for Object Recognition Without Catastrophic Forgetting", venue: "AAAI 2022", year: 2022 },
    ],
  },

  // ─────────────────────────────── PhD Scholars ─────────────────────────────
  {
    id: 2,
    slug: "rishith-reddy",
    name: "Rishith Reddy V S",
    role: "PhD Scholar",
    designation: "PhD Candidate",
    department: "Department of Computer Science & Engineering",
    institute: "IIT Tirupati",
    email: "rishith@iittp.ac.in",
    linkedIn: "https://linkedin.com/in/rishith-reddy",
    googleScholar: "https://scholar.google.com/citations?user=rishith",
    avatarInitials: "RR",
    avatarColor: "from-teal-500 to-brand-600",
    researchAreas: [
      "Computer Vision",
      "Internet of Things (IoT)",
      "Vision-based Gait Analysis",
      "Fall Detection using YOLOv11",
      "IoT-based Visual Assistants",
    ],
    about:
      "Rishith Reddy V S is a PhD Scholar at the Vision Technology Lab, IIT Tirupati, working at the intersection of Computer Vision and the Internet of Things. His doctoral research focuses on developing intelligent visual systems that can perceive, interpret, and respond to human motion — particularly for healthcare and assistive technology applications. His primary contributions include a real-time gait analysis framework leveraging YOLOv11-based pose estimation pipelines, a fall detection system capable of sub-100ms alert latency deployed on edge IoT nodes, and an IoT-based visual assistant system for visually impaired individuals that combines object detection, scene description, and vibrotactile feedback. Rishith is passionate about bridging the gap between state-of-the-art vision models and practical, low-resource deployments in clinical and assistive contexts.",
    joinYear: 2022,
    expectedGradYear: 2026,
    supervisor: "Dr. Kalidas S.",
    awards: [
      "Prime Minister's Research Fellowship (PMRF) — 2022",
      "Best Poster Award, IITH Computer Vision Workshop 2023",
    ],
    isFeatured: true,
    publications: [
      { title: "YOLOv11-Based Real-Time Fall Detection for Elderly Care on Edge IoT Devices", venue: "IEEE IoT Journal", year: 2024 },
      { title: "Vision-Based Gait Analysis for Clinical Assessment using Pose Estimation Pipelines", venue: "IEEE EMBC 2023", year: 2023 },
      { title: "IoT-Assisted Visual Navigation System for the Visually Impaired with Haptic Feedback", venue: "ACM ASSETS 2023", year: 2023 },
    ],
  },
  {
    id: 3,
    slug: "vikram-singh",
    name: "Vikram Singh",
    role: "PhD Scholar",
    designation: "PhD Candidate",
    department: "Department of Computer Science & Engineering",
    institute: "IIT Tirupati",
    email: "vikram.singh@iittp.ac.in",
    linkedIn: "https://linkedin.com/in/vikram-singh-vtl",
    googleScholar: "https://scholar.google.com/citations?user=vikram-singh",
    avatarInitials: "VS",
    avatarColor: "from-purple-500 to-brand-600",
    researchAreas: [
      "Domain Adaptation",
      "Adverse Weather Perception",
      "Object Detection",
      "Autonomous Driving",
    ],
    about:
      "Vikram Singh is a PhD Scholar at VTL IIT Tirupati with a focus on robust perception for autonomous driving under real-world adverse conditions including fog, heavy rain, dust storms, and nighttime. His research develops domain-adaptive object detection architectures that maintain high accuracy across diverse weather distributions without scene-specific retraining. He is currently working on the Indo-French joint project on multimodal sensor fusion with INRIA Rennes, where he explores cross-modal attention between RGB cameras, LiDAR, and thermal imagers.",
    joinYear: 2021,
    expectedGradYear: 2025,
    supervisor: "Dr. Kalidas S.",
    awards: ["SERB National Science Language Fellowship 2022"],
    publications: [
      { title: "Domain Adaptive Object Detection under Adverse Weather Conditions", venue: "IEEE TIP", year: 2023 },
      { title: "Cross-Modal Attention for Multimodal Perception in Autonomous Vehicles", venue: "ECCV 2024", year: 2024 },
    ],
  },
  {
    id: 4,
    slug: "sanjay-reddy",
    name: "Sanjay Reddy",
    role: "PhD Scholar",
    designation: "PhD Candidate",
    department: "Department of Computer Science & Engineering",
    institute: "IIT Tirupati",
    email: "sanjay.reddy@iittp.ac.in",
    avatarInitials: "SR",
    avatarColor: "from-emerald-500 to-teal-600",
    researchAreas: [
      "Medical Imaging",
      "Fundus Image Analysis",
      "Diabetic Retinopathy",
      "Multi-Modal Fusion",
    ],
    about:
      "Sanjay Reddy is a PhD Scholar at the Vision Technology Lab working on AI-assisted medical imaging, with a particular focus on diabetic retinopathy detection and grading from fundus photographs. He develops lesion-aware attention networks that produce clinically interpretable predictions, enabling deployment in low-resource rural healthcare settings. His work is part of the DST-funded retinopathy screening project currently piloted at district hospitals in Andhra Pradesh.",
    joinYear: 2020,
    expectedGradYear: 2024,
    supervisor: "Dr. Kalidas S.",
    publications: [
      { title: "Diabetic Retinopathy Detection via Lesion-Aware Attention Maps", venue: "ISBI 2023", year: 2023 },
      { title: "Multi-Modal Fusion for Medical Image Analysis using Cross-Attention", venue: "MICCAI 2023", year: 2023 },
    ],
  },
  {
    id: 5,
    slug: "arjun-mehta",
    name: "Arjun Mehta",
    role: "PhD Scholar",
    designation: "PhD Candidate",
    department: "Department of Computer Science & Engineering",
    institute: "IIT Tirupati",
    email: "arjun.mehta@iittp.ac.in",
    googleScholar: "https://scholar.google.com/citations?user=arjun-mehta",
    avatarInitials: "AM",
    avatarColor: "from-orange-500 to-rose-600",
    researchAreas: [
      "3D Scene Reconstruction",
      "Neural Radiance Fields",
      "Few-Shot Learning",
      "Novel View Synthesis",
    ],
    about:
      "Arjun Mehta is a PhD Scholar at VTL working on neural implicit representations for 3D scene understanding. His research on sparse-view dynamic NeRF reconstruction has enabled high-fidelity 4D scene capture from minimal camera viewpoints — a critical capability for industrial inspection without expensive multi-camera rigs. He is currently extending this work toward generalizable NeRF architectures that require no per-scene optimization.",
    joinYear: 2020,
    expectedGradYear: 2025,
    supervisor: "Dr. Kalidas S.",
    awards: ["Best Paper Nominee, CVPR 2024"],
    publications: [
      { title: "Self-Supervised Monocular Depth Estimation via Masked Autoencoders", venue: "CVPR 2024", year: 2024 },
      { title: "Neural Radiance Fields for Dynamic Scene Reconstruction from Sparse Views", venue: "ECCV 2022", year: 2022 },
      { title: "Few-Shot Object Detection with Prototype-Guided Feature Hallucination", venue: "NeurIPS 2023", year: 2023 },
    ],
  },
  {
    id: 6,
    slug: "nandita-gupta",
    name: "Nandita Gupta",
    role: "PhD Scholar",
    designation: "PhD Candidate",
    department: "Department of Computer Science & Engineering",
    institute: "IIT Tirupati",
    email: "nandita.gupta@iittp.ac.in",
    avatarInitials: "NG",
    avatarColor: "from-pink-500 to-purple-600",
    researchAreas: [
      "Continual Learning",
      "Class-Incremental Learning",
      "Catastrophic Forgetting",
      "Knowledge Distillation",
    ],
    about:
      "Nandita Gupta's doctoral research addresses the fundamental challenge of catastrophic forgetting in deep neural networks. She designs continual learning systems that allow AI models to incorporate new visual categories without erasing previously learned knowledge — a capability essential for real-world AI deployment. Her open-source continual learning benchmark library has accumulated 850+ GitHub stars and is widely used by the research community.",
    joinYear: 2020,
    expectedGradYear: 2024,
    supervisor: "Dr. Kalidas S.",
    awards: ["Google Women in Engineering Award 2022"],
    publications: [
      { title: "Continual Learning for Object Recognition Without Catastrophic Forgetting", venue: "AAAI 2022", year: 2022 },
      { title: "Multi-Modal Fusion for Medical Image Analysis using Cross-Attention", venue: "MICCAI 2023", year: 2023 },
    ],
  },

  // ─────────────────────────────── MS Scholars ──────────────────────────────
  {
    id: 7,
    slug: "thilak-nair",
    name: "Thilak Nair",
    role: "MS Scholar",
    designation: "MS (Research) Scholar",
    department: "Department of Computer Science & Engineering",
    institute: "IIT Tirupati",
    email: "thilak.nair@iittp.ac.in",
    avatarInitials: "TN",
    avatarColor: "from-cyan-500 to-brand-500",
    researchAreas: [
      "Video Object Segmentation",
      "Temporal Memory Networks",
      "Scene Graph Generation",
      "GNN",
    ],
    about:
      "Thilak Nair is an MS Research Scholar at VTL exploring memory-efficient video understanding. His thesis work on hierarchical temporal key-value stores for video object segmentation won the Best Student Paper award at ICCV 2023. He previously worked on graph neural networks for scene graph generation, studying how visual relationships between objects can be modeled as structured graphs.",
    joinYear: 2021,
    expectedGradYear: 2023,
    supervisor: "Dr. Kalidas S.",
    awards: ["Best Student Paper, ICCV 2023"],
    publications: [
      { title: "Efficient Video Object Segmentation via Hierarchical Temporal Memory", venue: "ICCV 2023", year: 2023 },
      { title: "Graph Neural Networks for Scene Graph Generation from Visual Relationships", venue: "Pattern Recognition", year: 2022 },
    ],
  },
  {
    id: 8,
    slug: "kavya-mehta",
    name: "Kavya Mehta",
    role: "MS Scholar",
    designation: "MS (Research) Scholar",
    department: "Department of Computer Science & Engineering",
    institute: "IIT Tirupati",
    email: "kavya.mehta@iittp.ac.in",
    avatarInitials: "KM",
    avatarColor: "from-rose-500 to-orange-500",
    researchAreas: [
      "Semantic Segmentation",
      "Domain Adaptation",
      "Dataset Collection",
      "Indian Road Scene Understanding",
    ],
    about:
      "Kavya Mehta's MS research focuses on building the IIT-AV dataset — a large-scale annotated driving dataset capturing the unique challenges of Indian road conditions: dense heterogeneous traffic, poor lane markings, and monsoon weather. She also develops domain adaptation techniques that transfer knowledge from Western driving datasets (Cityscapes, KITTI) to the Indian context without extensive re-annotation.",
    joinYear: 2022,
    expectedGradYear: 2024,
    supervisor: "Dr. Kalidas S.",
    publications: [
      { title: "IIT-AV: A Large-Scale Indian Autonomous Driving Dataset with Adverse Weather Annotations", venue: "CVPR Workshops 2024", year: 2024 },
    ],
  },
  {
    id: 9,
    slug: "lakshmi-krishnan",
    name: "Lakshmi Krishnan",
    role: "MS Scholar",
    designation: "MS (Research) Scholar",
    department: "Department of Computer Science & Engineering",
    institute: "IIT Tirupati",
    email: "lakshmi.krishnan@iittp.ac.in",
    avatarInitials: "LK",
    avatarColor: "from-yellow-500 to-teal-600",
    researchAreas: [
      "Self-Supervised Learning",
      "Satellite Imagery",
      "Remote Sensing",
      "Land Use Classification",
    ],
    about:
      "Lakshmi Krishnan works on self-supervised representation learning from large-scale unlabeled satellite imagery for the ISRO-funded remote sensing project. She develops spectral-aware masking strategies and geospatial pretraining objectives that yield transferable features for downstream tasks including flood detection, crop mapping, and urban growth monitoring.",
    joinYear: 2022,
    expectedGradYear: 2024,
    supervisor: "Dr. Kalidas S.",
    publications: [
      { title: "Spectral-Aware Masked Autoencoder for Satellite Imagery Representation Learning", venue: "IGARSS 2024", year: 2024 },
    ],
  },
  {
    id: 10,
    slug: "rahul-patel",
    name: "Rahul Patel",
    role: "MS Scholar",
    designation: "MS (Research) Scholar",
    department: "Department of Computer Science & Engineering",
    institute: "IIT Tirupati",
    email: "rahul.patel@iittp.ac.in",
    avatarInitials: "RP",
    avatarColor: "from-indigo-500 to-purple-600",
    researchAreas: [
      "Few-Shot Learning",
      "Meta-Learning",
      "Object Detection",
      "Feature Hallucination",
    ],
    about:
      "Rahul Patel's MS research explores few-shot object detection — the ability to recognize new object categories from just a handful of labeled examples. Working alongside Arjun Mehta, he developed prototype-guided feature hallucination techniques that synthesize realistic feature variations from sparse training data, dramatically improving detection accuracy in data-scarce scenarios.",
    joinYear: 2021,
    expectedGradYear: 2023,
    supervisor: "Dr. Kalidas S.",
    publications: [
      { title: "Few-Shot Object Detection with Prototype-Guided Feature Hallucination", venue: "NeurIPS 2023", year: 2023 },
    ],
  },

  // ─────────────────────────────── Project Staff ────────────────────────────
  {
    id: 11,
    slug: "pradeep-kumar",
    name: "Pradeep Kumar",
    role: "Project Staff",
    designation: "Senior Research Associate",
    department: "Vision Technology Lab",
    institute: "IIT Tirupati",
    email: "pradeep.kumar@iittp.ac.in",
    avatarInitials: "PK",
    avatarColor: "from-slate-500 to-brand-600",
    researchAreas: [
      "Medical Image Annotation",
      "Fundus Image Processing",
      "AI System Deployment",
      "Clinical Trial Coordination",
    ],
    about:
      "Pradeep Kumar is a Senior Research Associate supporting the DST-funded diabetic retinopathy project. He coordinates clinical data collection at partner hospitals in Andhra Pradesh, manages the fundus image annotation pipeline, and assists in deploying and validating the AI screening system at pilot primary health centres. He holds an MTech from NIT Warangal.",
    joinYear: 2022,
    publications: [
      { title: "Diabetic Retinopathy Detection via Lesion-Aware Attention Maps", venue: "ISBI 2023", year: 2023 },
    ],
  },
  {
    id: 12,
    slug: "meera-varghese",
    name: "Meera Varghese",
    role: "Project Staff",
    designation: "Research Engineer",
    department: "Vision Technology Lab",
    institute: "IIT Tirupati",
    email: "meera.varghese@iittp.ac.in",
    avatarInitials: "MV",
    avatarColor: "from-green-500 to-teal-600",
    researchAreas: [
      "Edge AI Deployment",
      "NVIDIA Jetson",
      "Model Optimization",
      "TensorRT",
      "ROS2",
    ],
    about:
      "Meera Varghese is a Research Engineer at VTL specializing in deploying deep learning models on edge hardware for the autonomous driving and crop inspection projects. She works extensively with NVIDIA Jetson platforms, TensorRT optimization, and ROS2-based robotic perception stacks, bridging the gap between research prototypes and real-world deployment.",
    joinYear: 2023,
    publications: [],
  },
  {
    id: 13,
    slug: "suresh-babu",
    name: "Suresh Babu",
    role: "Project Staff",
    designation: "Lab Engineer",
    department: "Vision Technology Lab",
    institute: "IIT Tirupati",
    email: "suresh.babu@iittp.ac.in",
    avatarInitials: "SB",
    avatarColor: "from-amber-500 to-orange-600",
    researchAreas: [
      "Data Management",
      "Lab Infrastructure",
      "GPU Cluster Administration",
      "Dataset Curation",
    ],
    about:
      "Suresh Babu manages the Vision Technology Lab's computing infrastructure, including the multi-GPU workstation cluster, storage systems, and networking. He also coordinates large-scale dataset curation efforts, manages annotator workflows, and maintains lab hardware for fieldwork deployments including the UAV and edge IoT systems.",
    joinYear: 2021,
    publications: [],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function getPersonBySlug(slug: string): Person | undefined {
  return people.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return people.map((p) => p.slug);
}

export const ROLE_ORDER: PersonRole[] = [
  "Principal Investigator",
  "PhD Scholar",
  "MS Scholar",
  "Project Staff",
  "Alumni",
];

export const ROLE_CONFIG: Record<PersonRole, { badge: string; color: string; short: string }> = {
  "Principal Investigator": {
    badge: "bg-gold-500/20 text-gold-300 border border-gold-500/30",
    color: "from-gold-500 to-orange-500",
    short: "PI",
  },
  "PhD Scholar": {
    badge: "bg-brand-500/20 text-brand-300 border border-brand-500/30",
    color: "from-brand-500 to-purple-600",
    short: "PhD",
  },
  "MS Scholar": {
    badge: "bg-teal-500/20 text-teal-300 border border-teal-500/30",
    color: "from-teal-500 to-cyan-500",
    short: "MS",
  },
  "Project Staff": {
    badge: "bg-slate-500/20 text-slate-300 border border-slate-500/30",
    color: "from-slate-500 to-slate-600",
    short: "Staff",
  },
  Alumni: {
    badge: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
    color: "from-purple-500 to-pink-600",
    short: "Alumni",
  },
};
