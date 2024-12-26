import styles from './styles.module.css';
import React, {useState} from 'react';
import { Button, Icon, Input } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa'; 
import {Link, useNavigate } from "react-router-dom";
import ShoppingCart from '../../pages/ShoppingCart/index';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../redux/features/Auth/authslice';

// created the navbar to navigate through pages

function Navbar() {

  const products = useSelector((state) => state.cart.products);
  const [isCartVisible, setisCartVisible] = useState(false);
  const user = useSelector((state) => state.auth.user); // Access logged-in user info
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCartToggle = () => {
    setisCartVisible(!isCartVisible);
  }

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div>
      <nav className={styles.nav}>
          <div className={styles.left}>
            <div className="logo">
                <Link to="/">FioriVista</Link>
            </div>

            <ul className={styles.search}>
                <li>
                  <Input variant='filled' placeholder='Search' size='sm' border="1px solid" borderColor='#ADBBDA' background="#ADBBDA" />
                </li>
            </ul>
          </div>
          <div className={styles.right}>
            {user ? (
              <>
                <Link to="/">
                  <Button
                    color="#FDFDFF"
                    bg="rgba(255, 255, 255, 0)"
                    _hover={{ color: '#323232' }}
                    variant='link'
                  >
                    Welcome, {user.fullName}!
                  </Button>
                </Link>
                <Link to="/userinformation">
                  <Button
                    color="#FDFDFF"
                    bg="rgba(255, 255, 255, 0)"
                    _hover={{ color: '#323232' }}
                    variant='link'
                    onClick={handleLogout}
                  >
                    Log out
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/signup">
                  <Button
                    color="#FDFDFF"
                    bg="rgba(255, 255, 255, 0)"
                    _hover={{ color: '#323232' }}
                    variant='link'
                  >
                    Sign up
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    color="#FDFDFF"
                    bg="rgba(255, 255, 255, 0)"
                    _hover={{ color: '#323232' }}
                    variant='link'
                  >
                    Log in
                  </Button>
                </Link>
              </>
            )}
            {/* <Link to="/help">
              <Button color="#FDFDFF" bg="rgba(255, 255, 255, 0)" _hover={{ color: '#323232' }} variant='link'>Help</Button>
            </Link>
            <Link to="/signup">
              <Button color="#FDFDFF" bg="rgba(255, 255, 255, 0)" _hover={{ color: '#323232' }} variant='link'>Sign up</Button>
            </Link>
            <Link to="/login">
              <Button color="#FDFDFF" bg="rgba(255, 255, 255, 0)" _hover={{ color: '#323232' }} variant='link'>Log in</Button>
            </Link> */}
            <Button color="#FDFDFF" bg="rgba(255, 255, 255, 0)" _hover={{ color: '#323232' }} variant='link'
            onClick={handleCartToggle}
            >
              <Icon as={FaShoppingCart} />
            </Button>
          </div>
      </nav>

      {
        isCartVisible && <ShoppingCart products={products} isOpen={isCartVisible} onClose={handleCartToggle}/>
      }
    </div>
  )
}

export default Navbar;