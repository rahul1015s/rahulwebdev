"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Bold,
  Code as CodeIcon,
  Italic,
  Link as LinkIcon,
  List as ListIcon,
  ListOrdered as ListOrderedIcon,
  Quote as QuoteIcon,
  X,
} from "lucide-react";
import type { JSONContent } from "novel";
import { defaultExtensions } from "./extensions";
import { suggestionItems } from "./SlashCommandMenu";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

type NovelModule = Awaited<typeof import("novel")>;
type BubbleEditor = {
  chain: () => {
    focus: () => {
      toggleBold: () => { run: () => void };
      toggleItalic: () => { run: () => void };
      toggleBulletList: () => { run: () => void };
      toggleOrderedList: () => { run: () => void };
      toggleBlockquote: () => { run: () => void };
      toggleCodeBlock: () => { run: () => void };
      setLink: (attrs: { href: string }) => { run: () => void };
      unsetLink: () => { run: () => void };
    };
  };
};

function parseInitialContent(value: string): JSONContent {
  if (!value) return { type: "doc", content: [] };

  try {
    const parsed = JSON.parse(value);
    if (parsed && parsed.type === "doc") return parsed;
    return { type: "doc", content: [parsed] };
  } catch {
    return { type: "doc", content: [] };
  }
}

export default function NovelEditor({ value, onChange }: Props) {
  const [novel, setNovel] = useState<NovelModule | null>(null);
  const [error, setError] = useState<string | null>(null);
  const initialContent = useMemo(() => parseInitialContent(value), [value]);

  useEffect(() => {
    let mounted = true;

    import("novel")
      .then((module) => {
        if (!mounted) return;
        if (!module.EditorRoot || !module.EditorContent) {
          setError("Could not load the Novel editor exports.");
          return;
        }
        setNovel(module);
      })
      .catch(() => {
        setError("Failed to load the editor. Make sure `novel` is installed correctly.");
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handleUpdate = useCallback(
    ({ editor }: { editor: { getJSON: () => unknown } }) => {
      onChange(JSON.stringify(editor.getJSON()));
    },
    [onChange]
  );

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4">
        <p className="font-medium text-red-900">Novel editor error</p>
        <p className="mt-1 text-sm text-red-700">{error}</p>
      </div>
    );
  }

  if (!novel?.EditorRoot || !novel?.EditorContent) {
    return <div className="rounded-xl border border-border/70 bg-background p-4 text-sm text-muted-foreground">Loading editor...</div>;
  }

  const Root = novel.EditorRoot;
  const Content = novel.EditorContent;
  const Command = novel.EditorCommand;
  const CommandEmpty = novel.EditorCommandEmpty;
  const CommandList = novel.EditorCommandList;
  const CommandItem = novel.EditorCommandItem;
  const Bubble = novel.EditorBubble;
  const BubbleItem = novel.EditorBubbleItem;
  const withEditor =
    (callback: (editor: BubbleEditor) => void) =>
    (editor: unknown) =>
      callback(editor as BubbleEditor);

  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-background shadow-[0_24px_60px_-48px_rgba(15,23,42,0.45)]">
      <div className="flex items-center justify-between border-b border-border/70 bg-muted/30 px-4 py-3">
        <div>
          <p className="text-sm font-medium">Writing canvas</p>
          <p className="text-xs text-muted-foreground">Use `/` for blocks and select text for quick formatting.</p>
        </div>
        <div className="hidden rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground sm:block">
          Article-first editing
        </div>
      </div>

      <Root>
        <Content
          initialContent={initialContent}
          onUpdate={handleUpdate}
          extensions={defaultExtensions}
          editorProps={{
            attributes: {
              class:
                "prose prose-neutral dark:prose-invert max-w-none min-h-[420px] px-5 py-6 text-[16px] leading-8 outline-none sm:px-8 sm:py-8 sm:text-[17px] " +
                "prose-headings:font-semibold prose-headings:tracking-tight prose-h1:text-4xl prose-h1:mb-4 prose-h1:mt-2 " +
                "prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-3 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-2 " +
                "prose-p:my-4 prose-p:text-foreground/95 prose-ul:my-4 prose-ol:my-4 prose-li:my-1.5 " +
                "prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-50/60 prose-blockquote:px-4 prose-blockquote:py-3 dark:prose-blockquote:bg-emerald-500/5 " +
                "prose-pre:rounded-xl prose-pre:border prose-pre:border-border/70 prose-pre:bg-slate-950 prose-pre:px-4 prose-pre:py-4 prose-pre:text-slate-100 " +
                "prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none " +
                "prose-img:rounded-2xl prose-img:border prose-img:border-border/60",
            },
          }}
        >
          {Command && CommandEmpty && CommandList && CommandItem && (
            <Command className="z-50 h-auto max-h-[320px] w-80 overflow-y-auto rounded-xl border border-border/70 bg-background p-2 shadow-xl">
              <CommandEmpty className="px-3 py-2 text-sm text-muted-foreground">No results</CommandEmpty>
              <CommandList>
                {suggestionItems.map((item) => (
                  <CommandItem
                    value={item.title}
                    onCommand={(value) =>
                      (item.command as (payload: unknown) => void)(value)
                    }
                    className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-accent/50 aria-selected:bg-accent aria-selected:text-accent-foreground"
                    key={item.title}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-muted/50">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs leading-tight text-muted-foreground">{item.description}</p>
                    </div>
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          )}

          {Bubble && BubbleItem && (
            <Bubble className="absolute z-50 flex max-w-sm flex-wrap items-center gap-1 rounded-xl border border-border/70 bg-card px-2 py-1.5 shadow-xl">
              <BubbleItem onSelect={withEditor((editor) => editor.chain().focus().toggleBold().run())} className="rounded p-1 hover:bg-muted/60" title="Bold">
                <button type="button" className="flex h-8 w-8 items-center justify-center rounded text-sm">
                  <Bold size={15} />
                </button>
              </BubbleItem>

              <BubbleItem onSelect={withEditor((editor) => editor.chain().focus().toggleItalic().run())} className="rounded p-1 hover:bg-muted/60" title="Italic">
                <button type="button" className="flex h-8 w-8 items-center justify-center rounded text-sm">
                  <Italic size={15} />
                </button>
              </BubbleItem>

              <BubbleItem onSelect={withEditor((editor) => editor.chain().focus().toggleBulletList().run())} className="rounded p-1 hover:bg-muted/60" title="Bulleted list">
                <button type="button" className="flex h-8 w-8 items-center justify-center rounded text-sm">
                  <ListIcon size={15} />
                </button>
              </BubbleItem>

              <BubbleItem onSelect={withEditor((editor) => editor.chain().focus().toggleOrderedList().run())} className="rounded p-1 hover:bg-muted/60" title="Numbered list">
                <button type="button" className="flex h-8 w-8 items-center justify-center rounded text-sm">
                  <ListOrderedIcon size={15} />
                </button>
              </BubbleItem>

              <BubbleItem onSelect={withEditor((editor) => editor.chain().focus().toggleBlockquote().run())} className="rounded p-1 hover:bg-muted/60" title="Quote">
                <button type="button" className="flex h-8 w-8 items-center justify-center rounded text-sm">
                  <QuoteIcon size={15} />
                </button>
              </BubbleItem>

              <BubbleItem onSelect={withEditor((editor) => editor.chain().focus().toggleCodeBlock().run())} className="rounded p-1 hover:bg-muted/60" title="Code block">
                <button type="button" className="flex h-8 w-8 items-center justify-center rounded text-sm">
                  <CodeIcon size={15} />
                </button>
              </BubbleItem>

              <BubbleItem
                onSelect={withEditor((editor) => {
                  const href = prompt("Enter URL");
                  if (href) editor.chain().focus().setLink({ href }).run();
                })}
                className="rounded p-1 hover:bg-muted/60"
                title="Insert link"
              >
                <button type="button" className="flex h-8 w-8 items-center justify-center rounded text-sm">
                  <LinkIcon size={15} />
                </button>
              </BubbleItem>

              <BubbleItem onSelect={withEditor((editor) => editor.chain().focus().unsetLink().run())} className="rounded p-1 hover:bg-muted/60" title="Remove link">
                <button type="button" className="flex h-8 w-8 items-center justify-center rounded text-sm">
                  <X size={15} />
                </button>
              </BubbleItem>
            </Bubble>
          )}
        </Content>
      </Root>
    </div>
  );
}
