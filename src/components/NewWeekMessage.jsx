import {React,useEffect } from "react"


export default function NewWeekMessage(props) {
  const {weekCreated,setWeekCreated}=props
  
      useEffect(() => {
         
      
          const id = setTimeout(() => {
            setWeekCreated(false);
          }, 10000);
          return () => clearTimeout(id);
      },[weekCreated,setWeekCreated])
  
  
    return (
      <div>
          {weekCreated&&<div className='bg-indigo-400 text-amber-50 w-xs p-4 text-md text-center rounded-2xl fixed top-20
      overflow-hidden -left-100  translate-x-100 animate-fade-in-scale z-10'>
          <i className="fa-regular fa-bell"></i>
          Alert:New Week Created</div>
          
          
          
          }
      </div>
    )
}
