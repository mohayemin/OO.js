import { Cluster } from "./Cluster";

export class ClusterLevel {
    constructor(
        public readonly clusters: Cluster[]
        , public readonly mergedCluster: Cluster) {
    }

    hasNext(): boolean {
        return this.clusters.length > 1;
    }

    next(): ClusterLevel {
        let { firstIndex, secondIndex } = this.findClosestPair();
        const first = this.clusters[firstIndex];
        const second = this.clusters[secondIndex];

        let newClusters = this.clusters.slice();
        const mergedCluster = first.mergeWith(second);
        newClusters[firstIndex] = mergedCluster;
        newClusters.splice(secondIndex, 1);
        newClusters = newClusters.map(e => e.updateNeighbours(mergedCluster.id, first.id, second.id));

        return new ClusterLevel(newClusters, newClusters[firstIndex]);
    }

    private findClosestPair() {
        let maxCloseness = -1;
        let firstIndex: number, secondIndex: number;
        for (let i = 0; i < this.clusters.length - 1; i++) {
            const ei = this.clusters[i];
            for (let j = i + 1; j < this.clusters.length; j++) {
                const ej = this.clusters[j];

                const closeness = ei.closeness(ej);
                console.log(ei.id, ej.id, closeness);
                if (closeness > maxCloseness) {
                    maxCloseness = closeness;
                    firstIndex = i;
                    secondIndex = j;
                }
            }
        }

        console.log('-------------------------');

        return { firstIndex, secondIndex };
    }
}
