import { useState } from 'react'

const App = () => {
  let [num, setNum] = useState(0)

  function increaseNum() {
    setNum(num + 1)
  }

  function decreaseNum() {
    setNum(num - 1)
  }

  return (
    <div className='w-full h-screen bg-[#1a1a1a] flex justify-center items-center'>
      <div className='flex justify-center items-center w-[360px] h-[320px] flex-wrap'>
        <div className='bg-[#363636] w-full h-[60%] rounded-2xl border flex justify-center items-center text-9xl font-extrabold text-white' >{num}</div>
        <div className='flex justify-between gap-5 w-[95%]'>
          <button className='bg-[#363636] py-3 px-10 text-xl text-white border rounded-2xl tracking-wide' onClick={increaseNum}>Increase</button>
          <button className='bg-[#363636] py-3 px-10 text-xl text-white border rounded-2xl tracking-wide' onClick={decreaseNum}>Decrease</button>
        </div>
      </div>
    </div>
  )
}

export default App
