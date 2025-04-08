import { MikroORM } from '@mikro-orm/postgresql';
import config from './mikro-orm.config.ts';

const orm = await MikroORM.init(config);
await orm.connect();
await orm.checkConnection();
console.log('MIKRO-ORM SUCCESSFULLY LOADED AND CONNECTED, closing');

await orm.close();
console.log('and closed');
