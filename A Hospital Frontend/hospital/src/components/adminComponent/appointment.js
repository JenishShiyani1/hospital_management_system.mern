import { Link } from 'react-router-dom';
import '../../styles/doctorList.css';
import { useEffect, useState } from 'react';

function Adminappointment() {

    const [data , setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3030/appointment/list-appointment/' , {method : "GET"})
        .then(res => res.json())
        .then(res => setData(res))
    } , []);

    const formatedList = data.map((app) => {
        let actionButton;
        if (!app.status || app.status === '' || app.status === 'reserved') {
            actionButton = <button className='btn1 btn-yellow mr-3'>Reserved</button>;
        } else if (app.status === 'confirmed') {
            actionButton = <button className='btn1 btn-blue mr-3'>Confirmed</button>;
        } else if (app.status === 'attended') {
            actionButton = <button className='btn1 btn-green mr-3'>Attended</button>;
        } else if (app.status === 'cancelled') {
            actionButton = <button className='btn1 btn-red mr-3'>Canceled</button>;
        }

        return (
            <tbody>
                <tr>
                    <td>{app._id}</td>
                    <td><img src={app.profile} alt="Doctor Profile" /></td>
                    <td>{app.firstName}</td>
                    <td>{app.doctor}</td>
                    <td>
                        {actionButton}
                    </td>
                </tr>
            </tbody>
        );
    })

    return (
        <>
            <div class="container">
                <h1 class="title">Appointment List</h1>
                <table class="doctor-table">
                    <thead>
                        <tr>
                            <th>appointmentID</th>
                            <th>Patient Profile</th>
                            <th>Patient Name</th>
                            <th>Doctor Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    {formatedList}
                </table>
            </div>

        </>
    );
}

export default Adminappointment;