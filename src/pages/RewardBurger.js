import React from 'react';
import Hero from '../components/Hero';
import { GlobalStyle } from '../globalStyles';
import Products from '../components/Products';
import { productData, productDataTwo, productDataThree } from '../components/Products/data';
import Footer from '../components/Footer';

function RewardBurger({ user, role, setRole }) {
  console.log(role);
  return (
    <>
      <GlobalStyle />
      <Hero user={user} role={role} setRole={setRole} />
      <Products heading="Reward Products" data={productData} />
      <Footer />
    </>
  );
}

export default RewardBurger;
