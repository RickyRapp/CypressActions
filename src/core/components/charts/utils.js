/**
 * Calculates average value in the given array
 * @param data array of numeric data
 * @returns {number} Average value
 */
export function average(data) {
    if(!Array.isArray(data)) {
        throw new Error("argument is not an array. utils.js average()");
    }

    let sum, avg = 0;
    if(data.length) {
        sum = data.reduce((a, b) => a + b);
        avg = sum / data.length;
    }

    return avg
}
