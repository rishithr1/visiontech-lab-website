import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogBySlug, getAllBlogSlugs } from "@/lib/data/blogs";
import BlogReaderClient from "./BlogReaderClient";

// ─── Static generation ────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

// ─── Dynamic metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const blog = getBlogBySlug(params.slug);
  if (!blog) return { title: "Blog Not Found" };

  return {
    title: `${blog.title} | VTL Blog`,
    description: blog.excerpt,
    authors: [{ name: blog.authorName }],
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      publishedTime: blog.publishedISO,
      authors: [blog.authorName],
      images: blog.coverImage ? [{ url: blog.coverImage, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: blog.coverImage ? [blog.coverImage] : [],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BlogPage({ params }: { params: { slug: string } }) {
  const blog = getBlogBySlug(params.slug);
  if (!blog) notFound();

  return <BlogReaderClient blog={blog} />;
}
