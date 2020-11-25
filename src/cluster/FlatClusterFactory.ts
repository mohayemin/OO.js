import { union, without } from "lodash";
import { ClusterFactory } from "./ClusterFactory";
import { FlatCluster } from "./FlatCluster";
import { Cluster } from "./Cluster";


export class FlatClusterFactory extends ClusterFactory<FlatCluster> {
    merge(first: Cluster, second: Cluster): FlatCluster {
        const mergedId = first.id + "$" + second.id;
        const mergedNeighbourIds = union(first.getNeighbourhood(), second.getNeighbourhood());
        return new FlatCluster(mergedId, mergedNeighbourIds);
    }

    updateNeighbours(source: FlatCluster, mergedId: string, firstOldId: string, secondOldId: string): FlatCluster {
        const neighbourIds = without(source.getNeighbourhood(), firstOldId, secondOldId, mergedId);
        if (neighbourIds.length < source.getNeighbourhood().length) {
            neighbourIds.push(mergedId);
        }
        return new FlatCluster(source.id, neighbourIds);
    }
}
