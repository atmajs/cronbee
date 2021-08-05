import { Shell } from 'shellbee'
import { Monit } from 'atma-server-monit'
import { class_Uri } from 'atma-utils';
import { Commands } from './Commands';

export class Runner {
    async run () {

        let args = process.argv.slice(2);

        let task = args[0];
        if (task in Commands) {
            await Commands[task](args.slice(1));
            return;
        }

        let cwd = HandleArgs.extractCwdIfAny(args) ?? process.cwd();
        let command = HandleArgs.serialize(args);

        Monit.startLogger({
            directory: class_Uri.combine(cwd, '/logs/monit/')
        });

        let channel = Monit.createChannel('cronbee', {
            fields: [
                {
                    name: 'Date',
                    type: 'date',
                },
                {
                    name: 'Time',
                    type: 'number',
                },
                {
                    name: 'Command',
                    type: 'string',
                },
                {
                    name: 'Result',
                    type: 'number',
                },
                {
                    name: 'Info Logs',
                    type: 'text'
                },
                {
                    name: 'Error Logs',
                    type: 'text'
                }
            ]
        });

        let started = Date.now();
        try {
            let shell = await Shell.run({
                command,
                cwd
            });
            channel.writeRow([
                new Date(),
                Date.now() - started,
                command,
                shell.lastCode,
                shell.stdout.join(''),
                shell.stderr.join(''),
            ]);
            channel.flush();
        } catch (error) {
            channel.writeRow([
                new Date(),
                Date.now() - started,
                command,
                500,
                '',
                error.stack ?? error.message,
            ]);
            channel.flush();
        } finally {

        }
    }
}


namespace HandleArgs {
    function whitespaces (args: string[]) {
        for (let i = 0; i < args.length; i++) {
            let str = args[i];
            if (str.includes(' ') && /'"\(/.test(str)) {
                args[i] = `"${str}"`;
            }
        }
    }
    export function serialize (args: string[]) {
        whitespaces(args);
        return args.join(' ');
    }
    export function extractCwdIfAny (args: string[]) {
        for (let i = 0; i < args.length; i++) {
            let str = args[i];
            if (/[\-]{1,2}cwd/i.test(str)) {
                let cwd = args[i + 1];

                args.splice(i, 2);
                return cwd;
            }
        }
        return null;
    }
}
