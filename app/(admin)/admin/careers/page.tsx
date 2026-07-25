"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Briefcase, Calendar, ChevronDown, ExternalLink,
  IndianRupee, Link2, PencilLine, Plus, Save, Search, Trash2, X,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// ─── Types ────────────────────────────────────────────────────────────────────
type PositionType = "PhD Position" | "MS Position" | "Project Staff" | "Postdoc" | "Intern" | "Research Engineer";
type PositionStatus = "Open" | "Closed" | "Coming Soon";

interface Career {
  id:          number;
  title:       string;
  type:        PositionType;
  description: string;
  requirements:string;
  payscale:    string;   // String — supports "₹31,000/month + HRA" or "As per norms"
  applyLink:   string;   // Google Form URL
  deadline:    string;
  status:      PositionStatus;
  project:     string;
}

// ─── Placeholder data ─────────────────────────────────────────────────────────
const initialCareers: Career[] = [
  {
    id: 1, type: "PhD Position", status: "Open",
    title: "PhD Scholar — Computer Vision & Deep Learning",
    description: "Seeking motivated PhD scholars to work on self-supervised learning for satellite and remote sensing imagery under the ISRO-funded project. Strong mathematical background in ML required.",
    requirements: "B.Tech / M.Tech in CS/ECE from reputed institute.\nGATE score (CS/EC) or UGC-NET qualification.\nStrong Python/PyTorch skills.\nBackground in computer vision a plus.",
    payscale: "₹31,000/month (1st–2nd year) → ₹35,000/month (3rd year onwards) + HRA as per institute norms",
    applyLink: "https://forms.gle/example-phd-apply",
    deadline: "2024-12-31",
    project: "ISRO SatMAE Project",
  },
  {
    id: 2, type: "Project Staff", status: "Open",
    title: "Research Engineer — Edge AI & Embedded Systems",
    description: "Joining the BEL industrial inspection project. Deploy and optimise deep learning models on NVIDIA Jetson and Intel OpenVINO hardware. Strong Python and C++ skills required.",
    requirements: "B.Tech/M.Tech in CS/ECE/EE.\n2+ years experience in embedded AI or computer vision.\nExperience with TensorRT, ONNX, or OpenVINO.\nAbility to work in a fast-paced R&D environment.",
    payscale: "₹50,000 – ₹70,000/month based on experience and qualifications",
    applyLink: "https://forms.gle/example-engineer-apply",
    deadline: "2024-11-30",
    project: "BEL Inspection Project",
  },
  {
    id: 3, type: "MS Position", status: "Open",
    title: "MS (Research) Scholar — Medical Image Analysis",
    description: "Work on AI-driven diabetic retinopathy detection and interpretable deep learning for fundus imagery under the DST-funded project.",
    requirements: "B.Tech/BE in CS/ECE/BME.\nGATE score or valid JEST/NET.\nInterest in medical imaging and clinical AI.",
    payscale: "₹12,400/month (institute fellowship) + potential DST top-up of ₹5,000/month",
    applyLink: "https://forms.gle/example-ms-apply",
    deadline: "2025-01-15",
    project: "DST Retinopathy Project",
  },
  {
    id: 4, type: "Intern", status: "Closed",
    title: "Summer Research Internship — 3D Vision",
    description: "8-week summer internship on NeRF and 3D Gaussian Splatting for industrial inspection. For undergraduate students in 3rd/4th year.",
    requirements: "3rd or 4th year UG student in CS/ECE.\nPython + basic deep learning knowledge.\nCommitment for full 8-week duration.",
    payscale: "₹15,000 lump-sum stipend for the 8-week internship duration",
    applyLink: "https://forms.gle/example-intern-apply",
    deadline: "2024-03-31",
    project: "BEL Inspection Project",
  },
];

const emptyForm = (): Omit<Career, "id"> => ({
  title: "", type: "PhD Position", description: "", requirements: "",
  payscale: "", applyLink: "", deadline: "", status: "Open", project: "",
});

const statusConfig: Record<PositionStatus, { label: string; classes: string }> = {
  "Open":        { label: "Open",        classes: "bg-teal-500/20 text-teal-300 border border-teal-500/30" },
  "Closed":      { label: "Closed",      classes: "bg-red-500/20 text-red-400 border border-red-500/30" },
  "Coming Soon": { label: "Coming Soon", classes: "bg-gold-500/20 text-gold-300 border border-gold-500/30" },
};

