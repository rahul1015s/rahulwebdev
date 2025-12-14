"use client"

import React, { useState } from 'react'
import { normalizeImageUrl } from '@/utils/url-utils'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Copy, Check, ExternalLink, Maximize2, Minimize2 } from 'lucide-react'

interface PostContentProps {
  content: any
}

// Convert Prosemirror/Novel JSON to React elements
function renderProsemirrorNode(node: any, index: number = 0, depth: number = 0): React.ReactNode {
  if (!node) return null

  const key = `node-${depth}-${index}`

  switch (node.type) {
    case 'heading':
      const level = node.attrs?.level || 1
      const headingClassesMap: Record<number, string> = {
        1: 'text-4xl md:text-5xl font-bold tracking-tight mt-12 mb-6 first:mt-0 group relative scroll-mt-20',
        2: 'text-2xl md:text-3xl font-bold tracking-tight mt-10 mb-4 group relative scroll-mt-20',
        3: 'text-xl md:text-2xl font-semibold tracking-tight mt-8 mb-3 group relative scroll-mt-20',
      }
      const headingClasses = headingClassesMap[level as keyof typeof headingClassesMap] || 'text-lg font-semibold tracking-tight mt-8 mb-3 group relative'
      
      const renderHeading = (tag: string) => {
        const HeadingMap: Record<string, any> = {
          h1: <h1 key={key} className={headingClasses}>{renderWithAnchor(node.content, key, 1)}</h1>,
          h2: <h2 key={key} className={headingClasses}>{renderWithAnchor(node.content, key, 2)}</h2>,
          h3: <h3 key={key} className={headingClasses}>{renderWithAnchor(node.content, key, 3)}</h3>,
          h4: <h4 key={key} className={headingClasses}>{renderWithAnchor(node.content, key, 4)}</h4>,
        }
        return HeadingMap[tag]
      }
      return renderHeading(`h${level}`)

    case 'paragraph':
      return (
        <motion.p 
          key={key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.02 }}
          className="text-base md:text-lg leading-7 md:leading-8 text-foreground/90 my-5 first:mt-0 hover:text-foreground transition-colors duration-200"
        >
          {node.content?.map((child: any, i: number) => renderProsemirrorNode(child, i, depth + 1))}
        </motion.p>
      )

    case 'bulletList':
      return (
        <motion.ul 
          key={key}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.03 }}
          className="list-disc list-outside space-y-2.5 my-6 ml-5 md:ml-8"
        >
          {node.content?.map((child: any, i: number) => renderProsemirrorNode(child, i, depth + 1))}
        </motion.ul>
      )

    case 'orderedList':
      return (
        <motion.ol 
          key={key}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.03 }}
          className="list-decimal list-outside space-y-2.5 my-6 ml-5 md:ml-8"
          start={node.attrs?.start || 1}
        >
          {node.content?.map((child: any, i: number) => renderProsemirrorNode(child, i, depth + 1))}
        </motion.ol>
      )

    case 'listItem':
      return (
        <motion.li 
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: index * 0.04 }}
          className="text-base leading-7 text-foreground/90 mb-2 pl-1 hover:text-foreground transition-colors duration-200"
        >
          {node.content?.map((child: any, i: number) => renderProsemirrorNode(child, i, depth + 1))}
        </motion.li>
      )

    case 'horizontalRule':
      return (
        <motion.div 
          key={key}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="my-10"
        >
          <div className="h-px w-full bg-linear-to-r from-transparent via-emerald-500/30 to-transparent" />
        </motion.div>
      )

    case 'text':
      let text: React.ReactNode = node.text || ''
      
      // Apply marks (bold, italic, code, etc.) in reverse order so they compose correctly
      if (node.marks && node.marks.length > 0) {
        for (let i = node.marks.length - 1; i >= 0; i--) {
          const mark = node.marks[i]
          if (mark.type === 'bold') {
            text = <strong className="font-semibold text-foreground bg-emerald-50 dark:bg-emerald-900/20 px-1 rounded hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors duration-200">{text}</strong>
          } else if (mark.type === 'italic') {
            text = <em className="italic text-foreground/95">{text}</em>
          } else if (mark.type === 'code') {
            text = <InlineCode text={node.text} />
          } else if (mark.type === 'link') {
            text = <InteractiveLink href={mark.attrs?.href || '#'} text={node.text} />
          } else if (mark.type === 'underline') {
            text = <u className="underline decoration-emerald-400/50 decoration-2">{text}</u>
          }
        }
      }
      
      return <React.Fragment key={key}>{text}</React.Fragment>

    case 'hardBreak':
      return <br key={key} />

    case 'codeBlock':
      return <CodeBlock key={key} node={node} index={index} />

    case 'blockquote':
      return (
        <motion.blockquote 
          key={key}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="border-l-4 border-emerald-500/50 pl-5 md:pl-8 py-4 italic my-8 text-foreground/80 bg-linear-to-r from-emerald-50/50 to-transparent dark:from-emerald-900/10 rounded-r-lg relative group hover:border-emerald-500/70 transition-colors duration-300"
        >
          <div className="absolute -left-2 top-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            ❝
          </div>
          {node.content?.map((child: any, i: number) => renderProsemirrorNode(child, i, depth + 1))}
        </motion.blockquote>
      )

    case 'image':
      return renderImageNode(node, index)

    default:
      return null
  }
}

