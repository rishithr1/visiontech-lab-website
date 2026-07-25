"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, BookOpen, Calendar, ChevronDown, ExternalLink,
  Filter, PencilLine, Plus, Save, Search, Trash2, X,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// ─── Types ────────────────────────────────────────────────────────────────────
type PubType = "Journal" | "Conference" | "Workshop" | "Book Chapter" | "arXiv";

interface Publication {
  id:           number;
  title:        string;
  authors:      string;
  venue:        string;
  year:         number;
  type:         PubType;
  apa:          string;  // Full APA-formatted citation
  doi:          string;
  datePublished:string;  // ISO date for ordering
  tags:         string[];
}

// ─── Placeholder data ─────────────────────────────────────────────────────────
const initialPubs: Publication[] = [
  {
    id: 1, year: 2024, type: "Conference",
    title: "Spectral-Aware Masked Autoencoder for Satellite Imagery Representation Learning",
    authors: "Lakshmi Krishnan, Dr. Kalidas S.",
    venue: "NeurIPS 2024",
    apa: "Krishnan, L., & Kalidas, S. (2024). Spectral-Aware Masked Autoencoder for Satellite Imagery Representation Learning. In Advances in Neural Information Processing Systems (NeurIPS 2024).",
    doi: "10.48550/arXiv.2410.00001",
    datePublished: "2024-10-01",
    tags: ["Self-Supervised", "Satellite", "Transformers"],
  },
  {
    id: 2, year: 2024, type: "Conference",
    title: "Self-Supervised Monocular Depth Estimation via Masked Autoencoders",
    authors: "Arjun Mehta, Dr. Kalidas S.",
    venue: "CVPR 2024 (Oral)",
    apa: "Mehta, A., & Kalidas, S. (2024). Self-Supervised Monocular Depth Estimation via Masked Autoencoders and Geometry-Aware Pretraining. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (pp. 1234–1245).",
    doi: "10.1109/CVPR.2024.00001",
    datePublished: "2024-06-01",
    tags: ["Depth Estimation", "Self-Supervised", "Oral"],
  },
  {
    id: 3, year: 2023, type: "Conference",
    title: "Efficient Video Object Segmentation via Hierarchical Temporal Memory",
    authors: "Thilak Nair, Dr. Kalidas S.",
    venue: "ICCV 2023 (Best Student Paper)",
    apa: "Nair, T., & Kalidas, S. (2023). Efficient Video Object Segmentation via Hierarchical Temporal Memory. In Proceedings of the IEEE/CVF International Conference on Computer Vision (pp. 5678–5689).",
    doi: "10.1109/ICCV.2023.00001",
    datePublished: "2023-10-01",
    tags: ["Video Segmentation", "Memory Networks", "Efficient"],
  },
];

const emptyForm = (): Omit<Publication, "id"> => ({
  title: "", authors: "", venue: "", year: new Date().getFullYear(),
  type: "Conference", apa: "", doi: "", datePublished: "", tags: [],
});

