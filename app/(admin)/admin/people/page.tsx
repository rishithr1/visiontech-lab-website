"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ChevronDown, GraduationCap, Mail, PencilLine,
  Plus, Save, Search, Trash2, User, Users, X,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// ─── Types ────────────────────────────────────────────────────────────────────
type MemberRole = "PI" | "PhD Scholar" | "MS Scholar" | "Project Staff" | "Postdoctoral Fellow" | "Research Engineer" | "Alumni";

interface Member {
  id:         number;
  name:       string;
  role:       MemberRole;
  designation:string;
  email:      string;
  researchInterests: string[];
  linkedin:   string;
  scholar:    string;
  website:    string;
  bio:        string;
  photoUrl:   string;
  slug:       string;
  isActive:   boolean;
}

// ─── Placeholder data ─────────────────────────────────────────────────────────
const initialMembers: Member[] = [
  { id: 1, role: "PI", name: "Dr. Kalidas S.", designation: "Assistant Professor",
    email: "kalidas@iittp.ac.in", slug: "dr-kalidas-s",
    researchInterests: ["Computer Vision", "Deep Learning", "3D Reconstruction", "Medical Imaging"],
    linkedin: "https://linkedin.com/in/kalidas-s", scholar: "https://scholar.google.com/citations?user=kalidas",
    website: "https://kalidas.iittp.ac.in", bio: "Dr. Kalidas leads the Vision Technology Lab at IIT Tirupati.", photoUrl: "", isActive: true },
  { id: 2, role: "PhD Scholar", name: "Rishith Reddy V S", designation: "PhD Scholar (PMRF)",
    email: "cs21d1001@iittp.ac.in", slug: "rishith-reddy-v-s",
    researchInterests: ["Fall Detection", "IoT Vision Systems", "Assistive Technology", "YOLOv11"],
    linkedin: "", scholar: "", website: "", bio: "PMRF awardee working on vision-based assistive systems.", photoUrl: "", isActive: true },
  { id: 3, role: "MS Scholar", name: "Arjun Mehta", designation: "MS (Research) Scholar",
    email: "cs22m1001@iittp.ac.in", slug: "arjun-mehta",
    researchInterests: ["Depth Estimation", "Self-Supervised Learning", "Autonomous Driving"],
    linkedin: "", scholar: "", website: "", bio: "CVPR 2024 Best Paper nominee working on monocular depth estimation.", photoUrl: "", isActive: true },
  { id: 4, role: "MS Scholar", name: "Lakshmi Krishnan", designation: "MS (Research) Scholar",
    email: "cs22m1002@iittp.ac.in", slug: "lakshmi-krishnan",
    researchInterests: ["Remote Sensing", "Self-Supervised Learning", "Satellite Imagery"],
    linkedin: "", scholar: "", website: "", bio: "NeurIPS 2024 spotlight paper on spectral-aware MAE for satellite imagery.", photoUrl: "", isActive: true },
];

const emptyForm = (): Omit<Member, "id"> => ({
  name: "", role: "PhD Scholar", designation: "", email: "", slug: "",
  researchInterests: [], linkedin: "", scholar: "", website: "",
  bio: "", photoUrl: "", isActive: true,
});

