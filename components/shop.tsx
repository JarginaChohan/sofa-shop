"use client";

import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";

// Initialize Sanity image URL builder
const builder = imageUrlBuilder(client);

const urlFor = (source: any) => builder.image(source);

const poppins4 = Poppins({
  subsets: ["latin"],
  weight: "400",
});
const poppins5 = Poppins({
  subsets: ["latin"],
  weight: "500",
});

interface Product {
  id: string;
  name: string;
  price: string;
  imagePath: any; // Sanity's image object
}

interface CartItem {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  quantity: number;
}

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    // Fetch products with pagination
    client
      .fetch(
        `{
          "products": *[_type == "product"] | order(_createdAt desc)[${
            (currentPage - 1) * itemsPerPage
          }...${currentPage * itemsPerPage}] {
            "id": _id,
            name,
            price,
            imagePath
          },
          "total": count(*[_type == "product"])
        }`
      )
      .then(({ products, total }: { products: Product[]; total: number }) => {
        setProducts(products);
        setTotalResults(total);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [currentPage, itemsPerPage]);

  const totalPages = Math.ceil(totalResults / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  const addToCart = (product: Product) => {
    const cartData = localStorage.getItem("cart");
    const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];

    const existingItemIndex = cart.findIndex((item) => item.id === product.id);
    if (existingItemIndex !== -1) {
      // Update quantity if the item already exists in the cart
      cart[existingItemIndex].quantity += 1;
    } else {
      // Add new item to the cart
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: urlFor(product.imagePath).url(),
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} has been added to the cart!`);
  };

  return (
    <div className="w-full">
      {/* Banner Section */}
      <div
        className="relative w-full h-60 bg-cover bg-center"
        style={{ backgroundImage: 'url("/bg-shop.png")' }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-50 flex flex-col justify-center items-center">
          <Image
            src="/logo.png"
            alt="logo"
            width={100}
            height={100}
            className="h-[77px] w-[77px]"
          />
          <h1 className={`${poppins5.className} text-3xl text-black`}>Shop</h1>
          <p className={`${poppins4.className} text-sm text-black`}>Home &gt; Shop</p>
        </div>
      </div>

      {/* Toolbar Section */}
      <div className="max-w-[1240px] mx-auto px-4 py-4 flex flex-wrap justify-between items-center bg-[#fdf6f7] border-t border-b">
        <div className={`${poppins4.className} text-sm text-black`}>
          Showing {(currentPage - 1) * itemsPerPage + 1}–
          {Math.min(currentPage * itemsPerPage, totalResults)} of {totalResults} results
        </div>
        <div className="flex items-center gap-4">
          <label className={`${poppins4.className} text-sm text-black`}>Show</label>
          <select
            className="text-sm border px-2 py-1 rounded-md"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="12">12</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[287px] h-[372px] mx-auto flex flex-col items-center text-center rounded-lg"
          >
            {/* Image Container */}
            <div className="w-[287px] h-[200px] overflow-hidden rounded-md">
              {product.imagePath && (
                <Image
                  src={urlFor(product.imagePath).width(287).height(200).url()}
                  alt={product.name}
                  width={287}
                  height={200}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            {/* Product Details */}
            <div className="grid grid-rows-2 gap-2 mt-4 w-full px-2">
              <h3 className="text-start text-[16px] font-medium">
                <Link href={`/shop/product/${product.id}`}>{product.name}</Link>
              </h3>
              <p className="text-start text-[16px] font-semibold">
                ${product.price}
              </p>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 px-4 py-2 bg-black text-white rounded-md"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center gap-4 py-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-md text-black hover:bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 border rounded-md ${
              currentPage === i + 1 ? "bg-black text-white" : "text-black hover:bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-md text-black hover:bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShopPage;
