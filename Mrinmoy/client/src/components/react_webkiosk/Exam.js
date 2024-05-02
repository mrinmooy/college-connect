import React, { useEffect, useState } from 'react';
import './Style.css'
import { Link } from 'react-router-dom'

const Exam = () => {

  const [examData, setExamData] = useState([]);

  useEffect(() => {
    console.log('im in exam');

    const resultsContainer = document.getElementById("exam-container");
    while (resultsContainer.firstChild) {
      resultsContainer.removeChild(resultsContainer.firstChild);
    }

    const user = sessionStorage.getItem('username');
    const pass = sessionStorage.getItem('password');
    const dob = sessionStorage.getItem('dob');

    const requestBody = new URLSearchParams({
      user: user,
      dob: dob,
      pass: pass
    }).toString();

    fetch('https://college-connect-backend-dmpz.onrender.com/fetch-exam', {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: requestBody,
    })
      .then(response => response.json())
      .then(data => {
        setExamData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);



  return (
    <div className="container">
      {/* <!-- Sidebar Section --> */}
      <aside>
        <div className="toggle">
          <div className="logo">
            {/* <!-- <img src="img/logo.png" /> --> */}
            <img src="/logo.png" />
            <h2>JU<span className="danger">ET</span></h2>
          </div>
          <div className="close" id="close-btn">
            <span className="material-icons-sharp"> close </span>
          </div>
        </div>

        <section className="sidebar">
          <Link to="/Attendance">
            <span className="material-icons-sharp"> person_outline </span>
            <h3>Attendance</h3>
          </Link>
          <Link to="#" className="active">
            <span className="material-icons-sharp"> receipt_long </span>
            <h3>Exam Marks</h3>
          </Link>
          <Link to="/Datesheet">
            <span className="material-icons-sharp"> inventory </span>
            <h3>Date Sheet</h3>
          </Link>
          <Link to="/Cgpa">
            <span className="material-icons-sharp"> insights </span>
            <h3>CGPA Report</h3>
          </Link>
          <Link to="#">
            <span className="material-icons-sharp"> report_gmailerrorred </span>
            <h3>Feedback</h3>
          </Link>
        </section>
      </aside>
      {/* <!-- Main Content --> */}
      <main>
        <h1>Exam Marks</h1>
        {/* <!-- Recent Orders Table --> */}
        <div className="attendance">
          {/* <!-- <h2>Subject-Wise Attendance</h2> --> */}
          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>T1</th>
                <th>T2</th>
                <th>T3</th>
                <th>P1</th>
                <th>P2</th>
              </tr>
            </thead>
            <tbody id="exam-container">
              {examData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.subjectCode}</td>
                    <td>{item.t1}</td>
                    <td>{item.t2}</td>
                    <td>{item.t3}</td>
                    <td>{item.p1}</td>
                    <td>{item.p2}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/* <!-- <a href="#">Show All</a> --> */}
        </div>
        {/* <!-- End of Recent Orders --> */}
      </main>
      {/* <!-- End of Main Content --> */}

      {/* <!-- Right Section --> */}
      <div className="right-section">
        <div className="nav">
          <button id="menu-btn">
            <span className="material-icons-sharp"> menu </span>
          </button>
          {/* <div className="dark-mode">
            <span className="material-icons-sharp active"> light_mode </span>
            <span className="material-icons-sharp"> dark_mode </span>
          </div> */}
        </div>
        {/* <!-- End of Nav --> */}

        <div className="user-profile">
          <div className="logo">
            {/* <!-- <img src="img/logo.png" /> --> */}
            <img src="/logo.png" />
            <h2>Webkoisk</h2>
            <p>JUET</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Exam