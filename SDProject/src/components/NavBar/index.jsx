import React, { useContext, useEffect, useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import { MenuContext } from "../../context";
import styles from "./style.module.scss";
import classNames from "classnames"; // Utility for conditionally joining class names 
import CloseIcon from '@mui/icons-material/Close';
 

function NavBar() {
    // Context to manage the state of the menu
    // isMenuOpen: boolean - indicates if the menu is open or closed
    const { isMenuOpen, closeNavMenu } = useContext(MenuContext);
    // Function to close the menu when a link is clicked
    const container = classNames(styles.container, {[styles.open]: isMenuOpen});
    // function to handle outside click to close the menu
    const navMenu = useRef(null);
    useEffect(() => {
        const handleClick = ({target}) => {
            if (!navMenu.current.contains(target)) {
                closeNavMenu();
            }
        }
        // event listeners to close the navbar
        window.addEventListener('click', handleClick)
        window.addEventListener('keydown', handleOnKeyDown1)

    }, [])
    // if enter clicked on the close icon, close the menu
    const handleOnKeyDown = (event) => {
        if (event.key === 'Enter') {
            closeNavMenu();
        }
         
    }
    // if tab is clicked, open the menu
    const handleOnKeyDown1 = (event) => {
        if (event.key === 'Escape') {
            closeNavMenu();
        }
        
    }
    const handleTab = (event) => {
        if (event.key === 'Tab') {
            isMenuOpen(true);
        }
        
    }

    return (
        <nav className={container} ref={navMenu}>
             <CloseIcon
                tabIndex="1"
                className={styles.closeMenu}
                onClick={closeNavMenu}
                onKeyDown={handleOnKeyDown}
                fontSize="large"
            />
            <ul className={styles.list}>
                <li>
                    <Link to="/" >Home</Link>
                </li>
                <li>
                    <Link to="/patients" >Patients</Link>
                </li>
                <li>
                    <Link to="/individual" >Individual patient data</Link>
                </li>
                <li>
                    <Link to="/about" >About</Link>
                </li>
                <li>
                    <Link to="/help" >Help</Link>
                </li>
                
            </ul>
        </nav>
    );
}

export default NavBar;
