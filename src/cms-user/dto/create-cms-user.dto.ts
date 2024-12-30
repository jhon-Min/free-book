import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCmsUserDto {
  @IsNotEmpty()
  @IsString({ message: 'Name is required' })
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsString()
  role: string;
}
