import { useState } from "react";
import { Send } from "lucide-react";

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  disabled: boolean;
  isLoading: boolean;
}

export default function QuestionInput({ onSubmit, disabled, isLoading }: QuestionInputProps) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || disabled) return;
    onSubmit(question.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        value={question}
        onChange={e => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe your question or situation..."
        rows={4}
        maxLength={5000}
        className="w-full rounded-lg border border-input bg-card px-4 py-3 text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
      />
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">⌘+Enter to submit</p>
        <button
          type="submit"
          disabled={disabled || !question.trim()}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {isLoading ? "Thinking..." : <>Ask Advisors <Send className="h-3.5 w-3.5" /></>}
        </button>
      </div>
    </form>
  );
}
