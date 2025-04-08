import { MikroORM } from '@mikro-orm/postgresql';

const orm = await MikroORM.init(config);
await orm.connect();
await orm.checkConnection();
console.log('MIKRO-ORM SUCCESSFULLY LOADED AND CONNECTED');
