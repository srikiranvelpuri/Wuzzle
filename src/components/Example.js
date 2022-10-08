import React, { useState, useEffect } from 'react'

const Example = (props) => {
  const { word, value, index } = props
  const [active, setActive] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setActive(true)
    }, 100)
  }, [])

  return (
    <div className="cube">
      <div className="cube-row">
        {word.map((column, letterIndex) => (
          <div key={letterIndex} className={`letter ${active && letterIndex === index ? value : ''} `}>
            <p className={`inner-text`}>{column}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Example
