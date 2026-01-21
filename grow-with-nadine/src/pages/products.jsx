import React, { useState } from "react";

const sanitizeInput = (value, maxLength = 100) => {
  return value
    .replace(/[<>]/g, "")          // remove HTML tags
    .replace(/["'`;]/g, "")        // remove JS-breaking chars
    .replace(/\s+/g, " ")          // normalize whitespace
    .trim()
    .slice(0, maxLength);
};

export default function Products() {
  const products = [
    {
      id: 1,
      name: "Hair Growth Oil",
      price: 199,
      description: "Natural oils to stimulate healthy hair growth.",
    },
    {
      id: 2,
      name: "Scalp Growth Serum",
      price: 249,
      description: "Strengthens roots and reduces hair fall.",
    },
    {
      id: 3,
      name: "Herbal Growth Shampoo",
      price: 179,
      description: "Cleanses and nourishes the scalp for growth.",
    },
  ];

  const [cart, setCart] = useState([]);
   const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };


  const total = cart.reduce((sum, item) => sum + item.price, 0);

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
    .map((item) => `${item.name} - R${item.price}`)
    .join("\n");

  const message = `Hello Grow with Nadine 🌿

I would like to place an order:

${orderItems}

Total: R${total}

Name: ${cleanName}
Delivery Address: ${cleanAddress}
`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  window.open(whatsappUrl, "_blank");
};

  return (
    <div className="font-sans p-5">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold pt-5">🌿 Grow with Nadine</h1>
        <p className="text-gray-600">Healthy hair starts at the root</p>
      </header>

      {/* PRODUCTS */}
      <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-5 rounded-xl shadow-md"
          >
            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <strong className="block mt-2">R{product.price}</strong>

            <button
              onClick={() => addToCart(product)}
              className="mt-3 w-full p-2.5 bg-[#52453a] text-white rounded-md hover:bg-[#3f342c] transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* CART (SMALL & CLEAN) */}
      <div className="mt-10 bg-white p-5 rounded-xl max-w-md mx-auto">
        <h2 className="font-semibold mb-3">🛒 Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between text-sm my-1">
                <span>{item.name}</span>
                <span>R{item.price}</span>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-500 hover:underline ml-4"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="flex justify-between font-semibold mt-3 border-t pt-2">
              <span>Total</span>
              <span>R{total}</span>
            </div>
             
               <div className="mt-5 space-y-3">
             <input
  type="text"
  placeholder="Your name"
  value={customerName}
  maxLength={50}
  required
  onChange={(e) =>
    setCustomerName(sanitizeInput(e.target.value, 50))
  }
  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#957F6A]"
/>


  <textarea
  placeholder="Delivery address"
  value={address}
  maxLength={200}
  required
  rows={3}
  onChange={(e) =>
    setAddress(sanitizeInput(e.target.value, 200))
  }
  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#957F6A]"
/>
            </div>

            <button
              onClick={checkoutWhatsApp}
              className="mt-4 w-full p-3 bg-[#957F6A] text-white rounded-lg hover:bg-[#7f6a58] transition"
            >
              Checkout via WhatsApp
            </button>
          </>
        )}
      </div>
    </div>
  );
}
