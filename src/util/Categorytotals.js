export default function categoryTotals(Json) {
  const purchases = Json?.week?.active?.purchases ?? []

  const totals = purchases.reduce((acc, purchase) => {
    const { categoryId, amount } = purchase

    acc[categoryId] = (acc[categoryId] ?? 0) + amount
    return acc
  }, {})

  console.log(totals)
  return totals
}
