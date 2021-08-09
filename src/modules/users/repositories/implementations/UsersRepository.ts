import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.findOne({ relations: ['games'], where: { id: user_id }})
    return user
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const users = await this.repository.query('SELECT * FROM users ORDER BY first_name ASC'); // Complete usando raw query
    return users
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const users = await this.repository.query(`SELECT email, first_name, last_name FROM users WHERE users.first_name ILIKE '${first_name}' AND users.last_name ILIKE '${last_name}'`); // Complete usando raw query
    return users
  }
}
