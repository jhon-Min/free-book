// src/commands/seed.command.ts
import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { CmsUserSeeder } from 'src/seeds/cmsuser.seeder';

@Injectable()
export class SeedCommand {
  constructor(private readonly cmsUserSeeder: CmsUserSeeder) {}

  @Command({ command: 'seed', describe: 'Seed the database' })
  async seed() {
    await this.cmsUserSeeder.seed();
  }
}
