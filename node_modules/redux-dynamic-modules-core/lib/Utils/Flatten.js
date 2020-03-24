"use strict";
exports.__esModule = true;
function flatten(arr) {
    if (arr) {
        var res = arr.slice();
        var i = 0;
        while (i < res.length) {
            if (Array.isArray(res[i])) {
                res.splice.apply(res, [i, 1].concat(res[i]));
            }
            else {
                i++;
            }
        }
        return res;
    }
    return arr;
}
exports.flatten = flatten;
