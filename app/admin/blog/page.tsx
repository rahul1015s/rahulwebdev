import Link from "next/link";
import { FileText, Plus, Search } from "lucide-react";
import { getAdminPosts } from "@/lib/admin-data";
import PostTable from "@/components/admin/PostTable";

export const metadata = { title: "Blog Management — Rahul Verma" };

export default async function BlogManagementPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = searchParams ? await searchParams : {};
  const search = typeof params.search === "string" ? params.search : "";
  const status = typeof params.status === "string" ? params.status : "all";

  const posts = await getAdminPosts({ search, status });
  const publishedPosts = posts.filter((post) => post.published);
  const draftPosts = posts.filter((post) => !post.published);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Blog Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Search, publish, and edit posts from one lightweight table.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-border/70 bg-card/80 p-4">
          <p className="text-2xl font-semibold">{posts.length}</p>
          <p className="mt-1 text-sm text-muted-foreground">Total posts</p>
        </div>
        <div className="rounded-2xl border border-border/70 bg-card/80 p-4">
          <p className="text-2xl font-semibold">{publishedPosts.length}</p>
          <p className="mt-1 text-sm text-muted-foreground">Published</p>
        </div>
        <div className="rounded-2xl border border-border/70 bg-card/80 p-4">
          <p className="text-2xl font-semibold">{draftPosts.length}</p>
          <p className="mt-1 text-sm text-muted-foreground">Drafts</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border/70 bg-card/75 p-4">
        <form method="GET" className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              name="search"
              defaultValue={search}
              placeholder="Search by title or slug"
              className="h-10 w-full rounded-lg border border-border/70 bg-background pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <select
            name="status"
            defaultValue={status}
            className="h-10 rounded-lg border border-border/70 bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>

          <div className="flex gap-2">
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-border/70 px-4 text-sm font-medium transition hover:bg-muted"
            >
              Apply
            </button>
            {(search || status !== "all") && (
              <Link
                href="/admin/blog"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-border/70 px-4 text-sm font-medium transition hover:bg-muted"
              >
                Clear
              </Link>
            )}
          </div>
        </form>
      </div>

      <div className="mt-6 rounded-2xl border border-border/70 bg-card/80 p-4">
        {posts.length === 0 ? (
          <div className="py-12 text-center">
            <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
            <h2 className="mt-4 text-lg font-semibold">
              {search || status !== "all" ? "No matching posts" : "No posts yet"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {search || status !== "all"
                ? "Try a different search or clear the filter."
                : "Create your first post to get started."}
            </p>
          </div>
        ) : (
          <PostTable posts={posts} />
        )}
      </div>
    </div>
  );
}
