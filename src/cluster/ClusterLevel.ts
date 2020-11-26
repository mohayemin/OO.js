import { pull } from "lodash";
import { Cluster } from "./Cluster";
export class ClusterLevel {
    constructor(
        public readonly clusters: Cluster[]
        , public readonly mergedCluster: Cluster) {
    }

    merge(first: Cluster, second: Cluster) {
        const firstId = first.id;
        first.mergeWith(second);
        pull(this.clusters, second);
        this.clusters.forEach(c => c.updateNeighbours(first.id, firstId, second.id));
    }
}
