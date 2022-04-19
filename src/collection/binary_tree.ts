import {LinkedList, LinkedNode} from "./linked_list";
import {BinaryTreeNode} from "./tree_node";

/**
 *
 */
class BinaryTree<T> extends LinkedList<T> {

    /**
     * Performance cost: O(N)
     */
    toTreeNode(): BinaryTreeNode<T> | null {
        if (this.size() == 0) return null
        let currentNode: LinkedNode<T> | null = this.head
        const queue = new LinkedList<BinaryTreeNode<T>>()
        if (!this.head) return null
        const rootBinaryTree =  new BinaryTreeNode<T>(this.head.elem);
        queue.append(rootBinaryTree)
        currentNode = this.head.next
        while(currentNode != null) {
            // Dequeue one nodes from the queue
            const parentNode = queue.removeAt(0);
            if (!parentNode) throw Error('Illegal state: parent node cannot be null')
            // Get next two nodes
            const leftValue = currentNode.elem
            const binaryTreeLeft = new BinaryTreeNode<T>(leftValue)
            parentNode.elem.left = binaryTreeLeft
            queue.append(binaryTreeLeft)
            currentNode = currentNode.next
            if (currentNode) {
                const rightValue = currentNode.elem
                const binaryTreeRight = new BinaryTreeNode<T>(rightValue);
                parentNode.elem.right = binaryTreeRight
                queue.append(binaryTreeRight)
                currentNode = currentNode.next
            }
        }
        return rootBinaryTree
    }
}

if (require.main === module) {

    const tree = new BinaryTree<number>();
    tree.appendRest(10,12,15,25,30,36);

    const treeNode = tree.toTreeNode();
    if (treeNode) {
        treeNode.printTree()
        console.log(treeNode.keyExist(36))
        console.log(treeNode.keyExist(100))
    }
}