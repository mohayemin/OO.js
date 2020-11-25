import { union, without } from "lodash";
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

        const mergedId = first.id + "$" + second.id;
        const mergedNeighbourIds = union(first.getNeighbourhood(), second.getNeighbourhood());

        let newClusters = this.clusters.slice();
        newClusters[firstIndex] = new Cluster(mergedId, mergedNeighbourIds);
        newClusters.splice(secondIndex, 1);
        newClusters = newClusters.map(e => this.copyClusterForMerge(e, mergedId, first.id, second.id));

        return new ClusterLevel(newClusters, newClusters[firstIndex]);
    }

    copyClusterForMerge(cluster: Cluster, newId: string, firstOldId: string, secondOldId: string) {
        const neighbourIds = without(cluster.getNeighbourhood(), firstOldId, secondOldId, newId);
        if (neighbourIds.length < cluster.getNeighbourhood().length) {
            neighbourIds.push(newId);
        }
        return new Cluster(cluster.id, neighbourIds);
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
