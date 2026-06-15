"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { upload } from "@imagekit/next";
import { ImagePlus, Loader2, Trash2, UploadCloud } from "lucide-react";
import { buildImageKitUrl } from "@/lib/imagekit";

interface Props {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  folder?: string;
}

type UploadAuthResponse = {
  signature: string;
  expire: number;
  token: string;
  publicKey: string;
};

export default function CoverImageField({
  value,
  onChange,
  label = "Cover image",
  folder,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handlePick = () => {
    inputRef.current?.click();
  };

  const handleRemove = () => {
    onChange("");
    setError(null);
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  };

  const getUploadAuth = async (): Promise<UploadAuthResponse> => {
    const response = await fetch("/api/imagekit/upload-auth");

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Failed to get upload credentials.");
    }

    return response.json();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      const auth = await getUploadAuth();
      const sanitizedBaseName =
        file.name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9-]/g, "-") || "cover-image";

      const response = await upload({
        file,
        fileName: `${sanitizedBaseName}.webp`,
        folder: folder || process.env.NEXT_PUBLIC_IMAGEKIT_BLOG_FOLDER || "/blog/covers",
        useUniqueFileName: true,
        overwriteFile: false,
        isPrivateFile: false,
        publicKey: auth.publicKey,
        token: auth.token,
        signature: auth.signature,
        expire: auth.expire,
        transformation: {
          pre: "f-webp",
          post: [{ type: "transformation", value: "f-auto,q-auto" }],
        },
        onProgress: (progressEvent) => {
          if (!progressEvent.total) return;
          setProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
        },
      });

      const uploadedPath = response.filePath || response.url || "";
      onChange(buildImageKitUrl(uploadedPath));
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp,image/avif"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="rounded-2xl border border-dashed border-border/70 bg-card/50 p-4">
        {value ? (
          <div className="space-y-4">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border/70 bg-muted">
              <Image
                src={value}
                alt="Cover image preview"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handlePick}
                disabled={uploading}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-border/70 px-3 text-sm font-medium transition hover:bg-muted disabled:opacity-50"
              >
                <ImagePlus className="h-4 w-4" />
                Replace image
              </button>
              <button
                type="button"
                onClick={handleRemove}
                disabled={uploading}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-red-200 px-3 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-start gap-3">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
              {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <UploadCloud className="h-5 w-5" />}
            </div>
            <div>
              <p className="text-sm font-medium">Upload directly to ImageKit</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Images go to ImageKit, are stored as WebP, and are delivered with automatic optimization.
              </p>
            </div>
            <button
              type="button"
              onClick={handlePick}
              disabled={uploading}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-emerald-600 px-3 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
            >
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
              {uploading ? "Uploading..." : "Choose image"}
            </button>
          </div>
        )}

        {uploading && (
          <div className="mt-4">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-emerald-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{progress}% uploaded</p>
          </div>
        )}

        {error && <p className="mt-3 text-xs text-red-600">{error}</p>}
      </div>
    </div>
  );
}
