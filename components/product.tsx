"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

// Define TypeScript interface for product
interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  category: string;
}

const ProductGridList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch one product per category from Sanity
    client
      .fetch(
        `*[_type == "product"] {
          "id": _id,
          name,
          "imageUrl": imagePath.asset->url,
          price,
          category
        } | order(_createdAt desc) [0...4]`
      )
      .then((data: Product[]) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="bg-white px-6 py-12">
      {/* Heading Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-black">Top Picks For You</h2>
        <p className="text-gray-500 mt-2">
          Find a bright idea to suit your taste with our great selection of
          suspension, floor, and table lights.
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105"
          >
            {/* Image */}
            <div className="w-full h-[200px] overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={400}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-md font-bold text-gray-600 mt-2">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="text-center mt-8">
        <a
          href="#"
          className="text-black text-lg underline decoration-2 hover:text-gray-600"
        >
          View More
        </a>
      </div>
    </div>
  );
};

export default ProductGridList;
