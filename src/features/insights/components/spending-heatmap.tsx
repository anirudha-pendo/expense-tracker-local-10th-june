import { useMemo, useState } from "react";
import {
  eachDayOfInterval,
  endOfDay,
  format,
  getDay,
  isSameDay,
  startOfDay,
  subWeeks,
} from "date-fns";
import { BpBox } from "@/shared/components/bp-box";
import { formatCurrency } from "@/lib/format";
import type { Transaction } from "@/types";

interface SpendingHeatmapProps {
  transactions: Transaction[];
  currency: string;
  locale: string;
}

interface DayData {
  date: Date;
  total: number;
  count: number;
}

function getIntensityClass(normalized: number): string {
  if (normalized === 0) return "bg-muted/40 hover:bg-muted/60";
  if (normalized < 0.2) return "bg-blue-200/70 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-900/70";
  if (normalized < 0.4) return "bg-blue-300/80 dark:bg-blue-800/60 hover:bg-blue-400/80 dark:hover:bg-blue-800/80";
  if (normalized < 0.6) return "bg-blue-400/80 dark:bg-blue-700/70 hover:bg-blue-500/80 dark:hover:bg-blue-700/90";
  if (normalized < 0.8) return "bg-blue-500/90 dark:bg-blue-600/80 hover:bg-blue-600/90 dark:hover:bg-blue-600";
  return "bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400";
}

