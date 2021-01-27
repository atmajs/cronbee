import * as dts from 'dts-bundle';
import { File, Directory } from 'atma-io';

async function process () {

    let files = await Directory.readFilesAsync(`./ts-temp/`, `**.d.ts`);
    for (let file of files) {
        await Preprocess.run(file);
    }

    dts.bundle(<any> {
        name: 'cronbee',
        main: './ts-temp/export.d.ts',
        out: './typings/index.d.ts'
    });

    File.copyTo('./ts-temp/typings/index.d.ts', './lib/cronbee.d.ts');
}

namespace Preprocess {
    function normalizeGlobalImports (source: string) {
        let importGlobal = /^[ \t]*import ['"][^'"]+['"];?[ \t]*$/gm;
        let str = source.replace(importGlobal, '');
        return {
            source: str,
            modified: source !== str
        };
    }
    function normalizeInterfaceImports (source: string) {
        let importsRgx = /import\("([^"]+)"\)\.([a-zA-Z_$\d]+)/g;
        let handled = {};
        let out = source;
        // extract
        do {
            let match = importsRgx.exec(source);
            if (match == null) {
                break;
            }
            let [_, path, name ] = match;

            let key = `${path}:${name}`;
            if (key in handled) {
                continue;
            }

            out = `import { ${name} } from '${path}'; \n ${out}`;
            handled[key] = 1;
        } while (true);


        if (out === source) {
            return { source: out, modified: false }
        }

        // remove
        out = out.replace(importsRgx, '$2');
        return { source: out, modified: true }
    }
    // function normalizeDefaultImports (source: string) {
    //     // Remove smth. like: import { default } from 'atma-server/middleware/static';
    //     let importsRgx = /import\s*\{\s*default\s*\}\s*from\s*['"][^'"]+['"];?/g;

    //     // remove
    //     let str = source.replace(importsRgx, '');
    //     return {
    //         source: str,
    //         modified: source !== str
    //     };
    // }


    export async function run (file: InstanceType<typeof File>) {
        let source = await file.readAsync<string>({ skipHooks: true, encoding: 'utf8' });

        let result = null;
        let modified = false;

        result = normalizeGlobalImports(source);
        modified = result.modified || modified;

        result = normalizeInterfaceImports(result.source);
        modified = result.modified || modified;

        // result = normalizeDefaultImports(result.source);
        // modified = result.modified || modified;

        if (modified === false) {
            // no imports
            return;
        }
        await file.writeAsync(result.source, { skipHooks: true });
    }
}

export { process }
