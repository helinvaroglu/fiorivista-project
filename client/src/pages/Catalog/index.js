import React, {useState} from 'react';
import { Grid } from '@chakra-ui/react';

import Card from '../../components/Card';
import FilterBar from '../../components/FilterBar';
import { useFetchAllProductsQuery } from '../../redux/features/Products/productApi';



function Catalog() {
  const [filtersState, setFiltersState] = useState({
    flowerType: "all",
    flowerType: "all", 
    designType: "all", 
    occasion: ""
  })
  const [currentPage, setCurrentPage] = useState(1);
  const [ProductsPerPage] = useState(8);
  const { flowerType, designType, occasion, price} = filtersState;

  const {data: {products = [], totalPages, totalProducts} = {}, error, isLoading} = useFetchAllProductsQuery({
    flowerType: flowerType, 
    designType: designType, 
    occasion: occasion, 
    price: price, 
    page: currentPage, 
    limit: ProductsPerPage,
  })

  if(isLoading) return <div>Loading...</div>
  if(error) return <div>Error: {error.message}</div>


  return (
    <div>
      <div>
        <FilterBar />
      </div>
      <div>
        <Card products={products}></Card>
      </div>
    </div>
  )
}

export default Catalog;