import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../styles/adminDepartment.css';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function AdmindepartmentEdit() {

    const [data , setData] = useState({});
    const [departmentData , setDepartmentData] = useState({});

    const params = useParams();
    const navigate = useNavigate();

    const Id = params.id;
    const deptID = params.deptId;

    useEffect(() => {
        fetch('http://localhost:3030/admin/admin-id/' + Id , {method : "GET"})
        .then(res => res.json())
        .then(res => setData(res));
    } , []);

    useEffect(() => {
        fetch('http://localhost:3030/department/department-list/' + deptID , {method : "GET"})
        .then(res => res.json())
        .then(res => setDepartmentData(res));
    },[]);

    return (
        <>
            <Link to={"/admin/"+Id+"/department-list"} style={{ color: 'inherit', textDecoration: 'none' }}>
                <button className="department-list-button">
                <i class="uil uil-previous"></i>
                    Back
                </button>
            </Link>
            <div class="container">
                <h1>Edit Department</h1>
                <form>
                    <div class="form-group">
                        <label for="departmentID">Department ID:</label>
                        <input type="text" id="departmentID" name="departmentID" value={departmentData.departmentID} className='input-type' required onChange={(e) => {
                            setDepartmentData({...departmentData , departmentID : e.target.value});
                        }} />
                    </div>
                    <div class="form-group">
                        <label for="departmentName">Department Name:</label>
                        <input type="text" id="departmentName" name="departmentName" value={departmentData.departmentName} className='input-type' required onChange={(e) => {
                            setDepartmentData({...departmentData , departmentName : e.target.value});
                        }} />
                    </div>
                    <div class="form-group">
                        <label for="description">Description:</label>
                        <textarea id="description" name="description" rows="4" className='input-type' value={departmentData.description} required onChange={(e) => {
                            setDepartmentData({...departmentData , description : e.target.value});
                        }}></textarea>
                    </div>
                    <div class="form-group">
                        <label for="status">Status:</label>
                        <select id="status" name="status" value={departmentData.status} className='input-type' required onChange={(e) => {
                            setDepartmentData({...departmentData , status : e.target.value});
                        }}>
                            <option value="">Select Status : </option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <button type="submit" className='button1' onClick={(e) => {
                        e.preventDefault();
                        fetch('http://localhost:3030/department/edit-department/'+ deptID , {
                        method : "PATCH",
                        body : JSON.stringify(departmentData),
                        headers : {"Content-Type":"application/json"}
                        })
                        .then(res => res.json())
                        .then(res => {
                            if(res.success) {
                                setDepartmentData({});
                                navigate(`/admin/${Id}/department-list`); 
                                Swal.fire("Department updated successfully!");
                            }
                            else {
                                setDepartmentData({});
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: "department is not added!",
                                  });
                            }
                        })
                    }}>Edit Department</button>
                </form>
            </div>
        </>
    );
}

export default AdmindepartmentEdit;