const roleColors: Record<MemberRole, string> = {
  "PI":                  "bg-brand-500/25 text-brand-200 border-brand-500/40",
  "PhD Scholar":         "bg-teal-500/20 text-teal-300 border-teal-500/30",
  "MS Scholar":          "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Project Staff":       "bg-gold-500/20 text-gold-300 border-gold-500/30",
  "Postdoctoral Fellow": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  "Research Engineer":   "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "Alumni":              "bg-slate-500/20 text-slate-400 border-slate-500/30",
};

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PeoplePage() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [mode,    setMode]    = useState<"list" | "create" | "edit">("list");
  const [editing, setEditing] = useState<Member | null>(null);
  const [form,    setForm]    = useState(emptyForm());
  const [search,  setSearch]  = useState("");
  const [roleFilter, setRoleFilter] = useState<MemberRole | "All">("All");
  const [interestInput, setInterestInput] = useState("");

  const filtered = useMemo(() =>
    members.filter((m) => {
      if (roleFilter !== "All" && m.role !== roleFilter) return false;
      if (search.trim()) {
        const q   = search.toLowerCase();
        const hay = [m.name, m.email, m.designation, ...m.researchInterests].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    }), [members, search, roleFilter]);

  const field = (k: keyof typeof form, v: string | boolean | string[]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const addInterest = () => {
    const t = interestInput.trim();
    if (t && !form.researchInterests.includes(t)) {
      field("researchInterests", [...form.researchInterests, t]);
      setInterestInput("");
    }
  };

  const openCreate = () => { setForm(emptyForm()); setEditing(null); setMode("create"); };
  const openEdit   = (m: Member) => {
    setForm({ name: m.name, role: m.role, designation: m.designation, email: m.email,
      slug: m.slug, researchInterests: m.researchInterests, linkedin: m.linkedin,
      scholar: m.scholar, website: m.website, bio: m.bio, photoUrl: m.photoUrl, isActive: m.isActive });
    setEditing(m); setMode("edit");
  };

  const handleSave = () => {
    if (!form.name.trim())  { toast.error("Name is required"); return; }
    if (!form.email.trim()) { toast.error("Email is required"); return; }
    const slug = form.slug || toSlug(form.name);
    if (mode === "create") {
      setMembers((prev) => [...prev, { ...form, slug, id: Date.now() }]);
      toast.success("Member added!");
    } else if (editing) {
      setMembers((prev) => prev.map((m) => m.id === editing.id ? { ...editing, ...form, slug } : m));
      toast.success("Member updated!");
    }
    setMode("list");
  };

  const handleDelete = (id: number) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    toast.success("Member removed.");
  };

  const roles: MemberRole[] = ["PI", "PhD Scholar", "MS Scholar", "Project Staff", "Postdoctoral Fellow", "Research Engineer", "Alumni"];

  return (
    <div className="space-y-6 max-w-7xl">
      <Toaster position="top-right" toastOptions={{ style: { background: "#1e2a52", color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.1)" } }} />

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-display font-bold text-white">People & Team</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {members.filter(m => m.isActive).length} active members · {members.filter(m => !m.isActive).length} alumni
          </p>
        </div>
        {mode === "list"
          ? <motion.button initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} onClick={openCreate} className="btn-primary text-sm gap-2">
              <Plus className="w-4 h-4" /> Add Member
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
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, email, interest…"
                  className="input-glass pl-9 py-2 text-sm w-full" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(["All", ...roles] as const).map((r) => (
                  <button key={r} onClick={() => setRoleFilter(r as typeof roleFilter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${roleFilter === r ? "bg-brand-600/40 text-brand-200 border border-brand-500/40" : "glass-xs text-slate-400 hover:text-white"}`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((member, idx) => {
                const initials = member.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
                const gradient = ["from-brand-500 to-teal-600", "from-purple-500 to-brand-600", "from-teal-500 to-emerald-600",
                  "from-gold-500 to-orange-600", "from-cyan-500 to-brand-600"][idx % 5];
                return (
                  <motion.div key={member.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }}
                    className="glass-card p-5 group hover:border-brand-500/20 transition-all duration-300">
                    <div className="flex items-start gap-3 mb-3">
                      {/* Avatar */}
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 text-white font-bold text-sm`}>
                        {member.photoUrl
                          ? <img src={member.photoUrl} alt="" className="w-full h-full rounded-2xl object-cover" />
                          : initials
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${roleColors[member.role]}`}>{member.role}</span>
                        <h3 className="text-sm font-semibold text-white mt-1 leading-snug truncate">{member.name}</h3>
                        <p className="text-[11px] text-slate-400 truncate">{member.designation}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-3">
                      <Mail className="w-3 h-3 text-brand-400 flex-shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </div>

                    {member.researchInterests.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {member.researchInterests.slice(0, 3).map((r) => (
                          <span key={r} className="glass-xs text-[9px] text-slate-400 px-2 py-0.5 rounded-md">{r}</span>
                        ))}
                        {member.researchInterests.length > 3 && (
                          <span className="glass-xs text-[9px] text-slate-500 px-2 py-0.5 rounded-md">+{member.researchInterests.length - 3}</span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity pt-2 border-t border-white/06">
                      <button onClick={() => openEdit(member)} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg glass-xs text-xs text-slate-300 hover:text-brand-300 transition-colors">
                        <PencilLine className="w-3 h-3" /> Edit
                      </button>
                      <button onClick={() => handleDelete(member.id)} className="flex items-center justify-center w-8 h-7 rounded-lg glass-xs text-slate-400 hover:text-red-400 transition-colors">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
              {filtered.length === 0 && (
                <div className="col-span-3 py-16 text-center glass-card text-slate-500 text-sm">No members match your search.</div>
              )}
            </div>
          </motion.div>
        )}

        {/* ── FORM VIEW ──────────────────────────────────────────────────── */}
        {(mode === "create" || mode === "edit") && (
          <motion.div key="form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-5xl">

              {/* ── Left column ─────────────────────────────────────────── */}
              <div className="glass-card p-6 space-y-4">
                <h2 className="text-base font-bold text-white">{mode === "create" ? "Add New Member" : "Edit Member"}</h2>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="label-admin">Full Name <span className="text-red-400">*</span></label>
                  <input value={form.name} onChange={(e) => { field("name", e.target.value); if (!editing) field("slug", toSlug(e.target.value)); }}
                    placeholder="Dr. Firstname Lastname" className="input-glass w-full text-sm py-2.5" />
                </div>

                {/* Role + Designation */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="label-admin">Role <span className="text-red-400">*</span></label>
                    <div className="relative">
                      <select value={form.role} onChange={(e) => field("role", e.target.value as MemberRole)}
                        className="input-glass w-full text-sm py-2.5 pr-8 appearance-none cursor-pointer">
                        {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="label-admin">Designation</label>
                    <input value={form.designation} onChange={(e) => field("designation", e.target.value)}
                      placeholder="PhD Scholar (PMRF)" className="input-glass w-full text-sm py-2.5" />
                  </div>
                </div>

                {/* Email + Slug */}
                <div className="space-y-1.5">
                  <label className="label-admin">IIT Email <span className="text-red-400">*</span></label>
                  <input type="email" value={form.email} onChange={(e) => field("email", e.target.value)}
                    placeholder="cs21d1001@iittp.ac.in" className="input-glass w-full text-sm py-2.5 font-mono" />
                </div>

                <div className="space-y-1.5">
                  <label className="label-admin">Profile Slug <span className="text-slate-500 font-normal">(auto-generated)</span></label>
                  <input value={form.slug} onChange={(e) => field("slug", e.target.value)}
                    placeholder="firstname-lastname" className="input-glass w-full text-sm py-2.5 font-mono" />
                  <p className="text-[10px] text-slate-600">Public URL: /people/<span className="text-slate-400">{form.slug || "slug"}</span></p>
                </div>

                {/* Photo URL */}
                <div className="space-y-1.5">
                  <label className="label-admin">Photo URL <span className="text-slate-500 font-normal">(optional)</span></label>
                  <input value={form.photoUrl} onChange={(e) => field("photoUrl", e.target.value)}
                    placeholder="https://…/photo.jpg" className="input-glass w-full text-sm py-2.5" />
                </div>

                {/* Active toggle */}
                <div className="flex items-center justify-between py-2 border-t border-white/08">
                  <div>
                    <p className="text-sm font-medium text-slate-200">Active Member</p>
                    <p className="text-[10px] text-slate-500">Inactive members appear under Alumni</p>
                  </div>
                  <button onClick={() => field("isActive", !form.isActive)}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${form.isActive ? "bg-teal-500" : "bg-white/15"}`}>
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${form.isActive ? "left-6" : "left-1"}`} />
                  </button>
                </div>
              </div>

              {/* ── Right column ────────────────────────────────────────── */}
              <div className="space-y-4">
                <div className="glass-card p-6 space-y-4">
                  <h3 className="text-sm font-bold text-slate-300">Research & Links</h3>

                  {/* Research Interests */}
                  <div className="space-y-2">
                    <label className="label-admin">Research Interests</label>
                    <div className="flex gap-2">
                      <input value={interestInput} onChange={(e) => setInterestInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addInterest())}
                        placeholder="e.g., Computer Vision, SLAM…" className="input-glass flex-1 text-sm py-2.5" />
                      <button onClick={addInterest} className="btn-ghost text-sm px-3 flex-shrink-0">Add</button>
                    </div>
                    {form.researchInterests.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {form.researchInterests.map((r) => (
                          <span key={r} className="inline-flex items-center gap-1 badge-brand text-xs">
                            {r}
                            <button onClick={() => field("researchInterests", form.researchInterests.filter(x => x !== r))}>
                              <X className="w-2.5 h-2.5" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Social links */}
                  {[
                    { key: "linkedin" as const, label: "LinkedIn URL", placeholder: "https://linkedin.com/in/…" },
                    { key: "scholar"  as const, label: "Google Scholar URL", placeholder: "https://scholar.google.com/citations?user=…" },
                    { key: "website"  as const, label: "Personal Website", placeholder: "https://…" },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key} className="space-y-1.5">
                      <label className="label-admin">{label}</label>
                      <input value={form[key]} onChange={(e) => field(key, e.target.value)}
                        placeholder={placeholder} className="input-glass w-full text-sm py-2.5" />
                    </div>
                  ))}
                </div>

                <div className="glass-card p-6 space-y-3">
                  <h3 className="text-sm font-bold text-slate-300">Biography</h3>
                  <textarea value={form.bio} onChange={(e) => field("bio", e.target.value)} rows={5}
                    placeholder="A short bio to appear on the profile page. Focus on current research, awards, and background."
                    className="input-glass w-full text-sm py-2.5 resize-none" />
                  <p className="text-[10px] text-slate-600">{form.bio.length} / 500 characters recommended</p>
                </div>

                <div className="flex gap-3">
                  <button onClick={handleSave} className="btn-primary text-sm gap-2 flex-1 justify-center py-3">
                    <Save className="w-4 h-4" />
                    {mode === "create" ? "Add Member" : "Save Changes"}
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
