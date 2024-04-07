import React,{useEffect} from 'react'
import './About.css'


function About() {

  const callAboutPage = async()=>{
      try {
        const res = await fetch('http://localhost:5000/about',{
          method: "GET",
          headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include"
        });
        const data = await res.json();
        console.log(data);
        if(!res.status===200){
          const error = new Error(res.error);
          throw error;
        }
      } catch (error) {
        console.log(error);
      }
  }


  useEffect(()=>{
    callAboutPage();
  },[])

  return (
    <div className="about-container">
      
    </div>
  )
}

export default About