import React from 'react'

const App = () => {
  return (
    <div className='h-screen w-full bg-[#111111] flex flex-row p-10 text-white'>
      <div className='h-full w-1/2 border-r-2 border-white p-10'>
        <form action="">
          <input type="text" placeholder='Enter the Title' className='w-full h-16 border-2 rounded-xl p-5 mb-5'/>
          <textarea name="" id="" placeholder='Details of Notes' className='w-full border-2 rounded-xl h-40 p-5 mb-5'></textarea>
          <button className='w-full border-2 rounded-xl h-13 p-3 mb-5 text-black bg-white'>Create Note</button>
        </form>
      </div>
      <div className='h-full w-1/2 flex flex-wrap gap-5 p-10'>
        <div className='bg-white h-60 w-50 rounded-2xl relative'>
          <div className='absolute bg-black h-3 w-3 rounded-full left-3 top-3'></div>
        </div>
        <div className='bg-white h-60 w-50 rounded-2xl relative'>
          <div className='absolute bg-black h-3 w-3 rounded-full left-3 top-3'></div>
        </div>
        <div className='bg-white h-60 w-50 rounded-2xl relative'>
          <div className='absolute bg-black h-3 w-3 rounded-full left-3 top-3'></div>
        </div>
        <div className='bg-white h-60 w-50 rounded-2xl relative'>
          <div className='absolute bg-black h-3 w-3 rounded-full left-3 top-3'></div>
        </div>
      </div>
    </div>
  )
}

export default App
