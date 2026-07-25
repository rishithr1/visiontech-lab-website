"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  ChevronDown,
  Clock,
  ExternalLink,
  Filter,
  Globe,
  Handshake,
  Megaphone,
  Microscope,
  Newspaper,
  Search,
  Sparkles,
  Tag,
  Trophy,
  Users,
  X,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type EventCategory =
  | "Conference"
  | "Award"
  | "Grant"
  | "Collaboration"
  | "Publication"
  | "Workshop"
  | "Announcement"
  | "Outreach";

interface NewsEvent {
  id: number;
  category: EventCategory;
  title: string;
  excerpt: string;
  body: string;
  date: string;        // Display date string
  dateISO: string;     // ISO for sorting
  imageGradient: string;
  tags: string[];
  links?: { label: string; href: string }[];
  isFeatured?: boolean;
  isHighlight?: boolean;
}

// ─── Placeholder Data ──────────────────────────────────────────────────────────
const newsEvents: NewsEvent[] = [
  {
    id: 1,
    category: "Conference",
    title: "Paper Accepted at NeurIPS 2024 — Self-Supervised Visual Representation Learning",
    excerpt:
      "Our work on spectral-aware masked autoencoders for satellite imagery has been accepted for publication at the 38th Annual Conference on Neural Information Processing Systems (NeurIPS 2024).",
    body: `We are thrilled to announce that our paper "Spectral-Aware Masked Autoencoder for Satellite Imagery Representation Learning" has been accepted at NeurIPS 2024, one of the most competitive and prestigious venues in machine learning research.\n\nThe paper introduces a novel self-supervised pretraining strategy that adapts the masked autoencoder framework (MAE) specifically for multi-spectral satellite data. Unlike natural images with 3 RGB channels, satellite imagery contains up to 13 spectral bands (from VNIR to SWIR), and our framework learns band-specific masking schedules and reconstruction objectives.\n\nThe work is a result of the ISRO-funded project at VTL and was led by Lakshmi Krishnan (MS Scholar) with guidance from Dr. Kalidas. The paper will be presented as a spotlight talk at the Vancouver conference in December 2024.`,
    date: "October 2024",
    dateISO: "2024-10-01",
    imageGradient: "from-brand-600/40 to-purple-600/30",
    tags: ["NeurIPS", "Self-Supervised", "Satellite", "ISRO"],
    links: [
      { label: "arXiv Preprint", href: "https://arxiv.org/abs/2410.00001" },
    ],
    isFeatured: true,
    isHighlight: true,
  },
  {
    id: 2,
    category: "Award",
    title: "Rishith Reddy V S Receives Prime Minister's Research Fellowship (PMRF)",
    excerpt:
      "PhD Scholar Rishith Reddy V S has been awarded the prestigious Prime Minister's Research Fellowship (PMRF) for 2024, one of the most competitive fellowships for doctoral researchers in India.",
    body: `We are proud to announce that Rishith Reddy V S, a PhD Scholar at the Vision Technology Lab working on computer vision and IoT-based assistive systems, has been awarded the Prime Minister's Research Fellowship (PMRF) — May 2024 cycle.\n\nThe PMRF is a competitive national fellowship awarded annually to fewer than 500 doctoral candidates across all IITs, IISc, and NITs in India. Fellows receive an enhanced stipend of ₹70,000–₹80,000/month along with a research grant of ₹2 Lakhs per year for travel and equipment.\n\nRishith's work on fall detection systems using YOLOv11 for elderly care and IoT-integrated visual assistants for the visually impaired impressed the selection committee. His research directly addresses critical social needs at the intersection of AI and healthcare.\n\n"I'm deeply grateful to my advisor Dr. Kalidas and the entire VTL team for their constant support," Rishith said. "This fellowship will enable me to focus fully on pushing the frontiers of vision-based assistive technology."`,
    date: "September 2024",
    dateISO: "2024-09-01",
    imageGradient: "from-gold-600/40 to-orange-600/30",
    tags: ["Award", "Fellowship", "PMRF", "Rishith Reddy"],
    isFeatured: true,
    isHighlight: true,
  },
  {
    id: 3,
    category: "Collaboration",
    title: "VTL Signs MoU with TCS Research for AI-Based Industrial Inspection",
    excerpt:
      "The Vision Technology Lab has signed a Memorandum of Understanding with TCS Research to jointly develop AI-powered visual inspection systems for semiconductor and automotive manufacturing.",
    body: `The Vision Technology Lab at IIT Tirupati and TCS Research have formalized a two-year research collaboration through a signed Memorandum of Understanding. The partnership will focus on developing next-generation AI-based visual inspection systems for high-precision manufacturing environments.\n\nThe collaboration leverages VTL's expertise in anomaly detection and 3D reconstruction (from the BEL industrial inspection project) alongside TCS Research's extensive network of manufacturing clients and industry-scale deployment capabilities.\n\nKey research goals include:\n- Zero-shot defect detection for unseen product categories\n- Real-time 3D surface inspection using NeRF-based reconstruction\n- Transfer learning for rapid domain adaptation to new production lines\n\nTwo PhD scholars from VTL will have the opportunity to undertake 3-month research internships at TCS Research Bangalore as part of this collaboration.`,
    date: "August 2024",
    dateISO: "2024-08-01",
    imageGradient: "from-teal-600/40 to-emerald-600/30",
    tags: ["Industry", "TCS Research", "Collaboration", "Inspection"],
    links: [
      { label: "TCS Research", href: "https://www.tcs.com/research" },
    ],
  },
  {
    id: 4,
    category: "Conference",
    title: "CVPR 2024 — Best Paper Nominee for Monocular Depth Estimation Work",
    excerpt:
      "Our paper on self-supervised monocular depth estimation via masked autoencoders was nominated for the Best Paper Award at CVPR 2024, the world's premier computer vision conference.",
    body: `At the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR 2024) in Seattle, Washington, our paper "Self-Supervised Monocular Depth Estimation via Masked Autoencoders and Geometry-Aware Pretraining" was nominated for the Best Paper Award.\n\nOut of over 11,000 submissions and approximately 2,600 accepted papers, our work was one of just 12 papers nominated for the Best Paper distinction — placing it in the top 0.1% of submitted work.\n\nThe work proposes a novel framework that pretrains a vision transformer using masked autoencoding with geometry-aware constraints derived from multi-view consistency, achieving state-of-the-art performance on KITTI and NYU Depth v2 without any labeled depth data.\n\nArjun Mehta (PhD Scholar) presented the work as an oral at the conference. The team also won the Best Demo Award at the co-located CVPR Autonomous Driving Workshop.`,
    date: "June 2024",
    dateISO: "2024-06-01",
    imageGradient: "from-brand-600/40 to-indigo-600/30",
    tags: ["CVPR 2024", "Best Paper", "Depth Estimation", "Oral"],
    isHighlight: true,
  },
  {
    id: 5,
    category: "Grant",
    title: "₹55 Lakh DST-CNRS Grant for Indo-French AI Research Collaboration",
    excerpt:
      "VTL secures a joint grant of ₹55 Lakhs from DST India and €40K from CNRS France for a 3-year collaboration with INRIA Rennes on multimodal scene understanding.",
    body: `The Vision Technology Lab has been awarded a joint research grant under the Indo-French Centre for the Promotion of Advanced Research (IFCPAR/CEFIPRA) programme. The 3-year project "Multimodal Sensor Fusion for All-Weather Scene Understanding" is co-led by Dr. Kalidas S. (VTL, IIT Tirupati) and Prof. P. Pérez (INRIA Rennes, France).\n\nThe project aims to develop cross-modal attention mechanisms that fuse heterogeneous sensor data — RGB cameras, LiDAR, thermal cameras, and event cameras — enabling robust scene understanding under fog, rain, snow, and nighttime conditions.\n\nThe collaboration includes a structured student exchange program:\n- 2 VTL PhD scholars will spend 3 months at INRIA Rennes\n- 2 INRIA students will visit IIT Tirupati for joint experiments\n\nAn annual Indo-French Vision Workshop will be hosted alternately at IIT Tirupati and Rennes.`,
    date: "April 2024",
    dateISO: "2024-04-01",
    imageGradient: "from-purple-600/40 to-pink-600/30",
    tags: ["Grant", "DST", "INRIA", "Indo-French", "Multimodal"],
    isFeatured: true,
  },
  {
    id: 6,
    category: "Workshop",
    title: "VTL Hosts \"Advances in Edge AI\" Workshop — 80+ Participants",
    excerpt:
      "The lab organized a two-day intensive workshop on Edge AI and Embedded Vision, attracting researchers and engineers from academia and industry across India.",
    body: `The Vision Technology Lab at IIT Tirupati organized the "Advances in Edge AI and Embedded Vision" workshop on March 14–15, 2024. The workshop attracted over 80 participants including PhD scholars, industry engineers, and faculty members from 15 institutions across India.\n\nHighlights included:\n- Keynote by Dr. Kalidas on real-time semantic segmentation for autonomous vehicles\n- Hands-on sessions on deploying models with TensorRT and ONNX Runtime\n- Tutorial on NVIDIA Jetson Orin development environment by Meera Varghese (VTL Research Engineer)\n- Guest talk by TCS Research on industrial AI deployment challenges\n- Poster session with 24 student research posters\n\nParticipant feedback was overwhelmingly positive with 94% rating the workshop as "Excellent" or "Very Good." The lab plans to host an expanded edition in September 2024.`,
    date: "March 2024",
    dateISO: "2024-03-01",
    imageGradient: "from-emerald-600/40 to-teal-600/30",
    tags: ["Workshop", "Edge AI", "Tutorial", "Community"],
    links: [
      { label: "Workshop Report", href: "#" },
    ],
  },
  {
    id: 7,
    category: "Outreach",
    title: "Crop Disease Detection System Deployed to 300+ Farmers in Nellore",
    excerpt:
      "The AI-powered crop monitoring mobile app developed under the ICAR project has been officially deployed and is now actively used by over 300 farmers in Nellore and Prakasam districts.",
    body: `The crop disease detection system developed by Vision Technology Lab as part of the ICAR-funded precision agriculture project has been successfully deployed across 12 villages in the Nellore and Prakasam districts of Andhra Pradesh.\n\nThe system uses multispectral UAV imagery captured by ANGRAU's drone fleet and processes it with VTL's on-board edge AI models to detect 14 types of crop diseases in paddy, groundnut, and chilli with 92.3% accuracy.\n\nA farmer-facing mobile application (Android) provides:\n- Real-time disease alerts via SMS and push notifications\n- Geo-tagged disease maps for affected fields\n- Treatment recommendations in Telugu language\n- Offline mode for areas with poor connectivity\n\nThe Andhra Pradesh State Agriculture Department has approved the technology for scaling to 50+ villages by the end of 2024.`,
    date: "February 2024",
    dateISO: "2024-02-01",
    imageGradient: "from-green-600/40 to-lime-600/20",
    tags: ["Outreach", "Agriculture", "IoT", "Impact", "Andhra Pradesh"],
  },
  {
    id: 8,
    category: "Award",
    title: "Thilak Nair Wins Best Student Paper at ICCV 2023",
    excerpt:
      "MS Scholar Thilak Nair's work on memory-efficient video object segmentation has been recognised with the Best Student Paper Award at the International Conference on Computer Vision (ICCV 2023).",
    body: `MS Scholar Thilak Nair received the Best Student Paper Award at the International Conference on Computer Vision (ICCV 2023) in Paris, France for his work on "Efficient Video Object Segmentation via Hierarchical Temporal Memory."\n\nThe paper addresses a critical bottleneck in video understanding: existing memory-based video object segmentation methods scale poorly with video length due to O(T) memory complexity. Thilak's hierarchical temporal key-value store reduces GPU memory by 65% while maintaining competitive accuracy on DAVIS and YouTube-VOS benchmarks.\n\nThe award comes with a $2,000 prize sponsored by Qualcomm Research. Thilak credits his success to the supportive environment at VTL.\n\n"Working in a lab where we have access to real problems and real data — from autonomous driving to medical imaging — constantly pushes you to think about practical constraints like memory and latency," Thilak said.`,
    date: "October 2023",
    dateISO: "2023-10-01",
    imageGradient: "from-gold-600/40 to-amber-600/30",
    tags: ["ICCV 2023", "Best Paper", "Award", "Video Segmentation"],
    isHighlight: true,
  },
  {
    id: 9,
    category: "Announcement",
    title: "VTL Welcomes 4 New PhD Scholars for 2024–25 Academic Year",
    excerpt:
      "The Vision Technology Lab is expanding its team with four new doctoral researchers joining across projects in multimodal perception, AI for healthcare, and neural implicit representations.",
    body: `The Vision Technology Lab is delighted to welcome four new PhD scholars joining for the 2024–25 academic year:\n\n1. **Priya Nair** — Background in electronics engineering from NIT Trichy; will work on event camera-based perception for autonomous driving (INRIA collaboration)\n2. **Sudhir Varma** — CS graduate from IIT BHU with GATE CS AIR 45; joining the medical imaging group (DST retinopathy project)\n3. **Radhika Pillai** — PMRF awardee with prior research experience at TIFR Mumbai; will lead the new NeRF-based generalizable 3D reconstruction direction\n4. **Mohan Das** — Industry background at Qualcomm India (4 years); returning to academia for PhD on efficient neural architecture design for edge deployment\n\nAll four scholars will join the lab in July 2024 and are expected to contribute to publications within their first year under VTL's mentorship framework.`,
    date: "June 2024",
    dateISO: "2024-06-15",
    imageGradient: "from-cyan-600/40 to-brand-600/30",
    tags: ["Team", "PhD", "Recruitment", "2024-25"],
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.48, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.22 } },
};

