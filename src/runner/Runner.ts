import { Shell } from 'shellbee'
import { Everlog } from 'everlog'
import { class_Uri } from 'atma-utils';
import { Commands } from './Commands';
import { CommandUtil } from '../utils/CommandUtil';

export class Runner {
    async execute (params: string | string[]): Promise<Shell> {
        if (typeof params === 'string') {
            params = CommandUtil.split(params);
        }

        let task = params[0];
        if (task in Commands) {
            await Commands[task](params.slice(1));
            return;
        }

        let cwd = HandleArgs.extractCwdIfAny(params) ?? process.cwd();
        let command = HandleArgs.serialize(params);

        Everlog.initialize({
            directory: class_Uri.combine(cwd, '/logs/everlog/')
        });

        let channel = Everlog.createChannel('cronbee', {
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

            return shell;
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
    async runFromCli () {

        let args = process.argv.slice(2);
        await this.execute(args);
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
    /** Serialize array of parameters into one single command line string */
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
