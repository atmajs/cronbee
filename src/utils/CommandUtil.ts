import { class_Uri } from 'atma-utils';
import { File } from 'atma-io';

export namespace CommandUtil {
    export async function formatPaths(command: string, cwd: string) {
        command = command.trim();
        command = ensureCwdIfCronbee(command, cwd);

        command = await rewriteAbsPath(command, cwd);
        command = ensureCwd(command, cwd);
        return command;
    }

    async function rewriteAbsPath(command: string, cwd: string): Promise<string> {
        let rgxCommand = /^[^\s]+/;
        let match = rgxCommand.exec(command);
        if (match == null) {
            return command;
        }
        if (match[0] === 'cronbee') {
            command = await rewriteAbsPath(slice(command, match), cwd);
        }
        let path = await getAbsPathIfNodeModule(match[0], cwd);
        if (path) {
            command = `${path} ${slice(command, match)}`;
        }
        return command;
    }

    function slice(str: string, match: RegExpMatchArray) {
        return str.substring(match.index + match[0].length + 1).trim();
    }

    async function getAbsPathIfNodeModule(name: string, cwd) {
        let path = class_Uri.combine(cwd, '/node_modules/.bin/', name);
        let exists = await File.existsAsync(path);
        if (exists) {
            return path;
        }
        return null;
    }

    function ensureCwd(str: string, cwd) {
        if (str.includes('-cwd') === false && process.platform !== 'win32') {
            return `cd ${cwd} && ${str}`;
        }
        return str;
    }

    function ensureCwdIfCronbee(command: string, cwd) {
        if (command.includes('cronbee') && command.includes('-cwd') === false) {
            return `${command} --cwd ${cwd}`;
        }
        return command;
    }
}
