import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../styles/doctorList.css';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function PatientAppointment() {

    const [data, setData] = useState([]);
    const [appData, setAppData] = useState({});
    const navigate = useNavigate();
    const params = useParams();
    const Id = params.id;

    useEffect(() => {
        fetch('http://localhost:3030/patient/patient-list/' + Id, { method: "GET" })
            .then(res => res.json())
            .then(res => setAppData(res))
    }, []);

    useEffect(() => {
        fetch('http://localhost:3030/appointment/get-appointmentByEmail', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: appData.email })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setData(res);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [appData]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Alert",
            text: "Are you sure want to delete ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch('http://localhost:3030/appointment/delete-appointment/' + id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.success) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Appointment has been deleted.",
                                icon: "success"
                            });
                            fetch('http://localhost:3030/appointment/get-appointmentByEmail', {
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ email: appData.email })
                            })
                                .then(res => res.json())
                                .then(res => {
                                    console.log(res);
                                    setData(res);
                                })
                                .catch(error => {
                                    console.error('Error fetching data:', error);
                                });
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: "Failed to delete appointment.",
                                icon: "error"
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting appointment:', error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete appointment.",
                            icon: "error"
                        });
                    });
            }
        });
    }

    const formatedList = data.map((app) => {
        let actionButton;
        if (!app.status || app.status === '' || app.status === 'reserved') {
            actionButton = <button className='btn1 btn-yellow mr-3'>Reserved</button>;
        } else if (app.status === 'confirmed') {
            actionButton = <button className='btn1 btn-blue mr-3'>Confirmed</button>;
        } else if (app.status === 'attended') {
            actionButton = <button className='btn1 btn-green mr-3'>Attended</button>;
        } else if (app.status === 'cancelled') {
            actionButton = <button className='btn1 btn-red mr-3'>Cancelled</button>;
        }

        return (
            <tbody key={app._id}>
                <tr>
                    <td><img src={app.profile} alt="Doctor Profile" /></td>
                    <td>{app.firstName}</td>
                    <td>{app.doctor}</td>
                    <td>{app.datetime.split('T')[0]}</td>
                    <td>{actionButton}</td>
                    <td>
                        <button className='btn btn-danger mr-3' onClick={() => handleDelete(app._id)}>Delete</button>
                        {app.status != 'confirmed' && app.status != 'cancelled' && app.status != 'attended' && (
                            <button className='btn btn-warning mr-3' onClick={() => {
                                navigate(`/patient/${Id}/edit-appointment/${app._id}`);
                            }}>Edit</button>
                        )}
                    </td>
                </tr>
            </tbody>
        );
    });

    return (
        <>
            <Link to={"/patient/" + Id + "/add-appointment"} style={{ color: 'inherit', textDecoration: 'none' }}>
                <button className="department-list-button">
                    <i class="uil uil-plus"></i>
                    add Appointment
                </button>
            </Link>
            <div class="container">
                <h1 class="title">Appointment List</h1>
                <table class="doctor-table">
                    <thead>
                        <tr>
                            <th>Patient Profile</th>
                            <th>Patient Name</th>
                            <th>Doctor Name</th>
                            <th>DateTime</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {formatedList}
                </table>
            </div>

        </>
    );
}

export default PatientAppointment;