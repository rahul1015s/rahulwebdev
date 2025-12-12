"use client"

import React from 'react'
import { normalizeImageUrl } from '@/utils/url-utils'
import Image from 'next/image'

interface PostContentProps {
  content: any
}

// Convert Prosemirror/Novel JSON to React elements
function renderProsemirrorNode(node: any, index: number = 0): React.ReactNode {
  if (!node) return null

  const key = `node-${index}`

  switch (node.type) {
    case 'heading':
      const level = node.attrs?.level || 1
      const headingClassesMap: Record<number, string> = {
        1: 'text-4xl md:text-5xl font-bold tracking-tight mt-8 mb-4 first:mt-0',
        2: 'text-2xl md:text-3xl font-bold tracking-tight mt-8 mb-4',
        3: 'text-xl md:text-2xl font-semibold tracking-tight mt-6 mb-3',
      }
      const headingClasses = headingClassesMap[level as keyof typeof headingClassesMap] || 'text-lg font-semibold tracking-tight mt-6 mb-3'
      
      const renderHeading = (tag: string) => {
        const HeadingMap: Record<string, any> = {
          h1: <h1 key={key} className={headingClasses}>{node.content?.map((child: any, i: number) => renderProsemirrorNode(child, i))}</h1>,
          h2: <h2 key={key} className={headingClasses}>{node.content?.map((child: any, i: number) => renderProsemirrorNode(child, i))}</h2>,
          h3: <h3 key={key} className={headingClasses}>{node.content?.map((child: any, i: number) => renderProsemirrorNode(child, i))}</h3>,
          h4: <h4 key={key} className={headingClasses}>{node.content?.map((child: any, i: number) => renderProsemirrorNode(child, i))}</h4>,
        }
        return HeadingMap[tag]
      }
      return renderHeading(`h${level}`)

    case 'paragraph':
      return (
        <p key={key} className="text-base md:text-lg leading-7 md:leading-8 text-foreground/90 my-4 first:mt-0">
          {node.content?.map((child: any, i: number) => renderProsemirrorNode(child, i))}
        </p>
      )

    case 'bulletList':
  return (
    <ul key={key} className="list-disc list-outside space-y-3 my-6 ml-6">
      {node.content?.map((child: any, i: number) => renderProsemirrorNode(child, i))}
    </ul>
  )

case 'orderedList':
  return (
    <ol key={key} className="list-decimal list-outside space-y-3 my-6 ml-6" start={node.attrs?.start || 1}>
      {node.content?.map((child: any, i: number) => renderProsemirrorNode(child, i))}
    </ol>
  )

case 'listItem':
  return (
    <li key={key} className="text-base leading-7 text-foreground/90 mb-1">
      {node.content?.map((child: any, i: number) => renderProsemirrorNode(child, i))}
    </li>
  )

    case 'horizontalRule':
      return <hr key={key} className="my-8 border-t border-border/30" />

    case 'text':
      let text: React.ReactNode = node.text || ''
      
      // Apply marks (bold, italic, code, etc.) in reverse order so they compose correctly
      if (node.marks && node.marks.length > 0) {
        for (let i = node.marks.length - 1; i >= 0; i--) {
          const mark = node.marks[i]
          if (mark.type === 'bold') {
            text = <strong className="font-semibold">{text}</strong>
          } else if (mark.type === 'italic') {
            text = <em className="italic">{text}</em>
          } else if (mark.type === 'code') {
            text = <code className="bg-muted/80 px-2 py-1 rounded text-sm font-mono text-foreground/90">{text}</code>
          } else if (mark.type === 'link') {
            text = <a href={mark.attrs?.href || '#'} className="text-primary underline underline-offset-4 hover:opacity-80" target="_blank" rel="noopener noreferrer">{text}</a>
          }
        }
      }
      
      return <React.Fragment key={key}>{text}</React.Fragment>

    case 'hardBreak':
      return <br key={key} />

    case 'codeBlock':
      return (
        <pre key={key} className="bg-muted/50 rounded-lg p-4 overflow-x-auto my-6 border border-border/30">
          <code className="font-mono text-sm text-foreground/90">
            {node.content?.map((child: any, i: number) => renderProsemirrorNode(child, i))}
          </code>
        </pre>
      )

    case 'blockquote':
      return (
        <blockquote key={key} className="border-l-4 border-primary/30 pl-4 py-2 italic my-6 text-foreground/80">
          {node.content?.map((child: any, i: number) => renderProsemirrorNode(child, i))}
        </blockquote>
      )

    case 'image':
      return renderImageNode(node, index)

    default:
      return null
  }
}

// Render image node (ProseMirror image node)
function renderImageNode(node: any, index: number) {
  const key = `image-${index}`
  const src = normalizeImageUrl(node?.attrs?.src || '')
  const alt = node?.attrs?.alt || ''

  if (!src) return null

  const isExternal = src.startsWith('http')

  return (
    <div key={key} className="my-6">
      <div className="w-full rounded-xl shadow-md overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={675}
          className="object-cover w-full h-auto"
          unoptimized={isExternal}
        />
      </div>
    </div>
  )
}

export default function PostContent({ content }: PostContentProps) {
  let parsedContent = content
  
  // If content is a JSON string, parse it
  if (typeof content === 'string') {
    try {
      parsedContent = JSON.parse(content)
    } catch (e) {
      console.error('Failed to parse content as JSON:', e)
      // If parsing fails, treat as HTML string
      return <div className="prose prose-sm md:prose-base max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
    }
  }

  // If content is Prosemirror JSON object with doc structure
  if (typeof parsedContent === 'object' && parsedContent?.type === 'doc' && Array.isArray(parsedContent?.content)) {
    return (
      <div className="space-y-4">
        {parsedContent.content.map((node: any, i: number) => renderProsemirrorNode(node, i))}
      </div>
    )
  }

  // Fallback: show formatted JSON for debugging
  console.warn('PostContent: Unexpected content format', { type: typeof parsedContent, content: parsedContent })
  return (
    <div className="prose max-w-none">
      <pre className="whitespace-pre-wrap wrap-break-word rounded-lg border border-border/50 p-4 bg-muted/50 text-xs overflow-x-auto">
        {JSON.stringify(parsedContent, null, 2)}
      </pre>
    </div>
  )
}
