import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

@Module({
  providers: [],
  exports: [CacheModule.register()],
})
export class RedisModule {}
