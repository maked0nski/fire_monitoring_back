import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ContactPersonDto {
  @ApiProperty({
    example: "<Баранов Олег Йосипович",
    description: "ПІБ контактної особи",
  })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    example: "050 54 66 254",
    description: "Номер телефону контактної особи",
  })
  @IsString()
  @IsNotEmpty()
  public phone: string;

  @ApiProperty({
    example: "Відповідальний",
    description: "Посада контактної особи",
  })
  @IsString()
  @IsOptional()
  public position?: string;

  @ApiProperty({
    example: "email@gmail.com",
    description: "Електронна адреса контактної особи",
  })
  @IsString()
  @IsOptional()
  @IsEmail()
  public email?: string;

  @ApiProperty({
    example: "false",
    description: "По замовчуванні false.  Замість знищення міняємо та true",
    required: true,
    nullable: false,
  })
  @IsBoolean()
  @IsOptional()
  public isDeleted?: boolean;
}
