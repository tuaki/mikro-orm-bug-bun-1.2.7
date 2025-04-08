import { orm } from './orm';
import { program, type Command } from 'commander';
import { databaseCommand } from './database.command';

program.name('cli');

const commands: Command[] = [
    databaseCommand,
];

for (const command of commands)
    program.addCommand(command);

await program.parseAsync(process.argv);

await orm.close();
