import { Command } from 'commander';
import { env } from ':env';
import { orm } from ':backend/orm';
import { seedUser } from ':backend/seed/user.seed';

export const databaseCommand = new Command('db');
databaseCommand
    .description('Database commands')
    .option('--force', 'Allow in non-development environment')
    .hook('preAction', thisCommand => {
        if (env.NODE_ENV !== 'development' && !thisCommand.opts().force) {
            console.error('cli db: Must use --force in non-development environment');
            process.exit(1);
        }
    });

const schemaCommand = databaseCommand.command('schema').description('Manage database schema');
schemaCommand.command('create').description('Create the database schema').action(async () => {
    console.log('Creating schema...');
    await orm.schema.createSchema();
    console.log('Schema created');
});

schemaCommand.command('drop').description('Drop the database schema').action(async () => {
    console.log('Dropping schema...');
    await orm.schema.dropSchema();
    console.log('Schema dropped');
});

async function seedAction() {
    await seedUser();
}

databaseCommand.command('seed').description('Seed the database with initial data').action(async () => {
    await seedAction();
    await orm.em.flush();
});

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

    console.log('Flushing...');
    await orm.em.flush();
    await orm.close();
    console.log('Flushed');
});
