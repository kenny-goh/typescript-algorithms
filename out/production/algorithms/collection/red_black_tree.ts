import {BinaryTreeNode} from "./tree_node";

const COLOR_BLACK = 0
const COLOR_RED = 1


/**
 * Self balancing binary search tree with the following properties:
 *
 * - Each node is either black or red
 * - The root of the tree is always black.
 * - There are no two adjacent red nodes (A red node cannot have a red parent or red child).
 * - Every path from a node (including root) to any of its descendants NULL nodes has the same number of black nodes.
 * - All leaf nodes are black nodes.
 *
 * https://en.wikipedia.org/wiki/Red%E2%80%93black_tree
 */
export class RedBlackTree<T> {
    private _root: RBTreeNode<T>
    private readonly NULL: RBTreeNode<T>

    constructor(nullValue: T) {
        this.NULL = new RBTreeNode<T>(nullValue, COLOR_BLACK);
        this._root = this.NULL
    }

    get root(): RBTreeNode<T>  {
        return this._root
    }

    set root(root: RBTreeNode<T>) {
        this._root = root
    }


    /**
     * Pseudocode:
     * 1. If y has a left subtree, assign x as the parent of the left subtree of y
     * 2. If the parent of x is NULL, make y as the root of the tree.
     * 3. Else if x is the left child of p, make y as the left child of p
     * 4. Else assign y as the right child of p
     *
     * @param x
     */
    _leftRotate(x: RBTreeNode<T>) {
        const y: RBTreeNode<T> = x.asRBTreeRight;
        x.right = y.left;
        if (y.left != this.NULL) {
            y!.left!.parent = x;
        }
        y.parent = x.parent;
        if (x.parent == null) {
            this._root = y;
        } else if (x == x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }
        y.left = x;
        x.parent = y;
    }

    /**
     * Pseudocode:
     * 1. If x has a right subtree, assign y as the parent of the right subtree of x.
     * 2. If the parent of y is NULL, make x as the root of the tree.
     * 3. Else if y is the right child of its parent p, make x as the right child of p.
     * 4. Else assign x as the left child of p
     * 5. Make x as the parent of y
     * @param x
     */
     _rightRotate(x: RBTreeNode<T>) {
        const y: RBTreeNode<T> = x.asRBTreeLeft
        x.left = y.right;
        if (y.right != this.NULL) {
            y!.right!.parent = x;
        }
        y.parent = x.parent;
        if (x.parent == null) {
            this._root = y;
        } else if (x == x.parent.right) {
            x.parent.right = y;
        } else {
            x.parent.left = y;
        }
        y.right = x;
        x.parent = y;
    }

    /**
     * Pseudocode:
     *   1. Let y be the leaf and x be the root of the tree.
     *   2. Check if the tree is empty. If yes, insert newNode as a root node and color it black.
     *   3.Else, repeat steps following steps until leaf (NIL) is reached.
     *     3.1 Compare newKey with rootKey.
     *     3.2 If newKey is greater than rootKey, traverse through the right subtree.
     *     3.3 Else traverse through the left subtree.
     *   4. Assign the parent of the leaf as a parent of newNode.
     *   5. If leafKey is greater than newKey, make newNode as rightChild.
     *   6. Else, make newNode as leftChild.
     *   7. Assign NULL to the left and rightChild of newNode.
     *   8. Assign RED color to newNode.
     *   9. Call InsertFix-algorithm to maintain the property of red-black tree if violated.
     *
     * @param key
     */
    public insert(key: T, data: any = null) {

        // Insert red node
        const node = new RBTreeNode<T>(key, data, COLOR_RED);
        node.left = this.NULL
        node.right = this.NULL

        let y: BinaryTreeNode<T> | null = null;
        let x: BinaryTreeNode<T> | null = this._root;

        while (x != this.NULL) {
            y = x;
            if (node.key! < x!.key!) {
                x = x!.left;
            } else {
                x = x!.right;
            }
        }

        node.parent = y;
        if (y == null) {
            this._root = node;
        } else if (node.key! < y.key!) {
            y.left = node;
        } else {
            y.right = node;
        }

        if (node.parent == null) {
            node.color = 0;
            return;
        }

        if (node.parent.parent == null) {
            return;
        }

         this._balanceTreePostInsert(node);
    }

