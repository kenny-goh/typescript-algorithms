/**
 * Generic collection interface
 */
export interface Collection<T> {
    size(): number
    contains(element: T): boolean;
}