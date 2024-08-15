import { Shell } from 'shellbee';
import { Runner } from '../src/runner/Runner';

UTest({
    async 'should execute dir direct via runner' () {
        let runner = new Runner();
        let shell = await runner.execute('dir');

        has_(shell.std.join(''), 'tsconfig-build.json');
    },
    async '!should terminate stale command' () {
        let runner = new Runner();
        let shell = await runner.execute('node ./test/fixtures/stale.js --cronbee-timeout 1500');

        let stdout = shell.stdout.join('');
        let stderr = shell.stderr.join('');
        has_(stderr, 'cronbee: Command timed out');
    },
    async 'should execute command "dir" via CRONBEE index' () {
        let shell = await Shell.run({
            silent: true,
            command: 'node index dir'
        });

        has_(shell.std.join(''), 'tsconfig-typedoc.json');
    }
})
