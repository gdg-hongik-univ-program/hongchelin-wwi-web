//import { useState } from 'react'
//import { useNavigate } from 'react-router-dom'

import MainPage from "./pages/Mainpage"
import MyPage from "./pages/Mypage"
import Community from "./pages/Community"
import Vote from "./pages/Vote"
import Writing from "./components/Writing"
import Footer from "./components/Footer"
import Header from "./components/Header"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/mypage" element={<MyPage/>}/>
          <Route path="/community" element={<Community />}/>
          <Route path="/vote" element={<Vote/>}/>
          <Route path="/writing" element={<Writing/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App