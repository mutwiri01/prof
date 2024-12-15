import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Groq from "groq-sdk";
import "../styles/Admit.css"; // Assuming you have the updated CSS file in the 'styles' folder
import config from "../../config";

// Initialize Groq
const groq = new Groq({
  apiKey: config.GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const Admit = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    sickness: "",
    symptoms: "",
    diagnosis: "",
  });

  const [loadingAI, setLoadingAI] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch AI-generated diagnosis
  const fetchDiagnosis = async () => {
    const { sickness } = formData;

    if (!sickness.trim()) {
      toast.error("Please enter the sickness for AI diagnosis.");
      return;
    }

    setLoadingAI(true);

    try {
      const response = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `The patient has the following sickness: ${sickness}. Provide a possible diagnosis.`,
          },
        ],
        model: "llama3-8b-8192",
      });

      const diagnosis =
        response.choices[0]?.message?.content || "No diagnosis found.";
      setFormData((prev) => ({ ...prev, diagnosis }));
      toast.success("AI diagnosis retrieved successfully!");
    } catch (error) {
      console.error("Failed to fetch diagnosis:", error);
      toast.error("Failed to retrieve AI diagnosis.");
    } finally {
      setLoadingAI(false);
    }
  };

  // Submit form to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { firstName, lastName, email, phone, nic, dob, gender, sickness } = formData;
  
    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !sickness) {
      toast.error("Please fill out all required fields.");
      return;
    }
  
    try {
      console.log("Submitting form data:", formData);
  
      const response = await axios.post(
        "https://hospitalcloud.vercel.app/api/user/patient/admit",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Server response:", response.data);
  
      if (response.data.success) {
        toast.success("Patient admitted successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          nic: "",
          dob: "",
          gender: "",
          sickness: "",
          symptoms: "",
          diagnosis: "",
        });
      } else {
        toast.error("Failed to admit patient.");
      }
    } catch (error) {
      console.error("Error admitting patient:", error.response?.data || error.message);
      toast.error("Failed to admit patient. Please check the form data and try again.");
    }
  };
  

  return (
    <div className="admit-page">
      <div className="admit-container">
        <h2>Admit New Patient</h2>
        <form className="admit-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number 10 digits"
            />
          </div>

          <div className="form-group">
            <label htmlFor="nic">ID Number</label>
            <input
              type="text"
              name="nic"
              id="nic"
              value={formData.nic}
              onChange={handleChange}
              placeholder="ID Number 8 digits"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              name="dob"
              id="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="sickness">Describe Sickness</label>
            <textarea
              name="sickness"
              id="sickness"
              value={formData.sickness}
              onChange={handleChange}
              placeholder="Describe Sickness"
            />
          </div>

          <div className="form-group">
            <label htmlFor="symptoms">Enter Symptoms</label>
            <textarea
              name="symptoms"
              id="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              placeholder="Enter Symptoms"
            />
          </div>

          <button
            type="button"
            className="ai-diagnosis-button"
            onClick={fetchDiagnosis}
            disabled={loadingAI}
          >
            {loadingAI ? "Fetching Diagnosis..." : "Fetch AI Diagnosis"}
          </button>

          <div className="form-group">
            <label htmlFor="diagnosis">AI Diagnosis</label>
            <textarea
              name="diagnosis"
              id="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              placeholder="AI Diagnosis"
              disabled
            />
          </div>

          <button type="submit" className="admit-button">
            Admit Patient
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admit;
