import React from "react";

const PaymentCheckout = () => {
  const handlePayment = () => {
    const options = {
      key: "", // Empty key to prevent real transactions
      amount: 100 * 100, // Amount in paise (₹100)
      currency: "INR",
      name: "Demo Payment",
      description: "Test Transaction",
      image: "https://your-logo-url.com/logo.png",
      handler: function (response) {
        alert("Payment Interface Opened, but no transaction processed.");
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div>
      <button onClick={handlePayment}>Pay with Razorpay</button>
    </div>
  );
};

export default PaymentCheckout;
