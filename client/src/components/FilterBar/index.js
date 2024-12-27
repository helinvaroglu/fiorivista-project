import React from 'react';
import styles from './styles.module.css';
import { Divider, Button, Center, Select, Box, Flex } from '@chakra-ui/react';


function FilterBar({ filters, setFilters }) {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  return (
    <nav className={styles.nav}>
        <Box mr={5} ml={5} className="dropdown-container">
          <Select
            placeholder="Flower Type"
            name="flowerType"
            value={filters.flowerType || 'all'}
            onChange={handleFilterChange}
            size="sm"
            width="150px"
            variant="unstyled"
            color="#3D52A0"
            fontSize={15}
          >
            <option value="rose">Rose</option>
            <option value="tulip">Tulip</option>
            <option value="sunflower">Sunflower</option>
          </Select>
        </Box>
        <Center height='20px'>
            <Divider orientation='vertical' />
        </Center>
        <Box mr={5} ml={5}>
          <Select
            placeholder="Design Type"
            name="designType"
            value={filters.designType || ''}
            onChange={handleFilterChange}
            size="sm"
            width="150px"
            variant="unstyled"
            color="#3D52A0"
            fontSize={15}
          >
            <option value="bouquet">Bouquet</option>
            <option value="basket">Basket</option>
            <option value="arrangement">Arrangement</option>
          </Select>
        </Box>
        <Center height='20px'>
            <Divider orientation='vertical' />
        </Center>
        <Box mr={5} ml={5}>
          <Select
            placeholder="Occasion"
            name="occasion"
            value={filters.occasion || ''}
            onChange={handleFilterChange }
            size="sm"
            width="150px"
            variant="unstyled"
            color="#3D52A0"
            fontSize={15}
          >
            <option value="birthday">Birthday</option>
            <option value="anniversary">Anniversary</option>
            <option value="thank you">Thank You</option>
            <option value="mother's day">Mother's Day</option>
            <option value="father's day">Father's Day</option>
          </Select>
        </Box>
        <Center height='20px'>
            <Divider orientation='vertical' />
        </Center>
        <Box mr={5} ml={5}>
          <Select
            placeholder="Sort By"
            name="sort"
            value={filters.sort || 'default'}
            onChange={handleFilterChange}
            size="sm"
            width="150px"
            variant="unstyled"
            color="#3D52A0"
            fontSize={15}
          >
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="ratingDesc">Rating: High to Low</option>
          </Select>
        </Box>        
    </nav>
  )
}

export default FilterBar;