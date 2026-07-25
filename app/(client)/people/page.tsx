"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  ExternalLink,
  GraduationCap,
  Mail,
  Microscope,
  Search,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { people, ROLE_ORDER, ROLE_CONFIG, type PersonRole } from "@/lib/data/people";

// ─── Animation Variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

// ─── Person Card ──────────────────────────────────────────────────────────────
function PersonCard({ person }: { person: typeof people[0] }) {
  const roleConf = ROLE_CONFIG[person.role];

  return (
    <motion.div
      variants={cardVariants}
      layout
      className="glass-card group relative overflow-hidden flex flex-col h-full"
    >
      {/* Featured star */}
      {person.isFeatured && (
        <div className="absolute top-3 right-3 z-10">
          <span className="w-6 h-6 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-gold-400" />
          </span>
        </div>
      )}

      {/* Subtle gradient bg on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-600/0 to-teal-600/0 group-hover:from-brand-600/06 group-hover:to-teal-600/05 transition-all duration-500 pointer-events-none rounded-2xl" />

      <div className="relative p-5 flex flex-col h-full">
        {/* ── Avatar ───────────────────────────────────────────────── */}
        <div className="flex items-center gap-4 mb-4">
          {/* Avatar blob */}
          <div className="relative flex-shrink-0">
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${person.avatarColor} flex items-center justify-center shadow-glass-md group-hover:scale-105 transition-transform duration-300`}
            >
              <span className="text-lg font-display font-bold text-white">
                {person.avatarInitials}
              </span>
            </div>
            {/* Role indicator dot */}
            <div
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-navy-900 bg-gradient-to-br ${roleConf.color}`}
            />
          </div>

          <div className="flex-1 min-w-0">
            {/* Role badge */}
            <span className={`badge text-[9px] font-bold mb-1.5 block w-fit ${roleConf.badge}`}>
              {roleConf.short}
            </span>
            {/* Name */}
            <h3 className="text-sm font-semibold text-white group-hover:text-brand-200 transition-colors duration-200 leading-tight truncate">
              {person.name}
            </h3>
            {/* Designation */}
            <p className="text-[10px] text-slate-400 truncate mt-0.5">
              {person.designation}
            </p>
          </div>
        </div>

        {/* ── Research areas ────────────────────────────────────────── */}
        <div className="flex-1 mb-4">
          <div className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-2">
            Research Areas
          </div>
          <div className="flex flex-wrap gap-1.5">
            {person.researchAreas.slice(0, 3).map((area) => (
              <span
                key={area}
                className="text-[10px] px-2 py-0.5 rounded-md glass-xs text-slate-400 leading-tight"
              >
                {area}
              </span>
            ))}
            {person.researchAreas.length > 3 && (
              <span className="text-[10px] text-slate-600 self-center">
                +{person.researchAreas.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* ── Footer ────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/07">
          {/* Email icon */}
          <a
            href={`mailto:${person.email}`}
            onClick={(e) => e.stopPropagation()}
            aria-label={`Email ${person.name}`}
            className="w-7 h-7 rounded-lg glass-xs flex items-center justify-center text-slate-500 hover:text-brand-300 hover:bg-brand-600/20 transition-all duration-200"
          >
            <Mail className="w-3 h-3" />
          </a>

          <Link
            href={`/people/${person.slug}`}
            className="flex items-center gap-1 text-[11px] font-semibold text-brand-400 group-hover:text-brand-300 transition-colors duration-200"
            aria-label={`View ${person.name}'s profile`}
          >
            View Profile
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>
      </div>

      {/* Hover bar */}
      <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-brand-500/60 to-teal-500/60 transition-all duration-500" />
    </motion.div>
  );
}

// ─── Role Section ─────────────────────────────────────────────────────────────
function RoleSection({
  role,
  members,
}: {
  role: PersonRole;
  members: typeof people;
}) {
  const conf = ROLE_CONFIG[role];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
      aria-labelledby={`section-${role.replace(/\s+/g, "-").toLowerCase()}`}
    >
      {/* Section label */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
        <div className="flex items-center gap-2 px-4 py-1.5 glass-xs rounded-full">
          <span
            className={`w-2 h-2 rounded-full bg-gradient-to-br ${conf.color}`}
          />
          <h2
            id={`section-${role.replace(/\s+/g, "-").toLowerCase()}`}
            className="text-xs font-bold uppercase tracking-widest text-slate-300"
          >
            {role}s{role === "Principal Investigator" ? "" : ""}
          </h2>
          <span className="text-[10px] text-slate-500 ml-1">({members.length})</span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
      </div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className={`grid gap-4 ${
          role === "Principal Investigator"
            ? "grid-cols-1 max-w-sm"
            : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        }`}
      >
        {members.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </motion.div>
    </motion.section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PeoplePage() {
  const [search,      setSearch]      = useState("");
  const [activeRoles, setActiveRoles] = useState<PersonRole[]>([]);

  const filteredPeople = useMemo(() => {
    return people.filter((p) => {
      if (activeRoles.length > 0 && !activeRoles.includes(p.role)) return false;
      if (search.trim()) {
        const q   = search.toLowerCase();
        const hay = [p.name, p.designation, ...p.researchAreas].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [search, activeRoles]);

  // Group by role in defined order
  const grouped = useMemo(() => {
    return ROLE_ORDER.filter((role) =>
      filteredPeople.some((p) => p.role === role)
    ).map((role) => ({
      role,
      members: filteredPeople.filter((p) => p.role === role),
    }));
  }, [filteredPeople]);

  const toggleRole = (role: PersonRole) =>
    setActiveRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );

  const labStats = {
    total:  people.length,
    phd:    people.filter((p) => p.role === "PhD Scholar").length,
    ms:     people.filter((p) => p.role === "MS Scholar").length,
    staff:  people.filter((p) => p.role === "Project Staff").length,
  };

  return (
    <div className="page-pt min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/50 via-brand-950/20 to-teal-950/30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-teal-600/08 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-brand-600/08 rounded-full blur-3xl pointer-events-none" />

        {/* Floating member count bubbles */}
        {Object.entries({ PhD: labStats.phd, MS: labStats.ms }).map(([label, count], i) => (
          <motion.div
            key={label}
            className="absolute hidden md:flex flex-col items-center glass-xs rounded-2xl px-4 py-3 pointer-events-none"
            style={{ right: `${8 + i * 12}%`, top: `${30 + i * 12}%` }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
          >
            <span className="text-xl font-bold text-white">{count}</span>
            <span className="text-[9px] text-slate-400 uppercase tracking-widest">{label}</span>
          </motion.div>
        ))}

        <div className="relative section-container text-center space-y-5">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 badge-teal px-4 py-1.5 text-sm"
          >
            <Users className="w-3.5 h-3.5" />
            {labStats.total} Members
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold text-white"
          >
            Our <span className="gradient-text">People</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Meet the researchers, scholars, and staff driving innovation at the
            Vision Technology Lab, IIT Tirupati.
          </motion.p>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            {[
              { label: "Total Members",  value: labStats.total, icon: <Users className="w-4 h-4" /> },
              { label: "PhD Scholars",   value: labStats.phd,   icon: <GraduationCap className="w-4 h-4" /> },
              { label: "MS Scholars",    value: labStats.ms,    icon: <BookOpen className="w-4 h-4" /> },
              { label: "Project Staff",  value: labStats.staff, icon: <Briefcase className="w-4 h-4" /> },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-card px-5 py-3 flex items-center gap-3 hover:border-brand-500/30 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg glass-brand flex items-center justify-center text-brand-300">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-xl font-bold text-white leading-none">{stat.value}</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Sticky Filter Bar ─────────────────────────────────────────────────── */}
      <div className="sticky top-[72px] z-30 py-3 glass-navbar border-b border-white/08">
        <div className="section-container flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or research area…"
              className="input-glass pl-10 py-2.5 text-sm w-full"
              id="people-search"
              aria-label="Search people"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Role filter pills */}
          <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
            {ROLE_ORDER.filter((r) => people.some((p) => p.role === r)).map((role) => {
              const conf = ROLE_CONFIG[role];
              const isActive = activeRoles.includes(role);
              return (
                <button
                  key={role}
                  onClick={() => toggleRole(role)}
                  aria-pressed={isActive}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200 ${
                    isActive
                      ? `${conf.badge} shadow-sm`
                      : "glass-xs text-slate-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {conf.short}
                </button>
              );
            })}
            {activeRoles.length > 0 && (
              <button
                onClick={() => setActiveRoles([])}
                className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── People Grid (grouped by role) ────────────────────────────────────── */}
      <section className="section-container py-12 pb-24 space-y-14">
        <AnimatePresence mode="wait">
          {grouped.length > 0 ? (
            grouped.map(({ role, members }) => (
              <RoleSection key={role} role={role} members={members} />
            ))
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center"
            >
              <div className="w-16 h-16 rounded-2xl glass-brand flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-brand-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No members found</h3>
              <p className="text-slate-400 text-sm">Try a different search or filter.</p>
              <button
                onClick={() => { setSearch(""); setActiveRoles([]); }}
                className="mt-5 btn-primary text-sm"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Join the Lab CTA ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card border-2 border-brand-500/20 rounded-3xl p-8 md:p-10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600/08 to-teal-600/06 pointer-events-none" />
          <div className="relative space-y-4">
            <div className="w-14 h-14 rounded-2xl glass-brand flex items-center justify-center mx-auto">
              <Microscope className="w-7 h-7 text-brand-300" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white">
              Want to Join Our Team?
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
              We are always looking for talented researchers to join the Vision Technology Lab.
              Explore our open positions or reach out directly.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/careers" className="btn-primary text-sm">
                <Briefcase className="w-4 h-4" />
                View Open Positions
              </Link>
              <a
                href="mailto:kalidas@iittp.ac.in"
                className="btn-secondary text-sm"
              >
                <Mail className="w-4 h-4" />
                Contact the PI
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
