import { ProductEntity } from '../entities/product.entity';

export interface IProductRepository {
  findAll(): Promise<ProductEntity[]>;
  create(data: Partial<ProductEntity>): Promise<ProductEntity>;
  update(id: number, data: Partial<ProductEntity>): Promise<ProductEntity>;
  softDelete(id: number): Promise<ProductEntity>;
  findById(id: number): Promise<ProductEntity>;
}