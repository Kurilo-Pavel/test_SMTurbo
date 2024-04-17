import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

// const pg = new URL(process.env.APP_PG_URL);

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: new URL(process.env.APP_PG_URL).hostname,
      port: parseInt(new URL(process.env.APP_PG_URL).port),
      username: new URL(process.env.APP_PG_URL).username,
      password: new URL(process.env.APP_PG_URL).password,
      database: new URL(process.env.APP_PG_URL).pathname.slice(1),
      ssl: new URL(process.env.APP_PG_URL).searchParams.get('sslmode') !== 'disable',
      autoLoadEntities: true,
      // it is unsafe to use synchronize: true for schema synchronization on production
      synchronize: false, // process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
      useUTC: true,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
