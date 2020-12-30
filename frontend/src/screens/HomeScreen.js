import React, { useState, useEffect } from 'react';

import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
// import products from '../products';
import axios from 'axios';

const HomeScreen = () => {
  //let define the state
  const [products, setProducts] = useState([]);

  /**
   * Let's make a request to the backend to change the state as soon as
   * the component monte: display products
   */
  useEffect(() => {
    //let's fetch products from our route API
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <>
      <h1 className="text-center">Produits Récents</h1>
      <Row>
        {products.map((product, i) => (
          <Col sm={12} md={6} lg={3} key={i}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
