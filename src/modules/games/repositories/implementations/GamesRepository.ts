import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const games = await this.repository
      .createQueryBuilder('game')
      .select('*')
      .where('title ILIKE(:param)', {param: `%${param}%`})
      .getRawMany()
      return games
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const games = await this.repository.query('SELECT COUNT(*) FROM games'); // Complete usando raw query
    return games
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const users: User[] = await this.repository
      .createQueryBuilder('games')
      .innerJoin('games.users', 'users' )
      .select('users.*')
      .where('games.id = :id', {id})
      .getRawMany()
      return users
      // Complete usando query builder
  }
}
