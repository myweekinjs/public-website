import React from 'react'
import './resource.scss'

const Resource = ({
  resource
}) => {
  const details = resource.split('%%');
  return (
    <a href={details[1].trim()} target="_blank" rel="noopener noreferrer" className="resource">
      { details[0].trim() }
    </a>
  )
}

export default Resource
