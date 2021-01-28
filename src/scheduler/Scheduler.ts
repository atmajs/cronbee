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
        let path = params.workingDirectory ?? process.cwd();

        if (params.taskRun.includes('cronbee') && params.taskRun.includes('-cwd') === false) {
            params.taskRun = `${params.taskRun} --cwd ${path}`;
        }
        if (params.taskRun.includes('-cwd') === false && process.platform !== 'win32') {
            params.taskRun = `cd ${path} && ${params.taskRun}`;
        }
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
