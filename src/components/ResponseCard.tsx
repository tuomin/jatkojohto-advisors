import type { Advisor, AdvisorResponse } from "@/types/advisor";

interface ResponseCardProps {
  advisor: Advisor;
  response: AdvisorResponse;
}

export default function ResponseCard({ advisor, response }: ResponseCardProps) {
  return (
    <div className="print-card rounded-lg border border-border bg-card p-4 space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-lg">{advisor.icon}</span>
        <div>
          <h3 className="text-sm font-medium text-card-foreground">{advisor.name}</h3>
          <p className="text-xs text-muted-foreground">{advisor.role}</p>
        </div>
      </div>
      <div className="text-sm text-card-foreground leading-relaxed whitespace-pre-wrap">
        {response.isLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
            Thinking...
          </div>
        ) : (
          response.content
        )}
      </div>
    </div>
  );
}
