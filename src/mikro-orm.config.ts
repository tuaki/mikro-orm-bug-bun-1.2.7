import { MikroORM, PostgreSqlDriver, defineConfig, type EntityName } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import type { EntityManager } from '@mikro-orm/core';
import { TSMigrationGenerator } from '@mikro-orm/migrations';

export default defineConfig({
    metadataProvider: TsMorphMetadataProvider,
    driver: PostgreSqlDriver,
    entities: [ import.meta.dir + '/entities/*.entity.ts' ],

    user: 'mikrobun',
    password: 'mikrobun',
    dbName: 'mikrobun',
    host: 'postgres',

    // TODO Just for the tests.
    metadataCache: {
        enabled: false,
    }
});
