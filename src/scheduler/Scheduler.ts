import memd from 'memd';
import { IJobInfo, ICreateJob } from '../models/IJob';
import { IScheduler } from '../models/IScheduler';
import { CronTabLib } from './providers/crontab/CronTabLib';
import { SchtasksLib } from './providers/schtasks/SchtasksLib';
import { CommandUtil } from '../utils/CommandUtil';

export class Scheduler implements IScheduler{
    load(): Promise<IJobInfo[]> {
        return this.getSystem().load();
    }
    async ensure(params: ICreateJob): Promise<any> {
        let cwd = params.workingDirectory ?? process.cwd();

        params.taskRun = await CommandUtil.formatPaths(params.taskRun, cwd);
        return this.getSystem().ensure(params);
    }
    remove(params: { taskName: string; }): Promise<any> {
        return this.getSystem().remove(params);
    }

    @memd.deco.memoize()
    private getSystem (): IScheduler {
        if (process.platform === 'win32') {
            return new SchtasksLib();
        }
        return new CronTabLib();
    }
}



