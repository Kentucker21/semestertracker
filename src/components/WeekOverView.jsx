import {React, useEffect,useState} from 'react'
import Weektotal from '../util/Weektotal'
import categoryTotals from '../util/Categorytotals'
import Removeprefix from '../util/Removeprefix'

export default function WeekOverView(props) {
     const[overviewError,setOverViewError]=useState(false)
       const [showOverView,setShowOverView]=useState(false)
   const {Json,setJson}=props

   useEffect(() => {
     if (!Json?.week?.active?.expiresAt) {
       setOverViewError(true)
       setShowOverView(false)
     } else {
       setOverViewError(false)
       setShowOverView(true)
     }
   }, [Json.week.active.expiresAt])

   useEffect(()=>{
  console.log();
  
   },[])


   const expiresAt = Json?.week?.active?.expiresAt
    const fullDate = expiresAt
  ? new Date(expiresAt).toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  : null


const totalBudget=Json.week.active.weeklyBudget
const totalSpent=Weektotal(Json)
const remaining=totalBudget-totalSpent
const SavingsTarget=Json.week.active.savingsTarget
const cattotals=Object.entries(categoryTotals(Json))
const categorybudgets=Json.week.active.categories
function checkIfOnTarget(){
    let target=Json.week.active.savingsTarget
    let percentage=(remaining/target)*100

    if(percentage>=100){
        return "100%"
    }else{
        return "Below target"
    }
   
}


  return (
    <div id='Overview' className="relative min-h-[420px] w-full py-10 flex flex-col items-center">
   
   <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl overflow-hidden" />
  
  <div className='flex  w-[50%]  justify-between flex-col'>
 <h1 className="text-3xl font-bold text-blue-600 text-center mb-2  tracking-wide "> Week Overview</h1>
{fullDate && (
  <h2 className="mb-4 text-xl text-blue-500 text-center">
    Expires: {fullDate}
  </h2>
)}



  </div>
   
   {overviewError && <div className='text-center text-red-500'>
    No Overview Available.
   </div>  }


  {showOverView && 
  <div className='max-w-[400px]  w-full sm:max-w-[900px]'>
    
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center items-center max-w-[400px]  w-full sm:max-w-[900px]">
    <div className="bg-blue-500  text-xl mx-3 sm:mx-0  rounded-2xl border-indigo-600 border-l-3 text-white p-8">

      <div className=' text-lg font-semibold pl-2  border-amber-400 border-l-2' >
    Total  Budget <br /> 
      </div>

      <div className='pl-2 font-bold text-2xl'>
       ${totalBudget}
        </div> 

        
    </div>

    <div className="bg-blue-500  text-xl mx-3 sm:mx-0  rounded-2xl border-indigo-600 border-l-3 text-white p-8">

      <div className=' text-lg font-semibold pl-2  border-amber-400 border-l-2' >
    Total  Spent <br /> 
      </div>

      <div className='pl-2 font-bold text-2xl'>
        ${totalSpent}
        </div> 
    </div>

    <div className="bg-blue-500  text-xl mx-3 sm:mx-0  rounded-2xl border-indigo-600 border-l-3 text-white p-8">

      <div className=' text-lg font-semibold pl-2  border-amber-400 border-l-2' >
    Total  Remaining <br /> 
      </div>

      <div className='pl-2 font-bold text-2xl'>
        ${remaining}
        </div> 
    </div>
    


    <div className="bg-blue-500  text-xl mx-3 sm:mx-0  rounded-2xl border-indigo-600 border-l-3 text-white p-8">

      <div className=' text-lg font-semibold pl-2  border-amber-400 border-l-2' >
    Savings Goal <br /> 
      </div>

      <div className='pl-2 font-bold text-2xl'>
       ${SavingsTarget}
        </div> 
    </div>

    <div className="bg-blue-500  text-xl mx-3 sm:mx-0 rounded-2xl border-indigo-600 border-l-3 text-white p-8">

      <div className=' text-lg font-semibold pl-2  border-amber-400 border-l-2' >
    On Target? <br /> 
      </div>

      <div className='pl-2 font-bold text-2xl'>
       {checkIfOnTarget()}
        </div> 
    </div>

    

    

   
    

  </section>

  <h1 className='mt-2 mb-2 text-xl text-blue-500 font-mono'>Category limits</h1>

  <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center items-center max-w-[400px]  w-full sm:max-w-[900px]">
  {categorybudgets.map((item,i)=>{
    return(
    <div key={i} className="bg-blue-500  text-xl mx-3 sm:mx-0  rounded-2xl border-indigo-600 border-l-3 text-white p-8">

      <div className=' text-lg font-semibold pl-2  border-amber-400 border-l-2' >
    {item.name} <br /> 
      </div>

      <div className='pl-2 font-bold text-2xl'>
       ${item.limit}
        </div> 
    </div>
    )
    
  })}
   
   
  </section>

<h1 className='mt-2 mb-2 text-xl text-blue-500 font-mono'>Spent by Category</h1>
  <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center items-center max-w-[400px]  w-full sm:max-w-[900px]">
    {cattotals.map(([key,value])=>{
    return(
   <div key={key} className="bg-blue-500  text-xl mx-3 sm:mx-0  rounded-2xl border-indigo-600 border-l-3 text-white p-8">

      <div className=' text-lg font-semibold pl-2  border-amber-400 border-l-2' >
    {Removeprefix("cat_",key) } <br /> 
      </div>

      <div className='pl-2 font-bold text-2xl'>
       ${ value}
        </div> 
    </div>
    )
    
   })}
  </section>


  </div>


  } 
 
  
  



</div>




  )
}
