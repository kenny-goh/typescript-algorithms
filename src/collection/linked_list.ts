/**
 *
 */
import {Collection} from "./collection";


/**
 *
 */
export class LinkedList<T> implements Collection<T>{
    private _head: LinkedNode<T> | null = null;
    private len = 0;

    constructor(headElement?: LinkedNode<T>) {
        this._head = headElement || null;
    }

    /**
     * Performance cost: O(N)
     * @param elem
     */
    public appendRest(...elems:T[]) {
        elems.forEach((it)=>{
            this.append(it)
        })
    }

    /**
     * Performance cost: O(N)
     * @param elem
     */
    public append(elem: T) {
        let node = new LinkedNode(elem);
        let current: LinkedNode<T>;

        if (this._head === null) {
            this._head = node;
        } else {
            current = this._head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.len++;
    }

    /**
     * Performance cost: O(N)
     * @param element
     */
    public contains(element: T): boolean {
        let node = this._head
        while (node?.next != null) {
            if (node?.elem == element) return true
            node = node.next;
        }
        return false
    }

    /**
     * Performance cost: O(N)
     * @param pos
     */
    public removeAt(pos: number): LinkedNode<T> | null {
        if (pos > -1 && pos < this.len && this._head) {
            let current = this._head;
            let previous: LinkedNode<T> = current;
            let index = 0;

            if (pos === 0) {
                this._head = current.next;
            } else {
                while (index++ < pos && current.next) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            this.len--;
            return current;
        } else {
            return null;
        }
    }

    /**
     * Performance cost: O(N)
     * @param elem
     * @param pos
     */
    public insert(elem: T, pos: number) {
        if (pos > -1 && pos < this.len && this._head) {
            let current = this._head;
            let index = 0;
            let previous = current;
            let node = new LinkedNode(elem);

            if (pos === 0) {
                node.next = current;
                this._head = node;
            } else {
                while (index++ < pos && current.next) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
            this.len++;
            return true;
        } else {
            return false;
        }
    }

    /**
     *
     */
    public empty() {
        return this.len == 0
    }

    /**
     *
     */
    public size() {
        return this.len
    }

    public get head(): LinkedNode<T> | null {
        return this._head
    }

    /**
     *
     */
    public toString() {
        let current = this._head;
        let str = '';
        while (current) {
            str += current.elem;
            current = current.next;
        }
        return str;
    }
}

/**
 *
 */
export class LinkedNode<T> {
    private readonly _elem: T;
    public next: LinkedNode<T> | null;

    constructor(elem: T) {
        this._elem = elem;
        this.next = null;
    }

    get elem(): T {
        return this._elem;
    }
}