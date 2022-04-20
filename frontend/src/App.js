import { useState, useEffect } from 'react'
import Keyboard from './components/Keyboard'
import './App.scss'
import { wordList } from './constants/data'

function App() {
  const [boardData, setBoardData] = useState(
    JSON.parse(localStorage.getItem('board_data'))
  )
  const [charArray, setCharArray] = useState([])
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  const resetBoard = () => {
    var alphabetIndex = Math.floor(Math.random() * 26)
    var wordIndex = Math.floor(
      Math.random() * wordList[String.fromCharCode(97 + alphabetIndex)].length
    )
    let newBoardData = {
      ...boardData,
      solution: wordList[String.fromCharCode(97 + alphabetIndex)][wordIndex],
      rowIndex: 0,
      boardWords: [],
      boardRowStatus: [],
      presentChar: [],
      absentChar: [],
      correctChar: [],
      game_status: 'IN_PROGRESS',
    }
    setBoardData(newBoardData)
    localStorage.setItem('board_data', JSON.stringify(newBoardData))
  }

  const handleError = () => {
    setError(true)
    setTimeout(() => {
      setError(false)
    }, 3000)
  }

  const handleMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const enterBoardData = (word) => {
    let boardWords = boardData.boardWords
    let absentChar = boardData.absentChar
    let boardRowStatus = boardData.boardRowStatus
    let correctChar = boardData.correctChar
    let game_status = boardData.game_status
    let presentChar = boardData.presentChar
    let rowIndex = boardData.rowIndex
    let solution = boardData.solution
    let rowStatus = []
    let matchCount = 0
    for (var i = 0; i < word.length; i++) {
      if (solution.charAt(i) === word.charAt(i)) {
        matchCount++
        rowStatus.push('correct')
        if (!correctChar.includes(word.charAt(i)))
          correctChar.push(word.charAt(i))

        if (presentChar.indexOf(word.charAt(i)) !== -1)
          presentChar.splice(presentChar.indexOf(word.charAt(i)), 1)
      } else if (solution.includes(word.charAt(i))) {
        rowStatus.push('present')
        if (
          !presentChar.includes(word.charAt(i)) &&
          !correctChar.includes(word.charAt(i))
        )
          presentChar.push(word.charAt(i))
      } else {
        rowStatus.push('absent')
        if (!absentChar.includes(word.charAt(i)))
          absentChar.push(word.charAt(i))
      }
    }
    if (matchCount === 5) {
      game_status = 'WON'
      handleMessage('You Win')
    } else if (rowIndex + 1 === 6) {
      game_status = 'LOST'
      handleMessage('Hard luck try agian')
    }
    boardRowStatus.push(rowStatus)
    boardWords[rowIndex] = word
    let newBoardData = {
      ...boardData,
      boardWords: boardWords,
      boardRowStatus: boardRowStatus,
      rowIndex: rowIndex + 1,
      game_status: game_status,
      presentChar: presentChar,
      correctChar: correctChar,
      absentChar: absentChar,
    }
    setBoardData(newBoardData)
    localStorage.setItem('board_data', JSON.stringify(newBoardData))
  }

  const enterCurrText = (word) => {
    let boardWords = boardData.boardWords
    let rowIndex = boardData.rowIndex
    boardWords[rowIndex] = word
    let newBoardData = { ...boardData, boardWords: boardWords }
    setBoardData(newBoardData)
  }

  const handleClick = (key) => {
    if (boardData?.rowIndex > 5 || boardData?.game_status === 'WON') return
    if (key === 'Enter') {
      if (charArray.length === 5) {
        let word = charArray.join('').toLowerCase()
        if (!wordList[word.charAt(0)].includes(word)) {
          handleError()
          handleMessage('Enter a valid 5 letter word')
          return
        }
        enterBoardData(word)
        setCharArray([])
      } else {
        handleMessage('Enter a valid 5 letter word')
      }
      return
    }
    if (key === 'Backspace') {
      charArray.splice(charArray.length - 1, 1)
      setCharArray([...charArray])
    } else if (charArray.length < 5) {
      charArray.push(key)
      setCharArray([...charArray])
    }
    enterCurrText(charArray.join('').toLowerCase())
  }

  useEffect(() => {
    if (!boardData || !boardData.solution) {
      var alphabetIndex = Math.floor(Math.random() * 26)
      var wordIndex = Math.floor(
        Math.random() * wordList[String.fromCharCode(97 + alphabetIndex)].length
      )
      let newBoardData = {
        ...boardData,
        solution: wordList[String.fromCharCode(97 + alphabetIndex)][wordIndex],
        rowIndex: 0,
        boardWords: [],
        boardRowStatus: [],
        presentChar: [],
        absentChar: [],
        correctChar: [],
        game_status: 'IN_PROGRESS',
      }
      setBoardData(newBoardData)
      localStorage.setItem('board_data', JSON.stringify(newBoardData))
    }
  }, [])

  return (
    <div className='App'>
      <div className='header-section'>
        <header className='Title'>WUZZLE</header>
        {boardData.game_status !== 'IN_PROGRESS' && (
          <button className='reset-board' onClick={resetBoard}>
            {'\u27f3'}
          </button>
        )}
      </div>
      {message && <div className='message'>{message} </div>}
      <div className='cube'>
        {[0, 1, 2, 3, 4, 5].map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`cube-row ${
              boardData && row === boardData.rowIndex && error && 'error'
            }`}
          >
            {[0, 1, 2, 3, 4].map((column, letterIndex) => (
              <div
                key={letterIndex}
                className={`letter ${
                  boardData && boardData.boardRowStatus[row]
                    ? boardData.boardRowStatus[row][column]
                    : ''
                }`}
              >
                {boardData &&
                  boardData.boardWords[row] &&
                  boardData.boardWords[row][column]}
              </div>
            ))}
          </div>
        ))}
      </div>
      <Keyboard boardData={boardData} handleClick={handleClick} />
    </div>
  )
}

export default App
