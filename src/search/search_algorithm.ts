

/**
 * Generic search algorithm interface
 *
 * @Author Kenny G
 */
export interface SearchAlgorithm<T> {
    search: (A: T[], element: T) => boolean
}