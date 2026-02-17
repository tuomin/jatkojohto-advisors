import type { Advisor } from "@/types/advisor";

interface AdvisorCardProps {
  advisor: Advisor;
  isSelected: boolean;
  onToggle: (advisor: Advisor) => void;
}

export default function AdvisorCard({ advisor, isSelected, onToggle }: AdvisorCardProps) {
  return (
    <button
      onClick={() => onToggle(advisor)}
      className={`text-left p-4 rounded-xl border transition-all ${
        isSelected
          ? "border-primary bg-primary/5 ring-1 ring-primary/30"
          : "border-gray-200 hover:border-gray-300 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl flex-shrink-0">{advisor.icon}</span>
          <div className="min-w-0">
            <span className="text-sm font-bold text-gray-900 block">{advisor.name}</span>
            <span className="text-xs text-gray-500">{advisor.role}</span>
          </div>
        </div>
        <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center mt-1 ${
          isSelected ? "border-primary bg-primary" : "border-gray-300"
        }`}>
          {isSelected && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2 line-clamp-2">{advisor.thinkingStyle}</p>
    </button>
  );
}
