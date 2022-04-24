import {SortAlgorithm} from "./sort_algorithm";
import {quantile} from '../utils';
import {benchmark} from "./sort_utils";
import * as fs from 'fs'

/**
 * Insertion sort implementation of the sort algorithm
 *
 * Implemented based on the pseudocode from the Algorithms in a nutshell book.
 * @Author Kenny G
 */
export class InsertionSort<T> implements SortAlgorithm<T> {

    /**
     * Performance cost:
     * Best case: O( N ) - when list is already sorted
     * Average case: O ( N^2 )
     * Worst case: O ( N^2 )
     *
     * @param A
     */
    sort(A: T[]): T[] {
        let _A = [...A]
        for (let i = 0; i < A.length; i++) {
            this.insert(_A, i, A[i])
        }
        return _A
    }

    /**
     *
     * @param A
     * @param position
     * @param value
     */
    insert(A: T[], position: number, value: T) {
        let i = position - 1;
        while(i >= 0 && A[i] > value) {
            A[i + 1] = A[i]
            i = i - 1
        }
        A[i+1] = value
    }

}

if (require.main === module) {
    const algorithm = new InsertionSort();
    let times = benchmark(algorithm, undefined, 10, 100, 100)

    console.log('Insertion sort times for input size 10')
    console.log(`percentile, times`)
    console.log(`25percentile, ${quantile(times, 0.25)}`)
    console.log(`50percentile, ${quantile(times, 0.50)}`)
    console.log(`75percentile, ${quantile(times, 0.75)}`)
    console.log(`90percentile, ${quantile(times, 0.9)}`)
    console.log(`95percentile, ${quantile(times, 0.95)}`)
    console.log(`99percentile, ${quantile(times, 0.99)}`)


    times = benchmark(algorithm, undefined, 100, 999,100)
    console.log('Insertion sort times for input size 100')
    console.log(`percentile, times`)
    console.log(`25percentile, ${quantile(times, 0.25)}`)
    console.log(`50percentile, ${quantile(times, 0.50)}`)
    console.log(`75percentile, ${quantile(times, 0.75)}`)
    console.log(`90percentile, ${quantile(times, 0.9)}`)
    console.log(`95percentile, ${quantile(times, 0.95)}`)
    console.log(`99percentile, ${quantile(times, 0.99)}`)

    times = benchmark(algorithm, undefined, 1000, 999,100)
    console.log('Insertion sort times for input size 1000')
    console.log(`percentile, times`)
    console.log(`25percentile, ${quantile(times, 0.25)}`)
    console.log(`50percentile, ${quantile(times, 0.50)}`)
    console.log(`75percentile, ${quantile(times, 0.75)}`)
    console.log(`90percentile, ${quantile(times, 0.9)}`)
    console.log(`95percentile, ${quantile(times, 0.95)}`)
    console.log(`99percentile, ${quantile(times, 0.99)}`)

    times = benchmark(algorithm, undefined, 10000, 9999,100)
    console.log('Insertion sort times for input size 1000')
    console.log(`percentile, times`)
    console.log(`25percentile, ${quantile(times, 0.25)}`)
    console.log(`50percentile, ${quantile(times, 0.50)}`)
    console.log(`75percentile, ${quantile(times, 0.75)}`)
    console.log(`90percentile, ${quantile(times, 0.9)}`)
    console.log(`95percentile, ${quantile(times, 0.95)}`)
    console.log(`99percentile, ${quantile(times, 0.99)}`)

    const lines: string[] = []
    for (let i = 0; i < 10000; i++) {
        times = benchmark(algorithm, undefined, i, 0, 10)
        lines.push(quantile(times, 0.50).toString(10))
    }
    fs.writeFileSync('./insertion_sort_data.txt', lines.join("\n"), 'utf-8');
}