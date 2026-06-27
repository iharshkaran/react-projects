import React from 'react'
import Section1 from './components/section1/Section1'
import Section2 from './components/section2/Section2'

const user = [
    {
        img : "https://plus.unsplash.com/premium_photo-1661757403301-ae68e1f1b827?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        color : "royalblue",
        intro : "",
        tag : "Satisfied"
    },
    {
        img : "https://plus.unsplash.com/premium_photo-1682608388268-d2fe94141e13?q=80&w=705&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        color : "Purple",
        intro : "",
        tag : "Underbanked"
    },
    {
        img : "https://plus.unsplash.com/premium_photo-1672691612717-954cdfaaa8c5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        color : "pink",
        intro : "",
        tag : "Average"
    },
    {
        img : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        color : "orange",
        intro : "",
        tag : "Underserved"
    },
    {
        img : "https://images.unsplash.com/photo-1600275669439-14e40452d20b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        color : "skyblue",
        intro : "",
        tag : "Manger"
    },
]

const App = () => {
  return (
    <div>
      <Section1 user={user} />
      <Section2/>
    </div>
  )
}

export default App
