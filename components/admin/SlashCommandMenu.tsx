"use client"
import {
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  CheckSquare,
  Quote,
  Code,
  Minus,
  Image as ImageIcon,
} from "lucide-react"
import { createSuggestionItems } from "novel"
import { Selection } from "prosemirror-state"

export const suggestionItems = createSuggestionItems([
  {
    title: "Heading 1",
    description: "Large section heading",
    searchTerms: ["heading", "h1", "title"],
    icon: <Heading1 size={18} />,
    command: ({ editor, range }: any) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run()
    },
  },
  {
    title: "Heading 2",
    description: "Medium section heading",
    searchTerms: ["heading", "h2", "subtitle"],
    icon: <Heading2 size={18} />,
    command: ({ editor, range }: any) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run()
    },
  },
  {
    title: "Heading 3",
    description: "Small section heading",
    searchTerms: ["heading", "h3"],
    icon: <Heading3 size={18} />,
    command: ({ editor, range }: any) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 3 })
        .run()
    },
  },
  {
    title: "Bullet List",
    description: "Create a bullet list",
    searchTerms: ["bullet", "list", "unordered"],
    icon: <List size={18} />,
    command: ({ editor, range }: any) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleBulletList()
        .run()
    },
  },
  {
    title: "Numbered List",
    description: "Create a numbered list",
    searchTerms: ["ordered", "list", "number"],
    icon: <ListOrdered size={18} />,
    command: ({ editor, range }: any) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleOrderedList()
        .run()
    },
  },
  {
    title: "Checklist",
    description: "Create a task list",
    searchTerms: ["task", "check", "todo"],
    icon: <CheckSquare size={18} />,
    command: ({ editor, range }: any) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleTaskList()
        .run()
    },
  },
  {
    title: "Blockquote",
    description: "Create a blockquote",
    searchTerms: ["quote", "blockquote"],
    icon: <Quote size={18} />,
    command: ({ editor, range }: any) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .toggleBlockquote()
        .run()
    },
  },
  {
    title: "Code Block",
    description: "Create a code block",
    searchTerms: ["code", "codeblock"],
    icon: <Code size={18} />,
    command: ({ editor, range }: any) => {
      // create a code block then move the cursor after it so the user can continue typing below
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run()

      // move selection to after the code block and ensure a paragraph is available
      editor
        .chain()
        .focus()
        .command(({ tr, state }: any) => {
          const { $from } = state.selection
          const after = $from.after()
          if (after !== undefined) {
            tr.setSelection(Selection.near(state.doc.resolve(after)))
          }
          return true
        })
        .run()
    },
  },
  {
    title: "Divider",
    description: "Add a horizontal line",
    searchTerms: ["divider", "line", "hr"],
    icon: <Minus size={18} />,
    command: ({ editor, range }: any) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setHorizontalRule()
        .run()
    },
  },
  {
    title: "Image",
    description: "Upload an image",
    searchTerms: ["image", "photo", "picture"],
    icon: <ImageIcon size={18} />,
    command: ({ editor, range }: any) => {
      const url = prompt("Enter image URL:")
      if (url) {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setImage({ src: url })
          .run()
      }
    },
  },
])
