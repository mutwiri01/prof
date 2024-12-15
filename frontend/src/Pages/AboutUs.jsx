import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
const AboutUs = () => {
  return (
    <>
      <Hero
        title={"Learn More About Us | Hospital Management System"}
        imageUrl={"/aboutus.jpg"}
      />
      <Biography imageUrl={"/aboutus.jpg"} />
    </>
  );
};

export default AboutUs;
