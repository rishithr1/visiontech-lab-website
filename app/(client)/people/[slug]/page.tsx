import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPersonBySlug, getAllSlugs, ROLE_CONFIG } from "@/lib/data/people";
import PersonProfileClient from "./PersonProfileClient";

// ─── Static generation ────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// ─── Dynamic Metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const person = getPersonBySlug(params.slug);
  if (!person) return { title: "Person Not Found" };

  return {
    title: `${person.name} — Vision Technology Lab, IIT Tirupati`,
    description: `${person.designation} at Vision Technology Lab, IIT Tirupati. Research: ${person.researchAreas.join(", ")}.`,
    openGraph: {
      title: `${person.name} | VTL IIT Tirupati`,
      description: person.about.slice(0, 160) + "…",
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PersonPage({ params }: { params: { slug: string } }) {
  const person = getPersonBySlug(params.slug);
  if (!person) notFound();

  return <PersonProfileClient person={person} />;
}
