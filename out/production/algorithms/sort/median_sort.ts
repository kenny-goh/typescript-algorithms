import {SortAlgorithm} from "./sort_algorithm";
import {quantile, randomNumberBetween} from "../utils";
import {PartitionSort} from "./partition_sort";
import * as fs from 'fs'
import {benchmark} from "./sort_utils";

/**
 * Median sort implementation of the sort algorithm
 *
 * Implemented based on the pseudocode from the Algorithms in a nutshell book.
 * @Author Kenny G
 */
export class MedianSort<T> extends PartitionSort<T> {

    /**
     * Performance cost:
     * Best case: O(N LOG N)
     * Average case: O (N LOG N)
     * Worst case: O (N^2)
     *
     * @param A
     */
    sort = (A: T[]): T[] => {
        let _A = [...A]
        this.medianSortRecursive(_A, 0, _A.length-1)
        return _A
    }

    /**
     * Median sort recursive
     * @param A         The array to be sorted
     * @param left      The left index of the array
     * @param right     The right index of the array
     */
    medianSortRecursive(A: T[], left: number, right: number) {

        if (right <= left || (right - left) <= 1) return

        let mid = Math.floor((right - left)/2)
        let median = this.selectKth(A, mid+1,left, right)

        // this.swapInPlace(A, left + mid, left + median)
        this.swapInPlace(A, left + mid, median)

        for (let i = 0; i <= left + mid - 1; i++) {
            if (A[i] > A[left + mid]) {
                // find A[k] <= A[mid] where k > mid
                let k = -1;
                for (let j = left + mid + 1 ; j <= right; j++) {
                    if (A[j] <= A[left + mid]) {
                        k = j
                        break
                    }
                }
                if (k >= 0) {
                    this.swapInPlace(A,i,k)
                }
            }
        }
        this.medianSortRecursive(A, left, left + mid - 1)
        this.medianSortRecursive(A, left + mid + 1, right)
    }

    /**
     * Select the Kth element of the in A, which is a median
     * @param A         The array
     * @param k
     * @param left      The left index of the array
     * @param right     The right index of the array
     */
    selectKth(A: T[],
              k: number,
              left: number,
              right: number): number {
        let idx = randomNumberBetween(left, right)
        let pivotIndex = this.partition(A, left, right, idx)
        if (left+k-1 === pivotIndex) {
            return pivotIndex
        }
        if (left+k-1 < pivotIndex) {
            return this.selectKth(A, k, left, pivotIndex - 1)
        } else {
            return this.selectKth(A, k - (pivotIndex-left+1), pivotIndex+1, right)
        }
    }
}

if (require.main === module) {
    const algorithm = new MedianSort<number>();
    console.log(algorithm.sort([5,4,3,2,2,2,1,5,6,7,5,33,1]))
    let times = benchmark(algorithm, undefined, 10, 999,100)
    console.log('Median sort times for input size 10')
    console.log(`percentile, times`)
    console.log(`25percentile, ${quantile(times, 0.25)}`)
    console.log(`50percentile, ${quantile(times, 0.50)}`)
    console.log(`75percentile, ${quantile(times, 0.75)}`)
    console.log(`90percentile, ${quantile(times, 0.9)}`)
    console.log(`95percentile, ${quantile(times, 0.95)}`)
    console.log(`99percentile, ${quantile(times, 0.99)}`)

    times = benchmark(algorithm, undefined, 100, 999,100)
    console.log('Median sort times for input size 100')
    console.log(`percentile, times`)
    console.log(`25percentile, ${quantile(times, 0.25)}`)
    console.log(`50percentile, ${quantile(times, 0.50)}`)
    console.log(`75percentile, ${quantile(times, 0.75)}`)
    console.log(`90percentile, ${quantile(times, 0.9)}`)
    console.log(`95percentile, ${quantile(times, 0.95)}`)
    console.log(`99percentile, ${quantile(times, 0.99)}`)

    times = benchmark(algorithm, undefined, 1000, 999,100)
    console.log('Median sort times for input size 1000')
    console.log(`percentile, times`)
    console.log(`25percentile, ${quantile(times, 0.25)}`)
    console.log(`50percentile, ${quantile(times, 0.50)}`)
    console.log(`75percentile, ${quantile(times, 0.75)}`)
    console.log(`90percentile, ${quantile(times, 0.9)}`)
    console.log(`95percentile, ${quantile(times, 0.95)}`)
    console.log(`99percentile, ${quantile(times, 0.99)}`)

    times = benchmark(algorithm, undefined, 10000, 9999,100)
    console.log('median sort times for input size 10000')
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
    fs.writeFileSync('./median_sort_data.txt', lines.join("\n"), 'utf-8');

}



