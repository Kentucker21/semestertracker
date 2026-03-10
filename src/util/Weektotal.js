export default function Weektotal(Json) {
  const purchases = Json?.week?.active?.purchases ?? [];

  const total = purchases.reduce((acc, i) => {
    return acc + Number(i.amount || 0);
  }, 0);

  return total;
}