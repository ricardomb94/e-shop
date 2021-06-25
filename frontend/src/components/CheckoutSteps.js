import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const checkoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>Connexion</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Connexion</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>Livraison</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Livraison</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payement">
            <Nav.Link>Payement</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payement</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeholder">
            <Nav.Link>Place Older</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Older</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default checkoutSteps;
