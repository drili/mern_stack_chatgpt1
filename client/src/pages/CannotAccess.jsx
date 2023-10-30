import React from 'react'
import PageHeading from '../components/PageHeading'

const CannotAccess = () => {
  return (
    <div id="CannotAccess">
        <PageHeading
            heading={`You cannot access this page`}
            subHeading={`Please try again later, or ask admin for further permissions`}
        />
    </div>
  )
}

export default CannotAccess