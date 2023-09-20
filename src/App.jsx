/* eslint-disable no-unused-vars */
import React,{ useState, createContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'
import GameAnalysis from "./pages/GameAnalysis/GameAnalysis"
import PlayBot from './pages/PlayBot/PlayBot'
import MultiPlayer from './pages/MultiPlayer/MultiPlayer'
import ConfirmRegistration from './pages/ConfirmRegistration/ConfirmRegistration'
import Settings from './pages/Settings/Settings'

export const ThemeContext = createContext(null)

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme || 'light'
  })

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark-theme', theme === 'dark')
  }, [theme])

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <BrowserRouter>
        <div id={theme}>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/signin" element={<SignIn/>} />
            <Route 
              path="/settings" 
              element={<Settings changeTheme={toggleTheme}/>}
            />
            <Route path="/game-analysis" element={<GameAnalysis/>}/>
            <Route path="/play-bot" element={<PlayBot/>}/>
            <Route path="/play-game" element={<MultiPlayer/>}/>
            <Route path="/confirm-registration" element={<ConfirmRegistration/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}

export default App
