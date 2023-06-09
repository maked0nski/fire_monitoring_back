import {ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException,} from "@nestjs/common";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";
import * as fs from "fs";

import {CreateFireResistantImpregnationDto, UpdateFireResistantImpregnationDto,} from "./dto";
import {PrismaService} from "../__core/prisma.service";
import {Exception} from "../__exceptions";


@Injectable()
export class FireResistantImpregnationService {
    constructor(private readonly prismaService: PrismaService) {
    }

    create(
        dto: CreateFireResistantImpregnationDto
    ): Promise<CreateFireResistantImpregnationDto> {
        return Promise.resolve(
            this.prismaService.fireResistantImpregnation.create({
                data: dto,
            })
        ).catch((error) => {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ForbiddenException(Exception.FORBIDDEN);
                }
                if (error.code === "P2025") {
                    throw new NotFoundException(
                        Exception.FIRE_RESISTANT_IMPREGNATION_NOT_FOUND
                    );
                }
            }
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        });
    }

    getById(id: number): Promise<CreateFireResistantImpregnationDto> {
        return Promise.resolve(
            this.prismaService.fireResistantImpregnation.findFirstOrThrow({
                where: {id},
            })
        ).catch((error) => {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ForbiddenException(Exception.FORBIDDEN);
                }
                if (error.code === "P2025") {
                    throw new NotFoundException(
                        Exception.FIRE_RESISTANT_IMPREGNATION_NOT_FOUND
                    );
                }
            }
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        });
    }

    update(
        id: number,
        dto: UpdateFireResistantImpregnationDto
    ): Promise<CreateFireResistantImpregnationDto> {
        return Promise.resolve(
            this.prismaService.fireResistantImpregnation.update({
                where: {id},
                data: dto,
            })
        ).catch((error) => {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ForbiddenException(Exception.FORBIDDEN);
                }
                if (error.code === "P2025") {
                    throw new NotFoundException(
                        Exception.FIRE_RESISTANT_IMPREGNATION_NOT_FOUND
                    );
                }
            }
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        });
    }

    addFirm(
        id: number,
        firmId: number
    ): Promise<CreateFireResistantImpregnationDto> {
        return Promise.resolve(
            this.prismaService.fireResistantImpregnation.update({
                where: {id},
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
                    throw new NotFoundException(
                        Exception.FIRE_RESISTANT_IMPREGNATION_NOT_FOUND
                    );
                }
            }
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        });
    }

    deleteFirm(id: number): Promise<CreateFireResistantImpregnationDto> {
        return Promise.resolve(
            this.prismaService.fireResistantImpregnation.update({
                where: {id},
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
                    throw new NotFoundException(
                        Exception.FIRE_RESISTANT_IMPREGNATION_NOT_FOUND
                    );
                }
            }
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        });
    }

    async delete(id: number): Promise<CreateFireResistantImpregnationDto> {
        const fireResistantImpregnation = await this.getById(id);

        if (!fireResistantImpregnation) {
            throw new NotFoundException(Exception.FIRE_RESISTANT_IMPREGNATION_NOT_FOUND);
        }

        const filePath = `./files/projects/impregnation/${fireResistantImpregnation.project_file_link}`;
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return Promise.resolve(
            this.prismaService.fireResistantImpregnation.delete({
                where: {id},
            })
        ).catch((error) => {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ForbiddenException(Exception.FORBIDDEN);
                }
                if (error.code === "P2025") {
                    throw new NotFoundException(
                        Exception.FIRE_RESISTANT_IMPREGNATION_NOT_FOUND
                    );
                }
            }
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        });
    }
}
