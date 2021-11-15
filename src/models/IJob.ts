export interface IJobInfo {
    name: string
    path?: string
    nextRun?: Date
    enabled?: boolean
}


export interface ICreateJob {
    workingDirectory?: string

    taskName: string
    taskRun: string

    cron?: string

    active?: boolean

    /** Timing flags for Schtask */
    schtaskFlags?: string
}
