import { IsEmail, IsDefined, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  username: string;
}
