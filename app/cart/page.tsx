"use client";

import React, { useEffect, useState } from "react";

interface CartItem {
  name: string;
  imageUrl: string;
  description: string;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleRemoveFromCart = (itemName: string) => {
    const updatedCart = cart.filter((item) => item.name !== itemName);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li
              key={`${item.name}-${index}`} // Unique key using name and index
              className="flex items-center justify-between border-b py-2"
            >
              <div>
                <h2 className="text-lg font-medium">{item.name}</h2>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <div className="flex items-center">
                <p className="mr-4">Qty: {item.quantity}</p>
                <button
                  onClick={() => handleRemoveFromCart(item.name)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
