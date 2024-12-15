import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal"; // Import Modal for showing patient details
import { FaUser,} from "react-icons/fa"; // Import icons
import '../styles/admittedpatients.css'

const AdmittedPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/user/patients/admitted`);
        setPatients(data.patients);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleCardClick = (patient) => {
    setSelectedPatient(patient);
  };

  const closeModal = () => {
    setSelectedPatient(null);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="admitted-patients">
      <h1>Admitted Patients</h1>
      <div className="card-container">
        {patients.map((patient) => (
          <div
            key={patient._id}
            className="patient-card"
            onClick={() => handleCardClick(patient)}
          >
            <h3>{`${patient.firstName} ${patient.lastName}`}</h3>
            <FaUser className="card-icon" />
          </div>
        ))}
      </div>

      {selectedPatient && (
        <Modal isOpen={true} onRequestClose={closeModal} contentLabel="Patient Details" className="modal">
          <h2>{`${selectedPatient.firstName} ${selectedPatient.lastName}`}</h2>
          <p><strong>Email:</strong> {selectedPatient.email}</p>
          <p><strong>Phone:</strong> {selectedPatient.phone}</p>
          <p><strong>Sickness:</strong> {selectedPatient.sickness}</p>
          <p><strong>AI Diagnosis:</strong> {selectedPatient.aiDiagnosis || "N/A"}</p>
          <p><strong>Address:</strong> {selectedPatient.address || "N/A"}</p>
          <p><strong>Emergency Contact:</strong> {selectedPatient.emergencyContact || "N/A"}</p>
          <button onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default AdmittedPatients;
