"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  ChevronRight,
  Copy,
  ExternalLink,
  FlaskConical,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  Microscope,
  Quote,
  Sparkles,
  Check,
} from "lucide-react";
import { type Person, ROLE_CONFIG } from "@/lib/data/people";

// ─── Copy Email button ────────────────────────────────────────────────────────
function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      title="Copy email address"
      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
        copied
          ? "bg-teal-500/20 text-teal-400"
          : "glass-xs text-slate-400 hover:text-white hover:bg-white/10"
      }`}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

// ─── Publication row ──────────────────────────────────────────────────────────
function PublicationRow({
  pub,
  index,
}: {
  pub: Person["publications"][0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="flex items-start gap-4 group py-4 border-b border-white/06 last:border-0"
    >
      {/* Index */}
      <div className="flex-shrink-0 w-8 h-8 rounded-lg glass-brand flex items-center justify-center">
        <span className="text-[11px] font-bold text-brand-300">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="badge-brand text-[10px]">{pub.venue}</span>
          <span className="badge-teal text-[10px]">{pub.year}</span>
        </div>

        {/* Title */}
        <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors duration-200 leading-snug">
          {pub.title}
        </p>
      </div>

      {/* External link */}
      {pub.doi && (
        <a
          href={`https://doi.org/${pub.doi}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View publication"
          className="flex-shrink-0 w-8 h-8 rounded-lg glass-xs flex items-center justify-center text-slate-500 hover:text-white hover:bg-brand-600/30 transition-all duration-200"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </motion.div>
  );
}

