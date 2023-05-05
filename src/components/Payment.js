import axios from "axios";
import { useState } from "react";
// import "./App.css";



	const initPayment = (data, book) => {
		const options = {
			key: "rzp_test_wVqNyRVh1Gh4nm",
			amount: data.amount,
			currency: data.currency,
			name: book.name,
			description: "Test Transaction",
			image: book.img,
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = "http://localhost:3000/api/payment/verify";
					const { data } = await axios.post(verifyUrl, response);
					console.log(data);
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
//         const rzp = new window.Razorpay();
// rzp.createPayment(options);
	};

	const handlePayment = async (book) => {
		try {
			const orderUrl = "http://localhost:3000/api/payment/orders/pay";
			const { data } = await axios.post(orderUrl, { amount: book.price });
			console.log(data);
			initPayment(data.data, book);
		} catch (error) {
			console.log(error);
		}
	};

	// return (
	// 	<div className="App">
	// 		<div className="book_container">
	// 			<img src={book.img} alt="book_img" className="book_img" />
	// 			<p className="book_name">{book.name}</p>
	// 			<p className="book_author">By {book.author}</p>
	// 			<p className="book_price">
	// 				Price : <span>&#x20B9; {book.price}</span>
	// 			</p>
	// 			<button onClick={handlePayment} className="buy_btn">
	// 				buy now
	// 			</button>
	// 		</div>
	// 	</div>

export default handlePayment;