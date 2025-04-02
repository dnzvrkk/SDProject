import React from "react";
import { Card } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";

function PatientMedicalData({
  end_tidal_co2 = "N/A",
  feed_vol = "N/A",
  feed_vol_adm = "N/A",
  fio2 = "N/A",
  fio2_ratio = "N/A",
  insp_time = "N/A",
  oxygen_flow_rate = "N/A",
  peep = "N/A",
  pip = "N/A",
  resp_rate = "N/A",
  sip = "N/A",
  tidal_vol = "N/A",
  tidal_vol_actual = "N/A",
  tidal_vol_kg = "N/A",
  tidal_vol_spon = "N/A",
  bmi = "N/A"
}) {
  return (
    // Card component from Ant Design to display patient medical data
    <Card className="mt-3 p-3">
      <h5>Patient Medical Data</h5>
      <div className="container">
        <div className="row">
          <div className="col-md-3"><strong>End Tidal CO2:</strong> {end_tidal_co2}</div>
          <div className="col-md-3"><strong>FiO2:</strong> {fio2}</div>
          <div className="col-md-3"><strong>Oxygen Flow Rate:</strong> {oxygen_flow_rate}</div>
          <div className="col-md-3"><strong>Tidal Volume:</strong> {tidal_vol}</div>
        </div>
        <div className="row mt-2">
          <div className="col-md-3"><strong>PEEP:</strong> {peep}</div>
          <div className="col-md-3"><strong>PIP:</strong> {pip}</div>
          <div className="col-md-3"><strong>Respiratory Rate:</strong> {resp_rate}</div>
          <div className="col-md-3"><strong>Inspiratory Time:</strong> {insp_time}</div>
        </div>
        <div className="row mt-2">
          <div className="col-md-3"><strong>FiO2 Ratio:</strong> {fio2_ratio}</div>
          <div className="col-md-3"><strong>Feed Volume:</strong> {feed_vol}</div>
          <div className="col-md-3"><strong>Feed Volume Administered:</strong> {feed_vol_adm}</div>
          <div className="col-md-3"><strong>SIP:</strong> {sip}</div>
        </div>
        <div className="row mt-2">
          <div className="col-md-3"><strong>Tidal Volume Actual:</strong> {tidal_vol_actual}</div>
          <div className="col-md-3"><strong>Tidal Volume per kg:</strong> {tidal_vol_kg}</div>
          <div className="col-md-3"><strong>Tidal Volume Spontaneous:</strong> {tidal_vol_spon}</div>
          <div className="col-md-3"><strong>BMI:</strong> {bmi}</div>
        </div>
      </div>
    </Card>
  );
}

export default PatientMedicalData;