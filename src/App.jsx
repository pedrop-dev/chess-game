/* eslint-disable no-unused-vars */
import React,{ useState, createContext } from 'react'
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
  const [theme, setTheme] = useState("dark")

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <BrowserRouter>
        <div id={theme}>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/settings" element={<Settings/>} />
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
