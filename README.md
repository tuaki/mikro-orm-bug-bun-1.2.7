## MikroORM + Bun 1.2.7
In Bun versions 1.2.7 and 1.2.8, MikroORM doesn't work and fails with the error
> Source file './relative/path/to/my/entity.ts' not found

In Bun 1.2.6, it works fine.
To reproduce:

```sh
docker compose up -d
docker compose exec bun bun install
docker compose exec bun bun mikro-orm debug
docker compose exec bun bun testorm  # this should fail
```

Try downgrading Bun to 1.2.7 by editing the `compose.yml` and trying the commands above again. Everything should work correctly.

There's the PR https://github.com/mikro-orm/mikro-orm/pull/6564 that fixes this. The easiest way to test it is to open `node_modules/@mikro-orm/core/utils/Utils.js` and applying the [single line change](https://github.com/mikro-orm/mikro-orm/pull/6564/files) on line 669.
