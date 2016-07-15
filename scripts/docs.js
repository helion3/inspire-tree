#!/usr/bin/env node

var _ = require('lodash');
var docdown = require('docdown');
var fs = require('fs');
var path = require('path');
var srcPath = path.join(__dirname, '../src');
var outPath = path.join(__dirname, '../docs');

// Define which files to scan
var sourceFiles = [
    'tree.js',
    'treenode.js',
    'treenodes.js'
];

// Create output directory
if (!fs.existsSync(outPath)) {
    fs.mkdirSync(outPath);
}

_.each(sourceFiles, function(sourceFile) {
    var markdown = docdown({
        title: '',
        toc: 'categories',
        path: path.join(srcPath, sourceFile),
        url: 'https://github.com/helion3/inspire-tree/blob/master/src/' + sourceFile
    });

    var docName = sourceFile.split('/').pop().replace('.js', '.md');

    // Write file
    fs.writeFile(path.join(outPath, docName), markdown, function(err) {
        if (err) {
            console.log('Error writing to file:');
            console.log(err);
            return;
        }

        console.log('Wrote output for ' + sourceFile);
    });
});