    /**
     * Balance the node after insertion
     *
     * This algorithm is used for maintaining the property of a red-black tree if the insertion of a newNode violates this property.
     *
     * 1. Do the following while the parent of newNode p is RED.
     * 2. If p is the left child of grandParent gP of z, do the following.
     *    2.1 Case-I:
     *     If the color of the right child of gP of z is RED, set the color of both the children of gP as BLACK and the color of gP as RED.
     *     Assign gP to newNode.
     *    2.2 Case-II:
     *     Else if newNode is the right child of p then, assign p to newNode.
     *     Left-Rotate newNode.
     *    2.3 Case-III:
     *     Set color of p as BLACK and color of gP as RED.
     *     Right-Rotate gP.
     *    2.4 Else, do the following.
     *      If the color of the left child of gP of z is RED, set the color of both the children of gP as BLACK and the color of gP as RED.
     *      Assign gP to newNode.
     *      Else if newNode is the left child of p then, assign p to newNode and Right-Rotate newNode.
     *     Set color of p as BLACK and color of gP as RED.
     *     Left-Rotate gP.
     * 3. Set the root of the tree as BLACK.
     * @param k
     * @private
     */
    private _balanceTreePostInsert(k: RBTreeNode<T>) {
        let u: RBTreeNode<T> | null = null
        while (k.asRBTreeParent.color == 1) {
            if (k.parent == k.parent?.parent?.right) {
                u = k.asRBTreeParent.asRBTreeParent.asRBTreeLeft;
                if (u.color == COLOR_RED) {
                    u.color = COLOR_BLACK;
                    k.asRBTreeParent.color = COLOR_BLACK;
                    k.asRBTreeParent.asRBTreeParent.color = COLOR_RED;
                    k = k.asRBTreeParent.asRBTreeParent;
                } else {
                    if (k == k.asRBTreeParent.left) {
                        k = k.asRBTreeParent;
                        this._rightRotate(k);
                    }
                    k.asRBTreeParent.color = COLOR_BLACK;
                    k.asRBTreeParent.asRBTreeParent.color = COLOR_RED;
                    this._leftRotate(k.asRBTreeParent.asRBTreeParent);
                }
            } else {
                u = k.asRBTreeParent.asRBTreeParent.asRBTreeRight
                 if (u.color == COLOR_RED) {
                    u.color = COLOR_BLACK;
                    k.asRBTreeParent.color = COLOR_BLACK;
                    k.asRBTreeParent.asRBTreeParent.color = COLOR_RED;
                    k = k.asRBTreeParent.asRBTreeParent;
                } else {
                    if (k == k.asRBTreeParent.right) {
                        k = k.asRBTreeParent;
                        this._leftRotate(k);
                    }
                    k.asRBTreeParent.color = COLOR_BLACK;
                    k.asRBTreeParent.asRBTreeParent.color = COLOR_RED;
                    this._rightRotate(k.asRBTreeParent.asRBTreeParent);
                }
            }
            if (k == this._root) {
                break;
            }
        }
        this._root.color = COLOR_BLACK;
    }

