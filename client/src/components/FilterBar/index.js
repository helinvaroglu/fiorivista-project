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
        <Box>
          <Select
            placeholder="Flower Type"
            name="flowerType"
            value={filters.flowerType || 'all'}
            onChange={handleFilterChange}
            size="sm"
            width="150px"
            variant="outline"
          >
            <option value="all">All</option>
            <option value="rose">Rose</option>
            <option value="tulip">Tulip</option>
            <option value="sunflower">Sunflower</option>
          </Select>
        </Box>
        <Center height='20px'>
            <Divider orientation='vertical' />
        </Center>
        <Box>
          <Select
            placeholder="Design Type"
            name="designType"
            value={filters.designType || 'all'}
            onChange={handleFilterChange}
            size="sm"
            width="150px"
            variant="outline"
          >
            <option value="all">All</option>
            <option value="bouquet">Bouquet</option>
            <option value="basket">Basket</option>
            <option value="arrangement">Arrangement</option>
          </Select>
        </Box>
        <Center height='20px'>
            <Divider orientation='vertical' />
        </Center>
        <Box>
          <Select
            placeholder="Occasion"
            name="occasion"
            value={filters.occasion || ''}
            onChange={handleFilterChange }
            size="sm"
            width="150px"
            variant="outline"
          >
            <option value="birthday">Birthday</option>
            <option value="anniversary">Anniversary</option>
            <option value="getWell">Get Well Soon</option>
            <option value="momsday">Mother's Day</option>
            <option value="dadsday">Father's Day</option>
          </Select>
        </Box>
        <Center height='20px'>
            <Divider orientation='vertical' />
        </Center>
        <Box>
          <Select
            placeholder="Sort By"
            name="sort"
            value={filters.sort || 'default'}
            onChange={handleFilterChange}
            size="sm"
            width="150px"
            variant="outline"
          >
            <option value="default">Default</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="ratingDesc">Rating: High to Low</option>
          </Select>
        </Box>        
    </nav>
  )
}

export default FilterBar;