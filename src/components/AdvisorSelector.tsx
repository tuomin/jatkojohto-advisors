import { useState } from "react";
import type { Advisor } from "@/types/advisor";
import AdvisorCard from "./AdvisorCard";

interface AdvisorSelectorProps {
  advisors: Advisor[];
  selected: Advisor[];
  onToggle: (advisor: Advisor) => void;
}

const CATEGORIES = [
  { key: "business" as const, label: "Business & Leadership" },
  { key: "thinking" as const, label: "Thinking Styles" },
  { key: "domain" as const, label: "Domain Experts" },
];

export default function AdvisorSelector({ advisors, selected, onToggle }: AdvisorSelectorProps) {
  const [activeTab, setActiveTab] = useState<Advisor["category"]>("business");

  const filtered = advisors.filter(a => a.category === activeTab);

  return (
    <div className="space-y-3">
      <div className="flex gap-1 border-b border-white/20">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveTab(cat.key)}
            className={`px-3 py-2 text-xs font-medium transition-colors border-b-2 -mb-px ${
              activeTab === cat.key
                ? "border-white text-white"
                : "border-transparent text-white/60 hover:text-white"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {filtered.map(advisor => (
          <AdvisorCard
            key={advisor.id}
            advisor={advisor}
            isSelected={!!selected.find(s => s.id === advisor.id)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}
