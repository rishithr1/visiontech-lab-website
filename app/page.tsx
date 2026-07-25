"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import {
  ArrowRight,
  BookMarked,
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  ExternalLink,
  Eye,
  FlaskConical,
  Globe,
  Lightbulb,
  Microscope,
  Quote,
  Sparkles,
  Star,
  Trophy,
  Activity,
  Users,
  Zap,
  Brain,
  Camera,
  Network,
  Bot,
  Cpu,
  Satellite,
  PersonStanding,
  HeartPulse,
} from "lucide-react";

// ─── Hooks ─────────────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Placeholder Data (will come from API in Step 6) ───────────────────────
const carouselSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1600&q=80",
    title: "Best Paper Award at CVPR 2024",
    subtitle: "Our work on Real-Time Semantic Segmentation earns recognition at the world's premier computer vision conference.",
    badge: "Achievement",
    badgeColor: "badge-gold",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=80",
    title: "₹1.2 Cr Research Grant Awarded",
    subtitle: "Funded by the Department of Science and Technology for advancing AI-driven medical imaging research.",
    badge: "Grant",
    badgeColor: "badge-brand",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80",
    title: "New PhD Scholars Join the Lab",
    subtitle: "We welcome 4 new doctoral researchers to our growing family for the 2024–25 academic year.",
    badge: "People",
    badgeColor: "badge-teal",
  },
];

const latestNews = [
  {
    id: 1,
    date: "June 2024",
    category: "Conference",
    title: "Paper Accepted at NeurIPS 2024",
    excerpt:
      "Our research on self-supervised visual representation learning has been accepted at NeurIPS 2024.",
    href: "/news-events/neurips-2024",
  },
  {
    id: 2,
    date: "May 2024",
    category: "Award",
    title: "Best Demo Award at ICCV Workshop",
    excerpt:
      "The lab's live demo on real-time object tracking won the Best Demo award at the ICCV 2024 workshop.",
    href: "/news-events/iccv-demo-award",
  },
  {
    id: 3,
    date: "April 2024",
    category: "Collaboration",
    title: "Industry Collaboration with TCS Research",
    excerpt:
      "Vision Technology Lab signs MoU with TCS Research to jointly develop AI-based inspection systems.",
    href: "/news-events/tcs-collaboration",
  },
];

const latestPublications = [
  {
    id: 1,
    title: "Self-Supervised Monocular Depth Estimation via Masked Autoencoders",
    authors: "K. Sharma, A. Mehta, R. Patel",
    venue: "CVPR 2024",
    year: 2024,
    doi: "10.1109/CVPR.2024.00001",
    apa: "Sharma, K., Mehta, A., & Patel, R. (2024). Self-Supervised Monocular Depth Estimation via Masked Autoencoders. In Proceedings of CVPR 2024 (pp. 1–12). IEEE.",
  },
  {
    id: 2,
    title: "Transformer-Based Real-Time Semantic Segmentation for Autonomous Vehicles",
    authors: "K. Sharma, V. Kumar",
    venue: "IEEE TPAMI",
    year: 2024,
    doi: "10.1109/TPAMI.2024.00002",
    apa: "Sharma, K., & Kumar, V. (2024). Transformer-Based Real-Time Semantic Segmentation for Autonomous Vehicles. IEEE Transactions on Pattern Analysis and Machine Intelligence, 46(5), 3012–3025.",
  },
  {
    id: 3,
    title: "Multi-Modal Fusion for Medical Image Analysis using Cross-Attention",
    authors: "K. Sharma, S. Reddy, N. Gupta",
    venue: "MICCAI 2024",
    year: 2023,
    doi: "10.1007/978-3-031-2024",
    apa: "Sharma, K., Reddy, S., & Gupta, N. (2023). Multi-Modal Fusion for Medical Image Analysis using Cross-Attention. In Proceedings of MICCAI 2023. Springer.",
  },
];

