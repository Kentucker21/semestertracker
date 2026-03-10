import React, { useEffect } from 'react'
import { useState ,useRef} from 'react'
import Semestertotal from '../util/Semtotal';
import ExpireWeek from '../util/ExpireWeek';

import Persistdata from '../util/Persistdata';

export default function Semesterinput(props) {
  const {Json,setJson,showSemEnd,setShowSemEnd,setSemCreated,setShowSemesterWrapped}=props
    const[Seminput,setSeminput]=useState({
        Semid:"",
        Sembudgetinput:"",
        Semduration:"",
        savingsGoal:"",
     })

     const [showInput,setshowInput]=useState(false);
     const [showError,setshowError]=useState(false);
     const [showSuggested,setShowSuggested]=useState(false)
     const [suggestedwkly,setsuggestedwkly]=useState(0)
     
     const didExpireRef = useRef(false);


     useEffect(()=>{
      
       
       
      
      console.log(Json);
     },[Json])


     //check on load if semester is expired
     useEffect(() => {
     const endsAt = Json?.semester?.endsAt;

  
      if (!endsAt || endsAt === 0) return;

       const id = setInterval(() => expireSemesterAuto(id), 60_000);
       expireSemesterAuto(id); 

       return () => clearInterval(id);
     }, [Json?.semester?.endsAt]);

function expireSemesterAuto(id) {
  const expiryDate = Json?.semester?.endsAt;

  if (!expiryDate || expiryDate === 0) {
    clearInterval(id);
    return;
  }

  const now = new Date();        
  if (now >= expiryDate) {       
    expireSemester();
    setShowSemEnd(true);
    clearInterval(id);
  }
}



    //check if a semester is active
     function checkactive(){
      if(!Json){
        return 
      }
     if(Json.semester.createdAt!=null){
        setshowError(true)
     } else{
        setshowInput(true)
     }
    }

    function handlenewSemester(e){
      e.preventDefault()
        let sembudget=Seminput.Sembudgetinput
        let semduration= Seminput.Semduration
        let semid=Seminput.Semid
        let semgoals=Seminput.savingsGoal
        

        let semcreated=new Date()
        let semend=new Date()
        semend.setMonth(semend.getMonth()+semduration)
        semend.setHours(0, 0, 0, 0);

        if(!sembudget || !semduration){
            console.log("run");
            
            return
        }
       
          
        let semmetadata={
           id:semid,
           createdAt:semcreated,
           endsAt:semend

        }
        let semesterdata={
            semesterBudget:sembudget,
            monthsToDepletion:semduration,
            savingsGoal:semgoals

          }


          setJson(prev=>({
            ...prev,
            semester:{...semmetadata,data:semesterdata}
          }))

      //set everythong to default and hide form
       setSeminput({Semid:"",
        Sembudgetinput:"",
        Semduration:"",
        savingsGoal:"",})


       

        setSemCreated(true)
        setshowInput(false)
        
        
    }


    function handlesuggestedwkly(e){
       
    
        let result=parseInt(Seminput.Sembudgetinput)/(parseInt(e.target.value)*4)
      setsuggestedwkly(result)
      setShowSuggested(true)
      console.log("red");
      
      
      
    }
    

    function expireSemester(){
     
        if (didExpireRef.current) return;
          didExpireRef.current = true;

      

    
      setJson(prev => {
  const expiredSemester = {
    id: prev.semester.id,
    createdAt: prev.semester.createdAt,
    endsAt: new Date(),
    endReason: "Expired",
    summary: {
      semesterBudget: prev.semester.data.semesterBudget,
      savingsGoal: prev.semester.data.savingsGoal,
      totalSpent: Semestertotal(prev, prev.semester.id),
      totalRemaining:
        prev.semester.data.semesterBudget -
        Semestertotal(prev, prev.semester.id),
    },
  };

  const resetSemester = {
    id: "",
    createdAt: null,
    endsAt: 0,
    data: {
      semesterBudget: 0,
      monthsToDepletion: 0,
      savingsGoal: 0,
    },
  };

  const withExpiredWeek = ExpireWeek(prev);

  return {
    ...withExpiredWeek,
    semesterHistory: [
      expiredSemester,
      ...withExpiredWeek.semesterHistory,
    ],
    semester: resetSemester,
  };
});

    didExpireRef.current = false;
      
      //stop showing semester active alert and show semester end popup
       setShowSemEnd(true)
       setshowError(false)
       
       setShowSemesterWrapped(true)

       
    }



   
    
   
     return (

    <div className="relative min-h-[420px] w-full justify-center py-10" id='Inputs'>
     <h1 className="text-3xl text-blue-600 text-shadow-lg text-center">Budgets</h1>

  <p className="mt-2 text-gray-700 text-center">
    Click below to enter your semesterly budget:
  </p>
 <div className='flex justify-center'>
  <button
    className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
    onClick={checkactive}>
  
    New Semester budget
  </button>
 </div>
  

        {showError&&
         <div className='flex justify-center'>
        <div className='text-red-500 '> 
          <p>Note:You already have a semester active</p> 
          
          <div className='bg-blue-300 w-sm p-4 rounded-lg flex flex-col items-center'>
             <p className='text-white '>Would You like to end Current Semester?</p>
           
           <div>
            <button className='bg-green-400 text-white p-2 rounded-lg w-15 mr-4 mt-3'
            onClick={()=>{expireSemester()}}>Yes</button> 
           <button className='bg-red-400 text-white p-2 rounded-lg w-15'
           onClick={()=>{setshowError(false)}}>No</button>
           </div>
           
          </div>
          

          </div>
         </div>
        
          }
    
    {showInput &&
    <form className="flex flex-col gap-5 shadow-2xl w-full max-w-md p-6 rounded-2xl
                 bg-white mx-auto mt-8">

        
        <input value={Seminput.Semid} type="text" placeholder='Enter Semester Name'
        className='p-4 w-xs rounded-2xl outline-blue-400 border-2  border-blue-400'
        onChange={(e)=>{setSeminput({...Seminput,Semid:e.target.value})}}/>

        <input value={Seminput.Sembudgetinput} type="number" placeholder='Enter Semester Budget'
        className='p-4 w-xs rounded-2xl outline-blue-400 border-2  border-blue-400'
        onChange={(e)=>{setSeminput({...Seminput,Sembudgetinput:e.target.value})}}/>
        
        <input type="number" value={Seminput.Semduration} placeholder='Enter Semester Duration(Months)'
        className='p-4 w-xs rounded-2xl outline-blue-400 border-2  border-blue-400'
        onChange={(e)=>{setSeminput({...Seminput,Semduration:e.target.value})
        handlesuggestedwkly(e)}}/>



        <input type="number" value={Seminput.savingsGoal} placeholder='Enter Savings Goal'
        className='p-4 w-xs rounded-2xl outline-blue-400 border-2 border-blue-400'
        onChange={(e)=>{ 
        setSeminput({ ...Seminput, savingsGoal: e.target.value });
        }}/>
        
      

       {showSuggested && <div className="mt-4 p-2 w-xs rounded-2xl bg-blue-50 border-2 border-blue-500 shadow-md">
    <p className="text-sm text-blue-600 font-semibold uppercase tracking-wide">
      Suggested Weekly Budget
    </p>
    <p className="text-xl font-bold text-blue-700 mt-1">
      ${suggestedwkly.toFixed(2)}
    </p>

  </div>}
        
        <button onClick={(e)=>{handlenewSemester(e)}}
          className='w-20 text-gray-100 bg-blue-500 rounded-lg  py-1 px-2 hover:bg-blue-600'
          >Confirm</button>

     
   
      </form>}



<div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl overflow-hidden" />
  
    </div>
     
            
        
   )
}
