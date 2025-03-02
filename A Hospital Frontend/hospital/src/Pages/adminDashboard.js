import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import '../styles/admindashboard.css';
import { useEffect, useState } from 'react';

function AdminDashboard() {

    const [selectedItem, setSelectedItem] = useState(null);
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const params = useParams();

    const Id = params.id;

    useEffect(() => {
        fetch('http://localhost:3030/admin/admin-id/' + Id, { method: "GET" })
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
                    <h3 className='color-text'>Admin</h3>
                    <h6 className='color-text'>{data.name}</h6>
                </div>
            </div>

            <div class="sidebar-menu">
                <ul>
                    <li onClick={() => handleItemClick(1)} className={selectedItem === 1 ? "selected" : ""}>
                        <i class="uil uil-dashboard"></i>
                        <Link to={"/admin/" + Id} style={{ color: 'inherit', textDecoration: 'none' }}>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li onClick={() => handleItemClick(2)} className={selectedItem === 2 ? "selected" : ""}>
                        <i class="uil uil-sitemap"></i>
                        <Link to={"/admin/" + Id + "/department"} style={{ color: 'inherit', textDecoration: 'none' }}>
                            <span>Department</span>
                        </Link>
                    </li>
                    <li onClick={() => handleItemClick(3)} className={selectedItem === 3 ? "selected" : ""}>
                        <i class="uil uil-stethoscope"></i>
                        <Link to={"/admin/" + Id + "/doctor"} style={{ color: 'inherit', textDecoration: 'none' }}>
                            <span>Doctor</span>
                        </Link>
                    </li>
                    <li onClick={() => handleItemClick(4)} className={selectedItem === 4 ? "selected" : ""}>
                        <i class="uil uil-medical-drip"></i>
                        <Link to={"/admin/" + Id + "/patient"} style={{ color: 'inherit', textDecoration: 'none' }}>
                            <span>Patient</span>
                        </Link>
                    </li>
                    <li onClick={() => handleItemClick(5)} className={selectedItem === 5 ? "selected" : ""}>
                        <i class="uil uil-notebooks"></i>
                        <Link to={"/admin/" + Id + "/appointment"} style={{ color: 'inherit', textDecoration: 'none' }}>
                            <span>Appointment</span>
                        </Link>
                    </li>
                    <li onClick={() => handleItemClick(6)} className={selectedItem === 6 ? "selected" : ""}>
                    <i class="uil uil-plus"></i>
                        <Link to={'/admin/' + Id + '/add'} style={{ color: 'inherit', textDecoration: 'none' }}>
                            <span>Add Admin</span>
                        </Link>
                    </li>
                    <li onClick={() => handleItemClick(7)} className={selectedItem === 7 ? "selected" : ""}>
                        <i class="uil uil-user"></i>
                        <Link to={"/admin/" + Id + "/profile"} style={{ color: 'inherit', textDecoration: 'none' }}>
                            <span>Profile</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>

            <div class="main-content " id="main-content">
                <header class="flex sticky-header">
                    <h2>
                        Welcome , <span className='edit-name'>{data.name} {data.middleName}</span>
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

export default AdminDashboard;