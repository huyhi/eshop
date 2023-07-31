import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import { addToCart, removeFromCart } from '../slices/cartSlice'
import Message from '../components/Message'

const EmptyCartMessage = () => {
  return (
    <Message>
      Your cart is empty <Link to='/'> Go Back </Link>
    </Message>
  )
}

const ItemList = ({cartItems}) => {

  const dispatch = useDispatch()

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }))
  }

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id))
  }

  return (
    <ListGroup variant='flush'>
      {
        cartItems.map((item) => (
          <ListGroup.Item>
            <Row>
              <Col md={2}>
                <Image src={item.image} alt={item.name} fluid rounded></Image>
              </Col>
              <Col md={3}>
                <Link to={`/product/${item._id}`}> {item.name} </Link>
              </Col>
              <Col md={2}> ${item.price} </Col>
              <Col md={2}>
                <Form.Control 
                  as='select'
                  value={item.qty}
                  onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                >
                { 
                  [...Array(item.countInStock).keys()].map((x) => 
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  )
                }
                </Form.Control>
              </Col>
              <Col md={2}>
                <Button
                  type='button'
                  variant='light'
                  onClick={ () => removeFromCartHandler(item._id) }
                >
                  <FaTrash />
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))
      }
    </ListGroup>
  )
}

export default function CartScreen() {
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const checkOutHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1 style={{marginBottom: '20px'}}> Shopping Cart </h1>
        {
          cartItems.length === 0 ? <EmptyCartMessage/> : <ItemList cartItems={cartItems} />
        }
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2> 
                Subtotal 
                ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) 
                items
              </h2>
              ${ cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2) }
            </ListGroup.Item>
            <ListGroup.Item>
              <Button 
                type='button' 
                className='btn-block' 
                disabled={cartItems.length === 0}
                onClick={(e) => {checkOutHandler()}}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}
