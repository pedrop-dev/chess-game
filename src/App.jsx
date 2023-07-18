<<<<<<< HEAD
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Footer from './components/Footer'


function App() {
  return (
    <>
        <Footer />
=======
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GameAnalysis from "./pages/GameAnalysis/GameAnalysis"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/game-analysis" element={<GameAnalysis/>}/>
        </Routes>
      </BrowserRouter>
>>>>>>> 4544afb0215ad6c89b42f8224c5a53237779e19f
    </>
  )
}

export default App
