import { UserService } from "../user/user.service";
import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { PrismaService } from "../__core/prisma.service";
import * as moment from "moment";

interface WhereClause {
  modelName: string;
  id: number;
}

interface UpdateClause {
  where: WhereClause;
  data: any;
}

@Injectable()
export class CronService {
  constructor(
    private userService: UserService,
    private prismaService: PrismaService
  ) {}

  // чистимо юзерів з простроченими токенами
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async removeOldVerificationCode() {
    console.log("чистимо юзерів з простроченими токенами");
    const list = await this.userService.clearNotRegistredUser();

    await Promise.all(
      list.map(async (item) => {
        if (item.status === "pending") {
          console.log(`status - pending delete user id:`, item.id);
          await this.userService.deleteUser(item.id);
        } else {
          console.log(
            `status - NOT pending Clear Verification Code user id:`,
            item.id
          );
          await this.userService.updateUser(item.id, {
            verificationCode: null,
            verificationCodeAt: null,
          });
        }
      })
    );
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async calculateTimeLeft() {
    console.log(
      "Розрахунок різниці в днях між поточною датою та датою перевірки"
    );

    const currentDate = moment();
    const fireTypes = [
      "fireExtinguishers",
      "fireHydrant",
      "fireResistantImpregnation",
    ];

    for (const fireType of fireTypes) {
      const fires = await this.prismaService[fireType].findMany();
      const updates = fires.map((fire) => {
        const timeLeft = moment(fire.next_check, "DD.MM.YYYY").diff(
          currentDate,
          "days"
        );
        return {
          where: { id: fire.id },
          data: { timeLeft },
        };
      });
      await this.updateFires(updates, fireType);
    }
  }

  async updateFires(updates, fireType) {
    const model = this.prismaService[fireType];
    await this.prismaService.$transaction(
      updates.map((update) => model.update(update))
    );
  }
}
