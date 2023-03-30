import { IsEmail, IsDefined, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  first_name: string;

  @IsString()
  @IsDefined()
  last_name: string;

  @IsString()
  @IsDefined()
  phone: string;

  @IsString()
  @IsDefined()
  address: string;

  @IsString()
  @IsDefined()
  description: string;
}
