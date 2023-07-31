import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Form, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch } from "react-redux"
import { useGetProductDetailsQuery } from '../slices/productApiSlice'
import { addToCart } from '../slices/cartSlice'

export const QtyBtn = ({ product, value, onChangeCallback }) => {
  return (
    <ListGroup.Item>
      <Row>
        <Col> Qty: </Col>
        <Col>
          <Form.Control 
            as='select'
            value={value}
            onChange={onChangeCallback}
          >
            { 
              [...Array(product.countInStock).keys()].map((x) => 
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              )
            }
          </Form.Control>
        </Col>
      </Row>
    </ListGroup.Item>
  )
}

const ProductScreen = () => {

  const disPatch = useDispatch()
  const navigate = useNavigate()

  const { id: productId } = useParams()
  const [qty, setQty] = useState(1)

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId)

  const addToCartHandler = () => {
    disPatch(addToCart({ ...product, qty }))
    navigate('/cart')
  }

  if (isLoading) {
    return <Loader/>
  }

  if (error) {
    return <Message variant='danger'> {error.data?.message || error.error} </Message>

  }

  return (
    <>
      <Link className="btn btn-light my-3" to='/'>
        Go Back
      </Link>

      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews}`} />
            </ListGroup.Item>
            <ListGroup.Item>
              <ListGroup.Item> Price: ${product.price} </ListGroup.Item>
              <ListGroup.Item> Description: {product.description} </ListGroup.Item>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col> Price: </Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col> Status: </Col>
                  <Col>
                    <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && <QtyBtn product={product} value={qty} onChangeCallback={(e) => {setQty(Number(e.target.value))}}/>}

              <ListGroup.Item>
                <Button 
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                  onClick={ addToCartHandler }
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen