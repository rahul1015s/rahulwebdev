import { connectDB } from "@/lib/mongodb";
import Post from "@/models/post";
import CaseStudy from "@/models/casestudy";
import Subscriber from "@/models/Subscriber";

export type AdminPostListItem = {
  _id: string;
  title: string;
  slug: string;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export async function getAdminStats() {
  await connectDB();

  const [
    totalPosts,
    publishedPosts,
    totalCaseStudies,
    publishedCaseStudies,
    totalSubscribers,
    activeSubscribers,
  ] = await Promise.all([
    Post.countDocuments(),
    Post.countDocuments({ published: true }),
    CaseStudy.countDocuments(),
    CaseStudy.countDocuments({ published: true }),
    Subscriber.countDocuments(),
    Subscriber.countDocuments({ isActive: true }),
  ]);

  return {
    posts: {
      total: totalPosts,
      published: publishedPosts,
      drafts: totalPosts - publishedPosts,
    },
    caseStudies: {
      total: totalCaseStudies,
      published: publishedCaseStudies,
      drafts: totalCaseStudies - publishedCaseStudies,
    },
    subscribers: {
      total: totalSubscribers,
      active: activeSubscribers,
      inactive: totalSubscribers - activeSubscribers,
    },
    newsletters: {
      sent: 0,
      openRate: 0,
    },
  };
}

export async function getAdminPosts(filters?: {
  search?: string;
  status?: string;
}) {
  await connectDB();

  const search = filters?.search?.trim() || "";
  const status = filters?.status || "all";
  const query: Record<string, unknown> = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { slug: { $regex: search, $options: "i" } },
    ];
  }

  if (status === "published") query.published = true;
  if (status === "draft") query.published = false;

  const posts = await Post.find(query)
    .sort({ createdAt: -1 })
    .select("title slug published createdAt updatedAt")
    .lean();

  return posts.map((post) => ({
    _id: String(post._id),
    title: post.title || "",
    slug: post.slug || "",
    published: Boolean(post.published),
    createdAt: post.createdAt ? new Date(post.createdAt).toISOString() : undefined,
    updatedAt: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
  })) as AdminPostListItem[];
}
