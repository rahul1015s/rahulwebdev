import { connectDB } from "@/lib/mongodb";
import Post from "@/models/post";
import "@/models/tag";
import BlogClientPage from "@/components/blog/BlogClientPage";

export const revalidate = 300;

export default async function BlogPage() {
  await connectDB();

  const posts = await Post.find({ published: true })
    .sort({ createdAt: -1 })
    .select("title slug content tags readTime createdAt")
    .populate({ path: "tags", select: "name" })
    .lean();

  const normalizedPosts = posts.map((post: any) => ({
    ...post,
    _id: String(post._id),
    tags: Array.isArray(post.tags)
      ? post.tags
          .map((tag: any) => {
            if (typeof tag === "string") return tag;
            if (tag && typeof tag === "object" && typeof tag.name === "string") return tag.name;
            return null;
          })
          .filter(Boolean)
      : [],
  }));

  return <BlogClientPage initialPosts={normalizedPosts as any} />;
}
