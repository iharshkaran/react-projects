import React from 'react'
import Card from './components/Card'

const jobs = [
  {
    companyLogo: "https://imgs.search.brave.com/rMYhoSBn2NTW46eMWDfrpXtEULEbUGa9y2LZ66m1ROk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzZmLzRj/Lzc1LzZmNGM3NWRk/MDRhOTJlMGM1NjAw/MzMzZmM2ZmQ5Y2Uz/LmpwZw",
    companyName: "Amazon",
    post: "Senior UI/UX Designer",
    postedDate: "5 days ago",
    tag1: "Full Time",
    tag2: "Senior Level",
    pay: "$120/hr",
    location: "San Francisco, CA"
  },
  {
    companyLogo: "https://static.dezeen.com/uploads/2025/05/sq-google-g-logo-update_dezeen_2364_col_0.jpg",
    companyName: "Google",
    post: "Frontend Developer",
    postedDate: "2 days ago",
    tag1: "Full Time",
    tag2: "Mid Level",
    pay: "$95/hr",
    location: "Mountain View, CA"
  },
  {
    companyLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOjh7meRtWaZWgmgF4aLR227G6IkaGEPmPplLXU2CHiBOejxxi6tOBk1Q&s=10",
    companyName: "Microsoft",
    post: "Backend Engineer",
    postedDate: "1 week ago",
    tag1: "Remote",
    tag2: "Senior Level",
    pay: "$110/hr",
    location: "Seattle, WA"
  },
  {
    companyLogo: "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/15844974/netflixlogo.0.0.1466448626.png?quality=90&strip=all&crop=1.2535702951444%2C0%2C97.492859409711%2C100&w=2400",
    companyName: "Netflix",
    post: "React Developer",
    postedDate: "3 days ago",
    tag1: "Full Time",
    tag2: "Junior Level",
    pay: "$85/hr",
    location: "Los Gatos, CA"
  },
  {
    companyLogo: "https://images.seeklogo.com/logo-png/27/1/apple-logo-png_seeklogo-272825.png",
    companyName: "Apple",
    post: "Product Designer",
    postedDate: "6 days ago",
    tag1: "Part Time",
    tag2: "Senior Level",
    pay: "$130/hr",
    location: "Cupertino, CA"
  },
  {
    companyLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYq7Q44IZaZV_veFoDZeJGgyTiED8noQ5lTNTkxfEqiA&s=10",
    companyName: "Meta",
    post: "Full Stack Developer",
    postedDate: "4 days ago",
    tag1: "Remote",
    tag2: "Mid Level",
    pay: "$105/hr",
    location: "Menlo Park, CA"
  },
  {
    companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/3840px-Spotify_logo_without_text.svg.png",
    companyName: "Spotify",
    post: "Mobile App Developer",
    postedDate: "1 day ago",
    tag1: "Contract",
    tag2: "Junior Level",
    pay: "$75/hr",
    location: "Stockholm, Sweden"
  },
  {
    companyLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREibn3wb0tqcMxIH16FoQaeqmgEpsQVW-WpVaSk-iU-g&s=10",
    companyName: "Adobe",
    post: "UI Developer",
    postedDate: "3 weeks ago",
    tag1: "Full Time",
    tag2: "Mid Level",
    pay: "$90/hr",
    location: "San Jose, CA"
  },
  {
    companyLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcvJfmKzkVyvyxkJSXv9g2o6F8B1Y1dz2n9cFY7lsN_M5eXKO-FD_MYMo&s=10",
    companyName: "Tesla",
    post: "Software Engineer",
    postedDate: "2 weeks ago",
    tag1: "On Site",
    tag2: "Senior Level",
    pay: "$125/hr",
    location: "Austin, TX"
  },
  {
    companyLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmZnapMo62aKgpl4Y5MKW-l-gbhbyd9fCyqJa8Yl5FPQ&s=10",
    companyName: "Airbnb",
    post: "Frontend Engineer",
    postedDate: "5 days ago",
    tag1: "Remote",
    tag2: "Mid Level",
    pay: "$100/hr",
    location: "San Francisco, CA"
  },
  {
    companyLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3r5Pp8196JW12Uxw4kiUZbcUEFFmoaJgQgNesHKkUCmbF9BlWturF2c0&s=10",
    companyName: "Uber",
    post: "Data Analyst",
    postedDate: "1 week ago",
    tag1: "Full Time",
    tag2: "Junior Level",
    pay: "$80/hr",
    location: "Chicago, IL"
  },
  {
    companyLogo: "https://img.magnific.com/premium-vector/vector-linkedin-apps-logo-rounded-asset-isolated_1004619-457.jpg?semt=ais_hybrid&w=740&q=80",
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
