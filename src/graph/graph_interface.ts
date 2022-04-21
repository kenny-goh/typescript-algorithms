

export interface GraphInterface {
    isDirected(): boolean
    numberOfNodes(): number
    isEdge(u:number, v:number)
    getWeight(u:number, v:number)
    addEdge(u:number, v:number, weight: number)
    removeEdge(u: number, v: number)
}

