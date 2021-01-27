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

        let argv = process.argv.slice(2).map(str => {
            if (str.includes(' ') && /'"\(/.test(str)) {
                return `"${str}"`;
            }
            return str;
        });
        let started = Date.now();
        let command = argv.join(' ');

        let shell = await Shell.run({
            command,
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


