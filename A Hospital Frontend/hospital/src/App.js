import logo from './logo.svg';
import './App.css';
import Login from './Pages/login';
import { BrowserRouter , Routes , Route, Navigate } from 'react-router-dom';
import PatientRegister from './Pages/patientRegister';
import AdminDashboard from './Pages/adminDashboard';
import Admindashboard from './components/adminComponent/dashboard';
import Admindoctor from './components/adminComponent/doctor';
import Adminpatient from './components/adminComponent/patient';
import Adminappointment from './components/adminComponent/appointment';
import Admindepartment from './components/adminComponent/department';
import Departmentlist from './components/adminComponent/departmentList';
import DoctorList from './components/adminComponent/doctorList';
import PatientList from './components/adminComponent/patientList';
import DoctorDashboard from './Pages/doctorDashboard';
import Doctordashboard from './components/doctorComponent/doctorDashboard';
import Doctorpatient from './components/doctorComponent/doctorPatient';
import DoctorAppointment from './components/doctorComponent/doctorAppointment';
import DoctorProfile from './components/doctorComponent/doctorProfile';
import PatientDashboard from './Pages/patientDashboard';
import Patientdashboard from './components/patientComponent/patientdashboard';
import PatientAppointment from './components/patientComponent/patientAppointment';
import PatientProfile from './components/patientComponent/patientProfile';
import AddAppointment from './components/patientComponent/addAppointment';
import { useState } from 'react';
import Adminprofile from './components/adminComponent/profile';
import Addadmin from './components/adminComponent/addAdmin';
import AdmindepartmentEdit from './components/adminComponent/editDepartment';
import Editdoctor from './components/adminComponent/editDoctor';
import EditPatient from './components/adminComponent/editPatient';
import EditAppointment from './components/patientComponent/editAppointment';

function App() {

  let login = localStorage.getItem('login');

  console.log(login);

  // const [isLoggedIn , setIsLoggedIn] = useState(false);
  const [isLoggedIn , setIsLoggedIn] = useState(login);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("login" , true);
  }

  const ProtectedRoute = ({children}) => {
    return isLoggedIn ? children : <Navigate to="/" />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login onLogin={handleLogin}/>}></Route>
        <Route path='/register' element={<PatientRegister />}></Route>
        <Route path='/admin/:id' element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}>
          <Route index element={<Admindashboard />}></Route>
          <Route path='department' element={< Admindepartment/>}></Route>
          <Route path='department-list' element={< Departmentlist/>}></Route>
          <Route path='edit-department/:deptId' element={< AdmindepartmentEdit/>}></Route>
          <Route path='doctor' element={<Admindoctor />}></Route>
          <Route path='doctor-list' element={<DoctorList />}></Route>
          <Route path='edit-doctor/:drId' element={< Editdoctor/>}></Route>
          <Route path='patient' element={<Adminpatient />}></Route>
          <Route path='patient-list' element={<PatientList />}></Route>
          <Route path='edit-patient/:patientId' element={< EditPatient/>}></Route>
          <Route path='appointment' element={<Adminappointment />}></Route>
          <Route path='Profile' element={<Adminprofile />}></Route>
          <Route path='add' element={< Addadmin/>}></Route>
        </Route>
        <Route path='/doctor/:id' element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>}>
          <Route index element={<Doctordashboard />}></Route>
          <Route path='patient' element={<Doctorpatient />}></Route>
          <Route path='appointment' element={<DoctorAppointment />}></Route>
          <Route path='profile' element={<DoctorProfile />}></Route>
        </Route>
        <Route path='/patient/:id' element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>}>
          <Route index element={<Patientdashboard />}></Route>
          <Route path='appointment' element={<PatientAppointment />}></Route>
          <Route path='add-appointment' element={<AddAppointment />}></Route>
          <Route path='edit-appointment/:editId' element={<EditAppointment />}></Route>
          <Route path='profile' element={<PatientProfile />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
