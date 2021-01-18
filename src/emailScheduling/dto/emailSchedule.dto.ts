import { IsString, IsNotEmpty, IsDateString, IsEmail } from 'class-validator';

export class EmailScheduleDto {
  @IsEmail()
  recipient!: string;

  @IsString()
  @IsNotEmpty()
  subject!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsDateString()
  date!: string;
}

export default EmailScheduleDto;