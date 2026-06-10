import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignUpSignIn from "./components/Signup";
import SplitExpenseEngine from "./components/Groups/SplitExpenseEngine";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      {/* The Header now sits globally above all your pages */}
      <Header />
      
      <Routes>
        <Route path="/" element={<SignUpSignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/split" element={<SplitExpenseEngine />} />
      </Routes>
    </Router>
  );
}

export default App;
