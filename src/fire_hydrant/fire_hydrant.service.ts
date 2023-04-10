import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { CreateFireHydrantDto, UpdateFireHydrantDto } from "./dto";
import { PrismaService } from "../__core/prisma.service";
import { Exception } from "../__exceptions";

@Injectable()
export class FireHydrantService {
  constructor(private readonly prismaService: PrismaService) {}

  create(dto: CreateFireHydrantDto): Promise<CreateFireHydrantDto> {
    return Promise.resolve(
      this.prismaService.fireHydrant.create({
        data: {
          ...dto,
          buildingId: dto.buildingId,
        },
      })
    ).catch((error) => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException(Exception.FORBIDDEN);
        }
        if (error.code === "P2025") {
          throw new NotFoundException(Exception.FIRE_HYDRANT_NOT_FOUND);
        }
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  findById(id: number): Promise<UpdateFireHydrantDto> {
    return Promise.resolve(
      this.prismaService.fireHydrant.findFirstOrThrow({ where: { id } })
    ).catch((error) => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException(Exception.FORBIDDEN);
        }
        if (error.code === "P2025") {
          throw new NotFoundException(Exception.FIRE_HYDRANT_NOT_FOUND);
        }
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  update(id: number, dto: Partial<UpdateFireHydrantDto>): Promise<UpdateFireHydrantDto> {
    return Promise.resolve(
      this.prismaService.fireHydrant.update({
        where: { id },
        data: dto,
      })
    ).catch((error) => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException(Exception.FORBIDDEN);
        }
        if (error.code === "P2025") {
          throw new NotFoundException(Exception.FIRE_HYDRANT_NOT_FOUND);
        }
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  addFirm(id: number, firmId: number): Promise<CreateFireHydrantDto> {
    return Promise.resolve(
      this.prismaService.fireHydrant.update({
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
          throw new NotFoundException(Exception.FIRE_HYDRANT_OR_FIRM_NOT_FOUND);
        }
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  // deleteFirm(id: number): Promise<CreateFireHydrantDto> {
  //     return Promise
  //         .resolve(
  //             this.prismaService.fire_hydrant.update({
  //                 where: {id},
  //                 data: {
  //                     client: {
  //                         disconnect: true
  //                     }
  //                 }
  //             })
  //         )
  //         .catch((error) => {
  //             if (error instanceof PrismaClientKnownRequestError) {
  //                 if (error.code === 'P2002') {
  //                     throw new ForbiddenException(Exception.FORBIDDEN);
  //                 }
  //                 if (error.code === 'P2025') {
  //                     throw new NotFoundException(Exception.FIRE_HYDRANT_NOT_FOUND)
  //                 }
  //             }
  //             throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //         })
  // }

  delete(id: number): Promise<CreateFireHydrantDto> {
    return Promise.resolve(
      this.prismaService.fireHydrant.delete({ where: { id } })
    ).catch((error) => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException(Exception.FORBIDDEN);
        }
        if (error.code === "P2025") {
          throw new NotFoundException(Exception.FIRE_HYDRANT_NOT_FOUND);
        }
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  checkDate() {
    return this.prismaService.fireHydrant.findMany({
      where: {
        next_check: {},
      },
    });
  }
}
