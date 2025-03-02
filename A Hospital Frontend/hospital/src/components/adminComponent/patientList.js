import { Link, useParams } from 'react-router-dom';
import '../../styles/doctorList.css';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function PatientList() {

    const [data, setData] = useState({});
    const [patient, setPatient] = useState([]);

    const params = useParams();

    const Id = params.id;

    useEffect(() => {
        fetch('http://localhost:3030/admin/admin-id/' + Id, { method: "GET" })
            .then(res => res.json())
            .then(res => setData(res));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3030/patient/patient-list', { method: "GET" })
            .then(res => res.json())
            .then(res => setPatient(res));
    }, []);

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
                fetch('http://localhost:3030/patient/delete-patient/'+id, {
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
                                text: "Patient has been deleted.",
                                icon: "success"
                            });
                            fetch('http://localhost:3030/patient/patient-list', { method: "GET" })
                                .then(res => res.json())
                                .then(res => setPatient(res))
                                .catch(error => console.error('Error fetching patient list:', error));
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: "Failed to delete patient.",
                                icon: "error"
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting patient:', error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete patient.",
                            icon: "error"
                        });
                    });
            }
        });
    }

    const formatedPatient = patient.map((patient) => {
        return (
            <tbody>
                <tr>
                    <td>{patient._id}</td>
                    <td><img src={patient.profile} alt="Doctor Profile" /></td>
                    <td>{patient.title} {patient.firstName} {patient.middleName}</td>
                    <td>{patient.mobileNo}</td>
                    <td>{patient.gender}</td>
                    <td>
                        <Link to={`/admin/${Id}/edit-patient/${patient._id}`}><button className='btn btn-warning mr-3'>Edit</button></Link>
                        <button className='btn btn-danger' onClick={() => handleDelete(patient._id)}>Delete</button>
                    </td>
                </tr>
            </tbody>
        );
    });

    return (
        <>
            <Link to={"/admin/" + Id + "/patient"} style={{ color: 'inherit', textDecoration: 'none' }}>
                <button className="department-list-button">
                    <i class="uil uil-plus"></i>
                    add Patient
                </button>
            </Link>
            <div class="container">
                <h1 class="title">Patient List</h1>
                <table class="doctor-table">
                    <thead>
                        <tr>
                            <th>Patient ID</th>
                            <th>Profile</th>
                            <th>Patient Name</th>
                            <th>Mobile No</th>
                            <th>Gender</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {formatedPatient}
                </table>
            </div>

        </>
    );
}

export default PatientList;