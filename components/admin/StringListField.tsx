"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

interface StringListFieldProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  helperText?: string;
}

export default function StringListField({
  label,
  value,
  onChange,
  placeholder = "Add item",
  helperText,
}: StringListFieldProps) {
  const [draft, setDraft] = useState("");

  const addItem = () => {
    const next = draft.trim();
    if (!next) return;

    onChange([...value, next]);
    setDraft("");
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-semibold">{label}</label>
        {helperText ? <p className="mt-1 text-xs text-muted-foreground">{helperText}</p> : null}
      </div>

      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addItem();
            }
          }}
          placeholder={placeholder}
          className="w-full rounded-lg border border-border/50 px-4 py-2.5"
        />
        <button
          type="button"
          onClick={addItem}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg border border-border/70 px-3 text-sm font-medium transition hover:bg-muted"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>

      {value.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {value.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3 py-1.5 text-sm"
            >
              {item}
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-muted-foreground transition hover:text-foreground"
                aria-label={`Remove ${item}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">No items added yet.</p>
      )}
    </div>
  );
}
