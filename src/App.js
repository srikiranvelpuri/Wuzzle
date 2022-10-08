import React, { useState, useEffect } from 'react'
import Keyboard from './components/Keyboard'
import CustomAlert from './components/CustomAlert'
import Instructions from './components/Instructions'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import wordList from './constants/wordList'
import CustomDrawer from './components/CustomDrawer'
import { VIBRATE_PRESS, VIBRATE_ERROR } from './constants/common'
import './App.scss'

const App = () => {
  const [boardData, setBoardData] = useState(JSON.parse(localStorage.getItem('board_data')))
  const [charArray, setCharArray] = useState([])
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)
  const [isDark, setDark] = useState(JSON.parse(localStorage.getItem('dark_mode') || false))
  const [devMode, setDevMode] = useState(0)

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  })

  const resetBoard = () => {
    var alphabetIndex = Math.floor(Math.random() * 26)
    var wordIndex = Math.floor(Math.random() * wordList[String.fromCharCode(97 + alphabetIndex)].length)
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
    setDevMode(0)
  }

  const revealAnswer = () => {
    navigator.vibrate(VIBRATE_PRESS)
    enterBoardData(boardData?.solution)
  }

  const handleError = (errMsg) => {
    navigator.vibrate(VIBRATE_ERROR)

    setError(true)
    handleMessage(errMsg)
    setTimeout(() => {
      setError(false)
    }, 1600)
  }

  const handleMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 1600)
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
    let unmatched = {}
    for (var i = 0; i < word.length; i++) {
      if (solution.charAt(i) === word.charAt(i)) {
        matchCount++
        rowStatus[i] = 'correct'
        correctChar.push(word.charAt(i))
      } else {
        unmatched[solution.charAt(i)] = (unmatched[solution.charAt(i)] || 0) + 1
      }
    }
    for (let i = 0; i < word.length; i++) {
      if (word.charAt(i) !== solution.charAt(i)) {
        if (unmatched[word.charAt(i)]) {
          rowStatus[i] = 'present'
          presentChar.push(word.charAt(i))
          unmatched[word.charAt(i)]--
        } else {
          rowStatus[i] = 'absent'
          absentChar.push(word.charAt(i))
        }
      }
    }
    if (matchCount === 5) {
      game_status = 'WON'
    } else if (rowIndex + 1 === 6) {
      game_status = 'LOST'
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
          handleError('Not in word list')
          return
        }
        navigator.vibrate(VIBRATE_PRESS)
        enterBoardData(word)
        setCharArray([])
      } else {
        handleError('Not enough letters')
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
    navigator.vibrate(VIBRATE_PRESS)
    enterCurrText(charArray.join('').toLowerCase())
  }

  const handleKeyPress = (e) => {
    const regex = /^[a-zA-Z]{1}$/
    if (String(e?.key).match(regex) || e?.key === 'Backspace' || e?.key === 'Enter') {
      const key = String(e?.key)
      handleClick(key)
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', handleKeyPress)
    return () => window.removeEventListener('keyup', handleKeyPress)
  }, [handleKeyPress])

  useEffect(() => {
    if (!boardData || !boardData.solution) {
      var alphabetIndex = Math.floor(Math.random() * 26)
      var wordIndex = Math.floor(Math.random() * wordList[String.fromCharCode(97 + alphabetIndex)].length)
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
  }, [boardData])

  useEffect(() => {
    if (devMode === 10) {
      revealAnswer()
    } else if (devMode > 10 && devMode % 2 === 0) {
      resetBoard()
    }
  }, [devMode])

  return (
    <div className="App" data-dark={isDark}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <div className="header-container">
          <div className="header-section">
            <header className="title">WUZZLE</header>
            <div className="message" data-hidden={boardData?.game_status === 'IN_PROGRESS' && !message}>
              <CustomAlert
                alert={boardData?.game_status !== 'IN_PROGRESS'}
                status={boardData?.game_status}
                word={boardData?.solution}
                tries={boardData?.boardRowStatus.length}
                content={{ text: message }}
              />
            </div>
          </div>

          <div className="header-items">
            <Instructions />
            <CustomDrawer
              setDark={setDark}
              isDark={isDark}
              resetBoard={resetBoard}
              defaultOpen={boardData?.game_status !== 'IN_PROGRESS'}
            />
          </div>
        </div>

        <div className="cube" onClick={() => setDevMode(devMode + 1)}>
          {[0, 1, 2, 3, 4, 5].map((row, rowIndex) => (
            <div key={rowIndex} className={`cube-row ${boardData && row === boardData.rowIndex && error && 'error'}`}>
              {[0, 1, 2, 3, 4].map((column, letterIndex) => (
                <div
                  key={letterIndex}
                  className={`letter ${
                    boardData && boardData.boardRowStatus[row] ? boardData.boardRowStatus[row][column] : ''
                  }  ${boardData && boardData.boardWords[row] && boardData.boardWords[row][column] ? 'pop' : ''}`}
                >
                  <p className={`inner-text`}>
                    {boardData && boardData.boardWords[row] && boardData.boardWords[row][column]}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <Keyboard boardData={boardData} handleClick={handleClick} />
      </ThemeProvider>
    </div>
  )
}

export default App
