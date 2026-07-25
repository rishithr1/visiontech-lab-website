"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Check, Eye, EyeOff, Image as ImageIcon,
  Monitor, Move, PencilLine, Plus, Save, Smartphone,
  Star, Trash2, X,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Slide {
  id: number;
  imageUrl: string;
  heading: string;
  subheading: string;
  ctaText: string;
  ctaLink: string;
  order: number;
  active: boolean;
}

// ─── Placeholder data ─────────────────────────────────────────────────────────
const initialSlides: Slide[] = [
  {
    id: 1, order: 1, active: true,
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80",
    heading: "Advancing Vision Intelligence",
    subheading: "Pioneering computer vision, deep learning, and AI-driven perception systems at IIT Tirupati.",
    ctaText: "Explore Research",
    ctaLink: "/research/publications",
  },
  {
    id: 2, order: 2, active: true,
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80",
    heading: "NeurIPS 2024 — Spotlight Paper",
    subheading: "Spectral-Aware Masked Autoencoders for Satellite Imagery accepted at NeurIPS 2024.",
    ctaText: "Read More",
    ctaLink: "/news-events",
  },
  {
    id: 3, order: 3, active: false,
    imageUrl: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1400&q=80",
    heading: "Join the Lab — Open Positions",
    subheading: "PhD, MS, and Project Staff positions available across multiple exciting research projects.",
    ctaText: "View Careers",
    ctaLink: "/careers",
  },
];

