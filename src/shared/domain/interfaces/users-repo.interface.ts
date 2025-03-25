import { Auth, User } from '#domain/types';

export interface IUsersRepo {
  findById(id: User.Entity['id']): Promise<User.Entity | null>;
  findOrCreate(input: User.CreateDTO): Promise<User.Entity>;
  findBySub(sub: string): Promise<User.Entity | null>;
  upsertFromCognito(user: Auth.ProviderUser): Promise<User.Entity>;
}
