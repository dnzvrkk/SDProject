import React, { useState } from "react";
import PatientUploader from "./PatientUploader";
import PatientNavigation from "./PatientNavigation";
import PatientForm from "./PatientForm";
import PatientMedicalData from "./PatientMedicalData";
 ;

const PatientManager = () => {
  //state to sore the patients data
  const [patients, setPatients] = useState([]);
  // state to store the current index of the patient being viewed
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
    <div className="container mt-4">
      {/* component to upload file */}
      <PatientUploader setPatients={setPatients} />

      {patients.length > 0 && (
        <>
          {/* component to navigate between patients */}
          <PatientNavigation patients={patients} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
          {/* component for displaying patient data */}
          <PatientForm {...patients[currentIndex]} />
          {/* component for displaying medical data */}
          <PatientMedicalData {...patients[currentIndex]} />
        </>
      )}

      {patients.length === 0 && <p className="mt-3">No patient data available. Please upload a CSV file.</p>}
    </div>
    <footer style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  height: '50px',
  paddingTop: '10px',
  backgroundColor: '#797979',
  textAlign: 'center'
}}>
  <p>&copy; 2025 hospital. All rights reserved.</p>
</footer>
    </>
  );
};

export default PatientManager;
