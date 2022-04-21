import {GraphInterface} from "./graph_interface";
import {AdjacencyMatrixGraph} from "./adjancency_matrix_graph";

type Color = "white" | "grey" | "black";

/**
 * DFS Graph algorithm
 */
class DFS {
    private _discovered: Array<number> = []
    private _pred: Array<number>  = []
    private _finished: Array<number>  = []
    private _color: Array<Color>  = []
    private _counter = 0;

    /**
     *
     * @param G
     * @param startNode
     */
    search(G: GraphInterface, startNode: number) {
        this._discovered = new Array<number>(G.numberOfNodes());
        this._pred = new Array<number>(G.numberOfNodes());
        this._finished = new Array<number>(G.numberOfNodes());
        this._color = new Array<Color>(G.numberOfNodes());
        for (let v = 0; v < G.numberOfNodes(); v++) {
            this._discovered[v] = this._finished[v] = this._pred[v] = -1
            this._color[v] = 'white'
        }
        this._counter = 0;
        this.dfs_visit(G, startNode);

        for (let v = 0; v < G.numberOfNodes(); v++) {
            if (this._color[v] == 'white') {
                this.dfs_visit(G, v);
            }
        }
    }

    /**
     *
     * @param G
     * @param u
     */
    dfs_visit(G: GraphInterface, u: number) {
        this._color[u] = "grey"
        this._discovered[u] = ++this._counter;
        // for each neighbor of v of u do
        for (let v = 0; v < G.numberOfNodes(); v++) {
            if (G.isEdge(u, v)) {
                if (this._color[v] == 'white') {
                    this._pred[v] = u
                    this.dfs_visit(G, v)
                }
            }
        }
        this._color[u] = 'black'
        this._finished[u] = ++this._counter;
    }

    get color(): Array<Color> {
        return this._color;
    }
    get finished(): Array<number> {
        return this._finished;
    }
    get pred(): Array<number> {
        return this._pred;
    }
    get discovered(): Array<number> {
        return this._discovered;
    }

    toString(): string {
        const rowsBuilder = new Array<string>()
        rowsBuilder.push(['v', 'pred', 'd', 'f'].join("\t"))
        for (let i = 0; i < this.discovered.length; i++) {
            rowsBuilder.push([`v${i}`, this._pred[i], this._discovered[i], this._finished[i]].join("\t"))
        }
        return rowsBuilder.join("\n")
    }

}

if (require.main === module) {
    const matrix = new AdjacencyMatrixGraph(9, false)
    const dfs = new DFS();
    matrix.addEdge(0, 1,1)
    matrix.addEdge(1,2,1)
    matrix.addEdge(2,3, 1)
    matrix.addEdge(3,4,1)
    matrix.addEdge(4, 5, 1)
    matrix.addEdge(4,0, 1)
    matrix.addEdge(7,8, 1)
    console.log(matrix.toString())

    dfs.search(matrix, 0)

    console.log(dfs.toString());


}