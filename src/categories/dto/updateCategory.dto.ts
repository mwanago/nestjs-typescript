import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
  @IsNumber()
  @IsOptional()
  id!: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name!: string;
}

export default UpdateCategoryDto;