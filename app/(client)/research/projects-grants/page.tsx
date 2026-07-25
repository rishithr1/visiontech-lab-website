"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  DollarSign,
  ExternalLink,
  Filter,
  FlaskConical,
  Globe,
  IndianRupee,
  Search,
  Sparkles,
  Tag,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type ProjectStatus = "Ongoing" | "Completed" | "Upcoming";
type ProjectCategory = "Research Project" | "Industry Grant" | "Government Grant" | "International Collaboration";

interface Project {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  fundingBody: string;
  fundingBodyLogo?: string;
  category: ProjectCategory;
  amount: string;
  amountINR?: string;
  duration: string;
  startYear: number;
  endYear?: number;
  status: ProjectStatus;
  pi: string;
  coPIs?: string[];
  team?: string[];
  tags: string[];
  outcomes?: string[];
  publications?: number;
  website?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    id: 1,
    title: "AI-Assisted Diabetic Retinopathy Screening for Rural Healthcare",
    shortDescription:
      "Developing automated deep learning tools for early-stage diabetic retinopathy detection in low-resource clinical settings across rural Andhra Pradesh.",
    fullDescription:
      "This project addresses one of the most critical unmet needs in rural healthcare — affordable, automated screening for diabetic retinopathy. We are building a portable, AI-powered fundus image analysis system that can be deployed on commodity hardware at district-level hospitals. The system uses a novel lesion-aware attention network trained on 80,000+ annotated fundus images, achieving 94.2% AUC on the Kaggle DR dataset.",
    fundingBody: "Department of Science & Technology (DST), Govt. of India",
    category: "Government Grant",
    amount: "₹85 Lakhs",
    duration: "3 Years (2022–2025)",
    startYear: 2022,
    endYear: 2025,
    status: "Ongoing",
    pi: "Dr. Kalidas S.",
    coPIs: ["Dr. A. Reddy (AIIMS Tirupati)", "Dr. R. Krishnan (IIT Tirupati)"],
    team: ["S. Reddy (PhD)", "P. Kumar (PhD)", "L. Krishnan (MS)", "2× Project Staff"],
    tags: ["Medical Imaging", "Diabetic Retinopathy", "Deep Learning", "Healthcare AI"],
    outcomes: [
      "3 peer-reviewed publications (MICCAI, ISBI, IEEE TIP)",
      "Prototype deployed at 2 PHCs in Chittoor district",
      "1 patent application filed",
    ],
    publications: 3,
  },
  {
    id: 2,
    title: "Real-Time Semantic Scene Understanding for Autonomous Vehicles in Indian Road Conditions",
    shortDescription:
      "Building robust computer vision systems for autonomous driving perception tailored to the diverse and challenging conditions of Indian roads — congestion, dust, monsoon, and mixed traffic.",
    fullDescription:
      "Indian road conditions present unique challenges not addressed by existing autonomous driving datasets: dense heterogeneous traffic, poor lane markings, monsoon visibility loss, and diverse road users (two-wheelers, cattle, pedestrians). This project creates the IIT-AV dataset — 50,000+ annotated frames from Tirupati and Hyderabad — and develops novel domain-adaptive segmentation models achieving 78+ mIoU while running at 60+ FPS on embedded GPUs.",
    fundingBody: "Science and Engineering Research Board (SERB), Govt. of India",
    category: "Government Grant",
    amount: "₹62 Lakhs",
    duration: "3 Years (2023–2026)",
    startYear: 2023,
    endYear: 2026,
    status: "Ongoing",
    pi: "Dr. Kalidas S.",
    coPIs: ["Dr. V. Kumar (IIT Tirupati)"],
    team: ["V. Singh (PhD)", "K. Mehta (MS)", "T. Nair (MS)", "3× Project Staff"],
    tags: ["Autonomous Vehicles", "Semantic Segmentation", "Domain Adaptation", "Dataset"],
    outcomes: [
      "IIT-AV Dataset (50K frames, publicly released)",
      "2 publications at CVPR and IEEE TPAMI",
      "1 patent on domain-adaptive architecture",
    ],
    publications: 2,
    website: "https://vtl-av.iittp.ac.in",
  },
  {
    id: 3,
    title: "Neural Radiance Fields for Industrial 3D Inspection and Quality Control",
    shortDescription:
      "Leveraging NeRF-based 3D reconstruction for non-destructive inspection of manufactured components in partnership with industry partners.",
    fullDescription:
      "Traditional 3D inspection methods require expensive CT scanners or mechanical probes. This project explores NeRF-based approaches for photorealistic 3D reconstruction of industrial components from ordinary camera images. In collaboration with Bharat Electronics Ltd., we are building inspection software that can detect surface defects, dimensional deviations, and subsurface anomalies from multi-view image captures without contact.",
    fundingBody: "Bharat Electronics Limited (BEL) + SERB",
    category: "Industry Grant",
    amount: "₹1.2 Crores",
    duration: "4 Years (2021–2025)",
    startYear: 2021,
    endYear: 2025,
    status: "Ongoing",
    pi: "Dr. Kalidas S.",
    team: ["A. Mehta (PhD)", "V. Kumar (PhD)", "N. Gupta (MS)", "1× Project Staff"],
    tags: ["NeRF", "3D Reconstruction", "Industrial Inspection", "Anomaly Detection"],
    outcomes: [
      "ECCV 2022 paper on sparse-view dynamic NeRF",
      "Working prototype delivered to BEL pilot facility",
      "2 IDFs filed",
    ],
    publications: 3,
  },
  {
    id: 4,
    title: "Self-Supervised Representation Learning from Unlabeled Satellite Imagery",
    shortDescription:
      "Developing masked autoencoder pretraining strategies for learning powerful visual representations from large-scale unlabeled satellite data for remote sensing tasks.",
    fullDescription:
      "Satellite imagery is produced at petabyte scale daily, but labels are scarce. This ISRO-funded project develops self-supervised pretraining strategies — including spectral-aware masking, temporal coherence loss, and geospatial context learning — to extract highly transferable features for downstream tasks such as land use classification, crop type mapping, flood detection, and building extraction.",
    fundingBody: "Indian Space Research Organisation (ISRO)",
    category: "Government Grant",
    amount: "₹48 Lakhs",
    duration: "2 Years (2023–2025)",
    startYear: 2023,
    endYear: 2025,
    status: "Ongoing",
    pi: "Dr. Kalidas S.",
    team: ["R. Patel (PhD)", "L. Krishnan (MS)"],
    tags: ["Remote Sensing", "Self-Supervised Learning", "Satellite Imagery", "MAE"],
    outcomes: [
      "NeurIPS 2023 paper on prototype-guided feature hallucination",
      "Dataset of 500K+ labeled satellite tiles (Andhra Pradesh)",
    ],
    publications: 2,
  },
  {
    id: 5,
    title: "Continual Learning Systems for Evolving Visual Recognition Tasks",
    shortDescription:
      "Investigating catastrophic forgetting and building continual learning frameworks that allow AI systems to learn new visual concepts without degrading performance on old ones.",
    fullDescription:
      "As AI systems are deployed in the real world, they must adapt to new categories and distribution shifts without retraining from scratch. This fundamental research project studies memory replay, regularization strategies, and architectural plasticity for continual visual learning. We focus on practical scenarios: incremental class addition, domain shift adaptation, and concept drift in medical imaging.",
    fundingBody: "National Science Academy of India (NASI) + IIT Tirupati SEED Grant",
    category: "Research Project",
    amount: "₹22 Lakhs",
    duration: "2 Years (2022–2024)",
    startYear: 2022,
    endYear: 2024,
    status: "Completed",
    pi: "Dr. Kalidas S.",
    team: ["N. Gupta (PhD)", "R. Patel (MS)"],
    tags: ["Continual Learning", "Catastrophic Forgetting", "Class-Incremental Learning"],
    outcomes: [
      "AAAI 2022 paper (oral presentation)",
      "Open-source CL benchmark library (GitHub: 850+ stars)",
    ],
    publications: 2,
  },
  {
    id: 6,
    title: "Indo-French Joint Research Program: Multimodal Scene Understanding",
    shortDescription:
      "Collaborative research with INRIA Rennes on multimodal perception combining RGB, LiDAR, thermal, and event cameras for robust scene understanding.",
    fullDescription:
      "This joint program between VTL IIT Tirupati and INRIA Rennes (France) investigates multimodal sensor fusion for comprehensive scene understanding. We develop cross-modal attention mechanisms that align and fuse heterogeneous sensor modalities, enabling robustness under conditions where individual sensors fail (e.g., cameras in fog, LiDAR in rain). Student and faculty exchange is a key component.",
    fundingBody: "Department of Science & Technology (DST) + CNRS (France)",
    category: "International Collaboration",
    amount: "₹55 Lakhs + €40K",
    duration: "3 Years (2024–2027)",
    startYear: 2024,
    endYear: 2027,
    status: "Ongoing",
    pi: "Dr. Kalidas S.",
    coPIs: ["Prof. P. Pérez (INRIA Rennes, France)"],
    team: ["V. Singh (PhD)", "K. Mehta (MS)"],
    tags: ["Multimodal Fusion", "LiDAR", "International Collaboration", "Adverse Weather"],
    outcomes: ["Joint PhD program initiated", "2 visiting researcher positions active"],
    publications: 0,
    website: "https://vtl-inria.iittp.ac.in",
  },
  {
    id: 7,
    title: "AI for Precision Agriculture: Crop Disease Detection using UAV Imagery",
    shortDescription:
      "Deploying drone-based computer vision systems for early detection of crop diseases and nutrient deficiencies in paddy and groundnut fields across Andhra Pradesh.",
    fullDescription:
      "Crop diseases cost Indian agriculture billions of rupees annually. This project develops a complete UAV-based pipeline for crop health monitoring: automated flight path planning, multi-spectral image capture, real-time disease detection using edge AI, and farmer-facing mobile applications. The system has been field-tested in 12 villages in Nellore and Prakasam districts.",
    fundingBody: "ICAR (Indian Council of Agricultural Research) + AP State Government",
    category: "Government Grant",
    amount: "₹38 Lakhs",
    duration: "2 Years (2021–2023)",
    startYear: 2021,
    endYear: 2023,
    status: "Completed",
    pi: "Dr. Kalidas S.",
    coPIs: ["Dr. M. Naidu (ANGRAU)"],
    team: ["T. Nair (MS)", "P. Kumar (MS)"],
    tags: ["Precision Agriculture", "UAV", "Disease Detection", "Edge AI", "Multispectral"],
    outcomes: [
      "Mobile app deployed to 300+ farmers",
      "12 field pilot sites across AP",
      "2 conference papers (IGARSS, IEEE JSTARS)",
      "Technology transferred to AP state agriculture dept.",
    ],
    publications: 3,
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────
const cardVariants = {
  hidden:  { opacity: 0, y: 32, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
  exit:    { opacity: 0, y: -16, scale: 0.97, transition: { duration: 0.2 } },
};

// ─── Status Config ────────────────────────────────────────────────────────────
const statusConfig: Record<ProjectStatus, { color: string; dot: string; label: string }> = {
  Ongoing:   { color: "badge-teal",  dot: "bg-teal-400 animate-pulse", label: "Ongoing" },
  Completed: { color: "badge-brand", dot: "bg-brand-400",              label: "Completed" },
  Upcoming:  { color: "badge-gold",  dot: "bg-gold-400 animate-pulse", label: "Upcoming" },
};

const categoryConfig: Record<ProjectCategory, { color: string; icon: React.ReactNode }> = {
  "Government Grant":           { color: "text-brand-300 bg-brand-600/20 border-brand-500/30",   icon: <Building2 className="w-3.5 h-3.5" /> },
  "Industry Grant":             { color: "text-teal-300 bg-teal-600/20 border-teal-500/30",       icon: <Briefcase className="w-3.5 h-3.5" /> },
  "Research Project":           { color: "text-gold-300 bg-gold-600/20 border-gold-500/30",       icon: <FlaskConical className="w-3.5 h-3.5" /> },
  "International Collaboration":{ color: "text-purple-300 bg-purple-600/20 border-purple-500/30", icon: <Globe className="w-3.5 h-3.5" /> },
};

// ─── Stat bar ─────────────────────────────────────────────────────────────────
function SummaryStats() {
  const ongoing   = projects.filter((p) => p.status === "Ongoing").length;
  const completed = projects.filter((p) => p.status === "Completed").length;
  const totalPubs = projects.reduce((s, p) => s + (p.publications ?? 0), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.3 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
    >
      {[
        { value: projects.length, label: "Total Projects",  icon: <Briefcase className="w-5 h-5" />, color: "text-brand-300" },
        { value: ongoing,         label: "Active Projects", icon: <TrendingUp className="w-5 h-5" />, color: "text-teal-300"  },
        { value: completed,       label: "Completed",       icon: <CheckCircle2 className="w-5 h-5" />, color: "text-green-400" },
        { value: totalPubs,       label: "Publications",    icon: <FlaskConical className="w-5 h-5" />, color: "text-gold-400"  },
      ].map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 + i * 0.08 }}
          className="glass-card p-4 flex items-center gap-3 group hover:border-brand-500/30 transition-all duration-300"
        >
          <div className={`w-10 h-10 rounded-xl glass-brand flex items-center justify-center ${stat.color} flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
            {stat.icon}
          </div>
          <div>
            <div className="text-xl font-display font-bold text-white">{stat.value}</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const status  = statusConfig[project.status];
  const category = categoryConfig[project.category];

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      className="glass-card group overflow-hidden"
      aria-label={project.title}
    >
      <div className="p-5 md:p-7">
        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-4">
          <div className="flex-1 min-w-0 space-y-2">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Status indicator */}
              <span className={`inline-flex items-center gap-1.5 badge ${status.color}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                {status.label}
              </span>
              {/* Category */}
              <span className={`inline-flex items-center gap-1 badge border ${category.color}`}>
                {category.icon}
                {project.category}
              </span>
              {project.publications ? (
                <span className="badge-teal text-[10px]">
                  {project.publications} publication{project.publications > 1 ? "s" : ""}
                </span>
              ) : null}
            </div>

            {/* Title */}
            <h2 className="text-base md:text-lg font-semibold text-white group-hover:text-brand-200 transition-colors duration-200 leading-snug">
              {project.title}
            </h2>
          </div>

          {/* Funding amount badge */}
          <div className="flex-shrink-0">
            <div className="glass-brand rounded-xl px-4 py-2.5 text-center min-w-[100px]">
              <div className="flex items-center justify-center gap-1 text-brand-200">
                <IndianRupee className="w-3 h-3" />
                <span className="text-sm font-bold">{project.amount.replace("₹", "")}</span>
              </div>
              <div className="text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">Funding</div>
            </div>
          </div>
        </div>

        {/* ── Meta info row ────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-4 mb-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-brand-400" />
            {project.duration}
          </div>
          <div className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-teal-400" />
            {project.fundingBody}
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-gold-400" />
            PI: {project.pi}
          </div>
        </div>

        {/* ── Short description ────────────────────────────────────────── */}
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          {project.shortDescription}
        </p>

        {/* ── Expanded content ─────────────────────────────────────────── */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-5 pt-2 pb-3 border-t border-white/08 mt-2">
                {/* Full description */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-2">
                    About the Project
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {project.fullDescription}
                  </p>
                </div>

                {/* Team */}
                {project.team && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-2">
                      Team
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[project.pi, ...(project.coPIs ?? []), ...(project.team ?? [])].map(
                        (member, i) => (
                          <span
                            key={i}
                            className={`text-xs px-2.5 py-1 rounded-lg ${
                              i === 0
                                ? "bg-brand-600/25 text-brand-200 border border-brand-500/30"
                                : "glass-xs text-slate-300"
                            }`}
                          >
                            {member}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Outcomes */}
                {project.outcomes && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-2">
                      Key Outcomes
                    </h3>
                    <ul className="space-y-1.5">
                      {project.outcomes.map((outcome, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Footer ──────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-1 border-t border-white/06">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="glass-xs text-[10px] text-slate-500 px-2 py-0.5 rounded-md">
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-[10px] text-slate-600">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Project website"
                className="w-8 h-8 rounded-lg glass-xs flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-600/30 transition-all duration-200"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-1.5 text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors duration-200"
              aria-expanded={expanded}
            >
              {expanded ? "Show Less" : "View Details"}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Hover bar */}
      <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-brand-500/70 via-teal-500/70 to-brand-500/70 transition-all duration-500" />
    </motion.article>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function ProjectsGrantsPage() {
  const [search,         setSearch]         = useState("");
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | "All">("All");
  const [selectedCat,    setSelectedCat]    = useState<ProjectCategory | "All">("All");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (selectedStatus !== "All" && p.status !== selectedStatus) return false;
      if (selectedCat    !== "All" && p.category !== selectedCat)  return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const hay = [p.title, p.shortDescription, p.fundingBody, ...p.tags].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [search, selectedStatus, selectedCat]);

  return (
    <div className="page-pt min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-950/50 via-navy-900/30 to-brand-950/40 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[250px] bg-brand-600/08 rounded-full blur-3xl pointer-events-none" />

        {/* Decorative animated bars */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none bg-teal-400/20"
            style={{
              width: `${3 + i}px`,
              height: `${30 + i * 20}px`,
              left: `${5 + i * 22}%`,
              bottom: "20%",
            }}
            animate={{ scaleY: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}

        <div className="relative section-container text-center space-y-5">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 badge-teal px-4 py-1.5 text-sm"
          >
            <Briefcase className="w-3.5 h-3.5" />
            Funded Research
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold text-white"
          >
            Projects &amp;{" "}
            <span className="gradient-text">Grants</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Funded research initiatives, industry partnerships, and government grants
            supporting Vision Technology Lab's mission at IIT Tirupati.
          </motion.p>

          <SummaryStats />
        </div>
      </section>

      {/* ── Filters ──────────────────────────────────────────────────────────── */}
      <section className="sticky top-[72px] z-30 py-3 glass-navbar border-b border-white/08">
        <div className="section-container flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects, grants, funding bodies…"
              className="input-glass pl-10 pr-4 py-2.5 text-sm w-full"
              id="projects-search"
              aria-label="Search projects"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {(["All", "Ongoing", "Completed", "Upcoming"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSelectedStatus(s)}
                aria-pressed={selectedStatus === s}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  selectedStatus === s
                    ? "bg-brand-600/40 text-brand-200 border border-brand-500/50"
                    : "glass-xs text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Category filter */}
          <div className="relative flex-shrink-0">
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value as typeof selectedCat)}
              className="input-glass py-2.5 text-xs pl-3 pr-8 appearance-none cursor-pointer"
              id="projects-category"
              aria-label="Filter by category"
            >
              <option value="All">All Categories</option>
              <option value="Government Grant">Government Grant</option>
              <option value="Industry Grant">Industry Grant</option>
              <option value="Research Project">Research Project</option>
              <option value="International Collaboration">International</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ── Results ─────────────────────────────────────────────────────────── */}
      <section className="section-container py-8 pb-20">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-400">
            Showing <span className="text-white font-semibold">{filtered.length}</span> of{" "}
            <span className="text-white font-semibold">{projects.length}</span> projects
          </p>
        </div>

        <div className="space-y-5">
          <AnimatePresence>
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <div className="w-16 h-16 rounded-2xl glass-brand flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-brand-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No projects found</h3>
              <p className="text-slate-400 text-sm">Try changing your filters or search term.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
