

import { Shell } from 'shellbee'
import { ICreateJob, IJobInfo } from '../../../models/IJob';
import { IScheduler } from '../../../models/IScheduler';
import { CsvUtil } from '../../../utils/CsvUtil';

/**
 * https://docs.microsoft.com/de-de/windows-server/administration/windows-commands/schtasks-create
 */

export class SchtasksLib implements IScheduler {

    async load (): Promise<IJobInfo[]> {

        let shell = await Shell.run({
            silent: true,
            command: `schtasks /query /fo CSV /nh`
        });

        return new Promise(resolve => {
            shell.onComplete(shell => {
                let table = CsvUtil.parse(shell.stdout.join(''));

                let jobs = table.map(row => {
                    return <IJobInfo> {
                        name: row[0].replace(/^\\/, ''),
                        path: row[0],
                        nextRun: row[1] === 'N/A' ? null : new Date(row[1]),
                        enabled: row[2] === 'Ready',
                    }
                });
                resolve(jobs);
            });
        });
    }
    async ensure (params: ICreateJob) {
        if (!params.schtaskFlags) {
            throw new Error(`To use schtasks provide cli time flags, e.g. "schtaskFlags": "/sc daily /st 12:00"`);
        }

        let args = [
            `/f`,
            `/tn "${params.taskName}"`,
            `/tr "cmd /C ${params.taskRun}"`,
            params.schtaskFlags
        ].filter(Boolean);

        let command = `schtasks /create ` + args.join(' ');

        let shell = await Shell.run({
            silent: true,
            command
        });

        return new Promise((resolve, reject) => {
            shell.onComplete(shell => {
                if (shell.lastCode > 0) {
                    reject(shell.stderr.join(''));
                    return;
                }
                resolve(shell.stdout.join(''));
            });
        });
    }

    async remove (params: { taskName: string}) {
        let shell = await Shell.run({
            silent: true,
            command: `schtasks /delete /tn "${params.taskName}" /f`
        });
        return new Promise((resolve, reject) => {
            shell.onComplete(shell => {
                if (shell.lastCode > 0) {
                    reject(shell.stderr.join(''));
                    return;
                }
                resolve(shell.stdout.join(''));
            });
        });
    }
}
