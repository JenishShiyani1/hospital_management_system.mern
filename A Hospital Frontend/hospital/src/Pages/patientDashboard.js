import { Link, Outlet, useParams } from 'react-router-dom';
import '../styles/admindashboard.css';
import { useEffect, useState } from 'react';

function PatientDashboard() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [patientData , setPatientData] = useState([]);

    const params = useParams();
    const Id = params.id;

    useEffect(() => {
        fetch('http://localhost:3030/patient/patient-list/'+ Id , {method : "GET"})
        .then(res => res.json())
        .then(res => setPatientData(res));
    },[]);

    const handleItemClick = (index) => {
      setSelectedItem(index);
    };
    const handleLogout = () => {
        localStorage.removeItem("login");
        window.location.reload();
    }
    return (
        <><div class="sidebar" id="sidebar">
            <div class="logo">
                <div className='alignment'>
                    <h1>
                        <i class="uil uil-user m-3 logo-color"></i>
                    </h1>
                </div>
                <div>
                    <h3 className='color-text'>Patient</h3>
                    <h6 className='color-text'>{patientData.firstName}</h6>
                </div>
            </div>

            <div class="sidebar-menu">
                <ul>
                    <li onClick={() => handleItemClick(1)} className={selectedItem === 1 ? "selected" : ""}>
                        <i class="uil uil-dashboard"></i>
                        <Link to={"/patient/"+Id+"/"} style={{ color: 'inherit', textDecoration: 'none' }}>
                        <span>Dashboard</span>
                        </Link>
                    </li>
                    <li onClick={() => handleItemClick(3)} className={selectedItem === 3 ? "selected" : ""}>
                        <i class="uil uil-notebooks"></i>
                        <Link to={"/patient/"+Id+"/add-appointment"} style={{ color: 'inherit', textDecoration: 'none' }}>
                        <span>Appointment</span>
                        </Link>
                    </li>
                    <li onClick={() => handleItemClick(4)} className={selectedItem === 4 ? "selected" : ""}>
                    <i class="uil uil-user-circle"></i>
                        <Link to={"/patient/"+Id+"/profile"} style={{ color: 'inherit', textDecoration: 'none' }}>
                        <span>Profile</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>

            <div class="main-content " id="main-content">
                <header class="flex sticky-header">
                    <h2>
                        Welcome , <span className='edit-name'>{patientData.firstName} {patientData.middleName}</span>
                    </h2>
                    <div>
                        <span>
                            <button className='btn btn-dark mr-2' onClick={handleLogout}>Logout</button>
                        </span>
                        <img className='set-img' src={patientData.profile} alt='Person Img' />
                    </div>
                </header>

                <main>
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default PatientDashboard;