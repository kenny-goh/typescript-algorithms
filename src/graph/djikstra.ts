import {BaseGraphSearch, GraphSearchInterface} from "./graph_search";
import {GraphInterface} from "./graph_interface";
import {PriorityQueueFactory} from "../collection/priority_queue";
import {AdjacencyMatrixGraph} from "./adjancency_matrix_graph";

/**
 *
 */
class Djikstra implements GraphSearchInterface {

    private _pred: Array<number>  = []
    private _dist: Array<number>  = []

    search(G: GraphInterface, s: number): void {
        // Min priority queue
        const PQ = PriorityQueueFactory.getInstance().getNumberPriorityQueue('min');
        // Init dist[v] and pred[v] for all v in V
        for (let v = 0; v < G.numberOfNodes(); v++) {
            this.dist[v] = Infinity;
            this.pred[v] = -1;
        }
        // Init dist of s to 0
        this.dist[s] = 0;

        // Insert v -> dist[v] to PQ
        for (let v = 0; v < G.numberOfNodes(); v++) {
            PQ.insert(v, this.dist[v])
        }

        while(!PQ.isEmpty()) {
            const u = PQ.pop(); // Pop u with the smallest distance (greedy)
            for (let v = 0; v < G.numberOfNodes(); v++) {
                // For all neighbours of v
                if (G.isEdge(u, v)) {
                    // Check computed distance between u and v
                    const w = G.getWeight(u, v);
                    const newLen  = this.dist[u] + w   // best distance of u + w
                    // if computed distance is smaller than dist[v]
                    if (newLen < this.dist[v]) {
                        // Update the distance of v
                        PQ.insert(v, newLen)
                        // Update dist[v] and pred[v] of v
                        this.dist[v] = newLen
                        this.pred[v] = u
                    }
                }
            }
        }
    }

    get pred(): Array<number> {
        return this._pred;
    }

    set pred(value: Array<number>) {
        this._pred = value;
    }

    get dist(): Array<number> {
        return this._dist;
    }

    set dist(value: Array<number>) {
        this._dist = value;
    }

    toString(): string {
        const rowsBuilder = new Array<string>()
        rowsBuilder.push(['v', 'dist', 'pred'].join("\t"))
        for (let i = 0; i < this.pred.length; i++) {
            rowsBuilder.push([`v${i}`, this.dist[i], this.pred[i]].join("\t"))
        }
        return rowsBuilder.join("\n")
    }
}

if (require.main === module) {
    const matrix = new AdjacencyMatrixGraph(5, true)
    const djikstra = new Djikstra();
    matrix.addEdge(0, 1,2)
    matrix.addEdge(0,4,4)
    matrix.addEdge(1,2,3)
    matrix.addEdge(2,4,1)
    matrix.addEdge(2,3,5)
    matrix.addEdge(4,3,7)
    matrix.addEdge(3,0,8)
    console.log(matrix.toString())

    djikstra.search(matrix, 0)

    console.log(djikstra.toString());

    const matrix2 = new AdjacencyMatrixGraph(6, true);
    matrix2.addEdge(0,1,6)
    matrix2.addEdge(0,3,18)
    matrix2.addEdge(0,2,8)
    matrix2.addEdge(1,4,11)
    matrix2.addEdge(4,5,3)
    matrix2.addEdge(5,2,7)
    matrix2.addEdge(5,3,4)
    matrix2.addEdge(2,3,9)
    djikstra.search(matrix2, 0)

    console.log(djikstra.toString());

}