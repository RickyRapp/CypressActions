var path = require('path');
var glob = require('glob');
const fs = require('fs');

var ROOT = path.resolve(__dirname, '..');

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [ROOT].concat(args));
}

function readEnviornment(prefix) {
    var truePrefix = prefix + '_';
    return Object
        .keys(process.env)
        .filter(key => key.startsWith(truePrefix))
        .reduce((prevValue, currentValue) => {
            var settingsKey = currentValue.substr(truePrefix.length);
            prevValue[settingsKey] = process.env[currentValue];
        }, {});
}

function scanSync(directoryPath, options = {}, callback) {
    fs.readdirSync(directoryPath).forEach((file, idx) => {
        var filePath = path.join(directoryPath, file);
        var stat = fs.statSync(filePath);

        var fileFunc = options.directory === true ? () => {} : () => callback(filePath, stat);
        var directoryFunc = options.directory === true ? () => callback(filePath, stat) : () => scanSync(filePath, callback);

        if (stat.isFile()) {
            fileFunc();
        } else if (stat.isDirectory()) {
            directoryFunc();
        }
    });
}

exports.root = root;
exports.readEnviornment = readEnviornment;
exports.scanSync = scanSync;
