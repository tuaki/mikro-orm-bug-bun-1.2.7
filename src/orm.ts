import { MikroORM, PostgreSqlDriver, defineConfig, type EntityName } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { env } from './env';
import type { EntityManager } from '@mikro-orm/core';
import { TSMigrationGenerator } from '@mikro-orm/migrations';

const isMikroOrmCli = process.argv[1].includes('mikro-orm');

const config = defineConfig({
    metadataProvider: TsMorphMetadataProvider,
    driver: PostgreSqlDriver,
    entities: [ import.meta.dir + '/**/*.entity.ts' ],
    // We need to set it explicitly because we need to use some special options in order to tunnel from docker back to the host.
    clientUrl: env.DATABASE_URL,
    allowGlobalContext: true,
    forceUndefined: true,
    connect: !isMikroOrmCli,  // the CLI's MikroORM instance will be used instead
    migrations: {
        generator: TSMigrationGenerator,
        snapshot: false,
    },

    // TODO Just for the tests.
    metadataCache: {
        enabled: false,
    }
});

export const orm = await MikroORM.init(config);

export default config;

export function createRequestEntityManager(): EntityManager {
    return orm.em.fork({ useContext: true });
}
