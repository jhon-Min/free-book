import { IsNotEmpty } from 'class-validator';

export class CmsLoginDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}

export class UserLoginDto {}
