import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAdvisorChat } from "@/hooks/useAdvisorChat";
import { PREDEFINED_ADVISORS, type Advisor } from "@/types/advisor";
import AdvisorSelector from "@/components/AdvisorSelector";
import QuestionInput from "@/components/QuestionInput";
import ResponseCard from "@/components/ResponseCard";
import CustomAdvisorDialog from "@/components/CustomAdvisorDialog";
import { LogOut, Shield, FileDown } from "lucide-react";
import backgroundImage from "@/assets/background.jpg";

export default function Index() {
  const { session, signOut } = useAuth();
  const { responses, isQuerying, askAdvisors, clearResponses } = useAdvisorChat();
  const [selectedAdvisors, setSelectedAdvisors] = useState<Advisor[]>([]);
  const [allAdvisors, setAllAdvisors] = useState<Advisor[]>(PREDEFINED_ADVISORS);
  const [lastQuestion, setLastQuestion] = useState("");

  const handleToggleAdvisor = (advisor: Advisor) => {
    setSelectedAdvisors(prev => {
      const exists = prev.find(a => a.id === advisor.id);
      if (exists) return prev.filter(a => a.id !== advisor.id);
      if (prev.length >= 4) return prev;
      return [...prev, advisor];
    });
  };

  const handleAsk = async (question: string) => {
    if (selectedAdvisors.length < 2) return;
    setLastQuestion(question);
    await askAdvisors(question, selectedAdvisors);
  };

  const handleAddCustomAdvisor = (advisor: Advisor) => {
    setAllAdvisors(prev => [...prev, advisor]);
    if (selectedAdvisors.length < 4) {
      setSelectedAdvisors(prev => [...prev, advisor]);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="min-h-screen bg-black/50 backdrop-blur-[2px]">
        <header className="px-6 py-8 text-center relative no-print">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Link to="/admin" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-colors text-sm font-medium">
              <Shield className="h-4 w-4" /> Admin
            </Link>
            <button onClick={signOut} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-colors text-sm font-medium">
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">Multi-Perspective Advisor</h1>
          <p className="text-white/70 mt-3 max-w-2xl mx-auto text-sm md:text-base">
            Get diverse insights on your questions from multiple expert perspectives. Select your advisory panel and explore ideas, options, and alternatives.
          </p>
          <p className="text-white/50 text-xs mt-2">
            Signed in as {session?.user?.email} · 15 queries per day
          </p>
        </header>

      <div className="max-w-4xl mx-auto px-4 pb-8 space-y-6">
        <div className="no-print">
          <QuestionInput
            onSubmit={handleAsk}
            disabled={selectedAdvisors.length < 2 || isQuerying}
            isLoading={isQuerying}
          />
        </div>

        <section className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg space-y-4 no-print">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Select Your Advisors</h2>
              <p className="text-sm text-gray-600">Choose 2–4 advisors to analyze your question</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-primary">{selectedAdvisors.length}/4 selected</span>
              <CustomAdvisorDialog onAdd={handleAddCustomAdvisor} />
            </div>
          </div>
          <AdvisorSelector
            advisors={allAdvisors}
            selected={selectedAdvisors}
            onToggle={handleToggleAdvisor}
          />
        </section>

        {responses.length > 0 && (
          <section className="space-y-4 print-results">
            {/* Print-only header */}
            <div className="hidden print-only mb-6">
              <h1 className="text-2xl font-bold mb-2">Multi-Perspective Advisor</h1>
              <div className="mb-3">
                <p className="text-sm font-medium">Question:</p>
                <p className="text-base italic">{lastQuestion}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium">Advisors:</p>
                <ul className="list-none space-y-1 mt-1">
                  {selectedAdvisors.map(a => (
                    <li key={a.id} className="text-sm flex items-center gap-2">
                      <span>{a.icon}</span> {a.name} — {a.role}
                    </li>
                  ))}
                </ul>
              </div>
              <hr className="border-t mb-4" />
            </div>

            <div className="flex items-center justify-between no-print">
              <h2 className="text-sm font-medium text-white">Advisor Perspectives</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors"
                >
                  <FileDown className="h-3.5 w-3.5" /> Save as PDF
                </button>
                <button onClick={clearResponses} className="text-xs text-white/60 hover:text-white transition-colors">
                  Clear
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {responses.map(response => {
                const advisor = allAdvisors.find(a => a.id === response.advisorId);
                if (!advisor) return null;
                return (
                  <ResponseCard key={response.advisorId} advisor={advisor} response={response} />
                );
              })}
            </div>
          </section>
        )}
      </div>
      </div>
    </div>
  );
}
