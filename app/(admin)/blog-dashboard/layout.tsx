"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, LayoutDashboard, Microscope, PencilLine } from "lucide-react";

export default function BlogDashboardLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Minimal Top Bar ─────────────────────────────────────────────────── */}
      <header className="h-14 glass-navbar border-b border-white/08 flex items-center px-4 gap-4 flex-shrink-0 sticky top-0 z-40">
        {/* Logo */}
        <Link href="/admin/dashboard" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="w-8 h-8 rounded-lg glass-brand flex items-center justify-center group-hover:scale-105 transition-transform">
            <Microscope className="w-4 h-4 text-brand-300" />
          </div>
          <div className="hidden sm:block">
            <div className="text-xs font-bold text-white leading-tight">VTL Blog</div>
            <div className="text-[9px] text-slate-500 uppercase tracking-wider">Scholar Editor</div>
          </div>
        </Link>

        <div className="h-5 w-px bg-white/10 mx-1 hidden sm:block" />

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <PencilLine className="w-3 h-3 text-brand-400" />
          <span>Compose</span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Back to admin */}
        <Link href="/admin/blogs"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-xs text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200">
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Admin Dashboard</span>
        </Link>
      </header>

      {/* ── Page Content ─────────────────────────────────────────────────────── */}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
