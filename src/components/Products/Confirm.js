import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  ProductTitle,
  ProductCard,
  ProductImg,
  ProductInfo,
  ProductDesc,
  ProductPrice,
  ProductButton,
} from './ProductsElements';

function ConfirmProduct() {
  const [product, setProduct] = useState({});
  const params = useParams();
  useEffect(() => {
    axios
      .get(`/rewards/${params.id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <ProductCard key={product.id}>
        <ProductImg src={product.picture} alt={product.alt} />
        <ProductInfo>
          <ProductPrice>
            {`${product.pointForExchanging} point `}
            Please Capture this picture and Show to get a coupon with staff
          </ProductPrice>
        </ProductInfo>
      </ProductCard>
    </>
  );
}

export default ConfirmProduct;
