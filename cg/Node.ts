import { NodeInfo } from "./cgTypes";

export class Node {
    public readonly outNeighbours: Node[];
    constructor(
        public readonly id: string,
        public readonly info: NodeInfo) {
        this.outNeighbours = [];
    }
}
