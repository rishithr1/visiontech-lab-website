"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  ChevronDown,
  Clock,
  DollarSign,
  ExternalLink,
  FileText,
  IndianRupee,
  MapPin,
  Search,
  Sparkles,
  Star,
  Users,
  X,
  Zap,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type CareerType = "PhD Position" | "MS Position" | "Project Staff" | "Internship" | "Postdoc";
type CareerStatus = "Open" | "Closing Soon" | "Filled";

interface CareerOpening {
  id: number;
  title: string;
  type: CareerType;
  status: CareerStatus;
  postedDate: string;
  closingDate?: string;
  location: string;
  duration: string;
  compensation: string;        // Free-form text — admin controlled
  shortDescription: string;
  description: string;
  requirements: string[];
  preferredSkills?: string[];
  responsibilities?: string[];
  perks?: string[];
  applyLink: string;           // Google Form or email
  contactEmail?: string;
  tags: string[];
  isFeatured?: boolean;
}

// ─── Placeholder Data ──────────────────────────────────────────────────────────
const openings: CareerOpening[] = [
  {
    id: 1,
    title: "PhD Research Position — Computer Vision for Medical Imaging",
    type: "PhD Position",
    status: "Open",
    postedDate: "May 2024",
    closingDate: "July 31, 2024",
    location: "IIT Tirupati, Andhra Pradesh",
    duration: "4–5 years",
    compensation:
      "Institute stipend as per MHRD norms (₹37,000/month for JRF, ₹42,000/month for SRF). Additional top-up of ₹5,000/month for PMRF awardees. Contingency grant of ₹20,000/year for travel and equipment.",
    shortDescription:
      "Join our DST-funded project on AI-assisted diabetic retinopathy screening. Work on clinically impactful deep learning for low-resource healthcare settings in rural India.",
    description:
      "The Vision Technology Lab at IIT Tirupati invites applications for a fully-funded PhD position in Computer Vision applied to Medical Imaging. The successful candidate will be part of a growing, collaborative research group working on real-world AI systems for healthcare. You will be embedded in an interdisciplinary team working closely with clinical partners at AIIMS Tirupati and district hospitals across Andhra Pradesh. Your research will directly impact the lives of diabetic patients in underserved communities.",
    requirements: [
      "BTech/BE or MTech/ME in Computer Science, Electrical Engineering, or related discipline",
      "Minimum CGPA of 7.5/10 or 75% aggregate marks",
      "Valid GATE score (CS/EC/EE) — for institute-funded positions",
      "Basic knowledge of Python and deep learning frameworks (PyTorch / TensorFlow)",
      "Strong mathematical background in linear algebra, calculus, and probability",
    ],
    preferredSkills: [
      "Prior experience with medical image analysis or clinical datasets",
      "Familiarity with attention mechanisms and transformer architectures",
      "Published work in any peer-reviewed venue (conference or journal)",
      "Experience with DICOM data formats or OpenCV",
    ],
    responsibilities: [
      "Develop and evaluate novel deep learning models for fundus image analysis",
      "Coordinate with clinical partners for data collection and annotation",
      "Publish research in top-tier venues (CVPR, MICCAI, IEEE TIP)",
      "Mentor junior lab members (MS scholars, project staff)",
      "Contribute to grant proposals and progress reports",
    ],
    perks: [
      "Access to lab's 8× A100 GPU cluster",
      "Travel funding for top conferences (CVPR, MICCAI, NeurIPS)",
      "Collaboration with INRIA Rennes, France (potential research visit)",
      "Industry internship opportunities with lab partners (BEL, TCS Research)",
      "Co-supervision by medical experts at AIIMS Tirupati",
    ],
    applyLink: "https://forms.gle/vtl-phd-medical-2024",
    contactEmail: "kalidas@iittp.ac.in",
    tags: ["PhD", "Medical Imaging", "Deep Learning", "Healthcare AI"],
    isFeatured: true,
  },
  {
    id: 2,
    title: "PhD Research Position — Autonomous Vehicle Perception",
    type: "PhD Position",
    status: "Open",
    postedDate: "May 2024",
    closingDate: "August 15, 2024",
    location: "IIT Tirupati, Andhra Pradesh",
    duration: "4–5 years",
    compensation:
      "MHRD stipend (JRF: ₹37,000/month → SRF: ₹42,000/month) plus a project-funded top-up of ₹8,000/month from the SERB grant for the first 3 years. Annual contingency of ₹25,000.",
    shortDescription:
      "Work on building robust vision systems for autonomous driving in challenging Indian road conditions as part of the SERB-funded IIT-AV project.",
    description:
      "We are looking for motivated PhD candidates to join the SERB-funded autonomous driving perception project. This position involves building the next generation of semantic scene understanding systems specifically designed for India's unique and complex driving environments — dense traffic, monsoon conditions, cattle on roads, and poorly-marked lanes. You will be part of a team collecting India's largest annotated driving dataset and developing state-of-the-art domain-adaptive models.",
    requirements: [
      "BTech/BE or MTech/ME in CS, EE, Robotics, or related field",
      "Valid GATE score in CS, EC, or EE",
      "Proficiency in Python and deep learning (PyTorch preferred)",
      "Understanding of semantic segmentation and object detection fundamentals",
      "CGPA ≥ 7.5/10",
    ],
    preferredSkills: [
      "Experience with autonomous driving datasets (Cityscapes, KITTI, nuScenes)",
      "ROS2 or robotic software stack experience",
      "Knowledge of domain adaptation or transfer learning",
      "Prior work with LiDAR or sensor fusion",
    ],
    responsibilities: [
      "Lead data collection drives in Tirupati and Hyderabad for the IIT-AV dataset",
      "Develop and benchmark domain-adaptive segmentation architectures",
      "Deploy models on edge GPU platforms (NVIDIA Jetson Orin)",
      "Publish in CVPR, ICCV, ECCV, IEEE TPAMI",
    ],
    perks: [
      "Access to a custom-built data collection vehicle with 8-camera rig + LiDAR",
      "8× A100 GPU cluster + 4× Jetson Orin deployment nodes",
      "Collaboration with Indo-French partner INRIA Rennes",
      "Potential for research visit to France (DST-CNRS exchange program)",
    ],
    applyLink: "https://forms.gle/vtl-phd-av-2024",
    contactEmail: "kalidas@iittp.ac.in",
    tags: ["PhD", "Autonomous Driving", "Semantic Segmentation", "Domain Adaptation"],
    isFeatured: true,
  },
  {
    id: 3,
    title: "MS (Research) Position — IoT-Integrated Computer Vision Systems",
    type: "MS Position",
    status: "Open",
    postedDate: "June 2024",
    closingDate: "September 1, 2024",
    location: "IIT Tirupati, Andhra Pradesh",
    duration: "2 years",
    compensation:
      "Institute assistantship of ₹12,400/month as per IIT Tirupati norms. Project top-up of ₹5,000/month available for selected candidates. Waiver of academic fees for TA/RA holders.",
    shortDescription:
      "An MS Research position at the intersection of Computer Vision and IoT — building vision-based assistive and safety systems deployable on resource-constrained edge nodes.",
    description:
      "The Vision Technology Lab is looking for an MS Scholar to join ongoing work on IoT-integrated vision systems. This covers a range of exciting applied research problems: fall detection for elderly care using lightweight YOLO-based models, gait analysis pipelines for clinical mobility assessment, and smart visual assistants for persons with visual impairments. You will work with custom IoT hardware, NVIDIA Jetson Nano/Orin platforms, and real-world deployment in clinical and smart-home environments.",
    requirements: [
      "BTech/BE in CS, EE, Electronics, or related field with CGPA ≥ 7.0",
      "Valid GATE score",
      "Strong programming skills in Python; C++ is a plus",
      "Familiarity with embedded systems or single-board computers (Raspberry Pi, Arduino)",
      "Basic knowledge of computer vision or image processing",
    ],
    preferredSkills: [
      "Experience with YOLO-family models or real-time object detection",
      "Background in IoT communication protocols (MQTT, HTTP/REST)",
      "Prior exposure to human pose estimation or action recognition",
      "Hardware prototyping and PCB design experience",
    ],
    responsibilities: [
      "Design and implement lightweight vision models for edge deployment",
      "Integrate vision outputs with IoT sensor data streams",
      "Develop mobile or web interfaces for system monitoring",
      "Validate systems with real users in partnership with NGOs",
    ],
    perks: [
      "Lab-provided IoT hardware and NVIDIA Jetson development kits",
      "Lab fee waiver for TA duties (6–8 hrs/week)",
      "Opportunity to co-author publications and file patents/IDFs",
    ],
    applyLink: "https://forms.gle/vtl-ms-iot-vision-2024",
    contactEmail: "kalidas@iittp.ac.in",
    tags: ["MS", "IoT", "Edge AI", "Assistive Technology", "YOLO"],
  },
  {
    id: 4,
    title: "Project Research Associate — Satellite Imagery Analysis (ISRO Project)",
    type: "Project Staff",
    status: "Open",
    postedDate: "May 2024",
    closingDate: "July 15, 2024",
    location: "IIT Tirupati, Andhra Pradesh (Remote-friendly for data work)",
    duration: "1 year (renewable based on performance and project funding)",
    compensation:
      "Consolidated monthly salary in the range of ₹30,000–₹45,000 depending on qualifications and experience. No HRA or DA for this contractual position. Performance bonus at end of project cycle based on deliverables.",
    shortDescription:
      "Work on ISRO-funded remote sensing research — training self-supervised models on multi-spectral satellite imagery for land use classification and disaster management.",
    description:
      "The Vision Technology Lab is hiring a Project Research Associate to support the ISRO-funded satellite imagery analysis project. The position involves preprocessing large-scale multi-spectral satellite datasets (Sentinel-2, ResourceSat-2), running self-supervised pretraining experiments, and evaluating models on downstream tasks including flood detection, land use/land cover classification, and crop type mapping. This is a great opportunity for a candidate looking to transition into AI research or strengthen their profile for PhD applications.",
    requirements: [
      "MTech/ME in CS, EE, Remote Sensing, or Geoinformatics, OR BTech with 2+ years of relevant experience",
      "Proficiency in Python, NumPy, PyTorch or TensorFlow",
      "Experience with geospatial data formats (GeoTIFF, Shapefile) and tools (QGIS, GDAL)",
      "Strong understanding of CNN or transformer architectures",
    ],
    preferredSkills: [
      "Background in remote sensing or satellite image processing",
      "Familiarity with self-supervised learning (SimCLR, MAE, DINO)",
      "Knowledge of Google Earth Engine (GEE)",
      "Prior publications or project work in remote sensing AI",
    ],
    responsibilities: [
      "Curate and preprocess multi-spectral satellite tile datasets",
      "Run and monitor training experiments on lab GPU cluster",
      "Evaluate model performance on benchmark datasets",
      "Assist in writing technical reports and research papers",
      "Maintain codebase documentation and experiment logs",
    ],
    applyLink: "https://forms.gle/vtl-pra-isro-2024",
    contactEmail: "kalidas@iittp.ac.in",
    tags: ["Project Staff", "Remote Sensing", "ISRO", "Satellite", "Self-Supervised"],
  },
  {
    id: 5,
    title: "Summer Research Intern — Computer Vision & Deep Learning",
    type: "Internship",
    status: "Closing Soon",
    postedDate: "April 2024",
    closingDate: "June 30, 2024",
    location: "IIT Tirupati, Andhra Pradesh (On-site mandatory)",
    duration: "8 weeks (July 1 – August 31, 2024)",
    compensation:
      "Stipend of ₹10,000/month for the 2-month duration. Accommodation in IIT Tirupati guest house at subsidized rate (₹100/day). Certificate of completion and letter of recommendation for outstanding interns.",
    shortDescription:
      "A competitive summer internship for undergraduate students to gain hands-on experience in computer vision research under direct faculty mentorship.",
    description:
      "The Vision Technology Lab offers a structured 8-week summer research internship for undergraduate students with a strong interest in Computer Vision and AI. Interns will be assigned to an ongoing research project, mentored by a PhD scholar, and expected to deliver a working prototype or analysis by the end of the program. Previous interns have co-authored workshop papers, won hackathons, and gone on to top MS/PhD programs.",
    requirements: [
      "Currently enrolled in 3rd or 4th year of BTech/BE in CS, EE, or related field",
      "CGPA ≥ 8.0 (or equivalent)",
      "Proficiency in Python and NumPy",
      "At least one course completed in Machine Learning or Computer Vision",
      "Available on-site for full 8 weeks (July–August)",
    ],
    preferredSkills: [
      "Familiarity with PyTorch",
      "Basic experience with OpenCV",
      "GitHub portfolio with any project work",
      "Prior research exposure (project courses, course projects, hackathons)",
    ],
    responsibilities: [
      "Contribute to an assigned VTL research project for 8 weeks",
      "Submit weekly progress reports to assigned mentor",
      "Present final work at VTL internal symposium",
      "Document code and experiments thoroughly",
    ],
    perks: [
      "Certificate and letter of recommendation from PI",
      "Potential co-authorship on workshop paper",
      "GPU access on lab cluster for project work",
      "Networking with PhD scholars and visiting researchers",
    ],
    applyLink: "https://forms.gle/vtl-intern-summer-2024",
    contactEmail: "vtl@iittp.ac.in",
    tags: ["Internship", "Undergraduate", "Computer Vision", "Summer"],
  },
  {
    id: 6,
    title: "Postdoctoral Research Fellow — Neural Implicit Representations",
    type: "Postdoc",
    status: "Open",
    postedDate: "April 2024",
    location: "IIT Tirupati, Andhra Pradesh",
    duration: "1–2 years (with possibility of extension)",
    compensation:
      "Competitive postdoctoral fellowship at ₹65,000–₹80,000/month (commensurate with qualifications and experience) plus HRA as per Institute norms. Annual travel grant of ₹1.5 Lakhs for international conferences. Relocation allowance for candidates joining from outside Tirupati.",
    shortDescription:
      "Senior research position for a recent PhD in the area of neural implicit representations (NeRF, 3D Gaussian Splatting) for industrial inspection and autonomous systems.",
    description:
      "The Vision Technology Lab invites applications for a Postdoctoral Research Fellow position from researchers who have recently defended or are close to completing their PhD in Computer Vision, Machine Learning, or related fields. The fellow will lead research on neural implicit 3D representations, working across the industrial inspection (BEL collaboration) and autonomous driving (SERB project) workstreams. This is an outstanding opportunity for researchers looking to build an independent publication record before taking up a faculty or senior industry research role.",
    requirements: [
      "PhD in Computer Science, Electrical Engineering, or closely related field (awarded within the last 3 years)",
      "Strong publication record in top-tier venues (CVPR, ICCV, ECCV, NeurIPS, SIGGRAPH)",
      "Demonstrated expertise in neural implicit representations (NeRF, SDF, Gaussian Splatting)",
      "Excellent communication skills for research collaboration and writing",
    ],
    preferredSkills: [
      "Experience with real-time rendering or edge 3D reconstruction",
      "Background in industrial inspection or autonomous systems",
      "Track record of open-source research contributions",
    ],
    responsibilities: [
      "Lead an independent research direction within VTL",
      "Co-mentor PhD and MS scholars",
      "Contribute to grant proposals and project deliverables",
      "Represent the lab at international conferences",
    ],
    applyLink: "https://forms.gle/vtl-postdoc-nerf-2024",
    contactEmail: "kalidas@iittp.ac.in",
    tags: ["Postdoc", "NeRF", "3D Vision", "Senior Researcher"],
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit:    { opacity: 0, y: -16, transition: { duration: 0.25 } },
};

// ─── Type Config ──────────────────────────────────────────────────────────────
const typeConfig: Record<CareerType, { badge: string; icon: React.ReactNode; color: string }> = {
  "PhD Position":  { badge: "badge-brand",                                                                      icon: <BookOpen className="w-3.5 h-3.5" />,  color: "border-l-brand-500" },
  "MS Position":   { badge: "badge-teal",                                                                       icon: <FileText className="w-3.5 h-3.5" />,  color: "border-l-teal-500"  },
  "Project Staff": { badge: "text-slate-300 bg-slate-500/15 border border-slate-500/25",                        icon: <Briefcase className="w-3.5 h-3.5" />, color: "border-l-slate-500" },
  "Internship":    { badge: "text-green-300 bg-green-500/15 border border-green-500/25",                        icon: <Zap className="w-3.5 h-3.5" />,       color: "border-l-green-500" },
  "Postdoc":       { badge: "text-purple-300 bg-purple-500/15 border border-purple-500/25",                     icon: <Star className="w-3.5 h-3.5" />,      color: "border-l-purple-500"},
};

const statusConfig: Record<CareerStatus, { badge: string; dot: string }> = {
  "Open":          { badge: "text-teal-300 bg-teal-500/15 border border-teal-500/30",   dot: "bg-teal-400 animate-pulse" },
  "Closing Soon":  { badge: "text-gold-300 bg-gold-500/15 border border-gold-500/30",   dot: "bg-gold-400 animate-pulse" },
  "Filled":        { badge: "text-slate-400 bg-slate-500/15 border border-slate-500/25",dot: "bg-slate-400"              },
};

// ─── Career Card Component ────────────────────────────────────────────────────
function CareerCard({ opening }: { opening: CareerOpening }) {
  const [expanded, setExpanded] = useState(false);
  const type   = typeConfig[opening.type];
  const status = statusConfig[opening.status];

  return (
    <motion.article
      variants={cardVariants}
      layout
      className={`glass-card group overflow-hidden border-l-2 ${type.color} ${
        opening.status === "Filled" ? "opacity-60" : ""
      }`}
      aria-label={opening.title}
    >
      <div className="p-6 md:p-7">
        {/* ── Card Header ─────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-5">
          <div className="flex-1 min-w-0 space-y-2.5">
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 badge ${type.badge}`}>
                {type.icon}
                {opening.type}
              </span>
              <span className={`inline-flex items-center gap-1.5 badge ${status.badge}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                {opening.status}
              </span>
              {opening.isFeatured && (
                <span className="inline-flex items-center gap-1 badge-gold text-[10px]">
                  <Sparkles className="w-2.5 h-2.5" />
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className="text-lg font-display font-semibold text-white group-hover:text-brand-200 transition-colors duration-200 leading-snug">
              {opening.title}
            </h2>
          </div>

          {/* Apply button — always visible */}
          {opening.status !== "Filled" && (
            <a
              href={opening.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              id={`apply-btn-${opening.id}`}
              className="btn-primary flex-shrink-0 text-sm py-2.5 px-5 self-start"
              aria-label={`Apply for ${opening.title}`}
            >
              Apply Now
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* ── Meta grid ───────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
          {[
            { icon: <MapPin className="w-3.5 h-3.5 text-brand-400" />,     label: "Location",   value: opening.location.split(",")[0] },
            { icon: <Clock className="w-3.5 h-3.5 text-teal-400" />,       label: "Duration",   value: opening.duration },
            { icon: <Users className="w-3.5 h-3.5 text-gold-400" />,       label: "Posted",     value: opening.postedDate },
          ].map((item) => (
            <div key={item.label} className="glass-xs rounded-xl px-3 py-2.5">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mb-1 uppercase tracking-wider">
                {item.icon}
                {item.label}
              </div>
              <div className="text-xs font-medium text-slate-200 truncate">{item.value}</div>
            </div>
          ))}
        </div>

        {/* ── Compensation block ───────────────────────────────────── */}
        <div className="glass-brand rounded-xl px-4 py-3.5 mb-5 flex items-start gap-3">
          <IndianRupee className="w-5 h-5 text-brand-300 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-brand-400 mb-1">
              Compensation Details
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {opening.compensation}
            </p>
          </div>
        </div>

        {/* ── Short description ────────────────────────────────────── */}
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          {opening.shortDescription}
        </p>

        {/* ── Expandable full details ─────────────────────────────── */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.38, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-4 pb-2 border-t border-white/08 space-y-6">
                {/* About the role */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-3">
                    About the Role
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {opening.description}
                  </p>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-3">
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {opening.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <span className="w-5 h-5 rounded-md glass-brand flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[9px] font-bold text-brand-300">{i + 1}</span>
                        </span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preferred Skills */}
                {opening.preferredSkills && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-3">
                      Preferred Skills (Not Mandatory)
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {opening.preferredSkills.map((skill, i) => (
                        <span key={i} className="badge-teal text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Responsibilities */}
                {opening.responsibilities && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-3">
                      Responsibilities
                    </h3>
                    <ul className="space-y-2">
                      {opening.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                          <ArrowRight className="w-3.5 h-3.5 text-brand-400 flex-shrink-0 mt-0.5" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Perks */}
                {opening.perks && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-3">
                      What We Offer
                    </h3>
                    <ul className="space-y-2">
                      {opening.perks.map((perk, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                          <Sparkles className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 mt-0.5" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Closing date + contact */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-t border-white/06">
                  {opening.closingDate && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gold-400" />
                      Application closes: <span className="text-gold-300 font-semibold ml-1">{opening.closingDate}</span>
                    </span>
                  )}
                  {opening.contactEmail && (
                    <span className="flex items-center gap-1.5">
                      Queries:{" "}
                      <a
                        href={`mailto:${opening.contactEmail}`}
                        className="text-brand-300 hover:text-brand-200 transition-colors ml-1 underline underline-offset-2"
                      >
                        {opening.contactEmail}
                      </a>
                    </span>
                  )}
                </div>

                {/* CTA at bottom of expanded */}
                {opening.status !== "Filled" && (
                  <a
                    href={opening.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full justify-center text-sm"
                  >
                    Apply Now via Google Form
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Tags + Expand toggle ─────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-2 border-t border-white/06">
          <div className="flex flex-wrap gap-1.5">
            {opening.tags.map((tag) => (
              <span key={tag} className="glass-xs text-[10px] text-slate-500 px-2 py-0.5 rounded-md">
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="flex items-center gap-1.5 text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors flex-shrink-0"
          >
            {expanded ? "Show Less" : "Full Details"}
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Hover accent bar */}
      <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-brand-500/60 to-teal-500/60 transition-all duration-500" />
    </motion.article>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CareersPage() {
  const [search,       setSearch]       = useState("");
  const [selectedType, setSelectedType] = useState<CareerType | "All">("All");

  const filtered = useMemo(
    () =>
      openings.filter((o) => {
        if (selectedType !== "All" && o.type !== selectedType) return false;
        if (search.trim()) {
          const q   = search.toLowerCase();
          const hay = [o.title, o.shortDescription, ...o.tags].join(" ").toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      }),
    [search, selectedType]
  );

  const openCount = openings.filter((o) => o.status !== "Filled").length;

  return (
    <div className="page-pt min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950/50 via-navy-900/30 to-emerald-950/20 pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-[500px] h-[300px] bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-teal-600/08 rounded-full blur-3xl pointer-events-none" />

        {/* Animated geometric shapes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none border border-brand-500/10 rounded-2xl"
            style={{ width: `${80 + i * 40}px`, height: `${80 + i * 40}px`, right: `${5 + i * 5}%`, top: `${10 + i * 8}%` }}
            animate={{ rotate: [0, 15, 0, -15, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 8 + i * 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
          />
        ))}

        <div className="relative section-container text-center space-y-5">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 badge-brand px-4 py-1.5 text-sm"
          >
            <Briefcase className="w-3.5 h-3.5" />
            {openCount} Open Position{openCount !== 1 ? "s" : ""}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold text-white"
          >
            Work With <span className="gradient-text">Us</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Join a team of passionate researchers building the future of machine vision.
            We offer PhD, MS, staff, internship, and postdoctoral positions across
            multiple exciting projects.
          </motion.p>

          {/* Type filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-2 pt-4"
          >
            {(["All", "PhD Position", "MS Position", "Project Staff", "Internship", "Postdoc"] as const).map(
              (t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  aria-pressed={selectedType === t}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    selectedType === t
                      ? "bg-brand-600/40 text-brand-200 border border-brand-500/50 shadow-brand-sm"
                      : "glass-xs text-slate-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {t}
                </button>
              )
            )}
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="max-w-md mx-auto relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search positions, keywords…"
              className="input-glass pl-11 py-3 text-sm w-full text-center"
              id="careers-search"
              aria-label="Search career openings"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Openings list ─────────────────────────────────────────────────────── */}
      <section className="section-container pb-24">
        <div className="mb-6 flex items-center justify-between">
          <motion.p
            key={filtered.length}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm text-slate-400"
          >
            {filtered.length === 0
              ? "No positions match your criteria"
              : `Showing ${filtered.length} position${filtered.length !== 1 ? "s" : ""}`}
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-5"
        >
          <AnimatePresence>
            {filtered.map((opening) => (
              <CareerCard key={opening.id} opening={opening} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <div className="w-16 h-16 rounded-2xl glass-brand flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-7 h-7 text-brand-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No positions found</h3>
            <p className="text-slate-400 text-sm mb-5">
              Try a different filter or search term.
            </p>
            <button onClick={() => { setSearch(""); setSelectedType("All"); }} className="btn-primary text-sm">
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* ── General inquiry CTA ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 glass-card border-2 border-brand-500/20 rounded-3xl p-8 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600/08 to-teal-600/06 pointer-events-none" />
          <div className="relative space-y-4">
            <div className="w-14 h-14 rounded-2xl glass-brand flex items-center justify-center mx-auto">
              <Zap className="w-6 h-6 text-brand-300" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white">
              Don't See a Matching Position?
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
              We occasionally fund exceptional candidates outside our standard openings. If you are
              passionate about computer vision research, send us your CV and a brief statement of purpose.
            </p>
            <a
              href="mailto:kalidas@iittp.ac.in?subject=Research Inquiry — Vision Technology Lab"
              className="btn-primary inline-flex text-sm"
            >
              Send a General Inquiry
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
