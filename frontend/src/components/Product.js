import { Button, Card } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card border="secondary" className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" className="rounded" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="text-center">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="h3" className="text-center">{product.price}$<Link to={`/product/${product._id}`}>
          <Button variant="dark custom-blue rounded" className="shadow-lg ml-5">Order now</Button>
        </Link></Card.Text>

        <hr />
        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
