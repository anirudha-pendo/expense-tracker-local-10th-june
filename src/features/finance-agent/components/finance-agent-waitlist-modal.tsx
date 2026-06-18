import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFinanceAgentWaitlist } from "../hooks/use-finance-agent-waitlist";
import { CheckCircle, Clock, Users, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  reason: z.string().min(10, "Please write at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function estimatedWait(position: number): string {
  const weeks = Math.ceil(position / 30);
  return weeks === 1 ? "~1 week" : `~${weeks} weeks`;
}

function StatusView({ onClose }: { onClose: () => void }) {
  const { entry } = useFinanceAgentWaitlist();

  if (!entry) return null;

  const progressPercent = Math.max(5, Math.min(90, Math.round((1 / entry.position) * 1000)));
  const joinedDate = new Date(entry.joinedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center">
          <CheckCircle className="size-6 text-foreground" />
        </div>
        <div className="text-center">
          <p className="font-mono text-sm font-semibold tracking-tight">You're on the waitlist</p>
          <p className="font-mono text-[11px] text-muted-foreground mt-1 tracking-wide">
            Joined {joinedDate}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="border border-border/60 p-3 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="size-3" />
            <span className="font-mono text-[9px] uppercase tracking-widest">Position</span>
          </div>
          <p className="font-mono text-lg font-bold">#{entry.position}</p>
        </div>
        <div className="border border-border/60 p-3 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="size-3" />
            <span className="font-mono text-[9px] uppercase tracking-widest">Est. Wait</span>
          </div>
          <p className="font-mono text-lg font-bold">{estimatedWait(entry.position)}</p>
        </div>
        <div className="border border-border/60 p-3 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <TrendingUp className="size-3" />
            <span className="font-mono text-[9px] uppercase tracking-widest">Priority</span>
          </div>
          <p className="font-mono text-lg font-bold">Standard</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Queue Progress
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">{progressPercent}% ahead of you</span>
        </div>
        <div className="h-1.5 bg-muted rounded-none overflow-hidden">
          <div
            className="h-full bg-foreground transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="font-mono text-[10px] text-muted-foreground">
          We'll email <span className="text-foreground">{entry.email}</span> when your access is ready.
        </p>
      </div>

      <div className="border border-border/60 p-4 bg-muted/20 space-y-1.5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">What you'll get</p>
        <ul className="space-y-1 mt-2">
          {[
            "AI-powered expense categorization",
            "Natural language spending queries",
            "Automated budget recommendations",
            "Anomaly detection & fraud alerts",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="font-mono text-[10px] text-muted-foreground mt-0.5">—</span>
              <span className="font-mono text-[11px] text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button onClick={onClose} className="w-full font-mono text-xs tracking-widest uppercase">
        Close
      </Button>
    </div>
  );
}

function JoinForm({ onJoined }: { onJoined: () => void }) {
  const { join } = useFinanceAgentWaitlist();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    join(data.name, data.email, data.reason);
    setIsSubmitting(false);
    onJoined();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="border border-border/60 p-4 bg-muted/20 space-y-1">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Early Access</p>
        <p className="font-mono text-[11px] text-foreground">
          Finance Agent uses AI to analyze your spending, answer financial questions, and automate budget
          management. Join the waitlist to be among the first to try it.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Full Name
        </Label>
        <Input
          {...register("name")}
          placeholder="Your name"
          className={cn("font-mono text-xs", errors.name && "border-destructive")}
        />
        {errors.name && (
          <p className="font-mono text-[10px] text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Email Address
        </Label>
        <Input
          {...register("email")}
          type="email"
          placeholder="you@example.com"
          className={cn("font-mono text-xs", errors.email && "border-destructive")}
        />
        {errors.email && (
          <p className="font-mono text-[10px] text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Why are you interested?
        </Label>
        <Textarea
          {...register("reason")}
          placeholder="Tell us how you'd use Finance Agent..."
          rows={3}
          className={cn("font-mono text-xs resize-none", errors.reason && "border-destructive")}
        />
        {errors.reason && (
          <p className="font-mono text-[10px] text-destructive">{errors.reason.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full font-mono text-xs tracking-widest uppercase"
      >
        {isSubmitting ? "Joining..." : "Join Waitlist"}
      </Button>
    </form>
  );
}

export function FinanceAgentWaitlistModal({ open, onOpenChange }: Props) {
  const { joined } = useFinanceAgentWaitlist();
  const [showStatus, setShowStatus] = useState(joined);

  function handleJoined() {
    setShowStatus(true);
  }

  function handleOpenChange(next: boolean) {
    if (next && joined) setShowStatus(true);
    if (!next && joined) setShowStatus(true);
    onOpenChange(next);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-mono text-sm tracking-tight">Finance Agent</DialogTitle>
          <DialogDescription className="font-mono text-[11px]">
            {showStatus || joined ? "Your waitlist status" : "Request early access"}
          </DialogDescription>
        </DialogHeader>

        {showStatus || joined ? (
          <StatusView onClose={() => onOpenChange(false)} />
        ) : (
          <JoinForm onJoined={handleJoined} />
        )}
      </DialogContent>
    </Dialog>
  );
}
