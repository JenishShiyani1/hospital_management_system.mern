import { Link, Outlet, useParams } from 'react-router-dom';
import '../styles/admindashboard.css';
import { useEffect, useState } from 'react';

function DoctorDashboard() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [data, setData] = useState({});

    const params = useParams();

    const id = params.id;

    useEffect(() => {
        fetch('http://localhost:3030/doctor/doctor-list/' + id, { method: "GET" })
            .then(res => res.json())
            .then(res => setData(res));
    }, []);

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
                    <h3 className='color-text'>Doctor</h3>
                    <h6 className='color-text'>{data.firstName}</h6>
                </div>
            </div>

            <div class="sidebar-menu">
                <ul>
                    <li onClick={() => handleItemClick(1)} className={selectedItem === 1 ? "selected" : ""}>
                        <i class="uil uil-dashboard"></i>
                        <Link to={"/doctor/" + id + '/'} style={{ color: 'inherit', textDecoration: 'none' }}>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li onClick={() => handleItemClick(2)} className={selectedItem === 2 ? "selected" : ""}>
                        <i class="uil uil-medical-drip"></i>
                        <Link to={"/doctor/" + id + '/patient'} style={{ color: 'inherit', textDecoration: 'none' }}>
                            <span>Patient</span>
                        </Link>
                    </li>
                    <li onClick={() => handleItemClick(3)} className={selectedItem === 3 ? "selected" : ""}>
                        <i class="uil uil-notebooks"></i>
                        <Link to={"/doctor/" + id + '/appointment'} style={{ color: 'inherit', textDecoration: 'none' }}>
                            <span>Appointment</span>
                        </Link>
                    </li>
                    <li onClick={() => handleItemClick(4)} className={selectedItem === 4 ? "selected" : ""}>
                        <i class="uil uil-user-circle"></i>
                        <Link to={"/doctor/" + id + '/profile'} style={{ color: 'inherit', textDecoration: 'none' }}>
                            <span>Profile</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>

            <div class="main-content " id="main-content">
                <header class="flex sticky-header">
                    <h2>
                        Welcome , <span className='edit-name'>{data.firstName} {data.middleName}</span>
                    </h2>
                    <div>
                        <span>
                            <button className='btn btn-dark mr-2' onClick={handleLogout}>Logout</button>
                        </span>
                        <img className='set-img' src={data.profile} alt='Person Img' />
                    </div>
                </header>

                <main>
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default DoctorDashboard;