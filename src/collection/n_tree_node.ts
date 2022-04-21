/**
 * NTree node implementation
 */
import {Queue} from "./queue";

/**
 *
 */
export class NTreeNode<T> {

    private readonly _value: T;
    private _children: Array<NTreeNode<T>> = [];

    constructor(value: T, children: Array<NTreeNode<T>> = []) {
        this._value = value;
        this._children = children;
    }

    get value(): T {
        return this._value;
    }

    get children(): Array<NTreeNode<T>> {
        return this._children;
    }

    get depth() {
        let children = this._children;
        if (!children || children.length == 0) return 1;
        let count: number = 1;
        while (children.length) {
            children = children[0]._children;
            count += 1;
        }
        return count;
    }

    public addChild(child: NTreeNode<T>): NTreeNode<T> {
        this._children.push(child);
        return this;
    }

    public printTree() {
        this._printTreeRecursive(this,"",true);
    }

    /**
     * procedure DFS(G, v) is
     *     label v as discovered
     *     for all directed edges from v to w that are in G.adjacentEdges(v) do
     *         if vertex w is not labeled as discovered then
     *             recursively call DFS(G, w)
     */
    public dfs(): Array<NTreeNode<T>> {
        let visited = new Array<NTreeNode<T>>();
        this._dfsRecursive(visited, this);
        return visited;
    }

    private _dfsRecursive(visited: Array<NTreeNode<T>>, tree: NTreeNode<T>) {
        visited.push(tree);
        for (let it of tree.children) {
            if (visited.indexOf(it) == -1) {
                this._dfsRecursive(visited, it);
            }
        }
    }

    /**
     *  procedure BFS(G, root) is
     *    let Q be a queue
     *    label root as explored
     *    Q.enqueue(root)
     *    while Q is not empty do
     *      v := Q.dequeue()
     *      if v is the goal then
     *        return v
     *     for all edges from v to w in G.adjacentEdges(v) do
     *       if w is not labeled as explored then
     *         label w as explored
     *         Q.enqueue(w)
     * @param goal
     */
    public bfs(goal: T | null = null): Array<NTreeNode<T>> {
        let visited = new Array<NTreeNode<T>>();
        const queue = new Queue<NTreeNode<T>>();
        visited.push(this);
        queue.enqueue(this);
        while (queue.size() != 0) {
            let v = queue.dequeue()
            if (goal && v?.value == goal) return visited;
            if (v?.children) {
                for (let i = 0; i < v.children.length; i++) {
                    let w = v.children[i];
                    if (visited.indexOf(w) == -1) {
                        visited.push(w);
                        queue.enqueue(w);
                    }
                }
            }
        }
        return visited;
    }

    private _printTreeRecursive(tree:NTreeNode<T>, indent: string, last: boolean)
    {
        if (tree.value) {
            console.log(indent + "+- " + tree.value);
        }
        indent += last ? "   " : "|  ";
        if (tree.children) {
            for (let i = 0; i < tree.children.length; i++) {
                this._printTreeRecursive(tree.children[i], indent, i == tree.children.length-1);
            }
        }
    }

    public toString = () : string => {
        return "" + this._value;
    }
}

if (require.main === module) {
   const root = new NTreeNode(1);
   root.addChild(new NTreeNode(4).addChild(new NTreeNode(5)).addChild(new NTreeNode(6)).addChild(new NTreeNode(7)))
       .addChild(new NTreeNode(8).addChild(new NTreeNode(9)).addChild(new NTreeNode(10)).addChild(new NTreeNode(11)))
       .addChild(new NTreeNode(12).addChild(new NTreeNode(13)).addChild(new NTreeNode(14)).addChild(new NTreeNode(15)));

    console.log('DEPTH:' + root.depth);

    console.log('TRE *********');
    root.printTree();

    console.log('DFS **********');
    for (let it of root.dfs()) {
        console.log(it.toString());
    }

    console.log('BFS  **********')
    for (let it of root.bfs()) {
        console.log(it.toString());
    }

}