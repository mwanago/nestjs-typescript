import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import ObjectWithIdDTO from 'src/utils/types/objectWithId.dto';

class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content!: string;

  @ValidateNested()
  @Type(() => ObjectWithIdDTO)
  post!: ObjectWithIdDTO;
}

export default CreateCommentDto;