/**
 *
 * @param min
 * @param max
 */
export const randomNumberBetween = (min: number, max: number) =>  Math.floor(Math.random() * (max - min + 1)) + min;


// const sum = arr => arr.reduce((a, b) => a + b, 0);
// const mean = arr => sum(arr) / arr.length;

/**
 *
 * @param A
 * @param quantile
 */
export const quantile = (A: number[], quantile: number) => {
    const sorted = A.sort((a, b) => a - b);
    const pos = (sorted.length - 1) * quantile;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (sorted[base + 1] !== undefined) {
        return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    } else {
        return sorted[base];
    }
};


export function* numberListGenerator(size: number, max: number): Generator<number[]> {
    while (true) {
        let numbers: number[] = []
        for (let i = 0; i < size; i++) {
            numbers.push(Math.floor(Math.random() * max))
        }
        yield numbers
    }
}