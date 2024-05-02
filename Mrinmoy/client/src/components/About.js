import React,{useEffect} from 'react'
import './About.css'


function About() {

  const callAboutPage = async()=>{
      try {
        const res = await fetch('https://college-connect-backend-dmpz.onrender.com/about',{
          method: "GET",
          headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include"
        });
        const response = await res;
        if(response.status === 401){
          console.log('user is probably not logged in');
        }
        else {
          const data = await response.json();
          console.log(data);
        }
    } catch (error) {
      // console.log(error);
      // console.log('user is probably not logged in');
    }
    // console.log("hi about");
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