// App.tsx ou arquivo de rotas equivalente
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Contact } from "./components/Contact";
import { Calendar } from "./components/Calender";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Contact />} />
        <Route path="/calender" element={<Calendar />} />
        {/* Outras rotas */}
      </Routes>
    </Router>
  );
}

export default App;
