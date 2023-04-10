import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateFireHydrantDto {
  @ApiProperty({
    example: "Шланг 5м металеві кольці d90",
    description: "Назва рукава",
  })
  @IsString()
  @IsOptional()
  public model?: string;

  @ApiProperty({ example: 4, description: "Кількість пожежних гідрантів" })
  @IsNumber()
  public quantity: number;

  @ApiProperty({
    example: "02.05.2023",
    description: "Дата наступної перевірки пожежних гідрантів",
  })
  @IsString()
  public next_check: string;

  @ApiProperty({
    example: true,
    description: "Чи нагадувати про наближення часу перевірки?",
  })
  @IsBoolean()
  public reminding: boolean;

  @ApiProperty({
    example: 'Фірма "Конкурент"',
    description: "Хто перевіряв останній раз",
  })
  @IsString()
  @IsOptional()
  public who_checked?: string;

  @ApiProperty({ example: "true", description: "Час повірки вийшов" })
  @IsInt()
  @IsOptional()
  public timeLeft?: number;

  @ApiProperty({
    example: 4,
    description: "Id обєкта фірми власника вогнегасників",
  })
  @IsNumber()
  @IsOptional()
  public buildingId?: number;
}
