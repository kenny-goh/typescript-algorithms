export interface PriorityQueue<T> {
    insert(item: T, priority: number): void
    peek(): T | null
    pop(): T
    size(): number
    isEmpty(): boolean
}

export type PriorityQueueType = 'min'

export class PriorityQueueFactory {
    private static instance: PriorityQueueFactory;
    private constructor() { }
    public static getInstance(): PriorityQueueFactory {
        if (!PriorityQueueFactory.instance) {
            PriorityQueueFactory.instance = new PriorityQueueFactory();
        }
        return PriorityQueueFactory.instance;
    }
    getNumberPriorityQueue(type: PriorityQueueType): PriorityQueue<number> {
        if (type == null || type == 'min') return new MinPriorityQueue<number>();
        throw Error("Unsupported implementation type:" + type);
    }
}

class MinPriorityQueue<T> implements PriorityQueue<T> {
    private _data: [number, T][] = []
    insert(item: T, priority: number) {
        if (this._data.length == 0) {
            this._data.push([priority, item])
            return
        }
        for (let index = 0; index < this._data.length; index++) {
            if (index == this._data.length - 1) {
                this._data.push([priority, item])
                return
            }
            // Makes sure the array is sorted post insert by min priority
            if (this._data[index][0] > priority) {
                this._data.splice(index, 0, [priority, item])
                return
            }
        }
    }
    isEmpty(): boolean { return this._data.length == 0}
    peek(): T | null {
        if (this.isEmpty()) return null;
        return this._data[0][1]
    }
    pop(): T {
        const data = this._data.pop()
        if (data == null) throw Error('Queue is empty');
        return data[1]
    }
    size(): number { return this._data.length }
}