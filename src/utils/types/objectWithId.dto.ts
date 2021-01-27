import { IsNumber } from 'class-validator';

class ObjectWithIdDto {
  @IsNumber()
  id!: number;
}

export default ObjectWithIdDto;