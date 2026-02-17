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
    <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 space-y-4 shadow-lg">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Your Question or Situation</h2>
        <p className="text-sm text-gray-600 mt-1">Describe what you need advice on — a decision, problem, or situation to analyze.</p>
      </div>
      <textarea
        value={question}
        onChange={e => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g., We're considering expanding into a new market. Our current revenue is $2M annually, and the new market could double our customer base. However, it would require significant upfront investment and hiring..."
        rows={5}
        maxLength={5000}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary resize-vertical"
      />
      <div className="flex items-center justify-between">
        <p className="text-xs text-primary/70">Press ⌘+Enter to submit</p>
        <button
          type="submit"
          disabled={disabled || !question.trim()}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          <Send className="h-4 w-4" />
          {isLoading ? "Thinking..." : "Get Insights"}
        </button>
      </div>
    </form>
  );
}
