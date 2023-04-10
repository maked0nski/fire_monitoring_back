import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {
  @ApiProperty({
    example: "ТОВ 'Джерельна вода'",
    description: "Назва організації",
    required: true,
    nullable: false,
  })
  @IsString()
  public name: string;

  @ApiProperty({
    example: "050-20-55-231",
    description: "Телефон організації",
    required: false,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  public phone?: string;

  @ApiProperty({
    example: "email@gmail.com",
    description: "Електронна адреса",
    required: false,
    nullable: true,
  })
  @IsString()
  @IsOptional()
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

  // public contact_person: ContactPerson[]

  // public contact_person?: ContactPersonDto[];
  // public fire_extinguishers?: CreateFireExtinguishersDto[];
  // public fire_hydrant?: CreateFireHydrantDto;
  // public fire_resistant_impregnation?: CreateFireResistantImpregnationDto;
  // public observation?: CreateObservationDto;
}
