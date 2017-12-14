import React from 'react'

const Score = ({current, high}) => {

  return (
    <div className='Score'>
      <div className='Current-Score'>Score: {current} </div>
      <div className='High-Score'>Your High Score: {high}</div>
    </div>
  )
}

export default Score