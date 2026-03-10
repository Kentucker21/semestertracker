import React, { useState, useEffect} from 'react'

export default function EndSemestermessage(props) {
    const {showSemEnd,setShowSemEnd}=props

    useEffect(() => {
    if (!showSemEnd) return;

    const id = setTimeout(() => {
      setShowSemEnd(false);
    }, 10000);

    return () => clearTimeout(id);
  }, [showSemEnd, setShowSemEnd]);
  return (


    <div>
{showSemEnd && <div className='bg-blue-400 text-amber-50 w-xs p-4 text-md text-center rounded-2xl fixed top-0
    overflow-hidden -left-100  translate-x-100 animate-fade-in-scale'>
        <i className="fa-regular fa-bell"></i>
        Alert: Semester ended</div>
        
        
        
        }

        
    </div>
    
    
  )
}
