import { TypeOrmModule } from '@nestjs/typeorm';
import { getConfig } from './config';

export default async () => {
  const config = await getConfig();
  const dbCommon = {
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
  };

  return TypeOrmModule.forRoot({
    type: 'mysql',
    name: 'mysql',
    entities: [],
    synchronize: true,
    ...dbCommon,
  });
};
