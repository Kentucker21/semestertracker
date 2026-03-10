import { React,useEffect } from "react";


export default function NewPurchasemessage(props) {
  const {showPurchaseAdded,setShowPurchaseAdded}=props
    
        useEffect(() => {
        if (!showPurchaseAdded) return;
    
        const id = setTimeout(() => {
          setShowPurchaseAdded(false);
        }, 10000); 
    
        return () => clearTimeout(id);
      }, [showPurchaseAdded, setShowPurchaseAdded]);
      return (
    
    
        <div>
    {showPurchaseAdded && <div className='bg-blue-400 text-amber-50 w-xs p-4 text-md text-center rounded-2xl fixed top-20
        overflow-hidden -left-100  translate-x-100 animate-fade-in-scale'>
            <i className="fa-regular fa-bell"></i>
            Alert: New Purchase Added</div>
            
            
            
            }
    
            
        </div>
        
        
      )
}
