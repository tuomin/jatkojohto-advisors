import { useState, useCallback } from "react";
import { useAuth } from "./useAuth";
import type { Advisor, AdvisorResponse } from "@/types/advisor";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export function useAdvisorChat() {
  const { session } = useAuth();
  const [responses, setResponses] = useState<AdvisorResponse[]>([]);
  const [isQuerying, setIsQuerying] = useState(false);

  const askAdvisors = useCallback(async (question: string, advisors: Advisor[]) => {
    if (!session?.access_token) return;

    setIsQuerying(true);
    setResponses(advisors.map(a => ({ advisorId: a.id, content: "", isLoading: true })));

    const promises = advisors.map(async (advisor) => {
      try {
        const res = await fetch(`${SUPABASE_URL}/functions/v1/advisor-chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ question, advisor }),
        });

        if (res.status === 401) {
          setResponses(prev => prev.map(r =>
            r.advisorId === advisor.id ? { ...r, content: "Unauthorized. Please sign in again.", isLoading: false } : r
          ));
          return;
        }

        if (res.status === 429) {
          setResponses(prev => prev.map(r =>
            r.advisorId === advisor.id ? { ...r, content: "Daily query limit reached. Please try again tomorrow.", isLoading: false } : r
          ));
          return;
        }

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) throw new Error("No response body");

        let content = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          content += chunk;
          setResponses(prev => prev.map(r =>
            r.advisorId === advisor.id ? { ...r, content, isLoading: false } : r
          ));
        }
      } catch (error) {
        setResponses(prev => prev.map(r =>
          r.advisorId === advisor.id ? { ...r, content: "An error occurred. Please try again.", isLoading: false } : r
        ));
      }
    });

    await Promise.all(promises);
    setIsQuerying(false);
  }, [session]);

  const clearResponses = useCallback(() => setResponses([]), []);

  return { responses, isQuerying, askAdvisors, clearResponses };
}
