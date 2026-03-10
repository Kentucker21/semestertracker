import React from 'react'
import { useState ,useRef,useEffect} from 'react'
import Weektotal from '../util/Weektotal'
import categoryTotals from '../util/Categorytotals'
import Concat from '../util/Concat'

export default function WeekInput(props) {

    const [showWeeklyInput,setShowWeeklyInput]=useState(false)
    const [activeError,setActiveError]=useState(false)
    const [noSemActive,setNoSemActive]=useState(false)
    const [categoryError,setCategoryError]=useState(false)
    const [weeklyInput,setWeeklyInput]=useState({
        id: "",
      createdAt: "",
      expiresAt:"",
      weeklyBudget:"",
      savingsTarget:"",

      // Money carried over from last week
      carryover:"",

      // Planned weekly category limits
      categories: [
        { id: "", name: "", limit:""},
        { id: "", name: "", limit:"" },
        { id: "", name: "", limit:"" }
      ],
    })

    const{Json,setJson,weekCreated,setWeekCreated,showWeekEnd,setShowWeekEnd,setShowWrappedModal}=props
    const didExpireWeekRef = useRef(false);

    useEffect(() => {
  repairSnapshots()
}, [])

    // check on load if week is expired
useEffect(() => {
  const endsAt = Json?.week?.active?.expiresAt;

  if (!endsAt || endsAt === 0) return;

  // reset guard when the active week changes
  didExpireWeekRef.current = false;

  const id = setInterval(() => expireWeekAuto(id), 60_000);
  expireWeekAuto(id);

  return () => clearInterval(id);
}, [Json?.week?.active?.expiresAt]);


    

    function checkIsWeekactive(){
        if(!Json){
        return 
      }
    //check if semesteris active
      if (Json.semester.createdAt==null){
     setNoSemActive(true)
     return
      }else{
        setNoSemActive(false)
      }

     if(Json.week.active.createdAt!=null){
        setActiveError(true)
     } else{
        setShowWeeklyInput(true)
     }
    }




  function expireWeekAuto(id) {
  const expiryDateRaw = Json?.week?.active?.expiresAt;

  if (!expiryDateRaw) {
    clearInterval(id);
    return;
  }

  const expiryDate = new Date(expiryDateRaw); // ✅ convert
  const now = new Date();

  if (now >= expiryDate) {
    expireWeek();
    setShowWeekEnd(true);
    clearInterval(id);
  }
}




function expireWeek() {
  if (didExpireWeekRef.current) return;
  didExpireWeekRef.current = true;

  const resetweek = {
    id: "",
    semid: "",
    createdAt: null,
    expiresAt: null,
    weeklyBudget: 0,
    savingsTarget: 0,
    carryover: 0,
    categories: [],
    purchases: [],
  };

  setJson((prev) => {
    const active = prev.week.active;
    const activeId = active.id;

    if (!activeId) return prev;

    if (prev.week.history.some((w) => w.id === activeId)) return prev;

    const newhistory = {
      id: active.id,
      createdAt: active.createdAt,
      endedAt: active.expiresAt,
      semid: prev.semester.id,
      weeklyBudget: active.weeklyBudget,
      savingsTarget: active.savingsTarget,
      endReason: "Expired",
    };

    // ✅ calculate totals from latest state
    const weektotal = Weektotal(prev);
    const remaining = active.weeklyBudget - weektotal;
    const overspent = Math.max(0, weektotal - active.weeklyBudget);
    const categorybytotal = categoryTotals(prev);

    const snapshot = {
      totalSpent: weektotal,
      totalAvailable: active.weeklyBudget,
      totalRemaining: remaining,
      spentByCategory: { ...categorybytotal },
      overSpent: overspent,
    };

    return {
      ...prev,
      week: {
        ...prev.week,
        active: resetweek,
        history: [
          ...prev.week.history,
          {
            ...newhistory,
            snapshot,
            categories: [...(active.categories ?? [])],
            purchases: [...(active.purchases ?? [])],
          },
        ],
      },
    };
  });

  setActiveError(false);
  setShowWeekEnd(true);
  setShowWrappedModal(true);
}



function repairSnapshots() {
  setJson(prev => {

    const fixedHistory = prev.week.history.map(week => {

      const totalSpent = week.purchases.reduce(
        (sum,p) => sum + p.amount, 0
      )

      const remaining = week.weeklyBudget - totalSpent
      const overspent = Math.max(0, totalSpent - week.weeklyBudget)

      return {
        ...week,
        snapshot:{
          ...week.snapshot,
          totalSpent,
          totalRemaining: remaining,
          overSpent: overspent
        }
      }
    })

    return {
      ...prev,
      week:{
        ...prev.week,
        history: fixedHistory
      }
    }

  })
}
    function updateCategory(index, key, value) {
  const updated = [...weeklyInput.categories];
    
  updated[index] = { ...updated[index], [key]: value };
  

  if(key=="name"){
    let catid=Concat("cat_",value)
    updated[index] = { ...updated[index], id:catid};
    }
  
  setWeeklyInput({ ...weeklyInput, categories: updated });
   

}

    function handleNewWeek(e){
      e.preventDefault()

      let weekName=weeklyInput.id
      
      let weeklyBudget=parseInt(weeklyInput.weeklyBudget)
      let savingsTarget=parseInt(weeklyInput.savingsTarget)
      let categories=[...weeklyInput.categories]

      let createdAt=new Date()
      let expiresAt=new Date()
      expiresAt.setDate(expiresAt.getDate()+7)
      expiresAt.setHours(0,0,0,0)
       

       

      if (!weekName|| !savingsTarget || !weeklyBudget|| !categories){
        console.log("run");
        return
      }


       //check if category is empty
       let oldcategory=[...weeklyInput.categories]
       let newcategory=[]
       for(let cat of oldcategory){
        if(cat.limit=="" || cat.name==""){
            continue
        }
        newcategory=[...newcategory,cat]
        
       }
       console.log(newcategory);
       
        const newWeek = {
        id: weeklyInput.id,
        semid: Json.semester.id,
        createdAt,
        expiresAt,
        weeklyBudget,
        savingsTarget,
        carryover:0,
        
        categories: newcategory,
        purchases:[]
        };
      
       //check if category is past limit
       let categorytotal=newcategory.reduce((acc,i)=>{
        return acc+parseInt(i.limit)
       },0)

       console.log(categorytotal);
       

       if(categorytotal>weeklyBudget){
        setCategoryError(true)
        return
       }
      
      

      setJson(prev => ({
            ...prev,
             week: {
                    ...prev.week,
                    active: newWeek
                        }
                    }));        

    setWeekCreated(true)
    setShowWeeklyInput(false)
    }


    return (
    <div className="relative min-h-[420px] w-full justify-center py-10">
           
           <div className="absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl overflow-hidden" />
     <h1 className="text-3xl text-blue-600 text-shadow-lg text-center">Weekly Budgets

     </h1>
           
            <p className="mt-2 text-gray-700 text-center">
             Click below to create your weekly budget:
             </p>


     <div className='flex justify-center'>

      <button
      className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
       onClick={checkIsWeekactive}>
  
        New Weekly budget
      </button>
      </div>


      {activeError&&
         <div className='flex justify-center'>
        <div className='text-red-500 '> 
          <p>Note:You already have a Week active</p> 
          
          <div className='bg-blue-300 w-sm p-4 rounded-lg flex flex-col items-center'>
             <p className='text-white '>Would You like to end Current Week?</p>
           
           <div>
            <button className='bg-green-400 text-white p-2 rounded-lg w-15 mr-4 mt-3'
            onClick={expireWeek}>Yes</button> 
           <button className='bg-red-400 text-white p-2 rounded-lg w-15'
           onClick={()=>{setActiveError(false)}}>No</button>
           </div>
           
          </div>
          

          </div>
         </div>
        
          }

        
          
          {noSemActive &&
            <div className='text-red-400 text-center'>
             Error:You have no semester active 
             activate a semester to make weekly budget.
            </div>
          }


       {showWeeklyInput &&
       <form className="flex flex-col gap-5 shadow-2xl w-full max-w-md p-6 rounded-2xl
                 bg-white mx-auto mt-8">

         
        <input value={weeklyInput.id} type="text" placeholder='Name Your Week'
        className='p-4 w-xs rounded-2xl outline-blue-400 border-2  border-blue-400'
        onChange={(e)=>{setWeeklyInput({...weeklyInput,id:e.target.value})}}/>

        <input value={weeklyInput.weeklyBudget} type="number" placeholder='Enter Weekly Budget'
        className='p-4 w-xs rounded-2xl outline-blue-400 border-2  border-blue-400'
        onChange={(e)=>{setWeeklyInput({...weeklyInput,weeklyBudget:parseInt(e.target.value)})}}/>
        
        <input type="number" value={weeklyInput.savingsTarget} placeholder='Enter Savings Goal'
        className='p-4 w-xs rounded-2xl outline-blue-400 border-2 border-blue-400'
        onChange={(e)=>{ 
        setWeeklyInput({...weeklyInput,savingsTarget:parseInt(e.target.value)})
        }}/>

        <label htmlFor="" className='text-blue-400'>Categories</label>
        
        
        {categoryError&& 
         <div className='text-red-400 text-center'>
            Error: Your category limits total is greater than
            your weekly budget
         </div>
        }

        {weeklyInput.categories.map((cat,i)=>{

            return(
         <div className='flex flex-col gap-3' key={i}>
        <input type="text" value={cat.name} placeholder='Category Name'
        className='p-3 w-xs rounded-2xl outline-blue-400 border-2  border-blue-400'
        onChange={(e)=>{updateCategory(i,"name",e.target.value)}}/>

        <input type="number" value={cat.limit} placeholder='Category limit'
        className='p-3 w-xs rounded-2xl outline-blue-400 border-2  border-blue-400'
        onChange={(e)=>{updateCategory(i,"limit",parseInt(e.target.value))}}/>
        
        
        
        

        </div>
        
            )
           
         })}
        



        
        
      

       
        
        <button onClick={(e)=>{handleNewWeek(e)}}
          className='w-20 text-gray-100 bg-blue-500 rounded-lg  py-1 px-2 hover:bg-blue-600'
          >Confirm</button>

     
   
      </form>}
    </div>
  )
}
