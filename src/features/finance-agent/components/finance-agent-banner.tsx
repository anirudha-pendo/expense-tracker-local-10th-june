import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FinanceAgentWaitlistModal } from "./finance-agent-waitlist-modal";
import { useFinanceAgentWaitlist } from "../hooks/use-finance-agent-waitlist";
import { Sparkles, CheckCircle } from "lucide-react";

export function FinanceAgentBanner() {
  const [modalOpen, setModalOpen] = useState(false);
  const { joined, entry } = useFinanceAgentWaitlist();

  return (
    <>
      <div className="border border-border/60 p-4 flex items-center justify-between gap-4 bg-muted/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-foreground/5 border border-border/60 flex items-center justify-center shrink-0">
            <Sparkles className="size-4 text-foreground" />
          </div>
          <div>
            <p className="font-mono text-xs font-semibold tracking-tight flex items-center gap-2">
              Finance Agent
              <span className="font-mono text-[8px] uppercase tracking-widest bg-foreground text-background px-1.5 py-0.5">
                Beta
              </span>
            </p>
            <p className="font-mono text-[10px] text-muted-foreground mt-0.5">
              {joined
                ? `You're #${entry!.position} on the waitlist — we'll notify you at ${entry!.email}`
                : "AI-powered financial assistant. Analyze spending, get recommendations, and ask anything."}
            </p>
          </div>
        </div>

        <Button
          variant={joined ? "outline" : "default"}
          size="sm"
          onClick={() => setModalOpen(true)}
          className="font-mono text-[10px] uppercase tracking-widest shrink-0"
          data-testid="finance-agent-banner-cta"
        >
          {joined ? (
            <span className="flex items-center gap-1.5">
              <CheckCircle className="size-3" />
              View Status
            </span>
          ) : (
            "Join Waitlist"
          )}
        </Button>
      </div>

      <FinanceAgentWaitlistModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
