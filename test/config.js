
module.exports = {
    $config: {
        $before() {
            process.on('unhandledRejection', (...args) => {
                console.log(args);
            });
            process.on('uncaughtException', (...args) => {
                console.log(args);
            });

            include
                .cfg('extentionDefault', { js: 'ts' })
                .cfg('amd', true);
        }
    },
    suites: {
        node : {
            exec: 'node',
            tests: 'test/**.spec.ts'
        }
    }
};
