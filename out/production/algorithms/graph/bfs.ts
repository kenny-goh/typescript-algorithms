import {Color, BaseGraphSearch} from "./graph_search";
import {GraphInterface} from "./graph_interface";
import {Queue} from "../collection/queue";
import {AdjacencyMatrixGraph} from "./adjancency_matrix_graph";

/**
 * BFS algorithm
 *
 * fixme: add visualization to show the paths
 */
class BFS extends BaseGraphSearch{

    private _dist: Array<number>  = []
    private _queue: Queue<number> = new Queue<number>();

    get dist(): Array<number> {
        return this._dist;
    }

    set dist(value: Array<number>) {
        this._dist = value;
    }

    get queue(): Queue<number> {
        return this._queue;
    }

    set queue(value: Queue<number>) {
        this._queue = value;
    }

    search(G: GraphInterface, startNode: number): void {
        this.dist = new Array<number>(G.numberOfNodes());
        this.pred = new Array<number>(G.numberOfNodes());
        this.color = new Array<Color>(G.numberOfNodes());
        for (let v = 0; v < G.numberOfNodes(); v++) {
            this.pred[v] = -1;
            this.dist[v] = Infinity;
            this.color[v] = 'white';
        }
        this.color[startNode] = 'grey';
        this.dist[startNode] = 0;
        this.queue = new Queue<number>();
        this.queue.enqueue(startNode);

        while (this.queue.size() != 0) {
            let u = this.queue.dequeue();
            if (u == null) return;
            for (let v = 0; v < G.numberOfNodes(); v++) {
                if (G.isEdge(u, v)) {
                    if (this.color[v] == 'white') {
                        this.dist[v] = this.dist[u] + 1;
                        this.pred[v] = u
                        this.color[v] = 'grey'
                        this.queue.enqueue(v);
                    }
                }
            }
            this.color[u] = 'black';
        }
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
    const matrix = new AdjacencyMatrixGraph(9, false)
    const bfs = new BFS();
    matrix.addEdge(0, 1,1)
    matrix.addEdge(1,3,1)
    matrix.addEdge(3,6, 1)
    matrix.addEdge(3,5,1)
    matrix.addEdge(5, 2, 1)
    matrix.addEdge(2,4, 1)
    matrix.addEdge(2,0, 1)
    matrix.addEdge(8,7, 1)
    console.log(matrix.toString())

    bfs.search(matrix, 0)

    console.log(bfs.toString());


}