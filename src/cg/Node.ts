import { NodeInfo } from "./cgTypes";

export class Node {
    public readonly outNeighbours: Node[];
    constructor(
        public readonly id: string,
        public readonly info: NodeInfo) {
        this.outNeighbours = [];
    }

    private _outNeighbourhood: string[];
    outNeighbourhood() {
        if (!this._outNeighbourhood) {
            const neighbourIds = this.outNeighbours.map(n => n.id);
            this._outNeighbourhood = Array.from(new Set([this.id, ...neighbourIds]));
        }

        return this._outNeighbourhood;
    }
}