    /**
     * Deletes the key from the tree
     *
     *   Save the color of nodeToBeDeleted in originalColor.
     *   If the left child of nodeToBeDeleted is NULL
     *     Assign the right child of nodeToBeDeleted to x.
     *     Transplant nodeToBeDeleted with x.
     *   Else if the right child of nodeToBeDeleted is NULL
     *   Assign the left child of nodeToBeDeleted into x.
     *   Transplant nodeToBeDeleted with x.
     *   Else
     *     Assign the minimum of right subtree of noteToBeDeleted into y.
     *   Save the color of y in originalColor.
     *   Assign the rightChild of y into x.
     *   If y is a child of nodeToBeDeleted, then set the parent of x as y.
     *   Else, transplant y with rightChild of y.
     *   Transplant nodeToBeDeleted with y.
     *   Set the color of y with originalColor.
     *   If the originalColor is BLACK, rebalance the tree post deletion
     * @param key
     * @private
     */
    delete(key: T) {

        let node = this.root

        let z = this.NULL
        let x: RBTreeNode<T> | null = null
        let y: RBTreeNode<T> | null = null

        while (node != this.NULL) {
            if (node.key == key) {
                z = node;
            }

            if (node.key <= key) {
                node = node.asRBTreeRight;
            } else {
                node = node.asRBTreeLeft;
            }
        }

        if (z == this.NULL) {
            console.log("Unable to find key:" + key)
            return;
        }

        y = z;
        let yOriginalColor = y.color;
        if (z.left == this.NULL) {
            x = z.asRBTreeRight;
            this._transplant(z, z.asRBTreeRight);
        } else if (z.right == this.NULL) {
            x = z.asRBTreeLeft;
            this._transplant(z, z.asRBTreeLeft);
        } else {
            y = this._minimum(z.asRBTreeRight);
            yOriginalColor = y.color;
            x = y.asRBTreeRight;
            if (y.parent == z) {
                x.parent = y;
            } else {
                this._transplant(y, y.asRBTreeRight);
                y.right = z.right;
                y.right!.parent! = y;
            }
            this._transplant(z, y);
            y.left = z.left;
            y.left!.parent! = y;
            y.color = z.color;
        }

        if (yOriginalColor == COLOR_BLACK) {
            this._balanceTreePostDeletion(x)
        }
    }

    _transplant(u: RBTreeNode<T>, v: RBTreeNode<T>) {
        if (u.parent == null) {
            this.root = v;
        } else if (u == u.parent.left) {
            u.parent.left = v;
        } else {
            u.parent.right = v;
        }
        v.parent = u.parent;
    }

    _minimum(node: RBTreeNode<T>): RBTreeNode<T> {
        let p = node
        while (p.left != this.NULL) {
            p = node.asRBTreeLeft;
        }
        return p;
    }

    /**
     * Balance the tree after deletion of a node
     *
     * This algorithm is implemented when a black node is deleted because it violates the black depth property of the red-black tree.
     * This violation is corrected by assuming that node x (which is occupying y's original position) has an extra black. This makes node x neither red nor black.
     * It is either doubly black or black-and-red. This violates the red-black properties.
     * However, the color attribute of x is not changed rather the extra black is represented in x's pointing to the node.
     *
     * The extra black can be removed if:
     *
     * 1. It reaches the root node.
     * 2. If x points to a red-black node. In this case, x is colored black.
     * 3. Suitable rotations and recoloring are performed.
     *
     * The following algorithm retains the properties of a red-black tree.
     *
     * 1.Do the following until the x is not the root of the tree and the color of x is BLACK
     * 2. If x is the left child of its parent then,
     *   2.1 Assign w to the sibling of x.
     *   2.2 If the right child of parent of x is RED,
     *     Case-I:
     *       Set the color of the right child of the parent of x as BLACK.
     *       Set the color of the parent of x as RED.
     *       Left-Rotate the parent of x.
     *       Assign the rightChild of the parent of x to w.
     *       If the color of both the right and the leftChild of w is BLACK,
     *     Case-II:
     *      Set the color of w as RED
     *      Assign the parent of x to x.
     *      Else if the color of the rightChild of w is BLACK
     *     Case-III:
     *       Set the color of the leftChild of w as BLACK
     *       Set the color of w as RED
     *       Right-Rotate w.
     *       Assign the rightChild of the parent of x to w.
     *       If any of the above cases do not occur, then do the following.
     *     Case-IV:
     *       Set the color of w as the color of the parent of x.
     *       Set the color of the parent of x as BLACK.
     *       Set the color of the right child of w as BLACK.
     *       Left-Rotate the parent of x.
     *       Set x as the root of the tree.
     * 3. Else the same as above with right changed to left and vice versa.
     * 4. Set the color of x as BLACK.
     * @param x
     * @private
     */
    private _balanceTreePostDeletion(x: RBTreeNode<T>) {
        let s: RBTreeNode<T> | null = null

        while (x != this.root && x.color == COLOR_BLACK) {
            if (x == x.asRBTreeParent.asRBTreeLeft) {
                s = x.asRBTreeParent.asRBTreeRight;

                if (s.color == COLOR_RED) {
                    s.color = COLOR_BLACK;
                    x.asRBTreeParent.color = COLOR_RED;
                    this._leftRotate(x.asRBTreeParent);
                    s = x.asRBTreeParent.asRBTreeRight;
                }

                if (s.asRBTreeLeft.color == COLOR_BLACK &&
                    s.asRBTreeRight.color == COLOR_BLACK) {
                    s.color = COLOR_RED;
                    x = x.asRBTreeParent;
                } else {
                    if (s.asRBTreeRight.color == COLOR_BLACK) {
                        s.asRBTreeLeft.color = COLOR_BLACK;
                        s.color = COLOR_RED;
                        this._rightRotate(s);
                        s = x.asRBTreeParent.asRBTreeRight;
                    }
                    s.color = x.asRBTreeParent.color;
                    x.asRBTreeParent.color = COLOR_BLACK;
                    s.asRBTreeRight.color = COLOR_BLACK;
                    this._leftRotate(x.asRBTreeParent);
                    x = this.root;
                }
            } else {
                s = x.asRBTreeParent.asRBTreeLeft;
                if (s.color == COLOR_RED) {
                    s.color = COLOR_BLACK;
                    x.asRBTreeParent.color = COLOR_RED;
                    this._rightRotate(x.asRBTreeParent);
                    s = x.asRBTreeParent.asRBTreeLeft;
                }

                if (s.asRBTreeRight.color == COLOR_BLACK && s.asRBTreeRight.color == COLOR_BLACK) {
                    s.color = 1;
                    x = x.asRBTreeParent;
                } else {
                    if (s.asRBTreeLeft.color == 0) {
                        s.asRBTreeRight.color = COLOR_BLACK;
                        s.color = COLOR_RED;
                        this._leftRotate(s);
                        s = x.asRBTreeParent.asRBTreeLeft;
                    }
                    s.color = x.asRBTreeParent.color;
                    x.asRBTreeParent.color = COLOR_BLACK;
                    s.asRBTreeLeft.color = COLOR_BLACK;
                    this._rightRotate(x.asRBTreeParent);
                    x = this.root;
                }
            }
        }
        x.color = COLOR_BLACK;
    }

