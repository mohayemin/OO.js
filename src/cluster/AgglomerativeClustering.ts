import { maxBy } from "lodash"
import { CallGraph } from "../cg/CallGraph"
import { FunctionNode } from "../cg/GraphNode"
import { Cluster } from "./Cluster"
import { ClusterGroup as ClusterGroup } from "./ClusterGroup"
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
        let clusterGroup = new ClusterGroup(this.graph.nodes.map(this.nodeToCluster))
        while (clusterGroup.hasMultipleClusters()) {
            const resultItem = this.findResultForGroup(clusterGroup)
            resultItems.push(resultItem);
            clusterGroup = clusterGroup.clone();
            clusterGroup.merge(resultItem.closestPair.firstIndex, resultItem.closestPair.secondIndex)
        }
        resultItems.push(this.findResultForGroup(clusterGroup))

        const topScorer = maxBy(resultItems, l => l.score.score)

        return new ClusteringResult(resultItems, topScorer)
    }

    private findResultForGroup(group: ClusterGroup): ClusteringResultItem {
        const score = this.scorer.score(group.clusters)
        const closestPair = group.findClosestPair()
        return new ClusteringResultItem(group, closestPair, score)
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
        public group: ClusterGroup,
        public closestPair: ClusterPair,
        public score: ClusterScore
    ) {
    }

    public format() {
        return this.group.clusters.map(c => c.id).join(" ") +
            " :: " +
            `${this.score.score.toFixed(2)} (${this.score.cohesion.toFixed(2)}/${this.score.coupling.toFixed(2)})`
    }
}