"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";

// Define TypeScript interface for product
interface Product {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
}

const Display: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Fetch the latest product from the "bed" category
    client
      .fetch(
        `*[_type == "product" && category == "Bed"] | order(_createdAt desc)[0] {
          "id": _id,
          name,
          "imageUrl": imagePath.asset->url,
          category
        }`
      )
      .then((data: Product) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, []);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="p-8 bg-[#fff9e5] min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] items-center w-full max-w-6xl mx-auto">
        {/* Image Section */}
        <div className="flex justify-end items-center">
          <div className="rounded-lg w-full max-w-[500px] md:max-w-[863px] sm:mx-auto ">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={1000}
              height={1000}
              className="w-[600px] h-auto rounded-lg"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="text-center md:text-left flex justify-center items-center flex-col gap-4">
          <h3 className="text-lg font-semibold text-gray-600 uppercase tracking-wider">
            New Arrival
          </h3>
          <h1 className="text-4xl md:text-[64px] font-medium text-gray-800 leading-tight">
            {product.name}
          </h1>
          <button className="bg-gray-800 text-white py-4 px-8 rounded-md hover:bg-gray-700 transition">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Display;
