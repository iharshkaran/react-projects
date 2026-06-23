import React from 'react'
import {Bookmark} from 'lucide-react'

const Card = (props) => {
  return (
      <div className="card">
        <div className="top">
            <div className='logo'><img src={props.companyLogo} alt="amazon" /></div>
            <button>Save <Bookmark className='bookmark'/></button>
        </div>
        <div className="middle">
            <h3>{props.companyName} <span>{props.postedDate}</span></h3>
            <h2>{props.post}</h2>
            <div>
                <div className="tag">{props.tag1}</div>
                <div className="tag">{props.tag2}</div>
            </div>
        </div>
        <div className="bottom">
            <div>
                <h3>{props.pay}</h3>
                <p>{props.location}</p>
            </div>
            <button>Apply now</button>
        </div>
      </div>
  )
}

export default Card
