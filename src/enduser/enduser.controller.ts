import { Controller, Get, Param, Query } from '@nestjs/common';
import { EnduserService } from './enduser.service';

@Controller('dashboard/enduser')
export class EnduserController {
  constructor(private readonly endUserService: EnduserService) {}

  @Get()
  index(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
    @Query('search') search: string,
  ) {
    const pageNumber = Number(page) || 1;
    const perPageNumber = Math.min(Number(perPage) || 10, 50); // Max 50 items per page

    return this.endUserService.index(pageNumber, perPageNumber, search);
  }

  @Get(':id')
  detail(@Param('id') id: string) {
    return this.endUserService.detail(id);
  }
}
