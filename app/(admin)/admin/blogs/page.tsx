"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Eye, FileText, PencilLine, Plus } from "lucide-react";
import { blogs } from "@/lib/data/blogs";

export default function AdminBlogsPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-display font-bold text-white">Blog Posts</h1>
          <p className="text-sm text-slate-400 mt-0.5">{blogs.length} published posts</p>
        </div>
        <Link href="/blog-dashboard/compose" className="btn-primary text-sm gap-2">
          <PencilLine className="w-4 h-4" /> Compose New Post
        </Link>
      </div>

      {/* Blog list */}
      <div className="glass-card overflow-hidden">
        <div className="divide-y divide-white/06">
          {blogs.map((blog, idx) => (
            <motion.div key={blog.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.06 }}
              className="flex items-start gap-4 p-5 hover:bg-white/02 transition-colors group">
              {/* Thumbnail */}
              <div className={`w-16 h-10 rounded-xl bg-gradient-to-br ${blog.coverGradient} flex-shrink-0 overflow-hidden`}>
                {blog.coverImage && <img src={blog.coverImage} alt="" className="w-full h-full object-cover opacity-60" />}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex flex-wrap gap-1.5">
                  {blog.isFeatured && <span className="badge-gold text-[9px]">Featured</span>}
                  {blog.tags.slice(0, 2).map((t) => <span key={t} className="badge-brand text-[9px]">{t}</span>)}
                </div>
                <p className="text-sm font-semibold text-white leading-snug line-clamp-1">{blog.title}</p>
                <p className="text-[11px] text-slate-500">{blog.authorName} · {blog.publishedAt} · {blog.readTime} min read</p>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                <Link href={`/blogs/${blog.slug}`} target="_blank"
                  className="w-8 h-8 rounded-lg glass-xs flex items-center justify-center text-slate-400 hover:text-brand-400 transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                </Link>
                <Link href="/blog-dashboard/compose"
                  className="w-8 h-8 rounded-lg glass-xs flex items-center justify-center text-slate-400 hover:text-teal-400 transition-colors">
                  <PencilLine className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA banner */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="glass-card p-5 flex items-center justify-between gap-4 border-brand-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl glass-brand flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-brand-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Scholar Blog Editor</p>
            <p className="text-xs text-slate-400">Rich text editor with Tiptap — compose and format your posts with ease</p>
          </div>
        </div>
        <Link href="/blog-dashboard/compose" className="btn-primary text-sm gap-2 flex-shrink-0">
          Open Editor <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  );
}
