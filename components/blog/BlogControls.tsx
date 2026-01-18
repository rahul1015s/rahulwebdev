"use client";

import { Search } from "lucide-react";
import { SortOption } from "@/lib/blog-utils";

type Props = {
  query: string;
  setQuery: (v: string) => void;
  tag: string | null;
  setTag: (v: string | null) => void;
  sort: SortOption;
  setSort: (v: SortOption) => void;
  tags: string[];
};

export function BlogControls({
  query,
  setQuery,
  tag,
  setTag,
  sort,
  setSort,
  tags,
}: Props) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="
            h-9 w-56 rounded-md border border-border
            bg-background pl-9 pr-3 text-sm
            focus:outline-none focus:ring-1 focus:ring-ring
          "
        />
      </div>

      {/* Tag Filter */}
      <select
        value={tag ?? ""}
        onChange={(e) => setTag(e.target.value || null)}
        className="
          h-9 rounded-md border border-border
          bg-background px-3 text-sm
        "
      >
        <option value="">All topics</option>
        {tags.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value as SortOption)}
        className="
          h-9 rounded-md border border-border
          bg-background px-3 text-sm
        "
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="title-asc">Title A–Z</option>
        <option value="title-desc">Title Z–A</option>
      </select>
    </div>
  );
}
