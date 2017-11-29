import React from 'react'
import Row from './Row'

const Board = ({board}) => {
  const GameBoard = board.map((row, rowNum) => {
    return (
      <Row row={row} rowNum={rowNum} key={`row-${rowNum}`}/>
    )
  })
  return (
    <div className='Board'>
      {GameBoard}
    </div>
  )
}

export default Board