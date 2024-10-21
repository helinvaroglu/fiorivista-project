import './App.css';
// importing react router for getting one page to another
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Navbar from './components/Navbar';
import Catalog from './pages/Catalog';
import Signup from './pages/Authentication/Signup';
import Login from './pages/Authentication/Login';

// all routes are defined here

function App() {
  return (
    <Router>
      <div>

        <Navbar/>

        <div id="content">
          <Routes>
            <Route path="/" exact element={<Catalog />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
