# Cronbee

----
[![Build Status](https://travis-ci.org/atmajs/cronbee.svg?branch=master)](https://travis-ci.org/atmajs/cronbee)
[![NPM version](https://badge.fury.io/js/cronbee.svg)](http://badge.fury.io/js/cronbee)

Manage, run and log all your scheduled tasks using system capabilities: **`crontab`** and **`schtasks`**

### Scheduler

##### Create scheduled task

> If the task already exists, does nothing

```ts
import { cronbee } from 'cronbee'

await cronbee.ensure({
    // Name your task
    taskName: 'check emails',
    // Execute any Shell command with arguments
    taskRun: `node emailchecker --foo`,

    // By default the working directory will be the current directory
    workingDirectory: '/home/www/web'

    /** Depending on the system, define timing configurations for crontab or schtasks separately */

    // crontab example
    cron: '0 12 * * *',

    // schtasks example
    schtaskFlags: '/sc daily /st 12:00',
})
```

##### List scheduled tasks
```ts
let tasks = await cronbee.load();
```

##### Remove scheduled task
```ts
await cronbee.remove({ taskName: 'check emails' });
```


### Runner

Though you can define any shell command to be executed at scheduled time, you can also use the `cronbee` as a wrapped runner, to log executions to CSV files. Just prefix your command with `cronbee` and you are done.

```ts
await cronbee.ensure({
    // ... config
    taskRun: `cronbee node emailchecker --foo`,
});
```

----