import { NodeInfo } from "./cgTypes";

export class GraphNode {
    public readonly entitySet: Set<GraphNode>
    constructor(
        public readonly id: string,
        public readonly info: NodeInfo = null) {
        this.entitySet = new Set([this]);
    }

    addNeighbour(...newOutNeighbours: GraphNode[]) {
        newOutNeighbours.forEach(n => {
            this.entitySet.add(n)
            n.entitySet.add(this)
        })
        return this
    }
}
