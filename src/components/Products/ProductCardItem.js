import React from 'react';
import { useState } from 'react';
import { notification } from 'antd';
import LocalStorageService from '../../services/LocalStorageService';
import {
  ProductTitle,
  ProductCard,
  ProductImg,
  ProductInfo,
  ProductDesc,
  ProductPrice,
  ProductButton,
} from './ProductsElements';

import { Modal } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function ProductCardItem({ product, index }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const history = useHistory();

  const showModal = () => {
    console.log('object');
    setIsModalVisible(true);
  };

  const handleOk = () => {
    axios
      .post('/points', { reward_id: product.id })
      .then((res) => {
        notification.success({
          description: 'Redeem success.',
        });
        history.push(`/confirm/${product.id}`);
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          description: 'Redeem failed.',
        });
      });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <ProductCard key={index}>
        <ProductImg src={product.picture} alt={product.alt} />
        <ProductInfo>
          <ProductTitle>{product.name}</ProductTitle>
          <ProductDesc>{product.description}</ProductDesc>
          <ProductPrice>{`${product.pointForExchanging} point `}</ProductPrice>
          <ProductButton type="primary" onClick={showModal}>
            Redemption
          </ProductButton>{' '}
          <Modal title="Reward products" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            {' '}
          </Modal>
        </ProductInfo>
      </ProductCard>
    </>
  );
}

export default ProductCardItem;
