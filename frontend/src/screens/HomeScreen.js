import { Col, Row } from 'react-bootstrap';
import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'

import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Product from '../components/Product';
import ProductCarousel from '../components/ProductCarousel';
import {listProducts} from '../actions/productActions'

const HomeScreen = ( { match } ) => {

  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()
  const productList  = useSelector(state => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch( listProducts( keyword, pageNumber ) )
  }, [dispatch, keyword, pageNumber] )


  return (
    <>
      {!keyword && <ProductCarousel className="container" />}
      <h1 className="text-center">Latest Products</h1>
      {loading ? (
        <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
            <>
              <Row>
                {products.map( ( product ) => (
                  <Col key={product._id} sm={12} md={8} lg={4} >
                    <Product product={product} />
                  </Col>
                ) )}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
