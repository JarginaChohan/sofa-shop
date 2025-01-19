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
              <a
                href="#"
                className="text-blue-500 underline hover:text-blue-600 mt-4 inline-block"
              >
                View More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListFeature;
