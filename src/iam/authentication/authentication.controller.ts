import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CmsLoginDto, EndUserLoginDto } from './dto/auth.dto/auth.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enum/enum-type.enum';

@Controller('')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Auth(AuthType.None)
  @Post('cms/login')
  async cmsLogin(@Body() cmsLoginDto: CmsLoginDto) {
    return this.authService.cmsLogIn(cmsLoginDto);
  }

  @Auth(AuthType.None)
  @Post('api/v1/login')
  endUserLogin(@Body() loginDto: EndUserLoginDto) {
    return this.authService.enduserLogin(loginDto);
  }
}
