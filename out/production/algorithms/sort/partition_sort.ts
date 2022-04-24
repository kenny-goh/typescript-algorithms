import {SortAlgorithm} from "./sort_algorithm";

/**
 *
 */
export abstract class PartitionSort<T> implements SortAlgorithm<T> {

    abstract sort: (A: T[]) => T[]

    /**
     * Swap using state mutation
     *
     * @param A This array to be sorted
     * @param i The left index of the array
     * @param j The right index of the array
     */
    swapInPlace(A: T[], i: number, j: number) {
        const swap = A[i]
        A[i] = A[j]
        A[j] = swap
    }

    /**
     * Partition the array into two segments with separated by the pivot index
     *
     * @param A             This array to be sorted
     * @param left          The left index of the array
     * @param right         The right index of the array
     * @param pivotIndex    The pivot index
     */
    partition(A: T[],
              left: number,
              right: number,
              pivotIndex: number): number {

        let store
        let pivot = A[pivotIndex]

        this.swapInPlace(A, right, pivotIndex)

        //
        store = left
        for (let idx = left; idx < right; idx++) {
            if (A[idx] <= pivot) {
                this.swapInPlace(A, idx, store)
                store++
            }
        }
        this.swapInPlace(A, right, store)
        return store;
    }
}