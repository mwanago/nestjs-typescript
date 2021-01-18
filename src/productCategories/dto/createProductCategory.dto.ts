import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProductCategoryDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}

export default CreateProductCategoryDto;