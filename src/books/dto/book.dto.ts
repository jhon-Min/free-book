import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: any;

  @IsNotEmpty()
  status: any;

  @IsNotEmpty()
  @IsArray()
  genres: string[];

  @IsNotEmpty()
  book_profile: string;

  @IsOptional()
  is_hot: boolean;

  @IsOptional()
  is_new: boolean;
}
