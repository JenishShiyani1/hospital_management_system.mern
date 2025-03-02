import { useParams } from 'react-router-dom';
import '../../styles/doctorProfile.css';
import { useEffect, useState } from 'react';

function DoctorProfile() {

  const [data, setData] = useState({});
  const params = useParams();

  const Id = params.id;

  useEffect(() => {
    fetch('http://localhost:3030/doctor/doctor-list/' + Id, { method: "GET" })
      .then(res => res.json())
      .then(res => setData(res));
  }, []);

  return (
    <><div class="doctor-card">
      <table>
        <tbody>
          <tr>
            <td className="doctor-image">
              <img src={data.profile} alt="Doctor" />
            </td>
            <td className="doctor-details">
              <h2>{data.title} {data.firstName} {data.middleName}</h2>
              <table>
                <tbody>
                  <tr>
                    <td><strong>Department:</strong></td>
                    <td>{data.department}</td>
                  </tr>
                  <tr>
                    <td><strong>Qualification:</strong></td>
                    <td>{data.qualification}</td>
                  </tr>
                  <tr>
                    <td><strong>Experience:</strong></td>
                    <td>{data.experience}</td>
                  </tr>
                  <tr>
                    <td><strong>Appointment Fees:</strong></td>
                    <td>{data.appointmentFees}</td>
                  </tr>
                  <tr>
                    <td><strong>Status:</strong></td>
                    <td>{data.status}</td>
                  </tr>
                  <tr>
                    <td><strong>Email:</strong></td>
                    <td>{data.email}</td>
                  </tr>
                  <tr>
                    <td><strong>Mobile No:</strong></td>
                    <td>{data.mobileNo}</td>
                  </tr>
                  <tr>
                    <td><strong>Gender:</strong></td>
                    <td>{data.gender}</td>
                  </tr>
                  <tr>
                    <td><strong>Address:</strong></td>
                    <td>
                      {data.address && (
                        <>
                          {data.address.houseno}, {data.address.street}, {data.address.district}, {data.address.state} - {data.address.pinCode}
                        </>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Username:</strong></td>
                    <td>{data.userName}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>


    </>
  );
}

export default DoctorProfile;