// ─── Main Client Component ────────────────────────────────────────────────────
export default function PersonProfileClient({ person }: { person: Person }) {
  const roleConf = ROLE_CONFIG[person.role];

  return (
    <div className="page-pt min-h-screen">
      {/* ── Back nav ──────────────────────────────────────────────────────────── */}
      <div className="section-container pt-8 pb-0">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/people"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-brand-300 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to People
          </Link>
        </motion.div>
      </div>

      {/* ── Profile Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-14 md:py-20">
        {/* Ambient blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-teal-600/08 rounded-full blur-3xl pointer-events-none" />

        <div className="relative section-container">
          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
            {/* ── Left: Avatar + contact ──────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              className="flex flex-col items-center lg:items-start gap-5 flex-shrink-0"
            >
              {/* Large avatar */}
              <div className="relative">
                <div
                  className={`w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br ${person.avatarColor} flex items-center justify-center shadow-glass-lg`}
                >
                  <span className="text-4xl md:text-5xl font-display font-bold text-white">
                    {person.avatarInitials}
                  </span>
                </div>
                {/* Animated ring */}
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-brand-500/30"
                  animate={{ scale: [1, 1.04, 1], opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Featured badge */}
                {person.isFeatured && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/50 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-gold-400" />
                  </div>
                )}
              </div>

              {/* Contact card */}
              <div className="glass-card w-full max-w-xs p-4 space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                  Contact
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg glass-brand flex items-center justify-center flex-shrink-0">
                    <Mail className="w-3.5 h-3.5 text-brand-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Email</div>
                    <a
                      href={`mailto:${person.email}`}
                      className="text-xs text-brand-300 hover:text-brand-200 transition-colors truncate block"
                    >
                      {person.email}
                    </a>
                  </div>
                  <CopyEmailButton email={person.email} />
                </div>

                {/* LinkedIn */}
                {person.linkedIn && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg glass-brand flex items-center justify-center flex-shrink-0">
                      <Linkedin className="w-3.5 h-3.5 text-brand-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">LinkedIn</div>
                      <a
                        href={person.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-brand-300 hover:text-brand-200 transition-colors"
                      >
                        View Profile
                      </a>
                    </div>
                  </div>
                )}

                {/* Google Scholar */}
                {person.googleScholar && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg glass-brand flex items-center justify-center flex-shrink-0 text-[8px] font-bold text-brand-300">
                      GS
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Scholar</div>
                      <a
                        href={person.googleScholar}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-brand-300 hover:text-brand-200 transition-colors"
                      >
                        Google Scholar
                      </a>
                    </div>
                  </div>
                )}

                {/* Personal website */}
                {person.website && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg glass-brand flex items-center justify-center flex-shrink-0">
                      <Globe className="w-3.5 h-3.5 text-brand-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Website</div>
                      <a
                        href={person.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-brand-300 hover:text-brand-200 transition-colors"
                      >
                        Personal Site
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* ── Right: Main info ─────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="flex-1 min-w-0 space-y-6"
            >
              {/* Role badge */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`badge ${roleConf.badge} text-xs`}>
                  {person.role}
                </span>
                {person.isFeatured && (
                  <span className="badge-gold text-xs">
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    Lab Highlight
                  </span>
                )}
              </div>

              {/* Name */}
              <div>
                <h1 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight mb-1">
                  {person.name}
                </h1>
                <p className="text-base md:text-lg text-slate-400 font-medium">
                  {person.designation}
                </p>
                <p className="text-sm text-slate-500 mt-0.5">
                  {person.department}, {person.institute}
                </p>
              </div>

              {/* Meta info pills */}
              <div className="flex flex-wrap gap-3">
                {person.joinYear && (
                  <div className="glass-xs rounded-xl px-3.5 py-2 flex items-center gap-2 text-xs text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-brand-400" />
                    Joined {person.joinYear}
                  </div>
                )}
                {person.expectedGradYear && (
                  <div className="glass-xs rounded-xl px-3.5 py-2 flex items-center gap-2 text-xs text-slate-300">
                    <GraduationCap className="w-3.5 h-3.5 text-teal-400" />
                    Expected {person.expectedGradYear}
                  </div>
                )}
                {person.supervisor && (
                  <div className="glass-xs rounded-xl px-3.5 py-2 flex items-center gap-2 text-xs text-slate-300">
                    <Microscope className="w-3.5 h-3.5 text-gold-400" />
                    Advisor: {person.supervisor}
                  </div>
                )}
              </div>

              {/* Research areas */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FlaskConical className="w-4 h-4 text-brand-400" />
                  <h2 className="text-sm font-bold uppercase tracking-widest text-brand-400">
                    Research Areas
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {person.researchAreas.map((area) => (
                    <motion.span
                      key={area}
                      whileHover={{ scale: 1.05 }}
                      className="px-3.5 py-1.5 rounded-xl glass-brand border border-brand-500/20 text-sm text-brand-200 font-medium"
                    >
                      {area}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Awards */}
              {person.awards && person.awards.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-4 h-4 text-gold-400" />
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gold-400">
                      Awards & Recognition
                    </h2>
                  </div>
                  <ul className="space-y-1.5">
                    {person.awards.map((award, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.06 }}
                        className="flex items-start gap-2 text-sm text-slate-300"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 mt-0.5" />
                        {award}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── About Section ──────────────────────────────────────────────────────── */}
      <section className="section-container pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="glass-card p-6 md:p-8 relative overflow-hidden"
        >
          {/* Quote icon */}
          <Quote className="absolute top-4 right-4 w-8 h-8 text-brand-500/20" />

          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-brand-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-brand-400">
              About
            </span>
          </div>

          <p className="text-slate-300 leading-[1.85] text-base max-w-4xl">
            {person.about}
          </p>
        </motion.div>
      </section>

      {/* ── Publications Section ───────────────────────────────────────────────── */}
      {person.publications.length > 0 && (
        <section className="section-container pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            {/* Section header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl glass-brand flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-brand-300" />
                </div>
                <div>
                  <h2 className="text-lg font-display font-bold text-white">
                    Selected Publications
                  </h2>
                  <p className="text-xs text-slate-400">
                    {person.publications.length} publication{person.publications.length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <Link
                href="/research/publications"
                className="flex items-center gap-1 text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors"
              >
                All Lab Publications
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Publications list */}
            <div className="glass-card p-5 md:p-7">
              {person.publications
                .slice()
                .sort((a, b) => b.year - a.year)
                .map((pub, i) => (
                  <PublicationRow key={i} pub={pub} index={i} />
                ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* ── Nav to other profiles ──────────────────────────────────────────────── */}
      <section className="section-container pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-between gap-4"
        >
          <Link
            href="/people"
            className="btn-secondary text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            All Lab Members
          </Link>
          <div className="flex gap-3">
            <Link href="/research/publications" className="btn-ghost text-sm">
              <BookOpen className="w-4 h-4" />
              Publications
            </Link>
            <Link href="/careers" className="btn-primary text-sm">
              <Briefcase className="w-4 h-4" />
              Join the Lab
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
