import {Collection} from "../collection/collection";


/**
 * Generic hash based search algorithm interface
 */
export interface HashSearchAlgorithm<T> {

    /**
     *
     * @param bucketSize
     * @param C
     */
    load(bucketSize: number, C: T[]): Array<Collection<T>>

    /**
     * Performance cost:
     * Best case: O(1)
     * Average case: O (1)
     * Worst case: O (N) - bucket size is 1
     *
     * @param A
     * @param element
     */
    search(A: Collection<T>[], element: T): boolean
}