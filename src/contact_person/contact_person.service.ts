import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { ContactPersonDto } from "./dto";
import { PrismaService } from "../__core/prisma.service";
import { Exception } from "../__exceptions";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class ContactPersonService {
  constructor(private readonly prismaService: PrismaService) {}

  create(dto: ContactPersonDto): Promise<ContactPersonDto> {
    return Promise.resolve(
      this.prismaService.contactPerson.create({ data: dto })
    ).catch((error) => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException(Exception.FORBIDDEN);
        }
        if (error.code === "P2025") {
          throw new NotFoundException(Exception.CONTACT_PERSON_NOT_FOUND);
        }
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  getAll(): Promise<ContactPersonDto[]> {
    return Promise.resolve(
      this.prismaService.contactPerson.findMany({
        where: {
          NOT: {
            isDeleted: true,
          },
        },
      })
    )
    .catch((error) => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException(Exception.FORBIDDEN);
        }
        if (error.code === "P2025") {
          throw new NotFoundException(Exception.CONTACT_PERSON_NOT_FOUND);
        }
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  // getAllNotDelete(): Promise<ContactPersonDto[]> {
  //     return Promise
  //         .resolve(this.prismaService.contactPerson
  //             .findMany(
  //                 {
  //                     where: {
  //                         NOT: {
  //                             isDeleted: true
  //                         }
  //                     }
  //                 }
  //             ))
  //         .catch((error) => {
  //             if (error instanceof PrismaClientKnownRequestError) {
  //                 if (error.code === 'P2002') {
  //                     throw new ForbiddenException(Exception.FORBIDDEN);
  //                 }
  //                 if (error.code === 'P2025') {
  //                     throw new NotFoundException(Exception.CONTACT_PERSON_NOT_FOUND)
  //                 }
  //             }
  //             throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //         });
  // }

  getById(id: number): Promise<ContactPersonDto> {
    return Promise.resolve(
      this.prismaService.contactPerson.findFirstOrThrow({
        where: { id },
      })
    ).catch((error) => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException(Exception.FORBIDDEN);
        }
        if (error.code === "P2025") {
          throw new NotFoundException(Exception.CONTACT_PERSON_NOT_FOUND);
        }
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  update(
    id: number,
    dto: Partial<ContactPersonDto>
  ): Promise<ContactPersonDto> {
    return Promise.resolve(
      this.prismaService.contactPerson.update({
        where: { id },
        data: dto,
      })
    ).catch((error) => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException(Exception.FORBIDDEN);
        }
        if (error.code === "P2025") {
          throw new NotFoundException(Exception.CONTACT_PERSON_NOT_FOUND);
        }
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  // addFirm(id: number, dto: Partial<ContactPersonDto>): Promise<ContactPersonDto> {
  //     return Promise
  //         .resolve(this.prismaService.contactPerson
  //             .update({
  //                 where:{id},
  //                 data: {
  //                     customer: {
  //                         connect: {
  //                             id: dto?.firmId
  //                         }
  //                     }
  //                 }
  //             }))
  //         .catch((error) => {
  //             if (error instanceof PrismaClientKnownRequestError) {
  //                 if (error.code === 'P2002') {
  //                     throw new ForbiddenException(Exception.FORBIDDEN);
  //                 }
  //                 if (error.code === 'P2025') {
  //                     throw new NotFoundException(Exception.CONTACT_PERSON_NOT_FOUND)
  //                 }
  //             }
  //             throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //         });
  //
  // }

  delete(id: number): Promise<ContactPersonDto> {
    return Promise.resolve(
      this.prismaService.contactPerson.update({
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
          throw new NotFoundException(Exception.CONTACT_PERSON_NOT_FOUND);
        }
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });
  }

  //
  // deleteFirmId(id: number) {
  //     return Promise
  //         .resolve(this.prismaService.contactPerson
  //             .update({
  //                 where: {id},
  //                 data: {
  //                     customer: {
  //                         disconnect: true
  //                     }
  //                 }
  //             }))
  //         .catch((error) => {
  //             if (error instanceof PrismaClientKnownRequestError) {
  //                 if (error.code === 'P2002') {
  //                     throw new ForbiddenException(Exception.FORBIDDEN);
  //                 }
  //                 if (error.code === 'P2025') {
  //                     throw new NotFoundException(Exception.CONTACT_PERSON_NOT_FOUND)
  //                 }
  //             }
  //             throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //         });
  // }
}
