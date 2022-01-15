import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { UrlRepository } from './url.repository';

@Module({
  controllers: [UrlController],
  providers: [UrlService, UrlRepository]
})
export class UrlModule {}
