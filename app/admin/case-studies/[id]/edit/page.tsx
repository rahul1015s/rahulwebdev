"use client";

import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import NovelEditor from "@/components/admin/NovelEditor";
import CoverImageField from "@/components/admin/CoverImageField";
import ImageListField from "@/components/admin/ImageListField";
import StringListField from "@/components/admin/StringListField";
import api from "@/lib/api";
import { getApiErrorMessage } from "@/lib/api-error";

type Props = { params: Promise<{ id: string }> };

export default function EditCaseStudyPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
  const [published, setPublished] = useState(false);
  const [order, setOrder] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const res = await api.get(`/api/admin/case-studies/${id}`);
        const data = res.data;
        if (!mounted) return;

        if (data.ok && data.caseStudy) {
          const study = data.caseStudy;
          setName(study.name || "");
          setSlug(study.slug || "");
          setTagline(study.tagline || "");
          setDescription(study.description || "");
          setCoverImage(study.coverImage || "");
          setGallery(study.gallery || []);
          setStack(study.stack || []);
          setLiveUrl(study.liveUrl || "");
          setGithubUrl(study.githubUrl || "");
          setFeatured(Boolean(study.featured));
          setCategory(study.category || []);
          setDeliverables(study.deliverables || []);
          setTimeline(study.timeline || "");
          setClient(study.client || "");
          setTeam(study.team || []);
          setChallenges(study.challenges || []);
          setSolutions(study.solutions || []);
          setResults(study.results || []);
          setPublished(Boolean(study.published));
          setOrder(study.order || 0);

          if (typeof study.content === "string") {
            setContent(study.content);
          } else if (study.content) {
            setContent(JSON.stringify(study.content));
          } else {
            setContent("");
          }
        } else {
          setMessage("Failed to load");
        }
      } catch (err: unknown) {
        setMessage(getApiErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await api.put(`/api/admin/case-studies/${id}`, {
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
        setMessage("✓ Saved");
        setTimeout(() => router.push("/admin/case-studies"), 800);
      } else {
        setMessage(`✗ ${data.error || "Save failed"}`);
      }
    } catch (err: unknown) {
      setMessage(getApiErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold">Edit Case Study</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Refine the project narrative, update assets, and control exactly what appears on the public case study page.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <section className="rounded-[1.75rem] border border-border/70 bg-card/50 p-5 sm:p-6">
          <h2 className="text-lg font-semibold">Core details</h2>
          <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">Project name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border px-4 py-2.5" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Slug</label>
              <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full rounded-lg border px-4 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold">Tagline</label>
              <input value={tagline} onChange={(e) => setTagline(e.target.value)} className="w-full rounded-lg border px-4 py-2.5" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full rounded-lg border px-4 py-2.5" />
            </div>
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-border/70 bg-card/50 p-5 sm:p-6">
          <h2 className="text-lg font-semibold">Media</h2>
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
            <StringListField label="Tech stack" value={stack} onChange={setStack} placeholder="Next.js" />
            <StringListField label="Categories" value={category} onChange={setCategory} placeholder="SEO" />
            <div>
              <label className="mb-2 block text-sm font-semibold">Live URL</label>
              <input value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} className="w-full rounded-lg border px-4 py-2.5" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">GitHub URL</label>
              <input value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="w-full rounded-lg border px-4 py-2.5" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Client</label>
              <input value={client} onChange={(e) => setClient(e.target.value)} className="w-full rounded-lg border px-4 py-2.5" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Timeline</label>
              <input value={timeline} onChange={(e) => setTimeline(e.target.value)} className="w-full rounded-lg border px-4 py-2.5" />
            </div>
            <StringListField label="Team" value={team} onChange={setTeam} placeholder="Developer" />
            <StringListField label="Deliverables" value={deliverables} onChange={setDeliverables} placeholder="Dashboard" />
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-border/70 bg-card/50 p-5 sm:p-6">
          <h2 className="text-lg font-semibold">Story and outcome</h2>
          <div className="mt-5 grid gap-6">
            <StringListField label="Challenges" value={challenges} onChange={setChallenges} placeholder="Legacy content structure" />
            <StringListField label="Solutions" value={solutions} onChange={setSolutions} placeholder="Rebuilt authoring workflow" />
            <StringListField label="Results" value={results} onChange={setResults} placeholder="Faster content publishing" />
            <div>
              <label className="mb-2 block text-sm font-semibold">Content</label>
              <NovelEditor value={content} onChange={setContent} />
            </div>
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-border/70 bg-card/50 p-5 sm:p-6">
          <h2 className="text-lg font-semibold">Publishing</h2>
          <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/30 p-4">
              <input type="checkbox" id="featured" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="rounded" />
              <label htmlFor="featured" className="flex-1 cursor-pointer text-sm font-semibold">
                Featured project
              </label>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/30 p-4">
              <input type="checkbox" id="published" checked={published} onChange={(e) => setPublished(e.target.checked)} className="rounded" />
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
              <input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} className="w-full rounded-lg border px-4 py-2.5" />
            </div>
          </div>
        </section>

        <div className="flex items-center gap-4 pt-2">
          <button disabled={saving} type="submit" className="rounded-lg bg-primary px-4 py-2 text-primary-foreground">
            {saving ? "Saving..." : "Save changes"}
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
