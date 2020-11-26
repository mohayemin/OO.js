import { first, max, maxBy, pull } from "lodash";
import { Cluster } from "./Cluster";
import { ClusterPair } from "./ClusterPair";
export class ClusterLevel {
    clusterPairs: ClusterPair[];
    constructor(
        public readonly clusters: Cluster[]) {
        this.recalculatePairs();
    }

    private recalculatePairs() {
        this.clusterPairs = this.clusters.slice(0, this.clusters.length - 1).flatMap((first, i) =>
            this.clusters.slice(i + 1, this.clusters.length).map(second => new PrintableClusterPair(first, second))
        )
    }

    hasMultipleClusters() {
        return this.clusters.length > 1;
    }

    merge(first: Cluster, second: Cluster) {
        first.mergeWith(second);
        pull(this.clusters, second);
        this.recalculatePairs();
        return first;
    }

    public findClosestPair(): ClusterPair {
        return maxBy(this.clusterPairs, p => p.closeness);
    }

    clone() {
        const clusters = this.clusters.map(c => c.clone());
        return new ClusterLevel(clusters)
    }

    score() {
        return 0;
    }
}

class PrintableClusterPair implements ClusterPair {
    public closeness: number
    constructor(
        public first: Cluster,
        public second: Cluster
    ) {
        this.closeness = first.closeness(second);
    }

    toString() {
        return `${this.first.id} ${this.second.id} ${this.closeness}`
    }
}
