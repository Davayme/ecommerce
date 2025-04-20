export class ProductEntity {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    status: boolean;
    categoryId: number;
    categoryName: string;
    createdAt: Date;
    updatedAt: Date;
  }
  