import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UrlRepository } from './url.repository';

@Injectable()
export class UrlService {
  constructor(private readonly urlRepository: UrlRepository) {}

  create(createUrlDto: CreateUrlDto) {
    this.urlRepository.updateUrl(createUrlDto);
  }

  // findAll() {
  //   return `This action returns all url`;
  // }

  async findOne(alias: string): Promise<string> {
    return (await this.urlRepository.getUrl(alias))?.Item['longUrl'];
  }

  remove(alias: string) {
    return this.urlRepository.deleteUrl(alias);
  }
}
