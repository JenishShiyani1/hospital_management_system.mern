import { useState } from 'react';
import '../styles/PatientRegistration.css';
import { useNavigate } from 'react-router-dom';

function PatientRegister() {

    const navigate = useNavigate();

    const [patientData, setPatientData] = useState({
        title: '',
        firstName: '',
        middleName: '',
        lastName: '',
        mobileNo: '',
        gender: '',
        occupation: '',
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
        password: ''
      });
    
      const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (name.startsWith("address.")) {
            const addressKey = name.split(".")[1];
            setPatientData(prevState => ({
                ...prevState,
                address: {
                    ...prevState.address,
                    [addressKey]: value
                }
            }));
        } else if (name === 'profile') {
            setPatientData(prevState => ({
                ...prevState,
                profile: e.target.files[0]
            }));
        } else if (type === 'checkbox') {
            setPatientData(prevState => ({
                ...prevState,
                [name]: e.target.checked
            }));
        } else {
            setPatientData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

      const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in patientData) {
          if (key === 'address') {
            for (let addressKey in patientData.address) {
              formData.append(`address.${addressKey}`, patientData.address[addressKey]);
            }
          } else {
            formData.append(key, patientData[key]);
          }
        }
        fetch('http://localhost:3030/patient/patient-register',{
          method : "POST",
          body : formData
        })
        .then(res => res.json())
        .then(res => {
          if(res.success) {
            navigate(`/patient/${res.id}`);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      };

    return (
        <>
            <div class="main-container">
                <div class="container">
                    <div class="registration-form">
                        <h1 class="main-title">Patient Registration</h1>
                        <form enctype="multipart/form-data">
                            <div class="form-group">
                                <label for="title">Title</label>
                                <select id="title" name="title" class="form-control" value={patientData.title} onChange={handleChange} required>
                                    <option value="">Select title</option>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                    <option value="Ms.">Ms.</option>
                                    <option value="Miss.">Miss.</option>
                                    <option value="Dr.">Dr.</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="firstName">First Name</label>
                                <input type="text" id="firstName" name="firstName" class="form-control" required value={patientData.firstName} onChange={handleChange} />
                            </div>
                            <div class="form-group">
                                <label for="middleName">Middle Name</label>
                                <input type="text" id="middleName" name="middleName" class="form-control" required value={patientData.middleName} onChange={handleChange} />
                            </div>
                            <div class="form-group">
                                <label for="lastName">Last Name</label>
                                <input type="text" id="lastName" name="lastName" class="form-control" required value={patientData.lastName} onChange={handleChange} />
                            </div>
                            <div class="form-group">
                                <label for="mobileNo">Mobile Number</label>
                                <input type="tel" id="mobileNo" name="mobileNo" class="form-control" required value={patientData.mobileNo} onChange={handleChange} />
                            </div>
                            <div class="form-group">
                                <label for="gender">Gender</label>
                                <select id="gender" name="gender" class="form-control" required value={patientData.gender} onChange={handleChange}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="occupation">Occupation</label>
                                <input type="text" id="occupation" name="occupation" class="form-control" required value={patientData.occupation} onChange={handleChange} />
                            </div>
                            <div class="form-group">
                                <label for="profile">Profile Image</label>
                                <input type="file" id="profile" name="profile" class="form-control-file" onChange={handleChange} />
                            </div>
                            <div class="form-group">
                                <label for="state">State</label>
                                <input type="text" id="state" name="address.state" class="form-control" required value={patientData.address.state} onChange={handleChange} />
                            </div>
                            <div class="form-group">
                                <label for="district">District</label>
                                <input type="text" id="district" name="address.district" class="form-control" required value={patientData.address.district} onChange={handleChange} />
                            </div>
                            <div class="form-group">
                                <label for="street">Street</label>
                                <input type="text" id="street" name="address.street" class="form-control" required value={patientData.address.street} onChange={handleChange} />
                            </div>
                            <div class="form-group">
                                <label for="houseno">House No</label>
                                <input type="text" id="houseno" name="address.houseno" class="form-control" required value={patientData.address.houseno} onChange={handleChange} />
                            </div>
                            <div class="form-group">
                                <label for="pinCode">Pin Code</label>
                                <input type="text" id="pinCode" name="address.pinCode" class="form-control" required value={patientData.address.pinCode} onChange={handleChange} />
                            </div>
                            <div class="form-group">
                                <label for="userName">Username</label>
                                <input type="text" id="userName" name="userName" class="form-control" required value={patientData.userName} onChange={handleChange} />
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" name="email" class="form-control" required value={patientData.email} onChange={handleChange} />
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" id="password" name="password" class="form-control" required value={patientData.password} onChange={handleChange} />
                            </div>
                            <div class="form-group">
                                <button type="submit" class="m-3 btn btn-primary" onClick={handleSubmit}>Register</button>
                                <button type="reset" class="btn btn-primary" onClick={() => {
                                    setPatientData({});
                                }}>Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PatientRegister;
