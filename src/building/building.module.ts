import { Module } from "@nestjs/common";
import { BuildingService } from "./building.service";
import { BuildingController } from "./building.controller";
import { PrismaService } from "../__core/prisma.service";

@Module({
  imports: [],
  controllers: [BuildingController],
  providers: [BuildingService, PrismaService],
  exports: [PrismaService],
})
export class BuildingModule {}
