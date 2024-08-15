import { Shell } from 'shellbee'
import { Everlog } from 'everlog'
import { class_Uri } from 'atma-utils';
import { Commands } from './Commands';
import { CommandUtil } from '../utils/CommandUtil';
import type { IShellParams } from 'shellbee/interface/IProcessParams';

export interface ICronbeeParams {
    // in MINUTES
    timeout?: number
}

const DEFAULT_TIMEOUT_MINS =  2 * 60; // 2 hours

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
        let cronbeeOptions = HandleArgs.extractCronbeeOptionsIfAny(params);
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
            let shell = await this.exec({
                command,
                cwd
            }, cronbeeOptions);

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
    private async exec (params: IShellParams, opts?: {
        timeout?: number
    }): Promise<Shell> {
        return new Promise((resolve, reject) => {
            let completed = false;
            let shell = new Shell(params, );
            let promise = shell.run();
            let timer;

            let timeout = Number(opts?.timeout ?? DEFAULT_TIMEOUT_MINS ?? 0);
            if (timeout > 0) {
                let ms = timeout * 60 * 1000;
                timer = setTimeout(async () => {
                    if (completed) {
                        return;
                    }
                    completed = true;
                    await shell.terminate();

                    shell.lastCode = -1;
                    shell.stderr.push('cronbee: Command timed out');
                    resolve(shell);
                }, ms);
            }

            promise.then((result) => {
                if (completed) {
                    return;
                }
                clearTimeout(timer);
                completed = true;
                resolve(shell);
            }, error => {
                if (completed) {
                    return;
                }
                clearTimeout(timer);
                completed = true;
                reject(error);
            })
        })

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

    export function extractCronbeeOptionsIfAny (args: string[]) {
        let opts: ICronbeeParams = {};
        for (let i = 0; i < args.length; i++) {
            let str = args[i];
            let rgxKey = /[\-]{1,2}cronbee\-(?<key>.+)/i;
            let match = rgxKey.exec(str);
            if (match) {
                let key = match.groups!.key;
                let value = args[i + 1];

                switch (key) {
                    case 'timeout':
                        opts.timeout = parseInt(value);
                        break;
                    default:
                        throw new Error(`Invalid cronbee option ${key}`);
                }

                args.splice(i, 2);
            }
        }
        return opts;
    }
}
