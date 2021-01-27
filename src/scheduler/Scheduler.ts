import memd from 'memd';
import { IJobInfo, ICreateJob } from '../models/IJob';
import { IScheduler } from '../models/IScheduler';
import { CronTabLib } from './providers/crontab/CronTabLib';
import { SchtasksLib } from './providers/schtasks/SchtasksLib';


export class Scheduler implements IScheduler{
    load(): Promise<IJobInfo[]> {
        return this.getSystem().load();
    }
    ensure(params: ICreateJob): Promise<any> {
        return this.getSystem().ensure(params);
    }
    remove(params: { taskName: string; }): Promise<any> {
        return this.getSystem().remove(params);
    }

    @memd.deco.memoize()
    private getSystem () {
        if (process.platform === 'win32') {
            return new SchtasksLib();
        }
        return new CronTabLib();
    }
}
