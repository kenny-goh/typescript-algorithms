
/**
 *
 */
export class BinaryTreeNode<T> {

    private _key: T
    private _data: any
    private _parent: BinaryTreeNode<T> | null = null
    private _left: BinaryTreeNode<T> | null = null
    private _right: BinaryTreeNode<T> | null = null

    /**
     *
     * @param key
     * @param data
     */
    constructor(key: T, data: any = null) {
        this._key = key
        this._data = data
    }

    /**
     * Performance cost: O(LOG N)
     */
    public keyExist(k: T): boolean {
        let p = this.root
        while (p != null) {
            if (k == p.key!) {
               return true
            }  else if (k < p.key!) {
                p = p.left
            } else {
                p = p.right ?? p.left
            }
        }
        return false
    }

    public getData(k: T): any {
        let p = this.root
        while (p != null) {
            if (k == p.key!) {
                return p.data
            }  else if (k < p.key!) {
                p = p.left
            } else {
                p = p.right ?? p.left
            }
        }
        return null
    }

    /**
     *
     */
    public get root(): BinaryTreeNode<T> | null {
        let node : BinaryTreeNode<T> | null = this;
        while (node?.parent != null) {
            node = this.parent
        }
        return node
    }

    /**
     *
     * @param node
     */
    public set left(node: BinaryTreeNode<T> | null) {
        this._left = node
        if (this._left) {
            this._left.parent = this
        }
    }

    /**
     *
     * @param node
     */
    public set right(node: BinaryTreeNode<T> | null) {
        this._right = node
        if (this._right) {
            this._right.parent = this
        }
    }

    /**
     *
     * @param node
     */
    public set parent(node: BinaryTreeNode<T> | null) {
        this._parent = node
    }

    /**
     *
     */
    public get key(): T {
        return this._key;
    }

    /**
     *
     */
    get data(): any {
        return this._data;
    }

    /**
     *
     */
    public get parent(): BinaryTreeNode<T> | null {
        return this._parent
    }

    /**
     *
     */
    public get left(): BinaryTreeNode<T> | null{
        return this._left
    }

    /**
     *
     */
    public get right(): BinaryTreeNode<T> | null {
        return this._right
    }

    public printTree() {
        this._printTreeRecursive(this, "", true)
    }

    _printTreeRecursive(tree:BinaryTreeNode<T>, indent: string, last: boolean)
    {
        if (tree.key) {
            console.log(indent + "+- " + tree.key);
        }
        indent += last ? "   " : "|  ";
        if (tree.left) {
            this._printTreeRecursive(tree.left, indent, false)
        }
        if (tree.right) {
            this._printTreeRecursive(tree.right, indent, true)
        }
    }
}


if (require.main === module) {
    const root = new BinaryTreeNode<number>(7)
    const node2 = new BinaryTreeNode<number>(2)
    const node5 = new BinaryTreeNode<number>(5,)
    const node6 = new BinaryTreeNode<number>(6)
    const node10 = new BinaryTreeNode<number>(10)
    const node8 = new BinaryTreeNode<number>(8)

    root.left = node5
    root.right = node10
    node5.left = node2
    node5.right = node6
    node10.left = node8

    console.log(root.keyExist(8))

    root.printTree()
}