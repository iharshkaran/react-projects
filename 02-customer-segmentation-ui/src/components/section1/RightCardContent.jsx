import React from 'react'

const RightCardContent = (props) => {

    return (
        <div className='absolute h-full w-full left-0 top-0 p-7 flex flex-col justify-between'>
            <h2 className='w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg font-bold'>{props.id+1}</h2>
            <div>
                <p className='text-white mb-10 text-base tracking-wide text-shadow-lg/20'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt cupiditate itaque dolor? Fugit, ab consectetur.</p>
                <div className='flex justify-between items-center'>
                    <button style={{background:props.color}} className='bg-blue-600 px-8 py-1.5 rounded-full text-white'>{props.tag}</button>
                    <button style={{background:props.color}} className='bg-blue-600 px-2.5 py-1.5 rounded-full text-white'><i className="ri-arrow-right-line"></i></button>
                </div>
            </div>
        </div>
    )
}

export default RightCardContent
