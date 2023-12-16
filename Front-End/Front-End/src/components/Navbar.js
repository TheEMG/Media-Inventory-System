// Navbar component for the application's navigation.
// This component includes a toggleable sidebar with navigation links.
import React, { useState } from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SideBarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';

function Navbar() {
  // State to manage the visibility of the sidebar
  const [sidebar, setSidebar] = useState(false);

  //Function to toggle the sidebar visibility 
  const showSidebar = () => setSidebar(!sidebar);

  return (

    <div>
      {/* IconContext.Provider to provide a default style for all icons in this componet */}
      <IconContext.Provider value={{color:'#c0392b'}}>
        {/* Top navbar with menu bar icon */}
      <div className="navbar">
        <Link to="#" className='menu-bars'>
          {/*Icon to open the sidebar */}
          <FaIcons.FaBars onClick={showSidebar}/>
        </Link>
      </div>
      {/* Sidebar navigation*/}
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items'onClick={showSidebar}>
          {/* Icon to close the sidebar */}
          <li className="navbar-toggle">
            <Link to="#" className='menu-bars'>
              <AiIcons.AiOutlineClose/>
            </Link>
          </li>
          {/* Mapping over SideBarData to sender navigation items */}
          {SideBarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon} {/* Displaying the icon */}
                  <span>{item.title}</span> {/* Navigation item title  */}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      </IconContext.Provider>
    </div>
  );
}

export default Navbar;
