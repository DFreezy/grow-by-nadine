import React, { useState } from "react";
import ImageCarousel from "../components/ImageCarousel";

const sanitizeInput = (value, maxLength = 100) => {
  return value
    .replace(/[<>]/g, "")
    .replace(/["'`;]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
};

export default function Products() {
  const products = [
    {
      id: 1,
      name: "Hair Growth Oil",
      price: 120,
      courierfee: 59,
      description: "Natural oils to stimulate healthy hair growth.",
      url: "IMG_1008.jpg",
    },
    {
      id: 2,
      name: "Hair Growth Spray",
      price: 200,
      courierfee: 59,
      description: "Strengthens roots and reduces hair fall.",
      url: "IMG_1011.jpg",
    },
    {
      id: 3,
      name: "Hair Mask",
      price: 200,
      courierfee: 59,
      description: "Cleanses and nourishes the scalp for growth.",
      url: "IMG_1005.jpg",
    },
  ];

  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // ✅ Courier charged ONCE (better UX)
  const courierTotal = cart.length > 0 ? 59 : 0;

  const grandTotal = total + courierTotal;

  // =============================
  // 💳 PAYFAST CHECKOUT
  // =============================
  const payWithPayFast = () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const cleanName = sanitizeInput(customerName, 50);
    const cleanAddress = sanitizeInput(address, 200);

    if (!cleanName || !cleanAddress) {
      alert("Please enter your name and delivery address");
      return;
    }

    const merchant_id = "10046644"; // your real ID
    const merchant_key = "dskrb2ut3r9tg"; // your real key

    const return_url = "https://www.growbynadine.co.za/success";
    const cancel_url = "https://www.growbynadine.co.za/cancel";

    // 🔥 IMPORTANT FIX
    const notify_url = "https://www.growbynadine.co.za/api/notify";

    const amount = grandTotal.toFixed(2);

    const item_name = "Grow By Nadine Order";

    const paymentData = {
      merchant_id,
      merchant_key,
      return_url,
      cancel_url,
      notify_url,
      name_first: cleanName,
      m_payment_id: Date.now().toString(),
      amount,
      item_name,
    };

    const form = document.createElement("form");
    form.method = "POST";

    // 🟢 USE LIVE WHEN READY
    form.action = "https://sandbox.payfast.co.za/eng/process";

    Object.keys(paymentData).forEach((key) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = paymentData[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  // =============================
  // 📲 WHATSAPP CHECKOUT
  // =============================
  const checkoutWhatsApp = () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const cleanName = sanitizeInput(customerName, 50);
    const cleanAddress = sanitizeInput(address, 200);

    if (!cleanName || !cleanAddress) {
      alert("Please enter your name and delivery address");
      return;
    }

    const phoneNumber = "27731577339";

    const orderItems = cart
      .map((item) => `• ${item.name} - R${item.price}`)
      .join("\n");

    const message = `Hello Grow with Nadine 🌿

I would like to place an order:

${orderItems}

Products Total: R${total}
Courier Total: R${courierTotal}

Grand Total: R${grandTotal}

Name: ${cleanName}
Delivery Address: ${cleanAddress}
`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2] font-sans px-4 py-10">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#3f342c]">
          Grow By Nadine
        </h1>
        <p className="text-[#6f6258] mt-2 text-lg">
          Where natural care meets growth
        </p>
      </header>

      <ImageCarousel />

      {/* PRODUCTS */}
      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-lg p-6">
            <img
              src={product.url}
              alt={product.name}
              className="h-40 mx-auto object-contain"
            />

            <h2 className="mt-4 font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600">
              {product.description}
            </p>

            <p className="mt-2 font-bold">R{product.price}</p>

            <button
              onClick={() => addToCart(product)}
              className="mt-3 w-full bg-[#52453a] text-white py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* CART */}
      <div className="mt-16 bg-white p-8 rounded-2xl max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4">🛒 Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between mb-2">
                <span>{item.name}</span>
                <span>R{item.price}</span>
                <button onClick={() => removeFromCart(index)}>
                  ❌
                </button>
              </div>
            ))}

            <hr className="my-4" />

            <p>Products: R{total}</p>
            <p>Courier: R{courierTotal}</p>
            <p className="font-bold">Total: R{grandTotal}</p>

            {/* FORM */}
            <input
              type="text"
              placeholder="Your name"
              value={customerName}
              onChange={(e) =>
                setCustomerName(sanitizeInput(e.target.value, 50))
              }
              className="w-full mt-4 p-2 border"
            />

            <textarea
              placeholder="Delivery address"
              value={address}
              onChange={(e) =>
                setAddress(sanitizeInput(e.target.value, 200))
              }
              className="w-full mt-2 p-2 border"
            />

            {/* BUTTONS */}
            <button
              onClick={checkoutWhatsApp}
              className="mt-4 w-full bg-[#957F6A] text-white py-2 rounded"
            >
              WhatsApp Checkout
            </button>

            <button
              onClick={payWithPayFast}
              className="mt-2 w-full bg-green-600 text-white py-2 rounded"
            >
              Pay with PayFast
            </button>
          </>
        )}
      </div>
    </div>
  );
}