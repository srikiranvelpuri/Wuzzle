import React from 'react'
import BackspaceIcon from '@mui/icons-material/Backspace'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import { start_row, end_row } from '../constants/keys'
import './Keyboard.scss'

const Keyboard = (props) => {
  const { boardData, handleClick } = props
  const FirstKeyList = (props) => {
    const { startList } = props
    return (
      <div id='key-list'>
        {startList?.map((item, index) => {
          return (
            <div
              id='key'
              key={`${index}:${item}`}
              className={`${
                boardData && boardData.correctChar.includes(item.toLowerCase())
                  ? 'key-correct'
                  : boardData &&
                    boardData.presentChar.includes(item.toLowerCase())
                  ? 'key-present'
                  : boardData &&
                    boardData.absentChar.includes(item.toLowerCase())
                  ? 'key-absent'
                  : ''
              }`}
              onClick={() => handleClick(item)}
            >
              <span className='key-data'>{item}</span>
            </div>
          )
        })}
      </div>
    )
  }

  const LastKeyList = (props) => {
    const { endList } = props
    return (
      <div id='key-list'>
        <button id='key' onClick={() => handleClick('Backspace')}>
          <BackspaceIcon />
        </button>
        {endList?.map((item, index) => {
          return (
            <div
              id='key'
              key={`${index}:${item}`}
              className={`${
                boardData && boardData.correctChar.includes(item.toLowerCase())
                  ? 'key-correct'
                  : boardData &&
                    boardData.presentChar.includes(item.toLowerCase())
                  ? 'key-present'
                  : boardData &&
                    boardData.absentChar.includes(item.toLowerCase())
                  ? 'key-absent'
                  : ''
              }`}
              onClick={() => handleClick(item)}
            >
              <span className='key-data'>{item}</span>
            </div>
          )
        })}
        <button id='key' onClick={() => handleClick('Enter')}>
          <KeyboardReturnIcon />
        </button>
      </div>
    )
  }

  return (
    <div id='keyboard'>
      {start_row.map((item, index) => {
        return <FirstKeyList key={index} startList={item} />
      })}
      <LastKeyList endList={end_row} />
    </div>
  )
}

export default Keyboard
