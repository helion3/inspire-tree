const path = require('path');
const ts = require('typescript');

const d = path.join(__dirname, '..', '..', 'inspire-tree.d.ts');

function compile(fileNames, options) {
    fileNames = Array.isArray(fileNames) ? fileNames : [fileNames];
    const program = ts.createProgram(fileNames, options);
    const emitResult = program.emit();

    const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

    allDiagnostics.forEach(diagnostic => {
        const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
        const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        throw new Error(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`, {
            actual: diagnostic
        });
    });
}

describe('typescript definition', () => {
    it('compiles', () => {
        compile(d, {
            target: ts.ScriptTarget.ES5,
            module: ts.ModuleKind.CommonJS
        });
    });
});
