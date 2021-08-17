import { ICreateJob, IJobInfo } from './IJob';

export interface IScheduler {
    load(): Promise<IJobInfo[]>;
    ensure(params: ICreateJob): Promise<any>;
    remove(params: { taskName: string; }): Promise<any>;
}
