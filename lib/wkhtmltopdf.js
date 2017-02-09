'use strict';

var spawn = require('child_process').spawn;

function wkhtmltopdf(options, input, pageOptions, output, callback) {

    var child, html;

    // options
    if (options) {
        options = options.join(' ');
    } else {
        options = '--quiet';
    }

    if (pageOptions) {
      pageOptions = pageOptions.join(' ')
    } else {
      pageOptions = ''
    }

    // input
    var isUrl = /^(https?|file):\/\//.test(input);

    if (!isUrl) {
        html = input;
        input = '-';
    }

    // output
    if (!output) {
        output = '-';
    }

    // Execute
    if (process.platform === 'win32') {
        child = spawn('wkhtmltopdf', options + ' ' + input + ' ' + pageOptions + ' '  + output);
    } else {
        child = spawn('/bin/sh', ['-c', 'wkhtmltopdf ' + options + ' ' + input + ' ' + pageOptions + ' '  + output + ' | cat']);
    }
    if (callback){
      child.on('exit', function() { callback(null); });
    }

    if (!isUrl) {
        child.stdin.end(html);
    }

    return child.stdout;
}

wkhtmltopdf.command = 'wkhtmltopdf';
module.exports = wkhtmltopdf;
