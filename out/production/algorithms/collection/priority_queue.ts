export interface PriorityQueue<T> {
    insert(item: T, priority: number): void
    peek(): T
    pop(): T
    size(): number
    isEmpty(): boolean
}

export type PriorityQueueType = 'sorted'

export class PriorityQueueFactory {
    private static instance: PriorityQueueFactory;
    private constructor() { }
    public static getInstance(): PriorityQueueFactory {
        if (!PriorityQueueFactory.instance) {
            PriorityQueueFactory.instance = new PriorityQueueFactory();
        }

        return PriorityQueueFactory.instance;
    }
    getNumberPriorityQueue(type: PriorityQueueType = null): PriorityQueue<number> {
        if (type == null || type == 'sorted') return new SortedPriorityQueue<number>();
        throw Error("Unsupported implementation type:" + type);
    }
}

class SortedPriorityQueue<T> implements PriorityQueue<T> {
    private _data: [number, T][] = []
    insert(i, p) {
        if (this._data.length == 0) {
            this._data.push([p, i])
            return
        }

        for (let index = 0; index < this._data.length; index++) {
            if (index == this._data.length - 1) {
                this._data.push([p, i])
                return
            }

            if (this._data[index][0] > p) {
                this._data.splice(index, 0, [p, i])
                return
            }
        }
    }
    isEmpty() { return this._data.length == 0}
    peek() {return this._data.length == 0 ? null : this._data[0][1] }
    pop() { return this._data.length == 0 ? null : this._data.pop()[1] }
    size() { return this._data.length }
}