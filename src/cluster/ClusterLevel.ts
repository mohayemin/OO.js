import { first, max, maxBy, pull } from "lodash"
import { Cluster } from "./Cluster"
import { ClusterPair } from "./ClusterPair"
export class ClusterLevel {
    clusterPairs: ClusterPair[]
    constructor(
        public readonly clusters: Cluster[]) {
        this.recalculatePairs()
    }

    private recalculatePairs() {
        this.clusterPairs = this.clusters.slice(0, this.clusters.length - 1).flatMap((_, i) =>
            this.clusters.slice(i + 1, this.clusters.length).map((_, j) => new PrintableClusterPair(this.clusters, i, i + j + 1))
        )
    }

    hasMultipleClusters() {
        return this.clusters.length > 1
    }

    merge(firstIndex: number, secondIndex: number) {
        const second = this.clusters[secondIndex];
        this.clusters[firstIndex].mergeWith(second)
        pull(this.clusters, second)
        this.recalculatePairs()
        return first
    }

    public findClosestPair(): ClusterPair {
        return maxBy(this.clusterPairs, p => p.closeness)
    }

    clone() {
        const clusters = this.clusters.map(c => c.clone())
        return new ClusterLevel(clusters)
    }
}

class PrintableClusterPair implements ClusterPair {
    public closeness: number
    public first: Cluster
    public second: Cluster
    constructor(
        clusters: Cluster[],
        public firstIndex: number,
        public secondIndex: number
    ) {
        this.first = clusters[firstIndex]
        this.second = clusters[secondIndex]
        this.closeness = this.first.closeness(this.second)
    }

    toString() {
        return `${this.first.id} ${this.second.id} ${this.closeness}`
    }
}
