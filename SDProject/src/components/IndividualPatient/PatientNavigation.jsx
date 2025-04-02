import React, { useState } from "react";
import { Button, Input, message } from "antd";
import { LeftOutlined, RightOutlined, SearchOutlined } from "@ant-design/icons";
// for navigation between patients
const PatientNavigation = ({ patients, currentIndex, setCurrentIndex }) => {
  const [searchId, setSearchId] = useState("");
  // function to go to the next patient
  const nextPatient = () => {
    if (currentIndex < patients.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  // function to go to the previous patient
  const prevPatient = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  // function to search for a patient by ID
  const handleSearch = () => {
    const foundIndex = patients.findIndex((patient) => patient.id === searchId);
    if (foundIndex !== -1) {
      setCurrentIndex(foundIndex);
      message.success("Patient found!");
    } else {
      message.error("Patient ID not found.");
    }
  };

  return (
    <div className="mt-3">
      <div className="d-flex align-items-center mb-3">
        <Input
          placeholder="Enter Patient ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={{ width: "200px", marginRight: "10px" }}
        />
        <Button onClick={handleSearch} type="primary" icon={<SearchOutlined />}>
          Search
        </Button>
      </div>

      <div className="d-flex justify-content-between">
        <Button onClick={prevPatient} disabled={currentIndex === 0} icon={<LeftOutlined />}>
          Previous
        </Button>
        <span>
          Patient {currentIndex + 1} of {patients.length}
        </span>
        <Button onClick={nextPatient} disabled={currentIndex === patients.length - 1} icon={<RightOutlined />}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default PatientNavigation;
