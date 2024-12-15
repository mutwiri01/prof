import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../styles/doctors.css";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "https://hospitalcloud.vercel.app/api/user/doctors",
          { withCredentials: false }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred!");
      }
    };
    fetchDoctors();
  }, []);

  return (
    <section className="page doctors">
      <div className="content-wrapper">
        <h1 >Our Doctors</h1>
        <div className="banner">
          {doctors && doctors.length > 0 ? (
            doctors.map((doctor) => (
              <div className="card" key={doctor._id}>
                <img
                  src={doctor.docAvatar?.url || "/default-avatar.png"}
                  alt="doctor avatar"
                  className="doctor-avatar"
                />
                <h4>{`${doctor.firstName} ${doctor.lastName}`}</h4>
                <div className="details">
                  <p>
                    Email: <span>{doctor.email}</span>
                  </p>
                  <p>
                    Phone: <span>{doctor.phone}</span>
                  </p>
                  <p>
                    DOB: <span>{doctor.dob?.substring(0, 10)}</span>
                  </p>
                  <p>
                    Department: <span>{doctor.doctorDepartment}</span>
                  </p>
                  <p>
                    NIC: <span>{doctor.nic}</span>
                  </p>
                  <p>
                    Gender: <span>{doctor.gender}</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h2 className="no-doctors">No Registered Doctors Found!</h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
