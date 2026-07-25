"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Clock, Tag } from "lucide-react";
import { type Blog, blogs } from "@/lib/data/blogs";

// ─── Blog Reader Client Component ─────────────────────────────────────────────
export default function BlogReaderClient({ blog }: { blog: Blog }) {
  // Related posts (same tags, different post)
  const related = blogs
    .filter((b) => b.id !== blog.id && b.tags.some((t) => blog.tags.includes(t)))
    .slice(0, 2);

  return (
    <div className="page-pt min-h-screen">
      {/* ── Back link ────────────────────────────────────────────────────────── */}
      <div className="section-container pt-8 pb-0">
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link href="/blogs" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-brand-300 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Blog
          </Link>
        </motion.div>
      </div>

      {/* ── Hero / Cover ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-14 md:py-20">
        {/* Cover image or gradient */}
        {blog.coverImage && (
          <div className="absolute inset-0 pointer-events-none">
            <img src={blog.coverImage} alt="" className="w-full h-full object-cover object-center opacity-15" aria-hidden />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/80 to-navy-950" />
          </div>
        )}
        <div className={`absolute inset-0 bg-gradient-to-br ${blog.coverGradient} opacity-${blog.coverImage ? "10" : "20"} pointer-events-none`} />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-950 to-transparent pointer-events-none" />

        <div className="relative section-container max-w-4xl mx-auto space-y-6">
          {/* Tags */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
            className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <Link key={tag} href={`/blogs?tag=${encodeURIComponent(tag)}`}
                className="badge-brand text-xs hover:bg-brand-600/40 transition-colors duration-200">
                <Tag className="w-2.5 h-2.5 inline mr-1" />{tag}
              </Link>
            ))}
          </motion.div>

          {/* Title */}
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}
            className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
            {blog.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
            className="text-lg text-slate-400 leading-relaxed max-w-3xl">
            {blog.excerpt}
          </motion.p>

          {/* Author + meta strip */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.22 }}
            className="flex flex-wrap items-center gap-5 pt-2">
            {/* Author */}
            <Link href={`/people/${blog.authorSlug}`}
              className="flex items-center gap-3 group">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${blog.authorAvatarColor} flex items-center justify-center shadow-glass-sm group-hover:scale-105 transition-transform duration-200 flex-shrink-0`}>
                <span className="text-sm font-bold text-white">{blog.authorInitials}</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-white group-hover:text-brand-200 transition-colors">{blog.authorName}</div>
                <div className="text-[11px] text-slate-400">{blog.authorRole} · Vision Technology Lab</div>
              </div>
            </Link>

            {/* Divider */}
            <div className="h-8 w-px bg-white/10 hidden sm:block" />

            {/* Date */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Calendar className="w-3.5 h-3.5 text-brand-400" />
              {blog.publishedAt}
            </div>

            {/* Read time */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              {blog.readTime} min read
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Cover Thumbnail (below hero) ─────────────────────────────────────── */}
      {blog.coverImage && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="section-container max-w-4xl mx-auto mb-10">
          <div className="relative rounded-2xl overflow-hidden h-56 md:h-80 glass-card">
            <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
            <div className={`absolute inset-0 bg-gradient-to-br ${blog.coverGradient} opacity-30`} />
          </div>
        </motion.div>
      )}

      {/* ── Prose Content ─────────────────────────────────────────────────────── */}
      <main id="main-content">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="section-container max-w-4xl mx-auto pb-16"
        >
          {/* Prose wrapper — @tailwindcss/typography styles all HTML children */}
          <div
            className="
              prose prose-invert prose-lg max-w-none
              prose-headings:font-display prose-headings:text-white prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-brand-200
              prose-p:text-slate-300 prose-p:leading-[1.85]
              prose-a:text-brand-400 prose-a:no-underline hover:prose-a:text-brand-300 prose-a:transition-colors
              prose-strong:text-white prose-strong:font-semibold
              prose-em:text-slate-300
              prose-blockquote:border-l-brand-500 prose-blockquote:bg-brand-600/08 prose-blockquote:rounded-r-xl
              prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:not-italic
              prose-blockquote:text-slate-300
              prose-code:text-brand-300 prose-code:bg-white/08 prose-code:px-1.5 prose-code:py-0.5
              prose-code:rounded-md prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-navy-900 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl
              prose-pre:shadow-glass-md
              prose-ul:text-slate-300 prose-ol:text-slate-300
              prose-li:marker:text-brand-400
              prose-table:text-sm
              prose-thead:text-slate-300 prose-thead:border-b prose-thead:border-white/10
              prose-th:font-semibold prose-th:text-slate-200
              prose-td:text-slate-400 prose-td:border-b prose-td:border-white/06
              prose-tr:hover:bg-white/02
              prose-lead:text-slate-300 prose-lead:text-xl prose-lead:leading-relaxed
            "
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* ── Post footer ────────────────────────────────────────────── */}
          <div className="mt-16 pt-8 border-t border-white/10">
            {/* Author bio card */}
            <Link href={`/people/${blog.authorSlug}`} className="block group">
              <div className="glass-card p-5 flex items-start gap-4 hover:border-brand-500/30 transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${blog.authorAvatarColor} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200`}>
                  <span className="text-lg font-bold text-white">{blog.authorInitials}</span>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-brand-400 mb-1">Written by</div>
                  <div className="text-base font-semibold text-white group-hover:text-brand-200 transition-colors">{blog.authorName}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{blog.authorRole} · Vision Technology Lab, IIT Tirupati</div>
                  <div className="text-xs text-brand-400 mt-2 flex items-center gap-1 group-hover:text-brand-300 transition-colors">
                    View Profile <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </motion.article>
      </main>

      {/* ── Related Posts ─────────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="section-container max-w-4xl mx-auto pb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <span className="inline-flex items-center gap-2 glass-xs px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-slate-300">
              <BookOpen className="w-3.5 h-3.5 text-brand-400" /> Related Posts
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {related.map((relBlog) => (
              <Link key={relBlog.id} href={`/blogs/${relBlog.slug}`} className="group block">
                <div className="glass-card overflow-hidden hover:border-brand-500/25 transition-all duration-300">
                  <div className={`h-28 bg-gradient-to-br ${relBlog.coverGradient} relative overflow-hidden`}>
                    {relBlog.coverImage && (
                      <img src={relBlog.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {relBlog.tags.slice(0, 2).map((t) => (
                        <span key={t} className="badge-brand text-[9px]">{t}</span>
                      ))}
                    </div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-brand-200 transition-colors line-clamp-2 mb-2">
                      {relBlog.title}
                    </h3>
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>{relBlog.authorName.split(" ")[0]}</span>
                      <span className="flex items-center gap-1 text-brand-400 group-hover:text-brand-300">
                        Read <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
