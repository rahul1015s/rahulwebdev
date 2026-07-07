"use client";

import React, { useState } from "react";
import NovelEditor from "@/components/admin/NovelEditor";
import CoverImageField from "@/components/admin/CoverImageField";
import ImageListField from "@/components/admin/ImageListField";
import StringListField from "@/components/admin/StringListField";
import api from "@/lib/api";
import { getApiErrorMessage } from "@/lib/api-error";

export default function NewCaseStudyPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [stack, setStack] = useState<string[]>([]);
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [featured, setFeatured] = useState(false);
  const [category, setCategory] = useState<string[]>([]);
  const [deliverables, setDeliverables] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [client, setClient] = useState("");
  const [team, setTeam] = useState<string[]>([]);
  const [challenges, setChallenges] = useState<string[]>([]);
  const [solutions, setSolutions] = useState<string[]>([]);
  const [results, setResults] = useState<string[]>([]);
  const [published, setPublished] = useState(true);
  const [order, setOrder] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await api.post("/api/admin/case-studies", {
        name,
        slug,
        tagline,
        description,
        content,
        coverImage,
        gallery,
        stack,
        liveUrl,
        githubUrl,
        featured,
        category,
        deliverables,
        timeline,
        client,
        team,
        challenges,
        solutions,
        results,
        published,
        order,
      });

      const data = res.data;
      if (data.ok) {
        setMessage("✓ Case study created");
        setName("");
        setSlug("");
        setTagline("");
        setDescription("");
        setContent("");
        setCoverImage("");
        setGallery([]);
        setStack([]);
        setLiveUrl("");
        setGithubUrl("");
        setFeatured(false);
        setCategory([]);
        setDeliverables([]);
        setTimeline("");
        setClient("");
        setTeam([]);
        setChallenges([]);
        setSolutions([]);
        setResults([]);
        setPublished(true);
        setOrder(0);
        setResetKey((key) => key + 1);
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage(`✗ Error: ${data.error || "unknown"}`);
      }
    } catch (err: unknown) {
      setMessage(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold">Create Case Study</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Build a polished project story with optimized images, structured highlights, and a better reader experience on the public page.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="rounded-[1.75rem] border border-border/70 bg-card/50 p-5 sm:p-6">
          <h2 className="text-lg font-semibold">Core details</h2>
          <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">Project name *</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Project name"
                className="w-full rounded-lg border border-border/50 px-4 py-2.5"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Slug</label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="auto-generated if empty"
                className="w-full rounded-lg border border-border/50 px-4 py-2.5 text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold">Tagline</label>
              <input
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="One strong line that explains the project"
                className="w-full rounded-lg border border-border/50 px-4 py-2.5"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Short summary for cards, previews, and metadata"
                className="w-full rounded-lg border border-border/50 px-4 py-2.5"
              />
            </div>
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-border/70 bg-card/50 p-5 sm:p-6">
          <h2 className="text-lg font-semibold">Media</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload screenshots directly to ImageKit for optimized delivery.
          </p>
          <div className="mt-5 grid gap-6">
            <CoverImageField
              value={coverImage}
              onChange={setCoverImage}
              label="Cover image"
              folder={process.env.NEXT_PUBLIC_IMAGEKIT_CASE_STUDY_FOLDER || "/case-studies"}
            />
            <ImageListField label="Gallery images" value={gallery} onChange={setGallery} />
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-border/70 bg-card/50 p-5 sm:p-6">
          <h2 className="text-lg font-semibold">Project signals</h2>
          <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
            <StringListField
              label="Tech stack"
              value={stack}
              onChange={setStack}
              placeholder="React"
              helperText="These appear on the public case study page and listing cards."
            />
            <StringListField
              label="Categories"
              value={category}
              onChange={setCategory}
              placeholder="Frontend Engineering"
            />
            <div>
              <label className="mb-2 block text-sm font-semibold">Live URL</label>
              <input
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full rounded-lg border border-border/50 px-4 py-2.5"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">GitHub URL</label>
              <input
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/user/repo"
                className="w-full rounded-lg border border-border/50 px-4 py-2.5"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Client</label>
              <input
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="Client name"
                className="w-full rounded-lg border border-border/50 px-4 py-2.5"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Timeline</label>
              <input
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                placeholder="6 weeks, Jan-Mar 2026"
                className="w-full rounded-lg border border-border/50 px-4 py-2.5"
              />
            </div>
            <StringListField label="Team" value={team} onChange={setTeam} placeholder="Designer" />
            <StringListField
              label="Deliverables"
              value={deliverables}
              onChange={setDeliverables}
              placeholder="Marketing site"
            />
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-border/70 bg-card/50 p-5 sm:p-6">
          <h2 className="text-lg font-semibold">Story and outcome</h2>
          <div className="mt-5 grid gap-6">
            <StringListField
              label="Challenges"
              value={challenges}
              onChange={setChallenges}
              placeholder="Slow landing page performance"
            />
            <StringListField
              label="Solutions"
              value={solutions}
              onChange={setSolutions}
              placeholder="Rebuilt media delivery with optimized assets"
            />
            <StringListField
              label="Results"
              value={results}
              onChange={setResults}
              placeholder="Core Web Vitals improved"
            />
            <div>
              <label className="mb-2 block text-sm font-semibold">Main content *</label>
              <NovelEditor key={resetKey} value={content} onChange={setContent} />
            </div>
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-border/70 bg-card/50 p-5 sm:p-6">
          <h2 className="text-lg font-semibold">Publishing</h2>
          <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/30 p-4">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="featured" className="flex-1 cursor-pointer text-sm font-semibold">
                Featured project
              </label>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/30 p-4">
              <input
                type="checkbox"
                id="published"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="published" className="flex-1 cursor-pointer text-sm font-semibold">
                Publish on `/case-studies`
              </label>
              <span
                className={`rounded px-2 py-1 text-xs font-medium ${
                  published ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                }`}
              >
                {published ? "Published" : "Draft"}
              </span>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Order</label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                placeholder="0"
                className="w-full rounded-lg border border-border/50 px-4 py-2.5"
              />
            </div>
          </div>
        </section>

        <div className="flex items-center gap-4 pt-2">
          <button
            disabled={loading || !name || !content}
            type="submit"
            className="rounded-lg bg-primary px-5 py-2.5 text-primary-foreground"
          >
            {loading ? "Creating..." : "Create Case Study"}
          </button>
          {message ? (
            <div className={`text-sm font-medium ${message.startsWith("✓") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}
