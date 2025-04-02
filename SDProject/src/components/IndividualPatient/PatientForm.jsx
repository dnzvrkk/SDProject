import React from 'react';
import { FaUser, FaVenus, FaMars, FaCalendarAlt, FaTint } from 'react-icons/fa';

const PatientForm = ({ id, name, gender, age, bloodType, bmi, referral }) => {
 
  const GenderIcon = gender === 'Male' ? FaMars : FaVenus;

  return (
    <div className="d-flex flex-wrap justify-content-between bg-white p-3 rounded shadow-sm">
      {/* Patient ID */}
      <div className="text-center">
        <FaUser size={30} className="text-primary" />
        <h6 className="mt-2">{id || "N/A"}</h6>
        <p className="text-muted small">Patient ID</p>
      </div>

      {/* Patient Name */}
      <div className="text-center">
        <FaUser size={30} className="text-primary" />
        <h6 className="mt-2">{name || "N/A"}</h6>
        <p className="text-muted small">Patient Name</p>
      </div>

      {/* Gender */}
      <div className="text-center">
        <GenderIcon size={30} className="text-primary" />
        <h6 className="mt-2">{gender || "N/A"}</h6>
        <p className="text-muted small">Gender</p>
      </div>

      {/* Age */}
      <div className="text-center">
        <FaCalendarAlt size={30} className="text-primary" />
        <h6 className="mt-2">{age || "N/A"}</h6>
        <p className="text-muted small">Age</p>
      </div>

      {/* Blood Type */}
      <div className="text-center">
        <FaTint size={30} className="text-primary" />
        <h6 className="mt-2">{bloodType || "N/A"}</h6>
        <p className="text-muted small">Blood Type</p>
      </div>

      {/* Referral  */}
      <div className="text-center">
        <FaUser size={30} className="text-primary" />
        <h6 className="mt-2">{referral}</h6> 
        <p className="text-muted small">Referral</p>
      </div>
    </div>
  );
};

export default PatientForm;