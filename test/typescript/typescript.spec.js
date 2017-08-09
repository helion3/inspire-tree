var path = require('path');
var ts = require('typescript');

var d = path.join(__dirname, '..', '..', 'inspire-tree.d.ts');

function compile(fileNames, options) {
    fileNames = Array.isArray(fileNames) ? fileNames : [fileNames];
    let program = ts.createProgram(fileNames, options);
    let emitResult = program.emit();

    let allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

    allDiagnostics.forEach(diagnostic => {
        var { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
        var message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
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
