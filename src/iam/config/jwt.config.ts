import { registerAs } from '@nestjs/config';
import { config } from 'dotenv';

config();

export default registerAs('jwt', () => {
  return {
    secret: process.env.JWT_SECRET,
    accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? '7200', 10),
  };
});
