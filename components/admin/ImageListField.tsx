"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { upload } from "@imagekit/next";
import { ImagePlus, Loader2, Trash2, UploadCloud } from "lucide-react";
import { buildImageKitUrl } from "@/lib/imagekit";

type UploadAuthResponse = {
  signature: string;
  expire: number;
  token: string;
  publicKey: string;
};

interface ImageListFieldProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
}

export default function ImageListField({ label, value, onChange }: ImageListFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const addUrl = () => {
    const next = draft.trim();
    if (!next) return;
    onChange([...value, next]);
    setDraft("");
  };

  const removeImage = (index: number) => {
    onChange(value.filter((_, itemIndex) => itemIndex !== index));
  };

  const getUploadAuth = async (): Promise<UploadAuthResponse> => {
    const response = await fetch("/api/imagekit/upload-auth");

    if (!response.ok) {
      throw new Error("Failed to get upload credentials.");
    }

    return response.json();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      const auth = await getUploadAuth();
      const uploadedUrls: string[] = [];

      for (let index = 0; index < files.length; index += 1) {
        const file = files[index];
        const sanitizedBaseName =
          file.name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9-]/g, "-") || "gallery-image";

        const response = await upload({
          file,
          fileName: `${sanitizedBaseName}.webp`,
          folder: process.env.NEXT_PUBLIC_IMAGEKIT_CASE_STUDY_FOLDER || "/case-studies/gallery",
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
            const fileProgress = progressEvent.loaded / progressEvent.total;
            const totalProgress = ((index + fileProgress) / files.length) * 100;
            setProgress(Math.round(totalProgress));
          },
        });

        uploadedUrls.push(buildImageKitUrl(response.filePath || response.url || ""));
      }

      onChange([...value, ...uploadedUrls]);
      if (inputRef.current) inputRef.current.value = "";
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-semibold">{label}</label>
        <p className="mt-1 text-xs text-muted-foreground">
          Upload screenshots to ImageKit or paste a direct image URL if needed.
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp,image/avif"
        className="hidden"
        multiple
        onChange={handleFileChange}
      />

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-emerald-600 px-3 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
          {uploading ? "Uploading..." : "Upload images"}
        </button>
      </div>

      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addUrl();
            }
          }}
          placeholder="https://..."
          className="w-full rounded-lg border border-border/50 px-4 py-2.5"
        />
        <button
          type="button"
          onClick={addUrl}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg border border-border/70 px-3 text-sm font-medium transition hover:bg-muted"
        >
          <ImagePlus className="h-4 w-4" />
          Add URL
        </button>
      </div>

      {uploading ? (
        <div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-emerald-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{progress}% uploaded</p>
        </div>
      ) : null}

      {error ? <p className="text-xs text-red-600">{error}</p> : null}

      {value.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {value.map((image, index) => (
            <div key={`${image}-${index}`} className="space-y-2 rounded-2xl border border-border/70 bg-card/50 p-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/70 bg-muted">
                <Image src={image} alt={`Gallery image ${index + 1}`} fill unoptimized className="object-cover" />
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-xs text-muted-foreground">{image}</p>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 transition hover:bg-muted"
                  aria-label={`Remove gallery image ${index + 1}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border/70 bg-card/40 px-4 py-5 text-sm text-muted-foreground">
          No gallery images added yet.
        </div>
      )}
    </div>
  );
}
