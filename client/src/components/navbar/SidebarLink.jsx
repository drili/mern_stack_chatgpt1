import React from 'react'
import { Link } from 'react-router-dom';

const SidebarLink = ({ menuLink, linkText, currentPath, iconComponent, wip }) => {
    return (
        <Link
            to={menuLink}
            className={`gap-4 flex items-center py-3 px-4 rounded text-[14px] relative
                ${currentPath === menuLink ? 
                    'bg-indigo-500 font-bold text-white hover:text-white' : 
                    'font-medoum text-zinc-600'}`}>
            {React.createElement(iconComponent, { style: { fontSize: "18px" } })}{linkText}
            
            {wip ? (
                <div className='absolute right-0 flex  pt-1 pb-1 bg-amber-400 py-0 px-2 rounded-sm'>
                    <label className='text-[8px] text-black'>TBU</label>
                </div>
            ) : (
                ""
            )}
        </Link>
    )
}

export default SidebarLink