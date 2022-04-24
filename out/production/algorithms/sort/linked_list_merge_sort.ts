import {LinkedList, LinkedNode} from "../collection/linked_list";

/**
 *
 */
class LinkedListMergeSort<T> {

    /**
     * Sort the given list and return the result
     *
     * @param list
     */
    sortedMerged(list: LinkedList<T>): LinkedList<T> {
        let copy = list.copy();
        if (copy.head) {
            copy.head = this._mergeSort(copy.head);
        }
        return copy;
    }

    /**
     *
     * @param head
     */
    _mergeSort(head: LinkedNode<T>): LinkedNode<T> {

        // Base case : if head is null
        if (head == null || head.next == null) {
            return head;
        }

        // get the middle of the list
        let middle = this._getMiddle(head);
        let nextofmiddle = middle.next;

        if (nextofmiddle == null)
            throw Error("Invariant condition violated: middle cannot be null");

        middle.next = null;  // set the next of middle node to null

        let left = this._mergeSort(head);           // merge sort on left
        let right = this._mergeSort(nextofmiddle);  // merge sort on right

        // Merge the left and right lists
        return this._merge(left, right)
    }

    /**
     *
     * @param a
     * @param b
     */
    _merge(a: LinkedNode<T> | null, b: LinkedNode<T> | null): LinkedNode<T> {

        let result: LinkedNode<T> | null = null;
        if (a == null && b == null) throw new Error("Invariant condition violated: a and b cannot be null at the same time");
        /* Base cases */
        if (a == null && b)
            return b;
        if (b == null && a)
            return a;

        /* Pick either a or b, and recur */
        if (a!.elem <= b!.elem) {
            result = a!;
            result.next = this._merge(a!.next, b);
        } else {
            result = b!;
            result.next = this._merge(a, b!.next);
        }
        return result;
    }

    /**
     *
     * @param head
     */
    _getMiddle(head: LinkedNode<T>): LinkedNode<T> {
        if (head == null)
            return head;
        let slow = head, fast = head;
        while (fast.next && fast.next.next && slow.next) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
}

if (require.main === module) {
    const linkedListMergeSort = new LinkedListMergeSort();
    const list = new LinkedList<number>();
    list.append(15);
    list.append(5);
    list.append(20);
    list.append(6);
    list.append(1);
    list.append(7);

    console.log('LIST 1 pre sort', list.toString());

    const list2 = linkedListMergeSort.sortedMerged(list);

    console.log('LIST 1 post sort', list.toString());
    console.log('LIST 2 post sort', list2.toString());
}
