import { IsNotEmpty } from 'class-validator';

export class CmsLoginDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UserLoginDto {}
