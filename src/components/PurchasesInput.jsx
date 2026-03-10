import React from 'react'
import { useState } from 'react'
import Concat from '../util/Concat'

export default function PurchasesInput(props) {
  const {Json,setJson}=props
  const [purchaseInput,setPurchaseInput]=useState({
          id: "",
          name: "",
          semid:"",
          categoryId: "",
          amount: "",
          purchasedAt: 0
  })
  const [activeError,setActiveError]=useState(false)
  const [showInput,setShowInput]=useState(false)


  function checkactive(){
    if(Json.semester.createdAt==null || Json.week.active.createdAt==null){
      setActiveError(true)
    }else{
        setShowInput(true)
    }
  }


  function handlepurchase(e){
    e.preventDefault()

    let purid=Concat("pur_",purchaseInput.name)
    let semid=Json.semester.id
    let purchasetime=new Date()

    if(!purchaseInput.name|| !purchaseInput.amount){
        return
    }



     setJson((prev)=>({
        ...prev,
        week: {
           ...prev.week,
           active:{
            ...prev.week.active,
            purchases:[
                ...prev.week.active.purchases,
                {
                    ...purchaseInput,
                    id:purid,
                    semid:semid,
                    purchasedAt:purchasetime
                }
            ]
           }
        }
     }))
  }
    return (
        <div>
            <h1 className="text-3xl text-blue-600 text-shadow-lg text-center font-semibold">Purchases
     
           </h1>
           <h2 className='text-center'>Click below to enter your daily purchases</h2>
     <div className='flex justify-center'>

      <button
      className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 font-medium"
       onClick={()=>{checkactive()}}>
  
        New Purchase
      </button>
      </div>


      {activeError &&
       <div className='text-red-400'>Error:No semester Or Week Active. Start a weekly or Semester Budget</div>
      }


      {showInput&&
        <form className="flex flex-col gap-5 shadow-2xl w-full max-w-md p-6 rounded-2xl
                 bg-white mx-auto mt-8">

        
        <input type="text" value={purchaseInput.name} placeholder='Enter Item Name'
        className='p-4 w-xs rounded-2xl outline-blue-400 border-2  border-blue-400'
         onChange={(e)=>{setPurchaseInput({...purchaseInput,name:e.target.value})}}/>

        <input value={purchaseInput.amount||""} type="number" placeholder='Enter Item Price'
        className='p-4 w-xs rounded-2xl outline-blue-400 border-2  border-blue-400'
        onChange={(e)=>{setPurchaseInput({...purchaseInput,amount:parseInt(e.target.value)})}}
       />
        
        
        
        <label className="flex w-xs gap-4 p-4 rounded-2xl border-2 border-blue-400">
    <div>Category:</div>

    <select
        value={purchaseInput.categoryId || ""}
        onChange={(e) =>
        setPurchaseInput({
            ...purchaseInput,
            categoryId: e.target.value
        })
        }
    >
        <option value="" disabled>
        Select category
        </option>

        {Json.week.active.categories.map(option => (
        <option
            key={option.id}
            value={option.id}
            className="text-xs"
        >
            {option.name}
        </option>
        ))}
    </select>
    </label>



        
        
        
        <button onClick={(e)=>{handlepurchase(e)}}
          className='w-20 text-gray-100 bg-blue-500 rounded-lg  py-1 px-2 hover:bg-blue-600'
          >Confirm</button>

     
   
      </form>
      }

        </div>
    
  )
}
