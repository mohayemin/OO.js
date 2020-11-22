import { NodeInfo } from "./cgTypes";

export class Node {
    private readonly outNeighbours: Node[];
    constructor(
        public readonly id: string,
        public readonly info: NodeInfo) {
        this.outNeighbours = [];
    }

    adOutNeighbour(...newOutNeighbours: Node[]) {
        this.outNeighbours.push(...newOutNeighbours);
        return this;
    }
}
