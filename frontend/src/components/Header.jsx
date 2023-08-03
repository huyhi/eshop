import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { FaShoppingCart, FaUser} from 'react-icons/fa'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import { useSelector, useDispatch } from 'react-redux'

const SignInBtn = () => {
  return (
    <LinkContainer to='/login'>
      <Nav.Link>
        <FaUser /> Sign In
      </Nav.Link>
    </LinkContainer>
  )
}

const LoggedInBtn = ({user}) => {

  const dispath = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispath(logout())
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <NavDropdown title={`${user.name}`} id='username'>
        <LinkContainer to='/profile'>
          <NavDropdown.Item>Profile</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Item onClick={logoutHandler}>
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </>
  )
}

export default function Header() {

  const { cartItems } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.auth)

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand> Proshop </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>

              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {
                    cartItems.length > 0 && 
                    <Badge pill style={{ marginLeft: '5px'}}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  }
                </Nav.Link>
              </LinkContainer>

              { userInfo ? <LoggedInBtn user={userInfo}/> : <SignInBtn/> }

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}