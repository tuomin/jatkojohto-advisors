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
    <div className="space-y-4">
      <div className="flex border-b border-gray-200">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveTab(cat.key)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === cat.key
                ? "border-gray-800 text-gray-900 bg-gray-100 rounded-t-lg"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {cat.label.split(' & ')[0]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
