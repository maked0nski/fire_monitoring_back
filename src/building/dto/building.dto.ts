import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class BuildingDto {
  @ApiProperty({ example: "Складські приміщення", description: "Назва Обєкту" })
  @IsString()
  public name: string;

  @ApiProperty({
    example:
      "с.Копанки, Калушського р-ну, Івано-Франківської обл. вул.Довженка 1",
    description: "Повна адреса приміщення організації",
  })
  @IsString()
  public address: string;

  @ApiProperty({
    example: "зліва від офісу 9-ти поверхова споруда",
    description: "Опис розташування на території",
  })
  @IsString()
  public description: string;

  @ApiProperty({
    example: "48.93609243561525, 24.74695169142123",
    description: "Координати організації",
  })
  @IsString()
  @IsOptional()
  public coordinate?: string;

  @ApiProperty({
    example: "Договір №15 від 20.01.2022",
    description: "Договір на обслуговування",
  })
  @IsString()
  @IsOptional()
  public service_contract?: string;

  @ApiProperty({
    example: "false",
    description: "По замовчуванні false.  Замість знищення міняємо та true",
  })
  @IsBoolean()
  @IsOptional()
  public isDeleted?: boolean;
}
