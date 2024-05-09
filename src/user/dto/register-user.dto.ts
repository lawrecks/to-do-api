import { IsNotEmpty } from 'class-validator';
import { LoginUserDto } from './login-user.dto';

export class RegisterUserDto extends LoginUserDto {
  @IsNotEmpty() readonly firstName: string;
  @IsNotEmpty() readonly lastName: string;
}
