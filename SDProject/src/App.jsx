import './App.css';
import MenuIcon from '@mui/icons-material/Menu';
import NavBar from './components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Router components for navigation
import HomePage from './components/HomePage';
import { useState } from "react";
import { MenuContext } from "./context"; // context for managing menu state
import About from './components/About';
import TableComponent from './components/Patients';
import PatientManager from './components/IndividualPatient/PatientManager';

import Help from './components/Help';
function App() {
  // state to manage the menu open/close state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // state to manage the table data
  const [tableData, setTableData] = useState([]);
  // function to open the menu
  const openNavMenu = (event) => {
    console.log('OPEN MENU');
    setIsMenuOpen(true);
    event.stopPropagation();
}
// function to close the menu
const closeNavMenu = () => {
    console.log('CLOSE MENU')
    setIsMenuOpen(false)
}
const onTabClick =() =>{

}

return (
  // Wrapping the app with MenuContext.Provider to make menu state accessible globally
  <MenuContext.Provider value={{ isMenuOpen, openNavMenu, closeNavMenu }}>
    <BrowserRouter>
      <header className="header">
        <MenuIcon className="menuIcon" onClick={openNavMenu} />
        <NavBar />
      </header>

      <main>
        {/* Main content area with routing */}
        <Routes>
          {/* routes for pages  */}
          <Route path='/' element={<HomePage chartData={tableData} />} />
          <Route path='/patients' element={<TableComponent setTableData={setTableData} />} />
          <Route path='/individual' element={<PatientManager />} />
          <Route path='/about' element={<About />} />
          <Route path='/help' element={<Help />} />

        </Routes>
      </main>
    </BrowserRouter>
  </MenuContext.Provider>
);
}

export default App;
