import { useState } from "react";
import type { Advisor } from "@/types/advisor";
import { Plus, X } from "lucide-react";

interface CustomAdvisorDialogProps {
  onAdd: (advisor: Advisor) => void;
}

export default function CustomAdvisorDialog({ onAdd }: CustomAdvisorDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [background, setBackground] = useState("");
  const [thinkingStyle, setThinkingStyle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const advisor: Advisor = {
      id: `custom-${Date.now()}`,
      name,
      role,
      category: "domain",
      background,
      thinkingStyle,
      icon: "🧑‍💼",
    };
    onAdd(advisor);
    setOpen(false);
    setName("");
    setRole("");
    setBackground("");
    setThinkingStyle("");
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
      >
        <Plus className="h-3.5 w-3.5" /> Custom Advisor
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 space-y-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-card-foreground">Create Custom Advisor</h2>
          <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            required
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            value={role}
            onChange={e => setRole(e.target.value)}
            placeholder="Role / Title"
            required
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <textarea
            value={background}
            onChange={e => setBackground(e.target.value)}
            placeholder="Background description..."
            required
            rows={2}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
          <textarea
            value={thinkingStyle}
            onChange={e => setThinkingStyle(e.target.value)}
            placeholder="Thinking style / approach..."
            required
            rows={2}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Add Advisor
          </button>
        </form>
      </div>
    </div>
  );
}
