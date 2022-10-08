import React from 'react'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import MenuIcon from '@mui/icons-material/Menu'
import Toggle from './Toggle'

const CustomDrawer = (props) => {
  const { resetBoard, setDark, isDark, defaultOpen } = props
  const [state, setState] = React.useState(defaultOpen || false)
  React.useEffect(() => {
    setState(defaultOpen)
  }, [defaultOpen])

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState(open)
  }

  const componentMapper = {
    'Dark Mode': () => (
      <Toggle
        handleChange={() => {
          setDark(!isDark)
          localStorage.setItem('dark_mode', !isDark)
        }}
        val={isDark}
      />
    ),
    'Play Again ?': () => (
      <Button onClick={resetBoard}>
        <RestartAltIcon />
      </Button>
    ),
  }

  const list = () => (
    <Box sx={{ width: 'auto' }} role="presentation">
      <List>
        {Object.keys(componentMapper).map((text, index) => (
          <ListItem key={index} onClick={toggleDrawer(false)}>
            <ListItemText primary={text} />
            {componentMapper[text]()}
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon />
      </Button>
      <SwipeableDrawer anchor="bottom" open={state} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        {list()}
      </SwipeableDrawer>
    </div>
  )
}

export default CustomDrawer
