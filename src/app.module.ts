import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { Health } from './health/entities/health.entity';
import { UserDetailModule } from './user-detail/user-detail.module';
import { UserDetail } from './user-detail/entities/user-detail.entity';
import { MedicineModule } from './medicine/medicine.module';
import { Medicine } from './medicine/entities/medicine.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, UserDetail, Health, Medicine],
      autoLoadModels: true,
      synchronize: true,
      timezone: '+09:00',
    }),
    UserModule,
    AuthModule,
    HealthModule,
    UserDetailModule,
    MedicineModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
