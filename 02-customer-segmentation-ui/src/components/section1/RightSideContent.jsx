import React from 'react'
import RightCard from './RightCard'

const RightSideContent = (props) => {
    
    return (
        <div id='rightContent' className='w-2/3 p-4 flex gap-5 overflow-x-auto'>
            {
                (props.user).map((users,idx)=>{
                    return(
                        <RightCard key={idx} id={idx} img ={users.img} tag={users.tag} color={users.color}/>
                    )
                })
            }
        </div>
    )
}

export default RightSideContent
