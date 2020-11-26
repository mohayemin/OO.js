import { NodeInfo } from "./cgTypes";

export class GraphNode {
    private readonly outNeighbours: GraphNode[];
    constructor(
        public readonly id: string,
        public readonly info: NodeInfo = null) {
        this.outNeighbours = [this];
    }

    adOutNeighbour(...newOutNeighbours: GraphNode[]) {
        this.outNeighbours.push(...newOutNeighbours);
        return this;
    }

    getOutNeighbours() {
        return this.outNeighbours;
    }
}
