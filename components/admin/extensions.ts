import {
  TiptapImage,
  TiptapLink,
  UpdatedImage,
  TaskList,
  TaskItem,
  HorizontalRule,
  StarterKit,
  Placeholder,
  Command,
  renderItems,
} from "novel"
import { Table } from "@tiptap/extension-table"
import { TableRow } from "@tiptap/extension-table-row"
import { TableHeader } from "@tiptap/extension-table-header"
import { TableCell } from "@tiptap/extension-table-cell"
import { InputRule } from "@tiptap/core"
import { UploadImagesPlugin } from "novel"
import { suggestionItems } from "./SlashCommandMenu"

export const defaultExtensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: "list-disc list-outside leading-6 my-2",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal list-outside leading-6 my-2",
      },
    },
    listItem: {
      HTMLAttributes: {
        class: "leading-6 my-0.5",
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: "border-l-4 border-primary",
      },
    },
    heading: {
      HTMLAttributes: {
        class: "font-bold",
      },
      levels: [1, 2, 3, 4, 5, 6],
    },
    codeBlock: {
      HTMLAttributes: {
        class: "rounded-md border border-border/60 bg-slate-100 dark:bg-slate-800/60 p-3 font-mono text-sm",
      },
    },
    code: {
      HTMLAttributes: {
        class: "rounded bg-slate-100 dark:bg-slate-800/70 px-1 py-0.5 font-mono",
        spellcheck: "false",
      },
    },
    horizontalRule: false,
    dropcursor: {
      color: "#DBEAFE",
      width: 4,
    },
    gapcursor: false,
  }),
  HorizontalRule.extend({
    addInputRules() {
      return [
        new InputRule({
          find: /^(?:---|—-|___\s|\*\*\*\s)$/,
          handler: ({ state, range }) => {
            const attributes = {}
            const { tr } = state
            const start = range.from
            const end = range.to
            tr.insert(start - 1, this.type.create(attributes)).delete(
              tr.mapping.map(start),
              tr.mapping.map(end)
            )
          },
        }),
      ]
    },
  }).configure({
    HTMLAttributes: {
      class: "mt-4 mb-6 border-t border-muted-foreground",
    },
  }),
  TiptapLink.configure({
    HTMLAttributes: {
      class:
        "text-primary underline underline-offset-[3px] hover:text-primary-500 transition-colors cursor-pointer",
    },
  }),
  TiptapImage.configure({
    allowBase64: true,
    HTMLAttributes: {
      class: "rounded-lg border border-muted",
    },
  }),
  UpdatedImage.configure({
    HTMLAttributes: {
      class: "rounded-lg border border-muted",
    },
  }),
  Placeholder.configure({
    placeholder: ({ node }: any) => {
      if (node.type.name === "heading") {
        return `Heading ${node.attrs.level}`
      }
      return "Type '/' to see commands, or just start typing..."
    },
    includeChildren: true,
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: "not-prose pl-2",
    },
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: "flex items-start my-4",
    },
    nested: true,
  }),
  Table.configure({
    resizable: true,
    handleWidth: 4,
    HTMLAttributes: {
      class: "border-collapse table-auto w-full border border-gray-300 dark:border-gray-700",
    },
  }),
  TableRow.configure({
    HTMLAttributes: {
      class: "border-b border-gray-300 dark:border-gray-700",
    },
  }),
  TableHeader.configure({
    HTMLAttributes: {
      class: "bg-gray-100 dark:bg-gray-800 font-semibold text-foreground border border-gray-300 dark:border-gray-700 px-4 py-2 text-left",
    },
  }),
  TableCell.configure({
    HTMLAttributes: {
      class: "border border-gray-300 dark:border-gray-700 px-4 py-2 text-foreground/90",
    },
  }),
  Command.configure({
    suggestion: {
      items: () => suggestionItems,
      render: renderItems,
    },
  }),
]
