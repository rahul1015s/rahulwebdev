"use client"

import React, { useState, useRef, useEffect } from 'react'
import { normalizeImageUrl } from '@/utils/url-utils'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Copy, Check, ExternalLink, Maximize2, Minimize2, ChevronRight, ChevronDown } from 'lucide-react'

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
        1: 'text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mt-6 sm:mt-7 md:mt-8 mb-3 sm:mb-3.5 md:mb-4 first:mt-0 group relative scroll-mt-16 sm:scroll-mt-20',
        2: 'text-lg sm:text-xl md:text-2xl font-bold tracking-tight mt-4 sm:mt-5 md:mt-6 mb-2.5 sm:mb-3 group relative scroll-mt-16 sm:scroll-mt-20',
        3: 'text-base sm:text-lg md:text-xl font-semibold tracking-tight mt-3 sm:mt-4 md:mt-5 mb-2 sm:mb-2.5 group relative scroll-mt-16 sm:scroll-mt-20',
      }
      const headingClasses = headingClassesMap[level as keyof typeof headingClassesMap] || 'text-lg sm:text-xl font-semibold tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-3 group relative'
      
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
          className="text-sm sm:text-base md:text-base leading-6 sm:leading-6.5 md:leading-7 text-foreground/90 my-2 sm:my-2.5 md:my-3 first:mt-0 hover:text-foreground transition-colors duration-200"
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
          className="list-disc list-outside space-y-1 sm:space-y-1.5 my-2.5 sm:my-3 md:my-3.5 ml-4 sm:ml-5 md:ml-6"
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
          className="list-decimal list-outside space-y-1 sm:space-y-1.5 my-2.5 sm:my-3 md:my-3.5 ml-4 sm:ml-5 md:ml-6"
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
          className="text-sm sm:text-base leading-6 sm:leading-6.5 text-foreground/90 mb-0.5 sm:mb-1 pl-1 hover:text-foreground transition-colors duration-200"
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
          className="my-5 sm:my-6"
        >
          <div className="h-px w-full bg-linear-to-r from-transparent via-emerald-500/30 to-transparent" />
        </motion.div>
      )

    case 'text':
      let text: React.ReactNode = node.text || ''
      
      if (node.marks && node.marks.length > 0) {
        for (let i = node.marks.length - 1; i >= 0; i--) {
          const mark = node.marks[i]
          if (mark.type === 'bold') {
            text = <strong className="font-semibold text-foreground bg-emerald-50 dark:bg-emerald-900/20 px-0.5 sm:px-1 rounded hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors duration-200">{text}</strong>
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
          className="border-l-3 sm:border-l-4 border-emerald-500/50 pl-4 sm:pl-6 md:pl-8 py-2 sm:py-3 italic my-3.5 sm:my-4 md:my-5 text-foreground/80 bg-linear-to-r from-emerald-50/50 to-transparent dark:from-emerald-900/10 rounded-r-lg relative group hover:border-emerald-500/70 transition-colors duration-300"
        >
          <div className="absolute -left-1.5 sm:-left-2 top-2 sm:top-3 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            ❝
          </div>
          {node.content?.map((child: any, i: number) => renderProsemirrorNode(child, i, depth + 1))}
        </motion.blockquote>
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
      className="relative bg-gray-900 text-gray-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-mono group hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
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
  
  const codeContent = node.content?.map((child: any, i: number) => 
    renderProsemirrorNode(child, i)
  ) || ''
  
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
      className="relative my-3 sm:my-4 md:my-5 rounded-lg sm:rounded-xl overflow-hidden border border-gray-800 shadow-lg md:shadow-xl group bg-gray-950"
    >
      {/* Code header - RESPONSIVE */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-gray-900 px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-800">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
          <div className="flex gap-1 shrink-0">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
          </div>
          
          {language && (
            <span className="ml-2 text-xs sm:text-sm font-mono text-gray-400 truncate max-w-30` sm:max-w-50 md:max-w-none">
              {language}
            </span>
          )}
          
          {/* Mobile line count */}
          {shouldExpand && (
            <span className="ml-auto text-xs text-gray-500 sm:hidden">
              {codeLines} lines
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-1.5 sm:gap-2">
          {shouldExpand && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200 group/expand flex items-center justify-center"
              aria-label={expanded ? "Collapse code" : "Expand code"}
            >
              {expanded ? (
                <Minimize2 size={12} className="sm:size-4 text-gray-400 group-hover/expand:text-gray-300" />
              ) : (
                <Maximize2 size={12} className="sm:size-4 text-gray-400 group-hover/expand:text-gray-300" />
              )}
            </button>
          )}
          
          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-emerald-900/30 hover:bg-emerald-800/50 text-emerald-400 hover:text-emerald-300 transition-all duration-200 text-xs sm:text-sm"
            aria-label={copied ? "Code copied" : "Copy code"}
          >
            {copied ? (
              <>
                <Check size={12} className="sm:size-4 shrink-0" />
                <span className="hidden sm:inline">Copied</span>
              </>
            ) : (
              <>
                <Copy size={12} className="sm:size-4 shrink-0" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Code content - FULLY RESPONSIVE */}
      <div className={`
        relative overflow-auto
        ${shouldExpand && !expanded ? 'max-h-64 sm:max-h-80 md:max-h-96' : ''}
        ${shouldExpand ? 'transition-all duration-300 ease-out' : ''}
        scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900
      `}>
        {/* Horizontal scroll indicator */}
        {showScrollHint && (
          <div className="sticky top-0 left-0 z-10 w-full h-1 bg-linear-to-r from-transparent via-gray-700/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        )}
        
        <div className="relative">
          {/* Line numbers - responsive */}
          {codeLines > 1 && (
            <div className="
              absolute left-0 top-0 bottom-0
              hidden sm:block
              select-none
              py-3 sm:py-4
              pr-3 sm:pr-4
              text-right
              text-gray-500
              font-mono
              text-xs sm:text-sm
              border-r border-gray-800
              bg-gray-950
              z-10
            ">
              {Array.from({ length: codeLines }, (_, i) => i + 1).map(line => (
                <div key={line} className="leading-5 sm:leading-6 md:leading-7 h-5 sm:h-6 md:h-7">
                  {line}
                </div>
              ))}
            </div>
          )}
          
          {/* Code content area */}
          <div className={`
            ${codeLines > 1 ? 'sm:pl-12 md:pl-14' : ''}
            min-w-0
          `}>
            <pre 
              ref={preRef}
              className="
                p-3 sm:p-4 md:p-5
                overflow-x-auto
                overflow-y-hidden
                min-h-15
              "
            >
              <code className="
                font-mono
                text-xs sm:text-sm md:text-base
                text-gray-100
                leading-5 sm:leading-6 md:leading-7
                whitespace-pre
                block
                min-w-fit
              ">
                {codeContent}
              </code>
            </pre>
          </div>
        </div>
        
        {/* Scroll hint for mobile */}
        {showScrollHint && (
          <div className="
            sm:hidden
            absolute bottom-2 right-2
            px-2 py-1
            bg-gray-900/90 backdrop-blur-sm
            text-gray-400 text-xs
            rounded-full
            flex items-center gap-1
            animate-pulse
          ">
            <ChevronRight size={10} />
            <span>Scroll</span>
          </div>
        )}
      </div>
      
      {/* Line count badge - desktop */}
      {shouldExpand && (
        <div className="
          hidden sm:flex
          absolute bottom-3 right-3
          px-2 py-1
          bg-gray-900/80 backdrop-blur-sm
          text-gray-400 text-xs
          rounded
          items-center gap-1
        ">
          <span>{codeLines} lines</span>
          {!expanded && <span className="text-gray-500">•</span>}
          {!expanded && <span className="text-emerald-400">+</span>}
        </div>
      )}
      
      {/* Expand indicator for mobile */}
      {shouldExpand && !expanded && (
        <div className="
          sm:hidden
          absolute inset-x-0 bottom-0
          h-16
          bg-linear-to-t from-gray-950 via-gray-950/90 to-transparent
          flex items-end justify-center
          pb-3
          pointer-events-none
        ">
          <button
            onClick={() => setExpanded(true)}
            className="
              pointer-events-auto
              text-xs
              text-emerald-400
              bg-gray-900/90 backdrop-blur-sm
              px-4 py-2
              rounded-full
              flex items-center gap-2
              hover:bg-gray-800/90
              transition-colors duration-200
              border border-gray-800
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