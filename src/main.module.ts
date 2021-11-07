import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import * as path from 'path';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
import { CatsLoggerMiddleware } from './middleware/catsLogger.middleware';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    AppModule,
    CatsModule,
    UsersModule,
    // 数据库ORM模块
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const { host, port, username, password, database } =
          configService.get('db');
        return {
          type: 'mysql',
          host,
          port,
          username,
          password,
          database,
          // 全局注入是实体
          entities: [path.resolve(__dirname, './**/entity/*.entity{.ts,.js}')],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class MainModule implements NestModule {
  constructor(private connection: Connection) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CatsLoggerMiddleware)
      .exclude(
        { path: 'cats/find', method: RequestMethod.GET },
        { path: 'cats/find', method: RequestMethod.POST },
      )
      .forRoutes({ path: 'cats', method: RequestMethod.ALL });

    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
