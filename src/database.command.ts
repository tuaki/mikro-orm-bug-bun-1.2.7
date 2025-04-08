import { Command } from 'commander';
import { env } from './env';
import { orm } from './orm';
import { User } from './api/user.entity';

export const databaseCommand = new Command('db');
databaseCommand.description('Database commands');

databaseCommand.command('fresh-seed').description('drop + migrate + seed').action(async () => {
    console.log('Dropping schema...');
    await orm.schema.dropSchema({ dropMigrationsTable: true });
    console.log('Schema dropped');

    console.log('Migrating schema...');
    const migrator = orm.getMigrator();
    await migrator.up();
    console.log('Schema migrated');

    console.log('Seeding...');
    await seedAction();
    console.log('Seeding done');

    console.log('Closing...');
    await orm.close();
    console.log('Closed');
});

async function seedAction() {
    console.log('UserSeed');

    const user = new User();

    user.email = 'user@example.com';
    user.password = 'password';

    await orm.em.persistAndFlush(user);
}
