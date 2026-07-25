"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Award,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  ExternalLink,
  FileText,
  Globe,
  Lightbulb,
  Search,
  Shield,
  Sparkles,
  Users,
  X,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type PatentStatus = "Granted" | "Filed" | "Published" | "Under Examination";
type PatentType   = "Patent" | "IDF";

interface Patent {
  id: number;
  type: PatentType;
  title: string;
  inventors: string[];
  applicationNumber?: string;
  filingDate: string;
  grantDate?: string;
  status: PatentStatus;
  filingOffice: string;
  countryCode: string;
  abstract: string;
  claims?: number;
  tags: string[];
  relatedProject?: string;
  idfNumber?: string;
  commercialPotential?: "High" | "Medium" | "Low";
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const patents: Patent[] = [
  {
    id: 1,
    type: "Patent",
    title: "Method and System for Real-Time Semantic Segmentation Using Lightweight Transformer Networks on Edge Devices",
    inventors: ["Kalidas S.", "Vikram Kumar", "Sanjay Reddy"],
    applicationNumber: "IN202341001234",
    filingDate: "March 2023",
    status: "Under Examination",
    filingOffice: "Indian Patent Office",
    countryCode: "IN",
    abstract:
      "The present invention discloses a lightweight transformer-based semantic segmentation network optimized for deployment on edge devices (NVIDIA Jetson, Raspberry Pi CM4) with sub-100ms inference latency. The method introduces a novel depthwise attention mechanism that reduces computational complexity from O(n²) to O(n log n) while maintaining competitive segmentation accuracy.",
    claims: 12,
    tags: ["Semantic Segmentation", "Edge AI", "Transformer", "Autonomous Driving"],
    relatedProject: "Real-Time Scene Understanding for Autonomous Vehicles",
    commercialPotential: "High",
  },
  {
    id: 2,
    type: "Patent",
    title: "Lesion-Aware Attention Network for Automated Grading of Diabetic Retinopathy from Fundus Photographs",
    inventors: ["Kalidas S.", "Sanjay Reddy", "Pradeep Kumar"],
    applicationNumber: "IN202341005678",
    filingDate: "July 2023",
    status: "Published",
    filingOffice: "Indian Patent Office",
    countryCode: "IN",
    abstract:
      "The invention provides an attention-based deep learning system for automated detection and grading of diabetic retinopathy from fundus photographs. The system employs a dual-stream architecture: one stream for global retinal features and one for localized lesion detection. A novel lesion-aware loss function guides the network to learn discriminative representations for microaneurysms, hard exudates, and neovascularization.",
    claims: 8,
    tags: ["Medical Imaging", "Diabetic Retinopathy", "Deep Learning", "Ophthalmology"],
    relatedProject: "AI-Assisted Diabetic Retinopathy Screening",
    commercialPotential: "High",
  },
  {
    id: 3,
    type: "Patent",
    title: "Sparse-View Dynamic Neural Radiance Field with Temporal Deformation Module for 3D Scene Reconstruction",
    inventors: ["Kalidas S.", "Arjun Mehta", "Vikram Kumar"],
    applicationNumber: "IN202241009012",
    filingDate: "November 2022",
    grantDate: "August 2024",
    status: "Granted",
    filingOffice: "Indian Patent Office",
    countryCode: "IN",
    abstract:
      "A novel neural radiance field framework for reconstructing dynamic 3D scenes from as few as 4 input views is disclosed. The system incorporates a lightweight temporal deformation module that predicts per-point 3D displacements across time, enabling high-quality 4D scene representation without requiring dense multi-view capture setups.",
    claims: 15,
    tags: ["NeRF", "3D Reconstruction", "Dynamic Scenes", "Novel View Synthesis"],
    relatedProject: "Neural Radiance Fields for Industrial 3D Inspection",
    commercialPotential: "High",
  },
  {
    id: 4,
    type: "Patent",
    title: "Domain Adaptive Object Detector with Weather-Aware Style Transfer for Robust Autonomous Perception",
    inventors: ["Vikram Singh", "Kalidas S.", "Arjun Mehta"],
    applicationNumber: "IN202341012345",
    filingDate: "January 2024",
    status: "Filed",
    filingOffice: "Indian Patent Office",
    countryCode: "IN",
    abstract:
      "This invention discloses a domain adaptive object detection architecture that maintains high detection accuracy under adverse weather conditions (fog, heavy rain, nighttime). The method combines weather-aware style normalization with feature-level domain alignment using a novel cross-domain adversarial training strategy. The system achieves consistent performance across weather conditions without scene-specific retraining.",
    claims: 10,
    tags: ["Object Detection", "Domain Adaptation", "Adverse Weather", "Autonomous Driving"],
    relatedProject: "Real-Time Scene Understanding for Autonomous Vehicles",
    commercialPotential: "High",
  },
  {
    id: 5,
    type: "Patent",
    title: "Memory-Efficient Video Object Segmentation via Hierarchical Temporal Key-Value Stores",
    inventors: ["Kalidas S.", "Thilak Nair"],
    applicationNumber: "IN202341007890",
    filingDate: "May 2023",
    status: "Under Examination",
    filingOffice: "Indian Patent Office",
    countryCode: "IN",
    abstract:
      "A memory-efficient video object segmentation method using hierarchical temporal key-value stores is presented. The invention organizes temporal memory at multiple resolutions — coarse and fine — enabling selective retrieval of relevant past features without O(T) memory scaling. The approach reduces GPU memory requirements by 65% relative to existing memory-based video segmentation models.",
    claims: 9,
    tags: ["Video Segmentation", "Temporal Memory", "Efficient Inference", "Video Understanding"],
    commercialPotential: "Medium",
  },
  {
    id: 6,
    type: "IDF",
    title: "Crop Disease Detection System Using Multispectral UAV Imagery and Edge AI",
    inventors: ["Kalidas S.", "Thilak Nair", "Pradeep Kumar", "M. Naidu (ANGRAU)"],
    idfNumber: "IIT-TPT/IDF/2022/004",
    filingDate: "September 2022",
    grantDate: "March 2023",
    status: "Granted",
    filingOffice: "IIT Tirupati Technology Transfer Office",
    countryCode: "IN",
    abstract:
      "This Invention Disclosure Form documents an integrated system combining multispectral UAV imaging with on-board edge AI inference for real-time crop disease detection. The system processes NDVI, NDRE, and RGB imagery streams simultaneously to identify 14 types of crop diseases in paddy, groundnut, and chilli crops at 92.3% top-1 accuracy. Technology transferred to Andhra Pradesh State Agriculture Department.",
    tags: ["Precision Agriculture", "UAV", "Multispectral", "Edge AI", "Crop Disease"],
    relatedProject: "AI for Precision Agriculture",
    commercialPotential: "Medium",
  },
  {
    id: 7,
    type: "IDF",
    title: "Normalizing Flow-Based Anomaly Detection Architecture for Zero-Shot Industrial Defect Inspection",
    inventors: ["Kalidas S.", "Vikram Singh", "L. Krishnan"],
    idfNumber: "IIT-TPT/IDF/2021/001",
    filingDate: "June 2021",
    grantDate: "January 2022",
    status: "Granted",
    filingOffice: "IIT Tirupati Technology Transfer Office",
    countryCode: "IN",
    abstract:
      "An anomaly detection architecture leveraging conditional normalizing flows to perform zero-shot visual inspection of industrial surfaces without defect examples during training. The model learns the distribution of normal appearances and flags deviations at test time. Evaluated on MVTec-AD dataset achieving 98.4% AUROC across 15 object categories. Technology licensed to a manufacturing firm in Hyderabad.",
    tags: ["Anomaly Detection", "Normalizing Flows", "Industrial Inspection", "Zero-Shot"],
    relatedProject: "Neural Radiance Fields for Industrial 3D Inspection",
    commercialPotential: "High",
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────
const cardVariants = {
  hidden:  { opacity: 0, y: 28, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

// ─── Status Config ─────────────────────────────────────────────────────────────
const statusConfig: Record<
  PatentStatus,
  { badge: string; dot: string; icon: React.ReactNode; description: string }
> = {
  "Granted":          { badge: "bg-teal-500/20 text-teal-300 border border-teal-500/30",    dot: "bg-teal-400",              icon: <CheckCircle2 className="w-3 h-3" />, description: "Patent/IDF has been officially granted" },
  "Filed":            { badge: "bg-brand-500/20 text-brand-300 border border-brand-500/30", dot: "bg-brand-400 animate-pulse",icon: <FileText className="w-3 h-3" />,    description: "Application filed, pending examination" },
  "Published":        { badge: "bg-gold-500/20 text-gold-300 border border-gold-500/30",    dot: "bg-gold-400",              icon: <Globe className="w-3 h-3" />,       description: "Published in patent gazette" },
  "Under Examination":{ badge: "bg-orange-500/20 text-orange-300 border border-orange-500/30", dot: "bg-orange-400 animate-pulse", icon: <AlertCircle className="w-3 h-3" />, description: "Under review by patent examiner" },
};

const potentialConfig: Record<
  Exclude<Patent["commercialPotential"], undefined>,
  string
> = {
  High:   "text-teal-300 bg-teal-500/15 border-teal-500/25",
  Medium: "text-gold-300 bg-gold-500/15 border-gold-500/25",
  Low:    "text-slate-400 bg-slate-500/15 border-slate-500/25",
};

// ─── Copy Button ──────────────────────────────────────────────────────────────
function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
        copied
          ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
          : "glass-xs text-slate-400 hover:text-white hover:bg-white/10 border border-transparent"
      }`}
    >
      {copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> {label}</>}
    </motion.button>
  );
}

// ─── Patent Card ──────────────────────────────────────────────────────────────
function PatentCard({ patent, index }: { patent: Patent; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const status = statusConfig[patent.status];

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      layout
      className={`glass-card group overflow-hidden ${
        patent.type === "Patent"
          ? "border-l-2 border-l-brand-500/50"
          : "border-l-2 border-l-gold-500/50"
      }`}
      aria-label={patent.title}
    >
      <div className="p-5 md:p-7">
        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
          <div className="space-y-2 flex-1 min-w-0">
            {/* Type + Status badges */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Type badge */}
              <span
                className={`inline-flex items-center gap-1.5 badge font-bold ${
                  patent.type === "Patent"
                    ? "badge-brand"
                    : "badge-gold"
                }`}
              >
                {patent.type === "Patent" ? (
                  <Shield className="w-3 h-3" />
                ) : (
                  <Lightbulb className="w-3 h-3" />
                )}
                {patent.type}
              </span>

              {/* Status badge */}
              <span className={`inline-flex items-center gap-1.5 badge ${status.badge}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                {status.icon}
                {patent.status}
              </span>

              {/* Commercial potential */}
              {patent.commercialPotential && (
                <span className={`badge border text-[10px] ${potentialConfig[patent.commercialPotential]}`}>
                  <Sparkles className="w-2.5 h-2.5 inline mr-0.5" />
                  {patent.commercialPotential} Potential
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className="text-base md:text-[17px] font-semibold text-white group-hover:text-brand-200 transition-colors duration-200 leading-snug pr-4">
              {patent.title}
            </h2>
          </div>

          {/* Country flag + number */}
          <div className="flex-shrink-0 text-right">
            <div className="glass-brand rounded-xl px-3 py-2 inline-block">
              <div className="text-xs font-bold text-brand-200">{patent.countryCode}</div>
              <div className="text-[9px] text-slate-500 mt-0.5">
                {patent.applicationNumber ?? patent.idfNumber ?? "—"}
              </div>
            </div>
          </div>
        </div>

        {/* ── Meta info ────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-4 mb-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-brand-400" />
            {patent.inventors.slice(0, 3).join(", ")}
            {patent.inventors.length > 3 ? ` +${patent.inventors.length - 3}` : ""}
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-teal-400" />
            Filed: {patent.filingDate}
          </div>
          {patent.grantDate && (
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
              Granted: {patent.grantDate}
            </div>
          )}
          {patent.claims && (
            <div className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-gold-400" />
              {patent.claims} Claims
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            {patent.filingOffice}
          </div>
        </div>

        {/* ── Abstract excerpt ─────────────────────────────────────── */}
        <p className="text-sm text-slate-400 leading-relaxed mb-3 line-clamp-3">
          {patent.abstract}
        </p>

        {/* ── Expanded section ─────────────────────────────────────── */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="py-4 border-t border-white/08 space-y-4">
                {/* Full abstract */}
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-400 mb-2">
                    Full Abstract
                  </h3>
                  <div className="bg-white/04 rounded-xl p-4 border border-white/07">
                    <p className="text-sm text-slate-300 leading-relaxed">{patent.abstract}</p>
                  </div>
                </div>

                {/* All inventors */}
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-400 mb-2">
                    Inventors
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {patent.inventors.map((inv, i) => (
                      <span
                        key={i}
                        className={`text-xs px-2.5 py-1 rounded-lg ${
                          i === 0
                            ? "bg-brand-600/25 text-brand-200 border border-brand-500/30"
                            : "glass-xs text-slate-300"
                        }`}
                      >
                        {inv}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Related project */}
                {patent.relatedProject && (
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-400 mb-2">
                      Related Project
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-300 glass-xs px-3 py-2 rounded-lg w-fit">
                      <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
                      {patent.relatedProject}
                    </div>
                  </div>
                )}

                {/* Copy application number */}
                {(patent.applicationNumber || patent.idfNumber) && (
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500">
                      Application No:{" "}
                      <code className="text-slate-300 font-mono">
                        {patent.applicationNumber ?? patent.idfNumber}
                      </code>
                    </span>
                    <CopyButton
                      text={patent.applicationNumber ?? patent.idfNumber ?? ""}
                      label="Number"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-1 border-t border-white/06">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {patent.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="glass-xs text-[10px] text-slate-500 px-2 py-0.5 rounded-md">
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1.5 text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors"
            aria-expanded={expanded}
          >
            {expanded ? "Show Less" : "View Details"}
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Hover bar */}
      <div className={`h-0.5 w-0 group-hover:w-full transition-all duration-500 ${
        patent.type === "Patent"
          ? "bg-gradient-to-r from-brand-500/70 to-teal-500/70"
          : "bg-gradient-to-r from-gold-500/70 to-brand-500/70"
      }`} />
    </motion.article>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PatentsPage() {
  const [search,         setSearch]         = useState("");
  const [selectedType,   setSelectedType]   = useState<PatentType | "All">("All");
  const [selectedStatus, setSelectedStatus] = useState<PatentStatus | "All">("All");

  const filtered = useMemo(
    () =>
      patents.filter((p) => {
        if (selectedType   !== "All" && p.type   !== selectedType)   return false;
        if (selectedStatus !== "All" && p.status !== selectedStatus) return false;
        if (search.trim()) {
          const q = search.toLowerCase();
          const hay = [p.title, p.inventors.join(" "), ...p.tags, p.abstract].join(" ").toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      }),
    [search, selectedType, selectedStatus]
  );

  const granted   = patents.filter((p) => p.status === "Granted").length;
  const patentCount = patents.filter((p) => p.type === "Patent").length;
  const idfCount    = patents.filter((p) => p.type === "IDF").length;

  return (
    <div className="page-pt min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-950/30 via-navy-900/40 to-brand-950/40 pointer-events-none" />
        <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-gold-600/08 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Decorative shield outlines */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{
              width: `${60 + i * 30}px`,
              height: `${60 + i * 30}px`,
              right: `${8 + i * 6}%`,
              top: `${15 + i * 8}%`,
              border: `1px solid rgba(48,104,245,${0.06 + i * 0.04})`,
              borderRadius: "8px",
            }}
            animate={{ rotate: [0, 5, 0, -5, 0], scale: [1, 1.03, 1] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 1.2 }}
          />
        ))}

        <div className="relative section-container text-center space-y-5">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 badge-gold px-4 py-1.5 text-sm"
          >
            <Shield className="w-3.5 h-3.5" />
            Intellectual Property
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold text-white"
          >
            Patents &amp;{" "}
            <span className="gradient-text-gold">IDFs</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Innovations and inventions from Vision Technology Lab — protecting
            our intellectual contributions and driving technology transfer.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-8"
          >
            {[
              { value: patents.length, label: "Total IP",        icon: <Award className="w-5 h-5" />,    color: "text-gold-300"  },
              { value: granted,        label: "Granted",         icon: <CheckCircle2 className="w-5 h-5" />, color: "text-teal-300"  },
              { value: patentCount,    label: "Patents",         icon: <Shield className="w-5 h-5" />,   color: "text-brand-300" },
              { value: idfCount,       label: "IDFs",            icon: <Lightbulb className="w-5 h-5" />, color: "text-purple-300" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.08 }}
                className="glass-card p-4 flex items-center gap-3 group hover:border-gold-500/30 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-xl glass-brand flex items-center justify-center ${stat.color} flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-white">{stat.value}</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
              placeholder="Search patents, inventors, technologies…"
              className="input-glass pl-10 py-2.5 text-sm w-full"
              id="patents-search"
              aria-label="Search patents"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Type filter */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {(["All", "Patent", "IDF"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                aria-pressed={selectedType === t}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  selectedType === t
                    ? t === "Patent"
                      ? "bg-brand-600/40 text-brand-200 border border-brand-500/50"
                      : t === "IDF"
                      ? "bg-gold-600/30 text-gold-200 border border-gold-500/40"
                      : "bg-white/12 text-white"
                    : "glass-xs text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {t === "All" ? "All Types" : t}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <div className="relative flex-shrink-0">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as typeof selectedStatus)}
              className="input-glass py-2.5 text-xs pl-3 pr-8 appearance-none cursor-pointer"
              id="patents-status"
              aria-label="Filter by status"
            >
              <option value="All">All Statuses</option>
              <option value="Granted">Granted</option>
              <option value="Under Examination">Under Examination</option>
              <option value="Published">Published</option>
              <option value="Filed">Filed</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ── Legend ─────────────────────────────────────────────────────────── */}
      <div className="section-container pt-6 pb-2">
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
          <span className="font-semibold text-slate-400">Legend:</span>
          {Object.entries(statusConfig).map(([status, cfg]) => (
            <div key={status} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
              {status}
            </div>
          ))}
          <span className="flex items-center gap-1.5 ml-4">
            <Shield className="w-3.5 h-3.5 text-brand-400" /> Patent — Formally filed at Patent Office
          </span>
          <span className="flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-gold-400" /> IDF — Internal Invention Disclosure Form
          </span>
        </div>
      </div>

      {/* ── Results ─────────────────────────────────────────────────────────── */}
      <section className="section-container pt-4 pb-20">
        <div className="flex items-center justify-between mb-5">
          <motion.p
            key={filtered.length}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm text-slate-400"
          >
            Showing <span className="text-white font-semibold">{filtered.length}</span> of{" "}
            <span className="text-white font-semibold">{patents.length}</span> entries
          </motion.p>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {filtered.map((patent, i) => (
              <PatentCard key={patent.id} patent={patent} index={i} />
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <div className="w-16 h-16 rounded-2xl glass-brand flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-brand-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No patents found</h3>
              <p className="text-slate-400 text-sm">Try changing your search or filter.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
