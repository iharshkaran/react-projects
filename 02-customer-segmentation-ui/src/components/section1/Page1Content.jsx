import React from 'react'
import LeftSideContent from './LeftSideContent'
import RightSideContent from './RightSideContent'

const Page1Content = (props) => {

  return (
    <div className='w-full h-[88vh] px-18 py-6 flex gap-3'>
      <LeftSideContent />
      <RightSideContent user={props.user}/>
    </div>
  )
}

export default Page1Content
