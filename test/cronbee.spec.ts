import { cronbee } from '../src/export';
import { CronTabLib } from '../src/scheduler/providers/crontab/CronTabLib';

const taskName = 'atma\\test';

UTest({
    'system scheduler service': {
        async 'create tasks' () {
            await cronbee.ensure({
                taskName: taskName,
                taskRun: 'echo Foo',

                cron: `0 12 * * *`,
                schtaskFlags: `/sc daily /st 12:00`,
            });
        },

        async 'load tasks' () {
            let jobs = await cronbee.load();
            let job = jobs.find(x => x.name === taskName)

            notEq_(job, null);
        },

        async 'delete task' () {
            await cronbee.remove({
                taskName: taskName,
            });
        }
    },
    'use wsl on windows': {
        async 'create tasks' () {
            let crontab = new CronTabLib();
            await crontab.ensure ({
                taskName: taskName,
                taskRun: 'echo Foo',
                cron: `0 12 * * *`
            });
        },

        async 'load tasks' () {
            let crontab = new CronTabLib();
            let jobs = await crontab.load();
            let job = jobs.find(x => x.name === taskName)
            notEq_(job, null);
        },

        async 'delete task' () {
            let crontab = new CronTabLib();
            await crontab.remove({
                taskName: taskName,
            });
        }
    }
})
