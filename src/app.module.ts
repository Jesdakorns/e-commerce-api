import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config as dotenvConfig } from 'dotenv';
import { CacheModule } from '@nestjs/cache-manager';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// import { AuthModule } from './auth/auth.module';
// import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
dotenvConfig({ path: '.env' });
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveRoot: '/public',
      serveStaticOptions: {
        extensions: ['jpg', 'jpeg', 'png', 'gif'],
        index: false,
      },
    }),
    MulterModule.register({
      dest: './files',
    }),
    CacheModule.register({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS,
      ttl: 10000 * 60 * 60,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: `${process.env.DATABASE_HOST}`,
      port: +process.env.DATABASE_PORT,
      username: `${process.env.DATABASE_USERNAME}`,
      password: `${process.env.DATABASE_PASSWORD}`,
      database: `${process.env.DATABASE_NAME}`,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: ['dist/migrations/*{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      ssl:
        process.env.NODE_ENV === 'production'
          ? {
              rejectUnauthorized: false,
            }
          : undefined,
      extra:
        process.env.NODE_ENV === 'production'
          ? {
              sslmode: 'require',
            }
          : undefined,
    }),
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_KEY}`,
      signOptions: { expiresIn: '7d' },
    }),
    MongooseModule.forRoot(`${process.env.MONGODB_HOST}`),
    // AuthModule,
    // UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
