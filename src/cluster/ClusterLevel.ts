import { Cluster } from "./Cluster";
import { ClusterFactory } from "./ClusterFactory";

export class ClusterLevel<TCluster extends Cluster> {
    constructor(
        public readonly clusters: TCluster[]
        , public readonly mergedCluster: TCluster
        , private clusterFactory: ClusterFactory<TCluster>) {
    }

    hasNext(): boolean {
        return this.clusters.length > 1;
    }

    next(): ClusterLevel<TCluster> {
        let { firstIndex, secondIndex } = this.findClosestPair();
        const first = this.clusters[firstIndex];
        const second = this.clusters[secondIndex];

        let newClusters = this.clusters.slice();
        const mergedCluster = this.clusterFactory.merge(first, second);
        newClusters[firstIndex] = mergedCluster;
        newClusters.splice(secondIndex, 1);
        newClusters = newClusters.map(c => this.clusterFactory.updateNeighbours(c, mergedCluster.id, first.id, second.id));

        return new ClusterLevel(newClusters, newClusters[firstIndex], this.clusterFactory);
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
