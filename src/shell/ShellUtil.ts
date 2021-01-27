import { spawn } from 'child_process';

export namespace ShellUtil {

    export function exec (command, args): Promise<{ code, stdout, stderr }> {
        return new Promise((resolve, reject) => {
            let stdout = '';
            let stderr = '';

            let child = spawn(command, args);

            child.stdout.setEncoding('utf8');
            child.stderr.setEncoding('utf8');

            child.stdout.on('data', function (chunk) {
                stdout += chunk;
            });
            child.stderr.on('data', function (chunk) {
                stderr += chunk;
            });
            child.on('error', function (err) {
                reject(err);
            });
            child.on('close', function (code) {
                resolve({ code, stderr, stdout });
            });
        })
    }
}
