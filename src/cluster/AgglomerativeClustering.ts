import { Graph } from "../cg/Graph"
import { GraphNode } from "../cg/GraphNode"
import { Cluster } from "./Cluster"
import { ClusterLevel } from "./ClusterLevel"

export class AgglomerativeClustering {
    constructor(private graph: Graph, private nodeToCluster: (node: GraphNode) => Cluster) {
    }

    apply(): ClusteringResult {
        let level = new ClusterLevel(this.graph.nodes.map(this.nodeToCluster))
        while(level.hasMultipleClusters()) {
            level = level.clone()
            const {first, second} = level.findClosestPair()
            level.merge(first, second)
        }

        return null
    }
}

export interface ClusteringResult {

}
