import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CmsLoginDto } from './dto/auth.dto/auth.dto';

@Controller('')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('cms/login')
  async cmsLogin(@Body() cmsLoginDto: CmsLoginDto) {
    return this.authService.cmsLogIn(cmsLoginDto);
  }
}
