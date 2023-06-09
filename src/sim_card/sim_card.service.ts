import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { CreateSimCardDto, UpdateSimCardDto } from "./dto";
import { PrismaService } from "../__core/prisma.service";
import { Exception } from "../__exceptions";

@Injectable()
export class SimCardService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateSimCardDto): Promise<CreateSimCardDto> {
    return Promise.resolve(
      this.prismaService.simCard.create({ data: data })
    ).catch((error) => {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new NotFoundException(Exception.FORBIDDEN);
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  findAll(): Promise<CreateSimCardDto[]> {
    return Promise.resolve(this.prismaService.simCard.findMany()).catch(
      (error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    );
  }

  // findAll(): Promise<CreateSimCardDto[]> {
  //     return Promise
  //         .resolve(this.prismaService.sim_card
  //             .findMany())
  //         .catch((error) => {
  //             throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //         })
  // }

  // findActive(): Promise<CreateSimCardDto[]> {
  //     return Promise
  //         .resolve(this.prismaService.sim_card
  //             .findMany({
  //                 where: {
  //                     active: true
  //                 },
  //                 include: {
  //                     observation: {
  //                         select: {
  //                             sim_cardNumber: false
  //                         }
  //                     }
  //                 }
  //             }))
  //         .catch((error) => {
  //             throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //         })
  // }

  findFree(): Promise<CreateSimCardDto[]> {
    return Promise.resolve(
      this.prismaService.simCard.findMany({
        where: {
          observation: {
            is: null,
          },
          active: true,
        },
      })
    );
  }

  findById(id: number): Promise<CreateSimCardDto> {
    return Promise.resolve(
      this.prismaService.simCard.findUniqueOrThrow({
        where: { id },
      })
    ).catch((error) => {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundException(Exception.SIM_CARD_NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  update(id: number, data: UpdateSimCardDto): Promise<CreateSimCardDto> {
    return Promise.resolve(
      this.prismaService.simCard.update({
        where: { id },
        data: data,
      })
    ).catch((error) => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException(Exception.FORBIDDEN);
        }
        if (error.code === "P2025") {
          throw new NotFoundException(Exception.SIM_CARD_NOT_FOUND);
        }
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  delete(id: number) {
    return Promise.resolve(
      this.prismaService.simCard.delete({
        where: { id },
      })
    ).catch((error) => {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundException(Exception.SIM_CARD_NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }
}
