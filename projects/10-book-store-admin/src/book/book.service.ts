import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { User } from 'src/user/entity/user.entity';
import { DbService } from 'src/db/db.service';

@Injectable()
export class BookService {
  @Inject(DbService)
  private readonly dbService: DbService;

  async list(): Promise<User[]> {
    return Promise.resolve([]);
  }

  async findById(id: string): Promise<User> {
    console.log(id);
    return Promise.resolve(new User());
  }

  async create(createBookDto: CreateBookDto) {
    console.log(createBookDto);
    return Promise.resolve(new User());
  }

  async update(updateBookDto: UpdateBookDto) {
    console.log(updateBookDto);
    return Promise.resolve(new User());
  }

  async delete(id: string) {
    console.log(id);
    return Promise.resolve(new User());
  }
}
