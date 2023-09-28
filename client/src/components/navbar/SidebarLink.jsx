import React from 'react'
import { Link } from 'react-router-dom';

const SidebarLink = ({ menuLink, linkText, currentPath, iconComponent }) => {
    return (
        <Link
            to={menuLink}
            className={`flex items-center gap-4 py-2 pl-3 pr-4 text-gray-900 rounded ${currentPath === menuLink ? 'bg-indigo-100' : '200:bg-gray-100'
                } md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
            {React.createElement(iconComponent)}{linkText}
        </Link>
    )
}

export default SidebarLink