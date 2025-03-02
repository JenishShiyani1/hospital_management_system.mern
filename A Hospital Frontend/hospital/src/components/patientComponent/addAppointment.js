import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../styles/PatientRegistration.css';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function AddAppointment() {

    const [department, setDepartment] = useState([]);
    const [selectedDept, setSelectedDept] = useState({});
    const [drList, setDrList] = useState([]);
    const [selectedDr, setSelectedDr] = useState({});

    const params = useParams();
    const navigate = useNavigate();
    const Id = params.id;

    const [patient , setPatient] = useState({
        title: '',
        firstName: '',
        middleName: '',
        lastName: '',
        mobileNo: '', 
        dob : '',  
        gender: '',
        bloodGroup : '',
        occupation : '',
        maritalStatus: '',
        height: '',
        weight: '',
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
        doctor: '',
        datetime: ''
    });

    const handleDept = (e) => {
        const selectedDepartment = e.target.value;
        setSelectedDept(selectedDepartment);
        setSelectedDr('');
        setPatient(prevAppData => ({
            ...prevAppData,
            department: selectedDepartment,
            doctor: ''
        }));
    }

    const handleDr = (e) => {
        const selectedDoctorName = e.target.value;
        setSelectedDr(selectedDoctorName); 
        setPatient(prevAppData => ({
            ...prevAppData,
            doctor: selectedDoctorName 
        }));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("address.")) {
            const addressKey = name.split(".")[1];
            setPatient(prevAppData => ({
                ...prevAppData,
                address: {
                    ...prevAppData.address,
                    [addressKey]: value
                }
            }));
        } else if (name === 'profile') {
            setPatient(prevAppData => ({
                ...prevAppData,
                profile: e.target.files[0]
            }));
        } else {
            setPatient(prevAppData => ({
                ...prevAppData,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in patient) {
            if (key === 'address') {
                for (let addressKey in patient.address) {
                    formData.append(`address.${addressKey}`, patient.address[addressKey]);
                }
            } else {
                formData.append(key, patient[key]);
            }
        }
        fetch('http://localhost:3030/appointment/add-appointment', {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setPatient({});
                    navigate(`/patient/${Id}/appointment`);
                    Swal.fire("Appointment added successfully!");
                }
                else {
                    setPatient({});
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Appointment is not added!",
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        console.log(patient);
    };

    useEffect(() => {
        fetch('http://localhost:3030/department/department-list/', { method: "GET" })
            .then(res => res.json())
            .then(res => setDepartment(res));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3030/department/department-doctor/' + selectedDept, { method: "GET" })
            .then(res => res.json())
            .then(res => setDrList(res));
    }, [selectedDept]);

    const formatedDepartment = department.map((dept) => {
        return (
            <option value={dept.departmentName}>{dept.departmentName}</option>
        );
    })

    const formatedDoctor = drList.map((dr) => {
        return (
            <option value={dr.firstName}>{dr.firstName}</option>
        );
    })

    return (
        <>
            <Link to={"/patient/" + Id + "/appointment"} style={{ color: 'inherit', textDecoration: 'none' }}>
                <button className="department-list-button">
                    <i className="uil uil-list-ul"></i>
                    Appointment list
                </button>
            </Link>
            <div class="container">
                    <form>
                        <h2 className='mt-3'>Personal Details :</h2>
                        <div className='row'>
                        <div class="form-group col-2">
                            <label for="title">title</label>
                            <select id="title" name="title" class="form-control" value={patient.title} onChange={handleChange} required>
                                <option value="">Select title</option>
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
                            <label for="firstName">First Name</label>
                            <input type="text" id="firstName" name="firstName" class="form-control" value={patient.firstName} onChange={handleChange} required />
                        </div>
                        <div class="form-group col-4">
                            <label for="middleName">Middle Name</label>
                            <input type="text" id="middleName" name="middleName" class="form-control" value={patient.middleName} onChange={handleChange} required />
                        </div>
                        <div class="form-group col-4">
                            <label for="lastName">Last Name</label>
                            <input type="text" id="lastName" name="lastName" class="form-control" value={patient.lastName} onChange={handleChange} required />
                        </div>
                        </div>
                        <div className='row'>
                        <div class="form-group col-4">
                            <label for="mobileNo">Mobile Number</label>
                            <input type="tel" id="mobileNo" name="mobileNo" class="form-control" value={patient.mobileNo} onChange={handleChange} required />
                        </div>
                        <div class="form-group col-4">
                            <label for="mobileNo">DOB</label>
                            <input type="date" id="dob" name="dob" class="form-control" value={patient.dob} onChange={handleChange} required />
                        </div>
                        <div class="form-group col-4">
                            <label for="gender">Gender</label>
                            <select id="gender" name="gender" class="form-control" value={patient.gender} onChange={handleChange} required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        </div>
                        <div className='row'>
                        <div class="form-group col-4">
                            <label for="bloodGroup">Blood Group</label>
                            <select id="bloodGroup" name="bloodGroup" class="form-control" value={patient.bloodGroup} onChange={handleChange} required>
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="Unknown">Unknown</option>
                            </select>
                        </div>
                        <div class="form-group col-4">
                            <label for="occupation">Occupation</label>
                            <input type="text" id="occupation" name="occupation" class="form-control" value={patient.occupation} onChange={handleChange} required />
                        </div>
                        <div class="form-group col-4">
                            <label for="maritalStatus">Marital Status</label>
                            <select id="maritalStatus" name="maritalStatus" class="form-control" value={patient.maritalStatus} onChange={handleChange} required>
                                <option value="">Select Marital Status</option>
                                <option value="Married">Married</option>
                                <option value="Unmarried">Unmarried</option>
                            </select>
                        </div>
                        </div>
                        <div className='row'>
                        <div class="form-group col-4">
                            <label for="height">Height</label>
                            <input type="text" id="height" name="height" class="form-control" value={patient.height} onChange={handleChange} required />
                        </div>
                        <div class="form-group col-4">
                            <label for="weight">Weight</label>
                            <input type="text" id="weight" name="weight" class="form-control" value={patient.weight} onChange={handleChange} required />
                        </div>
                        <div class="form-group col-4">
                            <label for="profile">Profile Image</label>
                            <input type="file" id="profile" name="profile" class="form-control-file" onChange={handleChange} required />
                        </div>
                        </div>
                        <h2 className='mt-3'>Address :</h2>
                        <div className='row mt-3'>
                        <div class="form-group col-4">
                            <label for="state">State</label>
                            <input type="text" id="state" name="address.state" class="form-control" value={patient.address.state} onChange={handleChange} required />
                        </div>
                        <div class="form-group col-4">
                            <label for="district">District</label>
                            <input type="text" id="district" name="address.district" class="form-control" value={patient.address.district} onChange={handleChange} required />
                        </div>
                        <div class="form-group col-4">
                            <label for="street">Street</label>
                            <input type="text" id="street" name="address.street" class="form-control" value={patient.address.street} onChange={handleChange} required />
                        </div>
                        </div>
                        <div className='row'>
                        <div class="form-group col-4">
                            <label for="houseno">House No</label>
                            <input type="text" id="houseno" name="address.houseno" class="form-control" value={patient.address.houseno} onChange={handleChange} required />
                        </div>
                        <div class="form-group col-4">
                            <label for="pinCode">Pin Code</label>
                            <input type="text" id="pinCode" name="address.pinCode" class="form-control" value={patient.address.pinCode} onChange={handleChange} required />
                        </div>
                        </div>
                        <h2 className='mt-3'>Account Details :</h2>
                        <div className='row mt-3'>
                        <div class="form-group col-4">
                            <label for="userName">Username</label>
                            <input type="text" id="userName" name="userName" class="form-control" value={patient.userName} onChange={handleChange} required />
                        </div>
                        <div class="form-group col-4">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" class="form-control" value={patient.email} onChange={handleChange} required />
                        </div>
                        <div class="form-group col-4">
                            <label for="password">Password</label>
                            <input type="password" id="password" name="password" class="form-control" value={patient.password} onChange={handleChange} required />
                        </div>
                        </div>
                        <h2 className='mt-3'>Additional Details :</h2>
                        <div className='row mt-3'>
                        <div class="form-group col-4">
                            <label for="Department">Department</label>
                            <select id="Department" name="Department" class="form-control" value={selectedDept} onChange={handleDept} required>
                                <option value="">Select Department:</option>
                                {formatedDepartment}
                            </select>
                        </div>
                        <div class="form-group col-4">
                            <label for="Doctor">Doctor</label>
                            <select id="Doctor" name="Doctor" class="form-control" value={selectedDr} onChange={handleDr} required>
                                <option value="">Select Doctor</option>
                                {formatedDoctor}
                            </select>
                        </div>
                        <div class="form-group col-4">
                            <label for="mobileNo">Date</label>
                            <input type="date" id="datetime" name="datetime" class="form-control" value={patient.datetime} onChange={handleChange} required />
                        </div>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="m-3 btn btn-primary" onClick={handleSubmit}>Register</button>
                            <button type="reset" class="btn btn-primary" onClick={() => {
                                setPatient({});
                            }}>Reset</button>
                        </div>
                    </form>
                </div>
        </>
    );
}

export default AddAppointment;


