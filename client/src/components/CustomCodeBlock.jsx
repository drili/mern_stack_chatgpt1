import React from 'react'

const CustomCodeBlock = ({ text }) => {
    return (
        <code className="ml-1 mr-1 bg-red-900 text-white px-2 py-1 rounded-md font-mono text-xs">
            {text}
        </code>
    )
}

export default CustomCodeBlock