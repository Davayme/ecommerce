import { User } from '@prisma/client';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  save(user: Omit<User, 'id'>): Promise<void>;
}