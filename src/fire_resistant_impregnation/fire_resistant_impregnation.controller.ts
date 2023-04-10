import {ApiBody, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags,} from "@nestjs/swagger";
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Param,
    Patch,
    Post,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import * as fs from "fs";

import {CreateFireResistantImpregnationDto, UpdateFireResistantImpregnationDto,} from "./dto";
import {FireResistantImpregnationService} from "./fire_resistant_impregnation.service";
import {AccessTokenGuard} from "../__core/guards";
import {CustomOkResponse, editFileName, pdfFileFilter} from "../__utils";
import {Exception} from "../__exceptions";
import {SWAGGER_EXAMPLE_FIRE_RESISTANT, SWAGGER_EXAMPLE_FIRE_RESISTANT_BODY,} from "../__utils/example";
import {Public} from "../__core/decorators";

@ApiTags("Просочення конструкцій вогнетривкою речовиною")
@Controller("fire_resistant_impregnation")
@UseGuards(AccessTokenGuard)
export class FireResistantImpregnationController {
  constructor(
    private fireResistantImpregnationService: FireResistantImpregnationService
  ) {}

  @ApiOperation({ summary: "Create task fire resistant impregnation" })
  @ApiForbiddenResponse({ description: Exception.FORBIDDEN })
  @CustomOkResponse({
    status: HttpStatus.CREATED,
    exampleData: SWAGGER_EXAMPLE_FIRE_RESISTANT,
  })
  @ApiBody({
      description: "Example body",
      schema: {
          example: SWAGGER_EXAMPLE_FIRE_RESISTANT_BODY,
      },
      required: true,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  // @UseInterceptors(
  //     FileInterceptor("file", {
  //       storage: diskStorage({
  //         destination: "./files/projects/impregnation",
  //         filename: editFileName,
  //       }),
  //       fileFilter: pdfFileFilter,
  //     })
  // )
  async create(
      @Body() dto: CreateFireResistantImpregnationDto,
      // @UploadedFile() file: Express.Multer.File
  ): Promise<CreateFireResistantImpregnationDto> {
      // if (file) {
      //   dto.project_file_link = file.filename;
      // }
      return this.fireResistantImpregnationService.create(dto);
  }

  @ApiOperation({ summary: "Get fire resistant impregnation by id" })
  @ApiForbiddenResponse({ description: Exception.FORBIDDEN })
  @CustomOkResponse({
    status: HttpStatus.OK,
    exampleData: SWAGGER_EXAMPLE_FIRE_RESISTANT,
  })
  @HttpCode(HttpStatus.OK)
  @Get(":id")
  getById(
    @Param("id") id: string
  ): Promise<CreateFireResistantImpregnationDto> {
    return this.fireResistantImpregnationService.getById(Number(id));
  }

  @ApiOperation({ summary: "Update fire resistant impregnation by id" })
  @CustomOkResponse({
    status: HttpStatus.CREATED,
    exampleData: SWAGGER_EXAMPLE_FIRE_RESISTANT,
  })
  @ApiBody({
    description: "Example body",
    schema: {
      example: SWAGGER_EXAMPLE_FIRE_RESISTANT_BODY,
    },
    required: false,
  })
  @ApiParam({
      name: "id",
      description: "Fire resistant impregnation id",
      schema: {example: 1},
  })
  @ApiForbiddenResponse({description: Exception.FORBIDDEN})
  @ApiNotFoundResponse({
      description: Exception.FIRE_RESISTANT_IMPREGNATION_NOT_FOUND,
  })
  @HttpCode(HttpStatus.CREATED)
  @Patch(":id")
  @UseInterceptors(
      FileInterceptor("file", {
          storage: diskStorage({
              destination: "./files/projects/impregnation",
              filename: editFileName,
          }),
          fileFilter: pdfFileFilter,
      })
  )
  async update(
      @Param("id") id: string,
      @Body() dto: UpdateFireResistantImpregnationDto,
      @UploadedFile() file: Express.Multer.File
  ): Promise<CreateFireResistantImpregnationDto> {

      const fireResistantImpregnation = await this.fireResistantImpregnationService.getById(Number(id));

      if (!fireResistantImpregnation) {
          throw new NotFoundException(Exception.FIRE_RESISTANT_IMPREGNATION_NOT_FOUND);
      }

      if (file) {
          const filePath = `./files/projects/impregnation/${fireResistantImpregnation.project_file_link}`;
          if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
          }
          dto.project_file_link = `${file.filename}`;
      }

      return this.fireResistantImpregnationService.update(Number(id), dto);
  }

    @Public()
    @Get("/file/:name")
    getAvatar(@Param("name") name, @Res() res) {
        return res.sendFile(name, {root: "./files/projects/impregnation"});
    }

    @ApiOperation({summary: "Addfirm to fire resistant impregnation by id"})
    @CustomOkResponse({
        status: HttpStatus.CREATED,
        exampleData: SWAGGER_EXAMPLE_FIRE_RESISTANT,
    })
    @ApiBody({
        description: "Example body",
        schema: {
            example: {
        firmId: 1,
      },
    },
    required: false,
  })
  @ApiParam({
    name: "id",
    description: "fire resistant impregnation id",
    schema: { example: 1 },
  })
  @ApiForbiddenResponse({ description: Exception.FORBIDDEN })
  @ApiNotFoundResponse({
    description: Exception.FIRE_RESISTANT_IMPREGNATION_NOT_FOUND,
  })
  @HttpCode(HttpStatus.CREATED)
  @Patch(":id/addFirm")
  addFirm(
    @Param("id") id: string,
    @Body("firmId") firmId: string
  ): Promise<CreateFireResistantImpregnationDto> {
    return this.fireResistantImpregnationService.addFirm(
      Number(id),
      Number(firmId)
    );
  }

  @ApiOperation({
    summary: "Remove firmId from fire resistant impregnation",
  })
  @CustomOkResponse({
    status: HttpStatus.CREATED,
    exampleData: SWAGGER_EXAMPLE_FIRE_RESISTANT,
  })
  @HttpCode(HttpStatus.OK)
  @ApiNotFoundResponse({
    description: Exception.FIRE_RESISTANT_IMPREGNATION_NOT_FOUND,
  })
  @Patch(":id/deleteFirm")
  deleteFirm(
    @Param("id") id: string
  ): Promise<CreateFireResistantImpregnationDto> {
    return this.fireResistantImpregnationService.deleteFirm(Number(id));
  }

  @ApiOperation({ summary: "Delete fire resistant impregnation by id" })
  @ApiNotFoundResponse({
    description: Exception.FIRE_RESISTANT_IMPREGNATION_NOT_FOUND,
  })
  @ApiParam({
    name: "id",
    description: "fire resistant impregnation id",
    schema: { example: 1 },
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  delete(@Param("id") id: string): Promise<CreateFireResistantImpregnationDto> {
    return this.fireResistantImpregnationService.delete(Number(id));
  }
}
