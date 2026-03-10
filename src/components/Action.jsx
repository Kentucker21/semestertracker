import React from 'react'

export default function Action() {
  return (
    <section className="relative min-h-[420px] w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-100 via-white to-blue-50 text-gray-800">
  <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-blue-400/20 blur-2xl" />

  <h1 className="mt-16 text-4xl font-bold text-center leading-tight">
    Welcome to <br />
    <span className="text-blue-500">Semester Budget Tracker</span>
  </h1>

  <p className="mt-3 text-lg text-gray-600 text-center max-w-md">
    Track your spending, stay in control, and finish the semester stress-free.
  </p>

  <div className='flex gap-4'>
<button className="mt-6 rounded-xl bg-blue-500 px-6 py-3 text-white font-semibold shadow-lg hover:bg-blue-600 transition">
   <a href="#Inputs"> Get Started</a>
  </button>
  <button className="mt-6 rounded-xl bg-blue-500 px-6 py-3 text-white font-semibold shadow-lg hover:bg-blue-600 transition">
   <a href="#Overview"> View Budget</a>
  </button>
  </div>
  

  <div className="mt-5 w-[420px] rounded-2xl  p-4 ">
    <img
      src="b1.png"
      alt="Budgeting illustration"
      className="rounded-xl transition-transform duration-300 hover:scale-105"
    />
  </div>
</section>
  )
}