// Helper component for inline code
function InlineCode({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.code 
      className="relative bg-gray-900 text-gray-100 px-2 py-1 rounded text-sm font-mono group hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCopy}
    >
      {text}
      <motion.span 
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        initial={{ scale: 0.8 }}
        animate={{ scale: copied ? 1.1 : 1 }}
      >
        {copied ? 'Copied!' : 'Click to copy'}
      </motion.span>
    </motion.code>
  )
}

// Helper component for interactive links
function InteractiveLink({ href, text }: { href: string; text: string }) {
  const isExternal = href.startsWith('http')
  
  return (
    <a 
      href={href} 
      className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 underline underline-offset-4 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-200 group"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {text}
      {isExternal && (
        <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-y-0.5 transition-all duration-200" />
      )}
    </a>
  )
}

// Helper component for code blocks
function CodeBlock({ node, index }: { node: any; index: number }) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)
  
  const codeContent = node.content?.map((child: any, i: number) => 
    renderProsemirrorNode(child, i)
  ) || ''

  const handleCopy = () => {
    const text = node.content?.map((child: any) => child.text).join('') || ''
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const codeLines = codeContent.toString().split('\n').length
  const shouldExpand = codeLines > 15

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative my-8 rounded-xl overflow-hidden border border-gray-800 shadow-xl group"
    >
      {/* Code header */}
      <div className="flex items-center justify-between bg-gray-900 px-4 py-3 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex items-center gap-2">
          {shouldExpand && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200 group/expand"
            >
              {expanded ? (
                <Minimize2 size={14} className="text-gray-400 group-hover/expand:text-gray-300" />
              ) : (
                <Maximize2 size={14} className="text-gray-400 group-hover/expand:text-gray-300" />
              )}
            </button>
          )}
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-900/30 hover:bg-emerald-800/50 text-emerald-400 hover:text-emerald-300 transition-all duration-200 group/copy"
          >
            {copied ? (
              <>
                <Check size={14} />
                <span className="text-xs">Copied</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span className="text-xs">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Code content */}
      <pre className={`
        bg-gray-950 p-4 overflow-x-auto 
        ${shouldExpand && !expanded ? 'max-h-96' : ''}
        ${shouldExpand ? 'transition-all duration-300' : ''}
      `}>
        <code className="font-mono text-sm text-gray-100 leading-relaxed">
          {codeContent}
        </code>
      </pre>
      
      {/* Line count badge */}
      {shouldExpand && (
        <div className="absolute bottom-4 right-4 px-2 py-1 bg-gray-900/80 backdrop-blur-sm text-gray-400 text-xs rounded">
          {codeLines} lines
        </div>
      )}
    </motion.div>
  )
}

// Helper for heading anchors
function renderWithAnchor(content: any[], key: string, level: number) {
  const headingText = content?.map((child: any) => child.text).join('') || ''
  const anchorId = headingText.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-')
  
  return (
    <div className="flex items-center group">
      <span id={anchorId} className="scroll-mt-20" />
      {content?.map((child: any, i: number) => renderProsemirrorNode(child, i))}
      <a 
        href={`#${anchorId}`}
        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-emerald-600 hover:text-emerald-700"
        aria-label={`Link to ${headingText}`}
      >
        #
      </a>
    </div>
  )
}

// Render image node with enhanced features
function renderImageNode(node: any, index: number) {
  const key = `image-${index}`
  const src = normalizeImageUrl(node?.attrs?.src || '')
  const alt = node?.attrs?.alt || ''
  const title = node?.attrs?.title || ''

  if (!src) return null

  const isExternal = src.startsWith('http')

  return (
    <motion.div 
      key={key}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="my-8 group"
    >
      <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
        <div className="relative w-full h-auto">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={675}
            className="object-cover w-full h-auto transition-transform duration-700 group-hover:scale-105"
            unoptimized={isExternal}
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Image caption */}
        {(alt || title) && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-sm text-white/90 text-center">
              {title || alt}
            </p>
          </div>
        )}
        
        {/* Expand button */}
        <button
          onClick={() => window.open(src, '_blank')}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          aria-label="Open image in new tab"
        >
          <ExternalLink size={16} className="text-emerald-700" />
        </button>
      </div>
    </motion.div>
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
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="prose prose-sm md:prose-base max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )
    }
  }

  // If content is Prosemirror JSON object with doc structure
  if (typeof parsedContent === 'object' && parsedContent?.type === 'doc' && Array.isArray(parsedContent?.content)) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {parsedContent.content.map((node: any, i: number) => 
          renderProsemirrorNode(node, i)
        )}
      </motion.div>
    )
  }

  // Fallback: show formatted JSON for debugging
  console.warn('PostContent: Unexpected content format', { type: typeof parsedContent, content: parsedContent })
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="prose max-w-none"
    >
      <pre className="whitespace-pre-wrap break-words rounded-lg border border-border/50 p-4 bg-muted/50 text-xs overflow-x-auto">
        {JSON.stringify(parsedContent, null, 2)}
      </pre>
    </motion.div>
  )
}