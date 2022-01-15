import { Controller, Get, Post, Body, Param, Redirect, NotFoundException, InternalServerErrorException } from '@nestjs/common';
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

  @Get(':id')
  @Redirect()
  findOne(@Param('id') longUrl: string) {
    const alias = this.urlService.findOne(longUrl);
    if(alias === undefined) throw new NotFoundException(); 
    return { url: alias }
  }

  // @Delete(':id')`
  // remove(@Param('id') id: string) {
  //   return this.urlService.remove(+id);
  // }
}
