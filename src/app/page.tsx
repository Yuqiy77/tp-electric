"use client";

import { getProducts, Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState(getProducts());

  // 监听localStorage变化以更新产品数据
  useEffect(() => {
    const handleStorageChange = () => {
      setProducts(getProducts());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <main className="bg-gray-50 min-h-screen text-gray-800">
      {/* 顶部横幅图 */}
      <div className="w-full max-w-screen-xl mx-auto">
        <header className="relative h-72 w-full text-white">
          {/* 背景图 */}
          <img
            src="/images/banner.jpg"
            alt="Banner"
            className="absolute inset-0 w-full h-full object-cover brightness-90"
          />

          {/* 中间标题（居中定位） */}
          <div className="absolute top-[8%] left-1/2 transform -translate-x-1/2 z-10 text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">TP ELECTRIC</h1>
            <p className="text-xs md:text-sm lg:text-base text-blue-100">TechPreciese</p>
            <p className="text-sm md:text-lg lg:text-2xl font-semibold text-white mt-2">Smart Choices, Fair Prices</p>
          </div>
        </header>
      </div>

      {/* 导航栏 */}
      <div className="w-full max-w-screen-xl mx-auto">
        <nav className="flex items-center bg-white text-black p-4 px-8 relative">
          {/* Logo - 左侧 */}
          <div className="flex-shrink-0">
            <img src="/images/logo-tp.png" alt="TP Logo" className="h-16 md:h-24 lg:h-32 w-auto" />
          </div>
          
          {/* 桌面端导航菜单 - 使用Grid布局确保稳定 */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <ul className="flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
              <li><a href="#new" className="hover:text-gray-600 transition-colors px-4 py-2 border-2 border-black rounded-full text-sm lg:text-base whitespace-nowrap font-medium">New Appliances</a></li>
              <li><a href="#used" className="hover:text-gray-600 transition-colors px-4 py-2 border-2 border-black rounded-full text-sm lg:text-base whitespace-nowrap font-medium">Second-Hand</a></li>
              <li><a href="#parts" className="hover:text-gray-600 transition-colors px-4 py-2 border-2 border-black rounded-full text-sm lg:text-base whitespace-nowrap font-medium">Parts</a></li>
              <li><a href="#repair" className="hover:text-gray-600 transition-colors px-4 py-2 border-2 border-black rounded-full text-sm lg:text-base whitespace-nowrap font-medium">Repair</a></li>
              <li><a href="#about" className="hover:text-gray-600 transition-colors px-4 py-2 border-2 border-black rounded-full text-sm lg:text-base whitespace-nowrap font-medium">About</a></li>
              <li><a href="/admin/login" className="hover:text-gray-600 transition-colors px-4 py-2 border-2 border-blue-600 rounded-full text-sm lg:text-base text-blue-600 whitespace-nowrap font-medium">Admin</a></li>
            </ul>
          </div>

          {/* 移动端汉堡菜单按钮 */}
          <button className="md:hidden text-black text-xl ml-auto">
            ☰
          </button>
        </nav>
      </div>

      {/* 内容区域 */}
      <div className="w-full max-w-screen-xl mx-auto px-4">
        {/* 新产品 */}
        <section id="new" className="py-6">
          <h2 className="text-2xl font-bold mb-4">🆕 New Appliances</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.new.map((p: Product) => <ProductCard key={p.id} {...p} />)}
          </div>
        </section>

        {/* 二手产品 */}
        <section id="used" className="py-6 bg-white">
          <h2 className="text-2xl font-bold mb-4">♻️ Second-Hand Appliances</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.used.map((p: Product) => <ProductCard key={p.id} {...p} />)}
          </div>
        </section>

        {/* 零件 */}
        <section id="parts" className="py-6">
          <h2 className="text-2xl font-bold mb-4">🧰 Accessories & Parts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.parts.map((p: Product) => <ProductCard key={p.id} {...p} variant="compact" />)}
          </div>
        </section>

        {/* 维修服务 */}
        <section id="repair" className="py-6 bg-gray-100">
          <h2 className="text-2xl font-bold mb-2">🛠 Stove Repair Services</h2>
          <ul className="list-disc ml-5">
            <li>20 days warranty</li>
            <li>Test before you take</li>
            <li>$50 deposit required for holds over 1 day (non-refundable)</li>
          </ul>
        </section>

        {/* 关于我们 */}
        <section id="about" className="py-6">
          <h2 className="text-2xl font-bold mb-2">📌 About TP (TECHPRECIES) ELECTRIC</h2>
          <p className="text-gray-700">
            Looking for a reliable stove without breaking the bank? 🔥<br /><br />
            We offer high-quality, second-hand stoves that have been carefully inspected and refurbished to ensure they're in top working condition.
            Whether you're upgrading your kitchen or need a dependable appliance, we've got the perfect stove for you at an unbeatable price.<br /><br />
            We also specialize in affordable, quick stove repairs to get you cooking again with confidence.
          </p>
        </section>
      </div>

      {/* 营业时间 */}
      <footer className="bg-black text-white text-center py-6 mt-10">
        <p>Business Hours:</p>
        <p>Mon–Fri: 9:00 AM – 9:00 PM</p>
        <p>Sat–Sun: 8:30 AM – 8:00 PM</p>
        <p className="text-xs mt-2">© {new Date().getFullYear()} TP (TECHPRECIES) ELECTRIC</p>
      </footer>
    </main>
  );
}
