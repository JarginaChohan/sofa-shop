"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

// Define TypeScript interface for product
interface Product {
  name: string;
  imageUrl: string;
  description: string;
}

interface CartItem {
  name: string;
  imageUrl: string;
  description: string;
  quantity: number;
}

const ProductListFeature: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch the latest two products from Sanity
    client
      .fetch(
        `*[_type == "product"] | order(_createdAt desc)[0...2] {
          name,
          "imageUrl": imagePath.asset->url,
          description
        }`
      )
      .then((data: Product[]) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const addToCart = (product: Product) => {
    const cartData = localStorage.getItem("cart");
    const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];

    const existingItemIndex = cart.findIndex((item) => item.name === product.name);
    if (existingItemIndex !== -1) {
      // Increase quantity if the item is already in the cart
      cart[existingItemIndex].quantity += 1;
    } else {
      // Add new item to the cart
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} has been added to the cart!`);
  };

  return (
    <div className="bg-[#FAF4F4] px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105"
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={600}
              height={400}
              className="w-full object-cover"
            />
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListFeature;
