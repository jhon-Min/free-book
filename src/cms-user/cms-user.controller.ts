import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CmsUserService } from './cms-user.service';
import { CreateCmsUserDto } from './dto/create-cms-user.dto';
import { UpdateCmsUserDto } from './dto/update-cms-user.dto';

@Controller('dashboard/cms-users')
export class CmsUserController {
  constructor(private readonly cmsUserService: CmsUserService) {}

  @Post()
  create(@Body() createCmsUserDto: CreateCmsUserDto) {
    return this.cmsUserService.create(createCmsUserDto);
  }

  @Get()
  findAll() {
    return this.cmsUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cmsUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCmsUserDto: UpdateCmsUserDto) {
    return this.cmsUserService.update(+id, updateCmsUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cmsUserService.remove(+id);
  }
}
