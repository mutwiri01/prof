import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
          we empower hospitals and clinics with state-of-the-art management solutions. Our comprehensive 
          Hospital Management System is designed to streamline operations, improve patient care, and enhance
           overall efficiency. Discover how our technology can support your healthcare facility in delivering 
           exceptional services.
          </p>
          <p>Key Features</p>
          <p>
          Patient Management: Simplify the patient journey from registration to discharge with seamless record-keeping and scheduling.
Electronic Health Records (EHR): Secure and easily accessible digital records for informed decision-making.
Billing & Finance: Efficient billing, invoicing, and financial tracking for accurate and transparent financial management.
Inventory Management: Maintain optimal stock levels and reduce wastage with our integrated supply chain tools.
Reporting & Analytics: Gain insights into performance metrics and trends to make data-driven decisions.
Security & Compliance: Robust security measures ensure the protection of patient data and compliance with healthcare regulations.
          </p>
        </div>
      </div>
    </>
  );
};

export default Biography;