    public printTree() {
        this.root.printTree()
    }

    public keyExist(key: T): boolean {
        return this.root.keyExist(key)
    }

    public getData(key: T): any {
        return this.root.getData(key);
    }
}

/**
 * Red black implementation of TreeNode
 * Contains an extra field to store to color
 */
class RBTreeNode<T> extends BinaryTreeNode<T> {

    private _color: number = COLOR_BLACK

    constructor(value: T, data: any = null, color: number = COLOR_BLACK) {
        super(value, data);
        this._color = color;
    }

    get color(): number {
        return this._color;
    }

    set color(value: number) {
        this._color = value;
    }

    get asRBTreeParent(): RBTreeNode<T> {
        return this.parent as RBTreeNode<T>
    }

    get asRBTreeLeft(): RBTreeNode<T> {
        return this.left as RBTreeNode<T>
    }

    get asRBTreeRight(): RBTreeNode<T> {
        return this.right as RBTreeNode<T>
    }

    public printTree() {
        this._printTreeRecursive(this, "", true)
    }

    _printTreeRecursive(tree:RBTreeNode<T>,
                        indent: string,
                        last: boolean)
    {
        console.log(indent + "+- " + tree.key + "(" + (tree.color ? 'red' : 'black') + ")");
        indent += last ? "   " : "|  ";
        if (tree.left) {
            this._printTreeRecursive(tree.asRBTreeLeft, indent, false)
        }
        if (tree.right) {
            this._printTreeRecursive(tree.asRBTreeRight, indent, true)
        }
    }
}


if (require.main === module) {

    const rbt = new RedBlackTree<number>(0);
    rbt.insert(11)
    rbt.insert(33)
    rbt.insert(13)
    rbt.insert(21)
    rbt.insert(15, 'test')
    rbt.insert(31)
    rbt.insert(53)
    rbt.insert(41)
    rbt.insert(61)

    rbt.printTree()

    rbt.delete(13)

    rbt.root.printTree()

    rbt.insert(13)
    rbt.printTree()

    console.log(rbt.root.getData(15))

}

