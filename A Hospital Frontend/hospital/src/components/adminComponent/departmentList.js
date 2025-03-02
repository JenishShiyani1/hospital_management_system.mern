import { Link, useParams } from 'react-router-dom';
import '../../styles/departmentlist.css';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function Departmentlist() {

    const [data, setData] = useState({});
    const [department, setDepartment] = useState([]);

    const params = useParams();

    const Id = params.id;

    useEffect(() => {
        fetch('http://localhost:3030/admin/admin-id/' + Id, { method: "GET" })
            .then(res => res.json())
            .then(res => setData(res));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3030/department/department-list', { method: "GET" })
            .then(res => res.json())
            .then(res => setDepartment(res));
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
                fetch('http://localhost:3030/department/delete-department', {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id: id })
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.success) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            fetch('http://localhost:3030/department/department-list', { method: "GET" })
                                .then(res => res.json())
                                .then(res => setDepartment(res))
                                .catch(error => console.error('Error fetching department list:', error));
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: "Failed to delete department.",
                                icon: "error"
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting department:', error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete department.",
                            icon: "error"
                        });
                    });
            }
        });
    }


    const formatedData = department.map((dept) => {
        return (
            <tbody>
                <tr>
                    <td>{dept.departmentID}</td>
                    <td>{dept.departmentName}</td>
                    <td>{dept.status}</td>
                    <td>
                        <Link to={`/admin/${Id}/edit-department/${dept._id}`}><button className='btn btn-warning mr-3'>Edit</button></Link>
                        <button className='btn btn-danger' onClick={() => handleDelete(dept._id)}>Delete</button>
                    </td>
                </tr>
            </tbody>
        );
    })

    return (
        <>
            <Link to={"/admin/" + Id + "/department"} style={{ color: 'inherit', textDecoration: 'none' }}>
                <button className="department-list-button">
                    <i class="uil uil-plus"></i>
                    add Department
                </button>
            </Link>
            <div class="container">
                <h1 className="title">Department List</h1>
                <div class="table-container">
                    <table class="styled-table">
                        <thead>
                            <tr>
                                <th>Department ID</th>
                                <th>Department Name</th>
                                <th>Status</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        {formatedData}
                    </table>
                </div>
            </div>
        </>
    );
}

export default Departmentlist;