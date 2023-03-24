import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Check } from "./pages/Check/Check";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/check" element={<Check />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
