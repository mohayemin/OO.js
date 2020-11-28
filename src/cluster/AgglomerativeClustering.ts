import { maxBy } from "lodash"
import { Graph } from "../cg/Graph"
import { GraphNode } from "../cg/GraphNode"
import { Cluster } from "./Cluster"
import { ClusterLevel } from "./ClusterLevel"
import { ClusterPair } from "./ClusterPair"
import { ClusterScorer } from "./scoring/ClusterScorer"

export class AgglomerativeClustering {
    constructor(private graph: Graph
        , private nodeToCluster: (node: GraphNode) => Cluster
        , private scorer: ClusterScorer
    ) {
    }

    apply(): ClusteringResult {
        const resultItems: Array<ClusteringResultItem> = [];
        let level = new ClusterLevel(this.graph.nodes.map(this.nodeToCluster))
        while (level.hasMultipleClusters()) {
            const resultItem = this.findResultForLevel(level)
            resultItems.push(resultItem);
            level = level.clone();
            level.merge(resultItem.closestPair.firstIndex, resultItem.closestPair.secondIndex)
        }
        resultItems.push(this.findResultForLevel(level))

        const topScorer = maxBy(resultItems, l => l.score)

        return { resultItems: resultItems, topScorer }
    }

    private findResultForLevel(level: ClusterLevel): ClusteringResultItem {
        const score = this.scorer.score(level.clusters)
        const closestPair = level.findClosestPair()
        return { level, closestPair, score }
    }
}

export interface ClusteringResult {
    resultItems: ClusteringResultItem[]
    topScorer: ClusteringResultItem
}

export class ClusteringResultItem {
    level: ClusterLevel
    closestPair: ClusterPair
    score: number
}