import React from 'react'

const Score = ({board}) => {
  const sum = board.reduce((gameSum, row)=>{
    const rowSum = row.reduce((colSum, col)=>{
      return colSum+col;
    },0);
    return gameSum+rowSum;
  },0)
  return (
    <div className='Score'>
      Current score: <span>{sum}</span>
    </div>
  )
}

export default Score