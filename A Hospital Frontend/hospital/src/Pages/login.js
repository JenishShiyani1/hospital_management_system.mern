import { Link , useNavigate } from 'react-router-dom';
import '../styles/loginPage.css';
import { useState } from 'react';

function Login({ onLogin }) {

  const [data, setData] = useState({});
  const navigate = useNavigate();

  return (
    <div class="login-container">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title">Hospital Management System</h1>
            <h2 class="card-title">Login</h2>
            <form>
              <div class="form-group">
                <label for="email">Email :</label>
                <input type="email" value={data.email} class="form-control" id="email" name="email" required onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }} />
              </div>
              <div class="form-group">
                <label for="password">Password :</label>
                <input type="password" value={data.password} class="form-control" id="password" name="password" required onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }} />
              </div>
              <div>
                <p id='myP' style={{ color: 'red', textAlign: 'center' }}></p>
              </div>
              <button type="button" onClick={() => {
                if (data.email == null && data.password == null) {
                  const temp = document.getElementById('myP');
                  temp.innerHTML = 'Enter email and password';
                }
                else {
                  try {
                    fetch('http://localhost:3030/admin/admin-login', {
                      method: "POST",
                      body: JSON.stringify(data),
                      headers: {
                        "Content-Type": "application/json"
                      }
                    })
                      .then((res) => res.json())
                      .then((res) => {
                        if (res.success) {    
                          onLogin();
                          const ID = res.id;
                          navigate('/admin/'+ID);
                        }
                        else {
                          const temp = document.getElementById('myP');
                          temp.innerHTML = 'Enter valid email and password';
                          setData({ email: '', password: '' });
                        }
                      })
                  } catch (error) {
                    console.log(error);
                  }
                }
              }}
                class="btn btn-info btn-custom btn-admin mt-2">Admin Login</button>

              <button type="button" onClick={() => {
                if (data.email == null && data.password == null) {
                  const temp = document.getElementById('myP');
                  temp.innerHTML = 'Enter email and password';
                }
                else {
                  try {
                    fetch('http://localhost:3030/doctor/doctor-login', {
                      method: "POST",
                      body: JSON.stringify(data),
                      headers: {
                        "Content-Type": "application/json"
                      }
                    })
                      .then((res) => res.json())
                      .then((res) => {
                        if (res.success) {
                          onLogin();
                          const ID = res.id;
                          navigate('/doctor/'+ID);
                        }
                        else {
                          const temp = document.getElementById('myP');
                          temp.innerHTML = 'Enter valid email and password';
                          setData({ email: '', password: '' });
                        }
                      })
                  } catch (error) {
                    console.log(error);
                  }
                }
              }} class="btn btn-success btn-custom btn-doctor mt-2">Doctor Login</button>
              <button type="button" onClick={() => {
                if (data.email == null && data.password == null) {
                  const temp = document.getElementById('myP');
                  temp.innerHTML = 'Enter email and password';
                }
                else {
                  try {
                    fetch('http://localhost:3030/patient/patient-login', {
                      method: "POST",
                      body: JSON.stringify(data),
                      headers: {
                        "Content-Type": "application/json"
                      }
                    })
                      .then((res) => res.json())
                      .then((res) => {
                        if (res.success) {
                          onLogin();
                          const ID = res.id;
                          navigate('/patient/'+ID);
                        }
                        else {
                          const temp = document.getElementById('myP');
                          temp.innerHTML = 'Enter valid email and password';
                          setData({ email: '', password: '' });
                        }
                      })
                  } catch (error) {
                    console.log(error);
                  }
                }
              }} class="btn btn-warning btn-custom btn-patient mt-2">Patient Login</button>
            </form>
            <div class="register-link">
              <p>Don't have an account? <Link to={'/register'}><h6 href="#" class="text-dark">Register only for patient</h6></Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;