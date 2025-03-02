import { useEffect, useState } from 'react';
import '../../styles/doctorList.css';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function Doctorpatient() {
    const [doctor, setDoctor] = useState({});
    const [data, setData] = useState([]);

    const params = useParams();
    const Id = params.id;

    const fetchDoctorData = () => {
        fetch('http://localhost:3030/doctor/doctor-list/' + Id)
            .then(res => res.json())
            .then(res => setDoctor(res))
            .catch(error => console.error("Error fetching doctor data:", error));
    };

    const handleConfirm = (id) => {
        Swal.fire({
            title: 'Are you sure you want to confirm this appointment?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                const status = 'confirmed';
                fetch('http://localhost:3030/appointment/' + id + '/status/' + status, { method: "PATCH" })
                    .then(res => res.json())
                    .then(() => {
                        Swal.fire('Appointment Confirmed!', '', 'success');
                        fetchAppointmentData();
                    })
                    .catch(error => {
                        console.error("Error confirming appointment:", error);
                        Swal.fire('Error!', 'Failed to confirm appointment', 'error');
                    });
            }
        });
    }

    const handleCancel = (id) => {
        Swal.fire({
            title: 'Are you sure you want to cancel this appointment?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Cancel',
            cancelButtonText: 'Don\'t Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                const status = 'cancelled';
                fetch('http://localhost:3030/appointment/' + id + '/status/' + status, { method: "PATCH" })
                    .then(res => res.json())
                    .then(() => {
                        Swal.fire('Appointment Cancelled!', '', 'success');
                        fetchAppointmentData();
                    })
                    .catch(error => {
                        console.error("Error cancelling appointment:", error);
                        Swal.fire('Error!', 'Failed to cancel appointment', 'error');
                    });
            }
        });
    }

    const fetchAppointmentData = () => {
        fetch('http://localhost:3030/doctor/get-appointment/' + doctor.firstName)
            .then(res => res.json())
            .then(res => setData(res))
            .catch(error => console.error("Error fetching appointment data:", error));
    };

    useEffect(() => {
        fetchDoctorData();
    }, [Id]);

    useEffect(() => {
        if (doctor.firstName) {
            fetchAppointmentData();
        }
    }, [doctor.firstName]);

    const formatedList = data.list ? data.list.map((app) => {
        return (
            <tbody key={app._id}>
                <tr>
                    <td>{app._id}</td>
                    <td><img src={app.profile} alt="Patient Profile" /></td>
                    <td>{app.firstName}</td>
                    <td>{app.mobileNo}</td>
                    <td style={{ color: 'black' }}>{app.datetime.split('T')[0]}</td>
                    <td>
                        {app.status === 'confirmed' ? (
                            <button className='btn btn-warning' disabled>Confirmed</button>
                        ) : app.status === 'cancelled' ? (
                            <button className='btn btn-danger' disabled>Cancelled</button>
                        ) : (
                            <>
                                <button className='btn btn-warning mr-3' onClick={() => { handleConfirm(app._id) }}>Confirm</button>
                                <button className='btn btn-danger' onClick={() => { handleCancel(app._id) }}>Cancel</button>
                            </>
                        )}
                    </td>
                </tr>
            </tbody>
        );
    }) : null;

    return (
        <>
            <div className="container">
                <h1 className="title">Patient List</h1>
                <table className="doctor-table">
                    <thead>
                        <tr>
                            <th>Patient ID</th>
                            <th>Profile</th>
                            <th>Patient Name</th>
                            <th>Mobile No</th>
                            <th>DateTime</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {formatedList}
                </table>
            </div>
        </>
    );
}

export default Doctorpatient;
