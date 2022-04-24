import {Collection} from "./collection";

export class Queue<T> implements Collection<T> {

    private _storage: T[] = [];

    constructor(private capacity: number = Infinity) {}

    enqueue(item: T): void {
        if (this.size() === this.capacity) {
            throw Error("Queue has reached max capacity");
        }
        this._storage.push(item);
    }

    dequeue(): T | undefined {
        return this._storage.shift();
    }

    size(): number {
        return this._storage.length;
    }

    contains(element: T): boolean {
        return this._storage.indexOf(element) >= 0
    }
}
