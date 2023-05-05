// import React, { useContext, useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { useNavigate } from 'react-router-dom';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import CheckoutSteps from '../components/CheckoutSteps';
// import { Store } from '../Store';
// import Payment from '../components/Payment';
// import handlePayment from '../components/Payment';

// export default function PaymentMethodScreen() {


//   const [book, setBook] = useState({
// 		name: "Trendzaade",
// 		author: "ALok",
// 		img: "./images/text_logo.png",
// 		price: 250,
// 	});



//   const navigate = useNavigate();
//   const { state, dispatch: ctxDispatch } = useContext(Store);
//   const {
//     cart: { shippingAddress, paymentMethod },
//   } = state;

//   const [paymentMethodName, setPaymentMethod] = useState(
//     paymentMethod || 'PayPal'
//   );

//   useEffect(() => {
//     if (!shippingAddress.address) {
//       navigate('/shipping');
//     }
//   }, [shippingAddress, navigate]);
//   const submitHandler = (e) => {
//     e.preventDefault();
//     ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
//     localStorage.setItem('paymentMethod', paymentMethodName);
//     navigate('/placeorder');
//   };



//   return (



//     <div>
//       <CheckoutSteps step1 step2 step3></CheckoutSteps>
//       <div className="container small-container">
//         <Helmet>
//           <title>Payment Method</title>
//         </Helmet>
//         <h1 className="my-3">Payment</h1>
       
//             <Button type="submit" onClick={(()=>{handlePayment(book)})}>Pay Now</Button>
  
//       </div>
//     </div>
//   );
// }


import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';



export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;


  // const { state, dispatch: ctxDispatch } = useContext(Store);
  // const { cart, userInfo } = state;

  // const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  // cart.itemsPrice = round2(
  //   cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  // );
  // cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  // cart.taxPrice = round2(0.15 * cart.itemsPrice);
  // cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;


  // console.log("TNOS");
  // console.log(cart.totalPrice)

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'Razorpay'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayNow"
              label="Pay Now"
              value="Pay Now"
              checked={paymentMethodName === 'PayNow'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayOnDelivery"
              label="Pay On Delivery"
              value="Pay On Delivery"
              checked={paymentMethodName === 'PayOnDelivery'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>

        </Form>
      </div>
    </div>
  );
}