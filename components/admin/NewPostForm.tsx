"use client";

import { useMemo, useState } from "react";
import { Sparkles, X } from "lucide-react";
import NovelEditor from "@/components/admin/NovelEditor";
import CoverImageField from "@/components/admin/CoverImageField";
import { Checkbox } from "@/components/ui/checkbox";
import api from "@/lib/api";
import { getApiErrorMessage } from "@/lib/api-error";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface Tag {
  _id: string;
  name: string;
  slug: string;
}

interface Props {
  initialCategories: Category[];
  initialTags: Tag[];
}

export default function NewPostForm({ initialCategories, initialTags }: Props) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allTags] = useState<Tag[]>(initialTags);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [categoryMessage, setCategoryMessage] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);

  const slugify = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const filteredTags = useMemo(() => {
    const query = tagInput.trim().toLowerCase();
    if (!query) return [];

    return allTags.filter(
      (tag) =>
        tag.name.toLowerCase().includes(query) &&
        !selectedTags.some((selectedTag) => selectedTag._id === tag._id)
    );
  }, [allTags, selectedTags, tagInput]);

  const seoPreviewTitle = title || "Untitled post";
  const seoPreviewSlug = slug || slugify(title) || "untitled-post";

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await api.post("/api/admin/posts", {
        title,
        slug,
        content,
        image,
        published,
        category: selectedCategory || null,
        tags: selectedTags.map((tag) => tag._id),
      });
      const data = response.data;

      if (data.ok) {
        setMessage("Post created successfully.");
        setTitle("");
        setSlug("");
        setSlugTouched(false);
        setContent("");
        setImage("");
        setPublished(true);
        setSelectedCategory("");
        setSelectedTags([]);
        setTagInput("");
        setResetKey((value) => value + 1);
        window.setTimeout(() => setMessage(null), 2500);
      } else {
        setMessage(data.error || "Failed to create post.");
      }
    } catch (error: unknown) {
      setMessage(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  const handleAddTag = (tag: Tag) => {
    if (!selectedTags.some((selectedTag) => selectedTag._id === tag._id)) {
      setSelectedTags((current) => [...current, tag]);
    }
    setTagInput("");
    setShowTagDropdown(false);
  };

  const handleRemoveTag = (tagId: string) => {
    setSelectedTags((current) => current.filter((tag) => tag._id !== tagId));
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;

    setCreatingCategory(true);
    setCategoryMessage(null);

    try {
      const response = await api.post("/api/categories", { name: newCategoryName });
      const data = response.data;

      if (data._id) {
        const newCategory = {
          _id: data._id,
          name: data.name,
          slug: data.slug,
        };

        setCategories((current) =>
          [...current, newCategory].sort((a, b) => a.name.localeCompare(b.name))
        );
        setSelectedCategory(newCategory._id);
        setNewCategoryName("");
        setShowNewCategoryModal(false);
        setCategoryMessage(`Category "${newCategory.name}" created.`);
        window.setTimeout(() => setCategoryMessage(null), 2200);
      }
    } catch (error: unknown) {
      const message = getApiErrorMessage(error);
      const existingCategory = (error as { response?: { data?: { category?: Category } } })?.response?.data?.category;

      if (existingCategory?._id) {
        setSelectedCategory(existingCategory._id);
        setShowNewCategoryModal(false);
        setCategoryMessage(`Category "${existingCategory.name}" already exists and is selected.`);
        window.setTimeout(() => setCategoryMessage(null), 2200);
      } else {
        setCategoryMessage(message);
      }
    } finally {
      setCreatingCategory(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Create New Post</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Faster editor loading, cleaner writing surface, and a simpler publishing flow.
          </p>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card/75 p-4">
          <p className="text-sm font-semibold">Search preview</p>
          <p className="mt-3 line-clamp-2 text-base text-blue-700 dark:text-blue-300">{seoPreviewTitle}</p>
          <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-300">
            rahulwebdev.in/blog/{seoPreviewSlug}
          </p>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {selectedTags.length > 0
              ? `Topics: ${selectedTags.map((tag) => tag.name).join(", ")}`
              : "Add tags and a clear title to improve findability later."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5">
          <div className="rounded-2xl border border-border/70 bg-card/80 p-5">
            <div className="grid gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Title</label>
                <input
                  required
                  value={title}
                  onChange={(event) => {
                    const nextTitle = event.target.value;
                    setTitle(nextTitle);
                    if (!slugTouched) setSlug(slugify(nextTitle));
                  }}
                  placeholder="Enter post title"
                  className="h-11 w-full rounded-lg border border-border/70 bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">Slug</label>
                <input
                  value={slug}
                  onChange={(event) => {
                    setSlugTouched(true);
                    setSlug(slugify(event.target.value));
                  }}
                  placeholder="leave blank for auto-generated slug"
                  className="h-11 w-full rounded-lg border border-border/70 bg-background px-3 text-sm text-muted-foreground outline-none transition focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card/80 p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <label className="block text-sm font-semibold">Content</label>
                <p className="mt-1 text-xs text-muted-foreground">
                  Write naturally. Use `/` for commands and select text for formatting tools.
                </p>
              </div>
              <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
                <Sparkles className="h-3.5 w-3.5" />
                Writing mode
              </div>
            </div>
            <NovelEditor key={resetKey} value={content} onChange={setContent} />
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-border/70 bg-card/80 p-5">
            <h2 className="text-sm font-semibold">Post settings</h2>

            <div className="mt-4 space-y-4">
              <div>
                <CoverImageField value={image} onChange={setImage} />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">Category</label>
                <div className="flex gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(event) => setSelectedCategory(event.target.value)}
                    className="h-11 flex-1 rounded-lg border border-border/70 bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowNewCategoryModal(true)}
                    className="rounded-lg bg-emerald-600 px-3 text-sm font-medium text-white transition hover:bg-emerald-700"
                  >
                    + New
                  </button>
                </div>
                {categoryMessage && (
                  <p className="mt-2 text-xs text-emerald-700 dark:text-emerald-300">{categoryMessage}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">Tags</label>
                <div className="relative">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(event) => {
                      setTagInput(event.target.value);
                      setShowTagDropdown(true);
                    }}
                    onFocus={() => setShowTagDropdown(true)}
                    placeholder="Search tags"
                    className="h-11 w-full rounded-lg border border-border/70 bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-emerald-500/20"
                  />

                  {showTagDropdown && filteredTags.length > 0 && (
                    <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-48 overflow-y-auto rounded-lg border border-border/70 bg-background shadow-lg">
                      {filteredTags.map((tag) => (
                        <button
                          key={tag._id}
                          type="button"
                          onClick={() => handleAddTag(tag)}
                          className="block w-full px-3 py-2 text-left text-sm transition hover:bg-muted"
                        >
                          {tag.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {selectedTags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedTags.map((tag) => (
                      <div
                        key={tag._id}
                        className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-2.5 py-1 text-xs text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                      >
                        {tag.name}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag._id)}
                          className="transition hover:text-emerald-900 dark:hover:text-emerald-100"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-muted/20 p-3" suppressHydrationWarning>
                <Checkbox
                  id="published"
                  checked={published}
                  onCheckedChange={(checked) => setPublished(Boolean(checked))}
                />
                <label htmlFor="published" className="flex-1 cursor-pointer text-sm font-medium">
                  Publish immediately
                </label>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    published
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {published ? "Published" : "Draft"}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card/80 p-5">
            <button
              disabled={loading || !title || !content}
              type="submit"
              className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-emerald-600 px-5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Post"}
            </button>

            {message && (
              <p
                className={`mt-3 text-sm font-medium ${
                  message.toLowerCase().includes("success") || message.toLowerCase().includes("created")
                    ? "text-emerald-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </form>

      {showNewCategoryModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowNewCategoryModal(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-background p-5 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="text-base font-semibold">Create New Category</h3>
            <input
              autoFocus
              type="text"
              value={newCategoryName}
              onChange={(event) => setNewCategoryName(event.target.value)}
              placeholder="Category name"
              className="mt-4 h-11 w-full rounded-lg border border-border/70 bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-emerald-500/20"
              onKeyDown={(event) => {
                if (event.key === "Enter") handleCreateCategory();
                if (event.key === "Escape") setShowNewCategoryModal(false);
              }}
            />
            {categoryMessage && <p className="mt-2 text-xs text-red-600">{categoryMessage}</p>}
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowNewCategoryModal(false)}
                className="h-10 rounded-lg border border-border/70 px-3 text-sm transition hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateCategory}
                disabled={!newCategoryName.trim() || creatingCategory}
                className="h-10 rounded-lg bg-emerald-600 px-3 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
              >
                {creatingCategory ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
