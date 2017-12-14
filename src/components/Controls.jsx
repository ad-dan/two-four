import React from "react"

const Controls = () => {
  const controlsArray = [
    { btn: "W", action: "Up" },
    { btn: "A", action: "Left" },
    { btn: "S", action: "Down" },
    { btn: "D", action: "Left" }
  ]
  const controls = controlsArray.map((control, i) => {
    return (
      <div className="btn-box" key={`control-${i}`}>
        <div className="btn-key">{control.btn}</div>
        <div className="btn-info">{control.action}</div>
      </div>
    )
  })
  return (
    <div>
      <div className="control-container">
      {controls}
    </div>
    <div className='info'>
      Controls
    </div>
    </div>
    
  )
}

export default Controls;