const emptyForm = (): Omit<Slide, "id"> => ({
  imageUrl: "", heading: "", subheading: "",
  ctaText: "Learn More", ctaLink: "/", order: 1, active: true,
});

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CarouselPage() {
  const [slides,   setSlides]   = useState<Slide[]>(initialSlides);
  const [mode,     setMode]     = useState<"list" | "create" | "edit">("list");
  const [editing,  setEditing]  = useState<Slide | null>(null);
  const [form,     setForm]     = useState(emptyForm());
  const [preview,  setPreview]  = useState<"desktop" | "mobile">("desktop");
  const [showPrev, setShowPrev] = useState(true);

  const openCreate = () => {
    setForm(emptyForm());
    setEditing(null);
    setMode("create");
  };

  const openEdit = (slide: Slide) => {
    setForm({ imageUrl: slide.imageUrl, heading: slide.heading, subheading: slide.subheading,
      ctaText: slide.ctaText, ctaLink: slide.ctaLink, order: slide.order, active: slide.active });
    setEditing(slide);
    setMode("edit");
  };

  const handleSave = () => {
    if (!form.heading.trim()) { toast.error("Heading is required"); return; }
    if (mode === "create") {
      const newSlide: Slide = { ...form, id: Date.now() };
      setSlides((prev) => [...prev, newSlide].sort((a, b) => a.order - b.order));
      toast.success("Slide created successfully!");
    } else if (editing) {
      setSlides((prev) =>
        prev.map((s) => s.id === editing.id ? { ...editing, ...form } : s)
          .sort((a, b) => a.order - b.order)
      );
      toast.success("Slide updated!");
    }
    setMode("list");
  };

  const handleDelete = (id: number) => {
    setSlides((prev) => prev.filter((s) => s.id !== id));
    toast.success("Slide deleted.");
  };

  const toggleActive = (id: number) => {
    setSlides((prev) => prev.map((s) => s.id === id ? { ...s, active: !s.active } : s));
  };

  const field = (key: keyof typeof form, value: string | number | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-6 max-w-7xl">
      <Toaster position="top-right" toastOptions={{ style: { background: "#1e2a52", color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.1)" } }} />

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-display font-bold text-white">Carousel Manager</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage hero banner slides · {slides.filter(s => s.active).length} active</p>
        </div>
        {mode === "list" && (
          <motion.button initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
            onClick={openCreate} className="btn-primary text-sm gap-2">
            <Plus className="w-4 h-4" /> Add Slide
          </motion.button>
        )}
        {mode !== "list" && (
          <button onClick={() => setMode("list")} className="btn-ghost text-sm gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to List
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* ── LIST VIEW ─────────────────────────────────────────────────────── */}
        {mode === "list" && (
          <motion.div key="list" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
            <div className="glass-card overflow-hidden">
              <div className="divide-y divide-white/08">
                {slides.map((slide, idx) => (
                  <motion.div key={slide.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.06 }}
                    className="flex items-center gap-4 p-4 hover:bg-white/03 transition-colors group">
                    {/* Thumbnail */}
                    <div className="w-24 h-14 rounded-xl overflow-hidden flex-shrink-0 glass-xs relative">
                      {slide.imageUrl
                        ? <img src={slide.imageUrl} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        : <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-5 h-5 text-slate-600" /></div>
                      }
                      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/60 to-transparent" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold glass-xs px-2 py-0.5 rounded text-slate-400"># {slide.order}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${slide.active ? "bg-teal-500/20 text-teal-300" : "bg-white/08 text-slate-500"}`}>
                          {slide.active ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-white truncate">{slide.heading}</p>
                      <p className="text-xs text-slate-400 truncate">{slide.subheading}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <button onClick={() => toggleActive(slide.id)}
                        title={slide.active ? "Deactivate" : "Activate"}
                        className="w-8 h-8 rounded-lg glass-xs flex items-center justify-center text-slate-400 hover:text-teal-400 transition-colors">
                        {slide.active ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                      <button onClick={() => openEdit(slide)} className="w-8 h-8 rounded-lg glass-xs flex items-center justify-center text-slate-400 hover:text-brand-400 transition-colors">
                        <PencilLine className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete(slide.id)} className="w-8 h-8 rounded-lg glass-xs flex items-center justify-center text-slate-400 hover:text-red-400 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
                {slides.length === 0 && (
                  <div className="py-16 text-center text-slate-500 text-sm">No slides yet. Click "Add Slide" to create one.</div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── FORM VIEW (Create / Edit) ─────────────────────────────────────── */}
        {(mode === "create" || mode === "edit") && (
          <motion.div key="form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
            className="grid grid-cols-1 xl:grid-cols-2 gap-5">

            {/* ── Form Panel ──────────────────────────────────────────────── */}
            <div className="glass-card p-6 space-y-5">
              <h2 className="text-base font-bold text-white">{mode === "create" ? "New Slide" : "Edit Slide"}</h2>

              {/* Image URL */}
              <div className="space-y-1.5">
                <label className="label-admin">Cover Image URL</label>
                <input value={form.imageUrl} onChange={(e) => field("imageUrl", e.target.value)}
                  placeholder="https://images.unsplash.com/…" className="input-glass w-full text-sm py-2.5" />
                <p className="text-[10px] text-slate-600">Use Unsplash or your CDN. Recommended: 1400×800px (16:9).</p>
              </div>

              {/* Heading */}
              <div className="space-y-1.5">
                <label className="label-admin">Heading <span className="text-red-400">*</span></label>
                <input value={form.heading} onChange={(e) => field("heading", e.target.value)}
                  placeholder="Advancing Vision Intelligence" className="input-glass w-full text-sm py-2.5" />
              </div>

              {/* Subheading */}
              <div className="space-y-1.5">
                <label className="label-admin">Subheading</label>
                <textarea value={form.subheading} onChange={(e) => field("subheading", e.target.value)} rows={2}
                  placeholder="A compelling short description…" className="input-glass w-full text-sm py-2.5 resize-none" />
              </div>

              {/* CTA */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="label-admin">Button Text</label>
                  <input value={form.ctaText} onChange={(e) => field("ctaText", e.target.value)}
                    placeholder="Explore Research" className="input-glass w-full text-sm py-2.5" />
                </div>
                <div className="space-y-1.5">
                  <label className="label-admin">Button Link</label>
                  <input value={form.ctaLink} onChange={(e) => field("ctaLink", e.target.value)}
                    placeholder="/research/publications" className="input-glass w-full text-sm py-2.5" />
                </div>
              </div>

              {/* Order + Active */}
              <div className="grid grid-cols-2 gap-3 items-end">
                <div className="space-y-1.5">
                  <label className="label-admin">Display Order</label>
                  <input type="number" min={1} value={form.order} onChange={(e) => field("order", parseInt(e.target.value) || 1)}
                    className="input-glass w-full text-sm py-2.5" />
                </div>
                <div className="flex items-center gap-3 pb-1">
                  <button onClick={() => field("active", !form.active)}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-300 flex-shrink-0 ${form.active ? "bg-teal-500" : "bg-white/15"}`}>
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${form.active ? "left-6" : "left-1"}`} />
                  </button>
                  <span className="text-sm text-slate-300">{form.active ? "Active" : "Inactive"}</span>
                </div>
              </div>

              {/* Save */}
              <button onClick={handleSave} className="btn-primary w-full justify-center gap-2 text-sm py-3">
                <Save className="w-4 h-4" />
                {mode === "create" ? "Create Slide" : "Save Changes"}
              </button>
            </div>

            {/* ── Live Preview Panel ─────────────────────────────────────── */}
            <div className="glass-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-brand-400" /> Live Preview
                </h2>
                <div className="flex items-center gap-1 glass-xs rounded-lg p-1">
                  <button onClick={() => setPreview("desktop")}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${preview === "desktop" ? "bg-brand-600/40 text-brand-200" : "text-slate-400 hover:text-white"}`}>
                    <Monitor className="w-3 h-3" /> Desktop
                  </button>
                  <button onClick={() => setPreview("mobile")}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${preview === "mobile" ? "bg-brand-600/40 text-brand-200" : "text-slate-400 hover:text-white"}`}>
                    <Smartphone className="w-3 h-3" /> Mobile
                  </button>
                </div>
              </div>

              {/* Preview box */}
              <div className={`mx-auto transition-all duration-300 ${preview === "desktop" ? "w-full" : "w-[240px]"}`}>
                <div className="relative rounded-2xl overflow-hidden bg-navy-950 aspect-video border border-white/10 shadow-glass-lg">
                  {/* Bg image */}
                  {form.imageUrl && (
                    <img src={form.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover object-center opacity-35"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-900/60 to-transparent" />
                  {/* Grid overlay */}
                  <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

                  {/* Content */}
                  <div className="relative h-full flex items-center px-6 py-4">
                    <div className="space-y-2 max-w-[70%]">
                      {form.heading ? (
                        <h3 className="text-white font-display font-bold leading-tight" style={{ fontSize: preview === "desktop" ? "1.1rem" : "0.65rem" }}>
                          {form.heading}
                        </h3>
                      ) : (
                        <div className="h-5 w-3/4 bg-white/10 rounded animate-pulse" />
                      )}
                      {form.subheading ? (
                        <p className="text-slate-300 leading-snug" style={{ fontSize: preview === "desktop" ? "0.65rem" : "0.45rem" }}>
                          {form.subheading}
                        </p>
                      ) : (
                        <div className="space-y-1"><div className="h-2 w-full bg-white/08 rounded animate-pulse" /><div className="h-2 w-2/3 bg-white/08 rounded animate-pulse" /></div>
                      )}
                      {form.ctaText && (
                        <div className="inline-flex items-center gap-1 bg-brand-600 text-white rounded-lg px-3 py-1"
                          style={{ fontSize: preview === "desktop" ? "0.6rem" : "0.4rem" }}>
                          {form.ctaText}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Aspect ratio notice */}
                  <div className="absolute bottom-2 right-2 glass-xs px-2 py-0.5 rounded text-[8px] text-slate-500">
                    16:9 · {preview === "desktop" ? "1400×800" : "390×218"}
                  </div>
                </div>
              </div>

              {/* Image warnings */}
              {form.imageUrl && (
                <div className="glass-xs rounded-xl p-3 space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Image Checklist</p>
                  {[
                    { ok: form.imageUrl.startsWith("https://"), label: "Secure HTTPS URL" },
                    { ok: form.imageUrl.includes("unsplash") || form.imageUrl.includes("iittp"), label: "Trusted CDN domain" },
                    { ok: !form.imageUrl.includes(" "), label: "No spaces in URL" },
                  ].map((check) => (
                    <div key={check.label} className="flex items-center gap-2 text-[11px]">
                      <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 ${check.ok ? "bg-teal-500/20 text-teal-400" : "bg-red-500/20 text-red-400"}`}>
                        {check.ok ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
                      </div>
                      <span className={check.ok ? "text-slate-400" : "text-red-400"}>{check.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
