import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../__core/prisma.service";
import { BuildingDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Exception } from "../__exceptions";

@Injectable()
export class BuildingService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: BuildingDto): Promise<BuildingDto> {
    return Promise.resolve(
      this.prismaService.building.create({ data: data })
    ).catch((error) => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException(Exception.FORBIDDEN);
        }
        if (error.code === "P2025") {
          throw new NotFoundException(Exception.BUILDING_NOT_FOUND);
        }
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  getAll(): Promise<BuildingDto[]> {
    return Promise.resolve(
      this.prismaService.building.findMany({
        where: {
          NOT: {
            isDeleted: true,
          },
        },
      })
    );
  }

  getById(id: number): Promise<BuildingDto> {
    return Promise.resolve(
      this.prismaService.building.findFirstOrThrow({ where: { id } })
    ).catch((error) => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException(Exception.FORBIDDEN);
        }
        if (error.code === "P2025") {
          throw new NotFoundException(Exception.BUILDING_NOT_FOUND);
        }
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  getAllDataById(id: number): Promise<BuildingDto> {
    return Promise.resolve(
      this.prismaService.building.findUniqueOrThrow({
        where: { id },
        include: {
          customer: {
            include: {
              contact_person: true,
            },
          },
          contact_person: true,
          fire_alarm_systems: {
            include: {
              fire_system: true,
              fire_sensor: true,
            },
          },
          fire_extinguishers: true,
          fire_hydrant: true,
          fire_resistant_impregnation: true,
          observation: {
            include: {
              sim_card: true,
            },
          },
        },
      })
    );
  }

  getByOwner(owner_id: number): Promise<BuildingDto> {
    return Promise.resolve(undefined);
  }

  update(id: number, data: Partial<BuildingDto>): Promise<BuildingDto> {
    return Promise.resolve(
      this.prismaService.building.update({
        where: { id },
        data,
      })
    ).catch((error) => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException(Exception.FORBIDDEN);
        }
        if (error.code === "P2025") {
          throw new NotFoundException(Exception.BUILDING_NOT_FOUND);
        }
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  delete(id: number): Promise<BuildingDto> {
    return Promise.resolve(
      this.prismaService.building
        .update({
          where: { id },
          data: {
            isDeleted: true,
          },
        })
        .catch((error) => {
          if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
              throw new ForbiddenException(Exception.FORBIDDEN);
            }
            if (error.code === "P2025") {
              throw new NotFoundException(Exception.BUILDING_NOT_FOUND);
            }
          }
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        })
    );
  }
}
