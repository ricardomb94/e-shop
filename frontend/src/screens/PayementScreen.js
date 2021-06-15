import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

const PayementScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("shipping");
  }

  const [payementMethod, setPayementMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(payementMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Methode de Payement</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Choisissez votre méthode</Form.Label>

          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="payementMethod"
              value="PayPal"
              onChange={(e) => setPayementMethod(e.target.value)}
            ></Form.Check>
            {/* <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="payementMethod"
              value="Stripe"
              onChange={(e) => setPayementMethod(e.target.value)}
            ></Form.Check> */}
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continuez
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PayementScreen;
