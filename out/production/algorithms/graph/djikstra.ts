import {BaseGraphSearch, GraphSearchInterface} from "./graph_search";
import {GraphInterface} from "./graph_interface";
import {PriorityQueueFactory} from "../collection/priority_queue";
import {AdjacencyMatrixGraph} from "./adjancency_matrix_graph";


class Djikstra implements GraphSearchInterface {

    private _pred: Array<number>  = []
    private _dist: Array<number>  = []

    search(G: GraphInterface, startNode: number): void {
        const PQ = PriorityQueueFactory.getInstance().getNumberPriorityQueue();
        for (let v = 0; v < G.numberOfNodes(); v++) {
            this.dist[v] = Infinity;
            this.pred[v] = -1;
        }
        this.dist[startNode] = 0;

        for (let v = 0; v < G.numberOfNodes(); v++) {
            PQ.insert(v, this.dist[v])
        }

        while(!PQ.isEmpty()) {
            const u = PQ.pop();
            for (let v = 0; v < G.numberOfNodes(); v++) {
                if (G.isEdge(u, v)) {
                    const w = G.getWeight(u, v);
                    const newLen  = this.dist[u] + w
                    if (newLen < this.dist[v]) {
                        //
                        PQ.insert(v, newLen)
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
        rowsBuilder.push(['v', 'pred', 'dist'].join("\t"))
        for (let i = 0; i < this.pred.length; i++) {
            rowsBuilder.push([`v${i}`, this.pred[i], this.dist[i]].join("\t"))
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


}