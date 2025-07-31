"use client";

import { useState } from 'react';
import { Product } from '@/data/products';

interface ProductCardProps extends Product {
  variant?: 'default' | 'compact';
  onImageUpload?: (productId: string, images: string[]) => void;
}

export default function ProductCard({ 
  id,
  name, 
  description, 
  condition, 
  price, 
  images, 
  variant = 'default',
  onImageUpload
}: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const uploadedImages: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('image', file);
        
        // 这里应该调用你的图片上传API
        // 暂时使用本地URL作为示例
        const imageUrl = URL.createObjectURL(file);
        uploadedImages.push(imageUrl);
      }

      if (onImageUpload) {
        onImageUpload(id, uploadedImages);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${variant === 'compact' ? 'max-w-sm' : ''}`}>
      {/* 图片区域 */}
      <div className="relative aspect-[4/3] bg-gray-100">
        {images && images.length > 0 ? (
          <>
            <img
              src={images[currentImageIndex]}
              alt={name}
              className="w-full h-full object-contain"
            />
            
            {/* 图片导航按钮 - 只在有多张图片时显示 */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70 transition-all"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70 transition-all"
                >
                  ›
                </button>
                
                {/* 图片指示器 */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* 上传按钮 */}
            <div className="absolute top-2 right-2">
              <label className="cursor-pointer bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
                {isUploading ? 'Uploading...' : 'Upload'}
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
            <span>No Image</span>
            <label className="cursor-pointer bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors mt-2">
              {isUploading ? 'Uploading...' : 'Upload Image'}
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isUploading}
              />
            </label>
          </div>
        )}
      </div>

      {/* 产品信息 */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
          <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
            {condition}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-green-600">${price}</span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
} 