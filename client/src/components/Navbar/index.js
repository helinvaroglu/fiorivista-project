import styles from './styles.module.css';
import React from 'react';
import { Button, Icon, Input } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa'; 

import {
    Link
} from "react-router-dom";

// created the navbar to navigate through pages

function Navbar() {

  const products = useSelector((state) => state.cart.products);
  console.log(products);

  return (
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
            <Link to="/help">
          <Button color="#FDFDFF" bg="rgba(255, 255, 255, 0)" _hover={{ color: '#323232' }} variant='link'>Help</Button>
            </Link>
            <Link to="/signup">
          <Button color="#FDFDFF" bg="rgba(255, 255, 255, 0)" _hover={{ color: '#323232' }} variant='link'>Sign up</Button>
            </Link>
            <Link to="/login">
          <Button color="#FDFDFF" bg="rgba(255, 255, 255, 0)" _hover={{ color: '#323232' }} variant='link'>Log in</Button>
            </Link>
            <Link to="/cart">
          <Button color="#FDFDFF" bg="rgba(255, 255, 255, 0)" _hover={{ color: '#323232' }} variant='link'>
                <Icon as={FaShoppingCart} />
              </Button>
            </Link>
          </div>
      </nav>
  )
}

export default Navbar;