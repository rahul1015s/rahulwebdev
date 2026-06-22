import { connectDB } from "@/lib/mongodb";
import Category from "@/models/category";
import Tag from "@/models/tag";
import NewPostForm from "@/components/admin/NewPostForm";

export const metadata = { title: "New Post — Rahul Verma" };
export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  await connectDB();

  const [categories, tags] = await Promise.all([
    Category.find().sort({ name: 1 }).select("name slug").lean(),
    Tag.find().sort({ name: 1 }).select("name slug").lean(),
  ]);

  return (
    <NewPostForm
      initialCategories={categories.map((category) => ({
        _id: String(category._id),
        name: category.name,
        slug: category.slug,
      }))}
      initialTags={tags.map((tag) => ({
        _id: String(tag._id),
        name: tag.name,
        slug: tag.slug,
      }))}
    />
  );
}
