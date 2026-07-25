import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/client/Navbar";
import Footer from "@/components/client/Footer";

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default:  "Vision Technology Lab — IIT Tirupati",
    template: "%s | Vision Technology Lab, IIT Tirupati",
  },
  description:
    "The Vision Technology Lab at IIT Tirupati conducts cutting-edge research in computer vision, machine learning, and AI-driven perception. Explore our publications, projects, people, and open positions.",
  keywords: [
    "Vision Technology Lab",
    "IIT Tirupati",
    "Computer Vision",
    "Machine Learning",
    "AI Research",
    "Deep Learning",
    "Kalidas",
    "Research Lab India",
  ],
  authors:  [{ name: "Vision Technology Lab, IIT Tirupati" }],
  creator:  "Vision Technology Lab",
  robots:   { index: true, follow: true },
  metadataBase: new URL("https://vtl.iittp.ac.in"),
  openGraph: {
    type:        "website",
    locale:      "en_IN",
    url:         "https://vtl.iittp.ac.in",
    siteName:    "Vision Technology Lab — IIT Tirupati",
    title:       "Vision Technology Lab — IIT Tirupati",
    description:
      "Cutting-edge research in computer vision, machine learning, and AI at IIT Tirupati.",
    images: [
      {
        url:    "/og-image.png",
        width:  1200,
        height: 630,
        alt:    "Vision Technology Lab, IIT Tirupati",
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Vision Technology Lab — IIT Tirupati",
    description: "Cutting-edge AI & Computer Vision research at IIT Tirupati.",
    images:      ["/og-image.png"],
  },
};

// ─── Viewport ────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width:              "device-width",
  initialScale:       1,
  maximumScale:       5,
  themeColor:         [
    { media: "(prefers-color-scheme: dark)",  color: "#0c1124" },
    { media: "(prefers-color-scheme: light)", color: "#1e2a52" },
  ],
};

// ─── Root Layout ─────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon family */}
        <link rel="icon"             href="/favicon.ico"          sizes="any" />
        <link rel="icon"             href="/favicon.svg"          type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest"         href="/site.webmanifest" />
      </head>

      <body
        className="
          font-sans
          bg-navy-950
          text-slate-200
          antialiased
          min-h-screen
          overflow-x-hidden
          selection:bg-brand-500/30
          selection:text-white
        "
      >
        {/* ── Persistent background mesh ──────────────────────────────────────
            A subtle animated noise mesh that sits behind every page.
            pointer-events-none ensures it never intercepts clicks.           */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          aria-hidden="true"
        >
          {/* Base gradient */}
          <div className="absolute inset-0 bg-hero-gradient" />

          {/* Animated mesh blobs */}
          <div className="absolute inset-0 bg-mesh-gradient opacity-60" />

          {/* Subtle grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />

          {/* Top ambient glow */}
          <div className="absolute -top-64 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-600/12 rounded-full blur-3xl" />

          {/* Bottom ambient glow */}
          <div className="absolute -bottom-64 right-0 w-[600px] h-[600px] bg-teal-600/08 rounded-full blur-3xl" />
        </div>

        {/* ── Navbar ────────────────────────────────────────────────────────── */}
        <Navbar />

        {/* ── Main content ──────────────────────────────────────────────────── */}
        <main
          id="main-content"
          className="relative z-10"
          tabIndex={-1}
        >
          {children}
        </main>

        {/* ── Footer ────────────────────────────────────────────────────────── */}
        <Footer />

        {/* ── Skip to content (accessibility) ───────────────────────────────── */}
        <a
          href="#main-content"
          className="
            sr-only focus:not-sr-only
            fixed top-4 left-4 z-[100]
            px-4 py-2 rounded-lg
            bg-brand-600 text-white
            font-semibold text-sm
            focus:outline-none focus:ring-2 focus:ring-brand-400
          "
        >
          Skip to main content
        </a>
      </body>
    </html>
  );
}
