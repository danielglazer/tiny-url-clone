import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';

@Injectable()
export class UrlService {
  create(createUrlDto: CreateUrlDto) {
    return 'This action adds a new url';
  }

  // findAll() {
  //   return `This action returns all url`;
  // }

  findOne(_longUrl: string): string {
    return 'https://www.digitalocean.com/';
  }

  // remove(id: number) {
  //   return `This action removes a #${id} url`;
  // }
}
