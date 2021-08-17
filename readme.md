# Cronbee

<p align='center'>
    <img src='assets/background.jpg'/>
</p>

----

[![Build Status](https://travis-ci.com/atmajs/cronbee.svg?branch=master)](https://travis-ci.com/atmajs/cronbee)
[![NPM version](https://badge.fury.io/js/cronbee.svg)](http://badge.fury.io/js/cronbee)

Manage, run and log all your scheduled tasks using system capabilities with **`crontab`** and **`schtasks`**



### CLI

```bash
# List active cron jobs created with `cronbee`
$ cronbee list

# Remove active cron jobs created with `cronbee`
cronbee clear

# Ensure cron jobs (from File)
$ cronbee ensure ./cronbee.json
```


`JSON` sample, see `cronbee.ensure` API for full parameters list for a task.

```json
{
    "tasks": [
        {
            "taskName": "some_echo",
            "taskRun": "cronbee echo Foo",
            "cron":  "0 12 * * *",
            "schtaskFlags": "/sc daily /st 12:00"
        }
    ]
}
```

> `taskRun` - `cronbee` prefix means, the `os` starts the `cronbee` process at specified interval. `cronbee` starts underlying process. The wrapped process is for monitoring and logging purpose. You will get the information how much time your task took and if it was successful. If you do not need the logging feature, you can provide just the command (without `cronbee`)

### API

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
    workingDirectory: '/home/www'

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

Though you can define any shell command to be executed at scheduled time by the `os`, you can also use the `cronbee` as the wrapped runner, to log executions to CSV files. Just prefix your command with `cronbee` and you are done. The logs can be found in `./logs/everlog/cronbee`

```ts
await cronbee.ensure({
    // ... config
    taskRun: `cronbee node emailchecker --foo`,
});
```

### Additional Hints

1. We can start commands from `./node_modules/.bin/` directory, so you can use just the command name.

2. Output all std output to a file by appending `>> /path/to/logfile.log 2>&1` to you cron command.

🏁

----
©️ MIT License.
