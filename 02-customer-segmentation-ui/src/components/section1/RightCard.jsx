import React from 'react'
import RightCardContent from './RightCardContent'

const RightCard = (props) => {
    
    return (
        <div className='bg-white relative w-3xs h-full rounded-4xl overflow-hidden shrink-0'>
            <img className='object-cover h-full w-full' src={props.img} alt="" />
            <RightCardContent id={props.id} tag={props.tag} color={props.color}/>
        </div>
    )
}

export default RightCard
