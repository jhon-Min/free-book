import { PartialType } from '@nestjs/mapped-types';
import { CreateCmsUserDto } from './create-cms-user.dto';

export class UpdateCmsUserDto extends PartialType(CreateCmsUserDto) {}
