import { Module } from "@nestjs/common";

import { SimCardController } from "./sim_card.controller";
import { PrismaService } from "../__core/prisma.service";
import { SimCardService } from "./sim_card.service";

@Module({
  controllers: [SimCardController],
  providers: [SimCardService, PrismaService],
  exports: [PrismaService],
})
export class SimCardModule {}
