import React, { useState } from "react";

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
      name: "Hair Growth Mask",
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
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const courierTotal = cart.reduce((sum, item) => sum + item.courierfee, 0);
  const grandTotal = total + courierTotal;

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

      {/* HEADER */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#3f342c]">
          🌿 Grow with Nadine
        </h1>
        <p className="text-[#6f6258] mt-2 text-lg">
          Healthy hair starts at the root
        </p>
      </header>

      {/* PRODUCTS */}
      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden"
          >
            {/* IMAGE */}
            <div className="bg-[#f4f1ec] flex justify-center items-center p-6">
              <img
                alt={product.name}
                src={product.url}
                className="h-48 object-contain"
              />
            </div>

            {/* CONTENT */}
            <div className="p-6 space-y-3">
              <h2 className="text-lg font-semibold text-[#3f342c]">
                {product.name}
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>

              <strong className="block text-lg text-[#957F6A]">
                R{product.price}
              </strong>

              <p className="text-sm text-gray-500">
                Courier fee: R{product.courierfee}
              </p>

              <button
                onClick={() => addToCart(product)}
                className="mt-2 w-full py-2.5 bg-[#52453a] text-white rounded-lg hover:bg-[#3f342c] transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CART */}
      <div className="mt-16 bg-white p-8 rounded-2xl shadow-lg max-w-lg mx-auto">
        <h2 className="text-xl font-semibold text-[#3f342c] mb-5">
          🛒 Cart
        </h2>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            Your cart is empty
          </p>
        ) : (
          <>
            {/* CART ITEMS */}
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-12 h-12 object-contain rounded-md bg-[#f4f1ec] p-1"
                    />
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-sm text-[#957F6A]">
                        R{item.price}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-sm text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* TOTAL SUMMARY */}
            <div className="mt-6 border-t pt-4 space-y-2 text-sm">

              <div className="flex justify-between">
                <span>Products</span>
                <span>R{total}</span>
              </div>

              <div className="flex justify-between">
                <span>Courier</span>
                <span>R{courierTotal}</span>
              </div>

              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total</span>
                <span className="text-[#957F6A]">R{grandTotal}</span>
              </div>

            </div>

            {/* FORM */}
            <div className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Your name"
                value={customerName}
                maxLength={50}
                required
                onChange={(e) =>
                  setCustomerName(sanitizeInput(e.target.value, 50))
                }
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#957F6A]"
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
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#957F6A]"
              />
            </div>

            <button
              onClick={checkoutWhatsApp}
              className="mt-6 w-full py-3 bg-[#957F6A] text-white rounded-xl hover:bg-[#7f6a58] transition font-medium"
            >
              Checkout via WhatsApp
            </button>
          </>
        )}
      </div>
    </div>
  );
}