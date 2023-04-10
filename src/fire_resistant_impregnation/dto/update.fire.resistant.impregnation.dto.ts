import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateFireResistantImpregnationDto {
  @ApiProperty({example: 450, description: "Просочувана площа в м2"})
  @IsNumber()
  @IsOptional()
  public area?: number;

  @ApiProperty({example: "Хлорка )", description: "Рідина якою просочували"})
  @IsString()
  @IsOptional()
  public seepage_liquid?: string;

  @ApiProperty({
    example: "02.05.2023",
    description: "Дата наступної просочки вогнетривким розчином конструкцій",
  })
  @IsString()
  @IsOptional()
  public next_check?: string;

  @ApiProperty({
    example: true,
    description: "Чи нагадувати про наближення часу перевірки?",
  })
  @IsBoolean()
  @IsOptional()
  public reminding?: boolean;

  @ApiProperty({example: "true", description: "Час повірки вийшов"})
  @IsNumber()
  @IsOptional()
  public timeLeft?: number;

  @ApiProperty({example: "true", description: "Час повірки вийшов"})
  @IsString()
  @IsOptional()
  public project_file_link?: string;

  @ApiProperty({
    example: 'Фірма "Конкурент"',
    description: "Хто перевіряв останній раз",
  })
  @IsString()
  @IsOptional()
  public who_checked?: string;
}
