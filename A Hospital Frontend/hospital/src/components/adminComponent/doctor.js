import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../styles/adminDoctor.css';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function Admindoctor() {

    const params = useParams();
    const navigate = useNavigate();
    const Id = params.id;

    const [data, setData] = useState({});
    const [department, setDepartment] = useState([]);
    const [doctor, setDoctor] = useState({
        title: '',
        firstName: '',
        middleName: '',
        lastName: '',
        mobileNo: '',
        gender: '',
        profile: null,
        address: {
            state: '',
            district: '',
            street: '',
            houseno: '',
            pinCode: ''
        },
        userName: '',
        email: '',
        password: '',
        department: '',
        qualification: '',
        experience: '',
        appointmentFees: '',
        time: '',
        status: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("address.")) {
            const addressKey = name.split(".")[1];
            setDoctor(prevDoctor => ({
                ...prevDoctor,
                address: {
                    ...prevDoctor.address,
                    [addressKey]: value
                }
            }));
        } else if (name === 'profile') {
            setDoctor(prevDoctor => ({
                ...prevDoctor,
                profile: e.target.files[0]
            }));
        } else {
            setDoctor(prevDoctor => ({
                ...prevDoctor,
                [name]: value
            }));
        }
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in doctor) {
            if (key === 'address') {
                for (let addressKey in doctor.address) {
                    formData.append(`address.${addressKey}`, doctor.address[addressKey]);
                }
            } else {
                formData.append(key, doctor[key]);
            }
        }
        fetch('http://localhost:3030/doctor/doctor-register', {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setDoctor({});
                    navigate(`/admin/${Id}/doctor-list`);
                    Swal.fire("Doctor added successfully!");
                }
                else {
                    setDoctor({});
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Doctor is not added!",
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        console.log(doctor);
    };

    useEffect(() => {
        fetch('http://localhost:3030/admin/admin-id/' + Id, { method: "GET" })
            .then(res => res.json())
            .then(res => setData(res));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3030/department/department-list/', { method: "GET" })
            .then(res => res.json())
            .then(res => setDepartment(res));
    }, []);

    const formatedDepartment = department.map((dept) => {
        return (
            <option value={dept.departmentName}>{dept.departmentName}</option>
        );
    })

    return (
        <>
            <Link to={"/admin/" + Id + "/doctor-list"} style={{ color: 'inherit', textDecoration: 'none' }}>
                <button className="department-list-button">
                    <i className="uil uil-list-ul"></i>
                    doctor List
                </button>
            </Link>
            <form className='container'>
                <h2 className='mt-3'>Personal Detail :</h2>
                <div className='row mt-3'>
                <div class="form-group col-2">
                    <label for="title" class="label">Title:</label>
                    <select id="title" name="title" class="select" value={doctor.title} onChange={handleChange} required>
                        <option value="">Select Title:</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Miss.">Miss.</option>
                        <option value="Dr.">Dr.</option>
                    </select>
                </div>
                </div>
                <div className='row'>
                <div class="form-group col-4">
                    <label for="firstName" class="label">First Name:</label>
                    <input type="text" id="firstName" name="firstName" class="input-text" value={doctor.firstName} onChange={handleChange} required />
                </div>
                <div class="form-group col-4">
                    <label for="middleName" class="label">Middle Name:</label>
                    <input type="text" id="middleName" name="middleName" class="input-text" value={doctor.middleName} onChange={handleChange} required />
                </div>
                <div class="form-group col-4">
                    <label for="lastName" class="label">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" class="input-text" value={doctor.lastName} onChange={handleChange} required />
                </div>
                </div>
                <div className='row'>
                <div class="form-group col-4">
                    <label for="mobileNo" class="label">Mobile No:</label>
                    <input type="text" id="mobileNo" name="mobileNo" class="input-text" value={doctor.mobileNo} onChange={handleChange} required />
                </div>
                <div class="form-group col-4">
                    <label for="gender" class="label">Gender:</label>
                    <select id="gender" name="gender" class="select" value={doctor.gender} onChange={handleChange} required>
                        <option value="">Select Gender:</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="form-group col-4">
                    <label for="profile" class="label">Profile:</label>
                    <input type="file" id="profile" name="profile" class="input-file" onChange={handleChange} required />
                </div>
                </div>
                <h2 className='mt-3'>Address :</h2>
                <div className='row mt-3'>
                <div class="form-group col-4">
                    <label for="state">State</label>
                    <input type="text" id="state" name="address.state" class="form-control" required value={doctor.address.state} onChange={handleChange} />
                </div>
                <div class="form-group col-4">
                    <label for="district">District</label>
                    <input type="text" id="district" name="address.district" class="form-control" required value={doctor.address.district} onChange={handleChange} />
                </div>
                <div class="form-group col-4">
                    <label for="street">Street</label>
                    <input type="text" id="street" name="address.street" class="form-control" required value={doctor.address.street} onChange={handleChange} />
                </div>
                </div>
                <div className='row'>
                <div class="form-group col-4">
                    <label for="houseno">House No</label>
                    <input type="text" id="houseno" name="address.houseno" class="form-control" required value={doctor.address.houseno} onChange={handleChange} />
                </div>
                <div class="form-group col-4">
                    <label for="pinCode">Pin Code</label>
                    <input type="text" id="pinCode" name="address.pinCode" class="form-control" required value={doctor.address.pinCode} onChange={handleChange} />
                </div>
                </div>
                <h2 className='mt-3'>Account Details : </h2>
                <div className='row mt-3'>
                <div class="form-group col-4">
                    <label for="userName" class="label">Username:</label>
                    <input type="text" id="userName" name="userName" class="input-text" value={doctor.userName} onChange={handleChange} required />
                </div>
                <div class="form-group col-4">
                    <label for="email" class="label">Email:</label>
                    <input type="email" id="email" name="email" class="input-email" value={doctor.email} onChange={handleChange} required />
                </div>
                <div class="form-group col-4">
                    <label for="password" class="label">Password:</label>
                    <input type="password" id="password" name="password" class="input-password" value={doctor.password} onChange={handleChange} required />
                </div>
                </div>
                <h2 className='mt-3'>Professional Details :</h2>
                <div className='row mt-3'>
                <div class="form-group col-4">
                    <label for="department" class="label">Department:</label>
                    <select id="department" name="department" class="select" value={doctor.department} onChange={handleChange} required>
                        <option value="">Select Department:</option>
                        {formatedDepartment}
                    </select>
                </div>
                <div class="form-group col-4">
                    <label for="qualification" class="label">Qualification:</label>
                    <input type="text" id="qualification" name="qualification" class="input-text" value={doctor.qualification} onChange={handleChange} required />
                </div>
                <div class="form-group col-4">
                    <label for="experience" class="label">Experience:</label>
                    <input type="text" id="experience" name="experience" class="input-text" value={doctor.experience} onChange={handleChange} required />
                </div>
                </div>
                <div className='row'>
                <div class="form-group col-4">
                    <label for="appointmentFees" class="label">Appointment Fees:</label>
                    <input type="number" id="appointmentFees" name="appointmentFees" class="input-number" value={doctor.appointmentFees} onChange={handleChange} required />
                </div>
                <div class="form-group col-4">
                    <label for="time" class="label">Joining Date:</label>
                    <input type="datetime-local" id="time" name="time" class="input-text" value={doctor.time} onChange={handleChange} required />
                </div>
                <div class="form-group col-4">
                    <label for="status" class="label">Status:</label>
                    <select id="status" name="status" class="select" value={doctor.status} onChange={handleChange} required>
                        <option value="">Select Status:</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                </div>
                <button type="submit" class="button-submit" onClick={handleSubmit}>Add Doctor</button>
            </form>
        </>
    );
}

export default Admindoctor;