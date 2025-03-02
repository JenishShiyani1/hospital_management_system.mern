import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function DoctorAppointment() {
    const [doctor, setDoctor] = useState({});
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const Id = params.id;

    const fetchDoctorData = () => {
        fetch('http://localhost:3030/doctor/doctor-list/' + Id)
            .then(res => res.json())
            .then(res => setDoctor(res))
            .catch(error => console.error("Error fetching doctor data:", error));
    };

    const fetchTodayAppointments = () => {
        fetch('http://localhost:3030/doctor/get-todayAppointment/' + doctor.firstName)
            .then(res => res.json())
            .then(res => {
                setAppointments(res.list);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching today's appointments:", error);
                setLoading(false);
            });
    };

    const handleAttend = (id) => {
        Swal.fire({
            title: 'Are you sure you want to attend this appointment?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                const status = 'attended';
                fetch('http://localhost:3030/appointment/' + id + '/status/' + status, { method: "PATCH" })
                    .then(res => res.json())
                    .then(() => {
                        Swal.fire('Appointment Attended!', '', 'success');
                        fetchTodayAppointments();
                    })
                    .catch(error => {
                        console.error("Error attending appointment:", error);
                        Swal.fire('Error!', 'Failed to attend appointment', 'error');
                    });
            }
        });
    }

    useEffect(() => {
        fetchDoctorData();
    }, []);

    useEffect(() => {
        if (doctor.firstName) {
            fetchTodayAppointments();
        }
    }, [doctor.firstName]);

    return (
        <>
            <div className="container">
                <h1 className="title">Appointment List</h1>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <table className="doctor-table">
                        <thead>
                            <tr>
                                <th>Appointment ID</th>
                                <th>Patient Profile</th>
                                <th>Patient Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(app => (
                                <tr key={app._id}>
                                    <td>{app._id}</td>
                                    <td><img src={app.profile} alt="Doctor Profile" /></td>
                                    <td>{app.firstName}</td>
                                    <td>
                                        {app.status === 'attended' ? (
                                            <button className='btn btn-success' disabled>Attended</button>
                                        ) : (
                                            <button className='btn btn-success' onClick={() => handleAttend(app._id)}>Attend</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}

export default DoctorAppointment;
