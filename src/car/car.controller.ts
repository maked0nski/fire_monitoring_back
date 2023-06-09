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
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import {
  SWAGGER_EXAMPLE_CAR,
  SWAGGER_EXAMPLE_CARS_LIST,
} from "../__utils/example";
import { AccessTokenGuard } from "../__core/guards";
import { CreateCarDto, UpdateCarDto } from "./dto";
import { CustomOkResponse } from "../__utils";
import { Exception } from "../__exceptions";
import { CarService } from "./car.service";

@ApiTags("Cars")
@Controller("cars")
@UseGuards(AccessTokenGuard)
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiOperation({ summary: "Create car" })
  @ApiForbiddenResponse({ description: Exception.FORBIDDEN })
  @CustomOkResponse({
    status: HttpStatus.CREATED,
    exampleData: SWAGGER_EXAMPLE_CAR,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post("")
  createCar(@Body() carDto: CreateCarDto): Promise<CreateCarDto> {
    return this.carService.create(carDto);
  }

  @ApiOperation({ summary: "Get all cars list" })
  @CustomOkResponse({
    status: HttpStatus.OK,
    exampleData: SWAGGER_EXAMPLE_CARS_LIST,
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  getAll(): Promise<CreateCarDto[]> {
    return this.carService.getAll();
  }

  @ApiOperation({ summary: "Get car by id" })
  @CustomOkResponse({ status: HttpStatus.OK, exampleData: SWAGGER_EXAMPLE_CAR })
  @ApiNotFoundResponse({ description: Exception.CAR_NOT_FOUND })
  @HttpCode(HttpStatus.OK)
  @Get(":id")
  getById(@Param("id") id: string): Promise<CreateCarDto> {
    return this.carService.getById(Number(id));
  }

  @ApiOperation({ summary: "Update car" })
  @CustomOkResponse({
    status: HttpStatus.CREATED,
    exampleData: SWAGGER_EXAMPLE_CAR,
  })
  @ApiForbiddenResponse({ description: Exception.FORBIDDEN })
  @ApiNotFoundResponse({ description: Exception.CAR_NOT_FOUND })
  @HttpCode(HttpStatus.CREATED)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(Number(id), updateCarDto);
  }

  @ApiOperation({ summary: "Delete car" })
  @ApiForbiddenResponse({ description: Exception.FORBIDDEN })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  delete(@Param("id") id: string): Promise<CreateCarDto> {
    return this.carService.delete(Number(id));
  }
}
