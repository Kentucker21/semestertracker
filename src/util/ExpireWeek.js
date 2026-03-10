import categoryTotals from "./Categorytotals"
import Weektotal from "./Weektotal"

export default function ExpireWeek(prev) {
  const active = prev.week.active;
  if (!active?.id) return prev;

  // prevent double-expiry
  if (prev.week.history.some(w => w.id === active.id)) {
    return prev;
  }

  const weektotal = Weektotal(prev);
  const remaining = active.weeklyBudget - weektotal;
  const overspent = Math.max(0, weektotal - active.weeklyBudget);
  const categorybytotal = categoryTotals(prev);

  const historyEntry = {
    id: active.id,
    createdAt: active.createdAt,
    endedAt: active.expiresAt,
    semid: prev.semester.id,
    weeklyBudget: active.weeklyBudget,
    savingsTarget: active.savingsTarget,
    endReason: "Expired",
    snapshot: {
      totalSpent: weektotal,
      totalAvailable: active.weeklyBudget,
      totalRemaining: remaining,
      spentByCategory: { ...categorybytotal },
      overSpent: overspent,
    },
    categories: [...(active.categories ?? [])],
    purchases: [...(active.purchases ?? [])],
  };

  const resetWeek = {
    id: "",
    semid: "",
    createdAt: null,
    expiresAt: 0,
    weeklyBudget: 0,
    savingsTarget: 0,
    carryover: 0,
    categories: [],
    purchases: [],
  };

  return {
    ...prev,
    week: {
      ...prev.week,
      active: resetWeek,
      history: [...prev.week.history, historyEntry],
    },
  };
}
