import {GraphInterface} from "./graph_interface";
import {AdjacencyMatrixGraph} from "./adjancency_matrix_graph";
import {Color, GraphSearch} from "./graph_search";


/**
 * DFS Graph algorithm
 *
 * fixme: add visualization to show the paths
 * https://github.com/cytoscape/cytoscape.js
 *
 */
class DFS extends GraphSearch{

    private _finished: Array<number>  = []
    private _discovered: Array<number> = []

    set discovered(value: Array<number>) {
        this._discovered = value;
    }

    get discovered(): Array<number> {
        return this._discovered;
    }

    get finished(): Array<number> {
        return this._finished;
    }
    set finished(value: Array<number>) {
        this._finished = value;
    }

    /**
     *
     * @param G
     * @param startNode
     */
    search(G: GraphInterface, startNode: number): void {
        this.discovered = new Array<number>(G.numberOfNodes());
        this.pred = new Array<number>(G.numberOfNodes());
        this.finished = new Array<number>(G.numberOfNodes());
        this.color = new Array<Color>(G.numberOfNodes());
        for (let v = 0; v < G.numberOfNodes(); v++) {
            this.discovered[v] = this.finished[v] = this.pred[v] = -1
            this.color[v] = 'white'
        }
        this.counter = 0;
        this.dfs_visit(G, startNode);

        for (let v = 0; v < G.numberOfNodes(); v++) {
            if (this.color[v] == 'white') {
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
        this.color[u] = "grey"
        this.discovered[u] = ++this.counter;
        // for each neighbor of v of u do
        for (let v = 0; v < G.numberOfNodes(); v++) {
            if (G.isEdge(u, v)) {
                if (this.color[v] == 'white') {
                    this.pred[v] = u
                    this.dfs_visit(G, v)
                }
            }
        }
        this.color[u] = 'black'
        this.finished[u] = ++this.counter;
    }

    toString(): string {
        const rowsBuilder = new Array<string>()
        rowsBuilder.push(['v', 'pred', 'd', 'f'].join("\t"))
        for (let i = 0; i < this.discovered.length; i++) {
            rowsBuilder.push([`v${i}`, this.pred[i], this.discovered[i], this.finished[i]].join("\t"))
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