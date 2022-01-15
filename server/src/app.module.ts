import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware';
import { UrlModule } from './url/url.module';

@Module({
  imports: [UrlModule],
  controllers: [],
  providers: [],
})
export class AppModule  implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestIdMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}