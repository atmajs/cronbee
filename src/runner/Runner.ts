import { Shell } from 'shellbee'
import { Monit } from 'atma-server-monit'

export class Runner {
    async run () {

        Monit.startLogger({ directory: './logs' });

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

        let args = process.argv.slice(2);

        let cwd = HandleArgs.extractCwdIfAny(args);
        let command = HandleArgs.serialize(args);
        let started = Date.now();
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
