import { MulterModule } from "@nestjs/platform-express";
import { ScheduleModule } from "@nestjs/schedule";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { Module } from "@nestjs/common";

import { AccessTokenGuard } from "./__core/guards";
import { MailModule } from "./mail/mail.module";
import {
  AuthModule,
  CarModule,
  ContactPersonModule,
  CustomerModule,
  FireExtinguishersModule,
  FireHydrantModule,
  FireResistantImpregnationModule,
  FuelCardModule,
  ObservationModule,
  PositionModule,
  SimCardModule,
  UserModule,
} from "./index";
import { CronService } from "./cron/cron.service";
import { BuildingModule } from "./building/building.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Позволяет обратиться к env во всем приложении
      envFilePath: `.${process.env.NONE_ENV}.env`, // Указываем путь до env файла
    }),
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    FuelCardModule,
    PositionModule,
    CarModule,
    SimCardModule,
    CustomerModule,
    ContactPersonModule,
    FireExtinguishersModule,
    FireHydrantModule,
    FireResistantImpregnationModule,
    ObservationModule,
    MailModule,
    BuildingModule,
    MulterModule.register({
      dest: "./files",
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    CronService,
  ],
})
export class AppModule {}
