"use client"

import React, { useState, useRef, useEffect } from 'react'
import { normalizeImageUrl } from '@/utils/url-utils'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Copy, Check, ExternalLink, Maximize2, Minimize2, ChevronRight, ChevronDown } from 'lucide-react'

interface PostContentProps {
  content: any
}

type CodeTokenType =
  | 'plain'
  | 'comment'
  | 'string'
  | 'keyword'
  | 'number'
  | 'function'
  | 'operator'
  | 'variable'
  | 'tag'

type CodeToken = {
  type: CodeTokenType
  value: string
}

const JS_TS_KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
  'switch', 'case', 'break', 'continue', 'class', 'new', 'import', 'from',
  'export', 'default', 'async', 'await', 'try', 'catch', 'finally', 'throw',
  'extends', 'implements', 'interface', 'type', 'enum', 'true', 'false',
  'null', 'undefined', 'typeof', 'instanceof', 'in', 'of', 'this', 'super'
])

function tokenClassName(type: CodeTokenType) {
  switch (type) {
    case 'comment':
      return 'text-slate-500 italic'
    case 'string':
      return 'text-amber-300'
    case 'keyword':
      return 'text-cyan-300'
    case 'number':
      return 'text-fuchsia-300'
    case 'function':
      return 'text-emerald-300'
    case 'operator':
      return 'text-sky-200'
    case 'variable':
      return 'text-rose-300'
    case 'tag':
      return 'text-violet-300'
    case 'plain':
    default:
      return 'text-slate-100'
  }
}

function getLanguageFamily(language: string) {
  const normalized = language.toLowerCase()
  if (/(ts|tsx|js|jsx|javascript|typescript|json)/.test(normalized)) return 'js'
  if (/(html|xml|svg)/.test(normalized)) return 'html'
  return 'plain'
}

function highlightCodeLine(line: string, language: string) {
  const family = getLanguageFamily(language)
  const tokens: CodeToken[] = []
  const pattern =
    family === 'html'
      ? /<!--.*?$|<\/?[A-Za-z][^>]*>|"[^"]*"|'[^']*'|\b\d+(?:\.\d+)?\b/gm
      : /\/\/.*$|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b\d+(?:\.\d+)?\b|=>|===|!==|==|!=|<=|>=|&&|\|\||[{}()[\].,;:+\-*/=<>!&|?]+|\b[A-Za-z_$][\w$]*\b/g

  let lastIndex = 0

  for (const match of line.matchAll(pattern)) {
    const value = match[0]
    const start = match.index ?? 0

    if (start > lastIndex) {
      tokens.push({ type: 'plain', value: line.slice(lastIndex, start) })
    }

    let type: CodeTokenType = 'plain'

    if (family === 'html') {
      if (value.startsWith('<!--')) type = 'comment'
      else if (value.startsWith('"') || value.startsWith("'")) type = 'string'
      else if (/^\d/.test(value)) type = 'number'
      else if (value.startsWith('<')) type = 'tag'
    } else {
      if (value.startsWith('//')) type = 'comment'
      else if (value.startsWith('"') || value.startsWith("'") || value.startsWith('`')) type = 'string'
      else if (/^\d/.test(value)) type = 'number'
      else if (JS_TS_KEYWORDS.has(value)) type = 'keyword'
      else if (/^(=>|===|!==|==|!=|<=|>=|&&|\|\||[{}()[\].,;:+\-*/=<>!&|?]+)$/.test(value)) type = 'operator'
      else {
        const nextChar = line[(match.index ?? 0) + value.length]
        type = nextChar === '(' ? 'function' : 'variable'
      }
    }

    tokens.push({ type, value })
    lastIndex = start + value.length
  }

  if (lastIndex < line.length) {
    tokens.push({ type: 'plain', value: line.slice(lastIndex) })
  }

  return tokens
}

function renderHighlightedCode(codeText: string, language: string) {
  const lines = codeText.split('\n')

  return lines.map((line, lineIndex) => {
    const tokens = highlightCodeLine(line, language)
    return (
      <div key={`line-${lineIndex}`} className="min-h-6">
        {tokens.length > 0 ? tokens.map((token, tokenIndex) => (
          <span
            key={`token-${lineIndex}-${tokenIndex}`}
            className={tokenClassName(token.type)}
          >
            {token.value}
          </span>
        )) : <span>&nbsp;</span>}
      </div>
    )
  })
}

