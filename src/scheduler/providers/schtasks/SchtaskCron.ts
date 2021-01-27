import { CsvUtil } from '../../../utils/CsvUtil';

export interface ISchtaskParams {
    sc: 'MINUTE' | 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE' | 'ONSTART' | 'ONLOGON' | 'ONIDLE'

    /** Specifies how often the task runs within its schedule type. */
    mo: string


    /** Specifies how often the task runs within its schedule type */
    d: string

    /**
     * Specifies a month or months of the year during which the scheduled task should run.
     * The valid options include JAN - DEC and * (every month). The /m parameter is valid only with a MONTHLY schedule.
     * It's required when the LASTDAY modifier is used. Otherwise, it's optional and the default value is * (every month).
     */
    m: string

    /**
     * Specifies the start time for the task, using the 24-hour time format, HH:mm. The default value is the current time on the local computer.
     * The /st parameter is valid with MINUTE, HOURLY, DAILY, WEEKLY, MONTHLY, and ONCE schedules.
     * It's required for a ONCE schedule.
     */
    st: string

    /** Specifies the date on which the task schedule starts */
    sd: string
}

export namespace SchtaskCron {
    export function parse (cron: string) {
        let [ minute, hour, dayMonth, month, dayWeek ] = cron.split(' ');

        let params = <ISchtaskParams> {};
        if (month !== '*' || dayMonth !== '*') {
            params.sc = 'MONTHLY';
        } else if (dayWeek !== '*') {
            params.sc = 'WEEKLY';
        } else if (hour !== '*') {
            params.sc = 'HOURLY';
        } else if (minute !== '*') {
            params.sc = 'MINUTE';
        }
    }
}
