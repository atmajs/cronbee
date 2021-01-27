import { cronbee } from '../src/export'

UTest({
    async 'library' () {

        await cronbee.ensure({
            // Name your task
            taskName: 'check emails',
            // Execute any Shell command with arguments
            taskRun: `node emailchecker --foo`,

            /** Depending, which system you are using define timings */

            // crontab example
            cron: '0 12 * * *',

            // schtasks example
            schtaskFlags: '/sc daily /st 12:00',
        })
    }
})