const researchAreas = [
  {
    id: 1,
    title: "Computer Vision",
    icon: <Camera className="w-7 h-7" />,
    gradient: "from-brand-600/40 via-brand-700/20 to-transparent",
    accent: "brand",
    glow: "rgba(48,104,245,0.25)",
    border: "border-brand-500/25",
    description: "Object detection, semantic segmentation, depth estimation, 3D reconstruction, and dense visual understanding at scale.",
    tags: ["YOLOv11", "ViT", "NeRF", "SAM"],
    count: "24", unit: "papers",
    link: "/research/publications",
  },
  {
    id: 2,
    title: "IoT & Edge Vision",
    icon: <Cpu className="w-7 h-7" />,
    gradient: "from-teal-600/40 via-teal-700/20 to-transparent",
    accent: "teal",
    glow: "rgba(23,163,173,0.25)",
    border: "border-teal-500/25",
    description: "Deploying vision models on edge hardware — NVIDIA Jetson, OpenVINO — for industrial inspection and real-time IoT systems.",
    tags: ["Jetson Orin", "TensorRT", "ONNX", "Edge AI"],
    count: "8", unit: "projects",
    link: "/research/projects",
  },
  {
    id: 3,
    title: "Gait & Pose Analysis",
    icon: <PersonStanding className="w-7 h-7" />,
    gradient: "from-purple-600/40 via-purple-700/20 to-transparent",
    accent: "purple",
    glow: "rgba(147,51,234,0.25)",
    border: "border-purple-500/25",
    description: "Vision-based gait recognition, fall detection for elderly care, and human activity understanding using deep skeletal models.",
    tags: ["Gait Recognition", "Fall Detection", "Pose Estimation"],
    count: "6", unit: "papers",
    link: "/research/publications",
  },
  {
    id: 4,
    title: "Medical Imaging",
    icon: <HeartPulse className="w-7 h-7" />,
    gradient: "from-rose-600/40 via-rose-700/20 to-transparent",
    accent: "rose",
    glow: "rgba(244,63,94,0.25)",
    border: "border-rose-500/25",
    description: "AI-assisted diabetic retinopathy screening, fundus image analysis, and interpretable diagnostic deep learning.",
    tags: ["Retinopathy", "Fundus", "Explainable AI", "DST"],
    count: "11", unit: "papers",
    link: "/research/publications",
  },
  {
    id: 5,
    title: "Remote Sensing",
    icon: <Satellite className="w-7 h-7" />,
    gradient: "from-emerald-600/40 via-emerald-700/20 to-transparent",
    accent: "emerald",
    glow: "rgba(16,185,129,0.25)",
    border: "border-emerald-500/25",
    description: "Spectral-aware masked autoencoders for satellite imagery, crop disease detection, and multispectral UAV processing.",
    tags: ["MAE", "ISRO", "Satellite", "Multispectral"],
    count: "7", unit: "papers",
    link: "/research/publications",
  },
  {
    id: 6,
    title: "Autonomous Systems",
    icon: <Bot className="w-7 h-7" />,
    gradient: "from-gold-600/40 via-gold-700/20 to-transparent",
    accent: "gold",
    glow: "rgba(245,158,11,0.25)",
    border: "border-gold-500/25",
    description: "SLAM, monocular depth estimation, self-supervised perception for autonomous vehicles and robotic navigation.",
    tags: ["SLAM", "Depth", "Self-Supervised", "CVPR"],
    count: "9", unit: "papers",
    link: "/research/publications",
  },
  {
    id: 7,
    title: "Self-Supervised Learning",
    icon: <Brain className="w-7 h-7" />,
    gradient: "from-cyan-600/40 via-cyan-700/20 to-transparent",
    accent: "cyan",
    glow: "rgba(6,182,212,0.25)",
    border: "border-cyan-500/25",
    description: "Masked autoencoders, contrastive learning, and foundation model adaptation for visual representation learning.",
    tags: ["MAE", "DINO", "SimCLR", "ViT"],
    count: "18", unit: "papers",
    link: "/research/publications",
  },
  {
    id: 8,
    title: "Neural Rendering",
    icon: <Network className="w-7 h-7" />,
    gradient: "from-indigo-600/40 via-indigo-700/20 to-transparent",
    accent: "indigo",
    glow: "rgba(99,102,241,0.25)",
    border: "border-indigo-500/25",
    description: "NeRF, 3D Gaussian Splatting, and implicit neural representations for 3D reconstruction and novel view synthesis.",
    tags: ["NeRF", "3DGS", "BEL", "Industrial"],
    count: "5", unit: "papers",
    link: "/research/projects",
  },
];

