import { useEffect, useState } from 'react';
import '../../styles/doctorProfile.css';
import { useParams } from 'react-router-dom';

function PatientProfile() {

    const [data, setData] = useState({});
    const params = useParams();

    const Id = params.id;

    useEffect(() => {
        fetch('http://localhost:3030/patient/patient-list/' + Id, { method: "GET" })
            .then(res => res.json())
            .then(res => setData(res));
    }, []);

    return (
        <><div class="doctor-card">
            <table>
                <tr>
                    <td class="doctor-image">
                        <img src={data.profile} alt="Doctor" />
                    </td>
                    <td class="doctor-details">
                        <h2>{data.title} {data.firstName} {data.middleName}</h2>
                        <table>
                            <tr>
                                <td><strong>Mobile No:</strong></td>
                                <td>{data.mobileNo}</td>
                            </tr>
                            <tr>
                                <td><strong>Gender:</strong></td>
                                <td>{data.gender}</td>
                            </tr>
                            <tr>
                                <td><strong>Occupation:</strong></td>
                                <td>{data.occupation}</td>
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
                                <td><strong>Email:</strong></td>
                                <td>{data.email}</td>
                            </tr>
                            <tr>
                                <td><strong>Username:</strong></td>
                                <td>{data.userName}</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        </>
    );
}

export default PatientProfile;