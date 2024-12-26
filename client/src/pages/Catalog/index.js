import React, {useState} from 'react';
import { Grid } from '@chakra-ui/react';

import Card from '../../components/Card';
import FilterBar from '../../components/FilterBar';
import { useFetchAllProductsQuery } from '../../redux/features/Products/productApi';
import { useLocation } from 'react-router-dom';


function Catalog() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get('search') || '';
  const [filtersState, setFiltersState] = useState({
    flowerType: "all",
    flowerType: "all", 
    designType: "all", 
    occasion: ""
  })
  const [currentPage, setCurrentPage] = useState(1);
  const [ProductsPerPage] = useState(12);
  const { flowerType, designType, occasion, price} = filtersState;

  const {data: {products = [], totalPages, totalProducts} = {}, error, isLoading} = useFetchAllProductsQuery({
    flowerType: flowerType, 
    designType: designType, 
    occasion: occasion, 
    price: price, 
    search: search,
    page: currentPage, 
    limit: ProductsPerPage,
  });

  console.log("Search Query:", search);
  console.log("Products from API:", products);



  if(isLoading) return <div>Loading...</div>
  if(error) return <div>Error: {error.message}</div>


  return (
    <div>
      <div>
        <FilterBar />
      </div>
      <div>
        {search && products.length === 0 ? (
          <div>No products found for "{search}"</div> // Show a message if no results match the search
        ) : (
          <Card products={products}></Card>
        )}
      </div>
    </div>
  )
}

export default Catalog;