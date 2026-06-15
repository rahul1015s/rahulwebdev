import { normalizeImageUrl } from "@/utils/url-utils";

type RichTextNode = {
  type?: string;
  text?: string;
  attrs?: { src?: string; alt?: string; level?: number };
  content?: RichTextNode[];
};

type TagLike =
  | string
  | {
      name?: string | null;
      slug?: string | null;
      _id?: unknown;
    }
  | null
  | undefined;

type CategoryLike =
  | string
  | {
      name?: string | null;
      slug?: string | null;
      _id?: unknown;
    }
  | null
  | undefined;

export function getNodeText(content?: RichTextNode[]) {
  return (content ?? []).map((node) => node.text || "").join("").trim();
}

export function extractExcerpt(content: unknown, length: number = 160) {
  if (!content) return "";

  try {
    if (typeof content === "string") {
      const parsed = JSON.parse(content);
      const nodes: RichTextNode[] = parsed?.content || [];

      for (const node of nodes) {
        if (node.type === "paragraph" && (node.content?.length ?? 0) > 0) {
          const text = getNodeText(node.content);
          if (text.length > 20) {
            return text.length > length ? `${text.slice(0, length - 1)}…` : text;
          }
        }

        if (!node.content?.length) continue;

        const text = getNodeText(node.content);
        if (text.length > 20) {
          return text.length > length ? `${text.slice(0, length - 1)}…` : text;
        }
      }
    }

    const plainText = String(content).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (!plainText) return "";
    return plainText.length > length ? `${plainText.slice(0, length - 1)}…` : plainText;
  } catch {
    const plainText = String(content).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    return plainText.length > length ? `${plainText.slice(0, length - 1)}…` : plainText;
  }
}

export function extractCoverImage(image: unknown, content: unknown) {
  if (typeof image === "string" && image.trim()) {
    const normalized = normalizeImageUrl(image);
    if (normalized) return normalized;
    if (image.startsWith("http") || image.startsWith("/")) return image;
  }

  if (typeof content !== "string") return "/default-blog.png";

  try {
    const parsed = JSON.parse(content);
    const nodes: RichTextNode[] = parsed?.content || [];
    const firstImage = nodes.find((node) => node.type === "image" && node.attrs?.src);
    if (!firstImage?.attrs?.src) return "/default-blog.png";
    return normalizeImageUrl(firstImage.attrs.src) || "/default-blog.png";
  } catch {
    return "/default-blog.png";
  }
}

export function normalizeTagNames(tags: unknown, tagNames?: unknown): string[] {
  const normalizedFromTags = Array.isArray(tags)
    ? (tags as TagLike[])
        .map((tag) => {
          if (typeof tag === "string") return tag;
          if (tag && typeof tag === "object" && typeof tag.name === "string") {
            return tag.name.trim();
          }
          return "";
        })
        .filter(Boolean)
    : [];

  if (normalizedFromTags.length > 0) {
    return [...new Set(normalizedFromTags)];
  }

  if (!Array.isArray(tagNames)) return [];

  return [...new Set(tagNames.map((tag) => String(tag).trim()).filter(Boolean))];
}

export function normalizeCategory(category: unknown): { name: string; slug?: string } | null {
  if (!category) return null;

  if (typeof category === "string") {
    const name = category.trim();
    return name ? { name } : null;
  }

  if (typeof category === "object") {
    const typedCategory = category as CategoryLike;
    if (typedCategory && typeof typedCategory === "object" && typeof typedCategory.name === "string") {
      const name = typedCategory.name.trim();
      if (!name) return null;
      return {
        name,
        slug: typeof typedCategory.slug === "string" ? typedCategory.slug.trim() || undefined : undefined,
      };
    }
  }

  return null;
}

export function toIsoString(value: unknown) {
  if (!value) return undefined;
  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

export function estimateReadTime(content: unknown, minimumMinutes: number = 1) {
  const excerpt = extractExcerpt(content, 5000);
  const words = excerpt.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(minimumMinutes, Math.ceil(words / 180));
  return `${minutes} min read`;
}
