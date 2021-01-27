import memd from 'memd';
import { ICreateJob, IJobInfo } from '../../../models/IJob';
import { IScheduler } from '../../../models/IScheduler';
import { CronTab } from './CronTab';

export class CronTabLib implements IScheduler {


    async load (): Promise<IJobInfo[]> {
        let crontab = await CronTabLoader.load();

        return crontab._jobs.map(job => {
            return {
                name: job._comment?.comment || job.line,
                enabled: true,
                command: job._command?.command,
            };
        })
    }

    async ensure (params: ICreateJob) {
        if (!params.cron) {
            throw new Error(`To use crontab provide the cron pattern`);
        }

        let crontab = await CronTabLoader.load();
        let job = crontab._jobs.find(x => x._comment?.comment === params.taskName);
        if (job != null) {
            return job;
        }

        job = crontab.create(params.taskRun, params.cron, params.taskName);
        await crontab.save();
        return job;
    }

    async remove (params: { taskName: string }) {
        let crontab = await CronTabLoader.load();
        let job = crontab._jobs.find(x => x._comment?.comment === params.taskName);
        if (job == null) {
            return;
        }

        crontab.remove(job);
        await crontab.save();
    }
};

class CronTabLoader {

    @memd.deco.memoize()
    static load (user?: string): Promise<CronTab> {
        return new Promise((resolve, reject) => {
            function cb(err, crontab) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(crontab);
            }
            if (typeof user === 'string') {
                new CronTab(user, cb);
                return;
            }

            new CronTab('', cb);
        });
    }
}
