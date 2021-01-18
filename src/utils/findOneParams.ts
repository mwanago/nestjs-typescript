import { IsNumberString } from 'class-validator';

class FindOneParams {
  @IsNumberString()
  id!: string;
}

export default FindOneParams