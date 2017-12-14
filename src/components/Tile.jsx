import React from 'react'

const Tile = ({value}) => {
  return (
    <div className={`Tile size-${value}`}>
      {value ? value: ''}
    </div>
  )
}

export default Tile