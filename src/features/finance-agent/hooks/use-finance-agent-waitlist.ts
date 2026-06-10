import { useState, useCallback } from "react";

const STORAGE_KEY = "finance-agent-waitlist";

interface WaitlistEntry {
  name: string;
  email: string;
  reason: string;
  position: number;
  joinedAt: string;
}

function loadEntry(): WaitlistEntry | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as WaitlistEntry) : null;
  } catch {
    return null;
  }
}

export function useFinanceAgentWaitlist() {
  const [entry, setEntry] = useState<WaitlistEntry | null>(() => loadEntry());

  const join = useCallback((name: string, email: string, reason: string) => {
    const newEntry: WaitlistEntry = {
      name,
      email,
      reason,
      position: Math.floor(Math.random() * 150) + 50,
      joinedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newEntry));
    setEntry(newEntry);
    pendo.track("finance_agent_waitlist_joined", {
      position: newEntry.position,
      joinedAt: newEntry.joinedAt,
    });
  }, []);

  return { entry, joined: entry !== null, join };
}
