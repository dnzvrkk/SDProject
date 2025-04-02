import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import Papa from "papaparse";
import styles from "./homepage.module.scss";

const ChartComponent = () => {
    // States to store parsed data for charts
    const [pieData, setPieData] = useState([]);
    const [referralData, setReferralData] = useState([]);
    const [valueData, setValueData] = useState([]);
    const [feedVolumeData, setFeedVolumeData] = useState([]);

    useEffect(() => {
        // Fetch the CSV file and parse it
        fetch("/data.csv")
            .then(response => response.text())
            .then(csvText => {
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    dynamicTyping: true,
                    complete: (result) => {
                        const totalPatients = result.data.length;
                        const patientsWithoutData = result.data.filter(row => !row.end_tidal_co2).length;
                        const patientsWithData = totalPatients - patientsWithoutData;
 
                        // data for pie chart to store patients with and without data
                        setPieData([
                            { name: "With Data", value: patientsWithData },
                            { name: "Without Data", value: patientsWithoutData }
                        ]);
                        // data for referral status
                        const referred = result.data.filter(row => row.referral === 1.0).length;
                        const needReferral = result.data.filter(row => !row.referral && !row.end_tidal_co2).length;
                        const doNotNeedReferral = result.data.filter(row => row.referral !== 1.0 && row.end_tidal_co2).length;
                        // Setting referral data for bar chart
                        setReferralData([
                            { name: "Referred", value: referred },
                            { name: "Need Referral", value: needReferral },
                            { name: "Do Not Need Referral", value: doNotNeedReferral }
                        ]);
                        // values for the bar chart
                        const feedVolEmpty = result.data.filter(row => row.feed_vol == null).length;
                        const endTidalCO2Empty = result.data.filter(row => row.end_tidal_co2 == null).length;
                        // Setting values for bar chart
                        setValueData([
                            { name: "Feed Volume", filled: totalPatients - feedVolEmpty, empty: feedVolEmpty },
                            { name: "End Tidal CO2", filled: patientsWithData - patientsWithoutData, empty: endTidalCO2Empty }
                        ]);
                        // Grouping by encounter and calculating average feed volume administered
                        const groupedByEncounters = result.data.reduce((acc, row, index) => {
                            if (row.feed_vol_adm != null) {
                                const group = Math.floor(index / 100) * 100;
                                if (!acc[group]) {
                                    acc[group] = { count: 0, total: 0 };
                                }
                                acc[group].count += 1;
                                acc[group].total += row.feed_vol_adm;
                            }
                            return acc;
                        }, {});
                        // Formatting feed volume data for chart display
                        const feedVolumeByEncounter = Object.keys(groupedByEncounters).map(key => ({
                            encounter_group: key,
                            avg_feed_vol_adm: groupedByEncounters[key].total / groupedByEncounters[key].count
                        }));

                        setFeedVolumeData(feedVolumeByEncounter);
                    }
                });
            })
            .catch(error => console.error("Error loading CSV file:", error));
    }, []);
    // default colour pallette for the charts
    const COLORS = ["#82ca9d", "#ff7300", "#8884d8", "#ff0000"];  

    return (
        <>
        <h2 style={{ textAlign: 'center', margin: '0', padding: '20px' }}>Homepage</h2>
        <div className={styles["chart-container"]}>
            <div className={styles["chart-item"]}>
                {/* Bar Chart indicates Feed Volume Administered per Encounter Group */}
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={feedVolumeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="encounter_group" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="avg_feed_vol_adm" fill="#ff7300" name="Avg Feed Volume Administered" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className={styles["chart-item"]}>
                {/* Pie Chart indicates patients with or without data */}

                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className={styles["chart-item"]}>
                {/* Bar Chart indicates Referral Status */}
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={referralData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" name="Referral Status" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className={styles["chart-item"]}>
                {/* Bar Chart indicates empty fields*/}
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={valueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="filled" fill="#82ca9d" name="Filled Values" />
                        <Bar dataKey="empty" fill="#ff0000" name="Empty Values" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
        <footer className={styles.footer}>
                        <p>&copy; 2025 hospital. All rights reserved.</p>
        </footer>
        </>

    );
};

export default ChartComponent;
