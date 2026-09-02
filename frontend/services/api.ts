import type { Addon, Category, Product } from '../types';

const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

type ApiCategory = {
  _id: string;
  name: string;
  slug: string;
  image?: string;
};

type ApiAddon = {
  _id: string;
  name: string;
  price: number;
};

type ApiProduct = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: ApiCategory;
  addons: ApiAddon[];
  image?: string;
  isFeatured?: boolean;
  isPopular?: boolean;
};

export type CreateOrderPayload = {
  orderType: 'delivery' | 'pickup';
  customerName: string;
  phone: string;
  address?: string;
  landmark?: string;
  pickupTime?: string;
  specialInstructions?: string;
  items: Array<{
    productId: string;
    quantity: number;
    selectedAddonIds: string[];
    specialInstructions?: string;
  }>;
};

type CreateOrderResult = {
  orderNumber: string;
  total: number;
  status: string;
  _id: string;
};

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
  });

  const body = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !body.success) {
    throw new Error(body.message || 'API request failed');
  }

  return body.data;
}

function mapCategory(category: ApiCategory): Category {
  return {
    // The customer UI uses the category slug as its stable category key.
    // MongoDB's _id stays on the backend; product/order IDs still use MongoDB IDs.
    id: category.slug,
    name: category.name,
    slug: category.slug,
    image: category.image || undefined,
  };
}

function mapAddon(addon: ApiAddon): Addon {
  return {
    id: addon._id,
    name: addon.name,
    price: addon.price,
  };
}

function mapProduct(product: ApiProduct): Product {
  return {
    // Product id MUST be the MongoDB _id because checkout sends it as productId.
    id: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category.slug,
    image: product.image || undefined,
    addons: product.addons.map((addon) => addon._id),
    featured: Boolean(product.isFeatured),
    popular: Boolean(product.isPopular),
  };
}

export async function getMenuData(): Promise<{
  categories: Category[];
  addons: Addon[];
  products: Product[];
}> {
  const [apiCategories, apiAddons, apiProducts] = await Promise.all([
    request<ApiCategory[]>('/categories'),
    request<ApiAddon[]>('/addons'),
    request<ApiProduct[]>('/products'),
  ]);

  return {
    categories: apiCategories.map(mapCategory),
    addons: apiAddons.map(mapAddon),
    products: apiProducts.map(mapProduct),
  };
}

export function createOrder(payload: CreateOrderPayload) {
  return request<CreateOrderResult>('/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
