"use client";

import React, { useState, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import TiptapLink from "@tiptap/extension-link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bold, Code, Code2, Eye, EyeOff, Heading1, Heading2, Heading3,
  Image as ImageIcon, Italic, Link as LinkIcon, List, ListOrdered,
  Minus, Quote, Redo, Save, Send, Strikethrough, Tag, Type, Undo, X,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// ─── Sample authors ───────────────────────────────────────────────────────────
const AUTHORS = [
  { name: "Dr. Kalidas S.",      role: "Principal Investigator" },
  { name: "Rishith Reddy V S",   role: "PhD Scholar" },
  { name: "Arjun Mehta",         role: "MS Scholar" },
  { name: "Lakshmi Krishnan",    role: "MS Scholar" },
  { name: "Thilak Nair",         role: "MS Scholar" },
  { name: "Meera Varghese",      role: "Research Engineer" },
];

// ─── Toolbar Button ───────────────────────────────────────────────────────────
function ToolbarBtn({
  onClick, active = false, title, children, disabled = false,
}: {
  onClick: () => void; active?: boolean; title: string;
  children: React.ReactNode; disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-150 ${
        active
          ? "bg-brand-600/50 text-brand-200 border border-brand-500/50"
          : "text-slate-400 hover:text-white hover:bg-white/10"
      } ${disabled ? "opacity-30 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}

// ─── Divider ─────────────────────────────────────────────────────────────────
const ToolbarDivider = () => <div className="w-px h-5 bg-white/10 mx-0.5 flex-shrink-0" />;

// ─── Compose Page ─────────────────────────────────────────────────────────────
export default function ComposePage() {
  // ── Metadata ────────────────────────────────────────────────────
  const [title,       setTitle]       = useState("");
  const [excerpt,     setExcerpt]     = useState("");
  const [coverImage,  setCoverImage]  = useState("");
  const [author,      setAuthor]      = useState(AUTHORS[0].name);
  const [tagInput,    setTagInput]    = useState("");
  const [tags,        setTags]        = useState<string[]>([]);
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split("T")[0]);
  const [readTime,    setReadTime]    = useState(5);
  const [isFeatured,  setIsFeatured]  = useState(false);

  // ── UI state ────────────────────────────────────────────────────
  const [previewMode,   setPreviewMode]   = useState(false);
  const [linkDialogOpen,setLinkDialogOpen]= useState(false);
  const [linkUrl,       setLinkUrl]       = useState("");
  const [imageDialogOpen,setImageDialogOpen]=useState(false);
  const [imageUrl,      setImageUrl]      = useState("");
  const [saving,        setSaving]        = useState(false);

  // ── Tiptap Editor Setup ─────────────────────────────────────────
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading:     { levels: [1, 2, 3] },
        codeBlock:   { languageClassPrefix: "language-" },
        blockquote:  {},
        bulletList:  {},
        orderedList: {},
        horizontalRule: {},
      }),
      TiptapImage.configure({ inline: false, allowBase64: true }),
      TiptapLink.configure({ openOnClick: false, HTMLAttributes: { class: "text-brand-400 underline underline-offset-2 hover:text-brand-300" } }),
    ],
    content: "<p>Start writing your blog post here…</p>",
    editorProps: {
      attributes: {
        class: [
          "prose prose-invert prose-lg max-w-none min-h-[560px] focus:outline-none px-8 py-6",
          "prose-headings:font-display prose-headings:text-white",
          "prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-4",
          "prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-3 prose-h2:mt-10",
          "prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-2 prose-h3:mt-7 prose-h3:text-brand-200",
          "prose-p:text-slate-300 prose-p:leading-[1.85] prose-p:mb-4",
          "prose-a:text-brand-400 prose-a:no-underline hover:prose-a:text-brand-300",
          "prose-strong:text-white prose-strong:font-semibold",
          "prose-blockquote:border-l-brand-500 prose-blockquote:bg-brand-600/08 prose-blockquote:rounded-r-xl prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-slate-300",
          "prose-code:text-brand-300 prose-code:bg-white/08 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:before:content-none prose-code:after:content-none",
          "prose-pre:bg-navy-900 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl prose-pre:shadow-glass-md",
          "prose-ul:text-slate-300 prose-ol:text-slate-300 prose-li:marker:text-brand-400",
          "prose-hr:border-white/10",
          "prose-img:rounded-2xl prose-img:shadow-glass-lg",
        ].join(" "),
      },
    },
  });

  // ── Link insertion ──────────────────────────────────────────────
  const insertLink = useCallback(() => {
    if (!editor) return;
    const url = linkUrl.trim();
    if (!url) { editor.chain().focus().unsetLink().run(); setLinkDialogOpen(false); return; }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    setLinkUrl(""); setLinkDialogOpen(false);
  }, [editor, linkUrl]);

  // ── Image insertion ─────────────────────────────────────────────
  const insertImage = useCallback(() => {
    if (!editor || !imageUrl.trim()) return;
    editor.chain().focus().setImage({ src: imageUrl.trim() }).run();
    setImageUrl(""); setImageDialogOpen(false);
  }, [editor, imageUrl]);

  // ── Save / Publish ──────────────────────────────────────────────
  const handleSave = async (publish: boolean) => {
    if (!title.trim()) { toast.error("Please add a title before saving."); return; }
    if (!editor)       { toast.error("Editor not initialised."); return; }
    setSaving(true);
    const payload = {
      title, excerpt, coverImage, author, tags, publishDate, readTime,
      isFeatured, content: editor.getHTML(), isDraft: !publish,
    };
    // In production: await fetch('/api/admin/blogs', { method: 'POST', body: JSON.stringify(payload) })
    console.log("[VTL Admin] Blog save payload:", payload);
    await new Promise((r) => setTimeout(r, 900));
    setSaving(false);
    toast.success(publish ? "🎉 Post published successfully!" : "Draft saved!");
  };

  const wordCount = editor ? editor.getText().split(/\s+/).filter(Boolean).length : 0;
  const estimatedRead = Math.max(1, Math.ceil(wordCount / 200));

  if (!editor) return (
    <div className="flex items-center justify-center h-[calc(100vh-56px)]">
      <div className="text-slate-500 text-sm">Loading editor…</div>
    </div>
  );

  return (
    <div className="h-[calc(100vh-56px)] flex overflow-hidden">
      <Toaster position="top-right" toastOptions={{ style: { background: "#1e2a52", color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.1)" } }} />

      {/* ── Main editor area ─────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden border-r border-white/08">

        {/* Title input */}
        <div className="px-8 pt-7 pb-3 flex-shrink-0 border-b border-white/06">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your Blog Post Title…"
            className="w-full bg-transparent text-3xl font-display font-bold text-white placeholder-white/20 focus:outline-none resize-none"
            id="blog-title-input"
          />
          <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-600">
            <span>{wordCount} words</span>
            <span>~{estimatedRead} min read</span>
            <button onClick={() => setPreviewMode((v) => !v)}
              className="flex items-center gap-1 text-brand-500 hover:text-brand-400 transition-colors">
              {previewMode ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              {previewMode ? "Exit Preview" : "Preview"}
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <AnimatePresence>
          {!previewMode && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="flex-shrink-0 border-b border-white/08 px-4 py-2 flex items-center gap-0.5 flex-wrap glass-navbar">

              {/* History */}
              <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} title="Undo" disabled={!editor.can().undo()}>
                <Undo className="w-3.5 h-3.5" />
              </ToolbarBtn>
              <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} title="Redo" disabled={!editor.can().redo()}>
                <Redo className="w-3.5 h-3.5" />
              </ToolbarBtn>
              <ToolbarDivider />

              {/* Text formatting */}
              <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold (Ctrl+B)">
                <Bold className="w-3.5 h-3.5" />
              </ToolbarBtn>
              <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic (Ctrl+I)">
                <Italic className="w-3.5 h-3.5" />
              </ToolbarBtn>
              <ToolbarBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough">
                <Strikethrough className="w-3.5 h-3.5" />
              </ToolbarBtn>
              <ToolbarBtn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Inline Code">
                <Code className="w-3.5 h-3.5" />
              </ToolbarBtn>
              <ToolbarDivider />

              {/* Headings */}
              <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="Heading 1">
                <Heading1 className="w-3.5 h-3.5" />
              </ToolbarBtn>
              <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2">
                <Heading2 className="w-3.5 h-3.5" />
              </ToolbarBtn>
              <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3">
                <Heading3 className="w-3.5 h-3.5" />
              </ToolbarBtn>
              <ToolbarDivider />

              {/* Blocks */}
              <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List">
                <List className="w-3.5 h-3.5" />
              </ToolbarBtn>
              <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered List">
                <ListOrdered className="w-3.5 h-3.5" />
              </ToolbarBtn>
              <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Blockquote">
                <Quote className="w-3.5 h-3.5" />
              </ToolbarBtn>
              <ToolbarBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="Code Block">
                <Code2 className="w-3.5 h-3.5" />
              </ToolbarBtn>
              <ToolbarBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Rule">
                <Minus className="w-3.5 h-3.5" />
              </ToolbarBtn>
              <ToolbarDivider />

              {/* Link */}
              <ToolbarBtn onClick={() => { setLinkUrl(editor.getAttributes("link").href ?? ""); setLinkDialogOpen(true); }}
                active={editor.isActive("link")} title="Insert Link">
                <LinkIcon className="w-3.5 h-3.5" />
              </ToolbarBtn>

              {/* Image */}
              <ToolbarBtn onClick={() => setImageDialogOpen(true)} title="Insert Image">
                <ImageIcon className="w-3.5 h-3.5" />
              </ToolbarBtn>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Editor / Preview content */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {previewMode ? (
              <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="px-8 py-8 max-w-3xl mx-auto">
                {/* Preview header */}
                {title && <h1 className="text-3xl font-display font-bold text-white mb-3 leading-tight">{title}</h1>}
                {excerpt && <p className="text-slate-400 text-lg mb-6 leading-relaxed">{excerpt}</p>}
                {coverImage && (
                  <div className="rounded-2xl overflow-hidden mb-8 aspect-video">
                    <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                  </div>
                )}
                <div
                  className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-slate-300 prose-p:leading-[1.85] prose-a:text-brand-400 prose-strong:text-white prose-code:text-brand-300 prose-code:bg-white/08 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-blockquote:border-l-brand-500 prose-blockquote:bg-brand-600/08 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-slate-300 prose-li:marker:text-brand-400 prose-hr:border-white/10 prose-img:rounded-2xl"
                  dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
                />
              </motion.div>
            ) : (
              <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <EditorContent editor={editor} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Metadata Sidebar ─────────────────────────────────────────────── */}
      <aside className="w-72 xl:w-80 flex-shrink-0 overflow-y-auto p-4 space-y-4">
        {/* Publish actions */}
        <div className="glass-card p-4 space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Publish</h3>
          <button onClick={() => handleSave(true)} disabled={saving}
            className="btn-primary w-full justify-center gap-2 text-sm py-2.5">
            {saving ? (
              <motion.div className="w-4 h-4 rounded-full border-2 border-brand-300/40 border-t-brand-300" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {saving ? "Publishing…" : "Publish Post"}
          </button>
          <button onClick={() => handleSave(false)} disabled={saving}
            className="btn-ghost w-full justify-center gap-2 text-sm py-2.5">
            <Save className="w-4 h-4" /> Save Draft
          </button>
          {/* Featured toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-white/08">
            <span className="text-xs text-slate-400">Mark as Featured</span>
            <button onClick={() => setIsFeatured((v) => !v)}
              className={`relative w-9 h-5 rounded-full transition-colors duration-300 ${isFeatured ? "bg-gold-500" : "bg-white/15"}`}>
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${isFeatured ? "left-[18px]" : "left-0.5"}`} />
            </button>
          </div>
        </div>

        {/* Author */}
        <div className="glass-card p-4 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Author</h3>
          <div className="relative">
            <select value={author} onChange={(e) => setAuthor(e.target.value)}
              className="input-glass w-full text-sm py-2 pr-8 appearance-none cursor-pointer">
              {AUTHORS.map((a) => (
                <option key={a.name} value={a.name}>{a.name} ({a.role})</option>
              ))}
            </select>
            <Type className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Excerpt */}
        <div className="glass-card p-4 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Excerpt</h3>
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3}
            placeholder="A compelling one-sentence summary shown on the blog listing card…"
            className="input-glass w-full text-xs py-2 resize-none leading-relaxed" />
        </div>

        {/* Cover Image */}
        <div className="glass-card p-4 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Cover Image</h3>
          <input value={coverImage} onChange={(e) => setCoverImage(e.target.value)}
            placeholder="https://images.unsplash.com/…" className="input-glass w-full text-xs py-2" />
          <AnimatePresence>
            {coverImage && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="rounded-xl overflow-hidden aspect-video border border-white/10 mt-2">
                <img src={coverImage} alt="cover preview" className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.2"; }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tags */}
        <div className="glass-card p-4 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
            <Tag className="w-3 h-3 text-brand-400" /> Tags
          </h3>
          <div className="flex gap-1.5">
            <input value={tagInput} onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const t = tagInput.trim();
                  if (t && !tags.includes(t)) { setTags((p) => [...p, t]); setTagInput(""); }
                }
              }}
              placeholder="Enter tag + Return" className="input-glass flex-1 text-xs py-2" />
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 badge-brand text-[10px]">
                  {tag}
                  <button onClick={() => setTags((p) => p.filter((t) => t !== tag))}><X className="w-2 h-2" /></button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Publish date + read time */}
        <div className="glass-card p-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Settings</h3>
          <div className="space-y-1.5">
            <label className="label-admin">Publish Date</label>
            <input type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)}
              className="input-glass w-full text-xs py-2" />
          </div>
          <div className="space-y-1.5">
            <label className="label-admin">Est. Read Time (min) — auto: {estimatedRead}</label>
            <input type="number" min={1} value={readTime} onChange={(e) => setReadTime(Number(e.target.value))}
              className="input-glass w-full text-xs py-2" />
          </div>
        </div>

        {/* HTML Output toggle */}
        <div className="glass-card p-4 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">HTML Output</h3>
          <details className="group">
            <summary className="text-[10px] text-slate-500 cursor-pointer hover:text-slate-300 transition-colors">Click to view raw HTML</summary>
            <pre className="mt-2 text-[9px] text-slate-500 overflow-auto max-h-48 leading-relaxed whitespace-pre-wrap break-all">
              {editor.getHTML()}
            </pre>
          </details>
        </div>
      </aside>

      {/* ── Link Dialog ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {linkDialogOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, y: 8 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 8 }}
              className="glass-strong border border-white/15 rounded-2xl p-6 w-full max-w-sm shadow-glass-lg space-y-4">
              <h3 className="text-sm font-bold text-white">Insert Link</h3>
              <input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && insertLink()}
                placeholder="https://example.com" autoFocus
                className="input-glass w-full text-sm py-2.5 font-mono" />
              <div className="flex gap-2">
                <button onClick={insertLink} className="btn-primary text-sm flex-1 py-2.5">Insert</button>
                <button onClick={() => { editor.chain().focus().unsetLink().run(); setLinkDialogOpen(false); }}
                  className="btn-ghost text-sm px-4">Remove</button>
                <button onClick={() => setLinkDialogOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-xl glass-xs text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Image Dialog ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {imageDialogOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, y: 8 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 8 }}
              className="glass-strong border border-white/15 rounded-2xl p-6 w-full max-w-sm shadow-glass-lg space-y-4">
              <h3 className="text-sm font-bold text-white">Insert Image</h3>
              <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && insertImage()}
                placeholder="https://images.unsplash.com/…" autoFocus
                className="input-glass w-full text-sm py-2.5 font-mono" />
              {imageUrl && (
                <div className="rounded-xl overflow-hidden aspect-video border border-white/10">
                  <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex gap-2">
                <button onClick={insertImage} className="btn-primary text-sm flex-1 py-2.5">Insert Image</button>
                <button onClick={() => setImageDialogOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-xl glass-xs text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
