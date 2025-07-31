export interface Product {
  id: string;
  name: string;
  description: string;
  condition: string;
  price: number;
  images: string[]; // 改为数组支持多张图片
}

// 从localStorage获取产品数据，如果没有则使用默认数据
const getStoredProducts = () => {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem('tp-electric-products');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing stored products:', e);
    }
  }
  return null;
};

// 保存产品数据到localStorage
export const saveProducts = (products: any) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('tp-electric-products', JSON.stringify(products));
};

// 默认产品数据
const defaultProducts = {
  new: [
    {
      id: 'n1',
      name: 'Brand New Fridge',
      description: 'Stainless steel, energy-efficient 28 cu ft fridge.',
      condition: 'New',
      price: 899,
      images: ['/images/fridge1.jpg', '/images/fridge1-2.jpg', '/images/fridge1-3.jpg'],
    },
    {
      id: 'n2',
      name: 'New Electric Range',
      description: '30" electric range with 4 burners and self-cleaning oven.',
      condition: 'New',
      price: 650,
      images: ['/images/stove2.jpg', '/images/stove2-2.jpg'],
    },
    {
      id: 'n3',
      name: 'New Dishwasher',
      description: 'Built-in dishwasher with quiet operation.',
      condition: 'New',
      price: 450,
      images: ['/images/dishwasher1.jpg', '/images/dishwasher1-2.jpg'],
    },
  ],
  used: [
    {
      id: 'u1',
      name: 'Used Electric Stove',
      description: 'Tested & refurbished. Comes with 20-day warranty.',
      condition: 'Used',
      price: 350,
      images: ['/images/stove1.jpg', '/images/stove1-2.jpg', '/images/stove1-3.jpg'],
    },
    {
      id: 'u2',
      name: 'Used Refrigerator',
      description: 'Good condition, energy efficient, ready to use.',
      condition: 'Used',
      price: 250,
      images: ['/images/fridge2.jpg', '/images/fridge2-2.jpg'],
    },
    {
      id: 'u3',
      name: 'Used Stove',
      description: 'Well-maintained stove, perfect for small kitchens.',
      condition: 'Used',
      price: 200,
      images: ['/images/stove3.jpg', '/images/stove3-2.jpg'],
    },
  ],
  parts: [
    {
      id: 'p1',
      name: 'Oven Knob Replacement',
      description: 'Fits GE models, durable plastic.',
      condition: 'New',
      price: 15,
      images: ['/images/knob1.jpg', '/images/knob1-2.jpg'],
    },
    {
      id: 'p2',
      name: 'Stove Burner Element',
      description: 'Universal fit burner element for electric stoves.',
      condition: 'New',
      price: 25,
      images: ['/images/burner1.jpg', '/images/burner1-2.jpg'],
    },
    {
      id: 'p3',
      name: 'Thermostat Control',
      description: 'Oven thermostat replacement part.',
      condition: 'New',
      price: 35,
      images: ['/images/thermostat1.jpg', '/images/thermostat1-2.jpg'],
    },
  ],
};

// 获取产品数据（优先使用localStorage中的数据）
export const getProducts = () => {
  const stored = getStoredProducts();
  return stored || defaultProducts;
};

// 更新产品数据
export const updateProducts = (category: 'new' | 'used' | 'parts', products: Product[]) => {
  const currentProducts = getProducts();
  const updatedProducts = {
    ...currentProducts,
    [category]: products
  };
  saveProducts(updatedProducts);
  return updatedProducts;
}; 