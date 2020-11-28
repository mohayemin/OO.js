import { maxBy } from "lodash"
import { CallGraph } from "../cg/CallGraph"
import { FunctionNode } from "../cg/GraphNode"
import { Cluster } from "./Cluster"
import { ClusterLevel } from "./ClusterLevel"
import { ClusterPair } from "./ClusterPair"
import { ClusterScore, ClusterScorer } from "./scoring/ClusterScorer"

export class AgglomerativeClustering {
    constructor(private graph: CallGraph
        , private nodeToCluster: (node: FunctionNode) => Cluster
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

        const topScorer = maxBy(resultItems, l => l.score.score)

        return new ClusteringResult(resultItems, topScorer)
    }

    private findResultForLevel(level: ClusterLevel): ClusteringResultItem {
        const score = this.scorer.score(level.clusters)
        const closestPair = level.findClosestPair()
        return new ClusteringResultItem(level, closestPair, score)
    }
}

export class ClusteringResult {
    constructor(
        public resultItems: ClusteringResultItem[],
        public topScorer: ClusteringResultItem
    ) {

    }

    format() {
        return this.resultItems.map(ri => ri.format()).join("\n")
    }
}

export class ClusteringResultItem {
    constructor(
        public level: ClusterLevel,
        public closestPair: ClusterPair,
        public score: ClusterScore
    ) {
    }

    public format() {
        return this.level.clusters.map(c => c.id).join(" ") +
            " :: " +
            `${this.score.score.toFixed(2)} (${this.score.cohesion.toFixed(2)}/${this.score.coupling.toFixed(2)})`
    }
}