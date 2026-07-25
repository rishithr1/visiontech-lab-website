"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Briefcase,
  Calendar,
  ChevronDown,
  FileText,
  FlaskConical,
  Lightbulb,
  Menu,
  Microscope,
  Shield,
  Users,
  X,
  Zap,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavLink {
  label: string;
  href: string;
}

interface ResearchSubItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  description: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const researchSubItems: ResearchSubItem[] = [
  {
    label: "Publications",
    href: "/research/publications",
    icon: <BookOpen className="w-5 h-5" />,
    description: "Peer-reviewed papers & conference proceedings",
  },
  {
    label: "Projects & Grants",
    href: "/research/projects-grants",
    icon: <Briefcase className="w-5 h-5" />,
    description: "Funded research projects and institutional grants",
  },
  {
    label: "Patents",
    href: "/research/patents",
    icon: <Shield className="w-5 h-5" />,
    description: "Filed patents and Invention Disclosure Forms",
  },
];

const mainNavLinks: NavLink[] = [
  { label: "News & Events", href: "/news-events" },
  { label: "People",        href: "/people" },
  { label: "Careers",       href: "/careers" },
  { label: "Blogs",         href: "/blogs" },
];

// ─── Animated Hamburger Icon ──────────────────────────────────────────────────
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative w-6 h-5 flex flex-col justify-between cursor-pointer">
      <span
        className={`block h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${
          isOpen ? "rotate-45 translate-y-2.5" : ""
        }`}
      />
      <span
        className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${
          isOpen ? "opacity-0 scale-x-0" : ""
        }`}
      />
      <span
        className={`block h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${
          isOpen ? "-rotate-45 -translate-y-2" : ""
        }`}
      />
    </div>
  );
}

// ─── Research Dropdown ────────────────────────────────────────────────────────
function ResearchDropdown({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[380px] transition-all duration-300 ${
        isOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
    >
      {/* Arrow tip */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 glass-strong border-t border-l border-white/10 z-10" />

      {/* Dropdown panel */}
      <div className="relative z-20 glass-strong rounded-2xl overflow-hidden p-2 shadow-glass-lg border border-white/10">
        {/* Header */}
        <div className="px-4 py-3 mb-1">
          <div className="flex items-center gap-2 mb-1">
            <FlaskConical className="w-4 h-4 text-brand-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-400">
              Research
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Explore our research output and ongoing work
          </p>
        </div>

        <div className="h-px bg-white/08 mx-2 mb-2" />

        {/* Sub-items */}
        {researchSubItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="group flex items-start gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-200 hover:bg-white/08"
          >
            {/* Icon blob */}
            <div className="flex-shrink-0 w-9 h-9 rounded-lg glass-brand flex items-center justify-center text-brand-300 group-hover:text-brand-200 transition-colors">
              {item.icon}
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-100 group-hover:text-white transition-colors">
                {item.label}
              </div>
              <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                {item.description}
              </div>
            </div>
          </Link>
        ))}

        {/* Footer CTA */}
        <div className="h-px bg-white/08 mx-2 mt-2 mb-3" />
        <Link
          href="/research/publications"
          onClick={onClose}
          className="flex items-center justify-center gap-2 mx-2 py-2.5 rounded-xl text-xs font-semibold text-brand-300 hover:text-white hover:bg-brand-600/30 transition-all duration-200"
        >
          <Zap className="w-3.5 h-3.5" />
          View All Research Output
        </Link>
      </div>
    </div>
  );
}

// ─── Main Navbar Component ────────────────────────────────────────────────────
export default function Navbar() {
  const pathname = usePathname();

  // ── Hide entirely on all admin & blog-dashboard routes ───────
  if (pathname.startsWith("/admin") || pathname.startsWith("/blog-dashboard")) return null;

  const [scrolled, setScrolled]                 = useState(false);
  const [mobileOpen, setMobileOpen]             = useState(false);
  const [researchOpen, setResearchOpen]         = useState(false);
  const [mobileResearchOpen, setMobileResearchOpen] = useState(false);

  const researchRef = useRef<HTMLLIElement>(null);
  const mobileRef   = useRef<HTMLDivElement>(null);

  // ─── Scroll handler ────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ─── Close mobile on route change ─────────────────────────────
  useEffect(() => {
    setMobileOpen(false);
    setResearchOpen(false);
    setMobileResearchOpen(false);
  }, [pathname]);

  // ─── Close dropdown on outside click ──────────────────────────
  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (researchRef.current && !researchRef.current.contains(e.target as Node)) {
      setResearchOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [handleOutsideClick]);

  // ─── Lock body scroll when mobile menu is open ─────────────────
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // ─── Active link check ─────────────────────────────────────────
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isResearchActive = [
    "/research/publications",
    "/research/projects-grants",
    "/research/patents",
  ].some((h) => pathname.startsWith(h));

  return (
    <>
      {/* ── Navbar ─────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-navbar shadow-glass-md" : "bg-transparent"
        }`}
        role="banner"
      >
        <nav
          className="section-container flex items-center justify-between h-[72px]"
          aria-label="Main navigation"
        >
          {/* ── Logo ─────────────────────────────────────────────── */}
          <Link
            href="/"
            className="flex items-center gap-3 group flex-shrink-0"
            aria-label="Vision Technology Lab — Home"
          >
            {/* Logo mark */}
            <div className="relative w-10 h-10 rounded-xl glass-brand flex items-center justify-center shadow-brand-sm group-hover:shadow-brand-md transition-all duration-300 group-hover:scale-105">
              <Microscope className="w-5 h-5 text-brand-300" />
              {/* Animated ring */}
              <div className="absolute inset-0 rounded-xl border border-brand-500/40 group-hover:border-brand-400/70 transition-colors duration-300" />
            </div>

            {/* Word mark */}
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-display font-bold text-white text-sm tracking-tight">
                Vision Tech Lab
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider font-medium uppercase mt-0.5">
                IIT Tirupati
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ──────────────────────────────────────── */}
          <ul
            className="hidden lg:flex items-center gap-1"
            role="menubar"
            aria-label="Primary navigation"
          >
            {/* About (anchor link to homepage section) */}
            <li role="none">
              <Link
                href="/#about"
                className={`btn-ghost text-sm transition-all duration-200 ${
                  isActive("/#about") ? "text-white bg-white/10" : "text-slate-300 hover:text-white"
                }`}
                role="menuitem"
              >
                About
              </Link>
            </li>

            {/* Research dropdown */}
            <li role="none" className="relative" ref={researchRef}>
              <button
                onClick={() => setResearchOpen((v) => !v)}
                onMouseEnter={() => setResearchOpen(true)}
                className={`btn-ghost text-sm flex items-center gap-1.5 transition-all duration-200 ${
                  isResearchActive || researchOpen
                    ? "text-white bg-white/10"
                    : "text-slate-300 hover:text-white"
                }`}
                aria-haspopup="true"
                aria-expanded={researchOpen}
                role="menuitem"
                id="research-menu-btn"
              >
                Research
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    researchOpen ? "rotate-180 text-brand-400" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              <div onMouseLeave={() => setResearchOpen(false)}>
                <ResearchDropdown
                  isOpen={researchOpen}
                  onClose={() => setResearchOpen(false)}
                />
              </div>
            </li>

            {/* Main nav links */}
            {mainNavLinks.map((link) => (
              <li key={link.href} role="none">
                <Link
                  href={link.href}
                  className={`btn-ghost text-sm transition-all duration-200 ${
                    isActive(link.href)
                      ? "text-white bg-white/10"
                      : "text-slate-300 hover:text-white"
                  }`}
                  role="menuitem"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Desktop CTA ──────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/admin/login"
              className="text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/06"
            >
              Admin
            </Link>
            <Link href="/#contact" className="btn-primary text-sm py-2 px-5">
              Contact Us
            </Link>
          </div>

          {/* ── Mobile Hamburger ─────────────────────────────────── */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <HamburgerIcon isOpen={mobileOpen} />
          </button>
        </nav>
      </header>

      {/* ── Mobile Menu Overlay ─────────────────────────────────────── */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-400 ${
          mobileOpen ? "visible" : "invisible"
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-navy-950/80 backdrop-blur-sm transition-opacity duration-400 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer */}
        <div
          ref={mobileRef}
          className={`absolute top-0 right-0 h-full w-[320px] max-w-[90vw] glass-strong border-l border-white/10 flex flex-col transition-transform duration-400 ease-in-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-label="Mobile navigation"
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 h-[72px] border-b border-white/08">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg glass-brand flex items-center justify-center">
                <Microscope className="w-4 h-4 text-brand-300" />
              </div>
              <span className="font-display font-bold text-white text-sm">VTL</span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close mobile menu"
            >
              <X className="w-5 h-5 text-slate-300" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
            <Link
              href="/#about"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-200 hover:text-white hover:bg-white/08 transition-all duration-200 font-medium"
            >
              <Lightbulb className="w-4 h-4 text-brand-400" />
              About
            </Link>

            {/* Research accordion */}
            <div>
              <button
                onClick={() => setMobileResearchOpen((v) => !v)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-slate-200 hover:text-white hover:bg-white/08 transition-all duration-200 font-medium"
                aria-expanded={mobileResearchOpen}
              >
                <div className="flex items-center gap-3">
                  <FlaskConical className="w-4 h-4 text-brand-400" />
                  Research
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                    mobileResearchOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Research sub-items */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  mobileResearchOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-4 pr-2 py-2 space-y-1">
                  {researchSubItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/08 transition-all duration-200"
                    >
                      <span className="text-brand-400">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Other main links */}
            {[
              { label: "News & Events", href: "/news-events",  icon: <Calendar className="w-4 h-4 text-brand-400" /> },
              { label: "People",        href: "/people",        icon: <Users className="w-4 h-4 text-brand-400" /> },
              { label: "Careers",       href: "/careers",       icon: <Briefcase className="w-4 h-4 text-brand-400" /> },
              { label: "Blogs",         href: "/blogs",         icon: <FileText className="w-4 h-4 text-brand-400" /> },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? "text-white bg-white/12 border border-white/10"
                    : "text-slate-200 hover:text-white hover:bg-white/08"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Drawer footer */}
          <div className="px-4 py-6 border-t border-white/08 space-y-3">
            <Link
              href="/#contact"
              className="btn-primary w-full justify-center text-sm"
              onClick={() => setMobileOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              href="/admin/login"
              className="btn-secondary w-full justify-center text-sm"
              onClick={() => setMobileOpen(false)}
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
