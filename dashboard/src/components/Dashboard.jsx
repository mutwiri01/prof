import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import '../styles/dashboard.css';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [registeredDoctors, setRegisteredDoctors] = useState(0);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "https://hospitalcloud.vercel.app/api/appointment/getall"
        );
        setAppointments(data.appointments);
        setTotalAppointments(data.appointments.length);
      } catch (error) {
        setAppointments([]);
        toast.error("Failed to fetch appointments");
      }
    };

    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "https://hospitalcloud.vercel.app/api/user/doctors"
        );
        setRegisteredDoctors(data.doctors.length);
      } catch (error) {
        toast.error("Failed to fetch doctors");
      }
    };

    fetchAppointments();
    fetchDoctors();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const response = await axios.put(
        `https://hospitalcloud.vercel.app/api/appointment/update/${appointmentId}`,
        { status }
      );
      if (response.data.success) {
        toast.success("Appointment status updated successfully");
        const updatedAppointments = appointments.map((appointment) =>
          appointment._id === appointmentId
            ? {
                ...appointment,
                status,
                visited: status === "visited",
              }
            : appointment
        );
        setAppointments(updatedAppointments);
      }
    } catch (error) {
      console.error("Failed to update appointment status", error);
      toast.error("Failed to update appointment status");
    }
  };

  const handleStatusChange = (e, appointmentId) => {
    const selectedStatus = e.target.value;
    handleUpdateStatus(appointmentId, selectedStatus);
  };

  return (
    <section className="dashboard page">
      <div className="banner">
        <div className="firstBox">
          <img src="/cardi.png" alt="docImg" />
          <div className="content">
            <div>
              <p>Hello,</p>
              <h5>Welcome!</h5>
            </div>
            <p>
              Welcome to your dashboard. Here you can manage appointments and view statistics.
            </p>
          </div>
        </div>
        <div className="secondBox">
          <p>Total Appointments</p>
          <h3>{totalAppointments}</h3>
        </div>
        <div className="thirdBox">
          <p>Registered Doctors</p>
          <h3>{registeredDoctors}</h3>
        </div>
      </div>
      <div className="appointmentsSection">
        <h5>Appointments</h5>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
              <th>Visited</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                  <td>{new Date(appointment.appointment_date).toLocaleString()}</td>
                  <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                  <td>{appointment.department}</td>
                  <td>
                    <select
                      value={appointment.visited ? "visited" : "pending"}
                      onChange={(e) => handleStatusChange(e, appointment._id)}
                    >
                      <option value="pending">Pending</option>
                      <option value="visited">Visited</option>
                    </select>
                  </td>
                  <td>{appointment.visited ? "Yes" : "No"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No Appointments Found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Dashboard;
