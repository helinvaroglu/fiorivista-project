import './App.css';
// importing react router for getting one page to another
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from './redux/features/Auth/authslice'; 

import Navbar from './components/Navbar';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Signup from './pages/Authentication/Signup';
import Login from './pages/Authentication/Login';
import Checkout from './pages/Checkout';
import SenderInfo from './pages/SenderInfo';
import Payment from './pages/Payment';
import PaymentConfirmed from './pages/PaymentConfirmed';
import TrackingPage from './pages/TrackingPage/trackingpage';


// all routes are defined here

function App() {

  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth || {});

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      dispatch(setUser({ user, token }));
    }
  }, [dispatch]);

  const handleLogout = () => {
    // Clear user state and localStorage
    dispatch(clearUser());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div>

        <Navbar user={user} onLogout={handleLogout}/>

        <div id="content">
          <Routes>
            <Route path="/" exact element={<Catalog />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/senderinformation" element={<SenderInfo />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/paymentconfirmed" element={<PaymentConfirmed />} />
            <Route path="/trackingpage" element={<TrackingPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