// ─── Category config ──────────────────────────────────────────────────────────
const categoryConfig: Record<
  EventCategory,
  { badge: string; icon: React.ReactNode; color: string }
> = {
  Conference:    { badge: "badge-brand",   icon: <BookOpen className="w-3.5 h-3.5" />,   color: "border-l-brand-500"  },
  Award:         { badge: "badge-gold",    icon: <Trophy className="w-3.5 h-3.5" />,     color: "border-l-gold-500"   },
  Grant:         { badge: "badge-teal",    icon: <Sparkles className="w-3.5 h-3.5" />,   color: "border-l-teal-500"   },
  Collaboration: { badge: "text-purple-300 bg-purple-500/15 border border-purple-500/25",
                                           icon: <Handshake className="w-3.5 h-3.5" />,  color: "border-l-purple-500" },
  Publication:   { badge: "badge-brand",   icon: <Newspaper className="w-3.5 h-3.5" />,  color: "border-l-brand-500"  },
  Workshop:      { badge: "text-emerald-300 bg-emerald-500/15 border border-emerald-500/25",
                                           icon: <Users className="w-3.5 h-3.5" />,      color: "border-l-emerald-500"},
  Announcement:  { badge: "text-cyan-300 bg-cyan-500/15 border border-cyan-500/25",
                                           icon: <Megaphone className="w-3.5 h-3.5" />,  color: "border-l-cyan-500"   },
  Outreach:      { badge: "text-green-300 bg-green-500/15 border border-green-500/25",
                                           icon: <Globe className="w-3.5 h-3.5" />,      color: "border-l-green-500"  },
};

