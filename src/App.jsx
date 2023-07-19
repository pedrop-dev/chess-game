/* eslint-disable no-unused-vars */
import React,{ useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'
import GameAnalysis from "./pages/GameAnalysis/GameAnalysis"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/game-analysis" element={<GameAnalysis/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
