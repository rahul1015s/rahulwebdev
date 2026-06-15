export type Post = {
  _id?: string;
  title: string;
  slug?: string;
  content?: unknown;
  category?: {
    name: string;
    slug?: string;
  } | null;
  tags?: string[];
  createdAt?: string | Date;
  readTime?: string;
};

export type SortOption = "newest" | "oldest" | "title-asc" | "title-desc";

/* ------------------------------
   SEARCH
------------------------------ */
export function searchPosts(posts: Post[], query: string) {
  if (!query) return posts;

  const q = query.toLowerCase();

  return posts.filter((post) =>
    post.title.toLowerCase().includes(q) ||
    post.category?.name.toLowerCase().includes(q) ||
    post.tags?.some((t) => t.toLowerCase().includes(q))
  );
}

/* ------------------------------
   FILTER BY CATEGORY
------------------------------ */
export function filterByCategory(posts: Post[], category: string | null) {
  if (!category) return posts;
  return posts.filter((post) => post.category?.name === category);
}

/* ------------------------------
   SORT
------------------------------ */
export function sortPosts(posts: Post[], sort: SortOption) {
  const list = Array.isArray(posts) ? [...posts] : []; // Ensure posts is an array

  switch (sort) {
    case "oldest":
      return list.sort(
        (a, b) =>
          new Date(a.createdAt || 0).getTime() -
          new Date(b.createdAt || 0).getTime()
      );

    case "title-asc":
      return list.sort((a, b) => a.title.localeCompare(b.title));

    case "title-desc":
      return list.sort((a, b) => b.title.localeCompare(a.title));

    case "newest":
    default:
      return list.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
      );
  }
}

/* ------------------------------
   PIPELINE (Notion-style)
------------------------------ */
export function processPosts({
  posts,
  query,
  tag,
  sort,
}: {
  posts: Post[];
  query: string;
  tag: string | null;
  sort: SortOption;
}) {
  let result = posts;

  result = searchPosts(result, query);
  result = filterByCategory(result, tag);
  result = sortPosts(result, sort);

  return result;
}
