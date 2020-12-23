import React, { useState, useEffect } from 'react';
import axios from '../../config/axios';

import { ProductsContainer, ProductWrapper, ProductsHeading } from './ProductsElements';

import ProductCardItem from './ProductCardItem';

function Products({ heading }) {
  const [data, setData] = useState([]);
  const fetchProducts = () => {
    axios
      .get('/rewards')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(data);
  return (
    <ProductsContainer>
      <ProductsHeading>{heading}</ProductsHeading>
      <ProductWrapper>
        {data.map((product, index) => {
          return <ProductCardItem product={product} index={index} />;
        })}
      </ProductWrapper>
    </ProductsContainer>
  );
}

export default Products;
