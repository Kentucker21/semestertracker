import React from 'react'
import { useEffect } from 'react';

export default function EndWeekmessage(props) {
  const {showWeekEnd,setShowWeekEnd}=props
  
      useEffect(() => {
      if (!showWeekEnd) return;
  
      const id = setTimeout(() => {
        setShowWeekEnd(false);
      }, 10000); 
  
      return () => clearTimeout(id);
    }, [showWeekEnd, setShowWeekEnd]);
    return (
  
  
      <div>
  {showWeekEnd && <div className='bg-blue-400 text-amber-50 w-xs p-4 text-md text-center rounded-2xl fixed top-20
      overflow-hidden -left-100  translate-x-100 animate-fade-in-scale'>
          <i className="fa-regular fa-bell"></i>
          Alert: Week ended</div>
          
          
          
          }
  
          
      </div>
      
      
    )
}
