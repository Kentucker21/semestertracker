import React, { useState,useEffect} from 'react'

export default function WkWrappedpopup(props) {
  
    const {Json,setJson,showWrappedModal,setShowWrappedModal}=props

    const[showWrap,setShowWrap]=useState(false)


    useEffect(() => {
  const latestHistory = Json?.week?.history?.at(-1);
  if (!latestHistory) return;

  const stillActive = isWrappedStillActive(latestHistory.endedAt);
  setShowWrappedModal(stillActive);
}, [Json?.week?.history]);


    let latestHistory=Json.week.history[Json.week.history.length-1]??[]
    let weeklyBudget=latestHistory.weeklyBudget
   const fullDate=new Date(latestHistory.endedAt).toLocaleString('en-US',{
  month:'long',
  day:'numeric',
  year:'numeric'
});

let totalSpent=latestHistory.snapshot.totalSpent
let saved=latestHistory.snapshot.totalRemaining
 let spentCategories=latestHistory.snapshot.spentByCategory

 const purchases = latestHistory.purchases ?? [];

const mostExpensivePurchase = purchases.reduce((max, purchase) => {
  if (!max || purchase.amount > max.amount) {
    return purchase;
  }
  return max;
}, null);


const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

function isWrappedStillActive(endedAt) {
  if (!endedAt) return false;
  return Date.now() - endedAt < TWO_DAYS_MS;
}




  return (
    <> 

    {showWrappedModal&&
      <div className='bg-indigo-400 text-amber-50 w-xs p-2 text-sm text-center rounded-2xl fixed top-0
      overflow-hidden right-100  translate-x-100 animate-fade-in-scale z-10'>
          <i className="fa-regular fa-bell"></i>
          Alert:Week has ended. Click below to view Weekly Wrapped
           <br />
          <button onClick={()=>{setShowWrap(true)}}
          className='rounded-xl bg-blue-500 p-2 mt-3 cursor-pointer text-sm'>
           
            Weekly Wrapped
            
          </button>
          
          <button onClick={()=>{setShowWrappedModal(false)}} className='absolute top-2 right-1'>
            <i className="fa-solid fa-xmark "></i>
          </button>
          



          
          </div>
    }
   

          {showWrap&&
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 w-screen h-screen">

           <section className='w-[80%] relative bg-gray-100 rounded-xl sm:w-[50%] max-w-160 overflow-hidden'>
            <button className='absolute top-2 right-1 cursor-pointer' onClick={()=>{setShowWrap(false)}}>
            <i className="fa-solid fa-xmark "></i>
            </button>
           
             
            <h1 className='text-center text-purple-400 text-2xl font-semibold mb-3 '>
                 <i className="fa-solid fa-explosion"></i>
                Weekly Wrapped
                 <i className="fa-solid fa-explosion"></i>
                </h1>

            <div className=''>
                
             
             <div className='bg-gradient-to-r from-purple-500 via-purple-500 to-purple-600 p-4 rounded-lg text-white mx-3
             overflow-hidden left-100   animate-fade-in-scale mb-2'>
             <p>Your week expired on {fullDate}</p>
             </div>

             <div className='bg-gradient-to-r from-purple-500 via-purple-500 to-purple-600 p-4 rounded-lg text-white mx-3
             overflow-hidden left-100   animate-fade-in-scale mb-2'>
             <p>Your Weekly Budget was ${weeklyBudget}</p>
             </div>

             

             <div className='bg-gradient-to-r from-purple-500 via-purple-500 to-purple-600 p-4 rounded-lg text-white mx-3
             overflow-hidden left-100   animate-fade-in-scale mb-2'>
             <p>You spent a total of ${totalSpent} dollars</p>
             </div>


             <div className='bg-gradient-to-r from-purple-500 via-purple-500 to-purple-600 p-4 rounded-lg text-white mx-3
             overflow-hidden left-100   animate-fade-in-scale mb-2'>
             <p>You saved ${saved}</p>
             </div>


             <div className='bg-gradient-to-r from-purple-500 via-purple-500 to-purple-600 
  p-4 rounded-lg text-white mx-3 mb-2 animate-fade-in-scale'>

            <p className="font-semibold mb-2">Spent by category:</p>

            {Object.entries(spentCategories ?? {}).map(([category, amount]) => (
                <div key={category} className="flex justify-between text-sm">
                <span className="capitalize">{category}</span>
                <span>${amount}</span>
                </div>
            ))}
            </div>






             <div className='bg-gradient-to-r from-purple-500 via-purple-500 to-purple-600 p-4 rounded-lg text-white mx-3 mb-2'>
            {mostExpensivePurchase ? (
                <p>
                Your most expensive purchase was{" "}
                <strong>{mostExpensivePurchase.name}</strong> for $
                {mostExpensivePurchase.amount}
                </p>
            ) : (
                <p>No purchases were made this week</p>
            )}
            </div>




            </div>


            

            
           </section>
          </div>
          }
          
    </>
    
  )
}
