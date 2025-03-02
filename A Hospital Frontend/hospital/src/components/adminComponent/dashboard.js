import { useEffect, useState } from 'react';
import '../../styles/admindashboard.css';

function Admindashboard () {

    const [department , setDepartment] = useState(0);
    const [doctor , setDoctor] = useState(0);
    const [patient , setPatient] = useState(0);
    const [appointment , setAppointment] = useState(0);

    useEffect(() => {
        fetch('http://localhost:3030/department/count-department')
        .then(res => res.json())
        .then(res => setDepartment(res));
    },[]);

    useEffect(() => {
        fetch('http://localhost:3030/doctor/count-doctor')
        .then(res => res.json())
        .then(res => setDoctor(res));
    },[]);

    useEffect(() => {
        fetch('http://localhost:3030/patient/patient-count')
        .then(res => res.json())
        .then(res => setPatient(res));
    },[]);

    useEffect(() => {
        fetch('http://localhost:3030/appointment/count-appointment')
        .then(res => res.json())
        .then(res => setAppointment(res));
    },[]);

    return(
        <>
        <div class="cards">
            <div class="single-card">
                <div>
                    <span>Total Department</span>
                    <h1 className='set-count'>{department.count}</h1>
                </div>
                <i class="uil uil-sitemap"></i>
            </div>
            <div class="single-card">
                <div>
                    <span className='box-text'>Total Doctor</span>
                    <h1 className='set-count'>{doctor.count}</h1>
                </div>
                <i class="uil uil-stethoscope"></i>
            </div>
            <div class="single-card">
                <div>
                    <span>Total Patient</span>
                    <h1 className='set-count'>{patient.count}</h1>
                </div>
                <i class="uil uil-medical-drip"></i>
            </div>
            <div class="single-card">
                <div>
                    <span>Total Appointment</span>
                    <h1 className='set-count'>{appointment.count}</h1>
                </div>
                <i class="uil uil-notebooks"></i>
            </div>
            
        </div>
        </>
    );
}

export default Admindashboard;