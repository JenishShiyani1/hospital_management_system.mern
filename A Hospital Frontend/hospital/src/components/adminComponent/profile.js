import { useParams } from 'react-router-dom';
import '../../styles/doctorProfile.css';
import { useEffect, useState } from 'react';

function Adminprofile() {

  const [data , setData] = useState({});
  const params = useParams();

  const Id = params.id;

  useEffect(() => {
    fetch('http://localhost:3030/admin/admin-id/' + Id, { method: "GET" })
      .then(res => res.json())
      .then(res => setData(res));
  }, []);

  return (
    <>
    <div class="doctor-card">
      <table>
        <tr>
          <td class="doctor-image">
            <img src={data.profile} alt="Doctor" />
          </td>
          <td class="doctor-details">
            <h2>{data.name}</h2>
            <table>
              <tr>
                <td><strong>Mobile No:</strong></td>
                <td>{data.mobileNo}</td>
              </tr>
              <tr>
                <td><strong>status:</strong></td>
                <td>{data.status}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>{data.email}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>


    </>
  );
}

export default Adminprofile;