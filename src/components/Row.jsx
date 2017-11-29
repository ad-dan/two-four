import React from  'react'
import Tile from './Tile'

const Row = ({row, rowNum}) => {
  const GameRow = row.map((value,index) => <Tile key={`row-${rowNum}-col-${index}`} value={value}/>);
  return (
    <div className='Row'>
      {GameRow}
    </div>
  )
}

export default Row