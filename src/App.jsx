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
    </>
  )
}

export default App
