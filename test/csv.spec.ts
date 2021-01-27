import { CsvUtil } from '../src/utils/CsvUtil'

UTest({
    'parse csv' () {
        let arr;

        arr = CsvUtil.parse(`
            "foo","bar"
            "qux","dex"
        `);
        deepEq_(arr, [
            ['foo', 'bar'],
            ['qux', 'dex']
        ]);

        arr = CsvUtil.parse(`1,2,3,4,5`);
        deepEq_(arr, [
            ['1', '2', '3', '4', '5'],
        ]);
    },
    'split cron' () {
        let arr = CsvUtil.parse(`0 30 3/1 * *`, ' ');
        deepEq_(arr, [
            ['0', '30', '3/1', '*', '*']
        ]);
    }
})
