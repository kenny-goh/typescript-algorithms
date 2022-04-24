/**
 * Generic sort algorithm interface
 *
 * @Author Kenny G
 */
export interface SortAlgorithm<T> {
    sort: (A: T[]) => T[]
}