import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './common/logger/logger.middleware';
import { UrlModule } from './url/url.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [UrlModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule  implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}