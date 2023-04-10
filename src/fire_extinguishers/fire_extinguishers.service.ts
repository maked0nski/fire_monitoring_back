import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { CreateFireExtinguishersDto, UpdateFireExtinguishersDto } from "./dto";
import { PrismaService } from "../__core/prisma.service";
import { Exception } from "../__exceptions";
import * as moment from "moment";

@Injectable()
export class FireExtinguishersService {
  constructor(private prismaService: PrismaService) {}

  create(dto: CreateFireExtinguishersDto): Promise<CreateFireExtinguishersDto> {
    const nextCheckDate = moment(dto.next_check, "DD.MM.YYYY");
    const currentDate = moment();
    dto.timeLeft = nextCheckDate.diff(currentDate, "days");
    return Promise.resolve(
      this.prismaService.fireExtinguishers.create({ data: dto })
    ).catch((error) => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException(Exception.FORBIDDEN);
        }
        if (error.code === "P2025") {
          throw new NotFoundException(Exception.FIRE_EXTINGUISHER_NOT_FOUND);
        }
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  getById(id: number): Promise<CreateFireExtinguishersDto> {
    return Promise.resolve(
      this.prismaService.fireExtinguishers.findFirstOrThrow({ where: { id } })
    ).catch((error) => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException(Exception.FORBIDDEN);
        }
        if (error.code === "P2025") {
          throw new NotFoundException(Exception.FIRE_EXTINGUISHER_NOT_FOUND);
        }
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  update(
    id: number,
    dto: UpdateFireExtinguishersDto
  ): Promise<CreateFireExtinguishersDto> {
    return Promise.resolve(
      this.prismaService.fireExtinguishers.update({
        where: { id },
        data: dto,
      })
    ).catch((error) => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException(Exception.FORBIDDEN);
        }
        if (error.code === "P2025") {
          throw new NotFoundException(Exception.FIRE_EXTINGUISHER_NOT_FOUND);
        }
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  addFirm(id: number, firmId: number): Promise<CreateFireExtinguishersDto> {
    return Promise.resolve(
      this.prismaService.fireExtinguishers.update({
        where: { id },
        data: {
          building: {
            connect: {
              id: firmId,
            },
          },
        },
      })
    ).catch((error) => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException(Exception.FORBIDDEN);
        }
        if (error.code === "P2025") {
          throw new NotFoundException(Exception.FIRE_EXTINGUISHER_NOT_FOUND);
        }
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  deleteFirm(id: number): Promise<CreateFireExtinguishersDto> {
    return Promise.resolve(
      this.prismaService.fireExtinguishers.update({
        where: { id },
        data: {
          building: {
            disconnect: true,
          },
        },
      })
    ).catch((error) => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException(Exception.FORBIDDEN);
        }
        if (error.code === "P2025") {
          throw new NotFoundException(Exception.FIRE_EXTINGUISHER_NOT_FOUND);
        }
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  delete(id: number): Promise<CreateFireExtinguishersDto> {
    return Promise.resolve(
      this.prismaService.fireExtinguishers.delete({
        where: { id },
      })
    ).catch((error) => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException(Exception.FORBIDDEN);
        }
        if (error.code === "P2025") {
          throw new NotFoundException(Exception.FIRE_EXTINGUISHER_NOT_FOUND);
        }
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }
}
