import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Semestertotal from '../util/Semtotal';

export default function SemesterOverview(props) {
  
  const[overviewError,setOverViewError]=useState(false)
   const [showOverView,setShowOverView]=useState(false)
    const [editBudget,setEditBudget]=useState("")
  const [showEditBudget, setShowEditBudget] = useState(false)
  const[showInput,setShowInput]=useState(false)
    const{Json,setJson}=props

  useEffect(() => {
  if (!Json?.semester?.createdAt) {
    setOverViewError(true)
    setShowOverView(false)
  } else {
    setOverViewError(false)
    setShowOverView(true)
  }
}, [Json.semester.createdAt])



    
  const expiresAt = Json?.semester?.endsAt
    const fullDate = expiresAt
  ? new Date(expiresAt).toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  : null

const totalBudget=Json.semester.data.semesterBudget
const totalSpent=Semestertotal(Json,Json.semester.id)
const remaining=totalBudget-totalSpent
const SavingsTarget=Json.semester.data.savingsGoal

function checkIfOnTarget(){
    let target=Json.semester.data.savingsGoal
    let percentage=(remaining/target)*100

    if(percentage>=100){
        return "100%"
    }else{
        return "Below target"
    }
   
}





function handlenewBudget(){
   if(!editBudget){
    return
   }

  setJson((prev=>({
    ...prev,
    semester:{
        ...prev.semester,
        data:{
            ...prev.semester.data,
            semesterBudget:parseInt(editBudget)
        }
    }
  })))

  setShowInput(false)
}




return (
    <div id='Overview' className="relative min-h-[420px] w-full py-10 flex flex-col items-center">
   
   <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl overflow-hidden" />
  
  <div className='flex  w-[50%]  justify-between flex-col'>
 <h1 className="text-3xl font-bold text-blue-600 text-center mb-2  tracking-wide ">Overview</h1>
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
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center items-center max-w-[400px]  w-full sm:max-w-[900px]">
    <div className="bg-blue-500 mx-3 sm:mx-0  text-xl  rounded-2xl border-indigo-600 border-l-3 text-white p-8">

      <div className=' text-lg font-semibold pl-2  border-amber-400 border-l-2' >
    Total  Budget <br /> 
      </div>

      <div className='pl-2 font-bold text-2xl'>
       ${totalBudget}
        </div> 

        <button className='text-sm underline hover:cursor-pointer'
        onClick={()=>{setShowEditBudget(true)}}
        >edit</button>
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

    <div className="bg-blue-500  text-xl mx-3 sm:mx-0  rounded-2xl border-indigo-600 border-l-3 text-white p-8">

      <div className=' text-lg font-semibold pl-2  border-amber-400 border-l-2' >
    On Target? <br /> 
      </div>

      <div className='pl-2 font-bold text-2xl'>
       {checkIfOnTarget()}
        </div> 
    </div>

   
    

  </section>

  } 
 
  
  {showEditBudget && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[300px] text-center">
        <p className="mb-4 font-semibold">
          Are you sure you want to edit the budget?
        </p>

        <div className="flex justify-center gap-4">
          <button
          onClick={()=>{setShowInput(true);setShowEditBudget(false)}}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Yes
          </button>

          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={()=>{setShowEditBudget(false)}}
          >
            No
          </button>
        </div>
      </div>
    </div>
)}


{
    showInput &&(
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>

    <div className='bg-white rounded-xl p-6 w-[300px] text-center flex flex-col'>
        <p className='text-lg font-semibold'>Enter new budget</p>
    <input type="text" value={editBudget||""} 
    onChange={(e)=>{setEditBudget(e.target.value)}}
    className='border-blue-500 border-2 rounded-lg mb-2 p-2'/>

        <button onClick={()=>{handlenewBudget()}} className='bg-blue-500 text-white w-20 rounded-lg'>Confirm</button>
    </div>
    
        
        </div>
    )
}
</div>




  )
}
