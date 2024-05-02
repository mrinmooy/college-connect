import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Style.css';

const Datesheet = () => {
  const [dateSheetData, setDateSheetData] = useState([]);

  useEffect(() => {
    console.log('im in datesheet');

    const user = sessionStorage.getItem('username');
    const pass = sessionStorage.getItem('password');
    const dob = sessionStorage.getItem('dob');

    const requestBody = new URLSearchParams({
      user: user,
      dob: dob,
      pass: pass
    }).toString();

    fetch('https://college-connect-backend-dmpz.onrender.com/fetch-datesheet', {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: requestBody,
    })
    .then(response => response.json())
    .then(data => {
      setDateSheetData(data);
    })
    .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="container">
      <aside>
        <div className="toggle">
          <div className="logo">
            <img src="/logo.png" alt="Logo" />
            <h2>JU<span className="danger">ET</span></h2>
          </div>
          <div className="close" id="close-btn">
            <span className="material-icons-sharp">close</span>
          </div>
        </div>
        <section className="sidebar">
          <Link to="/Attendance">
            <span className="material-icons-sharp">person_outline</span>
            <h3>Attendance</h3>
          </Link>
          <Link to="/Exammarks">
            <span className="material-icons-sharp">receipt_long</span>
            <h3>Exam Marks</h3>
          </Link>
          <Link to="#" className="active">
            <span className="material-icons-sharp">inventory</span>
            <h3>Date Sheet</h3>
          </Link>
          <Link to="/Cgpa">
            <span className="material-icons-sharp">insights</span>
            <h3>CGPA Report</h3>
          </Link>
          <Link to="#">
            <span className="material-icons-sharp">report_gmailerrorred</span>
            <h3>Feedback</h3>
          </Link>
        </section>
      </aside>
      <main>
        <h1>Date Sheet</h1>
        <div className="attendance">
          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {dateSheetData.map((item, index) => (
                <tr key={index}>
                  <td>{item.subject}</td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <div className="right-section">
        <div className="nav">
          <button id="menu-btn">
            <span className="material-icons-sharp">menu</span>
          </button>
          {/* <div className="dark-mode">
            <span className="material-icons-sharp active">light_mode</span>
            <span className="material-icons-sharp">dark_mode</span>
          </div> */}
        </div>
        <div className="user-profile">
          <div className="logo">
            <img src="/logo.png" alt="Logo" />
            <h2>Webkoisk</h2>
            <p>JUET</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Datesheet;
