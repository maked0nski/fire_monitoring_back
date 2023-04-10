import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class UpdateFireExtinguishersDto {
  @ApiProperty({ example: "ВП-5)", description: "Назва вогнегасника" })
  @IsString()
  @IsOptional()
  public model?: string;

  @ApiProperty({ example: 55, description: "Кількість" })
  @IsNumber()
  @IsOptional()
  public quantity?: number;

  @ApiProperty({
    example: true,
    description: "Чи нагадувати про наближення часу перевірки?",
  })
  @IsBoolean()
  @IsOptional()
  public reminding?: boolean;

  @ApiProperty({
    example: "02.05.2023",
    description: "Дата наступної повірки вогнегасника",
  })
  @IsString()
  @IsOptional()
  public next_check?: string;

  @ApiProperty({
    example: 'Фірма "Конкурент"',
    description: "Хто перевіряв останній раз",
  })
  @IsString()
  @IsOptional()
  public who_checked?: string;

  @ApiProperty({
    example: 2,
    description: "Час, що залишився до наступної повірки",
  })
  @IsInt()
  @IsOptional()
  public timeLeft?: number;

  @ApiProperty({
    example: 2,
    description: "ID фірми, якій належать вогнегасники",
  })
  @IsInt()
  @IsOptional()
  public buildingId?: number;
}
