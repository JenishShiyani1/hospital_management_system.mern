import { useEffect, useState } from 'react';
import '../../styles/admindashboard.css';
import { useParams } from 'react-router-dom';

function Patientdashboard() {

    const [data, setData] = useState({});
    const [count , setCount] = useState(0);
    const params = useParams();
    const Id = params.id;

    useEffect(() => {
        fetch('http://localhost:3030/patient/patient-list/' + Id, { method: "GET" })
            .then(res => res.json())
            .then(res => setData(res))
    }, [Id]);

    useEffect(() => {
        fetch('http://localhost:3030/appointment/cnt-appointment', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: data.email })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setCount(res);
            })
    }, [data]);

    return (
        <>
            <div class="cards">
                <div class="single-card">
                    <div>
                        <span>Total Appointment</span>
                        <h1 className='set-count'>{count.count}</h1>
                    </div>
                    <i class="uil uil-sitemap"></i>
                </div>
            </div>
        </>
    );
}

export default Patientdashboard;