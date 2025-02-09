import {
  IsNotEmpty,
  IsInt,
  IsBoolean,
  IsOptional,
  IsDecimal,
  IsArray,
  ArrayNotEmpty,
  IsString,
} from 'class-validator';

export class CreateChapterDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  no: number;

  @IsNotEmpty()
  isPremium: any;

  @IsNotEmpty()
  coin: string; // Default to 0 if not provided

  //   @IsArray()
  //   @ArrayNotEmpty() // Ensures the images array is not empty
  //   @IsString({ each: true })
  //   images: string[];

  @IsNotEmpty()
  bookId: string;

  @IsNotEmpty()
  seasonId: string;
}
