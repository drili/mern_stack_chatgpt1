import React from 'react'
import { Link } from 'react-router-dom';

const SidebarLink = ({ menuLink, linkText, currentPath, iconComponent }) => {
    return (
        <Link
            to={menuLink}
            className={`tracking-wide gap-4 flex items-center py-2 px-4 text-gray-900 rounded 
                ${currentPath === menuLink ? 'bg-indigo-100 font-bold' : 'font-normal'} dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
            {React.createElement(iconComponent)}{linkText}
        </Link>
    )
}

export default SidebarLink