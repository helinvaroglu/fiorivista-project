import React, {useState,useEffect } from 'react';
import { Grid } from '@chakra-ui/react';

import Card from '../../components/Card';
import FilterBar from '../../components/FilterBar';
import { useFetchAllProductsQuery } from '../../redux/features/Products/productApi';
import { useSearchParams } from 'react-router-dom';


function Catalog() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search') || '';
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    flowerType: "all",
    occasion: "", 
    designType: "all", 
    sort: "default"
  })
  const [currentPage, setCurrentPage] = useState(1);
  const [ProductsPerPage] = useState(12);
  console.log(filters);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:5000/api/products?search=${query}&flowerType=${filters.flowerType}&designType=${filters.designType}&occasion=${filters.occasion}&sort=${filters.sort}&page=${currentPage}&limit=${ProductsPerPage}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [query, currentPage, ProductsPerPage, filters]);

  const noProductsFound = query && products.length === 0;

  // const {
  //   data: { products = [], totalPages, totalProducts } = {},
  //   error,
  //   isLoading,
  // } = useFetchAllProductsQuery({
  //   flowerType,
  //   designType,
  //   occasion,
  //   price,
  //   search: query, 
  //   page: currentPage,
  //   limit: ProductsPerPage,
  // });


  if(isLoading) return <div>Loading...</div>
  if(error) return <div>Error: {error.message}</div>


  return (
    <div>
      <div>
        <FilterBar filters={filters} setFilters={setFilters} />
      </div>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : noProductsFound ? (
          <div>No products found for "{query}"</div>
        ) : (
          <Card products={products}></Card>
        )}
      </div>
    </div>
  )
}

export default Catalog;