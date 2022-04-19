import {numberListGenerator, quantile, randomNumberBetween} from "../utils";
import {LinkedList} from "../collection/linked_list";
import * as fs from 'fs'
import {HashSearchAlgorithm} from "./hash_search_algorithm";

/**
 * Hash search algorithm
 */
class HashSearch<T> implements HashSearchAlgorithm<T>{

    private readonly _hashFn: (element: T) => number
    constructor(hashFn: (element: T) => number) {
        this._hashFn = hashFn;
    }

    load(bucketSize: number, C: T[]): Array<LinkedList<T>> {
        const A = Array<LinkedList<T>>(bucketSize)
        for (let i = 0; i < C.length; i++) {
            let h = this._hashFn(C[i])
            if (!A[h]) {
                A[h] = new LinkedList<T>()
            }
            A[h].append(C[i])
        }
        return A
    }

    search(A: LinkedList<T>[], element: T): boolean {
        const h = this._hashFn(element)
        const list = A[h]
        if (list.empty()) {
            return false
        }
        else if (list.contains(element)) {
            return true
        }
        return false;
    }

}


if (require.main === module) {

    const size = 10000
    const bucketSize = 1000
    const hashFn = (element: number): number => {
        return element % bucketSize
    }
    const algorithm = new HashSearch<number>(hashFn);

    const times: number[] = []
    const it = numberListGenerator(size,size)
    const  iterations = 100
    const C: number[] = it.next().value
    const A = algorithm.load(bucketSize, C)
    for (let i = 0; i < iterations; i++) {
        const value = C[Math.floor(Math.random() * size)]
        const t1 = Number(process.hrtime.bigint())
        algorithm.search(A, value)
        const t2 = Number(process.hrtime.bigint()) - t1;
        times.push(t2 / 1000000.0)
    }

    console.log('Hash search times for input size 1000000')
    console.log(`percentile, times`)
    console.log(`25percentile, ${quantile(times, 0.25)}`)
    console.log(`50percentile, ${quantile(times, 0.50)}`)
    console.log(`75percentile, ${quantile(times, 0.75)}`)
    console.log(`90percentile, ${quantile(times, 0.9)}`)
    console.log(`95percentile, ${quantile(times, 0.95)}`)
    console.log(`99percentile, ${quantile(times, 0.99)}`)

    // const lines: string[] = []
    // for (let i = 0; i < size; i++) {
    //     const times: number[] = []
    //     const it = numberListGenerator(size,size)
    //     const  iterations = 100
    //     const C: number[] = it.next().value
    //     const A = algorithm.load(bucketSize, C)
    //     for (let j = 0; j < iterations; j++) {
    //         const value = C[Math.floor(Math.random() * size)]
    //         const t1 = Number(process.hrtime.bigint())
    //         algorithm.search(A, value)
    //         const t2 = Number(process.hrtime.bigint()) - t1;
    //         times.push(t2 / 1000000.0)
    //     }
    //     lines.push(quantile(times, 0.50).toString(10))
    // }
    // fs.writeFileSync('./hash_search_data_bucket_10.txt', lines.join("\n"), 'utf-8');
}