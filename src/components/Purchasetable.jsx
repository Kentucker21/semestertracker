import React from 'react'
import Removeprefix from '../util/Removeprefix'

export default function Purchasetable(props) {
    const {Json}=props

    const purchases=Json.week.active.purchases
  return (
    <div className=' flex  flex-col items-center '>
        <h1 className=" mb-4 text-3xl font-bold text-blue-600 text-center mb-2  tracking-wide "> Purchase Overview</h1>
        <table className='border w-[50%] rounded-3xl'>
            <thead className=' bg-blue-500 text-gray-200'>
                <tr className=''>
                    <th className='border-blue-500 border-2'>Item Name</th>
                    <th className='border-blue-500 border-2'>Item Price</th>
                    <th className='border-blue-500 border-2'>Category</th>
                    <th className='border-blue-500 border-2'>Purchased On</th>
                </tr>
                
            </thead>

            <tbody>

             {purchases.map((pur,key)=>{
              return(
                <tr key={key} className='border'>
                 <td className='border-gray-400 border-2 text-center'>{pur.name}</td>
                 <td className='border-gray-400 border-2 text-center'>${pur.amount}</td>
                 <td className='text-center border-gray-400 border-2'>{Removeprefix("cat_",pur.categoryId) }</td>               
                 <td className='text-center border-gray-400 border-2'>{new Date(pur.purchasedAt).toLocaleString('en-US', {
                     month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}</td>
                 </tr>
              )
             })}
             

        
            </tbody>
            
        </table>
    </div>
  )
}
