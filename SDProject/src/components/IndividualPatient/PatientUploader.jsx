import React from "react";
import Papa from "papaparse"; // library to parse CSV files
import { Upload, Button, message } from "antd"; // Ant Design components for file upload and buttons
import { UploadOutlined } from "@ant-design/icons";
// component to upload CSV file
const PatientUploader = ({ setPatients }) => {
  // function that handles the file upload
  const handleFileUpload = (info) => {
    const file = info.file.originFileObj || info.file; // Retrieve the uploaded file

    if (file) {
      // use Papa.parse to parse the CSV file
      Papa.parse(file, {
        header: true, // Use the first row as header
        skipEmptyLines: true, // Skip empty lines in the CSV
        complete: (results) => {
          if (results.data.length === 0) {
            message.error("Empty or invalid CSV!");
            return;
          }
          // Format patient data with default values if fields are missing
          const formattedPatients = results.data.map((patient) => ({
            id: patient.encounterId?.trim() || "N/A",
            referral: Number(patient.referral) === 1 ? "Need Referral" : "No Referral Need",
            end_tidal_co2: patient.end_tidal_co2 || "N/A",
            feed_vol: patient.feed_vol || "N/A",
            feed_vol_adm: patient.feed_vol_adm || "N/A",
            fio2: patient.fio2 || "N/A",
            fio2_ratio: patient.fio2_ratio || "N/A",
            insp_time: patient.insp_time || "N/A",
            oxygen_flow_rate: patient.oxygen_flow_rate || "N/A",
            peep: patient.peep || "N/A",
            pip: patient.pip || "N/A",
            resp_rate: patient.resp_rate || "N/A",
            sip: patient.sip || "N/A",
            tidal_vol: patient.tidal_vol || "N/A",
            tidal_vol_actual: patient.tidal_vol_actual || "N/A",
            tidal_vol_kg: patient.tidal_vol_kg || "N/A",
            tidal_vol_spon: patient.tidal_vol_spon || "N/A",
            bmi: patient.bmi || "N/A",
          }));

          setPatients(formattedPatients); // updates the state with formatted data
          message.success("CSV uploaded successfully!");
        },
      });
    } else {
      message.error("Unable to read the file.");
    }
  };

  return (
    <Upload accept=".csv" showUploadList={false} beforeUpload={() => false} onChange={handleFileUpload}>
      <Button icon={<UploadOutlined />} type="primary">
        Upload Patient CSV
      </Button>
    </Upload>
  );
};

export default PatientUploader;
