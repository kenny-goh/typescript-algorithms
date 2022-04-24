import {GraphInterface} from "./graph_interface";

/**
 *
 */
export class AdjacencyMatrixGraph implements GraphInterface {

    private readonly _directed: boolean;
    private readonly _numOfNodes: number
    private readonly _matrix: Array<Array<number>>

    constructor(numOfNodes: number, directed: boolean) {
        this._numOfNodes = numOfNodes;
        this._directed = directed;
        this._matrix = new Array<Array<number>>();
        for (let i = 0; i < numOfNodes; i++) {
            let arr = new Array<number>()
            for (let j = 0; j < numOfNodes; j++) {
                arr.push(0);
            }
            this._matrix.push(arr);
        }
    }

    isDirected(): boolean {
        return this._directed
    }

    addEdge(u: number, v: number, weight: number) {
        this._matrix[u][v] = weight;
        if (!this.isDirected()) {
            this._matrix[v][u] = weight;
        }
    }

    numberOfNodes(): number {
        return this._numOfNodes;
    }

    removeEdge(u: number, v: number) {
        this._matrix[u][v] = 0;
        if (!this.isDirected()) {
            this._matrix[v][u] = 0;
        }
    }

    toString(): string {
        const columnsBuilder = new Array<string>()
        const rowsBuilder = new Array<string>()
        columnsBuilder.push("\t")
        for (let i = 0; i < this.numberOfNodes(); i++) {
            columnsBuilder.push(`v${i}`)
        }
        rowsBuilder.push(columnsBuilder.join("\t"))
        columnsBuilder.splice(0, columnsBuilder.length)
        for (let i = 0; i < this.numberOfNodes(); i++) {
            columnsBuilder.push(' ')
            columnsBuilder.push(`v${i}`)
            for (let j = 0; j < this.numberOfNodes(); j++) {
                columnsBuilder.push('' + this._matrix[i][j])
            }
            rowsBuilder.push(columnsBuilder.join("\t"))
            columnsBuilder.splice(0, columnsBuilder.length)
        }
        return rowsBuilder.join("\n")
    }

    getWeight(u: number, v: number) {
        return this._matrix[u][v];
    }

    isEdge(u: number, v: number) {
        return this._matrix[u][v] != 0;
    }

}

if (require.main === module) {
    const matrix = new AdjacencyMatrixGraph(10, true)
    matrix.addEdge(1,2, 1)
    console.log(matrix.toString())
}