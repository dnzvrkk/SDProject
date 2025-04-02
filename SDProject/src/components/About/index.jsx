import React from 'react';
import styles from './About.module.css';

const About = () => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>About</h1>
            </header>
            <main className={styles.main}>
                <section id="introduction" className={styles.section}>
                    <h2>Introduction</h2>
                    <p>Our medical dashboard is a comprehensive dashboard designed to help out healthcare professionals in managing patients' information and progress. Our platform offers secure access to patient records, appointment scheduling, medical reports, and advanced analytics to improve healthcare outcomes.</p>
                </section>
                <section id="features" className={styles.section}>
                    <h2>Features</h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}><strong>Patient Records:</strong> View and update patient medical histories securely.</li>
                        <li className={styles.listItem}><strong>Scheduling Appointment:</strong> Schedule and manage appointments easily.</li>
                        <li className={styles.listItem}><strong>Medical Reports:</strong> Access lab results, imaging reports, and other medical documents.</li>
                        <li className={styles.listItem}><strong>Analytics:</strong> Analyze patient data to identify trends and improve care.</li>
                        <li className={styles.listItem}><strong>Communication:</strong> Secure messaging between patients and healthcare providers.</li>
                    </ul>
                </section>
                <section id="user-roles" className={styles.section}>
                    <h2>User Roles</h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}><strong>Doctors:</strong> Full access to patient records and analytics.</li>
                        <li className={styles.listItem}><strong>Nurses:</strong> Access to patient records and appointment scheduling.</li>
                        <li className={styles.listItem}><strong>Patients:</strong> View personal medical records and schedule appointments.</li>
                        <li className={styles.listItem}><strong>Administrators:</strong> Manage user roles and system settings.</li>
                    </ul>
                </section>
                <section id="security" className={styles.section}>
                    <h2>Security</h2>
                    <p>The hospital employs heavy-duty encryption systems and complies with HIPAA regulations to ensure the security and privacy of any data. This is also to ensure that patients' sensitive information is stored securely and inaccessible to the public in case of any malicious activity.</p>
                </section>
                <section id="technology" className={styles.section}>
                    <h2>Technology</h2>
                    <p>Built using the latest web technologies, the hospital leverages cloud computing and machine learning to provide a robust and scalable solution.</p>
                </section>
                <section id="contact" className={styles.section}>
                    <h2>Contact Us</h2>
                    <p>For support or inquiries, please contact us at <a href="mailto:support@hospital.com">support@hospital.com</a>.</p>
                </section>
            </main>
            <footer className={styles.footer}>
                <p>&copy; 2025 hospital. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default About;
