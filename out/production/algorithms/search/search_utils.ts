
import {SearchAlgorithm} from "./search_algorithm";
const seedrandom = require('seedrandom')


/**
 *
 * @param algorithm
 * @param seed
 * @param inputSize
 * @param iterations
 */
export const benchmark = (algorithm: SearchAlgorithm<any>,
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

    const times: number[] = []
    const it = generateNumbers()

    for (let i = 0; i < iterations; i++) {
        const randomArr: number[] = it.next().value
        const randomIndex = Math.floor(Math.random() * randomArr.length);
        const randomElement = randomArr[randomIndex]
        const t1 = Number(process.hrtime.bigint())
        let result = algorithm.search(randomArr, randomElement )
        debug && console.log(result)
        const t2 = Number(process.hrtime.bigint()) - t1;
        times.push(t2 / 1000000.0)
    }
    return times
};