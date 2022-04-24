import {SortAlgorithm} from "./sort_algorithm";
import {InsertionSort} from "./insertion_sort";
import {quantile} from "../utils";
import * as fs from 'fs'
import {benchmark} from "./sort_utils";

/**
 * Bucket sort implementation
 *
 */
export class BucketSort<T> implements SortAlgorithm<T> {

    private readonly _bucketSize: number
    private readonly _hashFn: (element: T, bucketSize: number)=>number
    private _insertionSortAlgorithm: InsertionSort<T> = new InsertionSort<T>();

    constructor(hashFn: (element: T, bucketSize: number)=>number, bucketSize: number) {
        this._hashFn = hashFn
        this._bucketSize = bucketSize
    }

    /**
     *
     * Performance cost:
     * Best case: O( N )
     * Average case: O( N )
     * Worst case: O( N )
     *
     * @param A
     */
    sort(A: T[]): T[] {
        let _A = [...A]
        // create N buckets
        let BUCKET:  T[][] = Array(this._bucketSize)
        // // init bucket
        // for (let i = 0; i < this._bucketSize; i++) {
        //     BUCKET[i] = []
        // }
        for (let i = 0; i < _A.length; i++) {
            let k = this._hashFn(_A[i], BUCKET.length)
            // add A[i] to the Kth bucket B[k]
            if (!BUCKET[k]) {
                BUCKET[k] = []
            }
            BUCKET[k].push(_A[i])
        }
        this.extract(BUCKET,_A)
        return _A;
    }

    extract(B: T[][], A: T[]) {
        let idx = 0
        for (let i = 0; i < A.length; i++) {
            if (!B[i]) continue
            let _B = this._insertionSortAlgorithm.sort(B[i])
            for (let m = 0; m < _B.length; m++) {
                A[idx++] = _B[m]
            }
        }
    }
}

if (require.main === module) {

    let algorithm = new BucketSort<number>((element: number, bucketSize: number)=> {
        return Math.floor(element * bucketSize)
    },10 );

    console.log(algorithm.sort([0.1,0.01,0.001,0.005,0.3]))

    algorithm = new BucketSort<number>((element: number, bucketSize: number)=> {
        return Math.floor(element * bucketSize)
    },10 );

    let times = benchmark(algorithm, undefined, 10, 0,100)
    // console.log('Bucket sort times for input size 10')
    // console.log(`percentile, times`)
    // console.log(`25percentile, ${quantile(times, 0.25)}`)
    // console.log(`50percentile, ${quantile(times, 0.50)}`)
    // console.log(`75percentile, ${quantile(times, 0.75)}`)
    // console.log(`90percentile, ${quantile(times, 0.9)}`)
    // console.log(`95percentile, ${quantile(times, 0.95)}`)
    // console.log(`99percentile, ${quantile(times, 0.99)}`)
    //
    // algorithm = new BucketSort<number>((element: number, bucketSize: number)=> {
    //     return Math.floor(element * bucketSize)
    // },100 );
    //
    //
    // times = benchmark(algorithm, undefined, 100, 0,100)
    // console.log('Bucket sort times for input size 100')
    // console.log(`percentile, times`)
    // console.log(`25percentile, ${quantile(times, 0.25)}`)
    // console.log(`50percentile, ${quantile(times, 0.50)}`)
    // console.log(`75percentile, ${quantile(times, 0.75)}`)
    // console.log(`90percentile, ${quantile(times, 0.9)}`)
    // console.log(`95percentile, ${quantile(times, 0.95)}`)
    // console.log(`99percentile, ${quantile(times, 0.99)}`)
    //
    // algorithm = new BucketSort<number>((element: number, bucketSize: number)=> {
    //     return Math.floor(element * bucketSize)
    // },1000 );
    //
    //
    // times = benchmark(algorithm, undefined, 1000, 0,100)
    // console.log('Bucket sort times for input size 1000')
    // console.log(`percentile, times`)
    // console.log(`25percentile, ${quantile(times, 0.25)}`)
    // console.log(`50percentile, ${quantile(times, 0.50)}`)
    // console.log(`75percentile, ${quantile(times, 0.75)}`)
    // console.log(`90percentile, ${quantile(times, 0.9)}`)
    // console.log(`95percentile, ${quantile(times, 0.95)}`)
    // console.log(`99percentile, ${quantile(times, 0.99)}`)
    //
    algorithm = new BucketSort<number>((element: number, bucketSize: number)=> {
        return Math.floor(element * bucketSize)
    },2000 );

    times = benchmark(algorithm, undefined, 20000, 0,100)
    console.log('Bucket sort times for input size 10000')
    console.log(`percentile, times`)
    console.log(`25percentile, ${quantile(times, 0.25)}`)
    console.log(`50percentile, ${quantile(times, 0.50)}`)
    console.log(`75percentile, ${quantile(times, 0.75)}`)
    console.log(`90percentile, ${quantile(times, 0.9)}`)
    console.log(`95percentile, ${quantile(times, 0.95)}`)
    console.log(`99percentile, ${quantile(times, 0.99)}`)

    // const lines: string[] = []
    // for (let i = 0; i < 10000; i++) {
    //     times = benchmark(algorithm, undefined, i, 0, 10)
    //     lines.push(quantile(times, 0.50).toString(10))
    // }
    // fs.writeFileSync('./bucket_sort_data.txt', lines.join("\n"), 'utf-8');
}