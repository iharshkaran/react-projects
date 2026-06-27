import React from 'react'
import Arrow from './Arrow'
import HeroText from './HeroText'

const LeftSideContent = () => {
  return (
    <div className='w-1/3 h-full flex flex-col justify-between'>
        <HeroText />
        <Arrow />
    </div>
  )
}

export default LeftSideContent
