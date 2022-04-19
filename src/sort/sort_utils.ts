import {SortAlgorithm} from "./sort_algorithm";
const seedrandom = require('seedrandom')

/**
 *
 * @param algorithm
 * @param seed
 * @param inputSize
 * @param iterations
 */
export const benchmark = (algorithm: SortAlgorithm<any>,
                          seed: string | undefined,
                          inputSize: number,
                          maxInputNumber: number = 0,
                          iterations = 1,
                          debug = false): number[] => {

    let randomFn: () => number
    if (seed) {
        randomFn = seedrandom(seed)
    } else {
        randomFn = Math.random
    }

    function* generateNumbers(): Generator<number[]> {
        while (true) {
            let numbers: number[] = []
            for (let i = 0; i < inputSize; i++) {
                numbers.push(Math.floor(randomFn() * maxInputNumber))
            }
            yield numbers
        }
    }

    function* generateFloatingPoints(): Generator<number[]> {
        while (true) {
            let numbers: number[] = []
            for (let i = 0; i < inputSize; i++) {
                numbers.push(randomFn())
            }
            yield numbers
        }
    }

    const times: number[] = []
    const it = maxInputNumber ? generateNumbers() : generateFloatingPoints()
    for (let i = 0; i < iterations; i++) {
        const A = it.next().value
        const t1 = Number(process.hrtime.bigint())
        let result = algorithm.sort(A)
        debug && console.log(result)
        const t2 = Number(process.hrtime.bigint()) - t1;
        times.push(t2 / 1000000.0)
    }
    return times
};