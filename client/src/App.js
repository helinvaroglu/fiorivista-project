import './App.css';
// importing react router for getting one page to another
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Navbar from './components/Navbar';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Signup from './pages/Authentication/Signup';
import Login from './pages/Authentication/Login';
import Checkout from './pages/Checkout';
import SenderInfo from './pages/SenderInfo';
import Payment from './pages/Payment';
import PaymentConfirmed from './pages/PaymentConfirmed';




// all routes are defined here

function App() {
  return (
    <Router>
      <div>

        <Navbar/>

        <div id="content">
          <Routes>
            <Route path="/" exact element={<Catalog />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/senderinformation" element={<SenderInfo />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/paymentconfirmed" element={<PaymentConfirmed />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