const pubTypeColors: Record<PubType, string> = {
  Journal:       "bg-brand-500/20 text-brand-300 border border-brand-500/30",
  Conference:    "bg-teal-500/20 text-teal-300 border border-teal-500/30",
  Workshop:      "bg-purple-500/20 text-purple-300 border border-purple-500/30",
  "Book Chapter":"bg-gold-500/20 text-gold-300 border border-gold-500/30",
  arXiv:         "bg-slate-500/20 text-slate-300 border border-slate-500/30",
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PublicationsPage() {
  const [pubs,    setPubs]    = useState<Publication[]>(initialPubs);
  const [mode,    setMode]    = useState<"list" | "create" | "edit">("list");
  const [editing, setEditing] = useState<Publication | null>(null);
  const [form,    setForm]    = useState(emptyForm());
  const [search,  setSearch]  = useState("");
  const [tagInput,setTagInput]= useState("");
  const [filter,  setFilter]  = useState<PubType | "All">("All");

  const filtered = useMemo(() => {
    return pubs
      .filter((p) => {
        if (filter !== "All" && p.type !== filter) return false;
        if (search.trim()) {
          const q   = search.toLowerCase();
          const hay = [p.title, p.authors, p.venue, p.apa].join(" ").toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime());
  }, [pubs, search, filter]);

  const field = (k: keyof typeof form, v: string | number | string[]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) {
      field("tags", [...form.tags, t]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => field("tags", form.tags.filter((t) => t !== tag));

  const openCreate = () => { setForm(emptyForm()); setEditing(null); setMode("create"); };
  const openEdit   = (p: Publication) => {
    setForm({ title: p.title, authors: p.authors, venue: p.venue, year: p.year,
      type: p.type, apa: p.apa, doi: p.doi, datePublished: p.datePublished, tags: p.tags });
    setEditing(p); setMode("edit");
  };

  const handleSave = () => {
    if (!form.title.trim()) { toast.error("Title is required"); return; }
    if (!form.apa.trim())   { toast.error("APA citation is required"); return; }
    if (mode === "create") {
      setPubs((prev) => [{ ...form, id: Date.now() }, ...prev]);
      toast.success("Publication added!");
    } else if (editing) {
      setPubs((prev) => prev.map((p) => p.id === editing.id ? { ...editing, ...form } : p));
      toast.success("Publication updated!");
    }
    setMode("list");
  };

  const handleDelete = (id: number) => {
    setPubs((prev) => prev.filter((p) => p.id !== id));
    toast.success("Publication removed.");
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <Toaster position="top-right" toastOptions={{ style: { background: "#1e2a52", color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.1)" } }} />

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-display font-bold text-white">Publications</h1>
          <p className="text-sm text-slate-400 mt-0.5">{pubs.length} total · {pubs.filter(p => p.year === new Date().getFullYear()).length} this year</p>
        </div>
        {mode === "list"
          ? <motion.button initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} onClick={openCreate} className="btn-primary text-sm gap-2">
              <Plus className="w-4 h-4" /> Add Publication
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
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search title, authors, venue…"
                  className="input-glass pl-9 py-2 text-sm w-full" id="pub-search" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(["All", "Journal", "Conference", "Workshop", "Book Chapter", "arXiv"] as const).map((t) => (
                  <button key={t} onClick={() => setFilter(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${filter === t ? "bg-brand-600/40 text-brand-200 border border-brand-500/40" : "glass-xs text-slate-400 hover:text-white"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="glass-card overflow-hidden">
              <div className="divide-y divide-white/06">
                {filtered.map((pub, idx) => (
                  <motion.div key={pub.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}
                    className="flex items-start gap-4 p-5 hover:bg-white/02 transition-colors group">
                    {/* Icon */}
                    <div className="w-9 h-9 rounded-xl glass-brand flex items-center justify-center flex-shrink-0 mt-0.5">
                      <BookOpen className="w-4 h-4 text-brand-400" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${pubTypeColors[pub.type]}`}>{pub.type}</span>
                        <span className="text-[10px] text-slate-500">{pub.year}</span>
                      </div>
                      <p className="text-sm font-semibold text-white leading-snug">{pub.title}</p>
                      <p className="text-xs text-slate-400">{pub.authors}</p>
                      <p className="text-xs text-slate-500 italic">{pub.venue}</p>
                      {pub.doi && (
                        <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] text-brand-400 hover:text-brand-300 transition-colors">
                          <ExternalLink className="w-2.5 h-2.5" /> {pub.doi}
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <button onClick={() => openEdit(pub)} className="w-8 h-8 rounded-lg glass-xs flex items-center justify-center text-slate-400 hover:text-brand-400 transition-colors">
                        <PencilLine className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete(pub.id)} className="w-8 h-8 rounded-lg glass-xs flex items-center justify-center text-slate-400 hover:text-red-400 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
                {filtered.length === 0 && (
                  <div className="py-16 text-center text-slate-500 text-sm">No publications match your filters.</div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── FORM VIEW ───────────────────────────────────────────────────── */}
        {(mode === "create" || mode === "edit") && (
          <motion.div key="form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
            <div className="glass-card p-6 space-y-5 max-w-3xl">
              <h2 className="text-base font-bold text-white">{mode === "create" ? "Add New Publication" : "Edit Publication"}</h2>

              {/* Title */}
              <div className="space-y-1.5">
                <label className="label-admin">Paper Title <span className="text-red-400">*</span></label>
                <input value={form.title} onChange={(e) => field("title", e.target.value)}
                  placeholder="Full paper title as published" className="input-glass w-full text-sm py-2.5" />
              </div>

              {/* Authors */}
              <div className="space-y-1.5">
                <label className="label-admin">Authors</label>
                <input value={form.authors} onChange={(e) => field("authors", e.target.value)}
                  placeholder="Last, F., Last, F., & Last, F." className="input-glass w-full text-sm py-2.5" />
                <p className="text-[10px] text-slate-600">Comma-separated. Use "Last, First Initial." format.</p>
              </div>

              {/* Venue + Year + Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1 space-y-1.5">
                  <label className="label-admin">Type</label>
                  <div className="relative">
                    <select value={form.type} onChange={(e) => field("type", e.target.value as PubType)}
                      className="input-glass w-full text-sm py-2.5 pr-8 appearance-none cursor-pointer">
                      {["Journal", "Conference", "Workshop", "Book Chapter", "arXiv"].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="label-admin">Venue / Journal</label>
                  <input value={form.venue} onChange={(e) => field("venue", e.target.value)}
                    placeholder="NeurIPS 2024" className="input-glass w-full text-sm py-2.5" />
                </div>
                <div className="space-y-1.5">
                  <label className="label-admin">Year</label>
                  <input type="number" value={form.year} onChange={(e) => field("year", parseInt(e.target.value) || 2024)}
                    min={1990} max={2035} className="input-glass w-full text-sm py-2.5" />
                </div>
              </div>

              {/* Date of Publication */}
              <div className="space-y-1.5">
                <label className="label-admin flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-brand-400" />
                  Date of Publication <span className="text-slate-600 font-normal">(used for chronological ordering)</span>
                </label>
                <input type="date" value={form.datePublished} onChange={(e) => field("datePublished", e.target.value)}
                  className="input-glass w-full text-sm py-2.5" />
              </div>

              {/* DOI */}
              <div className="space-y-1.5">
                <label className="label-admin">DOI / arXiv ID</label>
                <input value={form.doi} onChange={(e) => field("doi", e.target.value)}
                  placeholder="10.1109/CVPR.2024.00001" className="input-glass w-full text-sm py-2.5 font-mono" />
              </div>

              {/* APA Citation ── most important field */}
              <div className="space-y-1.5">
                <label className="label-admin">
                  APA Citation <span className="text-red-400">*</span>
                  <span className="ml-2 text-[10px] font-normal text-slate-500">Full formatted citation string</span>
                </label>
                <textarea value={form.apa} onChange={(e) => field("apa", e.target.value)} rows={4}
                  placeholder="Author, A. A., & Author, B. B. (2024). Title of work: Capital letter also for subtitle. Journal Name, volume(issue), page–page. https://doi.org/xxxxx"
                  className="input-glass w-full text-sm py-2.5 resize-none font-mono leading-relaxed" />
                <p className="text-[10px] text-slate-600">This exact string will be displayed on the public Publications page.</p>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <label className="label-admin">Research Tags</label>
                <div className="flex gap-2">
                  <input value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    placeholder="e.g., Self-Supervised, SLAM…" className="input-glass flex-1 text-sm py-2.5" />
                  <button onClick={addTag} className="btn-ghost text-sm px-4 flex-shrink-0">Add</button>
                </div>
                {form.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {form.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 badge-brand text-xs">
                        {tag}
                        <button onClick={() => removeTag(tag)}><X className="w-2.5 h-2.5" /></button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} className="btn-primary text-sm gap-2 flex-1 justify-center py-3">
                  <Save className="w-4 h-4" />
                  {mode === "create" ? "Add Publication" : "Save Changes"}
                </button>
                <button onClick={() => setMode("list")} className="btn-ghost text-sm px-5">Cancel</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
