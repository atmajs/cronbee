import { CommandUtil } from '../src/utils/CommandUtil'

UTest({
    async 'process command' () {
        let str = await CommandUtil.formatPaths('atma act foo', process.cwd());
        console.log(str);
    }
})
