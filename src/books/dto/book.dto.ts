import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: any;

  @IsNotEmpty()
  status: any;

  @IsOptional()
  is_hot: boolean;

  @IsOptional()
  is_new: boolean;
}
