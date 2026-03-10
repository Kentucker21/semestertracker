





export default function Semestertotal(json,semeseterid) {
  const purchases = json?.week?.active?.purchases ?? [];
  const pastpurchases=json?.week?.history??[];
  const filterhistory=pastpurchases.filter((el)=>{return el.semid==semeseterid})
  const filteredactive=purchases.filter((el)=>{return el.semid==semeseterid})
  

  const activetotal = filteredactive.reduce(
  (acc, p) => acc + Number(p.amount || 0),
  0
);

const pasttotal = filterhistory.reduce(
  (acc, w) => acc + Number(w.snapshot?.totalSpent || 0),
  0
);

   
   const result=pasttotal+activetotal
   return result;
   
}