// ─── Featured Highlights data ─────────────────────────────────────────────────
const featuredHighlights = [
  {
    type: "Publication",
    badge: "badge-brand",
    accentColor: "from-brand-600/30 to-brand-800/10",
    borderAccent: "border-l-brand-500",
    icon: <BookMarked className="w-5 h-5" />,
    iconBg: "glass-brand",
    title: "Self-Supervised Monocular Depth via Masked Autoencoders",
    description: "Best Paper Nominee at CVPR 2024. Achieves state-of-the-art on KITTI without any labelled depth data, enabling scalable autonomous driving perception.",
    meta: "CVPR 2024",
    metaBadge: "badge-brand",
    highlight: "Best Paper Nominee · Top 0.1%",
    metrics: [{ label: "Venue", value: "CVPR 2024" }, { label: "Type", value: "Oral" }, { label: "Data", value: "KITTI" }],
    href: "/research/publications",
  },
  {
    type: "Project",
    badge: "badge-teal",
    accentColor: "from-teal-600/30 to-teal-800/10",
    borderAccent: "border-l-teal-500",
    icon: <HeartPulse className="w-5 h-5" />,
    iconBg: "bg-teal-500/15 border border-teal-500/25",
    title: "AI-Assisted Diabetic Retinopathy Screening",
    description: "DST-funded system for automated early detection of diabetic retinopathy in low-resource clinical settings across rural Andhra Pradesh.",
    meta: "DST · ₹85L Grant",
    metaBadge: "badge-teal",
    highlight: "₹85 Lakh Funded · 3-year project",
    metrics: [{ label: "Grant", value: "₹85L" }, { label: "Funder", value: "DST" }, { label: "Impact", value: "Rural AP" }],
    href: "/research/projects",
  },
  {
    type: "Award",
    badge: "badge-gold",
    accentColor: "from-gold-600/30 to-gold-800/10",
    borderAccent: "border-l-gold-500",
    icon: <Trophy className="w-5 h-5" />,
    iconBg: "bg-gold-500/15 border border-gold-500/25",
    title: "PMRF — Prime Minister's Research Fellowship 2024",
    description: "Rishith Reddy V S awarded the prestigious PMRF for 2024, one of fewer than 500 awarded annually across all IITs and IISc for doctoral research.",
    meta: "September 2024",
    metaBadge: "badge-gold",
    highlight: "₹70,000/month · National Recognition",
    metrics: [{ label: "Stipend", value: "₹70K/mo" }, { label: "Grant", value: "₹2L/yr" }, { label: "Cycle", value: "May 2024" }],
    href: "/news-events",
  },
  {
    type: "Collaboration",
    badge: "text-purple-300 bg-purple-500/15 border border-purple-500/25 badge",
    accentColor: "from-purple-600/30 to-purple-800/10",
    borderAccent: "border-l-purple-500",
    icon: <Globe className="w-5 h-5" />,
    iconBg: "bg-purple-500/15 border border-purple-500/25",
    title: "₹55L Indo-French Grant — DST-CNRS Multimodal Vision",
    description: "Joint 3-year research project with INRIA Rennes on all-weather multimodal scene understanding, including RGB, LiDAR, thermal, and event cameras.",
    meta: "April 2024",
    metaBadge: "text-purple-300 bg-purple-500/15 border border-purple-500/25 badge",
    highlight: "INRIA Rennes · Indo-French CEFIPRA",
    metrics: [{ label: "Grant", value: "₹55L" }, { label: "Partner", value: "INRIA" }, { label: "Duration", value: "3 years" }],
    href: "/news-events",
  },
];

const labStats = [
  { value: "60+", label: "Publications",    icon: <BookMarked className="w-5 h-5" /> },
  { value: "12",  label: "Active Projects", icon: <FlaskConical className="w-5 h-5" /> },
  { value: "24",  label: "Researchers",     icon: <Users className="w-5 h-5" /> },
  { value: "5",   label: "Patents Filed",   icon: <Lightbulb className="w-5 h-5" /> },
  { value: "8",   label: "Grants Won",      icon: <Zap className="w-5 h-5" /> },
  { value: "3",   label: "Global Collabs",  icon: <Globe className="w-5 h-5" /> },
];

// ─── Sub-components ─────────────────────────────────────────────────────────