// Convert Prosemirror/Novel JSON to React elements
function renderProsemirrorNode(node: any, index: number = 0, depth: number = 0): React.ReactNode {
  if (!node) return null

  const key = `node-${depth}-${index}`

  switch (node.type) {
    case 'heading':
      const level = node.attrs?.level || 1
      const headingClassesMap: Record<number, string> = {
        1: 'mt-6 mb-2.5 first:mt-0 text-xl sm:text-2xl font-semibold tracking-tight group relative scroll-mt-16 sm:scroll-mt-20',
        2: 'mt-5 mb-2 text-lg sm:text-xl font-semibold tracking-tight group relative scroll-mt-16 sm:scroll-mt-20',
        3: 'mt-4 mb-2 text-base sm:text-lg font-semibold tracking-tight group relative scroll-mt-16 sm:scroll-mt-20',
      }
      const headingClasses = headingClassesMap[level as keyof typeof headingClassesMap] || 'mt-4 mb-2 text-base sm:text-lg font-semibold tracking-tight group relative'
      
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
        <p
          key={key}
          className="my-2 text-[15px] leading-7 text-foreground/90 first:mt-0"
        >
          {node.content?.map((child: any, i: number) => renderProsemirrorNode(child, i, depth + 1))}
        </p>
      )

    case 'bulletList':
      return (
        <ul
          key={key}
          className="my-2.5 ml-5 list-outside list-disc space-y-1"
        >
          {node.content?.map((child: any, i: number) => renderProsemirrorNode(child, i, depth + 1))}
        </ul>
      )

    case 'orderedList':
      return (
        <ol
          key={key}
          className="my-2.5 ml-5 list-outside list-decimal space-y-1"
          start={node.attrs?.start || 1}
        >
          {node.content?.map((child: any, i: number) => renderProsemirrorNode(child, i, depth + 1))}
        </ol>
      )

    case 'listItem':
      return (
        <li
          key={key}
          className="mb-0.5 pl-0.5 text-[15px] leading-7 text-foreground/90"
        >
          {node.content?.map((child: any, i: number) => renderProsemirrorNode(child, i, depth + 1))}
        </li>
      )

    case 'horizontalRule':
      return <div key={key} className="my-5 h-px w-full bg-border" />

    case 'text':
      let text: React.ReactNode = node.text || ''
      
      if (node.marks && node.marks.length > 0) {
        for (let i = node.marks.length - 1; i >= 0; i--) {
          const mark = node.marks[i]
          if (mark.type === 'bold') {
            text = <strong className="font-semibold text-foreground">{text}</strong>
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
        <blockquote
          key={key}
          className="my-4 border-l-2 border-emerald-500/60 pl-4 italic text-foreground/80"
        >
          {node.content?.map((child: any, i: number) => renderProsemirrorNode(child, i, depth + 1))}
        </blockquote>
      )

    case 'table':
      return (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="my-3 sm:my-4 md:my-5 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <table className="w-full border-collapse text-sm">
            <tbody>
              {node.content?.map((child: any, i: number) => renderProsemirrorNode(child, i, depth + 1))}
            </tbody>
          </table>
        </motion.div>
      )

    case 'tableRow':
      return (
        <tr key={key} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
          {node.content?.map((child: any, i: number) => renderProsemirrorNode(child, i, depth + 1))}
        </tr>
      )

    case 'tableHeader':
      return (
        <th 
          key={key}
          className="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-left font-semibold bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 last:border-r-0 text-foreground"
        >
          {node.content?.map((child: any, i: number) => renderProsemirrorNode(child, i, depth + 1))}
        </th>
      )

    case 'tableCell':
      return (
        <td 
          key={key}
          className="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 border-r border-gray-200 dark:border-gray-700 last:border-r-0 text-foreground/90"
        >
          {node.content?.map((child: any, i: number) => renderProsemirrorNode(child, i, depth + 1))}
        </td>
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
      className="relative cursor-pointer rounded bg-slate-100 px-1.5 py-0.5 text-xs font-mono text-slate-900 transition-colors duration-200 group hover:bg-slate-200 dark:bg-slate-800/70 dark:text-slate-100 dark:hover:bg-slate-700"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCopy}
    >
      {text}
      <motion.span 
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block"
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
      className="inline-flex items-center gap-0.5 sm:gap-1 text-emerald-600 dark:text-emerald-400 underline underline-offset-3 sm:underline-offset-4 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-200 group"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {text}
      {isExternal && (
        <ExternalLink size={10} className="sm:size-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0.5 transition-all duration-200" />
      )}
    </a>
  )
}

// Helper component for code blocks
function CodeBlock({ node, index }: { node: any; index: number }) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [showScrollHint, setShowScrollHint] = useState(false)
  const preRef = useRef<HTMLPreElement>(null)
  
  const language = node.attrs?.params || ''
  const codeText = node.content?.map((child: any) => child.text).join('') || ''
  const codeLines = codeText.split('\n').length
  const shouldExpand = codeLines > 15

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Check for horizontal overflow
  useEffect(() => {
    const checkOverflow = () => {
      if (preRef.current) {
        const hasOverflow = preRef.current.scrollWidth > preRef.current.clientWidth
        setShowScrollHint(hasOverflow)
      }
    }
    
    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    
    return () => window.removeEventListener('resize', checkOverflow)
  }, [codeText, expanded])

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative my-6 overflow-hidden rounded-3xl border border-slate-800/90 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.08),_transparent_24%),linear-gradient(180deg,#06111f_0%,#020617_100%)] text-slate-100 shadow-[0_34px_80px_-44px_rgba(2,12,27,0.95)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/90 px-4 py-3 sm:px-5">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <div className="hidden items-center gap-1.5 sm:flex">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
          </div>
          {language && (
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-300">
              {language}
            </span>
          )}
          {!language && (
            <span className="rounded-full border border-slate-700 bg-slate-800/70 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-300">
              snippet
            </span>
          )}

          {shouldExpand && (
            <span className="text-xs text-slate-400 sm:hidden">
              {codeLines} lines
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {shouldExpand && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900 p-2 transition-colors duration-200 hover:bg-slate-800"
              aria-label={expanded ? "Collapse code" : "Expand code"}
            >
              {expanded ? (
                <Minimize2 size={13} className="text-slate-300 sm:size-4" />
              ) : (
                <Maximize2 size={13} className="text-slate-300 sm:size-4" />
              )}
            </button>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-2.5 py-1.5 text-xs font-medium text-white transition-all duration-200 hover:bg-emerald-400 sm:gap-2 sm:px-3 sm:text-sm"
            aria-label={copied ? "Code copied" : "Copy code"}
          >
            {copied ? (
              <>
                <Check size={12} className="shrink-0 sm:size-4" />
                <span className="hidden sm:inline">Copied</span>
              </>
            ) : (
              <>
                <Copy size={12} className="shrink-0 sm:size-4" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className={`
        relative overflow-auto
        ${shouldExpand && !expanded ? 'max-h-64 sm:max-h-80 md:max-h-96' : ''}
        ${shouldExpand ? 'transition-all duration-300 ease-out' : ''}
        scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900
      `}>
        {showScrollHint && (
          <div className="pointer-events-none sticky left-0 top-0 z-10 h-px w-full bg-linear-to-r from-transparent via-emerald-400/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        )}

        <div className="relative">
          {codeLines > 1 && (
            <div className="
              absolute left-0 top-0 bottom-0
              hidden sm:block
              select-none
              py-4
              pr-4
              text-right
              text-slate-500
              font-mono
              text-xs
              border-r border-slate-800
              bg-slate-950
              z-10
            ">
              {Array.from({ length: codeLines }, (_, i) => i + 1).map(line => (
                <div key={line} className="h-6 leading-6">
                  {line}
                </div>
              ))}
            </div>
          )}

          <div className={`
            ${codeLines > 1 ? 'sm:pl-14' : ''}
            min-w-0
          `}>
            <pre 
              ref={preRef}
              className="
                p-4 sm:p-5
                overflow-x-auto
                overflow-y-hidden
                min-h-[72px]
              "
            >
              <code className="
                font-mono
                text-[13px] sm:text-[14px]
                leading-6 sm:leading-7
                whitespace-pre
                block
                min-w-fit
                antialiased
              ">
                {renderHighlightedCode(codeText, language)}
              </code>
            </pre>
          </div>
        </div>
        
        {showScrollHint && (
          <div className="
            sm:hidden
            absolute bottom-2 right-2
            px-2 py-1
            bg-slate-900/90 backdrop-blur-sm
            text-slate-300 text-xs
            rounded-full
            flex items-center gap-1
            animate-pulse
          ">
            <ChevronRight size={10} />
            <span>Scroll</span>
          </div>
        )}
      </div>
      
      {shouldExpand && (
        <div className="
          hidden sm:flex
          absolute bottom-3 right-3
          px-2 py-1
          bg-slate-900/85 backdrop-blur-sm
          text-slate-300 text-xs
          rounded
          items-center gap-1
        ">
          <span>{codeLines} lines</span>
          {!expanded && <span className="text-slate-500">•</span>}
          {!expanded && <span className="text-emerald-400">+</span>}
        </div>
      )}

      {shouldExpand && !expanded && (
        <div className="
          sm:hidden
          absolute inset-x-0 bottom-0
          h-16
          bg-linear-to-t from-slate-950 via-slate-950/90 to-transparent
          flex items-end justify-center
          pb-3
          pointer-events-none
        ">
          <button
            onClick={() => setExpanded(true)}
            className="
              pointer-events-auto
              text-xs
              text-emerald-300
              bg-slate-900/95 backdrop-blur-sm
              px-4 py-2
              rounded-full
              flex items-center gap-2
              hover:bg-slate-800/90
              transition-colors duration-200
              border border-slate-700
              shadow-lg
            "
          >
            <ChevronDown size={12} />
            <span>Show all {codeLines} lines</span>
          </button>
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
      <span id={anchorId} className="scroll-mt-16 sm:scroll-mt-20" />
      {content?.map((child: any, i: number) => renderProsemirrorNode(child, i))}
      <a 
        href={`#${anchorId}`}
        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-emerald-600 hover:text-emerald-700 text-sm sm:text-base"
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
      className="my-5 sm:my-6 md:my-8 group"
    >
      <div className="
        relative
        w-full
        max-w-full
        mx-auto
        rounded-lg sm:rounded-xl lg:rounded-2xl
        overflow-hidden
        shadow-lg sm:shadow-xl
        hover:shadow-xl sm:hover:shadow-2xl
        transition-all duration-500
        bg-gray-900/50
      ">
        {/* Image container with responsive aspect ratio */}
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 70vw"
            className="
              object-contain
              w-full h-full
              absolute top-0 left-0
              transition-transform duration-700
              group-hover:scale-[1.02]
            "
            unoptimized={isExternal}
            loading="lazy"
            quality={90}
          />
          
          {/* Gradient overlay */}
          <div className="
            absolute inset-0
            bg-linear-to-t
            from-black/30 via-transparent to-transparent
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
          " />
        </div>
        
        {/* Image caption */}
        {(alt || title) && (
          <div className="
            absolute bottom-0 left-0 right-0
            p-3 sm:p-4 md:p-5
            bg-linear-to-t from-black/90 via-black/70 to-transparent
            transform translate-y-full
            group-hover:translate-y-0
            transition-transform duration-300
            backdrop-blur-sm
          ">
            <p className="
              text-xs sm:text-sm md:text-base
              text-white/95
              text-center
              line-clamp-2 sm:line-clamp-3
              font-medium
            ">
              {title || alt}
            </p>
          </div>
        )}
        
        {/* Expand button */}
        <button
          onClick={() => window.open(src, '_blank')}
          className="
            absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4
            p-1.5 sm:p-2
            bg-white/95 backdrop-blur-sm
            rounded-lg
            shadow-lg
            opacity-0 group-hover:opacity-100
            transition-all duration-300
            hover:scale-110
            active:scale-95
            focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
          "
          aria-label="Open image in new tab"
        >
          <ExternalLink size={14} className="sm:size-4 md:size-5 text-emerald-700" />
        </button>
      </div>
      
      {/* Fallback caption for mobile if caption is hidden */}
      {(alt || title) && (
        <p className="
          sm:hidden
          mt-2
          text-xs
          text-gray-600 dark:text-gray-400
          text-center
          italic
        ">
          {title || alt}
        </p>
      )}
    </motion.div>
  )
}

export default function PostContent({ content }: PostContentProps) {
  let parsedContent = content
  
  if (typeof content === 'string') {
    try {
      parsedContent = JSON.parse(content)
    } catch (e) {
      console.error('Failed to parse content as JSON:', e)
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="prose prose-sm sm:prose-base max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )
    }
  }

  if (typeof parsedContent === 'object' && parsedContent?.type === 'doc' && Array.isArray(parsedContent?.content)) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-4 sm:space-y-6"
      >
        {parsedContent.content.map((node: any, i: number) => 
          renderProsemirrorNode(node, i)
        )}
      </motion.div>
    )
  }

  console.warn('PostContent: Unexpected content format', { type: typeof parsedContent, content: parsedContent })
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="prose prose-sm sm:prose-base max-w-none"
    >
      <pre className="whitespace-pre-wrap wrap-break-word rounded-lg border border-border/50 p-3 sm:p-4 bg-muted/50 text-xs sm:text-sm overflow-x-auto">
        {JSON.stringify(parsedContent, null, 2)}
      </pre>
    </motion.div>
  )
}
