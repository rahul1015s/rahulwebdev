"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

type PostVisitorCountProps = {
  slug: string;
};

export default function PostVisitorCount({ slug }: PostVisitorCountProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const key = `blog_visited_${slug}`;
    const visited =
      typeof window !== "undefined" ? sessionStorage.getItem(key) : null;
    const endpoint = visited
      ? `/api/visitors/${encodeURIComponent(slug)}?get=true`
      : `/api/visitors/${encodeURIComponent(slug)}`;

    fetch(endpoint)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(new Error("Failed to fetch post visitor count"))
      )
      .then((data) => {
        const nextCount = typeof data?.count === "number" ? data.count : 0;
        if (isMounted) {
          setCount(nextCount);
        }
      })
      .catch(() => {
        if (isMounted) {
          setCount(0);
        }
      });

    if (!visited && typeof window !== "undefined") {
      sessionStorage.setItem(key, "true");
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return (
    <div className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-muted-foreground">
      <Eye size={13} />
      <span>{count !== null ? `${count.toLocaleString()} views` : "Counting views..."}</span>
    </div>
  );
}
