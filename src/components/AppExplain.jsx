 import React from 'react'
import { useState } from 'react'
 
 export default function AppExplain(props) { 
   return (
    <section className="relative min-h-[420px] w-full justify-center py-10">
 <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
  
  <h1 className=' text-blue-500 text-3xl font-semibold mb-3 text-shadow-lg text-center'>How It Works</h1>

  <div className='grid  grid-cols-1 place-items-center   sm:grid-cols-2 lg:grid-cols-3'>
     
  <div className=' w-xs  p-6 shadow-2xl rounded-3xl mb-7 xl:w-md xl:pb-10'>
    <h2 className='text-center text-blue-500 font-medium text-lg mb-2'>Semester Budget</h2>
    <p className='text-gray-800 px-1'>
      Create a semester budget and 
      state how long the semester will last. Set a
      realistic saving goal.The system will a suggest a 
      maintanable weekly budget.
      Only one semester can be active
       at a time
    </p>
  </div>

  <div className=' w-xs  p-6 shadow-2xl rounded-3xl mb-7 xl:w-md xl:pb-10'>
    <h2 className='text-center text-blue-500 font-medium text-lg mb-2'>Weekly Budgets</h2>
    <p className='text-gray-800 px-1'>
      Create a weekly budget. 
      Will expire in 7 days. While active 
      you will be be able to view weekly metrics
      and purchases. Upon Expiry you will 
      to download weekly budget review. Only one 
      weekly budget can be active at any time
    </p>
  </div>


  <div className=' w-xs  p-6 shadow-2xl rounded-3xl mb-7 xl:w-md xl:pb-10'>
    <h2 className='text-center text-blue-500 font-medium text-lg mb-2'>Daily Purchases</h2>
    <p className='text-gray-800 px-1'>
      Log daily purchases in order to update total spending
      and remaining budget which can be viewed at the metrics overview.
      Daily purchases can be viewed in purchases table. Purchases can only be added if
      a weekly budget is active.
    </p>
  </div>




  </div>
 
    </section>
   )
 }
 