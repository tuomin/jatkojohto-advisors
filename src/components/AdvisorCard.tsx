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
      className={`text-left p-3 rounded-lg border transition-all ${
        isSelected
          ? "border-primary bg-primary/5 ring-1 ring-primary/30"
          : "border-border hover:border-primary/40 bg-card"
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{advisor.icon}</span>
        <span className="text-sm font-medium text-card-foreground">{advisor.name}</span>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-2">{advisor.role}</p>
    </button>
  );
}
