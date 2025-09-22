import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import WriteArticle from "./pages/WriteArticle";
import BlogTitle from "./pages/BlogTitle";
import GenerateImages from "./pages/GenerateImages";
import RemoveBackground from "./pages/RemoveBackground";
import RemoveObject from "./pages/RemoveObject";
import ReviewResumse from "./pages/ReviewResumse";
import Community from "./pages/Community";
import { Toaster } from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

function App() {
  const { getToken } = useAuth();
  useEffect(() => {
    getToken().then((token) => console.log(token));
  }, []);
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/ai/write-article" element={<WriteArticle />} />
          <Route path="/ai/blog-titles" element={<BlogTitle />} />
          <Route path="/ai/generate-images" element={<GenerateImages />} />
          <Route path="/ai/remove-background" element={<RemoveBackground />} />
          <Route path="/ai/remove-object" element={<RemoveObject />} />
          <Route path="/ai/review-resume" element={<ReviewResumse />} />
          <Route path="/ai/community" element={<Community />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
