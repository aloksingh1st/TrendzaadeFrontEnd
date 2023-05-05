import React from "react";
import axios from "axios";

function RazorpayPaymentScreen(){
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await axios.post("/api/payment/orders");

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        // const {logo} = "https://img.freepik.com/free-vector/people-logo-luxury-gradient-design-illustration_483537-1452.jpg"

        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: "rzp_test_OtYQpHZwPpuyIg", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "TrendZaade",
            description: "Pay Now Get Delivered",
            image: "https://img.freepik.com/free-vector/people-logo-luxury-gradient-design-illustration_483537-1452.jpg",
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

            },
            prefill: {
                name: "",
                email: "",
                contact: "",
            },
            notes: {
                address: "Trendzaade Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src="https://img.freepik.com/free-vector/people-logo-luxury-gradient-design-illustration_483537-1452.jpg" className="App-logo" alt="logo" />
                <p>Buy React now!</p>
                <button className="App-link" onClick={displayRazorpay}>
                    Pay ₹500
                </button>
            </header>
        </div>
    );
}

export default RazorpayPaymentScreen;