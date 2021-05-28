import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import {logout} from '../actions/usersActions'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const logoutHandler = () =>{
    dispatch(logout());
  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>E-Shop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>Panier
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Se déconnecter</NavDropdown.Item>
                </NavDropdown>
              ): <LinkContainer to="/login">
              <Nav.Link>
                <i className="fas fa-user"></i>Se connecter
              </Nav.Link>
            </LinkContainer>}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
