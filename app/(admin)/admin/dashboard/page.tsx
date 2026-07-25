"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  FileText,
  Microscope,
  Newspaper,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

// ─── Placeholder stats ────────────────────────────────────────────────────────
const stats = [
  { label: "Total Publications", value: "60+", delta: "+5 this year", icon: <BookOpen className="w-5 h-5" />, color: "from-brand-500 to-blue-600", href: "/admin/publications" },
  { label: "Active Members", value: "13", delta: "+4 new this yr", icon: <Users className="w-5 h-5" />, color: "from-teal-500 to-cyan-600", href: "/admin/people" },
  { label: "Funded Projects", value: "7", delta: "₹3.1 Cr total", icon: <Briefcase className="w-5 h-5" />, color: "from-purple-500 to-brand-600", href: "/admin/careers" },
  { label: "Patents & IDFs", value: "7", delta: "3 granted", icon: <Shield className="w-5 h-5" />, color: "from-gold-500 to-orange-600", href: "/admin/patents" },
  { label: "Open Positions", value: "6", delta: "2 closing soon", icon: <Briefcase className="w-5 h-5" />, color: "from-rose-500 to-pink-600", href: "/admin/careers" },
  { label: "Blog Posts", value: "5", delta: "+2 this month", icon: <FileText className="w-5 h-5" />, color: "from-indigo-500 to-purple-600", href: "/admin/blogs" },
  { label: "News Items", value: "9", delta: "1 unpublished", icon: <Newspaper className="w-5 h-5" />, color: "from-emerald-500 to-teal-600", href: "/admin/news" },
  { label: "Total Citations", value: "1,200+", delta: "h-index: 18", icon: <TrendingUp className="w-5 h-5" />, color: "from-cyan-500 to-brand-600", href: "/admin/publications" },
];

// ─── Recent activity ──────────────────────────────────────────────────────────
const recentActivity = [
  { icon: <BookOpen className="w-3.5 h-3.5" />, color: "text-brand-400", action: "Paper accepted", detail: "NeurIPS 2024 — Spectral-Aware MAE", time: "2 days ago" },
  { icon: <Award className="w-3.5 h-3.5" />, color: "text-gold-400", action: "Award received", detail: "PMRF — Rishith Reddy V S", time: "5 days ago" },
  { icon: <FileText className="w-3.5 h-3.5" />, color: "text-teal-400", action: "Blog published", detail: "YOLOv11 Fall Detection post", time: "1 week ago" },
  { icon: <Users className="w-3.5 h-3.5" />, color: "text-purple-400", action: "Member joined", detail: "Meera Varghese — Research Engineer", time: "2 weeks ago" },
  { icon: <Briefcase className="w-3.5 h-3.5" />, color: "text-rose-400", action: "MoU signed", detail: "TCS Research collaboration", time: "3 weeks ago" },
  { icon: <Newspaper className="w-3.5 h-3.5" />, color: "text-emerald-400", action: "News posted", detail: "Indo-French DST-CNRS grant", time: "1 month ago" },
];

// ─── Quick actions ────────────────────────────────────────────────────────────
const quickActions = [
  { label: "New Blog Post", href: "/admin/blogs/new", icon: <FileText className="w-4 h-4" />, color: "btn-primary" },
  { label: "Add Publication", href: "/admin/publications/new", icon: <BookOpen className="w-4 h-4" />, color: "btn-secondary" },
  { label: "Post News", href: "/admin/news/new", icon: <Newspaper className="w-4 h-4" />, color: "btn-secondary" },
  { label: "Add Member", href: "/admin/people/new", icon: <Users className="w-4 h-4" />, color: "btn-secondary" },
];

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Link href={stat.href} className="block group">
        <div className="glass-card p-5 hover:border-brand-500/30 transition-all duration-300 relative overflow-hidden">
          {/* Subtle gradient bg on hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none`} />

          <div className="relative flex items-start justify-between gap-3">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                {stat.label}
              </div>
              <div className="text-3xl font-display font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500">{stat.delta}</div>
            </div>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
              {stat.icon}
            </div>
          </div>

          {/* Hover arrow */}
          <ArrowUpRight className="absolute bottom-3 right-3 w-4 h-4 text-slate-600 group-hover:text-brand-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200" />
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Dashboard Page ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const now = new Date();
  const greeting =
    now.getHours() < 12 ? "Good morning" : now.getHours() < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-7 max-w-7xl">
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-display font-bold text-white">
            {greeting}, <span className="gradient-text">Kalidas Sir</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Here's an overview of Vision Technology Lab - last updated{" "}
            <span className="text-slate-300">
              {now.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-xs py-2 px-3 gap-1.5"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            View Public Site
          </a>
        </div>
      </motion.div>

      {/* ── Stats Grid ────────────────────────────────────────────────────── */}
      <section aria-label="Lab statistics">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-brand-400" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Lab Metrics</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </section>

      {/* ── Quick Actions + Activity ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Quick Actions (2/5 wide) */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="glass-card p-5 h-full">
            <div className="flex items-center gap-2 mb-5">
              <Zap className="w-4 h-4 text-gold-400" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Quick Actions</h2>
            </div>
            <div className="space-y-2.5">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full ${action.color === "btn-primary"
                      ? "bg-brand-600/30 border border-brand-500/40 text-brand-200 hover:bg-brand-600/50"
                      : "glass-xs text-slate-300 hover:text-white hover:bg-white/10"
                    }`}
                >
                  <span className={action.color === "btn-primary" ? "text-brand-300" : "text-slate-500"}>
                    {action.icon}
                  </span>
                  <span className="text-sm font-medium">{action.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 text-current" />
                </Link>
              ))}
            </div>

            {/* Content status strip */}
            <div className="mt-5 pt-4 border-t border-white/08 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-3">Content Status</div>
              {[
                { label: "Published Blogs", count: 5, total: 5, color: "bg-teal-400" },
                { label: "Active Positions", count: 5, total: 6, color: "bg-brand-400" },
                { label: "Pending Reviews", count: 1, total: 3, color: "bg-gold-400" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 flex-shrink-0 w-32 truncate">{item.label}</span>
                  <div className="flex-1 h-1.5 bg-white/08 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-700`}
                      style={{ width: `${(item.count / item.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 flex-shrink-0">{item.count}/{item.total}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Activity (3/5 wide) */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.25 }}
          className="lg:col-span-3"
        >
          <div className="glass-card p-5 h-full">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-400" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Recent Activity</h2>
              </div>
            </div>

            <div className="space-y-1">
              {recentActivity.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className="flex items-start gap-3.5 py-3 border-b border-white/06 last:border-0 group"
                >
                  <div className={`w-7 h-7 rounded-lg glass-xs flex items-center justify-center flex-shrink-0 mt-0.5 ${item.color}`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-200">{item.action}</div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5">{item.detail}</div>
                  </div>
                  <div className="text-[10px] text-slate-600 flex-shrink-0 pt-0.5">{item.time}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── System info footer ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="glass-xs rounded-2xl p-4 flex flex-wrap items-center gap-4 text-[11px] text-slate-600"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span>System Operational</span>
        </div>
        <div className="flex items-center gap-2">
          <Microscope className="w-3 h-3 text-brand-500" />
          <span>VTL Admin v1.0.0</span>
        </div>
        <div className="ml-auto">
          <span>Next.js App Router · Tailwind CSS · Framer Motion</span>
        </div>
      </motion.div>
    </div>
  );
}
