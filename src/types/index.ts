
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  category: string;
  subcategory: string;
  supplier: string;
  stock: number;
  sku: string;
  isBestSeller: boolean;
  availableFrom: number;
  brand: string;
  longDescription?: string;
  uom?: string; // Unit of Measure (e.g., "Box", "Bottle", "Each")
  uomQuantity?: number; // Quantity per UOM (e.g., 100 for "Box of 100")
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  supplier: string;
  tracking?: string;
}

export interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'wholesaler';
  organization: string;
}

export interface Supplier {
  id: number;
  name: string;
  logo: string;
  rating: number;
  productsCount: number;
  isPreferred: boolean;
}
