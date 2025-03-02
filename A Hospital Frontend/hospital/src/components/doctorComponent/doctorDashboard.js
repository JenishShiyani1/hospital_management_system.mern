import { useParams } from 'react-router-dom';
import '../../styles/admindashboard.css';
import { useEffect, useState } from 'react';

function Doctordashboard() {
    const [doctor, setDoctor] = useState({});
    const [data, setData] = useState({ count: 0 });
    const [newData, setNewData] = useState({ count: 0 });

    const params = useParams();
    const Id = params.id;

    useEffect(() => {
        fetchDoctorData();
    }, [Id]);

    const fetchDoctorData = () => {
        fetch('http://localhost:3030/doctor/doctor-list/' + Id, { method: "GET" })
            .then(res => res.json())
            .then(res => {
                setDoctor(res);
                fetchAppointmentData(res.firstName);
                fetchTodayAppointmentData(res.firstName);
            })
            .catch(error => console.error("Error fetching doctor data:", error));
    };

    const fetchAppointmentData = (firstName) => {
        fetch('http://localhost:3030/doctor/get-appointment/' + firstName, { method: "GET" })
            .then(res => res.json())
            .then(res => setData(res))
            .catch(error => console.error("Error fetching appointment data:", error));
    };

    const fetchTodayAppointmentData = (firstName) => {
        fetch('http://localhost:3030/doctor/get-todayAppointment/' + firstName, { method: "GET" })
            .then(res => res.json())
            .then(res => setNewData(res))
            .catch(error => console.error("Error fetching today's appointment data:", error));
    };

    return (
        <>
            <div className="cards">
                <div className="single-card">
                    <div>
                        <span>Total Appointment</span>
                        <h1 className='set-count'>{newData.count}</h1>
                    </div>
                    <i className="uil uil-sitemap"></i>
                </div>
                <div className="single-card">
                    <div>
                        <span className='box-text'>Total Patient</span>
                        <h1 className='set-count'>{data.count}</h1>
                    </div>
                    <i className="uil uil-stethoscope"></i>
                </div>
            </div>
        </>
    );
}

export default Doctordashboard;
