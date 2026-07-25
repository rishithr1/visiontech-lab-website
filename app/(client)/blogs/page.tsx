"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronDown,
  Clock,
  Search,
  Sparkles,
  Tag,
  Users,
  X,
} from "lucide-react";
import { blogs, type Blog } from "@/lib/data/blogs";

// ─── Animation Variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: { opacity: 0, y: -16, scale: 0.97, transition: { duration: 0.22 } },
};

// ─── Featured Hero Card ────────────────────────────────────────────────────────
function FeaturedBlogCard({ blog }: { blog: Blog }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Link href={`/blogs/${blog.slug}`} className="block group">
        <div className="glass-card overflow-hidden border-2 border-brand-500/15 hover:border-brand-500/35 transition-all duration-500 relative">
          {/* Cover image / gradient */}
          <div className="relative h-56 md:h-72 overflow-hidden">
            {blog.coverImage ? (
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            ) : null}
            <div className={`absolute inset-0 bg-gradient-to-br ${blog.coverGradient} ${blog.coverImage ? "opacity-60" : "opacity-100"}`} />
            {/* Overlay pattern */}
            <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            {/* Featured badge */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 badge-gold text-xs px-3 py-1 backdrop-blur-sm">
                <Sparkles className="w-3 h-3" /> Featured
              </span>
            </div>
            {/* Read time */}
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1.5 glass-xs text-xs px-3 py-1 text-slate-200">
                <Clock className="w-3 h-3" /> {blog.readTime} min read
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {blog.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="badge-brand text-[10px]">{tag}</span>
              ))}
            </div>

            <h2 className="text-xl md:text-2xl font-display font-bold text-white mb-3 leading-snug group-hover:text-brand-200 transition-colors duration-300">
              {blog.title}
            </h2>

            <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-2">
              {blog.excerpt}
            </p>

            {/* Author + meta */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${blog.authorAvatarColor} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-xs font-bold text-white">{blog.authorInitials}</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{blog.authorName}</div>
                  <div className="text-[10px] text-slate-500">{blog.authorRole}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5 text-brand-400" />
                {blog.publishedAt}
              </div>
            </div>
          </div>

          {/* CTA strip */}
          <div className="px-6 md:px-8 pb-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-400 group-hover:text-brand-300 transition-colors">
              Read Full Post
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </div>

          {/* Hover bar */}
          <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-brand-500 to-teal-500 transition-all duration-500" />
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Regular Blog Card ─────────────────────────────────────────────────────────
function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  return (
    <motion.div variants={cardVariants} layout>
      <Link href={`/blogs/${blog.slug}`} className="block group h-full">
        <div className="glass-card overflow-hidden h-full flex flex-col hover:border-brand-500/25 transition-all duration-300">
          {/* Thumbnail */}
          <div className="relative h-44 overflow-hidden flex-shrink-0">
            {blog.coverImage ? (
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            ) : null}
            <div className={`absolute inset-0 bg-gradient-to-br ${blog.coverGradient} ${blog.coverImage ? "opacity-55" : "opacity-100"}`} />
            <div className="absolute inset-0 flex items-end p-4">
              <span className="inline-flex items-center gap-1 glass-xs text-[10px] text-slate-200 px-2 py-1 rounded-lg">
                <Clock className="w-2.5 h-2.5" /> {blog.readTime} min
              </span>
            </div>
            {/* Index badge */}
            <div className="absolute top-3 left-3 w-7 h-7 rounded-lg glass-strong flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">{String(index + 1).padStart(2, "0")}</span>
            </div>
          </div>

          {/* Body */}
          <div className="p-5 flex flex-col flex-1">
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {blog.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="badge-brand text-[9px]">{tag}</span>
              ))}
            </div>

            <h3 className="text-sm font-semibold text-white group-hover:text-brand-200 transition-colors duration-200 leading-snug mb-2 line-clamp-3 flex-1">
              {blog.title}
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4">
              {blog.excerpt}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/06 mt-auto">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${blog.authorAvatarColor} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-[9px] font-bold text-white">{blog.authorInitials}</span>
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-slate-300 truncate max-w-[100px]">{blog.authorName.split(" ")[0]}</div>
                  <div className="text-[9px] text-slate-500">{blog.publishedAt}</div>
                </div>
              </div>
              <span className="text-[10px] font-medium text-brand-400 group-hover:text-brand-300 flex items-center gap-0.5 transition-colors">
                Read <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>

          {/* Hover bar */}
          <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-brand-500/60 to-teal-500/60 transition-all duration-500" />
        </div>
      </Link>
    </motion.div>
  );
}

// ─── All Tags ─────────────────────────────────────────────────────────────────
const allTags    = Array.from(new Set(blogs.flatMap((b) => b.tags))).sort();
const allAuthors = Array.from(new Set(blogs.map((b) => b.authorName))).sort();


// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BlogsPage() {
  const [search,       setSearch]       = useState("");
  const [selectedTag,  setSelectedTag]  = useState<string | null>(null);
  const [selectedAuth, setSelectedAuth] = useState<string | null>(null);
  const [showFilters,  setShowFilters]  = useState(false);

  const featuredBlogs = useMemo(() => blogs.filter((b) => b.isFeatured), []);
  const sortedBlogs   = useMemo(() =>
    [...blogs].sort(
      (a, b) => new Date(b.publishedISO).getTime() - new Date(a.publishedISO).getTime()
    ), []
  );

  const filtered = useMemo(() => {
    return sortedBlogs.filter((b) => {
      if (selectedTag  && !b.tags.includes(selectedTag))    return false;
      if (selectedAuth && b.authorName !== selectedAuth)    return false;
      if (search.trim()) {
        const q   = search.toLowerCase();
        const hay = [b.title, b.excerpt, b.authorName, ...b.tags].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [sortedBlogs, search, selectedTag, selectedAuth]);

  const hasFilters = !!selectedTag || !!selectedAuth || !!search;

  return (
    <div className="page-pt min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950/50 via-navy-900/30 to-purple-950/20 pointer-events-none" />
        <div className="absolute top-10 left-1/4 w-[600px] h-[350px] bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-teal-600/07 rounded-full blur-3xl pointer-events-none" />

        {/* Floating words */}
        {["Vision", "IoT", "NeRF", "YOLO", "MAE"].map((word, i) => (
          <motion.div
            key={word}
            className="absolute hidden md:block font-display font-bold text-white/05 pointer-events-none select-none"
            style={{ fontSize: `${48 + i * 12}px`, left: `${5 + i * 19}%`, top: `${15 + (i % 2) * 25}%` }}
            animate={{ y: [0, -12, 0], rotate: [0, i % 2 === 0 ? 3 : -3, 0] }}
            transition={{ duration: 5 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
          >
            {word}
          </motion.div>
        ))}

        <div className="relative section-container text-center space-y-5">
          <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 badge-brand px-4 py-1.5 text-sm">
            <BookOpen className="w-3.5 h-3.5" /> {blogs.length} Posts Published
          </motion.span>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold text-white">
            Lab <span className="gradient-text">Blog</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Technical deep-dives, research insights, and tutorials from Vision Technology Lab researchers.
          </motion.p>

          {/* Search bar */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, author, tag…"
              className="input-glass pl-11 py-3 text-sm w-full" id="blog-search"
              aria-label="Search blog posts" />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Featured Blogs ────────────────────────────────────────────────────── */}
      {!hasFilters && featuredBlogs.length > 0 && (
        <section className="section-container pb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <span className="inline-flex items-center gap-2 glass-xs px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-gold-300">
              <Sparkles className="w-3.5 h-3.5" /> Featured Posts
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {featuredBlogs.map((blog) => (
              <FeaturedBlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </section>
      )}

      {/* ── Filter bar ────────────────────────────────────────────────────────── */}
      <div className="sticky top-[72px] z-30 py-3 glass-navbar border-b border-white/08">
        <div className="section-container flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Filter toggle */}
          <button onClick={() => setShowFilters((v) => !v)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex-shrink-0 ${
              showFilters || hasFilters ? "bg-brand-600/30 text-brand-300 border border-brand-500/40" : "glass-xs text-slate-300 hover:text-white hover:bg-white/10"
            }`}
            aria-expanded={showFilters}>
            <Tag className="w-3.5 h-3.5" />
            Filter by Topic / Author
            {hasFilters && (
              <span className="w-4 h-4 rounded-full bg-brand-500 text-white text-[9px] font-bold flex items-center justify-center">!</span>
            )}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${showFilters ? "rotate-180" : ""}`} />
          </button>

          {hasFilters && (
            <button onClick={() => { setSelectedTag(null); setSelectedAuth(null); setSearch(""); }}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
              <X className="w-3 h-3" /> Clear Filters
            </button>
          )}

          <div className="text-xs text-slate-500 ml-auto">
            {filtered.length} post{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Expandable filter panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
              className="overflow-hidden">
              <div className="section-container pb-3 pt-3 border-t border-white/08 space-y-3">
                {/* Topics */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block">Topics</span>
                  <div className="flex flex-wrap gap-1.5">
                    {allTags.map((tag) => (
                      <button key={tag} onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                        aria-pressed={selectedTag === tag}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                          selectedTag === tag ? "bg-brand-600/40 text-brand-200 border border-brand-500/50" : "glass-xs text-slate-400 hover:text-white hover:bg-white/10"
                        }`}>
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Authors */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block">Authors</span>
                  <div className="flex flex-wrap gap-1.5">
                    {allAuthors.map((author) => (
                      <button key={author} onClick={() => setSelectedAuth(selectedAuth === author ? null : author)}
                        aria-pressed={selectedAuth === author}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                          selectedAuth === author ? "bg-teal-600/30 text-teal-200 border border-teal-500/40" : "glass-xs text-slate-400 hover:text-white hover:bg-white/10"
                        }`}>
                        {author}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── All Posts Grid ────────────────────────────────────────────────────── */}
      <section className="section-container py-8 pb-24">
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div key="results" variants={containerVariants} initial="hidden" animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((blog, i) => (
                <BlogCard key={blog.id} blog={blog} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center">
              <div className="w-16 h-16 rounded-2xl glass-brand flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-7 h-7 text-brand-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No posts found</h3>
              <p className="text-slate-400 text-sm mb-5">Try a different search or filter.</p>
              <button onClick={() => { setSelectedTag(null); setSelectedAuth(null); setSearch(""); }} className="btn-primary text-sm">
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
