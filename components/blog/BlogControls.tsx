"use client";

import { Search, LayoutGrid, List } from "lucide-react";
import { SortOption } from "@/lib/blog-utils";

type Props = {
  query: string;
  setQuery: (v: string) => void;
  category: string | null;
  setCategory: (v: string | null) => void;
  sort: SortOption;
  setSort: (v: SortOption) => void;
  categories: string[];
  view: "list" | "card";
  setView: (v: "list" | "card") => void;
};

export function BlogControls({
  query,
  setQuery,
  category,
  setCategory,
  sort,
  setSort,
  categories,
  view,
  setView,
}: Props) {
  return (
    <div className="mb-5 rounded-[1.2rem] border border-border/70 bg-card/75 p-3 shadow-[0_16px_36px_-30px_rgba(15,23,42,0.3)] backdrop-blur">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto_auto] sm:items-center">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles, topics, or keywords"
          className="
            h-10 w-full min-w-0 rounded-lg border border-border/70
            bg-background/90 pl-10 pr-4 text-sm
            focus:outline-none focus:ring-2 focus:ring-emerald-500/30
          "
        />
      </div>

      <select
        value={category ?? ""}
        onChange={(e) => setCategory(e.target.value || null)}
        className="
          h-10 w-full rounded-lg border border-border/70
          bg-background/90 px-3 text-sm
        "
      >
        <option value="">All categories</option>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value as SortOption)}
        className="
          h-10 w-full rounded-lg border border-border/70
          bg-background/90 px-3 text-sm
        "
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="title-asc">Title A–Z</option>
        <option value="title-desc">Title Z–A</option>
      </select>

      <div className="inline-flex h-10 items-center rounded-lg border border-border/70 bg-background/90 p-1">
        <button
          type="button"
          onClick={() => setView("list")}
          className={`inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-xs font-medium transition ${
            view === "list" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="List view"
        >
          <List className="h-3.5 w-3.5" />
          List
        </button>
        <button
          type="button"
          onClick={() => setView("card")}
          className={`inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-xs font-medium transition ${
            view === "card" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
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
