import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import WriteArticle from './pages/WriteArticle'
import BlogTitle from './pages/BlogTitle'
import GenerateImages from './pages/GenerateImages'
import RemoveBackground from './pages/RemoveBackground'
import RemoveObject from './pages/RemoveObject'
import ReviewResumse from './pages/ReviewResumse'
import Community from './pages/Community'


function App() {

  return <>
  <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/ai" element={<Layout/>}/>
     <Route path="/dashboard" element={<Dashboard/>}/>
     <Route path="/write-article" element={<WriteArticle/>}/>
     <Route path="/blog-titles" element={<BlogTitle/>}/>
     <Route path="/generate-images" element={<GenerateImages/>}/>
     <Route path="/remove-background" element={<RemoveBackground/>}/>
     <Route path="/remove-object" element={<RemoveObject/>}/>
     <Route path="/review-resume" element={<ReviewResumse/>}/>
     <Route path="/community" element={<Community/>}/>

  </Routes>
  </>
}

export default App
