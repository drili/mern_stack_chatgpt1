import React from 'react'
import { Link } from 'react-router-dom';

const SidebarLink = ({ menuLink, linkText, currentPath, iconComponent }) => {
    return (
        <Link
            to={menuLink}
            className={`gap-4 flex items-center py-3 px-4 rounded text-sm
                ${currentPath === menuLink ? 
                    'bg-indigo-500 font-bold text-white hover:text-white' : 
                    'font-normal text-zinc-500'}`}>
            {React.createElement(iconComponent, { style: { fontSize: "18px" } })}{linkText}
        </Link>
    )
}

export default SidebarLink