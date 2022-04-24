import {PartitionSort} from "./partition_sort";
import {quantile, randomNumberBetween} from "../utils";
import * as fs from 'fs'
import {benchmark} from "./sort_utils";

/**
 *
 */
export class QuickSort<T> extends PartitionSort<T>{

    /**
     *
     * Performance cost:
     * Best case: O(N LOG N)
     * Average case: O (N LOG N)
     * Worst case: O (N^2)
     *
     * @param A
     */
    sort = (A: T[]): T[] => {
        let _A = [...A]
        this.quickSortRecursive(_A, 0, _A.length-1)
        return _A
    }

    quickSortRecursive(A: T[], left: number, right: number) {
        if (left < right) {
            let pivotIndex = randomNumberBetween(left, right)
            const pi = this.partition(A, left, right, pivotIndex)
            this.quickSortRecursive(A, left, pi - 1)
            this.quickSortRecursive(A, pi+1, right)
        }
    }
}

if (require.main === module) {
    const algorithm = new QuickSort<number>();
    console.log(algorithm.sort([5,4,3,2,2,2,1,5,6,7,5,33,1]))
    let times = benchmark(algorithm, undefined, 10, 0,1000)
    // console.log('quicksort times for input size 10')
    // console.log(`percentile, times`)
    // console.log(`25percentile, ${quantile(times, 0.25)}`)
    // console.log(`50percentile, ${quantile(times, 0.50)}`)
    // console.log(`75percentile, ${quantile(times, 0.75)}`)
    // console.log(`90percentile, ${quantile(times, 0.9)}`)
    // console.log(`95percentile, ${quantile(times, 0.95)}`)
    // console.log(`99percentile, ${quantile(times, 0.99)}`)
    //
    //
    // times = benchmark(algorithm, undefined, 100, 0,100)
    // console.log('quicksort times for input size 100')
    // console.log(`percentile, times`)
    // console.log(`25percentile, ${quantile(times, 0.25)}`)
    // console.log(`50percentile, ${quantile(times, 0.50)}`)
    // console.log(`75percentile, ${quantile(times, 0.75)}`)
    // console.log(`90percentile, ${quantile(times, 0.9)}`)
    // console.log(`95percentile, ${quantile(times, 0.95)}`)
    // console.log(`99percentile, ${quantile(times, 0.99)}`)
    //
    // times = benchmark(algorithm, undefined, 1000, 0,100)
    // console.log('quicksort times for input size 1000')
    // console.log(`percentile, times`)
    // console.log(`25percentile, ${quantile(times, 0.25)}`)
    // console.log(`50percentile, ${quantile(times, 0.50)}`)
    // console.log(`75percentile, ${quantile(times, 0.75)}`)
    // console.log(`90percentile, ${quantile(times, 0.9)}`)
    // console.log(`95percentile, ${quantile(times, 0.95)}`)
    // console.log(`99percentile, ${quantile(times, 0.99)}`)

    times = benchmark(algorithm, undefined, 20000, 0,100)
    console.log('quicksort times for input size 1000')
    console.log(`percentile, times`)
    console.log(`25percentile, ${quantile(times, 0.25)}`)
    console.log(`50percentile, ${quantile(times, 0.50)}`)
    console.log(`75percentile, ${quantile(times, 0.75)}`)
    console.log(`90percentile, ${quantile(times, 0.9)}`)
    console.log(`95percentile, ${quantile(times, 0.95)}`)
    console.log(`99percentile, ${quantile(times, 0.99)}`)


    // const lines: string[] = []
    // for (let i = 0; i < 10000; i++) {
    //     times = benchmark(algorithm, undefined, i, 10000, 10)
    //     lines.push(quantile(times, 0.50).toString(10))
    // }
    // fs.writeFileSync('./quicksort_data.txt', lines.join("\n"), 'utf-8');
}

