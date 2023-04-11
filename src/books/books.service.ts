import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, BookDocument } from './entities/book.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: Model<BookDocument>,
  ) {}
  create(createBookDto: CreateBookDto) {
    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save();
  }

  findAll() {
    return this.bookModel.find();
  }

  findOne(id: string) {
    return this.bookModel.findById(id);
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return this.bookModel.findByIdAndUpdate(id, updateBookDto);
  }

  remove(id: string[]) {
    return this.bookModel.deleteMany({ _id: { $in: id } });
  }
}
