import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsNumber()
  @IsOptional()
  id!: number;

  @IsString({each: true})
  @IsNotEmpty()
  @IsOptional()
  paragraphs!: string[];

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title!: string;
}

export default UpdatePostDto;