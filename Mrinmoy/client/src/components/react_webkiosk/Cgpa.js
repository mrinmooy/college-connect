import React, { useEffect } from 'react';
import './Style.css';
import { Link } from 'react-router-dom';

const Cgpa = () => {
    useEffect(() => {
        const fetchAndDisplayCGPA = async () => {
            const resultsContainer = document.getElementById("cgpa-container");
            while (resultsContainer.firstChild) {
                resultsContainer.removeChild(resultsContainer.firstChild);
            }

            const user = sessionStorage.getItem('username');
            const pass = sessionStorage.getItem('password');
            const dob = sessionStorage.getItem('dob');
            const requestBody = new URLSearchParams({ user, dob, pass }).toString();

            try {
                const response = await fetch('http://localhost:5000/fetch-cgpa', {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: requestBody
                });
                const data = await response.json();

                data.forEach(item => {
                    const tr = document.createElement('tr');
                    const trContent = `
                        <td>${item.semester}</td>
                        <td>${item.gradePoint}</td>
                        <td>${item.courseCredit}</td>
                        <td>${item.earnedCredit}</td>
                        <td>${item.pointsSecuredSGPA}</td>
                        <td>${item.pointsSecuredCGPA}</td>
                        <td>${item.sgpa}</td>
                        <td>${item.cgpa}</td>
                    `;
                    tr.innerHTML = trContent;
                    resultsContainer.appendChild(tr);
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAndDisplayCGPA();
    }, []);

    return (
        <div className="container">
            <aside>
                <div className="toggle">
                    <div className="logo">
                        <img src="/logo.png" alt="JUET Logo"/>
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
                    <Link to="/Datesheet">
                        <span className="material-icons-sharp">inventory</span>
                        <h3>Date Sheet</h3>
                    </Link>
                    <Link to="#" className="active">
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
                <h1>CGPA Report</h1>
                <div className="attendance">
                    <table>
                        <thead>
                            <tr>
                                <th>Semester</th>
                                <th>Grade Point</th>
                                <th>Course Credit</th>
                                <th>Earned Credit</th>
                                <th>Point Secured SGPA</th>
                                <th>Point Secured CGPA</th>
                                <th>SGPA</th>
                                <th>CGPA</th>
                            </tr>
                        </thead>
                        <tbody id="cgpa-container"></tbody>
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
                        <img src="/logo.png" alt="Webkoisk Logo"/>
                        <h2>Webkoisk</h2>
                        <p>JUET</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cgpa;
