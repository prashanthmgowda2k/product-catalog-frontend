export interface Product {
  id: number;
  name: string;
  description: string | null;
  brand: string;
  price: number;
  quantity: number;
  categoryName: string;
  averageRating: number;
  reviewCount: number;
  categoryId: number | null;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
}