import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Contact } from "./components/Contact";
import { Calendar } from "./components/Calender";
import "./css/index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Contact />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