const typeColors: Record<PositionType, string> = {
  "PhD Position":    "bg-brand-500/20 text-brand-300",
  "MS Position":     "bg-purple-500/20 text-purple-300",
  "Project Staff":   "bg-teal-500/20 text-teal-300",
  "Postdoc":         "bg-cyan-500/20 text-cyan-300",
  "Intern":          "bg-slate-500/20 text-slate-400",
  "Research Engineer":"bg-emerald-500/20 text-emerald-300",
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>(initialCareers);
  const [mode,    setMode]    = useState<"list" | "create" | "edit">("list");
  const [editing, setEditing] = useState<Career | null>(null);
  const [form,    setForm]    = useState(emptyForm());
  const [search,  setSearch]  = useState("");
  const [statusFilter, setStatusFilter] = useState<PositionStatus | "All">("All");

  const filtered = useMemo(() =>
    careers.filter((c) => {
      if (statusFilter !== "All" && c.status !== statusFilter) return false;
      if (search.trim()) {
        const q   = search.toLowerCase();
        const hay = [c.title, c.description, c.type, c.project].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    }), [careers, search, statusFilter]);

  const field = (k: keyof typeof form, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const openCreate = () => { setForm(emptyForm()); setEditing(null); setMode("create"); };
  const openEdit   = (c: Career) => {
    setForm({ title: c.title, type: c.type, description: c.description, requirements: c.requirements,
      payscale: c.payscale, applyLink: c.applyLink, deadline: c.deadline, status: c.status, project: c.project });
    setEditing(c); setMode("edit");
  };

  const handleSave = () => {
    if (!form.title.trim())    { toast.error("Title is required"); return; }
    if (!form.payscale.trim()) { toast.error("Payscale is required"); return; }
    if (!form.applyLink.trim()){ toast.error("Apply Link (Google Form) is required"); return; }
    if (mode === "create") {
      setCareers((prev) => [{ ...form, id: Date.now() }, ...prev]);
      toast.success("Position created!");
    } else if (editing) {
      setCareers((prev) => prev.map((c) => c.id === editing.id ? { ...editing, ...form } : c));
      toast.success("Position updated!");
    }
    setMode("list");
  };

  const handleDelete = (id: number) => {
    setCareers((prev) => prev.filter((c) => c.id !== id));
    toast.success("Position removed.");
  };

  const positionTypes: PositionType[] = ["PhD Position", "MS Position", "Project Staff", "Postdoc", "Intern", "Research Engineer"];

  return (
    <div className="space-y-6 max-w-7xl">
      <Toaster position="top-right" toastOptions={{ style: { background: "#1e2a52", color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.1)" } }} />

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-display font-bold text-white">Careers & Positions</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {careers.filter(c => c.status === "Open").length} open · {careers.filter(c => c.status === "Closed").length} closed
          </p>
        </div>
        {mode === "list"
          ? <motion.button initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} onClick={openCreate} className="btn-primary text-sm gap-2">
              <Plus className="w-4 h-4" /> New Position
            </motion.button>
          : <button onClick={() => setMode("list")} className="btn-ghost text-sm gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to List
            </button>
        }
      </div>

      <AnimatePresence mode="wait">
        {/* ── LIST VIEW ──────────────────────────────────────────────────── */}
        {mode === "list" && (
          <motion.div key="list" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
            className="space-y-4">

            {/* Filters */}
            <div className="glass-card p-3 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search positions…"
                  className="input-glass pl-9 py-2 text-sm w-full" />
              </div>
              <div className="flex gap-1.5">
                {(["All", "Open", "Closed", "Coming Soon"] as const).map((s) => (
                  <button key={s} onClick={() => setStatusFilter(s as typeof statusFilter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${statusFilter === s ? "bg-brand-600/40 text-brand-200 border border-brand-500/40" : "glass-xs text-slate-400 hover:text-white"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="glass-card overflow-hidden">
              <div className="divide-y divide-white/06">
                {filtered.map((career, idx) => (
                  <motion.div key={career.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.06 }}
                    className="flex items-start gap-4 p-5 hover:bg-white/02 transition-colors group">
                    {/* Icon */}
                    <div className="w-9 h-9 rounded-xl glass-brand flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Briefcase className="w-4 h-4 text-brand-400" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColors[career.type]}`}>{career.type}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusConfig[career.status].classes}`}>{career.status}</span>
                        {career.project && <span className="text-[10px] text-slate-600">{career.project}</span>}
                      </div>

                      <p className="text-sm font-semibold text-white leading-snug">{career.title}</p>
                      <p className="text-xs text-slate-400 line-clamp-2">{career.description}</p>

                      <div className="flex flex-wrap items-center gap-4 text-[11px]">
                        <span className="flex items-center gap-1 text-teal-400">
                          <IndianRupee className="w-3 h-3" />
                          <span className="truncate max-w-[220px]">{career.payscale}</span>
                        </span>
                        {career.deadline && (
                          <span className="flex items-center gap-1 text-slate-500">
                            <Calendar className="w-3 h-3" /> Deadline: {new Date(career.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                        )}
                        {career.applyLink && (
                          <a href={career.applyLink} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1 text-brand-400 hover:text-brand-300 transition-colors">
                            <ExternalLink className="w-3 h-3" /> Apply Form
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <button onClick={() => openEdit(career)} className="w-8 h-8 rounded-lg glass-xs flex items-center justify-center text-slate-400 hover:text-brand-400 transition-colors">
                        <PencilLine className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete(career.id)} className="w-8 h-8 rounded-lg glass-xs flex items-center justify-center text-slate-400 hover:text-red-400 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
                {filtered.length === 0 && (
                  <div className="py-16 text-center text-slate-500 text-sm">No positions match your filters.</div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── FORM VIEW ──────────────────────────────────────────────────── */}
        {(mode === "create" || mode === "edit") && (
          <motion.div key="form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-5xl">

              {/* ── Left ────────────────────────────────────────────────── */}
              <div className="glass-card p-6 space-y-4">
                <h2 className="text-base font-bold text-white">{mode === "create" ? "New Position" : "Edit Position"}</h2>

                {/* Title */}
                <div className="space-y-1.5">
                  <label className="label-admin">Position Title <span className="text-red-400">*</span></label>
                  <input value={form.title} onChange={(e) => field("title", e.target.value)}
                    placeholder="PhD Scholar — Computer Vision" className="input-glass w-full text-sm py-2.5" />
                </div>

                {/* Type + Status */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="label-admin">Type</label>
                    <div className="relative">
                      <select value={form.type} onChange={(e) => field("type", e.target.value)}
                        className="input-glass w-full text-sm py-2.5 pr-8 appearance-none cursor-pointer">
                        {positionTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="label-admin">Status</label>
                    <div className="relative">
                      <select value={form.status} onChange={(e) => field("status", e.target.value)}
                        className="input-glass w-full text-sm py-2.5 pr-8 appearance-none cursor-pointer">
                        {(["Open", "Closed", "Coming Soon"] as const).map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Project */}
                <div className="space-y-1.5">
                  <label className="label-admin">Associated Project</label>
                  <input value={form.project} onChange={(e) => field("project", e.target.value)}
                    placeholder="ISRO SatMAE Project / BEL Inspection / DST…" className="input-glass w-full text-sm py-2.5" />
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="label-admin">Position Description</label>
                  <textarea value={form.description} onChange={(e) => field("description", e.target.value)} rows={4}
                    placeholder="Overview of the role, research area, and expected outcomes…"
                    className="input-glass w-full text-sm py-2.5 resize-none" />
                </div>

                {/* Requirements */}
                <div className="space-y-1.5">
                  <label className="label-admin">Requirements</label>
                  <textarea value={form.requirements} onChange={(e) => field("requirements", e.target.value)} rows={4}
                    placeholder={"B.Tech / M.Tech from reputed institute\nGATE / UGC-NET qualification\nStrong Python/PyTorch skills"}
                    className="input-glass w-full text-sm py-2.5 resize-none" />
                  <p className="text-[10px] text-slate-600">Each line = one bullet point on the public page</p>
                </div>
              </div>

              {/* ── Right ────────────────────────────────────────────────── */}
              <div className="space-y-4">
                <div className="glass-card p-6 space-y-4">
                  <h3 className="text-sm font-bold text-slate-300">Compensation & Application</h3>

                  {/* Payscale — string field */}
                  <div className="space-y-1.5">
                    <label className="label-admin flex items-center gap-2">
                      <IndianRupee className="w-3.5 h-3.5 text-teal-400" />
                      Payscale <span className="text-red-400">*</span>
                    </label>
                    <input value={form.payscale} onChange={(e) => field("payscale", e.target.value)}
                      placeholder='e.g. "₹31,000/month + HRA" or "As per DST norms"'
                      className="input-glass w-full text-sm py-2.5" />
                    <p className="text-[10px] text-slate-600">
                      Free-text — supports flexible strings like "₹31,000–35,000/month", "PMRF fellowship (₹70,000/month)", "As per institute norms".
                    </p>
                  </div>

                  {/* Deadline */}
                  <div className="space-y-1.5">
                    <label className="label-admin flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-brand-400" /> Application Deadline
                    </label>
                    <input type="date" value={form.deadline} onChange={(e) => field("deadline", e.target.value)}
                      className="input-glass w-full text-sm py-2.5" />
                  </div>

                  {/* Apply Link */}
                  <div className="space-y-1.5">
                    <label className="label-admin flex items-center gap-2">
                      <Link2 className="w-3.5 h-3.5 text-brand-400" />
                      Apply Link (Google Form) <span className="text-red-400">*</span>
                    </label>
                    <input value={form.applyLink} onChange={(e) => field("applyLink", e.target.value)}
                      placeholder="https://forms.gle/your-google-form-link"
                      className="input-glass w-full text-sm py-2.5 font-mono" />
                    <p className="text-[10px] text-slate-600">The "Apply Now" button on the careers page will redirect directly to this URL.</p>
                  </div>

                  {/* Preview apply button */}
                  {form.applyLink && (
                    <a href={form.applyLink} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs text-brand-400 hover:text-brand-300 transition-colors">
                      <ExternalLink className="w-3 h-3" /> Preview Apply Link
                    </a>
                  )}
                </div>

                <div className="flex gap-3">
                  <button onClick={handleSave} className="btn-primary text-sm gap-2 flex-1 justify-center py-3">
                    <Save className="w-4 h-4" />
                    {mode === "create" ? "Create Position" : "Save Changes"}
                  </button>
                  <button onClick={() => setMode("list")} className="btn-ghost text-sm px-5">Cancel</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
