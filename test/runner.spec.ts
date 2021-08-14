import { Shell } from 'shellbee';

UTest({
    async 'should execute command "dir"' () {
        let shell = await Shell.run({
            silent: true,
            command: 'node index dir'
        });

        has_(shell.std.join(''), 'tsconfig-build.json');
    }
})
