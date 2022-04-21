import {GraphInterface} from "./graph_interface";


export type Color = "white" | "grey" | "black";

/**
 *
 */
export abstract class GraphSearch {
    private _pred: Array<number>  = []
    private _color: Array<Color>  = []
    private _counter = 0;

    abstract search(G: GraphInterface, startNode: number): void

    get color(): Array<Color> {
        return this._color;
    }
    get pred(): Array<number> {
        return this._pred;
    }

    get counter(): number {
        return this._counter;
    }

    set counter(value: number) {
        this._counter = value;
    }
    set color(value: Array<Color>) {
        this._color = value;
    }
    set pred(value: Array<number>) {
        this._pred = value;
    }

}