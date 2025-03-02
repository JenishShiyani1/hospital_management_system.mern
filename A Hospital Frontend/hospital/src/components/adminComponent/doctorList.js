import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../styles/doctorList.css';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function DoctorList() {

    const [data, setData] = useState({});
    const [doctorData, setDoctorData] = useState([]);

    const params = useParams();
    const navigate = useNavigate();

    const Id = params.id;

    useState(() => {
        fetch('http://localhost:3030/admin/admin-id/' + Id, { method: "GET" })
            .then(res => res.json())
            .then(res => setData(res));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3030/doctor/doctor-list', { method: "GET" })
            .then(res => res.json())    
            .then(res => setDoctorData(res));
    },[]);

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
                fetch('http://localhost:3030/doctor/delete-doctor/'+id, {
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
                                text: "Doctor has been deleted.",
                                icon: "success"
                            });
                            fetch('http://localhost:3030/doctor/doctor-list', { method: "GET" })
                                .then(res => res.json())
                                .then(res => setDoctorData(res))
                                .catch(error => console.error('Error fetching doctor list:', error));
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: "Failed to delete doctor.",
                                icon: "error"
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting doctor:', error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete doctor.",
                            icon: "error"
                        });
                    });
            }
        });
    }

    const formatedDoctor = doctorData.map((dr) => {
        return (
            <tbody>
                <tr>
                    <td>{dr.title} {dr.firstName} {dr.middleName}</td>
                    <td><img src={dr.profile} alt="Doctor Profile" /></td>
                    <td>{dr.department}</td>
                    <td>{dr.mobileNo}</td>
                    <td>{dr.status}</td>
                    <td>
                        <Link to={`/admin/${Id}/edit-doctor/${dr._id}`}><button className='btn btn-warning mr-3'>Edit</button></Link>
                        <button className='btn btn-danger' onClick={() => handleDelete(dr._id)}>Delete</button>
                    </td>
                </tr>
            </tbody>
        );
    })

    return (
        <>
            <Link to={"/admin/" + Id + "/doctor"} style={{ color: 'inherit', textDecoration: 'none' }}>
                <button className="department-list-button">
                    <i class="uil uil-plus"></i>
                    add Doctor
                </button>
            </Link>
            <div class="container">
                <h1 class="title">Doctor List</h1>
                <table class="doctor-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Profile</th>
                            <th>Department</th>
                            <th>Mobile No</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                        {formatedDoctor}
                </table>
            </div>

        </>
    );
}

export default DoctorList;