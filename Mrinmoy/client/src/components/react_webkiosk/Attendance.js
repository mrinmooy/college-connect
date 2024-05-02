import React from 'react'
// import dashboard from  '../../../../../temp/raw_webkiosk/index'
import './Style.css'
import { Link } from 'react-router-dom'

const Attendance = () => {

  function fetchAndDisplayData(){
    const resultsContainer = document.getElementById("result-container");
    while (resultsContainer.firstChild) {
    resultsContainer.removeChild(resultsContainer.firstChild);
    }
    const user = document.getElementById("enrollmentNumber").value.trim().toUpperCase();
    const pass = document.getElementById("password").value.trim();
    let userInput2 = document.getElementById("dob").value.trim();
    let date = new Date(userInput2);
    if (!isNaN(date.getTime())) {
        date = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    }
    const dob = date;
    sessionStorage.setItem('username', user);
    sessionStorage.setItem('password', pass);
    sessionStorage.setItem('dob', dob);
    // console.log(user, dob, pass)
    const requestBody = new URLSearchParams({
        user: `${user}`,
        dob: `${dob}`,
        pass: `${pass}`
    }).toString();
fetch('https://college-connect-backend-dmpz.onrender.com/fetch', {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: requestBody,
})
    .then(response => response.json()) 
    .then(data => {
        // Iterate over the parsed data
        data.forEach(item => {

                const tr = document.createElement('tr');
                const trContent = `
                    <td>${item.subjectName}</td>
                    <td>${item.lecturePlusTutorialAttendance}</td>
                    <td>${item.lectureAttendance}</td>
                    <td>${item.tutorialAttendance}</td>
                    <td>${item.practicalAttendance}</td>
                `;
                tr.innerHTML = trContent;
                document.getElementById("result-container").appendChild(tr);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
}





  function validateForm(event) {
    const requiredFields = document.querySelectorAll("input[required]");
    let allFilled = true;

    requiredFields.forEach(field => {
      if (field.value.trim() === "") {
        allFilled = false;
      }
    });
  
    if(allFilled) {
        event.preventDefault();
        fetchAndDisplayData();
    }
  }


  return (
    <div className="container">
      {/* <!-- Sidebar Section --> */}
      <aside>
        <div className="toggle">
          <div className="logo">
            {/* <!-- <img src="img/logo.png" /> --> */}
            <img src="logo.png" />
            <h2>JU<span className="danger">ET</span></h2>
          </div>
          <div className="close" id="close-btn">
            <span className="material-icons-sharp"> close </span>
          </div>
        </div>

        <section className="sidebar">
          {/* <!-- <a href="#">
            <span className="material-icons-sharp"> dashboard </span>
            <h3>Dashboard</h3>
          </a> --> */}
          <Link href="#" className="active">
            <span className="material-icons-sharp"> person_outline </span>
            <h3>Attendance</h3>
          </Link>
          {/* <!-- <a href="/examMarks.html"> --> */}
          <Link to="/Exammarks">
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
          <Link href="#">
            <span className="material-icons-sharp"> report_gmailerrorred </span>
            <h3>Feedback</h3>
          </Link>
        </section>
      </aside>
      {/* <!-- End of Sidebar Section --> */}

      {/* <!-- Main Content --> */}
      <main>
        <h1>Attendance</h1>

        <form action="/fetch" method="post">
          <label htmlFor="enrollmentNumber">Enrollment Number:</label>
          <input
            type="text"
            id="enrollmentNumber"
            name="enrollmentNumber"
            required
          />
          <label htmlFor="dob">Date of Birth (DOB):</label>
          <input type="date" id="dob" name="dob" required />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
          <input type="submit" onClick={validateForm} value="Submit" />
        </form>
        {/* <!-- Recent Orders Table --> */}
        <div className="attendance">
          {/* <!-- <h2>Subject-Wise Attendance</h2> --> */}
          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Lecture + Tutorial</th>
                <th>Lecture</th>
                <th>Tutorial</th>
                <th>Practical</th>
              </tr>
            </thead>
            <tbody id="result-container"></tbody>
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
            <img src="logo.png" />
            <h2>Webkoisk</h2>
            <p>JUET</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Attendance