// ─ Animated counter ─
function AnimatedCounter({ target, duration = 1500 }: { target: string; duration?: number }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const numeric = parseInt(target.replace(/\D/g, ""), 10);
        const suffix  = target.replace(/[0-9]/g, "");
        if (isNaN(numeric)) { setDisplay(target); return; }

        const start     = performance.now();
        const animate   = (now: number) => {
          const pct = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - pct, 3);
          setDisplay(Math.round(ease * numeric) + suffix);
          if (pct < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{display}</span>;
}

// ─ Copy-to-Clipboard button ─
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy APA citation to clipboard"
      title="Copy APA citation"
      className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
        copied
          ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
          : "glass-xs text-slate-400 hover:text-white hover:bg-white/10"
      }`}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

// ─ Section header ─
function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = true,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  centered?: boolean;
}) {
  return (
    <div className={`reveal space-y-3 ${centered ? "text-center" : ""}`}>
      <div className={`flex items-center gap-2 ${centered ? "justify-center" : ""}`}>
        <div className="h-px w-8 bg-gradient-to-r from-transparent to-brand-500" />
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-400">
          {eyebrow}
        </span>
        <div className="h-px w-8 bg-gradient-to-l from-transparent to-brand-500" />
      </div>
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─ Research Areas Carousel ─
function ResearchAreasCarousel() {
  const [carouselWidth, setCarouselWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (carouselRef.current) {
      setCarouselWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  return (
    <section id="research-areas" className="section-padding overflow-hidden" aria-labelledby="research-areas-heading">
      <div className="section-container">
        <SectionHeader
          eyebrow="Focus Areas"
          title={
            <>
              Our <span className="gradient-text">Research Domains</span>
            </>
          }
          subtitle="We work at the intersection of computer vision, AI, and real-world applications."
        />
        
        <div className="mt-12 relative cursor-grab active:cursor-grabbing">
          {/* Subtle gradient edges to hint scroll */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-navy-deep to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-navy-deep to-transparent z-10 pointer-events-none" />

          <motion.div ref={carouselRef} className="overflow-hidden">
            <motion.div 
              drag="x" 
              dragConstraints={{ right: 0, left: -carouselWidth }}
              dragElastic={0.1}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
              className="flex gap-5 px-4 md:px-0"
            >
              {researchAreas.map((area, i) => (
                <motion.div
                  key={area.id}
                  className={`min-w-[300px] md:min-w-[350px] group glass-card border ${area.border} flex-shrink-0 relative overflow-hidden`}
                >
                  {/* Hover background glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${area.gradient} pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative p-6 space-y-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${area.gradient.replace("to-transparent", "to-black/20")} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 border ${area.border}`}>
                      {area.icon}
                    </div>
                    
                    {/* Content */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white transition-colors">{area.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed min-h-[80px]">{area.description}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2 min-h-[36px]">
                      {area.tags.map(tag => (
                        <span key={tag} className="glass-xs text-[10px] text-slate-300 px-2 py-0.5 rounded-md">{tag}</span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-md glass-xs text-${area.accent}-300`}>
                        {area.count} {area.unit}
                      </span>
                      <Link href={area.link} className="w-8 h-8 rounded-full glass-xs flex items-center justify-center hover:bg-white/10 transition-colors group/link">
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover/link:text-white group-hover/link:translate-x-0.5 transition-all" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Drag Hint */}
        <div className="mt-8 text-center flex items-center justify-center gap-2 text-slate-500 text-xs font-medium uppercase tracking-widest opacity-60">
          <ChevronLeft className="w-4 h-4" /> Drag to explore <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </section>
  );
}

// ─ Featured Highlights ─
function FeaturedHighlights() {
  return (
    <section className="section-padding relative overflow-hidden" aria-labelledby="featured-heading">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-950/40 via-transparent to-teal-950/30 pointer-events-none" />
      
      {/* Floating confetti blobs */}
      <div className="absolute top-10 left-10 w-3 h-3 bg-brand-400/60 rounded-full animate-float pointer-events-none" style={{ animationDelay: "0s" }} />
      <div className="absolute top-20 right-20 w-2 h-2 bg-gold-400/60 rounded-full animate-float pointer-events-none" style={{ animationDelay: "0.8s" }} />
      <div className="absolute top-32 left-1/3 w-2 h-4 bg-teal-400/60 rounded-sm animate-float pointer-events-none" style={{ animationDelay: "1.6s" }} />
      <div className="absolute top-16 right-1/3 w-3 h-2 bg-brand-300/60 rounded-sm animate-float pointer-events-none" style={{ animationDelay: "0.4s" }} />
      <div className="absolute top-40 left-2/3 w-2 h-2 bg-gold-300/70 rounded-full animate-float pointer-events-none" style={{ animationDelay: "1.2s" }} />

      <div className="relative section-container">
        <SectionHeader
          eyebrow="Highlights"
          title={
            <>
              Featured <span className="gradient-text">Work</span>
              <Sparkles className="w-7 h-7 text-gold-400 inline-block align-middle animate-pulse ml-3" />
            </>
          }
          subtitle="Selected publications, projects, and achievements spotlighted by our Principal Investigator."
          centered={false}
        />

        <div className="mt-12 space-y-6">
          {featuredHighlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card group flex flex-col md:flex-row overflow-hidden border-l-4 ${item.borderAccent} hover:scale-[1.01] transition-transform duration-300`}
            >
              {/* Left Accent Bar */}
              <div className={`hidden md:block w-48 shrink-0 bg-gradient-to-br ${item.accentColor} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-20 transform -rotate-12 scale-150 group-hover:scale-110 transition-transform duration-700">
                  {item.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-center relative">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`badge ${item.badge}`}>{item.type}</span>
                  <span className={`badge ${item.metaBadge}`}>{item.meta}</span>
                  <div className="flex-1" />
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${item.iconBg}`}>
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-3 group-hover:text-brand-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-base text-slate-400 leading-relaxed mb-6 max-w-3xl">
                  {item.description}
                </p>

                {/* Metrics */}
                <div className="flex flex-wrap items-center gap-6 mt-auto bg-white/05 rounded-xl p-4 border border-white/10">
                  {item.metrics.map((metric, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">{metric.label}</span>
                      <span className="text-sm font-semibold text-slate-200">{metric.value}</span>
                    </div>
                  ))}
                  
                  <div className="flex-1 min-w-[20px]" />

                  <Link href={item.href} className="btn-primary text-sm gap-2">
                    View Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page Component ─────────────────────────────────────────────────────────
export default function HomePage() {
  useScrollReveal();

  // Carousel state
  const [activeSlide, setActiveSlide]       = useState(0);
  const [isPaused, setIsPaused]             = useState(false);
  const [carouselStyle, setCarouselStyle]   = useState({ transform: "translateX(0%)", transition: "none" });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Research areas carousel
  const [raIndex, setRaIndex] = useState(0);
  const raVisible = 3; // visible cards at once on desktop

  // ─ Carousel auto-play ──────────────────────────────────────────
  const goToSlide = (idx: number) => {
    const clamped = (idx + carouselSlides.length) % carouselSlides.length;
    setActiveSlide(clamped);
    setCarouselStyle({
      transform:  `translateX(-${clamped * 100}%)`,
      transition: "transform 600ms cubic-bezier(0.25,0.46,0.45,0.94)",
    });
  };

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => {
        const next = (prev + 1) % carouselSlides.length;
        setCarouselStyle({
          transform:  `translateX(-${next * 100}%)`,
          transition: "transform 600ms cubic-bezier(0.25,0.46,0.45,0.94)",
        });
        return next;
      });
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          SECTION 1 — HERO CAROUSEL
      ════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative w-full overflow-hidden"
        style={{ height: "100svh", minHeight: "600px", maxHeight: "900px" }}
        aria-label="Featured announcements carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Slides track */}
        <div className="absolute inset-0 hero-carousel">
          <div
            className="flex h-full w-full"
            style={carouselStyle}
            aria-live="polite"
          >
            {carouselSlides.map((slide, i) => (
              <div
                key={slide.id}
                className="relative flex-shrink-0 w-full h-full"
                aria-hidden={i !== activeSlide}
                role="group"
                aria-label={`Slide ${i + 1} of ${carouselSlides.length}: ${slide.title}`}
              >
                {/* Background image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  fetchPriority={i === 0 ? "high" : "auto"}
                  loading={i === 0 ? "eager" : "lazy"}
                />

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/50 to-navy-950/90" />
                <div className="absolute inset-0 bg-gradient-to-r from-navy-950/60 to-transparent" />

                {/* Slide content */}
                <div className="absolute inset-0 flex flex-col justify-end">
                  <div className="section-container pb-24 md:pb-28">
                    <span className={`badge mb-4 ${slide.badgeColor}`}>
                      {slide.badge}
                    </span>
                    <h1 className="text-3xl md:text-5xl xl:text-6xl font-display font-bold text-white max-w-3xl leading-tight mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-base md:text-lg text-slate-300 max-w-xl leading-relaxed mb-8">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link href="/news-events" className="btn-primary">
                        Read More <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link href="/#about" className="btn-secondary">
                        About the Lab
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel controls */}
        <button
          onClick={() => goToSlide(activeSlide - 1)}
          aria-label="Previous slide"
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 glass-md rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => goToSlide(activeSlide + 1)}
          aria-label="Next slide"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 glass-md rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dot indicators */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
          role="tablist"
          aria-label="Carousel navigation dots"
        >
          {carouselSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              role="tab"
              aria-selected={i === activeSlide}
              aria-label={`Go to slide ${i + 1}`}
              className={`carousel-dot transition-all duration-300 ${i === activeSlide ? "active" : ""}`}
            />
          ))}
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 right-6 md:right-10 z-20 hidden md:flex flex-col items-center gap-1 text-slate-500">
          <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-slate-500 to-transparent animate-bounce-soft" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 2 — STATS TICKER
      ════════════════════════════════════════════════════════════ */}
      <section className="relative py-4 overflow-hidden glass-strong border-y border-white/08" aria-label="Lab statistics">
        <div className="flex items-center gap-0" aria-hidden="true">
          {/* Duplicate for seamless loop */}
          {[...labStats, ...labStats].map((stat, i) => (
            <div key={i} className="flex items-center gap-8 px-8 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="text-brand-400">{stat.icon}</div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-display font-bold text-white">
                    {stat.value}
                  </span>
                  <span className="text-xs text-slate-400 uppercase tracking-wide">
                    {stat.label}
                  </span>
                </div>
              </div>
              <div className="w-px h-5 bg-white/12 flex-shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 3 — TOP NEWS & EVENTS
      ════════════════════════════════════════════════════════════ */}
      <section
        id="news"
        className="section-padding"
        aria-labelledby="news-heading"
      >
        <div className="section-container">
          <SectionHeader
            eyebrow="Latest"
            title={
              <>
                News &amp; <span className="gradient-text">Events</span>
              </>
            }
            subtitle="Stay up to date with the latest happenings, achievements, and milestones from Vision Technology Lab."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.map((item, i) => (
              <article
                key={item.id}
                className={`reveal reveal-delay-${(i + 1) * 100} glass-card group cursor-pointer`}
              >
                <Link href={item.href} className="block p-6 h-full">
                  {/* Category + date */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="badge-brand">{item.category}</span>
                    <span className="text-xs text-slate-500">{item.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-white mb-2 group-hover:text-brand-300 transition-colors duration-200 leading-snug">
                    {item.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    {item.excerpt}
                  </p>

                  {/* Read more */}
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-400 group-hover:text-brand-300 transition-colors">
                    Read More
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center reveal">
            <Link href="/news-events" className="btn-secondary inline-flex">
              <Calendar className="w-4 h-4" />
              View All News &amp; Events
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 4 — RESEARCH AREAS CAROUSEL
      ════════════════════════════════════════════════════════════ */}
      <ResearchAreasCarousel />

      {/* ════════════════════════════════════════════════════════════
          SECTION 5 — 3 LATEST PUBLICATIONS (with confetti accent)
      ════════════════════════════════════════════════════════════ */}
      <section
        id="publications"
        className="section-padding relative overflow-hidden"
        aria-labelledby="publications-heading"
      >
        {/* Background accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950/40 via-transparent to-teal-950/30 pointer-events-none" />

        {/* Floating confetti blobs */}
        <div className="absolute top-10 left-10 w-3 h-3 bg-brand-400/60 rounded-full animate-float pointer-events-none" style={{ animationDelay: "0s" }} />
        <div className="absolute top-20 right-20 w-2 h-2 bg-gold-400/60 rounded-full animate-float pointer-events-none" style={{ animationDelay: "0.8s" }} />
        <div className="absolute top-32 left-1/3 w-2 h-4 bg-teal-400/60 rounded-sm animate-float pointer-events-none" style={{ animationDelay: "1.6s" }} />
        <div className="absolute top-16 right-1/3 w-3 h-2 bg-brand-300/60 rounded-sm animate-float pointer-events-none" style={{ animationDelay: "0.4s" }} />
        <div className="absolute top-40 left-2/3 w-2 h-2 bg-gold-300/70 rounded-full animate-float pointer-events-none" style={{ animationDelay: "1.2s" }} />

        <div className="relative section-container">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <SectionHeader
              eyebrow="Featured"
              title={
                <>
                  Latest{" "}
                  <span className="gradient-text">Publications</span>{" "}
                  <Sparkles className="w-7 h-7 text-gold-400 inline-block align-middle animate-pulse" />
                </>
              }
              centered={false}
            />
            <Link
              href="/research/publications"
              className="btn-secondary flex-shrink-0 text-sm"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {latestPublications.map((pub, i) => (
              <article
                key={pub.id}
                className={`reveal reveal-delay-${(i + 1) * 100} glass-card group`}
              >
                <div className="p-5 sm:p-6 flex flex-col sm:flex-row gap-4">
                  {/* Number badge */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl glass-brand flex items-center justify-center">
                      <span className="text-sm font-bold text-brand-300">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Venue + year */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="badge-brand">{pub.venue}</span>
                      <span className="badge-teal">{pub.year}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-semibold text-white mb-1 group-hover:text-brand-200 transition-colors duration-200 leading-snug">
                      {pub.title}
                    </h3>

                    {/* Authors */}
                    <p className="text-sm text-slate-400 mb-3">{pub.authors}</p>

                    {/* APA citation (collapsed) */}
                    <details className="group/apa">
                      <summary className="text-xs text-brand-400 cursor-pointer hover:text-brand-300 transition-colors list-none flex items-center gap-1.5">
                        <Quote className="w-3 h-3" />
                        Show APA Citation
                      </summary>
                      <div className="mt-2 flex items-start gap-2">
                        <p className="text-xs text-slate-400 font-mono leading-relaxed bg-white/04 rounded-lg px-3 py-2 flex-1 border border-white/07">
                          {pub.apa}
                        </p>
                        <CopyButton text={pub.apa} />
                      </div>
                    </details>
                  </div>

                  {/* External link */}
                  <div className="flex-shrink-0 self-start">
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View publication: ${pub.title}`}
                      className="w-9 h-9 rounded-lg glass-xs flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-600/30 transition-all duration-200"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 6 — ABOUT THE LAB
      ════════════════════════════════════════════════════════════ */}
      <section
        id="about"
        className="section-padding"
        aria-labelledby="about-heading"
      >
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">
            {/* Left — Text */}
            <div className="space-y-8">
              <div className="reveal space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-brand-500" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-400">
                    Who We Are
                  </span>
                </div>

                <h2
                  id="about-heading"
                  className="text-3xl md:text-4xl font-display font-bold text-white"
                >
                  Pioneering Vision &amp;{" "}
                  <span className="gradient-text">Intelligence</span>
                </h2>

                <p className="text-slate-400 leading-relaxed text-base">
                  The{" "}
                  <strong className="text-slate-200 font-semibold">
                    Vision Technology Lab
                  </strong>{" "}
                  at IIT Tirupati is a research group dedicated to advancing the
                  science of machine perception. We work at the forefront of
                  computer vision, deep learning, and AI-driven systems — solving
                  real-world problems in healthcare, autonomous systems, and
                  industrial inspection.
                </p>

                <p className="text-slate-400 leading-relaxed text-base">
                  Our research is grounded in a belief that machine vision can
                  transform how society sees and interacts with the world — from
                  detecting early-stage tumors to enabling robots to navigate
                  complex environments safely.
                </p>
              </div>

              {/* Problems being solved */}
              <div className="reveal reveal-delay-100 space-y-3">
                <h3 className="text-base font-semibold text-white">
                  Problems We Solve
                </h3>
                <ul className="space-y-2.5">
                  {[
                    "Real-time semantic understanding for autonomous vehicles",
                    "AI-assisted diagnostics in low-resource medical settings",
                    "Self-supervised learning from unlabeled visual data",
                    "Robust perception under adverse conditions (fog, rain, night)",
                  ].map((problem, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-400">
                      <div className="w-5 h-5 rounded-md glass-brand flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Eye className="w-2.5 h-2.5 text-brand-400" />
                      </div>
                      {problem}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="reveal reveal-delay-200 flex flex-wrap gap-3">
                <Link href="/people" className="btn-primary">
                  <Users className="w-4 h-4" />
                  Meet the Team
                </Link>
                <Link href="/research/publications" className="btn-secondary">
                  <BookMarked className="w-4 h-4" />
                  Our Research
                </Link>
              </div>
            </div>

            {/* Right — PI Card + Stats */}
            <div className="space-y-5">
              {/* PI card */}
              <div className="reveal reveal-delay-200 glass-card p-6 glow-border">
                <div className="flex items-start gap-4">
                  {/* PI avatar placeholder */}
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl glass-brand flex items-center justify-center overflow-hidden">
                      <span className="text-2xl font-bold text-brand-300">KS</span>
                    </div>
                    {/* Online indicator */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-teal-500 rounded-full border-2 border-navy-900" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-display font-bold text-white">
                        Dr. Kalidas S.
                      </h3>
                      <span className="badge-brand">Principal Investigator</span>
                    </div>

                    <p className="text-sm text-brand-300 mt-1 font-medium">
                      Assistant Professor, Dept. of CSE
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">IIT Tirupati</p>

                    <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                      Dr. Kalidas specializes in computer vision, medical image
                      analysis, and deep learning. He received his PhD from IIT
                      Madras and has published 60+ papers in top-tier venues.
                    </p>

                    {/* Quick stats */}
                    <div className="flex flex-wrap gap-3 mt-4">
                      {[
                        { label: "h-index", value: "18" },
                        { label: "Citations", value: "1200+" },
                        { label: "Experience", value: "12 yrs" },
                      ].map((s) => (
                        <div key={s.label} className="glass-xs rounded-lg px-3 py-1.5 text-center">
                          <div className="text-sm font-bold text-white">{s.value}</div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wide">
                            {s.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Lab stats grid */}
              <div className="reveal reveal-delay-300 grid grid-cols-3 gap-3">
                {labStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="glass-card p-4 text-center group hover:border-brand-500/30 transition-all duration-200"
                  >
                    <div className="flex justify-center text-brand-400 mb-2 group-hover:scale-110 transition-transform duration-200">
                      {stat.icon}
                    </div>
                    <div className="text-xl font-display font-bold text-white">
                      <AnimatedCounter target={stat.value} />
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wide mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 7 — FEATURED HIGHLIGHTS
      ════════════════════════════════════════════════════════════ */}
      <FeaturedHighlights />

      {/* ════════════════════════════════════════════════════════════
          SECTION 8 — CTA BANNER
      ════════════════════════════════════════════════════════════ */}
      <section className="section-padding" aria-label="Call to action">
        <div className="section-container">
          <div className="reveal relative overflow-hidden glass-card border-brand-500/20 border-2 rounded-3xl p-8 md:p-12 text-center">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 via-transparent to-teal-600/08 pointer-events-none" />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative space-y-4">
              <span className="badge-gold mb-2">Join Us</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                Ready to Push the Boundaries of{" "}
                <span className="gradient-text">Vision AI?</span>
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto text-base leading-relaxed">
                We are actively looking for passionate MS, PhD scholars and
                project staff to join our team. If you are driven by curiosity
                and ambition, we want to hear from you.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link href="/careers" className="btn-primary">
                  <Briefcase className="w-4 h-4" />
                  View Open Positions
                </Link>
                <Link href="/#contact" className="btn-secondary">
                  <Zap className="w-4 h-4" />
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 9 — CONTACT ANCHOR
      ════════════════════════════════════════════════════════════ */}
      <section
        id="contact"
        className="section-padding"
        aria-labelledby="contact-heading"
      >
        <div className="section-container">
          <SectionHeader
            eyebrow="Get In Touch"
            title={
              <>
                Contact <span className="gradient-text">Us</span>
              </>
            }
            subtitle="Have questions about our research? Interested in collaborating? We'd love to hear from you."
          />

          <div className="mt-12 max-w-xl mx-auto">
            <form
              className="reveal space-y-4"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Contact form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-slate-300 mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    autoComplete="name"
                    className="input-glass"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    className="input-glass"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium text-slate-300 mb-1.5">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="Research collaboration / PhD inquiry / Other"
                  className="input-glass"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-slate-300 mb-1.5">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Tell us about yourself or your query..."
                  className="input-glass resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full justify-center"
                id="contact-submit-btn"
              >
                Send Message
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
