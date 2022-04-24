//
// MergeSort(arr[], l,  r)
// If r > l
// 1. Find the middle point to divide the array into two halves:
//     middle m = l+ (r-l)/2
// 2. Call mergeSort for first half:
//     Call mergeSort(arr, l, m)
// 3. Call mergeSort for second half:
//     Call mergeSort(arr, m+1, r)
// 4. Merge the two halves sorted in step 2 and 3:
// Call merge(arr, l, m, r)

import {SortAlgorithm} from "./sort_algorithm";
import {benchmark} from "./sort_utils";
import {quantile} from "../utils";

// Merge sort is better for linked lists...
export  class MergeSort<T> implements SortAlgorithm<T> {


    /**
     *
     * @param A
     */
    sort(A: T[]): T[] {
        const _A = [...A]
        this.mergeSort(_A, 0, A.length-1 );
        return _A;
    }

    /**
     *
     * @param A
     * @param left
     * @param right
     */
    mergeSort(A:T[], left: number, right: number) {
        if (left < right) {
            const middle = Math.floor(left + (right - left) / 2);
            this.mergeSort(A, left, middle);
            this.mergeSort(A, middle + 1, right);
            this.merge(A, left, middle, right);
        }
    }

    /**
     *
     * @param A
     * @param left
     * @param middle
     * @param right
     * @private
     */
    private merge(A: T[], left: number, middle: number, right: number) {

        // Find sizes of two sub arrays to be merged
        const n1 = middle - left + 1;
        const n2 = right - middle;

        // This is a very expensive operation...

        /* Create temp arrays */
        const L = new Array<T>(n1);
        const R = new Array<T>(n2);

        /*Copy data to temp arrays*/
        for (let i = 0; i < n1; ++i) {
            L[i] = A[left + i];
            for (let j = 0; j < n2; ++j) {
                R[j] = A[middle + 1 + j];
            }
        }

        /* Merge the temp arrays */

        // Initial indexes of first and second sub arrays
        let a: T | null, // for left value
            b: T | null, // for right value
            c: T | null; // the max of (left or right)
        let k = left;
        let i = 0, j = 0;
        do {
            a = (i < n1) ? L[i] : null;
            b = (j < n2) ? R[j] : null;
            // case 1: (both not null) a <= b
            // case 2: (both not null) a > b
            // case 3: a or b depending on which is not null
            c = (a != null && b != null && a <= b) ? a : (a != null && b != null && a > b) ? b : (a != null) ? a : (b != null) ? b : null;
            if (c == null) break;
            if (c == a) {
                A[k] = a!;
                i++;
            } else {
                A[k] = b!;
                j++;
            }
            k++;
        } while (i < n1 || j < n2);

        // Another way of solving the problem:
        // Initial index of merged subarray array
        // let k = left;
        // let i = 0, j = 0;
        // while (i < n1 && j < n2) {
        //     if (L[i] <= R[j]) {
        //         A[k] = L[i];
        //         i++;
        //     }
        //     else {
        //         A[k] = R[j];
        //         j++;
        //     }
        //     k++;
        // }
        //
        // /* Copy remaining elements of L[] if any */
        // while (i < n1) {
        //     A[k] = L[i];
        //     i++;
        //     k++;
        // }
        //
        // /* Copy remaining elements of R[] if any */
        // while (j < n2) {
        //     A[k] = R[j];
        //     j++;
        //     k++;
        // }
    }
}

if (require.main === module) {
    const algorithm = new MergeSort<number>();
    // console.log(algorithm.sort([5,4,3,2,2,2,1,5,6,7,5,33,1]))

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
}

