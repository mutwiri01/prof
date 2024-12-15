
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";

const Appointment = () => {
  return (
    <>
      <Hero
        title={"Schedule Your Appointment | Hospital Management System"}
        imageUrl={"/h1.png"}
      />
      <AppointmentForm/>
    </>
  );
};

export default Appointment;
