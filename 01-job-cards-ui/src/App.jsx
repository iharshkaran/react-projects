import React from 'react'
import Card from './components/Card'

const jobs = [
  {
    companyLogo: "/logos/amazon.webp",
    companyName: "Amazon",
    post: "Senior UI/UX Designer",
    postedDate: "5 days ago",
    tag1: "Full Time",
    tag2: "Senior Level",
    pay: "$120/hr",
    location: "San Francisco, CA"
  },
  {
    companyLogo: "/logos/google.png",
    companyName: "Google",
    post: "Frontend Developer",
    postedDate: "2 days ago",
    tag1: "Full Time",
    tag2: "Mid Level",
    pay: "$95/hr",
    location: "Mountain View, CA"
  },
  {
    companyLogo: "/logos/microsoft.webp",
    companyName: "Microsoft",
    post: "Backend Engineer",
    postedDate: "1 week ago",
    tag1: "Remote",
    tag2: "Senior Level",
    pay: "$110/hr",
    location: "Seattle, WA"
  },
  {
    companyLogo: "/logos/netflix.webp",
    companyName: "Netflix",
    post: "React Developer",
    postedDate: "3 days ago",
    tag1: "Full Time",
    tag2: "Junior Level",
    pay: "$85/hr",
    location: "Los Gatos, CA"
  },
  {
    companyLogo: "/logos/apple.jpg",
    companyName: "Apple",
    post: "Product Designer",
    postedDate: "6 days ago",
    tag1: "Part Time",
    tag2: "Senior Level",
    pay: "$130/hr",
    location: "Cupertino, CA"
  },
  {
    companyLogo: "/logos/meta.avif",
    companyName: "Meta",
    post: "Full Stack Developer",
    postedDate: "4 days ago",
    tag1: "Remote",
    tag2: "Mid Level",
    pay: "$105/hr",
    location: "Menlo Park, CA"
  },
  {
    companyLogo: "/logos/spotify.png",
    companyName: "Spotify",
    post: "Mobile App Developer",
    postedDate: "1 day ago",
    tag1: "Contract",
    tag2: "Junior Level",
    pay: "$75/hr",
    location: "Stockholm, Sweden"
  },
  {
    companyLogo: "/logos/adobe.png",
    companyName: "Adobe",
    post: "UI Developer",
    postedDate: "3 weeks ago",
    tag1: "Full Time",
    tag2: "Mid Level",
    pay: "$90/hr",
    location: "San Jose, CA"
  },
  {
    companyLogo: "/logos/tesla.jpg",
    companyName: "Tesla",
    post: "Software Engineer",
    postedDate: "2 weeks ago",
    tag1: "On Site",
    tag2: "Senior Level",
    pay: "$125/hr",
    location: "Austin, TX"
  },
  {
    companyLogo: "/logos/airbnb.png",
    companyName: "Airbnb",
    post: "Frontend Engineer",
    postedDate: "5 days ago",
    tag1: "Remote",
    tag2: "Mid Level",
    pay: "$100/hr",
    location: "San Francisco, CA"
  },
  {
    companyLogo: "/logos/uber.png",
    companyName: "Uber",
    post: "Data Analyst",
    postedDate: "1 week ago",
    tag1: "Full Time",
    tag2: "Junior Level",
    pay: "$80/hr",
    location: "Chicago, IL"
  },
  {
    companyLogo: "/logos/linkedin.webp",
    companyName: "LinkedIn",
    post: "Software Developer",
    postedDate: "2 days ago",
    tag1: "Hybrid",
    tag2: "Mid Level",
    pay: "$98/hr",
    location: "Sunnyvale, CA"
  }
];

const App = () => {
  return (
    <div className='parent'>
      {
        jobs.map((elem,idx) => {
          return(
            <div key={idx}>
              <Card companyLogo={elem.companyLogo} companyName={elem.companyName} post={elem.post} postedDate={elem.postedDate} tag1={elem.tag1} tag2={elem.tag2} pay={elem.pay} location={elem.location}/>
            </div>
          )
        })
      }
    </div>
  )
}

export default App