// ─── News Card ────────────────────────────────────────────────────────────────
function NewsCard({ item }: { item: NewsEvent }) {
  const [expanded, setExpanded] = useState(false);
  const cat = categoryConfig[item.category];

  return (
    <motion.article
      variants={cardVariants}
      layout
      className={`glass-card group overflow-hidden border-l-2 ${cat.color}`}
      aria-label={item.title}
    >
      {/* Gradient thumbnail */}
      <div className={`h-2 bg-gradient-to-r ${item.imageGradient}`} />

      <div className="p-5 md:p-6">
        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="space-y-2 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 badge ${cat.badge}`}>
                {cat.icon}
                {item.category}
              </span>
              {item.isFeatured && (
                <span className="badge-gold text-[10px] inline-flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  Featured
                </span>
              )}
              {item.isHighlight && (
                <span className="text-[10px] text-teal-300 bg-teal-500/15 border border-teal-500/25 badge inline-flex items-center gap-1">
                  <Award className="w-2.5 h-2.5" />
                  Highlight
                </span>
              )}
            </div>
            <h2 className="text-base font-semibold text-white group-hover:text-brand-200 transition-colors duration-200 leading-snug">
              {item.title}
            </h2>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
          <Calendar className="w-3.5 h-3.5 text-brand-400" />
          {item.date}
        </div>

        {/* Excerpt */}
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          {item.excerpt}
        </p>

        {/* Expanded body */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="py-4 border-t border-white/08 space-y-3">
                {item.body.split("\n\n").map((para, i) => (
                  <p key={i} className="text-sm text-slate-300 leading-relaxed">
                    {para}
                  </p>
                ))}

                {/* External links */}
                {item.links && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-xs text-xs text-brand-300 hover:text-brand-200 hover:bg-brand-600/20 transition-all duration-200"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/06">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {item.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="glass-xs text-[10px] text-slate-500 px-2 py-0.5 rounded-md">
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="flex items-center gap-1.5 text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors"
          >
            {expanded ? "Show Less" : "Read More"}
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Hover bar */}
      <div className={`h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${item.imageGradient} transition-all duration-500`} />
    </motion.article>
  );
}

// ─── Featured / Highlight card ────────────────────────────────────────────────
function FeaturedCard({ item }: { item: NewsEvent }) {
  const cat = categoryConfig[item.category];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="glass-card relative overflow-hidden group"
      aria-label={item.title}
    >
      {/* Gradient bar top */}
      <div className={`h-1.5 bg-gradient-to-r ${item.imageGradient}`} />

      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${item.imageGradient} opacity-10 pointer-events-none`} />

      <div className="relative p-6 md:p-8">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`inline-flex items-center gap-1.5 badge ${cat.badge}`}>
            {cat.icon}
            {item.category}
          </span>
          <span className="badge-gold text-[10px] inline-flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" /> Featured
          </span>
        </div>

        <h2 className="text-xl md:text-2xl font-display font-bold text-white mb-3 leading-snug group-hover:text-brand-200 transition-colors">
          {item.title}
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed mb-4">{item.excerpt}</p>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Calendar className="w-3.5 h-3.5 text-brand-400" />
            {item.date}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {item.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="glass-xs text-[10px] text-slate-500 px-2 py-0.5 rounded-md">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function NewsEventsPage() {
  const [search,      setSearch]      = useState("");
  const [activeCategories, setActiveCats] = useState<EventCategory[]>([]);
  const [sortBy,      setSortBy]      = useState<"newest" | "oldest">("newest");

  const allCategories = Array.from(new Set(newsEvents.map((n) => n.category))) as EventCategory[];


  const filtered = useMemo(() => {
    let result = newsEvents.filter((n) => {
      if (activeCategories.length > 0 && !activeCategories.includes(n.category)) return false;
      if (search.trim()) {
        const q   = search.toLowerCase();
        const hay = [n.title, n.excerpt, ...n.tags].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    result = [...result].sort((a, b) => {
      const diff = new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime();
      return sortBy === "newest" ? diff : -diff;
    });

    return result;
  }, [search, activeCategories, sortBy]);

  const featured  = newsEvents.filter((n) => n.isFeatured);
  const highlights = newsEvents.filter((n) => n.isHighlight && !n.isFeatured);

  const toggleCat = (cat: EventCategory) =>
    setActiveCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

  return (
    <div className="page-pt min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/50 via-brand-950/20 to-gold-950/20 pointer-events-none" />
        <div className="absolute top-0 right-1/3 w-[600px] h-[350px] bg-brand-600/08 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-teal-600/06 rounded-full blur-3xl pointer-events-none" />

        {/* Animated news ticker-style lines */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{ top: `${25 + i * 20}%`, background: `linear-gradient(90deg, transparent, rgba(48,104,245,${0.08 + i * 0.03}), transparent)` }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear", delay: i * 2.5 }}
          />
        ))}

        <div className="relative section-container text-center space-y-5">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 badge-brand px-4 py-1.5 text-sm"
          >
            <Newspaper className="w-3.5 h-3.5" />
            {newsEvents.length} Updates
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold text-white"
          >
            News &amp;{" "}
            <span className="gradient-text">Events</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Stay up to date with the latest research milestones, awards,
            grants, and events from Vision Technology Lab at IIT Tirupati.
          </motion.p>
        </div>
      </section>

      {/* ── Featured section ──────────────────────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="section-container pb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <div className="flex items-center gap-2 px-4 py-1.5 glass-xs rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                Featured
              </span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featured.map((item) => (
              <FeaturedCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* ── Sticky filter bar ─────────────────────────────────────────────────── */}
      <div className="sticky top-[72px] z-30 py-3 glass-navbar border-b border-white/08">
        <div className="section-container flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search news, events, awards…"
              className="input-glass pl-10 py-2.5 text-sm w-full"
              id="news-search"
              aria-label="Search news and events"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
            {allCategories.map((cat) => {
              const conf = categoryConfig[cat];
              const isActive = activeCategories.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleCat(cat)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200 ${
                    isActive ? `${conf.badge} shadow-sm` : "glass-xs text-slate-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {conf.icon}
                  {cat}
                </button>
              );
            })}
            {activeCategories.length > 0 && (
              <button
                onClick={() => setActiveCats([])}
                className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1"
              >
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative flex-shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="input-glass py-2.5 text-xs pl-3 pr-8 appearance-none cursor-pointer"
              id="news-sort"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ── All news items ────────────────────────────────────────────────────── */}
      <section className="section-container py-8 pb-24">
        <div className="mb-5 flex items-center justify-between">
          <motion.p
            key={filtered.length}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm text-slate-400"
          >
            Showing <span className="text-white font-semibold">{filtered.length}</span> of{" "}
            <span className="text-white font-semibold">{newsEvents.length}</span> items
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key="results"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {filtered.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center"
            >
              <div className="w-16 h-16 rounded-2xl glass-brand flex items-center justify-center mx-auto mb-4">
                <Newspaper className="w-7 h-7 text-brand-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No updates found</h3>
              <p className="text-slate-400 text-sm mb-5">Try a different search or category.</p>
              <button
                onClick={() => { setSearch(""); setActiveCats([]); }}
                className="btn-primary text-sm"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
