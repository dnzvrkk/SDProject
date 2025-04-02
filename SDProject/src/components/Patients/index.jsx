import React, { useState } from "react";
import Papa from "papaparse";
import { Button, Table, Pagination, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./patients.module.scss";

const TableComponent = () => {
  // state to store data
  const [data, setData] = useState([]);
  // state to store columns
  const [columns, setColumns] = useState([]);
  // state to store current page
  const [currentPage, setCurrentPage] = useState(1);
  // state to store filtered data
  const [filteredData, setFilteredData] = useState([]);
  // state to store filter status
  const [filter, setFilter] = useState(null);
  const pageSize = 10; // amount of rows per page

  // Handle CSV upload and parsing
  const handleFileUpload = (info) => {
    const file = info.file.originFileObj || info.file;

    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.data.length === 0 || !results.data[0]) {
            message.error("Empty or invalid CSV!");
            return;
          }

          // Create columns dynamically based on CSV headers
          const csvColumns = Object.keys(results.data[0]).map((key) => ({
            title: key,
            dataIndex: key,
            key: key,
            sorter: (a, b) => a[key]?.localeCompare(b[key]), // Sorter for string values
            width: key === "referral" ? 250 : undefined,  
            render: (text) => {
              if (key === "referral") {
                return (
                  <span
                    className={
                      text === "Need referral" ? styles.needReferralCell : styles.noReferralCell
                    }
                    style={{ display: "inline-block", width: "100%" }}  
                  >
                    {text}
                  </span>
                );
              }
              return text;
            },
          }));

          // Process the data to add the 'referral' column
          const processedData = results.data.map((row) => {
            const allEmpty = Object.entries(row)
              .filter(([key]) => key !== "encounterId" && key !== "referral")
              .every(([_, value]) => value === null || value === undefined || value === "");

            return {
              ...row,
              referral: allEmpty ? "Need referral" : "No referral needed", // Default value
            };
          });

          setColumns(csvColumns); // Set columns for the table
          setData(processedData); // Set data for the table
          setFilteredData(processedData); // Initially show all data
          message.success("CSV uploaded successfully!");
        },
      });
    } else {
      message.error("Unable to read the file. Please try again!");
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Filter data based on referral status
  const filterData = (status) => {
    if (status === filter) {
      // Reset filter when clicking the same button again
      setFilteredData(data);
      setFilter(null);
    } else {
      const filtered = data.filter((row) => row.referral === status);
      setFilteredData(filtered);
      setFilter(status);
    }
    setCurrentPage(1); // Reset to first page when filter is applied
  };

  return (
    <>
    <div>
      <div className={styles.container}>
        <div className={styles.buttons}>
          <Button
            onClick={() => filterData("Need referral")}
            className={filter === "Need referral" ? styles.needReferralActive : ""}
          >
            Need Referral
          </Button>
          <Button
            onClick={() => filterData("No referral needed")}
            className={filter === "No referral needed" ? styles.noReferralActive : ""}
          >
            Do Not Need Referral
          </Button>
        </div>
        <Upload
          accept=".csv"
          showUploadList={false}
          beforeUpload={() => false} // Prevents automatic upload
          onChange={handleFileUpload} // handler for file upload
        >
          <Button className={styles.uploadbutton} icon={<UploadOutlined />}>
            Upload CSV
          </Button>
        </Upload>
      </div>
      {/*Display the table with data */}
      {filteredData.length > 0 ? (
        <Table
          bordered
          columns={columns}
          dataSource={filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
          rowKey={(record) => record.encounterId || `${record.key || record.id}-${Math.random()}`}
          pagination={false}
          scroll={{ x: true }}
        />
      ) : (
        <p>No data available. Upload a CSV file!</p>
      )}

      {filteredData.length > 0 && (
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredData.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      )}
    </div>
            <footer className={styles.footer}>
                            <p>&copy; 2025 hospital. All rights reserved.</p>
            </footer>
    </>
  );
};

export default TableComponent;
