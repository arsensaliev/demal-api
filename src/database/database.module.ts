import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Knex from 'knex';
import { Model } from 'objection';

interface DatabaseConfiguration {
  connection: string;
  host: string;
  port: number;
  name: string;
  username: string;
  password: string;
  ssl: {
    rejectUnauthorized: boolean;
  };
}

@Module({})
export class DatabaseModule {
  constructor(private readonly configService: ConfigService) {}

  onApplicationBootstrap() {
    const configuration = this.getDatabaseConfiguration();
    this.initDatabase(configuration);
  }

  private getDatabaseConfiguration(): DatabaseConfiguration {
    return {
      connection: this.configService.get<string>('DB_CONNECTION') || 'pg',
      host: this.configService.get<string>('DB_HOST') || 'localhost',
      port: this.configService.get<number>('DB_PORT') || 3306,
      name: this.configService.get<string>('DB_NAME') || 'demal',
      username: this.configService.get<string>('DB_USERNAME') || 'root',
      password: this.configService.get<string>('DB_PASSWORD') || 'root',
      ssl: { rejectUnauthorized: false },
    };
  }

  private initDatabase(configuration: DatabaseConfiguration) {
    const knex = Knex({
      client: configuration.connection,
      connection: {
        host: configuration.host,
        user: configuration.username,
        port: configuration.port,
        password: configuration.password,
        database: configuration.name,
        ssl: configuration.ssl,
      },
    });

    Model.knex(knex);
  }
}
