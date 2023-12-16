import React from "react";
import * as AiIcons from 'react-icons/ai';
import { MdLocalMovies } from "react-icons/md";
import { ImBooks } from "react-icons/im";

// SideBarData array for defining the navigation items in the sidebar.
// Each item in the array represents a link in the navigation menu.
// Properties:
//  - title: The text label for the navigation item.
//  - path: The URL path that the navigation item links to.
//  - icon: The icon component displayed next to the navigation item text.
//  - cName: The CSS class name for styling the navigation item.
// 
// Note: The icons used here are placeholders. They should be updated to match the context
// of the inventory management system.

export const SideBarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome/>,
    cName: 'nav-text'

  },

  {
    title: 'Books',
    path: '/Books',
    icon: <ImBooks />,
    cName: 'nav-text'

  },

  {
    title: 'Movies',
    path: '/Movies',
    icon: <MdLocalMovies />,
    cName: 'nav-text'

  }
]