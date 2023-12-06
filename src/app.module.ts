import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { config as dotenvConfig } from 'dotenv';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { ProductTypeModule } from './product-type/product-type.module';
import { PromotionModule } from './promotion/promotion.module';
import { UploadModule } from './upload/upload.module';
import { OrderModule } from './order/order.module';
import { ProductOrder } from './order/entities/productOrder.entity';

dotenvConfig({ path: '.env' });
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_KEY}`,
      signOptions: { expiresIn: '7d' },
    }),
    CacheModule.register({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS,
      ttl: 10000 * 60 * 60,
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveRoot: '/public',
      serveStaticOptions: {
        extensions: ['jpg', 'jpeg', 'png', 'gif'],
        index: false,
      },
    }),
    MongooseModule.forRoot(`${process.env.MONGODB_HOST}`),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: `${process.env.DATABASE_HOST}`,
      port: +process.env.DATABASE_PORT,
      username: `${process.env.DATABASE_USERNAME}`,
      password: `${process.env.DATABASE_PASSWORD}`,
      database: `${process.env.DATABASE_NAME}`,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: ['dist/migrations/*{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      ssl: process.env.NODE_ENV === 'production' ? true : false,
      extra: {
        ssl:
          process.env.NODE_ENV === 'production'
            ? {
                rejectUnauthorized: false,
              }
            : undefined,
      },
    }),
    AuthModule,
    UserModule,
    ProductModule,
    ProductTypeModule,
    PromotionModule,
    ProductOrder,
    UploadModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
