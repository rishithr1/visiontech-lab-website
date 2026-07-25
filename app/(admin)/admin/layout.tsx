"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Image,
  LayoutDashboard,
  LogOut,
  Menu,
  Microscope,
  Newspaper,
  Shield,
  Users,
  X,
} from "lucide-react";

// ─── Sidebar Nav Items ────────────────────────────────────────────────────────
const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard className="w-4.5 h-4.5" /> },
  { label: "Carousel", href: "/admin/carousel", icon: <Image className="w-4.5 h-4.5" /> },
  { label: "News & Events", href: "/admin/news", icon: <Newspaper className="w-4.5 h-4.5" /> },
  { label: "Publications", href: "/admin/publications", icon: <BookOpen className="w-4.5 h-4.5" /> },
  { label: "People", href: "/admin/people", icon: <Users className="w-4.5 h-4.5" /> },
  { label: "Careers", href: "/admin/careers", icon: <Briefcase className="w-4.5 h-4.5" /> },
  { label: "Blogs", href: "/admin/blogs", icon: <FileText className="w-4.5 h-4.5" /> },
  { label: "Patents", href: "/admin/patents", icon: <Shield className="w-4.5 h-4.5" /> },
];

// ─── Sidebar Component ────────────────────────────────────────────────────────
function AdminSidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}: {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("vtl_admin_auth");
    router.push("/admin/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* ── Logo ─────────────────────────────────────────────────── */}
      <div className={`flex items-center h-16 px-4 border-b border-white/08 flex-shrink-0 ${collapsed ? "justify-center" : "gap-3"}`}>
        <div className="w-9 h-9 rounded-xl glass-brand flex items-center justify-center flex-shrink-0">
          <Microscope className="w-4.5 h-4.5 text-brand-300" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <div className="font-display font-bold text-white text-sm leading-tight truncate">
              VTL Admin
            </div>
            <div className="text-[9px] text-slate-500 uppercase tracking-wider">IIT Tirupati</div>
          </div>
        )}
      </div>

      {/* ── Section label ────────────────────────────────────────── */}
      {!collapsed && (
        <div className="px-4 pt-5 pb-2">
          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-600">Navigation</span>
        </div>
      )}

      {/* ── Nav items ────────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5" aria-label="Admin navigation">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${collapsed ? "justify-center" : ""
                } ${isActive
                  ? "bg-brand-600/30 text-white border border-brand-500/30"
                  : "text-slate-400 hover:text-white hover:bg-white/07"
                }`}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="admin-active-pill"
                  className="absolute inset-0 rounded-xl bg-brand-600/20 border border-brand-500/25"
                  transition={{ duration: 0.2 }}
                />
              )}

              <span className={`relative flex-shrink-0 transition-transform duration-200 ${isActive ? "text-brand-300" : "text-slate-500 group-hover:text-slate-300 group-hover:scale-110"}`}>
                {item.icon}
              </span>

              {!collapsed && (
                <span className="relative text-sm font-medium truncate">{item.label}</span>
              )}

              {/* Tooltip on collapsed */}
              {collapsed && (
                <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-navy-800 border border-white/10 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-glass-sm">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="h-px bg-white/08 mx-3 my-2" />

      {/* ── Footer links ─────────────────────────────────────────── */}
      <div className={`px-2 pb-4 space-y-0.5 flex-shrink-0`}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-white/06 transition-all duration-200 group ${collapsed ? "justify-center" : ""}`}
        >
          <ExternalLink className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
          {!collapsed && <span className="text-xs">View Public Site</span>}
        </a>

        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/08 transition-all duration-200 group ${collapsed ? "justify-center" : ""}`}
          aria-label="Sign out"
        >
          <LogOut className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
          {!collapsed && <span className="text-xs">Sign Out</span>}
        </button>
      </div>

      {/* ── Collapse toggle (desktop) ─────────────────────────────── */}
      <button
        onClick={onToggle}
        className="hidden lg:flex items-center justify-center h-8 mx-3 mb-3 rounded-lg border border-white/08 text-slate-500 hover:text-white hover:bg-white/08 transition-all duration-200 flex-shrink-0"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed
          ? <ChevronRight className="w-3.5 h-3.5" />
          : <ChevronLeft className="w-3.5 h-3.5" />
        }
      </button>
    </div>
  );

  return (
    <>
      {/* ── Desktop Sidebar ─────────────────────────────────────────────── */}
      <aside
        className={`hidden lg:flex flex-col glass-strong border-r border-white/08 h-screen sticky top-0 flex-shrink-0 overflow-hidden transition-all duration-300 ${collapsed ? "w-[68px]" : "w-[220px]"
          }`}
      >
        <SidebarContent />
      </aside>

      {/* ── Mobile Sidebar Overlay ─────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 lg:hidden bg-navy-950/80 backdrop-blur-sm"
              onClick={onMobileClose}
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-0 left-0 h-full w-[220px] z-50 lg:hidden glass-strong border-r border-white/08 flex flex-col"
            >
              {/* Mobile close button */}
              <button
                onClick={onMobileClose}
                className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Admin Top Bar ────────────────────────────────────────────────────────────
function AdminTopBar({
  collapsed,
  onMobileOpen,
}: {
  collapsed: boolean;
  onMobileOpen: () => void;
}) {
  const pathname = usePathname();
  const currentItem = navItems.find(
    (n) => pathname === n.href || pathname.startsWith(n.href + "/")
  );

  return (
    <header className="h-14 glass-navbar border-b border-white/08 flex items-center px-4 gap-4 flex-shrink-0">
      {/* Mobile hamburger */}
      <button
        onClick={onMobileOpen}
        className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
        aria-label="Open sidebar"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-500">Admin</span>
        <span className="text-slate-600">/</span>
        <span className="text-slate-200 font-medium">{currentItem?.label ?? "Dashboard"}</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Admin pill */}
      <div className="flex items-center gap-2 glass-xs px-3 py-1.5 rounded-lg">
        <div className="w-5 h-5 rounded-md bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center">
          <span className="text-[8px] font-bold text-white">KS</span>
        </div>
        <span className="text-xs text-slate-300 hidden sm:block">Dr. Kalidas S.</span>
      </div>
    </header>
  );
}

// ─── Root Admin Layout ────────────────────────────────────────────────────────
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Simple auth guard (will be replaced with NextAuth middleware)
  useEffect(() => {
    if (!isLoginPage) {
      const auth = sessionStorage.getItem("vtl_admin_auth");
      if (!auth) router.replace("/admin/login");
    }
  }, [isLoginPage, router]);

  // On login page — render just the children (no sidebar/topbar)
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top bar */}
        <AdminTopBar collapsed={collapsed} onMobileOpen={() => setMobileOpen(true)} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
