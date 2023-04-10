import {
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
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

import { CreateCustomerDto } from "./dto";
import { AccessTokenGuard } from "../__core/guards";
import { CustomerService } from "./customer.service";
import { CustomOkResponse } from "../__utils";
import { Exception } from "../__exceptions";
import {
  SWAGGER_CUSTOMER_BODY_EXAMPLE,
  SWAGGER_CUSTOMER_EXAMPLE,
  SWAGGER_CUSTOMER_LIST_EXAMPLE,
} from "../__utils/example";

//ToDo відокремити клієнта . Тобто клієнт може мати 10 обєктів і тд

@ApiTags("Customer (client) - Організації, клієнти")
@Controller("client")
@UseGuards(AccessTokenGuard)
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @ApiOperation({ summary: "Create client firm / Створення організації" })
  @ApiForbiddenResponse({ description: Exception.FORBIDDEN })
  @CustomOkResponse({
    status: HttpStatus.CREATED,
    exampleData: SWAGGER_CUSTOMER_EXAMPLE,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiBody({
    description: "Example body / Зразок тіла ",
    schema: {
      description: "Обосязковими полями являються 'name', 'isDeleted'",
      example: SWAGGER_CUSTOMER_BODY_EXAMPLE,
    },
    required: true,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: CreateCustomerDto): Promise<CreateCustomerDto> {
    return this.customerService.create(dto);
  }

  @ApiOperation({ summary: "Get all client firms" })
  @ApiForbiddenResponse({ description: Exception.FORBIDDEN })
  @CustomOkResponse({
    status: HttpStatus.OK,
    exampleData: SWAGGER_CUSTOMER_LIST_EXAMPLE,
  })
  @ApiNotFoundResponse({ description: Exception.FIRM_CLIENT_NOT_FOUND })
  @HttpCode(HttpStatus.OK)
  @Get()
  getAll(): Promise<CreateCustomerDto[]> {
    return this.customerService.getAll();
  }

  @ApiOperation({ summary: "Get client firms by id" })
  @ApiForbiddenResponse({ description: Exception.FORBIDDEN })
  @CustomOkResponse({
    status: HttpStatus.OK,
    exampleData: SWAGGER_CUSTOMER_EXAMPLE,
  })
  @ApiNotFoundResponse({ description: Exception.FIRM_CLIENT_NOT_FOUND })
  @HttpCode(HttpStatus.OK)
  @Get(":id")
  getById(@Param("id") id: string): Promise<CreateCustomerDto> {
    return this.customerService.getById(Number(id));
  }

  @ApiOperation({ summary: "Get all data about client firms by id" })
  @ApiForbiddenResponse({ description: Exception.FORBIDDEN })
  @CustomOkResponse({
    status: HttpStatus.OK,
    exampleData: SWAGGER_CUSTOMER_EXAMPLE,
  })
  @ApiNotFoundResponse({ description: Exception.FIRM_CLIENT_NOT_FOUND })
  @HttpCode(HttpStatus.OK)
  @Get(":id/all")
  getAllDataById(@Param("id") id: string): Promise<CreateCustomerDto> {
    return this.customerService.getAllDataById(Number(id));
  }

  @ApiOperation({ summary: "Update client firms by id" })
  @CustomOkResponse({
    status: HttpStatus.CREATED,
    exampleData: SWAGGER_CUSTOMER_EXAMPLE,
  })
  @ApiBody({
    description: "Example body",
    schema: {
      example: SWAGGER_CUSTOMER_BODY_EXAMPLE,
    },
    required: false,
  })
  @ApiParam({
    name: "id",
    description: "Client firms id",
    schema: { example: 1 },
  })
  @ApiForbiddenResponse({ description: Exception.FORBIDDEN })
  @ApiNotFoundResponse({ description: Exception.FIRM_CLIENT_NOT_FOUND })
  @HttpCode(HttpStatus.CREATED)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() dto: Partial<CreateCustomerDto>
  ): Promise<CreateCustomerDto> {
    return this.customerService.update(Number(id), dto);
  }

  @ApiOperation({ summary: "Delete client firms by id" })
  @ApiNotFoundResponse({ description: Exception.FIRM_CLIENT_NOT_FOUND })
  @ApiParam({
    name: "id",
    description: "Client firms id",
    schema: { example: 1 },
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  delete(@Param("id") id: string): Promise<CreateCustomerDto> {
    return this.customerService.delete(Number(id));
  }
}
