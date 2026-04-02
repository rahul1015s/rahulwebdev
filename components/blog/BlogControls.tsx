"use client";

import { Search, LayoutGrid, List } from "lucide-react";
import { SortOption } from "@/lib/blog-utils";

type Props = {
  query: string;
  setQuery: (v: string) => void;
  tag: string | null;
  setTag: (v: string | null) => void;
  sort: SortOption;
  setSort: (v: SortOption) => void;
  tags: string[];
  view: "list" | "card";
  setView: (v: "list" | "card") => void;
};

export function BlogControls({
  query,
  setQuery,
  tag,
  setTag,
  sort,
  setSort,
  tags,
  view,
  setView,
}: Props) {
  return (
    <div className="mb-4 rounded-lg border border-border/60 bg-card/40 p-2 sm:p-2.5">
      {/* Search */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto_auto] sm:items-center">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="
            h-9 w-full min-w-0 rounded-md border border-border/70
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
          h-9 w-full rounded-md border border-border/70
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
          h-9 w-full rounded-md border border-border/70
          bg-background px-3 text-sm
        "
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="title-asc">Title A–Z</option>
        <option value="title-desc">Title Z–A</option>
      </select>

      <div className="inline-flex h-9 items-center rounded-md border border-border/70 bg-background p-0.5">
        <button
          type="button"
          onClick={() => setView("list")}
          className={`inline-flex h-7 items-center gap-1.5 rounded px-2 text-xs transition ${
            view === "list" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="List view"
        >
          <List className="h-3.5 w-3.5" />
          List
        </button>
        <button
          type="button"
          onClick={() => setView("card")}
          className={`inline-flex h-7 items-center gap-1.5 rounded px-2 text-xs transition ${
            view === "card" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Card view"
        >
          <LayoutGrid className="h-3.5 w-3.5" />
          Card
        </button>
      </div>
      </div>
    </div>
  );
}
