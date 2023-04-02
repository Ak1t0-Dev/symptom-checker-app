import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Check } from "./pages/Check/Check";
import { Diagnosis } from "./pages/Diagnosis/Diagnosis";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/check" element={<Check />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
