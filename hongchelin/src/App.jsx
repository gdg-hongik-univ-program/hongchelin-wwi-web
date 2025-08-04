//import { useState } from 'react'
//import { useNavigate } from 'react-router-dom'
import Footer from "./components/Footer"
import MyPage from "./pages/Mypage"
import Community from "./pages/Community"
// import Writing from "./components/Writing"
import KakaoMap from "./components/KakaoMap"
import WritingPage from "./components/WritingPage"
import PostDetail from "./components/PostDetail"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { createContext, useReducer } from "react";

export const PostsStateContext = createContext();
export const PostsDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_POST":
      return [action.payload, ...state];
    case "DELETE_POST":
      return state.filter(post => post.id !== action.id);
    default:
      return state;
  }
};
  

function App() {
  const [posts, dispatch] = useReducer(reducer, []);
  return (
    <PostsStateContext.Provider value={posts}>
      <PostsDispatchContext.Provider value={dispatch}>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<KakaoMap />}/>
              <Route path="/mypage" element={<MyPage/>}/>
              <Route path="/community" element={<Community />}/>
              {/* <Route path="/vote" element={<Vote/>}/> */}
              <Route path="/writing" element={<WritingPage/>}/>
              <Route path="/posts/:postId" element={<PostDetail/>}/>
            </Routes>
          </div>
        </Router>
      </PostsDispatchContext.Provider>
    </PostsStateContext.Provider>
  )
}

export default App
