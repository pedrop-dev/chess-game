/* eslint-disable no-unused-vars */
import React,{ useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'
import GameAnalysis from "./pages/GameAnalysis/GameAnalysis"
import PlayBot from './pages/PlayBot/PlayBot'
import MultiPlayer from './pages/MultiPlayer/MultiPlayer'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/game-analysis" element={<GameAnalysis/>}/>
          <Route path="/play-bot" element={<PlayBot/>}/>
          <Route path="/play-game" element={<MultiPlayer/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
