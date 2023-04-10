import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { AccessTokenGuard } from "../__core/guards";
import { BuildingService } from "./building.service";
import { BuildingDto } from "./dto";
import { Exception } from "../__exceptions";
import { CustomOkResponse } from "../__utils";
import {
  SWAGGER_BUILDING,
  SWAGGER_BUILDING_BODY,
  SWAGGER_BUILDING_LIST,
} from "../__utils/example";

@ApiTags("Приміщення організації (клієнта)")
@Controller("building")
@UseGuards(AccessTokenGuard)
export class BuildingController {
  constructor(private buildingService: BuildingService) {}

  @ApiOperation({ summary: "Створення приміщення для організації" })
  @ApiForbiddenResponse({ description: Exception.FORBIDDEN })
  @CustomOkResponse({
    status: HttpStatus.CREATED,
    exampleData: SWAGGER_BUILDING,
  })
  @ApiBody({
    schema: {
      example: SWAGGER_BUILDING_BODY,
    },
    required: true,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() data: BuildingDto): Promise<BuildingDto> {
    return this.buildingService.create(data);
  }

  @ApiForbiddenResponse({ description: Exception.FORBIDDEN })
  @CustomOkResponse({
    status: HttpStatus.OK,
    exampleData: SWAGGER_BUILDING_LIST,
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiOperation({ summary: "Отримати список усіх приміщень організації" })
  getAll(): Promise<BuildingDto[]> {
    return this.buildingService.getAll();
  }

  @ApiOperation({ summary: "Пошук приміщщеня за id" })
  @ApiForbiddenResponse({ description: Exception.FORBIDDEN })
  @CustomOkResponse({ status: HttpStatus.OK, exampleData: SWAGGER_BUILDING })
  @ApiNotFoundResponse({ description: Exception.BUILDING_NOT_FOUND })
  @ApiParam({
    name: "id",
    description: "ID приміщення",
    schema: { example: 1 },
  })
  @HttpCode(HttpStatus.FOUND)
  @Get(":id")
  getById(@Param("id") id: string): Promise<BuildingDto> {
    return this.buildingService.getById(Number(id));
  }

  @ApiOperation({ summary: "Get all data about building by id" })
  @ApiForbiddenResponse({ description: Exception.FORBIDDEN })
  @CustomOkResponse({ status: HttpStatus.OK, exampleData: SWAGGER_BUILDING })
  @ApiNotFoundResponse({ description: Exception.BUILDING_NOT_FOUND })
  @HttpCode(HttpStatus.OK)
  @Get(":id/all")
  getAllDataById(@Param("id") id: string): Promise<BuildingDto> {
    return this.buildingService.getAllDataById(Number(id));
  }

  @Get("owner/:owner_id")
  getByOwner(@Param("owner_id") owner_id: string): Promise<BuildingDto> {
    return this.buildingService.getByOwner(Number(owner_id));
  }

  @ApiOperation({ summary: "Оновити данні про приміщення організації по id" })
  @ApiForbiddenResponse({ description: Exception.FORBIDDEN })
  @ApiNotFoundResponse({ description: Exception.BUILDING_NOT_FOUND })
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: "id",
    description: "ID приміщення",
    schema: { example: 1 },
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() data: Partial<BuildingDto>
  ): Promise<BuildingDto> {
    return this.buildingService.update(Number(id), data);
  }

  @ApiOperation({ summary: "Помітити видаленим приміщення" })
  @ApiForbiddenResponse({ description: Exception.FORBIDDEN })
  @ApiNotFoundResponse({ description: Exception.BUILDING_NOT_FOUND })
  @ApiParam({
    name: "id",
    description: "ID приміщення",
    schema: { example: 1 },
  })
  @HttpCode(HttpStatus.OK)
  @Delete(":id")
  delete(@Param("id") id: string): Promise<BuildingDto> {
    return this.buildingService.delete(Number(id));
  }
}
