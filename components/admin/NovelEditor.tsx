"use client"
import React, { useCallback, useState, useEffect } from 'react'
import {
  Bold,
  Italic,
  Link as LinkIcon,
  X,
  Heading1,
  Heading2,
  Heading3,
  List as ListIcon,
  ListOrdered as ListOrderedIcon,
  Quote as QuoteIcon,
  Code as CodeIcon,
} from 'lucide-react'
import { defaultExtensions } from './extensions'
import { suggestionItems } from './SlashCommandMenu'
import type { JSONContent } from 'novel'

type Props = {
  value: string
  onChange: (v: string) => void
}

export default function NovelEditor({ value, onChange }: Props) {
  const [EditorRoot, setEditorRoot] = useState<any>(null)
  const [EditorContent, setEditorContent] = useState<any>(null)
  const [EditorCommand, setEditorCommand] = useState<any>(null)
  const [EditorCommandEmpty, setEditorCommandEmpty] = useState<any>(null)
  const [EditorCommandList, setEditorCommandList] = useState<any>(null)
  const [EditorCommandItem, setEditorCommandItem] = useState<any>(null)
  const [EditorBubble, setEditorBubble] = useState<any>(null)
  const [EditorBubbleItem, setEditorBubbleItem] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [initialContent, setInitialContent] = useState<JSONContent | null>({ type: 'doc', content: [] })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let mounted = true

    // Import Novel's composed components
    import('novel')
      .then((mod) => {
        if (!mounted) return

        if (mod.EditorRoot && mod.EditorContent) {
          setEditorRoot(() => mod.EditorRoot)
          setEditorContent(() => mod.EditorContent)
          setEditorCommand(() => mod.EditorCommand)
          setEditorCommandEmpty(() => mod.EditorCommandEmpty)
          setEditorCommandList(() => mod.EditorCommandList)
          setEditorCommandItem(() => mod.EditorCommandItem)
          setEditorBubble(() => mod.EditorBubble)
          setEditorBubbleItem(() => mod.EditorBubbleItem)
          
          // Parse initial content if value is provided
          if (value) {
            try {
              const parsed = JSON.parse(value)
              // Ensure it's a valid editor state with 'doc' node
              if (parsed && parsed.type === 'doc') {
                setInitialContent(parsed)
              } else {
                // Wrap in doc if not already
                setInitialContent({ type: 'doc', content: [parsed] })
              }
            } catch {
              // If not JSON, use empty doc
              setInitialContent({ type: 'doc', content: [] })
            }
          } else {
            // No value provided, use empty editor
            setInitialContent({ type: 'doc', content: [] })
          }
          setLoaded(true)
          return
        }

        setError('Could not find EditorRoot or EditorContent exports in `novel`.')
      })
      .catch((err) => {
        setError('Failed to import `novel`. Make sure it is installed: `npm i novel`')
      })

    return () => { mounted = false }
  }, [value])

  // Update handler to capture editor content
  const handleUpdate = useCallback(
    ({ editor }: any) => {
      const json = editor.getJSON()
      onChange(JSON.stringify(json))
    },
    [onChange]
  )

  if (error) {
    return (
      <div className="rounded border p-3 bg-red-50">
        <div className="mb-2 font-medium text-red-900">Novel editor error</div>
        <div className="text-sm text-red-700">{error}</div>
        <div className="mt-2 text-sm">
          Check the Novel docs:{' '}
          <a className="underline" href="https://novel.sh/docs" target="_blank" rel="noreferrer">
            novel.sh/docs
          </a>
        </div>
      </div>
    )
  }

  if (!EditorRoot || !EditorContent || !loaded) {
    return <div className="rounded border p-3 text-muted-foreground">Loading editor…</div>
  }

  const Root = EditorRoot
  const Content = EditorContent
  const Command = EditorCommand
  const CommandEmpty = EditorCommandEmpty
  const CommandList = EditorCommandList
  const CommandItem = EditorCommandItem
  const Bubble = EditorBubble
  const BubbleItem = EditorBubbleItem

  return (
    <div className="rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden shadow-sm">
      <Root>
        <Content
          initialContent={initialContent}
          onUpdate={handleUpdate}
          extensions={defaultExtensions}
          editorProps={{
            attributes: {
              class: 'prose dark:prose-invert focus:outline-none max-w-full px-4 py-4 min-h-96 text-base leading-relaxed'
            }
          }}
        >
          <Command className="z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-lg border border-border/50 bg-background/95 backdrop-blur-sm px-2 py-2 shadow-lg transition-all">
            <CommandEmpty className="px-3 py-2 text-sm text-muted-foreground">No results</CommandEmpty>
            <CommandList>
              {suggestionItems.map((item: any) => (
                <CommandItem
                  value={item.title}
                  onCommand={(val: any) => item.command(val)}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm hover:bg-accent/50 aria-selected:bg-accent aria-selected:text-accent-foreground cursor-pointer transition-colors"
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border/50 bg-muted/50 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground leading-tight">{item.description}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandList>
          </Command>
          {Bubble && BubbleItem && (
            <Bubble className="absolute z-50 -translate-y-2 transform rounded-lg bg-card/95 dark:bg-card/95 backdrop-blur-xl px-4 py-3 shadow-xl border border-border/50 flex items-center gap-1 flex-wrap max-w-sm">
              <div className="flex items-center gap-1">
                <BubbleItem onSelect={(editor: any) => editor.chain().focus().toggleBold().run()} className="p-1 rounded hover:bg-muted/60" title="Bold">
                  <button className="flex h-8 w-8 items-center justify-center rounded text-sm"><Bold size={16} /></button>
                </BubbleItem>

                <BubbleItem onSelect={(editor: any) => editor.chain().focus().toggleItalic().run()} className="p-1 rounded hover:bg-muted/60" title="Italic">
                  <button className="flex h-8 w-8 items-center justify-center rounded text-sm"><Italic size={16} /></button>
                </BubbleItem>

                <BubbleItem onSelect={(editor: any) => editor.chain().focus().toggleStrike().run()} className="p-1 rounded hover:bg-muted/60" title="Strikethrough">
                  <button className="flex h-8 w-8 items-center justify-center rounded text-sm">S</button>
                </BubbleItem>
              </div>

              <div className="h-6 w-px bg-muted/40 mx-1" />

              <div className="flex items-center gap-1">
                <BubbleItem onSelect={(editor: any)=>editor.chain().focus().setNode('heading',{level:1}).run()} className="p-1 rounded hover:bg-muted/60" title="Heading 1">
                  <button className="text-xs font-medium">H1</button>
                </BubbleItem>
                <BubbleItem onSelect={(editor: any)=>editor.chain().focus().setNode('heading',{level:2}).run()} className="p-1 rounded hover:bg-muted/60" title="Heading 2">
                  <button className="text-xs font-medium">H2</button>
                </BubbleItem>
                <BubbleItem onSelect={(editor: any)=>editor.chain().focus().setNode('heading',{level:3}).run()} className="p-1 rounded hover:bg-muted/60" title="Heading 3">
                  <button className="text-xs font-medium">H3</button>
                </BubbleItem>
              </div>

              <div className="h-6 w-px bg-muted/40 mx-1" />

              <div className="flex items-center gap-1">
                <BubbleItem onSelect={(editor: any)=>editor.chain().focus().toggleBulletList().run()} className="p-1 rounded hover:bg-muted/60" title="Bulleted list">
                  <button className="flex h-8 w-8 items-center justify-center rounded text-sm"><ListIcon size={16} /></button>
                </BubbleItem>
                <BubbleItem onSelect={(editor: any)=>editor.chain().focus().toggleOrderedList().run()} className="p-1 rounded hover:bg-muted/60" title="Numbered list">
                  <button className="flex h-8 w-8 items-center justify-center rounded text-sm"><ListOrderedIcon size={16} /></button>
                </BubbleItem>
                <BubbleItem onSelect={(editor: any)=>editor.chain().focus().toggleBlockquote().run()} className="p-1 rounded hover:bg-muted/60" title="Quote">
                  <button className="flex h-8 w-8 items-center justify-center rounded text-sm"><QuoteIcon size={16} /></button>
                </BubbleItem>
                <BubbleItem onSelect={(editor: any)=>editor.chain().focus().toggleCodeBlock().run()} className="p-1 rounded hover:bg-muted/60" title="Code block">
                  <button className="flex h-8 w-8 items-center justify-center rounded text-sm"><CodeIcon size={16} /></button>
                </BubbleItem>
              </div>

              <div className="h-6 w-px bg-muted/40 mx-1" />

              <div className="flex items-center gap-1">
                <BubbleItem onSelect={(editor: any)=>{
                    const url = prompt('Enter URL')
                    if(url) editor.chain().focus().setLink({href:url}).run()
                  }} className="p-1 rounded hover:bg-muted/60" title="Insert link">
                  <button className="flex h-8 w-8 items-center justify-center rounded text-sm"><LinkIcon size={16} /></button>
                </BubbleItem>

                <BubbleItem onSelect={(editor: any)=>editor.chain().focus().unsetLink().run()} className="p-1 rounded hover:bg-muted/60" title="Remove link">
                  <button className="flex h-8 w-8 items-center justify-center rounded text-sm"><X size={16} /></button>
                </BubbleItem>
              </div>
            </Bubble>
          )}
        </Content>
      </Root>
    </div>
  )
}

