import { LockFile, env } from 'atma-io'
import { class_Uri } from 'atma-utils'

export class Journal {

    private path = new class_Uri(`file://` + env.appdataDir).combine('/cronbee/journal.json').toString();
    private lock = new LockFile(this.path);

    async startTask (task: { cwd: string }) {

    }
    endTask () {

    }

    getActiveTasks () {

    }
}
