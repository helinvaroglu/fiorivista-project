import React, {useState} from 'react';
import { Grid } from '@chakra-ui/react';

import Card from '../../components/Card';
import FilterBar from '../../components/FilterBar';
import products from '../../data/products.json'


function Catalog() {
  const [listProducts, setListProducts] = useState();

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