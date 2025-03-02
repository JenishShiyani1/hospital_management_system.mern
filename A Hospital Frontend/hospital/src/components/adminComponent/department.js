import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../styles/adminDepartment.css';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function Admindepartment() {

    const [data , setData] = useState({});
    const [departmentData , setDepartmentData] = useState({});

    const params = useParams();
    const navigate = useNavigate();

    const Id = params.id;

    useEffect(() => {
        fetch('http://localhost:3030/admin/admin-id/' + Id , {method : "GET"})
        .then(res => res.json())
        .then(res => setData(res));
    } , []);

    return (
        <>
            <Link to={"/admin/"+Id+"/department-list"} style={{ color: 'inherit', textDecoration: 'none' }}>
                <button className="department-list-button">
                    <i className="uil uil-list-ul"></i>
                    Department List
                </button>
            </Link>
            <div class="container">
                <h1>Add Department</h1>
                <form>
                    <div class="form-group">
                        <label for="departmentID">Department ID:</label>
                        <input type="text" id="departmentID" name="departmentID" className='input-type' required onChange={(e) => {
                            setDepartmentData({...departmentData , departmentID : e.target.value});
                        }} />
                    </div>
                    <div class="form-group">
                        <label for="departmentName">Department Name:</label>
                        <input type="text" id="departmentName" name="departmentName" className='input-type' required onChange={(e) => {
                            setDepartmentData({...departmentData , departmentName : e.target.value});
                        }} />
                    </div>
                    <div class="form-group">
                        <label for="description">Description:</label>
                        <textarea id="description" name="description" rows="4" className='input-type' required onChange={(e) => {
                            setDepartmentData({...departmentData , description : e.target.value});
                        }}></textarea>
                    </div>
                    <div class="form-group">
                        <label for="status">Status:</label>
                        <select id="status" name="status" className='input-type' required onChange={(e) => {
                            setDepartmentData({...departmentData , status : e.target.value});
                        }}>
                            <option value="">Select Status : </option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <button type="submit" className='button1' onClick={(e) => {
                        e.preventDefault();
                        fetch('http://localhost:3030/department/add-department' , {
                        method : "POST",
                        body : JSON.stringify(departmentData),
                        headers : {"Content-Type":"application/json"}
                        })
                        .then(res => res.json())
                        .then(res => {
                            if(res.success) {
                                setDepartmentData({});
                                navigate(`/admin/${Id}/department-list`); 
                                Swal.fire("Department added successfully!");
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
                    }}>Add Department</button>
                </form>
            </div>
        </>
    );
}

export default Admindepartment;