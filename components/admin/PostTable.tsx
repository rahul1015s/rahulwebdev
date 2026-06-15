"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit, Eye, EyeOff, MoreHorizontal, Trash, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import api from "@/lib/api";
import { getApiErrorMessage } from "@/lib/api-error";
import type { AdminPostListItem } from "@/lib/admin-data";

interface Props {
  posts: AdminPostListItem[];
}

export default function PostTable({ posts }: Props) {
  const router = useRouter();
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [pendingPostId, setPendingPostId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const selectedSet = useMemo(() => new Set(selectedPosts), [selectedPosts]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  const refreshPage = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleSelectPost = (postId: string, checked: boolean) => {
    setSelectedPosts((prev) =>
      checked ? [...prev, postId] : prev.filter((id) => id !== postId)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedPosts(checked ? posts.map((post) => post._id) : []);
  };

  const handleBulkDelete = async () => {
    if (!selectedPosts.length) return;
    if (!confirm(`Delete ${selectedPosts.length} selected posts? This action cannot be undone.`)) {
      return;
    }

    setPendingPostId("bulk-delete");
    try {
      await Promise.all(selectedPosts.map((id) => api.delete(`/api/admin/posts/${id}`)));
      setSelectedPosts([]);
      refreshPage();
    } catch (error) {
      alert(`Bulk delete failed: ${getApiErrorMessage(error)}`);
    } finally {
      setPendingPostId(null);
    }
  };

  const handleTogglePublish = async (post: AdminPostListItem) => {
    setPendingPostId(post._id);
    try {
      await api.patch(`/api/admin/posts/${post._id}`, { published: !post.published });
      refreshPage();
    } catch (error) {
      alert(getApiErrorMessage(error));
    } finally {
      setPendingPostId(null);
    }
  };

  const handleDelete = async (post: AdminPostListItem) => {
    if (!confirm("Delete this post? This action cannot be undone.")) return;

    setPendingPostId(post._id);
    try {
      await api.delete(`/api/admin/posts/${post._id}`);
      setSelectedPosts((prev) => prev.filter((id) => id !== post._id));
      refreshPage();
    } catch (error) {
      alert(getApiErrorMessage(error));
    } finally {
      setPendingPostId(null);
    }
  };

  return (
    <div className="space-y-4">
      {selectedPosts.length > 0 && (
        <div className="flex flex-col gap-3 rounded-xl border border-border/70 bg-muted/40 p-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium">{selectedPosts.length} posts selected</span>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleBulkDelete}
            disabled={pendingPostId === "bulk-delete" || isPending}
          >
            <Trash className="mr-2 h-4 w-4" />
            {pendingPostId === "bulk-delete" ? "Deleting..." : "Delete Selected"}
          </Button>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-border/70">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[44px]">
                <Checkbox
                  checked={selectedPosts.length === posts.length && posts.length > 0}
                  onCheckedChange={(checked) => handleSelectAll(Boolean(checked))}
                />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[88px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => {
              const rowPending = pendingPostId === post._id;

              return (
                <TableRow key={post._id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedSet.has(post._id)}
                      onCheckedChange={(checked) =>
                        handleSelectPost(post._id, Boolean(checked))
                      }
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="max-w-[320px] truncate">{post.title}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={post.published ? "default" : "secondary"}>
                      {post.published ? (
                        <>
                          <Eye className="mr-1 h-3 w-3" />
                          Published
                        </>
                      ) : (
                        <>
                          <EyeOff className="mr-1 h-3 w-3" />
                          Draft
                        </>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{post.slug}</code>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(post.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" disabled={rowPending || isPending}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleTogglePublish(post)}>
                          {post.published ? (
                            <>
                              <EyeOff className="mr-2 h-4 w-4" />
                              Move to Draft
                            </>
                          ) : (
                            <>
                              <Eye className="mr-2 h-4 w-4" />
                              Publish
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/blog/${post._id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(post)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
