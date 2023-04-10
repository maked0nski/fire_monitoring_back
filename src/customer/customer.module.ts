import { Module } from "@nestjs/common";

import { PrismaService } from "../__core/prisma.service";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, PrismaService],
  exports: [PrismaService],
})
export class CustomerModule {}
