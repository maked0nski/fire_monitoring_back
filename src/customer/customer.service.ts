import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { CreateCustomerDto } from "./dto";
import { PrismaService } from "../__core/prisma.service";
import { Exception } from "../__exceptions";

@Injectable()
export class CustomerService {
  constructor(private prismaService: PrismaService) {}

  create(data: CreateCustomerDto): Promise<CreateCustomerDto> {
    return Promise.resolve(
      this.prismaService.customer.create({
        data: data,
      })
    ).catch((error) => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException(Exception.FORBIDDEN);
        }
        if (error.code === "P2025") {
          throw new NotFoundException(Exception.FIRM_CLIENT_NOT_FOUND);
        }
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  getAll(): Promise<CreateCustomerDto[]> {
    return Promise.resolve(
      this.prismaService.customer.findMany({
        where: {
          NOT: {
            isDeleted: true,
          },
        },
      })
    ).catch((error) => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException(Exception.FORBIDDEN);
        }
        if (error.code === "P2025") {
          throw new NotFoundException(Exception.FIRM_CLIENT_NOT_FOUND);
        }
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  getAllDataById(id: number): Promise<CreateCustomerDto | null> {
    return Promise.resolve(
      this.prismaService.customer.findUnique({
        where: { id },
        include: {
          buildings: {
            include: {
              contact_person: true,
              fire_alarm_systems: true,
              fire_extinguishers: true,
              fire_hydrant: true,
              fire_resistant_impregnation: true,
              observation: {
                include: {
                  sim_card: true,
                },
              },
            },
          },
          contact_person: true,
        },
      })
    );
  }

  getById(id: number): Promise<CreateCustomerDto> {
    return Promise.resolve(
      this.prismaService.customer.findFirstOrThrow({
        where: { id },
      })
    ).catch((error) => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException(Exception.FORBIDDEN);
        }
        if (error.code === "P2025") {
          throw new NotFoundException(Exception.FIRM_CLIENT_NOT_FOUND);
        }
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  update(
    id: number,
    dto: Partial<CreateCustomerDto>
  ): Promise<CreateCustomerDto> {
    return Promise.resolve(
      this.prismaService.customer.update({
        where: { id },
        data: dto,
      })
    ).catch((error) => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException(Exception.FORBIDDEN);
        }
        if (error.code === "P2025") {
          throw new NotFoundException(Exception.FIRM_CLIENT_NOT_FOUND);
        }
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  delete(id: number): Promise<CreateCustomerDto> {
    return Promise.resolve(
      this.prismaService.customer.update({
        where: { id },
        data: {
          isDeleted: true,
        },
      })
    ).catch((error) => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException(Exception.FORBIDDEN);
        }
        if (error.code === "P2025") {
          throw new NotFoundException(Exception.FIRM_CLIENT_NOT_FOUND);
        }
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }
}
