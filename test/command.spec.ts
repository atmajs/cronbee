import { CommandUtil } from '../src/utils/CommandUtil'

UTest({
    async 'process command' () {
        let str = await CommandUtil.formatPaths('atma act foo', process.cwd());
        has_(str, process.cwd());

        str = await CommandUtil.formatPaths('cronbee atma act foo', process.cwd());
        has_(str, '.bin/atma');
        has_(str, /^cronbee/);
    }
})
