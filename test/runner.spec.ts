import { Shell } from 'shellbee';
import { Runner } from '../src/runner/Runner';

UTest({
    async 'should execute dir direct via runner' () {
        let runner = new Runner();
        let shell = await runner.execute('dir');

        has_(shell.std.join(''), 'tsconfig-build.json');
    },
    async 'should execute command "dir" via CRONBEE index' () {
        let shell = await Shell.run({
            silent: true,
            command: 'node index dir'
        });

        has_(shell.std.join(''), 'tsconfig-typedoc.json');
    }
})
