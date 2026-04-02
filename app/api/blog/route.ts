import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Post from '@/models/post';
import '@/models/category';
import '@/models/tag';

export const revalidate = 300;

export async function GET() {
  try {
    await connectDB();

    const posts = await Post.find({ published: true })
      .sort({ createdAt: -1 })
      .select('title slug content tags readTime createdAt')
      .populate({ path: 'tags', select: 'name' })
      .lean();

    const normalizedPosts = posts.map((post) => ({
      ...post,
      tags: Array.isArray(post.tags)
        ? post.tags
            .map((tag) => {
              if (typeof tag === 'string') return tag;
              if (tag && typeof tag === 'object' && 'name' in tag) {
                const name = (tag as { name?: unknown }).name;
                if (typeof name === 'string') return name;
              }
              return null;
            })
            .filter((tag): tag is string => Boolean(tag))
        : [],
    }));

    return NextResponse.json(normalizedPosts, {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
