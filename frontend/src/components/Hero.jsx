import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
            In today fast-paced healthcare environment, efficient management is crucial for delivering 
            quality patient care. Our Hospital Management System (HMS) provides a comprehensive solution 
            designed to streamline operations, improve patient outcomes, and enhance the overall healthcare 
            experience
          </p>
        </div>
        <div className="banner">
          <img src={"/hero1.png"} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
