"use client";
import Layout from "@/src/components/layout";
import { ThemeModeContext } from "@/src/contexts/themeMode";
import { colors } from "@/src/styles/theme/colors";
import { useContext } from "react";
import Link from "next/link";

// Mock data - replace with your actual data source
const products = [
  {
    id: 1,
    name: "محصول ۱",
    description: "توضیحات محصول ۱",
    price: "۱۰۰,۰۰۰ تومان",
    image: "/product1.jpg"
  },
  {
    id: 2,
    name: "محصول ۲",
    description: "توضیحات محصول ۲",
    price: "۲۰۰,۰۰۰ تومان",
    image: "/product2.jpg"
  },
  // Add more products as needed
];

export default function Products() {
  const { theme } = useContext(ThemeModeContext);
  const currentColor = colors[theme];

  return (
    <Layout>
      <div className="h-[50px]"></div>
      
      <div className="container mx-auto px-4 py-12">
        <h1 style={{ color: currentColor.text }} className="text-4xl font-bold text-center mb-8">محصولات ما</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <div 
                style={{ 
                  backgroundColor: currentColor.background, 
                  boxShadow: `1px 1px 10px 3px ${currentColor.primary}`
                }} 
                className="p-6 rounded-lg text-center cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="mb-4">
                  {/* <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/300x200";
                    }}
                  /> */}
                </div>
                <h3 style={{ color: currentColor.text }} className="text-xl font-semibold mb-2">
                  {product.name}
                </h3>
                <p style={{ color: currentColor.text }} className="mb-4">
                  {product.description}
                </p>
                <p style={{ color: currentColor.primary }} className="text-lg font-bold">
                  {product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
} 