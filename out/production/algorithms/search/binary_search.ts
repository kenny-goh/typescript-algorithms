import {SearchAlgorithm} from "./search_algorithm";
import {benchmark} from "../search/search_utils";
import {quantile} from "../utils";
import * as fs from 'fs'

/**
 * Binary search algorithm
 */
class BinarySearch<T> implements SearchAlgorithm<T> {

    /**
     *
     * Performance cost:
     * Best case: O( 1 )  - The first element found is the answer
     * Average case: O ( LOG N )
     * Worst case: O ( LOG N )
     *
     * @param A
     * @param element
     */
    search(A: T[], element: T): boolean {
        let [low, high]: number[] = [0, A.length-1]
        while (low <= high) {
            let ix = Math.floor((low + high) / 2)
            if (element == A[ix]) {
                return true
            } else if (element < A[ix]) {
                high = ix - 1
            } else {
                low = ix + 1
            }
        }
        return false
    }

}

if (require.main === module) {

    const algorithm = new BinarySearch<number>();
    console.log(algorithm.search([1,2,3,4,5,6,7,8,0,10,11,12,13,14,15,16,17,18,19,20], 19))
    let times = benchmark(algorithm,undefined,100000,100000,100)
    console.log('Binary search times for input size 1000000')
    console.log(`percentile, times`)
    console.log(`25percentile, ${quantile(times, 0.25)}`)
    console.log(`50percentile, ${quantile(times, 0.50)}`)
    console.log(`75percentile, ${quantile(times, 0.75)}`)
    console.log(`90percentile, ${quantile(times, 0.9)}`)
    console.log(`95percentile, ${quantile(times, 0.95)}`)
    console.log(`99percentile, ${quantile(times, 0.99)}`)


    const lines: string[] = []
    for (let i = 0; i < 10000; i++) {
        times = benchmark(algorithm, undefined, i, 10000, 10)
        lines.push(quantile(times, 0.50).toString(10))
    }
    fs.writeFileSync('./binary_search_data.txt', lines.join("\n"), 'utf-8');
}