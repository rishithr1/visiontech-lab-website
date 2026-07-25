"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Briefcase,
  Calendar,
  ExternalLink,
  FileText,
  FlaskConical,
  Mail,
  MapPin,
  Microscope,
  Phone,
  Shield,
  Users,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────
interface FooterLinkGroup {
  title: string;
  icon: React.ReactNode;
  links: { label: string; href: string; external?: boolean }[];
}

// ─── Footer Link Data ───────────────────────────────────────────────────────
const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Research",
    icon: <FlaskConical className="w-4 h-4" />,
    links: [
      { label: "Publications",     href: "/research/publications" },
      { label: "Projects & Grants",href: "/research/projects-grants" },
      { label: "Patents & IDFs",   href: "/research/patents" },
      { label: "Research Areas",   href: "/#research-areas" },
    ],
  },
  {
    title: "Lab",
    icon: <Users className="w-4 h-4" />,
    links: [
      { label: "About the Lab",  href: "/#about" },
      { label: "People & Scholars", href: "/people" },
      { label: "News & Events",  href: "/news-events" },
      { label: "Blogs",          href: "/blogs" },
    ],
  },
  {
    title: "Opportunities",
    icon: <Briefcase className="w-4 h-4" />,
    links: [
      { label: "Careers",         href: "/careers" },
      { label: "Work With Us",    href: "/careers" },
      { label: "IIT Tirupati",    href: "https://www.iittp.ac.in", external: true },
      { label: "PhD Admissions",  href: "https://www.iittp.ac.in/admissions", external: true },
    ],
  },
];

// ─── Social Icon Components ─────────────────────────────────────────────────
function ResearchGateIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.586 0H4.414A4.414 4.414 0 000 4.414v15.172A4.414 4.414 0 004.414 24h15.172A4.414 4.414 0 0024 19.586V4.414A4.414 4.414 0 0019.586 0zM11.5 17.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-5c-.83 0-1.5-.67-1.5-1.5S14.67 9.5 15.5 9.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-7-2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3.5-4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    </svg>
  );
}

function GoogleScholarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 24a7 7 0 110-14 7 7 0 010 14zm0-24L0 9.5l4.838 3.94A8 8 0 0112 9a8 8 0 017.162 4.44L24 9.5z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// ─── Footer Component ───────────────────────────────────────────────────────
export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname.startsWith("/blog-dashboard")) return null;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-0 overflow-hidden" role="contentinfo" aria-label="Site footer">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900 to-transparent pointer-events-none" />

      {/* Glowing divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />

      {/* Ambient glows */}
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-600/08 rounded-full blur-3xl pointer-events-none" />

      <div className="relative section-container pt-16 pb-8">
        {/* ── Upper Section ─────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-12 pb-12 border-b border-white/08">

          {/* Brand Column (spans 2 cols on xl) */}
          <div className="xl:col-span-2 space-y-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="relative w-12 h-12 rounded-xl glass-brand flex items-center justify-center shadow-brand-sm group-hover:shadow-brand-md transition-all duration-300">
                <Microscope className="w-6 h-6 text-brand-300" />
              </div>
              <div>
                <div className="font-display font-bold text-white text-lg leading-tight">
                  Vision Technology Lab
                </div>
                <div className="text-xs text-slate-400 tracking-wider uppercase mt-0.5">
                  IIT Tirupati
                </div>
              </div>
            </Link>

            {/* Description */}
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Advancing the frontiers of computer vision, machine learning, and
              AI-driven perception systems. Committed to impactful research and
              world-class innovation.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:vtl@iittp.ac.in"
                className="flex items-center gap-3 text-sm text-slate-400 hover:text-brand-300 transition-colors duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg glass-brand flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-3.5 h-3.5 text-brand-400" />
                </div>
                vtl@iittp.ac.in
              </a>
              <a
                href="tel:+918772284055"
                className="flex items-center gap-3 text-sm text-slate-400 hover:text-brand-300 transition-colors duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg glass-brand flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-3.5 h-3.5 text-brand-400" />
                </div>
                +91 877 228 4055
              </a>
              <div className="flex items-start gap-3 text-sm text-slate-400">
                <div className="w-8 h-8 rounded-lg glass-brand flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-400" />
                </div>
                <span>
                  Department of Computer Science &amp; Engineering,
                  <br />
                  IIT Tirupati, Andhra Pradesh — 517619
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {[
                {
                  href: "https://scholar.google.com",
                  label: "Google Scholar",
                  icon: <GoogleScholarIcon className="w-4 h-4" />,
                },
                {
                  href: "https://www.researchgate.net",
                  label: "ResearchGate",
                  icon: <ResearchGateIcon className="w-4 h-4" />,
                },
                {
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                  icon: <LinkedInIcon className="w-4 h-4" />,
                },
                {
                  href: "https://twitter.com",
                  label: "Twitter / X",
                  icon: <TwitterIcon className="w-4 h-4" />,
                },
              ].map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg glass-sm flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-600/30 hover:border-brand-500/40 transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Link Groups */}
          {footerLinkGroups.map((group) => (
            <div key={group.title} className="space-y-4">
              {/* Group header */}
              <div className="flex items-center gap-2">
                <div className="text-brand-400">{group.icon}</div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300">
                  {group.title}
                </h3>
              </div>

              {/* Links */}
              <ul className="space-y-2.5" role="list">
                {group.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-brand-300 transition-colors duration-200 group"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-slate-400 hover:text-brand-300 transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Newsletter Strip ───────────────────────────────── */}
        <div className="my-10 glass-card px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white">Stay Updated</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Get the latest research updates and lab news delivered to your inbox.
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="input-glass text-sm py-2 px-3 flex-1 sm:w-56"
              aria-label="Email address for newsletter"
            />
            <button
              className="btn-primary text-sm py-2 px-4 flex-shrink-0"
              aria-label="Subscribe to newsletter"
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* ── Bottom Bar ────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {currentYear}{" "}
            <span className="text-slate-400 font-medium">Vision Technology Lab, IIT Tirupati</span>
            . All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/sitemap" className="hover:text-slate-300 transition-colors">
              Sitemap
            </Link>
            <Link
              href="/admin/login"
              className="hover:text-slate-300 transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