export function SpendingHeatmap({ transactions, currency, locale }: SpendingHeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<DayData | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const { weeks, maxDaily } = useMemo(() => {
    const now = new Date();
    const start = startOfDay(subWeeks(now, 15)); // 16 weeks total
    const end = endOfDay(now);

    const days = eachDayOfInterval({ start, end });

    // Aggregate expense totals per day
    const dayMap = new Map<string, DayData>();
    for (const day of days) {
      dayMap.set(format(day, "yyyy-MM-dd"), { date: day, total: 0, count: 0 });
    }

    for (const tx of transactions) {
      if (tx.type !== "expense") continue;
      const key = format(new Date(tx.date), "yyyy-MM-dd");
      const entry = dayMap.get(key);
      if (entry) {
        entry.total += tx.amount;
        entry.count += 1;
      }
    }

    const allDays = Array.from(dayMap.values());
    const maxDaily = Math.max(...allDays.map((d) => d.total), 1);

    // Group into columns of 7 (Sun=0 → Sat=6), padding the first week
    const firstDayOfWeek = getDay(start); // 0=Sun
    const paddedDays: (DayData | null)[] = [
      ...Array.from({ length: firstDayOfWeek }, () => null),
      ...allDays,
    ];

    const weeks: (DayData | null)[][] = [];
    for (let i = 0; i < paddedDays.length; i += 7) {
      weeks.push(paddedDays.slice(i, i + 7));
    }

    return { weeks, maxDaily };
  }, [transactions]);

  // Month labels — one per column transition
  const monthLabels = useMemo(() => {
    const labels: { col: number; label: string }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, col) => {
      const firstReal = week.find((d) => d !== null);
      if (!firstReal) return;
      const month = firstReal.date.getMonth();
      if (month !== lastMonth) {
        labels.push({ col, label: format(firstReal.date, "MMM") });
        lastMonth = month;
      }
    });
    return labels;
  }, [weeks]);

  const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const CELL_SIZE = 13;
  const CELL_GAP = 3;

  return (
    <BpBox className="stagger-item p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-mono text-[11px] tracking-wider uppercase text-muted-foreground/60">
            Spending Activity
          </p>
          <p className="text-sm font-medium text-foreground mt-0.5">
            Daily expenses — last 16 weeks
          </p>
        </div>
        {hoveredDay && hoveredDay.total > 0 && (
          <div className="text-right">
            <p className="text-xs text-muted-foreground">{format(hoveredDay.date, "MMM d, yyyy")}</p>
            <p className="text-sm font-semibold text-foreground">
              {formatCurrency(hoveredDay.total, currency, locale)}
            </p>
            <p className="text-xs text-muted-foreground">
              {hoveredDay.count} {hoveredDay.count === 1 ? "transaction" : "transactions"}
            </p>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <div className="relative inline-block">
          {/* Month labels */}
          <div
            className="flex mb-1"
            style={{ paddingLeft: 32 }}
          >
            {weeks.map((_, col) => {
              const label = monthLabels.find((m) => m.col === col);
              return (
                <div
                  key={col}
                  className="text-[10px] text-muted-foreground/60 font-mono"
                  style={{
                    width: CELL_SIZE + CELL_GAP,
                    minWidth: CELL_SIZE + CELL_GAP,
                  }}
                >
                  {label?.label ?? ""}
                </div>
              );
            })}
          </div>

          {/* Grid */}
          <div className="flex gap-0">
            {/* Day-of-week labels */}
            <div
              className="flex flex-col mr-1"
              style={{ gap: CELL_GAP }}
            >
              {DAY_LABELS.map((label, i) => (
                <div
                  key={label}
                  className="flex items-center justify-end text-[10px] text-muted-foreground/50 font-mono pr-1"
                  style={{
                    height: CELL_SIZE,
                    opacity: i % 2 === 1 ? 1 : 0, // show Mon, Wed, Fri, Sun
                  }}
                >
                  {label.slice(0, 1)}
                </div>
              ))}
            </div>

            {/* Heatmap columns */}
            <div className="flex" style={{ gap: CELL_GAP }}>
              {weeks.map((week, col) => (
                <div key={col} className="flex flex-col" style={{ gap: CELL_GAP }}>
                  {Array.from({ length: 7 }, (_, row) => {
                    const day = week[row] ?? null;
                    if (!day) {
                      return (
                        <div
                          key={row}
                          style={{ width: CELL_SIZE, height: CELL_SIZE }}
                        />
                      );
                    }
                    const normalized = day.total / maxDaily;
                    const intensityClass = getIntensityClass(normalized);
                    const isHovered = hoveredDay ? isSameDay(day.date, hoveredDay.date) : false;

                    return (
                      <div
                        key={row}
                        className={`rounded-[2px] cursor-pointer transition-all duration-100 ${intensityClass} ${
                          isHovered ? "ring-1 ring-foreground/30 scale-110" : ""
                        }`}
                        style={{ width: CELL_SIZE, height: CELL_SIZE }}
                        onMouseEnter={(e) => {
                          setHoveredDay(day);
                          const rect = e.currentTarget.getBoundingClientRect();
                          setTooltipPos({ x: rect.left, y: rect.top });
                        }}
                        onMouseLeave={() => {
                          setHoveredDay(null);
                          setTooltipPos(null);
                        }}
                        aria-label={
                          day.total > 0
                            ? `${format(day.date, "MMM d")}: ${formatCurrency(day.total, currency, locale)}`
                            : `${format(day.date, "MMM d")}: no spending`
                        }
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-3" style={{ paddingLeft: 32 }}>
            <span className="text-[10px] text-muted-foreground/50 font-mono">Less</span>
            <div className="flex gap-[3px]">
              {[0, 0.15, 0.35, 0.6, 0.85, 1].map((v, i) => (
                <div
                  key={i}
                  className={`rounded-[2px] ${getIntensityClass(v)}`}
                  style={{ width: CELL_SIZE, height: CELL_SIZE }}
                />
              ))}
            </div>
            <span className="text-[10px] text-muted-foreground/50 font-mono">More</span>
          </div>
        </div>
      </div>

      {/* Tooltip (floating) */}
      {hoveredDay && tooltipPos && (
        <div
          className="fixed z-50 pointer-events-none px-2.5 py-1.5 rounded-md bg-popover border border-border/60 shadow-md text-xs"
          style={{
            left: tooltipPos.x + 18,
            top: tooltipPos.y - 40,
          }}
        >
          <p className="font-medium text-popover-foreground">
            {format(hoveredDay.date, "EEE, MMM d")}
          </p>
          {hoveredDay.total > 0 ? (
            <p className="text-muted-foreground">
              {formatCurrency(hoveredDay.total, currency, locale)} · {hoveredDay.count} tx
            </p>
          ) : (
            <p className="text-muted-foreground">No spending</p>
          )}
        </div>
      )}
    </BpBox>
  );
}
