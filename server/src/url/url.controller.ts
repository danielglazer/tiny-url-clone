import { Controller, Get, Post, Body, Param, Redirect, NotFoundException, InternalServerErrorException, Delete } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) { }

  @Post()
  create(@Body() createUrlDto: CreateUrlDto) {
    try {
      this.urlService.create(createUrlDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // @Get()
  // findAll() {
  //   return this.urlService.findAll();
  // }

  @Get(':alias')
  @Redirect()
  async findOne(@Param('alias') alias: string) {
    const longUrl = await this.urlService.findOne(alias);
    if(longUrl === undefined) throw new NotFoundException(); 
    return { url: longUrl }
  }

  @Delete(':alias')
  async remove(@Param('alias') alias: string): Promise<void> {
    await this.urlService.remove(alias);
  }
}
