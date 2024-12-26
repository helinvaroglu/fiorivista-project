import React from 'react';
import styles from './styles.module.css';
import { Divider, Button, Center } from '@chakra-ui/react';


function FilterBar() {
  return (
    <nav className={styles.nav}>
          <Button color="#3D52A0" bg="rgba(255, 255, 255, 0)" _hover={{ color: '#323232' }} variant='link'>Flower Type</Button>
        <Center height='20px'>
            <Divider orientation='vertical' />
        </Center>
          <Button color="#3D52A0" bg="rgba(255, 255, 255, 0)" _hover={{ color: '#323232' }} variant='link'>Design Type</Button>
        <Center height='20px'>
            <Divider orientation='vertical' />
        </Center>
          <Button color="#3D52A0" bg="rgba(255, 255, 255, 0)" _hover={{ color: '#323232' }} variant='link'>Occasion</Button>
        <Center height='20px'>
            <Divider orientation='vertical' />
        </Center>
          <Button color="#3D52A0" bg="rgba(255, 255, 255, 0)" _hover={{ color: '#323232' }} variant='link'>Sort</Button>

    </nav>
  )
}

export default FilterBar;